import React, { forwardRef, useImperativeHandle, useRef, MutableRefObject } from 'react'
import { useFontForTextType, useColorForTextColor } from '@sample/themes'
import { convertFontToWebStyleSheet } from '@sample/themes/utility/font-conversions'
import { StyleSheet, css, StyleDeclaration } from 'aphrodite/no-important'
import { TextProps, TextRef } from './text.props'

/**
 * This is a simple text component.  It includes all behavior displayed by text in the sircles app.
 * @param props see TextProps for more info.
 */

export const Text = forwardRef<TextRef, TextProps>((props, ref) => {
  const {
    numberOfLines,
    children,
    textType,
    text,
    textAlign,
    textDecorationLine,
    onPress,
    color,
    whiteSpace = 'inherit',
  } = props
  const content = text || children
  let textStyle: StyleDeclaration = {
    whiteSpace,
    textAlign,
    textDecorationLine,
  }
  if (color === 'primary1') {
    textStyle = {
      ...textStyle,
      ':hover': {
        cursor: 'pointer',
      },
    }
  }
  if (numberOfLines) {
    textStyle = {
      ...textStyle,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: numberOfLines,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }
  const STYLES = StyleSheet.create({
    textStyle,
  })
  const font = useFontForTextType(textType || 'primary3')
  const fontColor = useColorForTextColor(color || 'primary1')
  const fontStyles = convertFontToWebStyleSheet(font, fontColor, 'inline')

  const contentRef = useRef() as MutableRefObject<any>

  useImperativeHandle(ref, () => ({
    isContentTruncated: () => {
      if (contentRef.current) {
        return contentRef.current.scrollHeight > contentRef.current.offsetHeight
      }
      return false
    },
  }))

  return (
    <div className={css(fontStyles.text, STYLES.textStyle)} onClick={onPress} ref={contentRef}>
      {content}
    </div>
  )
})
