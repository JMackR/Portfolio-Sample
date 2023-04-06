import { DARK_MODE_COLOR_THEME, LIGHT_MODE_COLOR_THEME } from '../colors'
import type { ColorTheme } from '../type-defs'

export const DefaultColorTheme = LIGHT_MODE_COLOR_THEME

const hardCodedColorThemes = [LIGHT_MODE_COLOR_THEME, DARK_MODE_COLOR_THEME]

export const colorThemes: { [key: string]: ColorTheme } = {}
hardCodedColorThemes.forEach((theme) => {
  colorThemes[theme.identifier] = theme
})
