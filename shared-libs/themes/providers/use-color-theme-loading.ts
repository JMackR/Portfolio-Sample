import { useState, useEffect } from 'react'
import { PREFERRED_COLOR_THEME_STORAGE_KEY, StorageController } from '@sample/utilities'
import { DefaultColorTheme, colorThemes } from './color-theme-constants'
import { useSystemTheme, MATCH_SYSTEM_COLOR_THEME_ID } from './system-theme-provider'

export const useColorThemeLoading = () => {
  const { systemColorTheme, systemDrivenColorThemeId } = useSystemTheme()
  const [userPreferredColorThemeId, setUserPreferredColorThemeId] = useState<string | null>(null)
  const [isUsingSystemProvidedTheme, setIsUsingSystemProvidedTheme] = useState(true)
  const [colorThemeId, setColorThemeId] = useState(DefaultColorTheme.identifier)
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false)

  const updateColorTheme = (newColorThemeId: string) => {
    const storageController = StorageController<string>(PREFERRED_COLOR_THEME_STORAGE_KEY)
    storageController.setItem(newColorThemeId)
    setUserPreferredColorThemeId(newColorThemeId)

    if (colorThemes[newColorThemeId]) {
      setColorThemeId(newColorThemeId)
      setIsUsingSystemProvidedTheme(false)
    } else {
      setColorThemeId(systemDrivenColorThemeId)
      setIsUsingSystemProvidedTheme(true)
    }
  }

  const loadPreferredColorThemeFromDiskOnLaunch = () => {
    const storageController = StorageController<string>(PREFERRED_COLOR_THEME_STORAGE_KEY)
    storageController
      .getItem()
      .then((preferredTheme) => {
        if (preferredTheme && colorThemes[preferredTheme]) {
          setUserPreferredColorThemeId(preferredTheme)
        } else {
          setUserPreferredColorThemeId(MATCH_SYSTEM_COLOR_THEME_ID)
        }
      })
      .catch((e) => {
        console.log('ERROR LOADING THEME', e)
      })
  }
  useEffect(loadPreferredColorThemeFromDiskOnLaunch, [])

  useEffect(() => {
    if (systemColorTheme !== null && userPreferredColorThemeId !== null) {
      updateColorTheme(userPreferredColorThemeId)
      setHasLoadedTheme(true)
    }
  }, [systemColorTheme, userPreferredColorThemeId])

  return {
    hasLoadedTheme,
    colorThemeId,
    setColorThemeId: setUserPreferredColorThemeId,
    isUsingSystemProvidedTheme,
  }
}
