import { Composer } from 'grammy'
import type { CustomContext } from '../types/context.js'
import { getRandomMonster } from '../services/monster.js'

export const summonController = new Composer<CustomContext>()
summonController.command('summon', async ctx => {
  const monster = await getRandomMonster({ db: ctx.db })
  await ctx.text(
    'monsterAttack',
    {
      emoji: ctx.i18n.t(`emoji.monster.${monster.emoji}`),
      name: monster.name
    },
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: ctx.i18n.t('joinFight'),
              callback_data: 'join_fight'
            }
          ]
        ]
      }
    }
  )
})
