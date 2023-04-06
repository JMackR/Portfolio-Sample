import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { TextEntry } from '../text-entry'
import { TextEntryProps } from '../text-entry.props'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe('Text Entry', () => {
  let props: TextEntryProps
  beforeEach(() => {
    props = {
      hint: 'Test Hint',
    }
  })

  describe('has text', () => {
    beforeEach(() => {
      props = {
        text: '123672',
      }
    })
    it('should render the text', () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toBeDefined()
    })
  })

  describe('has label text', () => {
    beforeEach(() => {
      props = {
        hint: 'Test Hint',
      }
    })
    it('should render the text', () => {
      const { getByText } = render(<TextEntry {...props} />)
      expect(getByText(props.hint as string)).toBeDefined()
    })
  })

  describe('on text change', () => {
    beforeEach(() => {
      props = {
        text: 'Test Text',
        textChangeHandler: jest.fn(),
      }
    })
    it('should call textChangeHandler', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.change(input, { target: { value: 'new value' } })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledTimes(1)
      })
    })
    it('should call correct value', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.change(input, { target: { value: 'new value' } })
      await waitFor(() => {
        expect(props.textChangeHandler).toHaveBeenCalledWith('new value')
      })
    })
  })

  describe('has keyboard type', () => {
    beforeEach(() => {
      props = {
        text: '561651651',
        keyboardType: 'number-pad',
      }
    })
    it('should have keyboard type as number-pad', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toHaveAttribute('type', 'number-pad')
    })
  })

  describe('has inputMode', () => {
    beforeEach(() => {
      props = {
        text: '135156',
        inputMode: 'numeric',
      }
    })
    it('should have input mode as numeric', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toHaveAttribute('inputmode', 'numeric')
    })
  })

  describe('is multiline', () => {
    beforeEach(() => {
      props = {
        text: '135156',
        inputMode: 'numeric',
        linesMinimum: 3,
      }
    })
    it('should render textarea', async () => {
      const { getByRole } = render(<TextEntry {...props} />)
      const input = getByRole('textbox')
      expect(input).toBeInTheDocument()
    })
  })

  describe('has secureTextEntry', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        secureTextEntry: true,
      }
    })
    it('should have type as password', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('on key press', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        keyPressHandler: jest.fn(),
      }
    })
    it('should call keyPressHandler', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.keyDown(input, { key: 'A', code: 'KeyA' })
      await waitFor(() => {
        expect(props.keyPressHandler).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('input disabled', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        inputDisabled: true,
      }
    })
    it('should have disabled true', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      expect(input).toHaveAttribute('disabled')
    })
  })

  describe('on focus', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        focusHandler: jest.fn(),
      }
    })
    it('should call focusHandler', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.focus(input)
      await waitFor(() => {
        expect(props.focusHandler).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('on focus out', () => {
    beforeEach(() => {
      props = {
        text: 'default text',
        blurHandler: jest.fn(),
        endEditingHandler: jest.fn(),
      }
    })
    it('should call blurHandler', async () => {
      const { getByDisplayValue } = render(<TextEntry {...props} />)
      const input = getByDisplayValue(props.text as string)
      fireEvent.focusOut(input)
      await waitFor(() => {
        expect(props.blurHandler).toHaveBeenCalledTimes(1)
        expect(props.endEditingHandler).toHaveBeenCalledTimes(1)
      })
    })
  })
})

describe('Text Entry Snapshot Tests', () => {
  it('Text Entry has placeholder renders properly', () => {
    const tree = renderer.create(<TextEntry hint={'Test Hint'} />)
    expect(tree).toMatchSnapshot()
  })
  it('Text Entry is disabled renders properly', () => {
    const tree = renderer.create(<TextEntry inputDisabled={true} />)
    expect(tree).toMatchSnapshot()
  })

  it('Text Color primary renders properly', () => {
    const tree = renderer.create(<TextEntry textColor={'primary1'} />)
    expect(tree).toMatchSnapshot()
  })
})
