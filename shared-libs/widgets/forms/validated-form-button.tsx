import { ValidatedFormContext } from './validated-form'
import { Button, ButtonPropsBase } from '@sample/basic-controls/button'
import _ from 'lodash'
import React, { FC, forwardRef, useContext, useState } from 'react'

export const ValidatedFormButton: FC<
  ButtonPropsBase & {
    onClick: () => void
    ref?: any
  }
> = forwardRef((props, ref) => {
  const { onClick, buttonType, disabled: propsDisabled, testID, loading: propsLoading } = props
  const [loading, setLoading] = useState(false)
  const { onSubmit, error } = useContext(ValidatedFormContext)

  const onPress = async () => {
    try {
      // Prevent double click
      if (propsLoading) {
        return
      }

      setLoading(true)
      const err = await onSubmit()
      if (!_.isEmpty(err)) {
        return
      }

      onClick()
    } catch (error) {
      console.log('Onclick error', error)
    }
  }

  const hasError = !_.isEmpty(error)
  const disabled = propsDisabled || hasError

  return (
    <Button
      testID={testID}
      {...props}
      disabled={disabled}
      buttonType={disabled ? 'disabled' : buttonType}
      onClick={onPress}
      loading={propsLoading}
      ref={ref}
    />
  )
})
