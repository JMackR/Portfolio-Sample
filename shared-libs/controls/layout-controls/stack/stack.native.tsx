import React from 'react'
import { View, StyleSheet, PixelRatio } from 'react-native'
import { defaultLayoutContainerProps } from '../container-props'
import { Spacer } from '../spacer'
import { StackProps } from './stack.d'

const scale = PixelRatio.getFontScale()
const Stack: React.FunctionComponent<StackProps> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    children,
    direction,
    childSeparationStep,
    testID,
    overflow,
  } = props
  const filteredChildren = React.Children.toArray(children).filter((o) => o)

  const styles = StyleSheet.create({
    stack: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      // flexDirection: scale < 1.75 ? direction : "column",
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow,
    },
  })

  return (
    <View style={styles.stack} testID={testID}>
      {React.Children.map(filteredChildren, (child, i) => {
        const separation = childSeparationStep !== undefined ? childSeparationStep : 0
        const step = i === filteredChildren.length - 1 ? 0 : separation

        if (step > 0) {
          return (
            <>
              {child}
              <Spacer direction={direction} sizeStep={step} />
            </>
          )
        }
        return <>{child}</>
      })}
    </View>
  )
}

Stack.defaultProps = {
  ...defaultLayoutContainerProps,
  childSeparationStep: 0,
}

export { Stack }
