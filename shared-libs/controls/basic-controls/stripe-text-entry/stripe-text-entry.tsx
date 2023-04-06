import React from 'react'
import { Flex, Margin } from '@sample/layout-controls'
import { FontStyle, useColorsForTextColorsCollection, useFontForTextType } from '@sample/themes'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { StripeTextEntryProps } from './stripe-text-entry.props'

export const StripeTextEntry: React.FC<StripeTextEntryProps> = (props: StripeTextEntryProps) => {
  const font: FontStyle = useFontForTextType(props.textType !== undefined ? props.textType : 'secondary3')
  const [primaryColor, hintColor] = useColorsForTextColorsCollection([
    props.textColor !== undefined ? props.textColor : 'primary1',
    props.hintColor !== undefined ? props.hintColor : 'primary2',
  ])

  const elementForSpecialInputType = () => {
    const stripeStyle = {
      base: {
        color: primaryColor,
        fontWeight: font.fontWeight,
        fontFamily: `${font.fontFamily}, sans-serif`,
        fontSize: `${font.fontSize}px`,
        '::placeholder': {
          color: hintColor,
        },
      },
      invalid: {
        fontWeight: font.fontWeight,
        fontFamily: `${font.fontFamily}, sans-serif`,
        fontSize: `${font.fontSize}px`,
      },
    }

    const stripeOptions = {
      style: stripeStyle,
      placeholder: props.hint,
    }

    switch (props.stripeInputType) {
      case 'card-number':
        return <CardNumberElement options={stripeOptions} />
      case 'card-exp':
        return <CardExpiryElement options={stripeOptions} />
      case 'card-cvc':
        return <CardCvcElement options={stripeOptions} />
      default: {
        return <CardNumberElement options={stripeOptions} />
      }
    }
  }

  return (
    <Margin marginTopStep={0.5}>
      <Flex direction={'column'} grow={1}>
        {elementForSpecialInputType()}
      </Flex>
    </Margin>
  )
}
