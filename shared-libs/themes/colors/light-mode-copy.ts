// NOTE: THIS IS THE ORIGINAL/EXISTING COLOR FILE BEFORE REDESIGN IMPLEMENTATION -ls

// @ts-nocheck
import deepFreeze from 'deep-freeze'
import { ColorTheme } from '../type-defs'

export const LIGHT_MODE_THEME_ID = 'light_mode'

export const LIGHT_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: LIGHT_MODE_THEME_ID,
  displayName: 'Light mode',
  shade: 'light',
  colors: {
    // Colors
    brand: '#004763',
    highlight: '#99E2F6',
    brandHover: '#43B893',
    brandPressed: '#0096d1',
    brandHighlight: '#DEF3EC',
    black: '#100D23',
    grey: '#C1C1C1',
    crystal: '#FFFFFF',
    crystalHover: '#F7F7F7',
    crystalPressed: '#EEEEEE',
    offWhite: '#F7F7F7',
    snowWhite: '#FFFFFF',
    paintbrushRed: '#E05666',
    lightErrorRed: '#FEF2F2',
    darkErrorRed: '#991B1B',
    granite: '#ABABAB',
    disabled: '#C6CCCE',
    overlay: 'rgba(0,0,0,0)',
    overlayDark: 'rgba(0,0,0,0.7)',
    clear: 'rgba(0,0,0,0)',
    red: '#FF0000',
    border: '#D8E0E3',
    lightGrey: '#F8F9F9',
    neutral500: '#717F85',
    neutral700: '#394043',
    neutral900: '#0E1011',
    generic: '#FDF3EE',

    communityBlue: '#0084D4',
    communityBlueLight: '#66C9E1',
    larchYellow: '#F4BE19',
    larchYellowHover: '#F5D624',
    larchYellowPressed: '#F3A70C',
    communityYellow: '#FBDE97',
    communityYellowDark: '#F8D28B',
    salmon: '#FF8F81',
    peach: '#FEF3EE',
    success: '#059669',
    successLight: '#10B981',
    successBackground: '#ECFDF5',
    // GreyScale
    emoBlack: '#000000',
    neutralGrey: '#555F64',
    obsidian: '#121212',
    basalt: '#8A8A8A',
    limestone: '#C3D0DB',
    limestoneHover: '#EEEEEE',
    limestonePressed: '#D0D0D0',
    quartz: '#FAFAFA',
    launchLogo: '#FFF3ED',
    deepBlue: '#001833',

    // Special

    alwaysDark: '#121212',
    alwaysLight: '#FFFFFF',
  },
  fontColors: {
    primary: 'brand',
    primaryAlt: 'crystal',
    secondary: 'basalt',
    tertiary: 'grey',
    hint: 'granite',
    link: 'brand',
    error: 'paintbrushRed',
    darkError: 'darkErrorRed',
    alwaysLight: 'alwaysLight',
    alwaysDark: 'alwaysDark',
    limestoneHover: 'limestoneHover',
    communityYellow: 'communityYellow',
    success: 'success',
    successLight: 'successLight',
    overlay: 'overlay',
    overlayDark: 'overlayDark',
    launchLogo: 'launchLogo',
    deepBlue: 'deepBlue',
    emoBlack: 'emoBlack',
    communityBlue: 'communityBlue',
    neutral500: 'neutral500',
    neutral700: 'neutral700',
    neutral900: 'neutral900',
  },
  backgroundColors: {
    primary: 'brand',
    secondary: 'crystal',
    tertiary: 'limestone',
    alwaysLight: 'alwaysLight',
    alwaysDark: 'alwaysDark',
    overlay: 'overlay',
    error: 'paintbrushRed',
    highlight: 'highlight',
    link: 'brand',
    unread: 'brandHighlight',
    grey: 'limestoneHover',
    lightError: 'lightErrorRed',
    quote: 'peach',
    communityYellow: 'communityYellow',
    communityYellowDark: 'communityYellowDark',
    neutralGrey: 'neutralGrey',
    communityBlueLight: 'communityBlueLight',
    deepBlue: 'deepBlue',
    lightGrey: 'lightGrey',
    success: 'successBackground',
    generic: 'generic',
  },
})
