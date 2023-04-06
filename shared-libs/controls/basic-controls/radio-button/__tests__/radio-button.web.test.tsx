import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { RadioButton, RadioButtonProps } from '../radio-button'

jest.mock('@sample/assets', () => ({
  CheckBoxSelected: () => ({
    SVG: () => <div>CheckBoxSelected</div>,
  }),
}))
jest.mock('../../image/svgs/svg.tsx')

describe('Radio Button', () => {
  let props: RadioButtonProps

  beforeEach(() => {
    props = {
      selected: false,
      text: 'Test Text',
      onClick: jest.fn(),
    }
  })

  it('should render the text', () => {
    const { getByText } = render(<RadioButton {...props} />)

    expect(getByText('Test Text')).toBeDefined()
  })

  describe('the user clicks the button', () => {
    it('should call on click', () => {
      const { getByRole } = render(<RadioButton {...props} />)

      const button = getByRole('button')

      fireEvent.click(button)

      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Radio Button Snapshot Tests', () => {
  let props: RadioButtonProps
  beforeEach(() => {
    props = {
      selected: false,
      text: 'Test Text',
      onClick: jest.fn(),
    }
  })

  describe('the button is not selected', () => {
    it('renders properly', () => {
      const tree = renderer.create(<RadioButton {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('the button is selected', () => {
    beforeEach(() => {
      props.selected = true
    })

    it('renders properly', () => {
      const tree = renderer.create(<RadioButton {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })
})
