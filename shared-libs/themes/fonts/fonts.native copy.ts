import { Platform } from 'react-native'
import type { FontTheme, FontWeight, FontStyle } from '../type-defs'

const font900 = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'fieldwork-geo-bold',
    fontWeight: Platform.select<FontWeight>({
      ios: '900',
      android: 'normal',
    }),
  }
}

const fontBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'fieldwork-geo-bold',
    fontWeight: Platform.select<FontWeight>({
      ios: 'bold',
      android: 'normal',
    }),
  }
}

const fontSemiBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'fieldwork-geo-regular',
    fontWeight: Platform.select<FontWeight>({
      ios: '600',
      android: 'normal',
    }),
  }
}

const fontRegular = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'fieldwork-geo-regular',
    fontWeight: 'normal',
  }
}

export const MOBILE_FONT_THEME: FontTheme = {
  identifier: 'standard',
  displayName: 'Standard',
  baseMargin: 4,
  baseBorder: { cornerRadius: { small: 4, large: 8 }, lineWeight: { light: 1, heavy: 4 } },
  fonts: {
    headline1: font900({
      fontSize: 28,
      lineHeight: 32,
    }),
    headline2: fontRegular({
      fontSize: 24,
      lineHeight: 28,
    }),
    headline3: fontBold({
      fontSize: 24,
      lineHeight: 28,
    }),
    headline4: font900({
      fontSize: 20,
      lineHeight: 24,
    }),
    primaryBody1: fontBold({
      fontSize: 16,
      lineHeight: 20,
    }),
    primaryBody2: fontRegular({
      fontSize: 16,
      lineHeight: 20,
    }),
    primaryBody3: fontRegular({
      fontSize: 16,
      lineHeight: 18,
    }),
    secondaryBody1: fontBold({
      fontSize: 14,
      lineHeight: 16,
    }),
    secondaryBody2: fontRegular({
      fontSize: 14,
      lineHeight: 20,
    }),
    secondaryBody3: fontSemiBold({
      fontSize: 16,
      lineHeight: 24,
    }),
    tertiaryBody1: fontBold({
      fontSize: 12,
      lineHeight: 14,
    }),
    tertiaryBody2: fontRegular({
      fontSize: 12,
      lineHeight: 14,
    }),
    tertiaryBody3: fontSemiBold({
      fontSize: 14,
      lineHeight: 14,
    }),
  },
}
