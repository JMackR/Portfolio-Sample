import React from 'react'
import { View } from 'react-native'
import { TrashCircleFill } from '@sample/assets'
import { LocalSVGSource, SVG } from '@sample/basic-controls'
import { shadow, useColorForBackgroundColor } from '@sample/themes'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { HomeStackNavigator } from '../home-navigator/home-navigator'

import { NavigableRoute } from '../routes'
import { PaymentStackNavigator } from '../payment-navigator'
import { TabBarWidget } from './tab-bar-widget'

const tabPressListener = (props) => {
  const { navigation, route } = props

  /**
   * KEEP THIS IN PLACE FOR POSSIBLE FUTURE NEEDS
   */
  return {
    focus: (e) => {},
    blur: (e) => {
      // const target = e.target
      // const state = navigation.dangerouslyGetState()
      // const _route = state.routes.find(r => r.key === target)
    },
    // Log the state for debug only
    state: (e) => {
      const { state } = e.data
      // console.log('STATE:::', state)
    },
  }
}
const createNavigationOptions = (title: string, fillSVG: LocalSVGSource, outlineSVG: LocalSVGSource) => () => ({
  tabBarIcon: (props: { focused: boolean }) => (
    <SVG
      localSVG={{ SVG: props.focused ? fillSVG.SVG : outlineSVG.SVG }}
      // tint={props.focused ? 'link' : 'secondary'}
    />
  ),
  title,
})

const CoverageOptions = createNavigationOptions('tab-navigator.coverage', TrashCircleFill, TrashCircleFill)
const PaymentOptions = createNavigationOptions('tab-navigator.payment', TrashCircleFill, TrashCircleFill)
const InsightsOptions = createNavigationOptions('tab-navigator.insights', TrashCircleFill, TrashCircleFill)

const Tabs = createBottomTabNavigator()

const tabBarFunc = (props: BottomTabBarProps) => <TabBarWidget {...props} />

export const TabNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,

        paddingBottom: insets.bottom,
        // ...shadow.topShadow,
        backgroundColor: useColorForBackgroundColor('secondary'),
      }}
      testID={'tab-navigator'}
    >
      <Tabs.Navigator tabBar={tabBarFunc} initialRouteName={NavigableRoute.HomeStack} screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name={NavigableRoute.HomeStack}
          component={HomeStackNavigator}
          options={PaymentOptions}
          listeners={(props) => tabPressListener({ ...props })}
        />

        <Tabs.Screen
          name={NavigableRoute.PaymentStack}
          component={PaymentStackNavigator}
          options={PaymentOptions}
          listeners={(props) => tabPressListener({ ...props })}
        />
      </Tabs.Navigator>
    </View>
  )
}
