import { I18nManager } from 'react-native'
import I18n from 'i18n-js'
import memoize from 'lodash.memoize'
import * as RNLocalize from 'react-native-localize'
import * as OuI18n from './oui18n.d'

// See formats: https://github.com/fnando/i18n-js

// See plurals: http://cldr.unicode.org/index/cldr-spec/plural-rules
// E.g. zero, one, two, few, many, other

export const translate: OuI18n.MemoizedTranslateFunction = memoize(
  (scope, options) => I18n.translate(scope, options),
  (scope, options) => (options ? scope + JSON.stringify(options) : scope)
)

export const localizeNumber: OuI18n.LocalizeNumberFunction = (num, options) => {
  return I18n.toNumber(num, options)
}

export const localizePercentage: OuI18n.LocalizePercentageFunction = (num, options) => {
  return I18n.toPercentage(num, options)
}

export const localizeCurrency: OuI18n.LocalizeCurrencyFunction = (num, options) => {
  return I18n.toCurrency(num, options)
}

export const localizeDateTime: OuI18n.LocalizeDateTimeFunction = (scope, value) => {
  return I18n.toTime(scope, value)
}

export const localizeHumanSize: OuI18n.LocalizeHumanSizeFunction = (num, options) => {
  return I18n.toHumanSize(num, options)
}

export const setI18nConfig = (translations: OuI18n.TranslationsFuncDict) => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false }

  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback

  // clear translation cache
  if (translate.cache.clear) {
    translate.cache.clear()
  }
  // update layout direction
  I18nManager.forceRTL(isRTL)

  // set i18n-js config
  I18n.translations = { [languageTag]: translations[languageTag]() }
  I18n.locale = languageTag
}
