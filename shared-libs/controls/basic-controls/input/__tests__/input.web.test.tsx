import React from 'react'
import { translate } from '@sample/utilities/i18n'
import { render, fireEvent } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { Input } from '../input'
import { InputProps } from '../input.props'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('i18n-js')
jest.mock('@sample/assets', () => ({
  ActionClear: () => <div>ActionClear</div>,
}))
jest.mock('../../image/svgs/svg.tsx')
jest.mock('../../stripe-text-entry/stripe-text-entry.tsx')
jest.mock('../../activity-indicator/activity-indicator.tsx')

describe('Input', () => {
  let props: InputProps

  beforeEach(() => {
    props = {}
  })

  describe('has a title', () => {
    beforeEach(() => {
      props.title = 'Input Title'
    })

    it('render the title', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText(props.title as string)).toBeDefined()
    })
  })

  describe('has a tooltip icon and text', () => {
    beforeEach(() => {
      props.toolTipIcon = {
        SVG: () => <div>Icon</div>,
      }
      props.toolTipText = 'Tooltip Text'
    })

    // Currently the helper icon is not being rendered in input.tsx
    xit('should render the icon', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText('Icon')).toBeDefined()
    })
  })

  describe('has a tooltip icon but no text', () => {
    beforeEach(() => {
      props.toolTipIcon = {
        SVG: () => <div>Icon</div>,
      }
    })

    it('should render the icon', () => {
      const { queryByText } = render(<Input {...props} />)

      expect(queryByText('SVG')).toBeNull()
    })
  })

  describe('has tooltip text but no icon', () => {
    beforeEach(() => {
      props.toolTipText = 'Tooltip Text'
    })

    it('should render the icon', () => {
      const { queryByText } = render(<Input {...props} />)

      expect(queryByText('SVG')).toBeNull()
    })
  })

  describe('has a leadingIcon', () => {
    beforeEach(() => {
      props.leadingIcon = {
        SVG: () => <div>Icon</div>,
      }
    })

    it('should render the icon', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText('SVG')).toBeDefined()
    })
  })

  describe('has prefixText', () => {
    beforeEach(() => {
      props.prefixText = 'Prefix Text'
    })

    it('should render the prefix text', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText(props.prefixText as string)).toBeDefined()
    })
  })

  describe('is of a stripe input type', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-number'
    })

    it('should render the StripeTextEntry component', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText('Stripe Text Entry')).toBeDefined()
    })
  })

  describe('is not stripe input type', () => {
    beforeEach(() => {
      props.text = 'Text Entry'
    })

    it('should render the TextEntry component', () => {
      const { getByDisplayValue } = render(<Input {...props} />)

      expect(getByDisplayValue('Text Entry')).toBeDefined()
    })
  })

  describe('is secure text entry', () => {
    beforeEach(() => {
      props.secureTextEntry = true
    })

    it('should render the text', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText(translate('common-actions.show'))).toBeDefined()
    })
  })

  describe('is loading', () => {
    beforeEach(() => {
      props.loading = true
    })

    it('should render the ActivityIndicator', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText('Activity Indicator')).toBeDefined()
    })
  })

  describe('is not loading', () => {
    beforeEach(() => {
      props.loading = false
    })

    describe('has a trailing icon', () => {
      beforeEach(() => {
        props.trailingIcon = {
          SVG: () => <div>Icon</div>,
        }
      })

      it('should render the svg', () => {
        const { getByText } = render(<Input {...props} />)

        expect(getByText('SVG')).toBeDefined()
      })
    })

    describe('does not have a trailing icon', () => {
      beforeEach(() => {
        props.trailingIcon = undefined
      })

      it('should render the svg', () => {
        const { queryByText } = render(<Input {...props} />)

        expect(queryByText('SVG')).toBeNull()
      })
    })
  })

  describe('has left helper text', () => {
    beforeEach(() => {
      props.leftHelperText = 'Left Helper Text'
    })

    it('should render the text', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText(props.leftHelperText as string)).toBeDefined()
    })
  })

  describe('has right helper text', () => {
    beforeEach(() => {
      props.rightHelperText = 'Right Helper Text'
    })

    it('should render the text', () => {
      const { getByText } = render(<Input {...props} />)

      expect(getByText(props.rightHelperText as string)).toBeDefined()
    })
  })

  describe('has an error', () => {
    beforeEach(() => {
      props.error = 'This is an error'
    })

    describe('does not suppress error', () => {
      beforeEach(() => {
        props.suppressErrorText = false
      })

      it('should show the error', () => {
        const { getByText } = render(<Input {...props} />)

        expect(getByText(props.error as string)).toBeDefined()
      })
    })

    describe('does suppress error', () => {
      beforeEach(() => {
        props.suppressErrorText = true
      })

      it('should not show the error', () => {
        const { queryByText } = render(<Input {...props} />)

        expect(queryByText(props.error as string)).toBeNull()
      })
    })
  })

  describe('the user focuses the input', () => {
    beforeEach(() => {
      props.text = 'Test Text'
      props.focusHandler = jest.fn()
    })

    it('should call focusHandler', () => {
      const { getByDisplayValue } = render(<Input {...props} />)

      const input = getByDisplayValue('Test Text')

      fireEvent.focus(input)

      expect(props.focusHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('the user blurs the input', () => {
    beforeEach(() => {
      props.text = 'Test Text'
      props.blurHandler = jest.fn()
    })

    it('should call focusHandler', () => {
      const { getByDisplayValue } = render(<Input {...props} />)

      const input = getByDisplayValue('Test Text')

      fireEvent.blur(input)

      expect(props.blurHandler).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Input Snapshot Tests', () => {
  it('Unfocused input renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input focusState="unfocused" />)

    expect(tree).toMatchSnapshot()
  })

  it('Focused input renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input focusState="focused" />)

    expect(tree).toMatchSnapshot()
  })

  it('Error input renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input focusState="error" />)

    expect(tree).toMatchSnapshot()
  })

  it('Input with leading icon renderer.createer.creates properly', () => {
    const icon = {
      SVG: () => <div>Icon</div>,
    }
    const tree = renderer.create(<Input leadingIcon={icon} />)

    expect(tree).toMatchSnapshot()
  })

  it('Input with prefix text renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input prefixText="Prefix Text" />)

    expect(tree).toMatchSnapshot()
  })

  it('Input that is loading renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input loading={true} />)

    expect(tree).toMatchSnapshot()
  })

  it('Input that is not loading but has a trailing icon renderer.createer.creates properly', () => {
    const icon = {
      SVG: () => <div>Icon</div>,
    }
    const tree = renderer.create(<Input loading={false} trailingIcon={icon} />)

    expect(tree).toMatchSnapshot()
  })

  it('Input that has left helper text renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input leftHelperText="Left Helper" />)

    expect(tree).toMatchSnapshot()
  })

  it('Input that has right helper text renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input rightHelperText="Right Helper" />)

    expect(tree).toMatchSnapshot()
  })

  it('Input has an error that is not surpressed renderer.createer.creates properly', () => {
    const tree = renderer.create(<Input error="Error" suppressErrorText={false} />)

    expect(tree).toMatchSnapshot()
  })
})
