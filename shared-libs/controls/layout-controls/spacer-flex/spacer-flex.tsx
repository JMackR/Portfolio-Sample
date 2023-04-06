import React, { PropsWithChildren } from 'react'
import { css, StyleSheet } from 'aphrodite/no-important'
import invariant from 'invariant'

const styles = StyleSheet.create({
  spacerFlex: {
    flex: 1,
    flexGrow: 1,
  },
})

/**
 * Componenet used to take up all available space between at least two flex components
 */
export const SpacerFlex: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  invariant(React.Children.count(children) === 0, 'Spacer does not allow children')

  return <div className={css(styles.spacerFlex)} />
}
