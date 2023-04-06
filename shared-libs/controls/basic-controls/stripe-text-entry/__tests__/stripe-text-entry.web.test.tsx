import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { StripeTextEntry } from '../stripe-text-entry'
import { StripeTextEntryProps } from '../stripe-text-entry.props'

jest.mock('@stripe/react-stripe-js', () => ({
  CardNumberElement: () => <div>CardNumberElement</div>,
  CardExpiryElement: () => <div>CardExpiryElement</div>,
  CardCvcElement: () => <div>CardCvcElement</div>,
}))

describe('Stripe Text Entry', () => {
  let props: StripeTextEntryProps

  beforeEach(() => {
    props = {}
  })

  it('should render the CardNumberElement by default', () => {
    const { getByText } = render(<StripeTextEntry {...props} />)

    expect(getByText('CardNumberElement')).toBeDefined()
  })

  describe('stripeInputType is card-number', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-number'
    })

    it('should render the CardNumberElement', () => {
      const { getByText } = render(<StripeTextEntry {...props} />)

      expect(getByText('CardNumberElement')).toBeDefined()
    })
  })

  describe('stripeInputType is card-exp', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-exp'
    })

    it('should render the CardExpiryElement', () => {
      const { getByText } = render(<StripeTextEntry {...props} />)

      expect(getByText('CardExpiryElement')).toBeDefined()
    })
  })

  describe('stripeInputType is card-cvc', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-cvc'
    })

    it('should render the CardCvcElement', () => {
      const { getByText } = render(<StripeTextEntry {...props} />)

      expect(getByText('CardCvcElement')).toBeDefined()
    })
  })
})

describe('Stripe Text Entry Snapshot Tests', () => {
  let props: StripeTextEntryProps
  beforeEach(() => {
    props = {}
  })

  it('should render the CardNumberElement by default', () => {
    const tree = renderer.create(<StripeTextEntry {...props} />)

    expect(tree).toMatchSnapshot()
  })

  describe('stripeInputType is card-number', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-number'
    })

    it('should render the CardNumberElement', () => {
      const tree = renderer.create(<StripeTextEntry {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('stripeInputType is card-exp', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-exp'
    })

    it('should render the CardExpiryElement', () => {
      const tree = renderer.create(<StripeTextEntry {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('stripeInputType is card-cvc', () => {
    beforeEach(() => {
      props.stripeInputType = 'card-cvc'
    })

    it('should render the CardCvcElement', () => {
      const tree = renderer.create(<StripeTextEntry {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('text/hint color and textType are passed in', () => {
    beforeEach(() => {
      props.textColor = 'error1'
      props.hintColor = 'error1'
      props.textType = 'heading5'
    })

    it('should render the CardCvcElement', () => {
      const tree = renderer.create(<StripeTextEntry {...props} />)

      expect(tree).toMatchSnapshot()
    })
  })
})
