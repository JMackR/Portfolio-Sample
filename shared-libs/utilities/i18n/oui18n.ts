// @ts-nocheck
import I18n from 'i18n-js'
import memoize from 'lodash.memoize'
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
  const fallback = 'en'
  // navigator.languages returns a ranked array of user preferred languages from
  const bestAvailable = findBestAvailableLanguage(Object.keys(translations), navigator.languages || [navigator.language])

  const languageTag = bestAvailable || fallback

  // clear translation cache
  if (translate.cache.clear) {
    translate.cache.clear()
  }

  // set i18n-js config
  I18n.translations = { [languageTag]: translations[languageTag]() }
  I18n.locale = languageTag
}

const findBestAvailableLanguage = (availableLanguages: string[], userLanguages: string[]): string => {
  // Sample through all languages selected by the user, which are sorted by rank, and see if we have an available language for them
  // We are also slicing down to just the 2 letter abbreviations for now
  // Doing this lets us match something like Spanish - Mexico (es-MX) to just Spanish (es)
  return userLanguages
    .find((language: string) => availableLanguages.find((l) => l.slice(0, 2) === language.slice(0, 2)))
    ?.slice(0, 2)
}
