import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import I18n from 'i18n-js'
import { LocalizePhoneNumberFunction } from './oui18n.d'

const DEFAULT_PHONE_NUMBER_LOCALE = 'US'

export const localizePhoneNumber: LocalizePhoneNumberFunction = (num) => {
  const phoneUtil = PhoneNumberUtil.getInstance()

  const pn = phoneUtil.parseAndKeepRawInput(num, DEFAULT_PHONE_NUMBER_LOCALE)
  return phoneUtil.format(pn, PhoneNumberFormat.NATIONAL)
}

export const getCurrentLocale = () => {
  return I18n.currentLocale()
}
