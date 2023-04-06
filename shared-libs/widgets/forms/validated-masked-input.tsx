import { ValidatedFormContext } from './validated-form'
import { InputProps, MaskedInput, TextEntryRef } from '@sample/basic-controls'
import React, { useContext, useEffect, forwardRef } from 'react'

export const ValidatedMaskedInput = forwardRef<TextEntryRef, InputProps & { mask: string; roleProp: string }>(
  (props, ref) => {
    const { roleProp, textChangeHandler, text, error: defaultError, testID } = props

    const { error, validators, onChangeValue, value } = useContext(ValidatedFormContext)

    useEffect(() => onChangeValue(roleProp, text), [text])

    const onChange = (newValue?: string) => {
      textChangeHandler && textChangeHandler(newValue)
      onChangeValue(roleProp, newValue)
    }

    return (
      <MaskedInput
        ref={ref}
        {...props}
        text={value[roleProp]}
        textChangeHandler={onChange}
        validators={validators[roleProp]}
        error={error[roleProp] || defaultError}
        testID={testID}
      />
    )
  }
)
