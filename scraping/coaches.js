const INFO_COACHES_SELECTORS = {
	teamName: { selector: '.name.mt10', typeOf: 'string'},
	coach: { selector: '.name.mt20', typeOf: 'string'},
	coachImg: { selector: '.player-circle-box', typeOf: 'string'}
}

export function getCoaches($) {
	const coachesImgTeam = $(INFO_COACHES_SELECTORS.coachImg.selector)
		.map((coachImg) => {
			const { attribs } = coachImg
			const { src } = attribs

			return src 
		})

	const teamsName = $(INFO_COACHES_SELECTORS.teamName.selector)
		.toArray()
		.map((teamName) => teamName.children[0].data)

	const teamsWithCoach = coachesTeam.map((coach, i) => {
		return {
			name: coach,
			teamName: teamsName[i],
			image: coachesImgTeam[i]
		}
	})

	return teamsWithCoach
}