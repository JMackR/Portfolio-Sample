import React from 'react'
import { NavigableRoute } from '@sample/navigation-client/routes'
import { MakePayment } from '@auto/care-client/billing/make-payment'
import { createStackNavigator } from '@react-navigation/stack'
import { PushPopStackAnimationOptions, ForcedFullScreenModalOptions } from '../common'
import type { NavigationPayload } from '../navigation'

export type PaymentStackNavigatorParamList = {
  [NavigableRoute.Payment]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<PaymentStackNavigatorParamList>()
const HomeScreen = () => {
  return <></>
}
export const PaymentStackNavigator = () => (
  <Stack.Navigator initialRouteName={NavigableRoute.Payment} screenOptions={PushPopStackAnimationOptions}>
    <Stack.Screen name={NavigableRoute.Payment} component={MakePayment} options={ForcedFullScreenModalOptions} />
  </Stack.Navigator>
)
