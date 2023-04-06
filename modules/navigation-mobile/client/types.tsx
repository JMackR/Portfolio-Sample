import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import { NavigableRoute } from './routes'

export type RootStackParamList = {
  [NavigableRoute.HomeStack]: NavigatorScreenParams<HomeTabParamList>
  [NavigableRoute.OnboardStack]: NavigatorScreenParams<OnboardingStackParamList>
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

export type HomeTabParamList = {
  [NavigableRoute.Home]: undefined
  [NavigableRoute.HomeStack]: undefined
  [NavigableRoute.ClaimStack]: undefined
  [NavigableRoute.CoverageStack]: undefined
  [NavigableRoute.PaymentStack]: undefined
}
export type OnboardingStackParamList = {}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList
  }
}
