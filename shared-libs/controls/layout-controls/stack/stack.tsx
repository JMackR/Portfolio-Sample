import React, { PropsWithChildren, useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import { defaultLayoutContainerProps } from '../container-props'
import { Spacer } from '../spacer'
import { StackProps } from './stack.d'

const Stack: React.FunctionComponent<PropsWithChildren<StackProps>> = (props) => {
  const {
    debugColor,
    width,
    height,
    axisDistribution,
    crossAxisDistribution,
    basis,
    grow = 0,
    shrink,
    wrap,
    children,
    direction,
    childSeparationStep,
    maxWidth,
    overflow,
    minHeight,
  } = props
  const filteredChildren = React.Children.toArray(children).filter((o) => o)
  const flexWrap = wrap ? { flexWrap: wrap } : undefined
  const style = StyleSheet.create({
    stack: {
      display: 'flex',
      ...flexWrap,
      flexBasis: basis,
      flexGrow: grow,
      flexShrink: shrink,
      flexDirection: direction,
      alignItems: crossAxisDistribution,
      justifyContent: axisDistribution,
      backgroundColor: debugColor,
      height,
      width,
      maxWidth,
      overflow,
      minHeight,
    },
  })

  return (
    <div className={css(style.stack)}>
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
    </div>
  )
}

Stack.defaultProps = {
  ...defaultLayoutContainerProps,
  childSeparationStep: 0,
}

export { Stack }
