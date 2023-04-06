import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { FixedButton, FixedContainerProps } from '../fixed-button'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

jest.mock('@sample/assets', () => ({
  ActionClear: () => <div>ActionClear</div>,
}))

describe('Fixed Button', () => {
  let props: FixedContainerProps

  describe('has title', () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        title: 'Test Button',
        buttonType: 'primary',
        buttonSize: 'large',
      }
    })

    it('should render title', () => {
      const { getByText } = render(<FixedButton {...props} />)
      const input = getByText(props.title as string)
      expect(input).toBeDefined()
    })
  })
  describe('is clicked', () => {
    it('should call onClicked', () => {
      const { getByText } = render(<FixedButton {...props} />)
      const button = getByText(props.title as string)
      fireEvent.click(button)
      expect(props.onClick).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Fixed Button Snapshot Tests', () => {
  it('Fixed Button has state true', () => {
    const tree = renderer.create(
      <FixedButton
        onClick={jest.fn()}
        title="Test Button"
        buttonType="primary"
        buttonSize="large"
        bottom={2}
        top={2}
        left={2}
        right={2}
        marginTop={1}
        marginRight={3}
        marginBottom={1}
        marginLeft={3}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
