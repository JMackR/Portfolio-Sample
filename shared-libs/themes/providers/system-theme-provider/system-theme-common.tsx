import { LIGHT_MODE_COLOR_THEME, DARK_MODE_COLOR_THEME } from '../../colors'
import { WEB_FONT_THEME } from '../../fonts/fonts'
// import { MOBILE_FONT_THEME } from '../../fonts/fonts.native'
export type SystemThemeHook = () => {
  systemColorTheme: SystemColorTheme | null
  systemDrivenColorThemeId: string
  systemFontTheme: SystemFontTheme | null
  systemDrivenFontThemeId: string
}

export enum SystemColorTheme {
  Light,
  Dark,
}

export const MATCH_SYSTEM_COLOR_THEME_ID = 'MATCH_SYSTEM_COLOR_THEME'

export const colorThemeIdFromSystemColorTheme = (systemColorTheme: SystemColorTheme) => {
  if (systemColorTheme === SystemColorTheme.Light) {
    return LIGHT_MODE_COLOR_THEME.identifier
  }
  return DARK_MODE_COLOR_THEME.identifier
}

export enum SystemFontTheme {
  Mobile,
  Desktop,
}

export const fontThemeIdFromSystemFontTheme = (systemFontTheme: SystemFontTheme) => {
  // if (systemFontTheme === SystemFontTheme.Mobile) {
  //   return MOBILE_FONT_THEME.identifier
  // }
  return WEB_FONT_THEME.identifier
}
