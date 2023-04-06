import type { LayoutChangeEvent } from 'react-native'
import { BackgroundColors } from '@sample/themes/'
import type { ButtonPropsBase } from './button-props-base'

export interface ButtonPropsNative extends ButtonPropsBase {
  onLayout?: (event: LayoutChangeEvent) => void
  tint?: keyof BackgroundColors
  /**
   * Handler to be called when the user taps the button
   */
  onClick: () => Promise<void>

  onLongClick?: () => Promise<void>
}
