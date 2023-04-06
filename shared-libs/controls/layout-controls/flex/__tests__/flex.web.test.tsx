import React from 'react'
import { render } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { Flex } from '../flex'
import { FlexProps } from '../flex.d'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

const TestFlex = (props: Omit<FlexProps, 'children'>) => {
  return <Flex {...props}>hello</Flex>
}

describe('Flex Component', () => {
  it('renders Children', () => {
    const { getByText } = render(<TestFlex />)

    expect(getByText('hello')).toBeVisible()
  })
})
