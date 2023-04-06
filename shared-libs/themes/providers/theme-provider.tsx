import React from 'react'
import { ColorThemeContextProvider } from './color-theme-context-provider'
import { FontThemeContextProvider } from './font-theme-context-provider'
import { SystemThemeProvider } from './system-theme-provider'
import { ThemeProviderProps } from './theme-provider.props'

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props

  return (
    <SystemThemeProvider>
      {/* <ColorThemeContextProvider> */}
      <FontThemeContextProvider>{children}</FontThemeContextProvider>
      {/* </ColorThemeContextProvider> */}
    </SystemThemeProvider>
  )
}
