import React, { useMemo, FC, PropsWithChildren } from 'react'
import { useMargin } from '@sample/themes'
import { StyleSheet, css } from 'aphrodite/no-important'
import invariant from 'invariant'
import { SpacerProps } from './spacer-props'

export const Spacer: FC<PropsWithChildren<SpacerProps>> = (props) => {
  const { children, sizeStep, direction } = props

  invariant(React.Children.count(children) === 0, 'Spacer does not allow children')

  const { baseMargin } = useMargin()

  const styles = useMemo(() => {
    // @ts-ignore
    const multipliedSize = sizeStep * baseMargin
    return StyleSheet.create({
      root: {
        height: direction === 'column' ? multipliedSize : undefined,
        width: direction === 'row' ? multipliedSize : undefined,
        display: direction === 'row' ? 'inline-block' : 'block',
      },
    })
  }, [sizeStep, direction, baseMargin])

  return <div className={css(styles.root)} />
}
