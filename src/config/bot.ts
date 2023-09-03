import { I18n } from '@grammyjs/i18n/dist/source/i18n.js'
import { Bot as TelegramBot, session } from 'grammy'
import { resolvePath } from '../helpers/resolve-path.js'
import { createReplyWithTextFunc } from '../services/context.js'
import { CustomContext } from '../types/context.js'
import { Database } from '../types/database.js'
import { initLocaleEngine } from './locale-engine.js'
import { startController } from '../controllers/start.js'
import { stopController } from '../controllers/stop.js'
import { Bot } from '../types/telegram.js'

function extendContext(bot: Bot, database: Database) {
	bot.use(async (ctx, next) => {
		ctx.text = createReplyWithTextFunc(ctx)
		ctx.db = database
		await next()
	})
}

function setupMiddlewares(bot: Bot, localeEngine: I18n) {
	bot.use(session())
	bot.use(localeEngine.middleware())
}

function setupControllers(bot: Bot) {
	bot.use(startController)
	bot.use(stopController)
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
