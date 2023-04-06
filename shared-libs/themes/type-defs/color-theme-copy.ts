export interface ColorTheme {
  identifier: string
  displayName: string
  shade: ThemeShade
  colors: Colors
  fontColors: TextColors
  backgroundColors: BackgroundColors
}

export type ThemeShade = 'light' | 'dark'

export interface Colors {
  // Colors
  paintbrushRed: string

  // Grayscale
  launchLogo: string
  obsidian: string
  basalt: string
  granite: string
  brand: string
  brandHover: string
  brandPressed: string
  brandHighlight: string
  larchYellow: string
  larchYellowHover: string
  larchYellowPressed: string
  communityYellow: string
  communityBlue: string
  communityBlueLight: string
  communityYellowDark: string
  quartz: string
  crystal: string
  crystalHover: string
  crystalPressed: string
  clear: string
  limestone: string
  limestoneHover: string
  limestonePressed: string
  offWhite: string
  neutralBlack: string
  neutralGrey: string
  // Special
  disabled: string
  alwaysDark: string
  alwaysLight: string
  overlay: string
  overlayDark: string
  highlight: string
  border: string
  salmon: string
  deepBlue: string
  generic: string
}

export interface TextColors {
  brand: keyof Colors
  primary: keyof Colors
  primaryAlt: keyof Colors
  secondary: keyof Colors
  tertiary: keyof Colors
  hint: keyof Colors
  link: keyof Colors
  error: keyof Colors
  darkError: keyof Colors
  alwaysLight: keyof Colors
  alwaysDark: keyof Colors
  communityYellow: keyof Colors
  success: keyof Colors
  successLight: keyof Colors
  overlay: keyof Colors
  launchLogo: keyof Colors
  deepBlue: keyof Colors
  emoBlack: keyof Colors
  neutralBlack: keyof Colors
  communityBlue: keyof Colors
  neutral500: keyof Colors
  neutral700: keyof Colors
  neutral900: keyof Colors
}

export interface BackgroundColors {
  primary: keyof Colors
  secondary: keyof Colors
  tertiary: keyof Colors
  overlay: keyof Colors
  overlayDark: keyof Colors
  alwaysLight: keyof Colors
  alwaysDark: keyof Colors
  error: keyof Colors
  lightError: keyof Colors
  highlight: keyof Colors
  link: keyof Colors
  unread: keyof Colors
  grey: keyof Colors
  quote: keyof Colors
  communityYellow: keyof Colors
  communityYellowDark: keyof Colors
  neutralGrey: keyof Colors
  communityBlueLight: keyof Colors
  deepBlue: keyof Colors
  lightGrey: keyof Colors
  success: keyof Colors
  generic: keyof Colors
}
