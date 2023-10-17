import { Composer } from 'grammy'
import type { CustomContext } from '../types/context.js'

export const profileController = new Composer<CustomContext>()
profileController.command('profile', async ctx => {
  await ctx.text('profile', {
    emoji: ctx.i18n.t(`emoji.player.${ctx.entities.player.emoji}`),
    name: ctx.entities.player.name,
    glory: ctx.entities.player.glory
  })
})
