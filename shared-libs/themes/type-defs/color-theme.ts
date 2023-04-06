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
  grey50: string
  grey100: string
  grey200: string
  grey300: string
  grey400: string
  grey500: string
  grey600: string
  grey700: string
  grey800: string
  grey900: string
  white100: string
  blue50: string
  blue100: string
  purple50: string
  red100: string
  red200: string
  red300: string
  red400: string
  orange100: string
  orange200: string
  orange300: string
  orange400: string
  green100: string
  green200: string
  green300: string
  green400: string
  green500: string
  yellow100: string
  yellow200: string
  yellow300: string
  yellow500: string
  transparent: string
}
export interface TextColors {
  primary1: keyof Colors
  primary2: keyof Colors
  primary3: keyof Colors
  primary4: keyof Colors
  primary5: keyof Colors
  primary6: keyof Colors
  primary7: keyof Colors
  highlight1: keyof Colors
  highlight2: keyof Colors
  support1: keyof Colors
  support2: keyof Colors
  support3: keyof Colors
  support4: keyof Colors
  support5: keyof Colors
  success1: keyof Colors
  success2: keyof Colors
  success3: keyof Colors
  success4: keyof Colors
  warning1: keyof Colors
  warning2: keyof Colors
  warning3: keyof Colors
  warning4: keyof Colors
  error1: keyof Colors
  error2: keyof Colors
  error3: keyof Colors
  error4: keyof Colors
}
export interface BackgroundColors {
  background1: keyof Colors
  background2: keyof Colors
  background3: keyof Colors
  background4: keyof Colors
  background5: keyof Colors
  highlight1: keyof Colors
  highlight2: keyof Colors
  support1: keyof Colors
  support2: keyof Colors
  support3: keyof Colors
  support4: keyof Colors
  support5: keyof Colors
  success1: keyof Colors
  success2: keyof Colors
  success3: keyof Colors
  success4: keyof Colors
  warning1: keyof Colors
  warning2: keyof Colors
  warning3: keyof Colors
  warning4: keyof Colors
  error1: keyof Colors
  error2: keyof Colors
  error3: keyof Colors
  error4: keyof Colors
  transparent: keyof Colors
  border1: keyof Colors
  border2: keyof Colors
  border3: keyof Colors
}
