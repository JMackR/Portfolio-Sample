import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { Text } from '../text'
import { TextProps } from '../text.props'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

describe('Text', () => {
  let props: TextProps

  beforeEach(() => {
    props = {
      text: 'Test Text',
    }
  })

  it('should render the text', () => {
    const { getByText } = render(<Text {...props} />)

    expect(getByText(props.text as string)).toBeDefined()
  })

  describe('children are passed in', () => {
    describe('there is still text', () => {
      it('should render the text', () => {
        const { getByText } = render(<Text {...props}>Children</Text>)

        expect(getByText(props.text as string)).toBeDefined()
      })
    })

    describe('there is still text', () => {
      beforeEach(() => {
        props.text = undefined
      })

      it('should render the children', () => {
        const { getByText } = render(<Text {...props}>Children</Text>)

        expect(getByText('Children')).toBeDefined()
      })
    })
  })

  describe('the user clicks the text', () => {
    beforeEach(() => {
      props.onPress = jest.fn()
    })

    it('should call onPress', () => {
      const { getByText } = render(<Text {...props} />)

      const text = getByText(props.text as string)
      fireEvent.click(text)

      expect(props.onPress).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Text Snapshot Tests', () => {
  let props: TextProps
  beforeEach(() => {
    props = {
      text: 'Test Text',
    }
  })

  it('text creates properly', () => {
    const tree = renderer.create(<Text {...props} />)

    expect(tree).toMatchSnapshot()
  })

  describe('color is primary1', () => {
    beforeEach(() => {
      props.color = 'primary1'
    })

    it('text creates properly', () => {
      const tree = renderer.create(<Text {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('number of lines is passed in', () => {
    beforeEach(() => {
      props.numberOfLines = 2
    })

    it('text creates properly', () => {
      const tree = renderer.create(<Text {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })
})
