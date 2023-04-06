import React, { PropsWithChildren } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import { defaultLayoutContainerProps } from '../container-props'
import { FlexProps } from './flex.d'

const Flex: React.FunctionComponent<PropsWithChildren<FlexProps>> = (props) => {
  const {
    overflow,
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis = '0%',
    grow,
    shrink,
    direction,
    children,
    touchUpInsideHandler,
    wrap,
    maxWidth,
  } = props

  const style = StyleSheet.create({
    flex: {
      display: 'flex',
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      maxWidth: maxWidth || '100vw',
      width,
      height,
      position: 'relative',
      backgroundColor: debugColor,
      overflow,
    },
  })

  return (
    <div className={css(style.flex)} onClick={touchUpInsideHandler}>
      {children}
    </div>
  )
}

Flex.defaultProps = {
  ...defaultLayoutContainerProps,
}

export { Flex }
