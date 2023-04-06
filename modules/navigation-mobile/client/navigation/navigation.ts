import { Linking } from 'react-native'
import { getWebsiteUrl } from '@sample/mobile-utils/url'
import { isValidURL } from '@sample/utilities/url/url-utils'
import { UUID } from '@sample/utilities/uuid'
import {
  StackActions,
  NavigationContainerRef,
  CommonActions,
  NavigationAction,
  NavigationState,
} from '@react-navigation/native'
import { values } from 'lodash'
import { Path } from 'path-parser'
import {
  NavigationCompletionCallback,
  NavigationMetaData,
  NavigationPayload,
  NavigationPathHandler,
  NavigationActionParams,
} from './navigation.d'
import { Url, urlFromString } from './url'
// import { CommonNavs } from '.'
const PATH_DELIMITER = '/'
const generateActionParamsForUnreachableRoute = (parts: string[], params: any): NavigationActionParams => {
  if (parts.length === 0) {
    return { route: '', params }
  }

  if (parts.length === 1) {
    return { route: parts.join(PATH_DELIMITER), params }
  }

  const routeParams = { screen: parts.join(PATH_DELIMITER), params }
  return generateActionParamsForUnreachableRoute(parts.slice(0, -1), routeParams)
}

const isReachableRoute = (path: string, state?: NavigationState, start?: string): boolean => {
  if (state === undefined) {
    return false
  }
  const pathparts = path.split(PATH_DELIMITER)

  const startparts: string[] = start !== undefined ? start.split(PATH_DELIMITER) : []

  if (pathparts.length === 0) {
    return false
  }
  if (pathparts.length - startparts.length <= 1) {
    return state.routeNames.find((name) => name === path) !== undefined
  }
  startparts.push(pathparts[startparts.length])
  const nextstart = startparts.join(PATH_DELIMITER)

  const nextRoute = state.routes.find((route) => route.name === nextstart)
  if (nextRoute === undefined) {
    return false
  }

  if (nextRoute.state === undefined) {
    return false
  }

  return isReachableRoute(path, nextRoute.state as NavigationState, nextstart)
}

const getActionParams = (
  navigationRef: React.RefObject<NavigationContainerRef>,
  route: string,
  params: any
): NavigationActionParams => {
  if (isReachableRoute(route, navigationRef.current?.getRootState())) {
    return { route, params }
  }
  return generateActionParamsForUnreachableRoute(route.split(PATH_DELIMITER), params)
}

export const generatePathHandler =
  (
    forRoute: string,
    navType?: 'navigate' | 'push' | 'replace',
    navChecker?: (payload: NavigationPayload<any>) => Promise<boolean>,
    fallbackRoute?: string
  ): NavigationPathHandler =>
  async (navigationRef: React.RefObject<NavigationContainerRef>, payload: NavigationPayload<any>) => {
    if (navChecker !== undefined && !(await navChecker(payload))) {
      if (fallbackRoute !== undefined) {
        const redirectMeta = {
          redirectedFromPayload: payload,
          lockContext: payload.details.metaData.lockContext,
        }
        await Navigation.navigateToRoute(fallbackRoute, undefined, redirectMeta)
        return new Promise<boolean>((resolve, _reject) => {
          resolve(true)
        })
      }
      return new Promise<boolean>((resolve, _reject) => {
        resolve(false)
      })
    }

    const actionParams = getActionParams(navigationRef, forRoute, payload)
    let navAction: NavigationAction
    switch (payload.details.metaData.navMethodOverride || navType) {
      case 'push':
        navAction = StackActions.push(actionParams.route, actionParams.params)
        break
      case 'replace':
        navAction = StackActions.replace(actionParams.route, actionParams.params)
        break
      default:
        navAction = CommonActions.navigate(actionParams.route, actionParams.params)
    }

    navigationRef.current?.dispatch(navAction)
    if (payload.details.metaData.navigationCompletionCallback) {
      payload.details.metaData.navigationCompletionCallback(payload.details.metaData.lockContext)
    }
    return new Promise<boolean>((resolve, _reject) => {
      resolve(true)
    })
  }

interface NavigationPath {
  path: Path
  handler: NavigationPathHandler
}

export const NAVIGATION_ROUTES_SCHEME = 'app.sample'
interface NavigationScheme {
  scheme: string
  fallbackSchemes?: string[]
  paths: { [path: string]: NavigationPath }
}

export const NAVIGATION_LOCK_EXPIRE_MS = 100

export type NavigationWaitCallback = () => void

export const Navigation = (function () {
  let routes: { [scheme: string]: NavigationScheme } = {}
  let navigationRef: React.RefObject<NavigationContainerRef>
  let navlock: string | undefined
  let waitingCallbacks: NavigationWaitCallback[] = []

  const acquireLock = (lockContext?: string): string | undefined => {
    if (navlock !== undefined) {
      if (navlock !== lockContext) {
        return undefined
      }
    }

    navlock = UUID.uuid()

    return navlock
  }

  const releaseLock = (lockToRelease: string) => {
    if (navlock !== lockToRelease) {
      return
    }

    navlock = undefined

    while (navlock === undefined && waitingCallbacks.length > 0) {
      const callback = waitingCallbacks[0]
      if (waitingCallbacks.length > 1) {
        waitingCallbacks = waitingCallbacks.slice(1)
      } else {
        waitingCallbacks = []
      }
      callback()
    }
  }

  const expireLock = (lockToExpire: string) => {
    setTimeout(() => {
      releaseLock(lockToExpire)
    }, NAVIGATION_LOCK_EXPIRE_MS)
  }

  const navigate = async (toUrl: Url, params?: any, metaData?: NavigationMetaData) => {
    const lock = acquireLock(metaData ? metaData.lockContext : undefined)

    if (lock === undefined) {
      return
    }
    const urlScheme = toUrl.protocol.replace(':', '').toLowerCase()
    const urlPath = toUrl.hostname + toUrl.pathname
    const hostScheme = routes[urlScheme]
    if (hostScheme === undefined) {
      return
    }
    const searchSchemes = [hostScheme]

    if (hostScheme.fallbackSchemes) {
      hostScheme.fallbackSchemes.forEach((fbScheme) => {
        searchSchemes.push(routes[fbScheme])
      })
    }

    for (const aScheme of searchSchemes) {
      if (aScheme.scheme !== urlScheme && aScheme.scheme !== NAVIGATION_ROUTES_SCHEME) {
        continue
      }

      for (const value of values(aScheme.paths)) {
        const pathTestResult = value.path.test(urlPath)
        const { queryParams } = toUrl
        const finalParams = { ...pathTestResult, ...queryParams, ...params }
        const payload: NavigationPayload<any> = {
          details: {
            url: toUrl,
            matchDetails: {
              path: value.path.path,
              scheme: urlScheme,
            },
            metaData: { ...metaData, lockContext: navlock },
          },
          props: finalParams,
        }

        if (pathTestResult != null && (await value.handler(navigationRef, payload))) {
          expireLock(lock)
          return
        }
      }
    }

    // if (metaData && metaData.webViewFallbackUrl) {
    //   await CommonNavs.presentWebView(metaData.webViewFallbackUrl, undefined, { lockContext: lock })
    //   return
    // }

    releaseLock(lock)
  }

  const deeplinkHandler = (event: { url: string }) => {
    /**
     * TODO KEEP THIS FOR NOW>>> MAY END UP NEEDING... not sure
     */
    // const linkUrl = urlFromString(event.url)
    // navigate(linkUrl, undefined, { isDeepLink: true })
  }

  return {
    addScheme(aScheme: string, fallbackSchemeArray?: string[]) {
      const lowerScheme = aScheme.toLowerCase()
      let scheme = routes[lowerScheme]
      if (scheme === undefined) {
        scheme = {
          scheme: lowerScheme,
          fallbackSchemes: fallbackSchemeArray,
          paths: {},
        }
      }
      routes[scheme.scheme] = scheme
    },
    addPaths(toScheme: string, paths: string[], withHandler: NavigationPathHandler) {
      const lowerScheme = toScheme.toLowerCase()
      let scheme = routes[lowerScheme]
      if (scheme === undefined) {
        this.addScheme(lowerScheme)
        scheme = routes[lowerScheme]
      }
      paths.forEach((path) => {
        scheme.paths[path] = {
          path: Path.createPath(path),
          handler: withHandler,
        }
      })
      routes[scheme.scheme] = scheme
    },
    async navigateToActionPath(actionPath: string, id: string) {
      let url = actionPath
      if (!isValidURL(url)) {
        url = `${NAVIGATION_ROUTES_SCHEME}://${actionPath}`
      }
      let urlPath = actionPath
      if (actionPath.charAt(0) !== '/') {
        urlPath = `/${actionPath}`
      }
      const websiteUrl = await getWebsiteUrl()
      const fallbackUrl = `${websiteUrl}${urlPath}`
      await this.navigateToURL(url, id, { webViewFallbackUrl: fallbackUrl })
    },
    async navigateToRoute(route: string, params?: any, metaData?: NavigationMetaData) {
      const url = urlFromString(`${NAVIGATION_ROUTES_SCHEME}://${route}`)

      await this.navigateToURL(url, params, metaData)
    },
    async navigateToURL(toUrl: Url | string, params?: any, metaData?: NavigationMetaData) {
      let url: Url
      if (typeof toUrl === 'string') {
        url = urlFromString(toUrl)
      } else {
        url = toUrl
      }

      await navigate(url, params, metaData)
    },

    start(navigatorRef: React.RefObject<NavigationContainerRef>, defaultGlobalRoutesAsPaths?: string[]) {
      navigationRef = navigatorRef
      routes = {}
      this.addScheme(NAVIGATION_ROUTES_SCHEME)

      if (defaultGlobalRoutesAsPaths !== undefined) {
        for (const route of defaultGlobalRoutesAsPaths) {
          this.addPaths(NAVIGATION_ROUTES_SCHEME, [route], generatePathHandler(route))
        }
      }
      // Linking.removeEventListener('url', deeplinkHandler)
      // Linking.addEventListener('url', deeplinkHandler)
    },
    printRoutesTable() {
      Object.keys(routes).forEach((scheme) => {
        Object.keys(routes[scheme].paths).forEach((path) => {
          console.log('\t', path)
        })
      })
    },
    /**
     * Simply navigate back to the previous screen.
     * No props or options.
     */
    goBack() {
      const lock = acquireLock()
      if (lock === undefined) {
        return
      }

      navigationRef.current?.goBack()

      expireLock(lock)
    },
    /**
     * Pop to the top of the current Stack Navigator
     * No props or options.
     */
    async popToTop() {
      const lock = acquireLock()
      if (lock === undefined) {
        return
      }
      navigationRef.current?.dispatch(StackActions.popToTop())

      expireLock(lock)
    },
    popRootNavigator(navigationCompletionCallback?: NavigationCompletionCallback, stepsToPop = 1) {
      const lock = acquireLock()
      if (lock === undefined) {
        return
      }

      const rootState = navigationRef.current?.getRootState()
      const currentIndex = rootState?.index
      if (!currentIndex) {
        return
      }

      const previousIndex = Math.max(currentIndex - stepsToPop, 0)
      const previousRouteName = rootState?.routes[previousIndex].name
      if (!previousRouteName) {
        return
      }

      navigationRef.current?.navigate(previousRouteName)

      if (navigationCompletionCallback) {
        navigationCompletionCallback(lock)
      }

      expireLock(lock)
    },
    performWhenAvailable(callback: NavigationWaitCallback) {
      if (navlock === undefined) {
        callback()
      } else {
        waitingCallbacks.push(callback)
      }
    },
  }
})()
