import React, { useRef, useEffect } from 'react'
import { SectionList } from 'react-native'
import { useQuery, useApolloClient } from '@apollo/client'
import { useAuth } from '@sample/firebase-client'
import { Stack } from '@sample/layout-controls'
import { Screen } from '@sample/mobile-widgets/screen'
import { NavigableRoute } from '@sample/navigation-client/routes'
import { ProfileImage, SupportIcon, SampleLogoIcon } from '@sample/assets/image-catalog.native'
import remoteConfig from '@react-native-firebase/remote-config'
import { NavigationBar } from '@sample/widgets/navigation-bar'
import { Navigation } from '@sample/navigation-client/navigation'
import { PERSISTED_CURRENT_USER } from '../server-state/user-graphql'
import { InsuranceCard } from './components/insurance-card'
import { PaymentStatusCard, PaymentSettings } from './components/payments'
import { ManagePolicy } from './components/manage-policy'
import Layout from './home-configs.json'
import { useGetCorePolicy } from '../server-state/hooks/hook-factory'
import { TabNavigator } from '@sample/navigation-client/tab-navigator'
import { Sentiance } from './components/sentiance'
import { translate } from '@sample/utilities/i18n'
import { CancelledPolicy } from './components/cancelled-policy'

const components = {
  insurance_card: InsuranceCard,
  manage_policy: ManagePolicy,
  payment_status: PaymentStatusCard,
  cancelled_policy: CancelledPolicy,
}

const formatPhoneForPAS = (firebasePhone: String) => {
  const tempPhone = firebasePhone?.slice(2) // Removes +1
  const PASPhone = `${tempPhone?.substring(0, 3)}-${tempPhone?.substring(3, 6)}-${tempPhone?.substring(6)}`
  return PASPhone
}
const parameters = remoteConfig().getAll()

export const Home = ({ navigation }: { navigation: any }) => {
  const {
    data: { currentUserInfo },
  } = useQuery(PERSISTED_CURRENT_USER)

  const client = useApolloClient()
  const listRef = useRef<SectionList>(null)
  const { currentUser, setToken, claims } = useAuth()

  const { fetchCorePolicy, data: policyData, loading: getPolicyLoading, error: getPolicyError } = useGetCorePolicy()

  useEffect(() => {
    if (policyData && !getPolicyLoading) {
      const updated = { ...currentUserInfo, ...policyData }
      client.writeQuery({
        query: PERSISTED_CURRENT_USER,
        data: {
          currentUserInfo: {
            ...updated,
          },
        },
      })
    }
    if (!policyData) {
      setToken(currentUser)
    }
  }, [policyData])

  useEffect(() => {
    if (!policyData) {
      currentUser?.getIdTokenResult().then((idTokenResult: any) => {
        if (!!idTokenResult.claims) {
          const updated = { ...currentUserInfo, role: idTokenResult.claims.role }
          client.writeQuery({
            query: PERSISTED_CURRENT_USER,
            data: {
              currentUserInfo: {
                ...updated,
              },
            },
          })
          fetchCorePolicy({
            policyID: idTokenResult?.claims?.policyID,
            driversLicense: idTokenResult?.claims?.driversLicense,
            phoneNumber: formatPhoneForPAS(idTokenResult?.claims?.phone_number),
          })
        }
      })
    }
  }, [currentUserInfo, policyData])

  const onProfileClick = () => {
    Navigation.navigateToRoute(NavigableRoute.Profile as any)
  }

  const onSupportClick = () => {
    Navigation.navigateToRoute(NavigableRoute.Support, { supportRoute: 'https://zendesk.com/hc/en-us' })
  }

  const renderComponents =
    (Components: any) =>
    ({ item, idx }: { item: any; idx: number }) => {
      const Section = Components[item['component']]

      return <Section {...item} />
    }

  const Kevin = remoteConfig().getValue('home_screen_config').asString()
  const policyStatus = () => {
    switch (currentUserInfo?.policy?.status?.toLowerCase()) {
      case 'active':
        return 'home-screen'
        break
      case 'inactive':
        return 'disabled-home'
        break
      default:
        return 'home-screen'
    }
  }

  return (
    <Screen
      safeAreaMode={'bottom'}
      screenName={'home_screen'}
      forceStatusBarTint={'light'}
      statusBarBackgroundColor={'background2'}
      backgroundColor={'background1'}
      useStatusBarBackground
    >
      <NavigationBar
        leftItems={[
          {
            title: translate('home.home').toLocaleUpperCase(),
            textType: 'heading5',
            pressHandler: onProfileClick,
          },
        ]}
        rightItems={[
          {
            icon: {
              SVG: ProfileImage.SVG,
              size: { height: 30, width: 30 },
            },
            pressHandler: onProfileClick,
          },
          {
            icon: {
              SVG: SupportIcon.SVG,
              size: { height: 30, width: 30 },
            },
            pressHandler: onSupportClick,
          },
        ]}
        barItemsTint={'primary3'}
        testID={'settings-screen.navigation-bar'}
        showShadow={false}
      />
      <></>

      {claims && <Sentiance {...claims} />}

      <Stack direction={'column'}>
        <SectionList
          ref={listRef}
          sections={[{ data: Layout[policyStatus()] }]}
          scrollEnabled={true}
          keyExtractor={(item, index) => `${item}+${index}`}
          renderItem={renderComponents(components)}
        />
      </Stack>
    </Screen>
  )
}
