import { Linking } from 'react-native'
import { NavigableRoute } from '../routes'
import { translate } from '@sample/utilities/i18n'
import { getDomain } from '@sample/utilities/url'
import { getWebsiteUrl } from '@sample/utilities/settings'
import type { WebViewProps } from 'react-native-webview'
// import type { ErrorDialogScreenProps } from '../../widgets/dialog'
// import type { AffirmRejectDialogScreenProps } from '../../widgets/dialog/affirm-reject-dialog-screen-props'
import { Navigation } from './navigation'
import { APP_AUTHORITY } from './navigation-configuration'
import type { NavigationMetaData } from './navigation.d'

interface PresentLocationSearchFilterProps {
  isLandingScreen?: boolean
}

export const CommonNavs = (function () {
  // const navigation = useNavigation()
  return {
    presentError(props: ErrorDialogScreenProps) {
      if (__DEV__) {
        console.log(`Presenting Error Dialog: ${JSON.stringify(props, null, 2)}`)
      }

      const sanitizedErrorProps = JSON.parse(JSON.stringify(props))

      // navigation.navigate(NavigableRoute.ErrorDialog, sanitizedErrorProps)
    },
    // presentLocationPicker(props: LocationPickerScreenProps) {
    //   navigation.navigate(NavigableRoute.LocationPicker, props)
    // },
    // async presentSearchLocationPicker(
    // 	// pickerType: LocationPickerType,
    // 	fallbackZipcode: string | undefined,
    // 	searchLocationChangedCallback: (locationDetails: LocationDetails) => void,
    // ) {
    // 	const prefillLocationDetails = await getUserSearchLocation(fallbackZipcode)
    // 	const isFTUE = await isSetZipCodeFTUE()
    // },
    /**
     * Check the URL against the APP_AUTHORITY urls. If the app cannot handle the URL, show a warning dialog.
     */
    openInternalOrExternalUrl(url: string) {
      const canOpenInternally = () => {
        const urlDomain = getDomain(url)
        const foundIndex = APP_AUTHORITY.findIndex((value) => urlDomain === value)
        return foundIndex > -1
      }

      const askToOpenUrl = () => {
        const props: AffirmRejectDialogScreenProps = {
          onAffirm: () => {
            Navigation.performWhenAvailable(() => {
              CommonNavs.openExternalUrl(url)
            })
          },
          dismissOnReject: true,
          affirmText: translate('common-actions.yes'),
          rejectText: translate('common-actions.no'),
          title: translate('urls.leaving-title'),
          body: translate('urls.continue-question'),
        }
        Navigation.performWhenAvailable(() => {
          Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, props)
        })
      }

      if (canOpenInternally()) {
        CommonNavs.openExternalUrl(url)
      } else {
        askToOpenUrl()
      }
    },
    openExternalUrl(url: string) {
      if (Linking.canOpenURL(url)) {
        Linking.openURL(url)
      }
    },
    async presentWebView(link: string, title?: string, metaData?: NavigationMetaData) {
      // const requestHeaders = getWebHeaders()
      const webViewProps: WebViewProps = {
        title,
        source: {
          uri: link,
        },
        // requestHeaders,
        baseUrl: await getWebsiteUrl(),
        // hostNameRequestHeaderBlackList: WEBVIEW_HOSTNAME_REQUEST_HEADER_BLACKLIST,
        // urlWhitelist: WEBVIEW_WHITELIST,
      }
      // navigation.navigate(NavigableRoute.WebViewScreen, webViewProps, metaData)
    },
  }
})()
