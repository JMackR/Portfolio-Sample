import React, { PropsWithChildren } from 'react'
import { LIGHT_MODE_THEME_ID, DARK_MODE_THEME_ID } from '../colors'
import { ColorThemeContext, ColorThemeContextProps, colorThemeForThemeId } from './color-theme-context-provider'

export interface DangerouslyOverrideColorThemeProps {
  themeId: typeof LIGHT_MODE_THEME_ID | typeof DARK_MODE_THEME_ID
}

/**
 * Use this component to force a design-theme for all components in this component's child subtree.
 * This should only be used in RARE, EXCEPTIONAL cases where we have UI that should not respect the user's choice in themes.
 * An example of this is the display of ads which should always look the same.
 *
 * @see DangerouslyOverrideColorThemeProps for props
 */
export const DangerouslyOverrideColorTheme: React.FC<PropsWithChildren<DangerouslyOverrideColorThemeProps>> = (props) => {
  const { themeId, children } = props
  const providerValue: ColorThemeContextProps = {
    currentColorTheme: colorThemeForThemeId(themeId),
    colorThemeId: themeId,
    setColorThemeId: () => {},
    isUsingSystemProvidedTheme: false,
  }

  return <ColorThemeContext.Provider value={providerValue}>{children}</ColorThemeContext.Provider>
}
