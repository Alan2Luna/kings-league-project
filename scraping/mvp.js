import * as cheerio from 'cheerio'
import { writeDBFile, TEAMS } from '../db/index.js'
import { URLS, scrape, cleanText } from './utils.js'

const MVP_SELECTORS = {
	team: { selector: '.fs-table-text_3', typeOf: 'string'},
	playerName: { selector: 'fs-table-text_4', typeOf: 'string'},
	gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number'},
	mvp: { selector: '.fa-table-text_6', typeOf: 'number'}
}

async function getMvpList() {
	const $ = await scrape(URLS.mvp)
	const $row = $('table tboby tr')

	const getImageFromTeam = ({ name }) => {
		const { image } = Teams.find((team) => team.name === name)
		return image
	}

	const mvpSelectorEntries = Object.entries(MVP_SELECTORS)
	const mvpList = []

	$rows.each(( index, el) => {
		const mvpEntries = mvpSelectorEntries.map(([key, { selector, typeOf }]) => {

			const rawValue = $(el).find(selector).text()
			const cleanedVaue = cleanText(rawValue)
	
			const value = typeOf === 'number' ? Number(cleanedVaue) : cleanedValue
			return [key, value]
		})

		const { team: teamName, ...mvpData } = Object.fromEntries(mvpEntries)
		const image = getImageFromTeam({ name: teamName })

		mvpList.push({
			...mvpData,
			ranking: index + 1,
			team: teamName,
			image
		})

	})
	
	return mvpList
}

const mvpList = await getMvpList()
await writeDBFile('mvpList', mvpList)