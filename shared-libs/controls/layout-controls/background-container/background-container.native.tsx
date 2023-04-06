import React from 'react'
import { View, StyleSheet } from 'react-native'
import { shadow, useColorForBackgroundColor } from '@sample/themes'
import { BackgroundProps } from './background-container.d'

export const BackgroundContainer: React.FunctionComponent<BackgroundProps> = (props) => {
  const { type, style, topRadiusOnly, borderRadius, borderColor, showShadow = false, children, testID } = props
  const color = useColorForBackgroundColor(type || 'background1')
  const border = borderColor ? useColorForBackgroundColor(borderColor) : undefined
  const applyShadow = showShadow ? { ...shadow.screenShadow } : undefined

  const STYLES = StyleSheet.create({
    container: {
      backgroundColor: color,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: topRadiusOnly ? 0 : borderRadius,
      borderBottomLeftRadius: topRadiusOnly ? 0 : borderRadius,
      borderColor: border,
      borderWidth: borderColor ? 1 : 0,
      ...applyShadow,
    },
  })

  return (
    <View style={[STYLES.container, style]} testID={testID} accessibilityLabel={testID}>
      {children}
    </View>
  )
}
