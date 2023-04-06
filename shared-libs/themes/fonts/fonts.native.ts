import { Platform } from 'react-native'
import type { FontTheme, FontWeight, FontStyle } from '../type-defs'

const fontBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'ABCSocialCondensed-Black',
    fontWeight: Platform.select<FontWeight>({
      ios: '900',
      android: '900',
    }),
  }
}

const fontDemiBold = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'ABCSocial-Regular',
    fontWeight: Platform.select<FontWeight>({
      ios: '700',
      android: '700',
    }),
  }
}

const fontRegular = (size: { fontSize: number; lineHeight: number }): FontStyle => {
  return {
    ...size,
    fontFamily: 'ABCSocial-Regular',
    fontWeight: '400',
  }
}

export const MOBILE_FONT_THEME: FontTheme = {
  identifier: 'standard',
  displayName: 'Standard',
  baseMargin: 4,
  baseBorder: { cornerRadius: { small: 4, large: 8 }, lineWeight: { light: 1, heavy: 4 } },
  fonts: {
    heading1: fontBold({
      fontSize: 56,
      lineHeight: 67.2,
    }),
    heading2: fontBold({
      fontSize: 48,
      lineHeight: 57.6,
    }),
    heading3: fontBold({
      fontSize: 40,
      lineHeight: 48,
    }),
    heading4: fontBold({
      fontSize: 32,
      lineHeight: 41.6,
    }),
    heading5: fontBold({
      fontSize: 28,
      lineHeight: 36.4,
    }),
    heading6: fontBold({
      fontSize: 24,
      lineHeight: 33.6,
    }),
    heading7: fontBold({
      fontSize: 20,
      lineHeight: 28,
    }),
    primary1: fontDemiBold({
      fontSize: 20,
      lineHeight: 30,
    }),
    primary2: fontDemiBold({
      fontSize: 18,
      lineHeight: 27,
    }),
    primary3: fontDemiBold({
      fontSize: 16,
      lineHeight: 24,
    }),
    primary4: fontDemiBold({
      fontSize: 14,
      lineHeight: 21,
    }),
    primary5: fontDemiBold({
      fontSize: 12,
      lineHeight: 18,
    }),
    secondary1: fontRegular({
      fontSize: 20,
      lineHeight: 30,
    }),
    secondary2: fontRegular({
      fontSize: 18,
      lineHeight: 27,
    }),
    secondary3: fontRegular({
      fontSize: 16,
      lineHeight: 24,
    }),
    secondary4: fontRegular({
      fontSize: 14,
      lineHeight: 21,
    }),
    secondary5: fontRegular({
      fontSize: 12,
      lineHeight: 18,
    }),
  },
}
