import React, { useState } from 'react'
import { useBorder, useColor, useColorForBackgroundColor } from '@sample/themes'
import { css, StyleSheet } from 'aphrodite/no-important'
import invariant from 'invariant'
import { defaultLayoutContainerProps } from '../container-props'
import { BorderProps } from './border.d'

export const Border: React.FunctionComponent<BorderProps> = (props) => {
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
    color,
    cornerRadius,
    lineWeight,
    hidden,
    touchUpInsideHandler: touchUpInside,
    noFocus,
    overflow = true,
  } = props

  invariant(React.Children.count(children) > 0, 'Border requires children')
  const [size, setSize] = useState({ height: 0, width: 0 })
  const { baseBorder } = useBorder()
  let borderRadius
  switch (cornerRadius) {
    case 'small':
      borderRadius = baseBorder.cornerRadius.small
      break
    case 'large':
      borderRadius = baseBorder.cornerRadius.large
      break
    case 'circle':
      borderRadius = '50%'
      break
    default:
      borderRadius = 0
  }
  let borderWidth
  switch (lineWeight) {
    case 'heavy':
      borderWidth = baseBorder.lineWeight.heavy
      break
    case 'none':
      borderWidth = 0
      break

    default:
      borderWidth = baseBorder.lineWeight.light
  }
  // const { colors } = useColor()

  let borderColor
  if (hidden) {
    borderColor = 'transparent'
  } else if (color !== undefined) {
    borderColor = useColorForBackgroundColor(color)
  } else {
    borderColor = useColorForBackgroundColor('background2')
  }

  const styles = StyleSheet.create({
    border: {
      display: 'flex',
      position: 'relative',
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      overflow: overflow ? 'hidden' : 'unset',
      borderStyle: 'solid',
      borderRadius,
      borderWidth,
      borderColor,
      ':focus-within': {
        boxShadow: noFocus ? '0px 0px 0px 3px #C6CCCE' : 'none',
      },
    },
  })

  return (
    <div className={css(styles.border)} onClick={touchUpInside}>
      {children}
    </div>
  )
}

Border.defaultProps = {
  ...defaultLayoutContainerProps,
}
