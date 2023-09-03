import { Composer } from 'grammy'
import { CustomContext } from '../types/context.js'

export const stopController = new Composer<CustomContext>()
stopController.command('stop', async ctx => {
	await ctx.text('state.stopped', {
		username: ctx.from?.username
	})
})
