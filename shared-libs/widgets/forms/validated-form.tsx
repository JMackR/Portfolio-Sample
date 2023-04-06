import React, { createContext, FC, useState, useLayoutEffect, PropsWithChildren, useCallback } from 'react'
import { Validator } from '@sample/utilities/validators'
import _, { omit, setWith } from 'lodash'

export const ValidatedFormContext = createContext<{
  onSubmit: () => Promise<{ [key: string]: string }>
  error: { [role: string]: string }
  hasErrors: boolean
  value: { [role: string]: string }
  validators: { [role: string]: Validator[] }
  onChangeValue: (role: string, value?: string | undefined) => void
  onChangeValues: (value?: any) => void
}>({
  onSubmit: async () => ({}),
  error: {},
  value: {},
  hasErrors: false,
  validators: {},
  onChangeValue: (_role: string, _value?: string | undefined) => {},
  onChangeValues: (value?: any) => {},
})

export const ValidatedForm: FC<
  PropsWithChildren<{
    validators: { [role: string]: Validator[] }
  }>
> = (props) => {
  const { children, validators } = props

  const [hasErrors, setHasErrors] = useState(false)
  const [error, setError] = useState<{ [key: string]: string }>({})
  const [value, setValue] = useState<{ [key: string]: string }>({})

  const onChangeValue = useCallback((role: string, next: any) => {
    setError(omit(error, [role]))
    setValue((value) => setWith({ ...value }, `${role}`, next))
  }, [])

  // Used to change multiple values at once, otherwise race conditions happen
  // Example would be for address page where we could be updating 4 values all at once
  const onChangeValues = (value?: any) => {
    let copyError: any = { ...error }
    Object.keys(copyError).forEach((key) => {
      if (value[key]) {
        delete copyError[key]
      }
    })

    setError(copyError)
  }

  /**
   * Listen for errors after the input field has had a chance to react to the input
   */
  useLayoutEffect(() => {
    getErrors().then((errs) => {
      setHasErrors(!_.isEmpty(errs))
    })
  }, [value])

  const onSubmit = async () => {
    const errors = await getErrors()
    setError(errors)
    return errors
  }

  const getErrors = async () => {
    const error: { [key: string]: string } = {}
    // tslint:disable-next-line: forin

    for (const role in validators) {
      try {
        for (const validator of validators[role]) {
          await validator(value[role])
        }
      } catch (validationError) {
        // @ts-ignore
        error[role] = validationError.message
      }
    }

    return error
  }

  return (
    <ValidatedFormContext.Provider value={{ hasErrors, onSubmit, value, error, validators, onChangeValue, onChangeValues }}>
      {children}
    </ValidatedFormContext.Provider>
  )
}
