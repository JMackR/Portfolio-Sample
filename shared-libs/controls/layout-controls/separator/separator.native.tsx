import React, { FC } from 'react'
import { useColorForBackgroundColor } from '@sample/themes'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { SeparatorProps } from './separator.props'

/**
 * A thin horizontal separator
 */
export const Separator: FC<SeparatorProps> = ({ direction }) => {
  let width: string | number = '100%'
  let height: string | number = 1
  if (direction === 'row') {
    width = 1
    height = '100%'
  }
  const style: ViewStyle = {
    width,
    height,
    borderBottomColor: useColorForBackgroundColor('background4'),
    borderLeftColor: useColorForBackgroundColor('background4'),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
  }
  return <View style={style} />
}
