import React from 'react'
import { EmailValidator, WithValidatorsProps } from '@sample/utilities'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import { InputProps } from '../input.props'
import { ValidatedInput } from '../validated-input'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('i18n-js')
jest.mock('@sample/assets', () => ({
  ActionClear: () => <div>ActionClear</div>,
}))
jest.mock('../../image/svgs/svg.tsx')
jest.mock('../../activity-indicator/activity-indicator.tsx')

describe('Validated Input', () => {
  let props: InputProps & WithValidatorsProps
  describe('has Email Validator', () => {
    beforeEach(() => {
      props = {
        validators: [EmailValidator],
        text: 'hello',
        validateOnChange: true,
        validatedOnChangeAction: jest.fn(),
      }
    })

    it('should render text', async () => {
      const { getByDisplayValue } = render(<ValidatedInput {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toBeDefined()
    })

    it('should call validatedOnChangeAction', async () => {
      const { getByDisplayValue } = render(<ValidatedInput {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.change(input, { target: { value: '123abc' } })
      await waitFor(() => {
        expect(props.validatedOnChangeAction).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('on text change', () => {
    beforeEach(() => {
      props = {
        validators: [EmailValidator],
        text: 'text text',
        textChangeHandler: jest.fn(),
      }
    })
    it('should call textChangeHandler', async () => {
      const { getByDisplayValue } = render(<ValidatedInput {...props} />)
      const input = getByDisplayValue('text text')
      fireEvent.change(input, { target: { value: '1658468486' } })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledTimes(1)
      })
    })
  })
})
