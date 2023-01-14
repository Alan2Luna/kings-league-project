import { writeDBFile, TEAMS } from '../db/index.js'
import { URLS, scrape, cleanText } from './utils.js'

const MVP_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string'},
	playerName: { selector: '.fs-table-text_4', typeOf: 'string'},
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number'},
	mvp: { selector: '.fs-table-text_6', typeOf: 'number'}
}

async function getMvpList() {
	const $ = await scrape(URLS.mvp)
  	const $rows = $('table tbody tr')

	const getImageFromTeam = ({ name }) => {
		const { image } = TEAMS.find((team) => team.name === name)
		return image
	}
	console.log($rows)
	const mvpSelectorEntries = Object.entries(MVP_SELECTORS)
	const mvpList = []
	
	$rows.each((index, el) => {
		const mvpEntries = mvpSelectorEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $(el).find(selector).text()
			console.log(rawValue)
			const cleanedValue = cleanText(rawValue)
	
			const value = typeOf === 'number' ? Number(cleanedValue) : cleanedValue
			return [key, value]
		})

		const { team: teamName, ...mvpData } = Object.fromEntries(mvpEntries)
		const image = getImageFromTeam({ name: teamName })

		mvpList.push({
			rank: index + 1,
			team: teamName,
			image,
			...mvpData
		})

	})
	
	return mvpList
}

const mvpList = await getMvpList()
await writeDBFile('mvpList', mvpList)