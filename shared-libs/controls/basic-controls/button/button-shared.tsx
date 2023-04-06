import { TextColors } from '@sample/themes'
import { LocalSVGSource } from '../image'
import { ButtonPropsBase, ButtonType } from './button-props-base'

export const textColorForCurrentButtonType = (buttonType: ButtonType): keyof TextColors => {
  switch (buttonType) {
    default:
    case 'primary':
      return 'primary3'
    case 'secondary':
      return 'primary4'
    case 'selector':
      return 'primary3'
    case 'transparent':
      return 'primary1'
    case 'disabled':
      return 'primary2'
    case 'danger':
      return 'primary4'
  }
}

// @ts-ignore
export const isJSXElement = (thingToTest: ButtonPropsBase['icon']): thingToTest is JSX.Element =>
  !!thingToTest && (thingToTest as JSX.Element).props !== undefined

// @ts-ignore
export const isLocalSVGSource = (thingToTest: ButtonPropsBase['icon']): thingToTest is LocalSVGSource =>
  !!thingToTest && (thingToTest as LocalSVGSource).SVG !== undefined
