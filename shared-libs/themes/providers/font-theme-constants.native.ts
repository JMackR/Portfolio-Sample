import { MOBILE_FONT_THEME } from '../fonts/fonts.native'
import type { FontTheme } from '../type-defs'

export const DefaultFontTheme = MOBILE_FONT_THEME

const hardCodedFontThemes = [MOBILE_FONT_THEME]

export const fontThemes: { [key: string]: FontTheme } = {}
hardCodedFontThemes.forEach((theme) => {
  fontThemes[theme.identifier] = theme
})
