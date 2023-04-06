import React, { PropsWithChildren } from 'react'
import { useMargin } from '@sample/themes'
import invariant from 'invariant'
import { View } from 'react-native'
import { SpacerProps } from './spacer-props'

export const Spacer: React.FC<PropsWithChildren<SpacerProps>> = (props) => {
  const { children, sizeStep = 1, direction } = props

  invariant(React.Children.count(children) === 0, 'Spacer does not allow children')

  const { baseMargin } = useMargin()

  const styles = React.useMemo(() => {
    const multipliedSize = sizeStep * baseMargin
    return {
      height: direction === 'column' ? multipliedSize : undefined,
      width: direction === 'row' ? multipliedSize : undefined,
    }
  }, [sizeStep, direction, baseMargin])

  return <View style={styles} />
}
