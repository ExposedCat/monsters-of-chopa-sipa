import { Handler } from '../types/index.js'

const stopController: Handler = async ctx => {
	await ctx.text('state.stopped', {
		username: ctx.from?.username
	})
}

export { stopController }
