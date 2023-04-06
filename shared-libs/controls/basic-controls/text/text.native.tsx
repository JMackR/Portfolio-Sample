import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'
import { useColorForTextColor, useFontForTextType } from '@sample/themes/hooks'
import { shadow } from '@sample/themes/shadow'
import { TextProps } from './text.props.native'

const autoLineHeight = {
  lineHeight: undefined,
} as TextStyle

export const Text: React.FunctionComponent<TextProps> = (props) => {
  const {
    numberOfLines,
    children,
    text,
    textType,
    textAlign,
    textDecorationLine,
    onPress,
    testID,
    selectable,
    color: textColor,
    dropShadow,
    ellipsizeMode,
  } = props
  const font = useFontForTextType(textType || 'primary3')
  const color = useColorForTextColor(textColor || 'primary1')
  const textShadow = dropShadow ? shadow.shadow : undefined

  const content = text || children
  return (
    <RNText
      style={[font, { color, textAlign, textDecorationLine }, textShadow]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      selectable={selectable}
      testID={testID || 'text'}
      accessibilityRole={'text'}
      // accessibilityLabel={testID || 'text'}
    >
      {content}
    </RNText>
  )
}
