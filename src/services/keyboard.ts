import type { I18nContext } from '@grammyjs/i18n'

export const monsterAttackKeyboard = (i18n: I18nContext) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: i18n.t('joinFight'),
          callback_data: 'join_fight'
        }
      ]
    ]
  }
})
