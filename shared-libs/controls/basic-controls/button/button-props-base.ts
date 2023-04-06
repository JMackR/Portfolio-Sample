import type { AnalyticsProps } from '@sample/analytics/analytics'
import { TextColors } from '@sample/themes/type-defs'
import type { LocalSVGSource } from '../image'

export type ButtonType = 'primary' | 'secondary' | 'selector' | 'disabled' | 'transparent' | 'danger'
export type ButtonSize = 'large' | 'medium' | 'small' | 'bordered' | 'flat' | 'xlarge' | 'wide'

export interface ButtonPropsBase extends AnalyticsProps {
  /**
   * Text to display inside the button
   */
  title?: string
  pressedTitle?: string
  header?: string
  placeholder?: string
  /**
   * Optional, used to override the default color of text inside the button
   */
  titleColor?: keyof TextColors
  pressedTitleColor?: keyof TextColors
  titleDecoration?: 'none' | 'underline' | 'line-through' | 'underline line-through'
  /**
   * Optional subtitle to display below the button text
   */
  subtitle?: string

  buttonType: ButtonType

  buttonSize: ButtonSize

  boxShadow?: string

  /*
   * Removes left and right padding to the button
   */
  doNotApplySidePadding?: boolean

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string | undefined

  leftIcon?: JSX.Element | LocalSVGSource
  centerIcon?: JSX.Element | LocalSVGSource
  rightIcon?: JSX.Element | LocalSVGSource
  /**
   * If true, disable all interactions for this component.
   */
  disabled?: boolean | undefined
  onClear?: boolean | undefined
  /**
   * TV next focus down (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusDown?: number | undefined
  onPressHint?: string
  /**
   * TV next focus forward (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusForward?: number | undefined

  /**
   * TV next focus left (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusLeft?: number | undefined

  /**
   * TV next focus right (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusRight?: number | undefined

  /**
   * TV next focus up (see documentation for the View component).
   *
   * @platform android
   */
  nextFocusUp?: number | undefined

  /**
   * Text to display for blindness accessibility features
   */
  accessibilityLabel?: string | undefined

  loading?: boolean

  /**
   * When true, there is no button radius
   */
  noRadius?: boolean
}
