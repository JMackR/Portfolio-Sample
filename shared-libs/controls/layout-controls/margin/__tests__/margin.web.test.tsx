import React from 'react'
import { render, screen } from '@testing-library/react'
import { StyleSheetTestUtils } from 'aphrodite/no-important'
import { createSerializer } from 'jest-aphrodite-react/no-important'
import renderer from 'react-test-renderer'
import { Margin } from '../margin'
import { MarginProps } from '../margin.d'

expect.addSnapshotSerializer(createSerializer(() => StyleSheetTestUtils, { removeVendorPrefixes: true }))

const TestMargin = (props: Omit<MarginProps, 'children'>) => {
  return <Margin {...props}>hello</Margin>
}

describe('Margin Component', () => {
  it('renders Children', () => {
    const { getByText } = render(<TestMargin />)

    expect(getByText('hello')).toBeVisible()
  })
})
