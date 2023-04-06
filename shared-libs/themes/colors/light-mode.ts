// @ts-nocheck
import deepFreeze from 'deep-freeze'
import { ColorTheme } from '../type-defs'

export const LIGHT_MODE_THEME_ID = 'light_mode'

export const LIGHT_MODE_COLOR_THEME: ColorTheme = deepFreeze({
  identifier: LIGHT_MODE_THEME_ID,
  displayName: 'Light mode',
  shade: 'light',
  colors: {
    grey50: '#F9F9F9',
    grey100: '#F0F0F0',
    grey200: '#E6E6E6',
    grey300: '#C8C8C8',
    grey400: '#AAAAAF',
    grey500: '#878787',
    grey600: '#696969',
    grey700: '#555555',
    grey800: '#3C3C3C',
    grey900: '#23231E',
    white100: '#FFFFFF',
    blue50: '#D2EBF0',
    blue100: '#4B64F0',
    purple50: '#C8C8E7',
    red100: '#FFECEE',
    red200: '#F67281',
    red300: '#F0142D',
    red400: '#F0142D',
    orange100: '#FFF3E8',
    orange200: '#F9B172',
    orange300: '#F57D14',
    orange400: '#F57D14',
    green100: '#F4FFF9',
    green200: '#88DEAB',
    green300: '#39C873',
    green400: '#39C873',
    green500: '#C3E1C8',
    yellow100: '#FDF9E0',
    yellow200: '#FAF0B9',
    yellow300: '#F5E064',
    yellow400: '#F5E064',
    yellow500: '#EBEBDC',
    transparent: '#00000000',
  },
  fontColors: {
    primary1: 'grey600',
    primary2: 'grey400',
    primary3: 'grey900',
    primary4: 'white100',
    primary5: 'grey500',
    primary6: 'grey700',
    primary7: 'grey800',
    highlight1: 'yellow300',
    highlight2: 'yellow200',
    support1: 'yellow500',
    support2: 'green500',
    support3: 'blue50',
    support4: 'purple50',
    support5: 'blue100',
    success1: 'green100',
    success2: 'green200',
    success3: 'green300',
    success4: 'green400',
    warning1: 'yellow100',
    warning2: 'yellow200',
    warning3: 'yellow300',
    warning4: 'yellow400',
    error1: 'red100',
    error2: 'red200',
    error3: 'red300',
    error4: 'red400',
    transparent: 'transparent',
  },
  backgroundColors: {
    background1: 'white100',
    background2: 'grey900',
    background3: 'yellow100',
    background4: 'grey200',
    background5: 'grey50',
    highlight1: 'yellow300',
    highlight2: 'yellow200',
    support1: 'yellow500',
    support2: 'green500',
    support3: 'blue50',
    support4: 'purple50',
    support5: 'blue100',
    success1: 'green100',
    success2: 'green200',
    success3: 'green300',
    success4: 'green400',
    warning1: 'yellow100',
    warning2: 'yellow200',
    warning3: 'yellow300',
    warning4: 'yellow400',
    error1: 'red100',
    error2: 'red200',
    error3: 'red300',
    error4: 'red400',
    transparent: 'transparent',
    border1: 'grey400',
    border2: 'grey300',
    border3: 'grey100',
  },
})
