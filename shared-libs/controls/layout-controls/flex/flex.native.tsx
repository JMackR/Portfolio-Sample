import React from 'react'
import { View, StyleSheet } from 'react-native'
import { defaultLayoutContainerProps, LayoutContainerProps } from '../container-props'
import { FlexProps } from './flex.d'

export const Flex: React.FunctionComponent<LayoutContainerProps> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow,
    shrink,
    direction,
    children,
    testID,
    touchUpInsideHandler,
    wrap,
    overflow,
    style,
    ..._rest
  } = props
  let rest
  if (_rest.hasOwnProperty('style')) {
    rest = {}
  } else {
    rest = _rest
  }

  const styles = StyleSheet.create({
    flex: {
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      style,
      overflow,
      ...rest,
    },
  })

  return (
    <View style={styles.flex} onTouchEnd={touchUpInsideHandler} testID={testID}>
      {children}
    </View>
  )
}

Flex.defaultProps = {
  ...defaultLayoutContainerProps,
}
