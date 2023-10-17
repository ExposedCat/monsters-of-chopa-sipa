import { InlineKeyboard } from 'grammy'
import type { I18nContext } from '@grammyjs/i18n'

export const monsterAttackKeyboard = (i18n: I18nContext) => ({
  reply_markup: new InlineKeyboard().text(i18n.t('joinFight'), 'join_fight')
})
