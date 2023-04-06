import { useAuth } from '@sample/firebase-client'
import { NavigableRoute, navigableRoutes } from '../routes'
import { NavigationContainerRef } from '@react-navigation/native'
// import { authenticationChecker } from 'shared/providers/auth-provider/use-provide-auth'
import { generatePathHandler, Navigation, NAVIGATION_ROUTES_SCHEME } from './navigation'
import { NavigationPathHandler, NavigationPayload } from './navigation.d'

/**
 * NOT NEEDED FOR PROJECT
 */
const ROUTES_THAT_DO_NOT_REQUIRE_AUTHENTICATION: string[] = [
  NavigableRoute.AuthLanding,

  // ONBOARDING FLOW
  NavigableRoute.ClaimDetails,
  NavigableRoute.PhoneEntry,
  NavigableRoute.OnboardLocation,
  NavigableRoute.AuthLoading,

  // DIALOGS
  NavigableRoute.PermissionsDialog,
  NavigableRoute.AffirmRejectDialog,
  NavigableRoute.ErrorDialog,
  NavigableRoute.ModalCard,
]

export const APP_AUTHORITY: string[] = ['get.ridewithsample.com', 'ridewithsample.com', 'ridewithsample.page.link']
const APP_SCHEME = ['https://', 'get.ridewithsample://', 'FireAuth://', 'ridewithsample://', 'ridewithsample.page.link://']
const routeUrlsMap = new Map<string, string[]>()

export const initializeNavigation = (navigationRef: React.RefObject<NavigationContainerRef>) => {
  Navigation.start(navigationRef)

  for (const scheme of APP_SCHEME) {
    Navigation.addScheme(scheme)
  }
  Navigation.addScheme(NAVIGATION_ROUTES_SCHEME)

  initializeActionPath()
  initializeGlobalSchemePaths()
  Navigation.addPaths(
    NAVIGATION_ROUTES_SCHEME,
    [NavigableRoute.AuthSuccess],
    generateAuthPathHandler(NavigableRoute.AuthSuccess)
  )
  // Navigation.addPaths(
  //   'com.googleusercontent.apps.616590855049-ch0div88u689rd0iprtg7jjgeafqn14e',
  //   [NavigableRoute.CodeVerification],
  //   generatePathHandler(NavigableRoute.CodeVerification)
  // )
  // Navigation.addPaths("Emerald", ["App.CloseWebView"], webNavigationHandler)
}

const initializeActionPath = () => {
  /// ////// HOME /////////
  addActionPathsNavigableRouteAssociation(NavigableRoute.AuthLoading, '/auth-loading/:authToken/:policyID/:phoneNumber')
  // addActionPathsNavigableRouteAssociation(NavigableRoute.CodeVerification, '/code-verification/:docID')
  // addActionPathsNavigableRouteAssociation(NavigableRoute.ProfileInviteModal, '/profile-invite-modal/:docID')
  // addActionPathsNavigableRouteAssociation(NavigableRoute.AuthLanding, '/landing/:referrerId/:phoneId/:invite-type/:deviceId')
  // addActionPathsNavigableRouteAssociation(NavigableRoute.ChannelList, '/home-tabs/chat-stack/channel-list/:channelId')
  // addActionPathsNavigableRouteAssociation(NavigableRoute.ChannelList, '/channel-list/:id')
  /// ////// Help Center Deeplinks /////////
  // addActionPathsNavigableRouteAssociation(NavigableRoute.HomeTabs, '/app/help/*')
  /// ////// Webview Configuration Overrides /////////
  // Not sure if we need these two, or if they even belong here.
  // Legacy apps use these routes to disable back button on webviews when reporting a user or canceling a payment.
  // addActionPathsNavigableRouteAssociation(NavigableRoute.HomeTabs, "/accounts/block")
}

const addActionPathsNavigableRouteAssociation = (route: NavigableRoute, path: string) => {
  const pathArray: string[] = routeUrlsMap.get(route) || []
  for (const scheme of APP_SCHEME) {
    for (const authority of APP_AUTHORITY) {
      pathArray.push(scheme.concat(authority.concat(path)))
    }
  }
  const NAV_SCHEME = `${NAVIGATION_ROUTES_SCHEME}://`

  pathArray.push(NAV_SCHEME.concat(path))

  if (!pathArray.includes(route)) {
    pathArray.push(NAV_SCHEME.concat(route))
  }

  routeUrlsMap.set(route, pathArray)
}

const addUrlsForRouteAndHandler = (route: string, handler: NavigationPathHandler) => {
  const urlsForRoute = routeUrlsMap.get(route)

  if (!urlsForRoute) {
    Navigation.addPaths(NAVIGATION_ROUTES_SCHEME, [route], handler)
    return
  }
  urlsForRoute.forEach((urlString) => {
    const urlParts = urlString.split('://')
    Navigation.addPaths(urlParts[0], [urlParts[1]], handler)
  })
}

interface NavOverridesMap {
  [key: string]: 'push' | 'navigate' | 'replace' | undefined
}

const routeNavOverrides: NavOverridesMap = {
  [NavigableRoute.OnboardStack]: 'push',
}

const initializeGlobalSchemePaths = () => {
  navigableRoutes.forEach((route) => {
    let pathHandler: NavigationPathHandler
    if (route === NavigableRoute.CloseWebview) {
      pathHandler = webNavigationHandler
    } else if (ROUTES_THAT_DO_NOT_REQUIRE_AUTHENTICATION.includes(route)) {
      pathHandler = generatePathHandler(route, routeNavOverrides[route])
    } else {
      pathHandler = generateAuthPathHandler(route, routeNavOverrides[route])
    }

    addUrlsForRouteAndHandler(route, pathHandler)
  })
}

const generateAuthPathHandler = (route: string, navType?: 'navigate' | 'push' | 'replace') => {
  // const { currentUser } = useAuth()
  return generatePathHandler(
    route,
    navType || 'navigate',
    (): Promise<boolean> =>
      new Promise<boolean>((resolve, _reject) => {
        /**
         * TODO for Dev purpose can hard set this to tru
         * BUT IF YOU FORGET AND COMMIT THIS IN A PR YOU WILL BE FIRED
         * out of a cannon and into the sun
         */
        resolve(true)
      }),
    NavigableRoute.AuthLanding
  )
}

export const webNavigationHandler: NavigationPathHandler = async (
  navigationRef: React.RefObject<NavigationContainerRef>,
  _payload: NavigationPayload<any>
) => {
  // close the webview
  navigationRef.current?.goBack()
  return true
}
