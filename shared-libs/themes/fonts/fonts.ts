import type { FontTheme } from '../type-defs'

export const WEB_FONT_THEME: FontTheme = {
  identifier: 'web',
  displayName: 'Web',
  baseMargin: 4,
  baseBorder: {
    cornerRadius: { small: 4, large: 8 },
    lineWeight: { light: 1, heavy: 3 },
  },
  fonts: {
    heading1: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 56,
      lineHeight: 67.2,
      fontWeight: '900',
    },
    heading2: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 48,
      lineHeight: 57.6,
      fontWeight: '900',
    },
    heading3: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 40,
      lineHeight: 48,
      fontWeight: '900',
    },
    heading4: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 32,
      lineHeight: 41.6,
      fontWeight: '900',
    },
    heading5: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 28,
      lineHeight: 36.4,
      fontWeight: '900',
    },
    heading6: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 24,
      lineHeight: 33.6,
      fontWeight: '900',
    },
    heading7: {
      fontFamily: 'ABCSocialCondensed-Black',
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '900',
    },
    primary1: {
      fontFamily: 'ABCSocial-Bold',
      fontSize: 20,
      lineHeight: 30,
      fontWeight: '700',
    },
    primary2: {
      fontFamily: 'ABCSocial-Bold',
      fontSize: 18,
      lineHeight: 27,
      fontWeight: '700',
    },
    primary3: {
      fontFamily: 'ABCSocial-Bold',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '700',
    },
    primary4: {
      fontFamily: 'ABCSocial-Bold',
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '700',
    },
    primary5: {
      fontFamily: 'ABCSocial-Bold',
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '700',
    },
    secondary1: {
      fontFamily: 'ABCSocial-Regular',
      fontSize: 20,
      lineHeight: 30,
      fontWeight: '400',
    },
    secondary2: {
      fontFamily: 'ABCSocial-Regular',
      fontSize: 18,
      lineHeight: 27,
      fontWeight: '400',
    },
    secondary3: {
      fontFamily: 'ABCSocial-Regular',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    secondary4: {
      fontFamily: 'ABCSocial-Regular',
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '400',
    },
    secondary5: {
      fontFamily: 'ABCSocial-Regular',
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400',
    },
  },
}
