import { ValidatedFormContext } from './validated-form'
import { ValidatedInput, TextEntryRef, InputProps } from '@sample/basic-controls'
import { WithValidatorsProps } from '@sample/utilities/validators'
import _ from 'lodash'
import React, { useContext, useEffect, forwardRef } from 'react'
import { TextTypes } from '@sample/themes'

export interface ValidatedFormInputProps
  extends InputProps,
    Pick<WithValidatorsProps, 'validateOnChange' | 'validatedOnChangeAction'> {
  roleProp: string
}

export const ValidatedFormInput = forwardRef<TextEntryRef, ValidatedFormInputProps>((props, ref) => {
  const { returnKeyType, roleProp, onSubmitEditing, textChangeHandler, text, error: defaultError } = props
  const { onSubmit, error, validators, onChangeValue, value } = useContext(ValidatedFormContext)

  useEffect(() => onChangeValue(roleProp, text), [text])

  const onChange = (newValue?: string) => {
    textChangeHandler && textChangeHandler(newValue)
    // Commenting out onChangeValue here because we have it already above(line 18), but leaving
    // in case we have issues with this commented out
    // onChangeValue(roleProp, newValue)
  }

  /**
   * with 'done' returnKeyType, do error validation checking when user hits done on keyboard,
   * then proceed to do the actual action
   */
  const onSubmitEditingWithValidation = (finalValue?: string) => {
    if (returnKeyType === 'done' && finalValue) {
      onSubmit().then((errors) => {
        if (_.isEmpty(errors)) {
          // no errors
          onSubmitEditing && onSubmitEditing(finalValue)
        }
      })
    }
  }

  return (
    <ValidatedInput
      ref={ref}
      {...props}
      text={value[roleProp]}
      textChangeHandler={onChange}
      onSubmitEditing={returnKeyType === 'done' ? onSubmitEditingWithValidation : onSubmitEditing}
      validators={validators[roleProp]}
      error={error[roleProp] || defaultError}
    />
  )
})
