import type {
  NavigationContainerComponent,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from '@react-navigation'
import type { Url } from '../../../url'
import type { NavigationPathHandler } from '../navigation'

export const Navigation = {
  addScheme(aScheme: string, shouldGlobalFallback?: boolean) {},
  addPaths(toScheme: string, paths: string[], withHandler: NavigationPathHandler, shouldGlobalFallback?: boolean) {},
  navigateToRoute(route: string, params?: any) {},
  navigateToURL(toUrl: Url | string, params?: any) {},
  start(navigatorRef: NavigationContainerComponent, defaultGlobalRoutesAsPaths?: string[]) {},
  extractDetails(navigationProps: NavigationScreenProp<NavigationRoute, NavigationParams>, key: string) {},
  extractPram<T>(navigationProps: NavigationScreenProp<NavigationRoute, NavigationParams>, key: string): T {},
}
