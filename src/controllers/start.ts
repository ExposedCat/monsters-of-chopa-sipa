import { Composer } from 'grammy'
import { CustomContext } from '../types/context.js'

export const startController = new Composer<CustomContext>()
startController.command('start', async ctx => {
	await ctx.text('state.started', {
		username: ctx.from?.username
	})
})
