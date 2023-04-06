import React, { PropsWithChildren } from 'react'

// System Theme Provider is pass through on web, but required for native
export const SystemThemeProvider: React.FC<PropsWithChildren> = (props) => <>{props.children}</>
