import { Context, SessionFlavor } from 'grammy'
import { I18nContextFlavor, TemplateData } from '@grammyjs/i18n'
import { Extra } from './telegram.js'
import { Database } from './database.js'

export interface Custom<C extends Context> {
	text: (
		text: string,
		templateData?: TemplateData,
		extra?: Extra
	) => ReturnType<C['reply']>
	db: Database
}

export type CustomContextMethods = Custom<Context>

export type CustomContext = Context &
	Custom<Context> &
	I18nContextFlavor &
	SessionFlavor<{}>
