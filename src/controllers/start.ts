import { Handler } from '../types/index.js'

const startController: Handler = async ctx => {
	await ctx.text('state.started', {
		username: ctx.from?.username
	})
}

export { startController }
