import type { TextColors, TextTypes } from '@sample/themes'

export interface StripeTextEntryProps {
  text?: string

  textType?: keyof TextTypes
  /**
   * Optional override default Stripe element text input color
   * @default: primary1
   */
  textColor?: keyof TextColors
  /**
   * Optional override default Stripe element hint color
   * @default: primary2
   */
  hintColor?: keyof TextColors

  /**
   * Sets the color of the cursor and selection when the text box is in focus.
   */
  tintColor?: keyof TextColors

  /**
   * Text displayed when no content has been entered in the text box.
   */
  hint?: string

  /**
   * Used to provide Stripe element text input
   */
  stripeInputType?: 'card-number' | 'card-exp' | 'card-cvc'
}
