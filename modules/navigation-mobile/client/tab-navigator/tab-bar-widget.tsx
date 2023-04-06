import React from 'react'
import { View, StyleSheet, PixelRatio } from 'react-native'
import { NavigableRoute } from '../routes'
import { shadow, useColor, useColorForBackgroundColor } from '@sample/themes'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import type { NavigationState } from '@react-navigation/native'
import { useNavigationState, useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Navigation } from '../navigation'
import { TabBarButton } from './tab-bar-button'

export const TabBarHeight = 62
const scale = PixelRatio.getFontScale()

const TabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    height: TabBarHeight,
  },
  tabContainer: { flexDirection: 'row' },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: StyleSheet.hairlineWidth,
  },
})

const canPopTabStack = (state: NavigationState, stackRoute: string): boolean => {
  const homeTabInfo = state.routes.find((route) => route.name === NavigableRoute.HomeTabs)
  const homeTabInfoState = homeTabInfo?.state as NavigationState
  if (!homeTabInfoState) {
    return false
  }

  const stackInfo = homeTabInfoState.routes.find((route) => route.name === stackRoute)
  const stackInfoState = stackInfo?.state as NavigationState
  if (!stackInfoState) {
    return false
  }

  return stackInfoState.index > 0
}

const TabBarWidget = (props: BottomTabBarProps) => {
  const { colors } = useColor()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [notificationsQty, setBadgeAmount] = React.useState<number>(null)
  const activeTintColor = colors.brand
  const navState = useNavigationState((state) => state)

  return (
    // The container for the whole tab bar
    <View
      style={[TabStyles.tabBar]}
      testID={'tab-navigator.tab-bar-widget'}
      accessibilityLabel={'tab-navigator.tab-bar-widget'}
    >
      {/* The bar under the slider for the actual tabs */}
      <View style={TabStyles.tabContainer}>
        {/* Build the tab buttons from the routes */}
        {props.state.routes.map((route, index: number) => {
          const { options } = props.descriptors[route.key]
          const label = options.title || route.name
          const isFocused = props.state.index === index
          const icon = options.tabBarIcon! as (props: { focused: boolean }) => React.ReactNode

          const badgeAmount = route.name === NavigableRoute.MoreStack ? notificationsQty : undefined
          const onPress = () => {
            if (!isFocused) {
              Navigation.navigateToRoute(route.name, { HELLO: 'BOB' })
                .then(() => {
                  Navigation.performWhenAvailable(() => {
                    if (canPopTabStack(navState, route.name)) {
                      Navigation.popToTop()
                    }
                  })
                  // AnalyticsNavigation.trackBottomNavEventScreenShow(eventInput)
                })
                .catch((error) => {
                  // AnalyticsDebug.logError(error)
                })
            } else {
              Navigation.performWhenAvailable(() => {
                if (canPopTabStack(navState, route.name)) {
                  Navigation.popToTop()
                }
              })
            }
          }

          return (
            <TabBarButton
              key={index}
              index={index}
              onPress={onPress}
              active={isFocused}
              labelText={label}
              renderIcon={icon({ focused: isFocused })}
              badgeAmount={badgeAmount}
              testID={label}
            />
          )
        })}
      </View>

      {/* Line at the top of the tab bar */}
      {/* <View style={[TabStyles.line, { backgroundColor: useColorForBackgroundColor('primary') }]} /> */}
      {/* <PnHandler {...props} /> */}
      {/* <TabBarIndicator tabCount={props.state.routes.length} tintColor={activeTintColor} activeIndex={props.state.index} /> */}
    </View>
  )
}

export { TabBarWidget }
