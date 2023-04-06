import type { ToggleProps, ButtonPropsWeb } from '@sample/basic-controls'

export type FlexibleRowActionType = 'linktext' | 'groupedButton' | 'radio' | 'check' | 'switch' | undefined
export type FlexibleRowActionProps = string | ButtonPropsWeb | ToggleProps | undefined
