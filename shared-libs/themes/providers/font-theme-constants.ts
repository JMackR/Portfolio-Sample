import { WEB_FONT_THEME } from '../fonts/fonts'
import type { FontTheme } from '../type-defs'

export const DefaultFontTheme = WEB_FONT_THEME

const hardCodedFontThemes = [WEB_FONT_THEME]

export const fontThemes: { [key: string]: FontTheme } = {}
hardCodedFontThemes.forEach((theme) => {
  fontThemes[theme.identifier] = theme
})
