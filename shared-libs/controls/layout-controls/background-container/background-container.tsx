import React, { PropsWithChildren } from 'react'
import { useColorForBackgroundColor } from '@sample/themes'
import { BackgroundProps } from './background-container.d'

export const BackgroundContainer: React.FunctionComponent<PropsWithChildren<BackgroundProps>> = (props) => {
  const { type, children, borderRadius } = props
  const color = useColorForBackgroundColor(type || 'background1')
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius,
      }}
    >
      {children}
    </div>
  )
}
