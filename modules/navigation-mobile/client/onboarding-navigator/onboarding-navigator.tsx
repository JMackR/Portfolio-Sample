import React from 'react'
import { AffirmRejectDialogScreen, ErrorDialogScreen, PermissionDialog } from '@sample/mobile-widgets/dialog'
import { NavigableRoute } from '@sample/navigation-client/routes'
import { CodeVerification } from '@auto/care-client/onboarding/code-verification'
import {
  OnboardLocation,
  OnboardLocationAlways,
  OnboardLocationRejected,
} from '@auto/care-client/onboarding/onboard-location'
import { PhoneEntry } from '@auto/care-client/onboarding/phone-entry'
import { AuthLoading } from '@auto/care-client/onboarding/auth-loading'
import { AuthSuccess } from '@auto/care-client/onboarding/auth-success'
import {
  PrimaryPhoneEntry,
  UnknownNumberPrimer,
  DriversLicenseEntry,
  UnverifiedDriver,
} from '@auto/care-client/onboarding/non-primary-flow'
import { AuthEntry } from '@auto/care-client/onboarding/auth-entry'
import { WalkthroughCarousel } from '@auto/care-client/onboarding/walkthrough-carousel'
import { NotificationPermissions } from '@auto/care-client/onboarding/notification-permissions'

import { createStackNavigator } from '@react-navigation/stack'
import {
  BottomModalOptions,
  ForcedFullScreenModalOptions,
  ModalDialogOverlayOptions,
  PushPopStackAnimationOptions,
} from '../common'
import type { NavigationPayload } from '../navigation'

export type OnboardingParamList = {
  [NavigableRoute.Landing]: NavigationPayload<undefined>
  [NavigableRoute.AuthEntry]: NavigationPayload<undefined>
  [NavigableRoute.PhoneEntry]: NavigationPayload<undefined>
  [NavigableRoute.CodeVerification]: NavigationPayload<undefined>
  [NavigableRoute.NotificationPermissions]: NavigationPayload<undefined>
  [NavigableRoute.OnboardLocation]: NavigationPayload<undefined>
  [NavigableRoute.LocationRejected]: NavigationPayload<undefined>
  [NavigableRoute.OnboardLocationAlways]: NavigationPayload<undefined>
  [NavigableRoute.AuthLoading]: NavigationPayload<undefined>
  [NavigableRoute.AuthSuccess]: NavigationPayload<undefined>
  [NavigableRoute.AdditionalDriverList]: NavigationPayload<undefined>
  [NavigableRoute.AdditionalDriverInvite]: NavigationPayload<undefined>
  [NavigableRoute.UnverifiedPrimer]: NavigationPayload<undefined>
  [NavigableRoute.PrimaryPhoneEntry]: NavigationPayload<undefined>
  [NavigableRoute.UnknownNumberPrimer]: NavigationPayload<undefined>
  [NavigableRoute.AdditionalDriverLicenseEntry]: NavigationPayload<undefined>
  [NavigableRoute.DriversLicenseEntry]: NavigationPayload<undefined>
  [NavigableRoute.UnverifiedDriver]: NavigationPayload<undefined>
  [NavigableRoute.StateModal]: NavigationPayload<undefined>
  [NavigableRoute.AdditionalDriverTextModal]: NavigationPayload<undefined>
  [NavigableRoute.SearchPrimaryPolicyHolder]: NavigationPayload<undefined>
  [NavigableRoute.VerificationSuccess]: NavigationPayload<undefined>
  [NavigableRoute.WalkthroughCarousel]: NavigationPayload<undefined>
}

const Stack = createStackNavigator<OnboardingParamList>()

export const OnboardingStackNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName={NavigableRoute.AuthEntry} screenOptions={PushPopStackAnimationOptions}>
    <Stack.Screen name={NavigableRoute.AuthEntry} component={AuthEntry} options={ForcedFullScreenModalOptions} />
    <Stack.Screen name={NavigableRoute.PhoneEntry} component={PhoneEntry} options={ModalDialogOverlayOptions} />
    <Stack.Screen name={NavigableRoute.CodeVerification} component={CodeVerification} options={ModalDialogOverlayOptions} />

    <Stack.Screen name={NavigableRoute.AuthLoading} component={AuthLoading} options={ForcedFullScreenModalOptions} />
    <Stack.Screen name={NavigableRoute.AuthSuccess} component={AuthSuccess} options={ForcedFullScreenModalOptions} />

    <Stack.Screen
      name={NavigableRoute.UnknownNumberPrimer}
      component={UnknownNumberPrimer}
      options={ModalDialogOverlayOptions}
    />
    <Stack.Screen
      name={NavigableRoute.PrimaryPhoneEntry}
      component={PrimaryPhoneEntry}
      options={ModalDialogOverlayOptions}
    />
    <Stack.Screen
      name={NavigableRoute.DriversLicenseEntry}
      component={DriversLicenseEntry}
      options={ModalDialogOverlayOptions}
    />
    <Stack.Screen name={NavigableRoute.UnverifiedDriver} component={UnverifiedDriver} options={ModalDialogOverlayOptions} />

    <Stack.Screen
      name={NavigableRoute.AdditionalDriverLicenseEntry}
      component={DriversLicenseEntry}
      options={ForcedFullScreenModalOptions}
    />

    <Stack.Screen
      name={NavigableRoute.NotificationPermissions}
      component={NotificationPermissions}
      options={ForcedFullScreenModalOptions}
    />
    <Stack.Screen name={NavigableRoute.OnboardLocation} component={OnboardLocation} options={ForcedFullScreenModalOptions} />
    <Stack.Screen
      name={NavigableRoute.OnboardLocationAlways}
      component={OnboardLocationAlways}
      options={ForcedFullScreenModalOptions}
    />

    <Stack.Screen
      name={NavigableRoute.LocationRejected}
      component={OnboardLocationRejected}
      options={ForcedFullScreenModalOptions}
    />
    <Stack.Screen name={NavigableRoute.PermissionsDialog} component={PermissionDialog} options={ModalDialogOverlayOptions} />
    <Stack.Screen
      name={NavigableRoute.AffirmRejectDialog}
      component={AffirmRejectDialogScreen}
      options={ModalDialogOverlayOptions}
    />
    <Stack.Screen name={NavigableRoute.ErrorDialog} component={ErrorDialogScreen} options={ModalDialogOverlayOptions} />

    <Stack.Screen
      name={NavigableRoute.WalkthroughCarousel}
      component={WalkthroughCarousel}
      options={ForcedFullScreenModalOptions}
    />
  </Stack.Navigator>
)
