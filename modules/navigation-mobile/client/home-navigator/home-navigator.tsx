import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import { NavigableRoute } from '../routes'
import { Billing, PaymentHistory, PaymentSchedule } from '@auto/care-client/billing'
import { Home } from '@auto/care-client/home'
import { Documents } from '@auto/care-client/documents'
import { DocumentViewer } from '@auto/care-client/documents'
import { ProfileInviteModal } from '@auto/care-client/profile/profile-invite-modal'
import { Policy } from '@auto/care-client/policy'
import { Profile, ProfileInviteModalInfo, ProfileInviteModalSuccess } from '@auto/care-client/profile'
import { Dashboard } from '@auto/care-client/sentience/views/Dashboard'
import { createStackNavigator } from '@react-navigation/stack'
import { ClaimStackNavigator } from '../claims-navigator'
import { AdditionalDriverPaymentModal, PaymentSettings } from '@auto/care-client/home/components/payments'
import { ChangePolicy } from '@auto/care-client/change-policy'
import { PaymentScreen } from '@auto/care-client/billing/paymentSheet'
import { PaymentProcessing } from '@auto/care-client/billing/payment-processing'
import { PaymentSuccess } from '@auto/care-client/billing/payment-success'
import { PaymentMethod } from '@auto/care-client/billing/add-payment-method'
import { Support } from '@auto/care-client/support'
import { TermsOfService } from '@auto/care-client/terms-of-service'
import { PrivacyPolicy } from '@auto/care-client/privacy-policy'

import {
  PushPopStackAnimationOptions,
  ForcedFullScreenModalOptions,
  BottomModalOptions,
  FadeInFullScreen,
  ModalDialogOverlayOptions,
} from '../common'
import type { NavigationPayload } from '../navigation'
import { PaymentStackNavigator } from '../payment-navigator'
import { FeatureFlags } from '@auto/care-client/feature-flags'

export type HomeStackNavigatorParamList = {
  [NavigableRoute.Home]: NavigationPayload<undefined>
  [NavigableRoute.Profile]: NavigationPayload<undefined>
  [NavigableRoute.Support]: NavigationPayload<{ supportUrl: string }>
  [NavigableRoute.PolicyOverview]: NavigationPayload<undefined>
  [NavigableRoute.ChangePolicy]: NavigationPayload<undefined>
  [NavigableRoute.Documents]: NavigationPayload<undefined>
  [NavigableRoute.Billing]: NavigationPayload<undefined>
  [NavigableRoute.ClaimStack]: NavigationPayload<undefined>
  [NavigableRoute.PaymentStack]: NavigationPayload<undefined>
  [NavigableRoute.Payment]: NavigationPayload<undefined>
  [NavigableRoute.PaymentModalAdditionalDriver]: NavigationPayload<undefined>
  [NavigableRoute.PaymentProcessing]: NavigationPayload<undefined>
  [NavigableRoute.PaymentSuccess]: NavigationPayload<undefined>
  [NavigableRoute.PaymentMethod]: NavigationPayload<undefined>
  [NavigableRoute.PaymentSchedule]: NavigationPayload<undefined>
  [NavigableRoute.PaymentHistory]: NavigationPayload<undefined>
  [NavigableRoute.ProfileInviteModalInfo]: NavigationPayload<undefined>
  [NavigableRoute.ProfileInviteModal]: NavigationPayload<undefined>
  [NavigableRoute.ProfileInviteModalSuccess]: NavigationPayload<undefined>
  [NavigableRoute.Sentience]: NavigationPayload<undefined>
  [NavigableRoute.TermsOfService]: NavigationPayload<undefined>
  [NavigableRoute.PrivacyPolicy]: NavigationPayload<undefined>
  [NavigableRoute.PaymentSettings]: NavigationPayload<undefined>
  [NavigableRoute.DocumentViewer]: NavigationPayload<{ url: string }>
}

const Stack = createStackNavigator<HomeStackNavigatorParamList>()

export const HomeStackNavigator: React.FC = () => (
  <StripeProvider
    publishableKey="pk_test_51KikbJKZf32OhRSe7m84X0XURnZHx8X8MsAHAzB0u49WUpAf9uSSOKOIhEZPjh70RBjgftmmiRvAWcjqf4oSsSBt00ay9UBBTX"
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    // merchantIdentifier="merchant.com.SampleMobilityInc" // required for Apple Pay
  >
    <Stack.Navigator initialRouteName={NavigableRoute.Home} screenOptions={PushPopStackAnimationOptions}>
      <Stack.Screen name={NavigableRoute.Home} component={Home} options={FadeInFullScreen} />

      <Stack.Screen name={NavigableRoute.Profile} component={Profile} options={FadeInFullScreen} />
      <Stack.Screen name={NavigableRoute.PolicyOverview} component={Policy} options={ModalDialogOverlayOptions} />
      <Stack.Screen name={NavigableRoute.Documents} component={Documents} options={ModalDialogOverlayOptions} />
      <Stack.Screen
        name={NavigableRoute.ProfileInviteModalInfo}
        component={ProfileInviteModalInfo}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen
        name={NavigableRoute.ProfileInviteModal}
        component={ProfileInviteModal}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen
        name={NavigableRoute.ProfileInviteModalSuccess}
        component={ProfileInviteModalSuccess}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen name={NavigableRoute.ChangePolicy} options={ModalDialogOverlayOptions} component={ChangePolicy} />
      <Stack.Screen name={NavigableRoute.DocumentViewer} component={DocumentViewer} options={ModalDialogOverlayOptions} />
      <Stack.Screen name={NavigableRoute.Support} component={Support} options={FadeInFullScreen} />
      <Stack.Screen name={NavigableRoute.Sentience} component={Dashboard} options={FadeInFullScreen} />
      <Stack.Screen name={NavigableRoute.TermsOfService} component={TermsOfService} options={FadeInFullScreen} />
      <Stack.Screen name={NavigableRoute.PrivacyPolicy} component={PrivacyPolicy} options={FadeInFullScreen} />

      <Stack.Screen name={NavigableRoute.Billing} component={Billing} options={ForcedFullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.FeatureFlags} component={FeatureFlags} options={ForcedFullScreenModalOptions} />
      {/* <Stack.Screen
      name={NavigableRoute.PaymentStack}
      component={PaymentStackNavigator}
      options={ForcedFullScreenModalOptions}
    /> */}
      <Stack.Screen name={NavigableRoute.Payment} component={PaymentScreen} options={ForcedFullScreenModalOptions} />
      <Stack.Screen
        name={NavigableRoute.PaymentModalAdditionalDriver}
        component={AdditionalDriverPaymentModal}
        options={ModalDialogOverlayOptions}
      />
      <Stack.Screen
        name={NavigableRoute.PaymentProcessing}
        component={PaymentProcessing}
        options={ForcedFullScreenModalOptions}
      />
      <Stack.Screen name={NavigableRoute.PaymentSettings} component={PaymentSettings} options={ModalDialogOverlayOptions} />
      <Stack.Screen name={NavigableRoute.PaymentSuccess} component={PaymentSuccess} options={ForcedFullScreenModalOptions} />
      <Stack.Screen name={NavigableRoute.PaymentMethod} component={PaymentMethod} options={ModalDialogOverlayOptions} />
      <Stack.Screen name={NavigableRoute.PaymentSchedule} component={PaymentSchedule} options={ModalDialogOverlayOptions} />
      <Stack.Screen name={NavigableRoute.PaymentHistory} component={PaymentHistory} options={ForcedFullScreenModalOptions} />
    </Stack.Navigator>
  </StripeProvider>
)
