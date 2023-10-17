import { Bot as TelegramBot, session } from 'grammy'
import type { I18n } from '@grammyjs/i18n'

import { resolvePath } from '../helpers/resolve-path.js'
import { createReplyWithTextFunc } from '../services/context.js'
import type { CustomContext } from '../types/context.js'
import type { Database } from '../types/database.js'
import { initLocaleEngine } from './locale-engine.js'
import { startController } from '../controllers/start.js'
import { profileController } from '../controllers/profile.js'
import type { Bot } from '../types/telegram.js'
import { buildName, getOrCreatePlayer } from '../services/player.js'
import { getOrCreateChat } from '../services/chat.js'

function extendContext(bot: Bot, database: Database) {
  bot.use(async (ctx, next) => {
    if (!ctx.chat || !('title' in ctx.chat) || !ctx.from) {
      return
    }

    ctx.text = createReplyWithTextFunc(ctx)
    ctx.db = database

    ctx.entities = {
      player: await getOrCreatePlayer({
        db: database,
        userId: ctx.from.id,
        name: buildName(ctx.from.first_name, ctx.from.last_name)
      }),
      chat: await getOrCreateChat({
        db: database,
        chatId: ctx.chat.id,
        title: ctx.chat.title
      })
    }

    await next()
  })
}

function setupMiddlewares(bot: Bot, localeEngine: I18n) {
  bot.use(session())
  bot.use(localeEngine.middleware())
  bot.catch(console.error)
}

function setupControllers(bot: Bot) {
  bot.use(startController)
  bot.use(profileController)
}

export async function startBot(database: Database) {
  const localesPath = resolvePath(import.meta.url, '../locales')
  const i18n = initLocaleEngine(localesPath)
  const bot = new TelegramBot<CustomContext>(process.env.TOKEN)
  extendContext(bot, database)
  setupMiddlewares(bot, i18n)
  setupControllers(bot)
  bot.start()
  return new Promise(resolve => setTimeout(resolve, 1_000))
}
