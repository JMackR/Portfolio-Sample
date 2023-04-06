import { Linking } from 'react-native'
import type { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { Navigation } from './navigation'

const getInitialURLOverride = async (success: (url?: string | null) => void, failure: (error: any) => void) => {
  await dynamicLinks()
    .getInitialLink()
    .then((dynamicLink) => success(dynamicLink?.url))
    .catch((err) => failure(err))
}

export const InitializeDeeplinking = async () => {
  const performDeeplink = (deeplinkUrl: string) => {
    console.log('THE DEEP LINK', deeplinkUrl)
    // if (deeplinkUrl) {
    // 	alert(deeplinkUrl)
    // }

    Navigation.navigateToURL(deeplinkUrl, undefined, { isDeepLink: true })
  }

  getInitialURLOverride(
    (url) => {
      if (url) {
        performDeeplink(url)
      }
    },
    (err) => console.error('Error getting initial URL', err)
  )

  const handleDynamicLink = (dynamicLink: FirebaseDynamicLinksTypes.DynamicLink) => {
    performDeeplink(dynamicLink.url)
  }
  /**
   * USE LInking over DynamicLinking listener to prevent firing dynamic link in foreground
   */
  // await Linking.addEventListener('url', handleDynamicLink)
  await dynamicLinks().onLink(handleDynamicLink)
}
