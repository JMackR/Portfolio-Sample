import type { ToggleProps, ButtonPropsNative } from '@sample/basic-controls'

export type FlexibleRowActionType = 'linktext' | 'radio' | 'check' | 'switch' | 'button' | undefined
export type FlexibleRowActionProps = string | ButtonPropsNative | ToggleProps | undefined
