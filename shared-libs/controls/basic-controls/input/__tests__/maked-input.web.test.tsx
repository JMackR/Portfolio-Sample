import React from 'react'
import { EmailValidator, WithValidatorsProps } from '@sample/utilities'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import { InputProps } from '../input.props'
import { MaskedInput } from '../masked-input'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('i18n-js')
jest.mock('@sample/assets', () => ({
  ActionClear: () => <div>ActionClear</div>,
}))
jest.mock('../../image/svgs/svg.tsx')
jest.mock('../../activity-indicator/activity-indicator.tsx')

describe('Masked Input', () => {
  let props: InputProps & WithValidatorsProps & { mask: string }
  describe('has phone mask', () => {
    beforeEach(() => {
      props = {
        validators: [EmailValidator],
        text: '1123456252',
        mask: '(000) 000-0000',
      }
    })
    it('should render number with provided mask', async () => {
      const { getByDisplayValue } = render(<MaskedInput {...props} />)
      const input = getByDisplayValue('(112) 345-6252')
      expect(input).toBeDefined()
    })
  })

  describe('on text change', () => {
    beforeEach(() => {
      props = {
        validators: [EmailValidator],
        text: '1123456252',
        mask: '(000) 000-0000',
        textChangeHandler: jest.fn(),
      }
    })
    it('should call textChangeHandler', async () => {
      const { getByDisplayValue } = render(<MaskedInput {...props} />)
      const input = getByDisplayValue('(112) 345-6252')
      fireEvent.change(input, { target: { value: '1658468rgrgrg486' } })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledTimes(1)
      })
    })

    it('should call with correct value', async () => {
      const { getByDisplayValue } = render(<MaskedInput {...props} />)
      const input = getByDisplayValue('(112) 345-6252')
      fireEvent.change(input, { target: { value: '1658468rgrgrg486' } })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledWith('1658468486')
      })
    })
  })
})
