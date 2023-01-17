import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'
import topScorer from '../db/top_scorer.json'
import mvp from '../db/mvp.json'
import coaches from '../db/coaches.json'
import topAssists from '../db/top_assists.json'

const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Return Kings League leaderboard'
    },
    {
      endpoint: '/team',
      description: 'Returns Kings League presidents'
    },
    {
      endpoint: '/presidents',
      description: 'Return Kings League presidents'
    },
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/presidents', (ctx) => {
  return ctx.json(presidents)
})

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)

  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404)
})

app.get('/top-scorer', (ctx) => {
	return ctx.json(topScorer)
})

app.get('/mvp', (ctx) => {
	return ctx.json(mvp)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find((team) => team.id == id)

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404 )
})

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((ctx) => {
	const { pathname } = new URL(ctx.req.url)

	if(c.req.url.at(-1) === '/') {
		return ctx.redirect(pathname.slice(0, -1))
	}

	return ctx.json({ message: 'Not Found'}, 404 )
})

export default app
