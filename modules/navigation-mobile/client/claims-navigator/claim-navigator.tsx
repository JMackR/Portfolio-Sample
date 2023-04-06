import React from 'react'
import { Easing } from 'react-native'
import { useCoordinator, ClaimCoordinator } from '@auto/care-client/claim/claim-coordinator'
import { AnimationType } from '@sample/constants/animation-constants'
import { Flex } from '@sample/layout-controls'
import { Screen } from '@sample/mobile-widgets/screen'
import { NavigableRoute } from '../routes'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import type { NavigationPayload } from '../navigation'
import { NavigationHeader } from './navigation-header'
import { MediaController } from '@auto/care-client/claim/components'
import { FullScreenModalOptions, ModalDialogOverlayOptions } from '../common'
import { CameraPage } from '@sample/mobile-widgets/vision-camera/src/CameraPage'
import { ClaimMainComponent } from '@auto/care-client/claim/claim-main'

export type ClaimStackNavigatorParamList = {
  [NavigableRoute.ClaimWelcome]: NavigationPayload<undefined>
  [NavigableRoute.ClaimProcess]: NavigationPayload<undefined>
  [NavigableRoute.GetStarted]: NavigationPayload<undefined>
  [NavigableRoute.OnScene]: NavigationPayload<undefined>
  [NavigableRoute.LocationMap]: NavigationPayload<undefined>
  [NavigableRoute.LocationInfo]: NavigationPayload<undefined>
  [NavigableRoute.IncidentDescription]: NavigationPayload<undefined>
  [NavigableRoute.DriverSelection]: NavigationPayload<undefined>
  [NavigableRoute.OtherDriver]: NavigationPayload<undefined>
  [NavigableRoute.VehicleSelect]: NavigationPayload<undefined>
  [NavigableRoute.OtherVehicle]: NavigationPayload<undefined>
  [NavigableRoute.InjuriesIntro]: NavigationPayload<undefined>
  [NavigableRoute.FirstPartyInjury]: NavigationPayload<undefined>
  [NavigableRoute.ThirdyPartyInjury]: NavigationPayload<undefined>
  [NavigableRoute.OthersIntro]: NavigationPayload<undefined>
  [NavigableRoute.OthersInvolved]: NavigationPayload<undefined>
  [NavigableRoute.QtyPeopleInvolved]: NavigationPayload<undefined>
  [NavigableRoute.DamageIntro]: NavigationPayload<undefined>
  [NavigableRoute.VehicleDamage]: NavigationPayload<undefined>
  [NavigableRoute.DamageDescription]: NavigationPayload<undefined>
  [NavigableRoute.VehicleTowed]: NavigationPayload<undefined>
  [NavigableRoute.TowCompany]: NavigationPayload<undefined>
  [NavigableRoute.OtherVehicleDamage]: NavigationPayload<undefined>
  [NavigableRoute.OtherVehicleDamageDescription]: NavigationPayload<undefined>
  [NavigableRoute.PropertyDamage]: NavigationPayload<undefined>
  [NavigableRoute.PropertyDescription]: NavigationPayload<undefined>
  [NavigableRoute.PropertyOwner]: NavigationPayload<undefined>
  [NavigableRoute.PropertyLocationEntry]: NavigationPayload<undefined>
  [NavigableRoute.FinalIntro]: NavigationPayload<undefined>
  [NavigableRoute.CaseNumber]: NavigationPayload<undefined>
  [NavigableRoute.Witnesses]: NavigationPayload<undefined>
  [NavigableRoute.WitnesseContact]: NavigationPayload<undefined>
  [NavigableRoute.AdditionalInfo]: NavigationPayload<undefined>
  [NavigableRoute.Media]: NavigationPayload<undefined>
  [NavigableRoute.Finally]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<ClaimStackNavigatorParamList>()
const ClaimsStepsStack = createStackNavigator<ClaimStackNavigatorParamList>()

// const components: any = {
//   claim_welcome: ClaimMainComponent,
//   claim_process: Bob,
//   get_started: ClaimMainComponent,
//   preliminary_info: ClaimMainComponent,
//   location_map: ClaimMainComponent,
//   ClaimSuccess: ClaimMainComponent,
//   ClaimSummary: ClaimMainComponent,
//   ClaimVehicle: ClaimMainComponent,
// }
export const ClaimStackNavigator: React.FC = () => {
  return (
    <ClaimCoordinator>
      <ClaimStackRoutes />
    </ClaimCoordinator>
  )
}

const ClaimStackContainer = () => {
  const { viewModel } = useCoordinator()

  return (
    <Screen safeAreaMode={'all'} statusBarBackgroundColor={'background1'}>
      <Flex direction="row">
        <NavigationHeader />
      </Flex>
      <Flex direction="row" grow={1} crossAxisDistribution="stretch">
        <ClaimsStepsNavigator />
      </Flex>
    </Screen>
  )
}
const ClaimStackRoutes = () => (
  <Stack.Navigator
    initialRouteName={NavigableRoute.ClaimStackSteps}
    screenOptions={{ headerShown: false, gestureEnabled: false }}
  >
    <Stack.Screen
      name={NavigableRoute.ClaimStackSteps}
      component={ClaimStackContainer}
      // options={ForcedFullScreenModalOptions}
    />
    <Stack.Screen name={NavigableRoute.MediaController} options={ModalDialogOverlayOptions} component={MediaController} />
    <Stack.Screen name={NavigableRoute.CameraRoll} options={FullScreenModalOptions} component={CameraPage} />
  </Stack.Navigator>
)

const ClaimsStepsNavigator = () => {
  const { viewModels } = useCoordinator()

  return (
    <ClaimsStepsStack.Navigator initialRouteName={NavigableRoute.ClaimWelcome} screenOptions={{ headerShown: false }}>
      {viewModels.map((viewModel) => {
        return (
          <ClaimsStepsStack.Screen
            key={viewModel.flowStep}
            name={viewModel.route}
            // component={components[viewModel.component]}
            component={ClaimMainComponent}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
              // headerLeftContainerStyle: viewModel.shouldHideBackButton ? null : undefined,
              gestureEnabled: viewModel.navGestureEnabled,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {
                    duration: AnimationType.Opens,
                    easing: Easing.out(Easing.ease),
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: AnimationType.ExitsAndClosings,
                    easing: Easing.out(Easing.ease),
                  },
                },
              },
            }}
          />
        )
      })}
    </ClaimsStepsStack.Navigator>
  )
}
