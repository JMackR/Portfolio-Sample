/* eslint-disable import/no-cycle */
// import { ClaimStackNavigator } from '@sample/navigation-client/claims-navigator'
import React, { useEffect, useState, useRef } from 'react'
import { Alert, Linking, AppState, Platform } from 'react-native'
import { useApolloClient, useQuery } from '@apollo/client'
import { PERSISTED_CURRENT_USER } from '@auto/care-client/server-state/user-graphql'
import { useAuth } from '@sample/firebase-client'
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import messaging from '@react-native-firebase/messaging'
import {
  NavigationContainer,
  createNavigationContainerRef,
  useNavigation,
  CommonActions,
  useTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Config from 'react-native-config'
import xdate from 'xdate'
import { getDeviceToken } from 'react-native-device-info'
import { StorageController } from '@sample/utilities/storage'
import { CoverPhotoEdit, PhotoEdit } from '@sample/mobile-widgets/photo-edit'
import { PhotoPreview } from '@sample/mobile-widgets/image-select/image-preview'
import { AffirmRejectDialogScreen, ErrorDialogScreen, OptionsDialog, PermissionDialog } from '@sample/mobile-widgets/dialog'
import { StaticModalPopup } from '@sample/mobile-widgets/modal-card/modal-static'
import { PhotoGalleryModal } from '@sample/mobile-widgets/photo-gallery'
import { NavigableRoute } from '../routes'
import { useCoreNotifConfig } from '@sample/comms-client/hooks/useCoreNotifConfig'
import { DatePickerModal, OptionsModal } from '@auto/care-client/claim/components'
import { useUpdateUserInfo, useSendSMS } from '@auto/care-client/server-state/hooks'
import { OnboardLocationRejected } from '@auto/care-client/onboarding/onboard-location'
import { OnboardingStackNavigator } from '../onboarding-navigator'
import { ClaimStackNavigator } from '../claims-navigator'
import { Group } from '@sample/mobile-widgets/mapbox/src/scenes/GroupAndItem'
// import AnimatedLine from '@sample/mobile-widgets/mapbox/src/examples/Animations/AnimatedLine'
// import DriveTheLine from '@sample/mobile-widgets/mapbox/src/examples/Animations/DriveTheLine'
// import CameraAnimation from '@sample/mobile-widgets/mapbox/src/examples/V10/CameraAnimation'
// import GlobeProjection from '@sample/mobile-widgets/mapbox/src/examples/V10/GlobeProjection'
// import MapHandlers from '@sample/mobile-widgets/mapbox/src/examples/V10/MapHandlers'
// import Markers from '@sample/mobile-widgets/mapbox/src/examples/V10/MapHandlers'
// import TerrainSkyAtmosphere from '@sample/mobile-widgets/mapbox/src/examples/V10/TerrainSkyAtmosphere'
import rc, { RUDDER_LOG_LEVEL } from '@rudderstack/rudder-sdk-react-native'
import {
  ForcedFullScreenModalOptions,
  FullScreenModalOptions,
  ModalCardOverlayOption,
  ModalDialogOverlayOptions,
  PushPopStackAnimationOptions,
} from '../common'
import { HomeStackNavigator } from '../home-navigator'
import { InitializeDeeplinking, initializeNavigation } from '../navigation'
import type { NavigationPayload } from '../navigation/navigation.d'
// import { TabNavigator } from '../tab-navigator'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'

export type NavigatorParamList = {
  [NavigableRoute.HomeTabs]: NavigationPayload<undefined>
  [NavigableRoute.Landing]: NavigationPayload<undefined>
  [NavigableRoute.ModalCard]: NavigationPayload<{ modalId: string }>
  [NavigableRoute.CustomizeTheme]: NavigationPayload<undefined>
  [NavigableRoute.PhoneEntry]: NavigationPayload<undefined>
  [NavigableRoute.OptionsDialog]: NavigationPayload<{ modalId: string; options: string[] }>
}

const Stack = createStackNavigator()
const NAV_STATE_KEY = 'bobisme'

const initialization = async () => {
  // setOptions({
  //   "devKey": "tZGiwrAUq8xLuNYb99q2VT",
  //   "isDebug": true,
  //   "onInstallConversionDataListener": true,
  //   "appleAppId": "1618934842"
  // })

  const config = {
    dataPlaneUrl: 'https://ridewithlojbnp.dataplane.rudderstack.com',
    trackAppLifecycleEvents: true,
    // autoCollectAdvertId: true,
    recordScreenViews: true,
    logLevel: RUDDER_LOG_LEVEL.NONE,
    // withFactories: [appsflyer],
  }

  // const props = {
  //   k1: 'v1',
  //   k2: 'v3',
  //   k3: 'v3',
  //   name: 'Miraj',
  // }

  // await rc.setup('2Hj81yqRT8VIpizwz62mDlWh4h6', config)

  // await rc.identify('test_userIdiOS', {
  //   email: 'testuseriOS@example.com',
  //   location: 'UK',
  // })
  // await rc.track('React Native event', props)
  // await rc.screen('React Native screen', props)

  // setOneLinkCustomDomains(
  //   'desu.rudderstack.com',
  //   () => {
  //     console.log('Successfully set')
  //   },
  //   () => {
  //     console.log('Failed to set')
  //   }
  // )
}

export const Navigator = () => {
  const navigationRef = createNavigationContainerRef<ReactNavigation.RootParamList>()
  const navReadyRef = useRef<boolean>(false)
  const routeNameRef = useRef<string | null>(null)
  const { currentUser, initializing, authService, setToken } = useAuth()
  const [locationPermissionBlocked, setLocationPermissionBlocked] = useState(false)
  // const navigation = useNavigation()
  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()
  // const { updateDriverInfo } = useUpdateUserInfo()
  const { setChannels } = useCoreNotifConfig()
  const {
    data: { currentUserInfo: userData },
  } = useQuery(PERSISTED_CURRENT_USER)
  // console.log('currentUser', currentUser)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // const client = useApolloClient()
  const { createSMS } = useSendSMS()
  useEffect(() => {
    if (appStateVisible === 'active' && currentUser) {
      console.log('APPSTATE VISIBLE', appStateVisible)
      setToken(currentUser)
    }
  }, [appStateVisible, currentUser])

  useEffect(() => {
    notifee.registerForegroundService((notification) => {
      return new Promise(() => {
        console.log('FOREGROUND SERVICE', notification)
      })
    })

    notifee.onForegroundEvent(({ type, detail }) => {
      const { notification, pressAction, input } = detail
      console.log('FIRE FOREGROUND', input)
      console.log('FOREGROUND USERDATA', userData)
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'send-help') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: 'Just letting you know I got pulled over by the police... Bring bail money, FAST!!!',
        })
      }
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'contact') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: input,
        })
      }
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'dismiss') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: 'LEAVE ME ALONE ALI SALHI... I KNOW WHERE YOU LIVE!!!!',
        })
      }
    })
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction, input } = detail

      console.log('FIRE BACKGROUND', userData)
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'send-help') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: 'Just letting you know I got pulled over by the police... Bring bail money, FAST!!!',
        })
      }
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'contact') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: input,
        })
      }
      if (type === EventType.ACTION_PRESS && pressAction?.id === 'dismiss') {
        createSMS({
          phoneNumber: userData.phoneNumber,
          message: 'LEAVE ME ALONE ALI SALHI... I KNOW WHERE YOU LIVE!!!!',
        })
      }
    })
    // }
  }, [])

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification)
      // navigation.navigate(remoteMessage.data.type)
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification)
          // setInitialRoute(remoteMessage.data.type) // e.g. "Settings"
        }
      })
  }, [])

  useEffect(() => {
    const getToken = async () => {
      // await authService?.logout()
      const fcmToken = await messaging().getToken()
      // console.log('USER DATA', userData)

      if (userData.docID) {
        // await Promise.all([
        //   crashlytics().setUserId(userData?.docID),
        //   crashlytics().setAttributes({
        //     environment: process.env.NODE_ENV,
        //     date: new Date().toLocaleDateString(),
        //   }),
        // ])
        // await client.writeQuery({
        //   query: PERSISTED_CURRENT_USER,
        //   data: {
        //     currentUserInfo: { ...userData, deviceToken: await fcmToken },
        //   },
        // })
        // // console.log('TOKEN IS', await fcmToken)
        // await updateDriverInfo(userData.docID, {
        //   deviceToken: await fcmToken,
        // })
      }
    }
    getToken()
  }, [userData?.docID])

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await StorageController(NAV_STATE_KEY).getItem()
        // const userData = await StorageController('CURRENT_USER_DATA').getItem()
        // console.log(' JSON.parse(savedStateString', JSON.parse(savedStateString))

        // currentUserInfo(JSON.parse(userData))
        const state = JSON.parse(savedStateString)
        setInitialState(state)
      } finally {
        setIsReady(true)
      }
    }

    Promise.race([
      // getInitialState(),
      new Promise((resolve) =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch((e) => {
        console.error(e)
      })
      .then((state) => {
        if (state !== undefined) {
          setInitialState(state)
          setIsReady(true)
        } else {
          restoreState()
        }
      })
  }, [isReady])
  // console.log('CURRENT USER', currentUser)
  if (currentUser) {
    // console.log('CURRENT USER')
    /**
     * TODO JR change to return a callable function rather then the entire hook
    and maybe change this to a foreground check
     *  */
  }
  // console.log('CURRENT USER', currentUser)

  useEffect(() => {
    if (initialState) {
      if (initialState[0]) {
        //@ts-ignore
        const [authRoute] = initialState?.filter((r) => r.name === 'onboarding-stack')

        //@ts-ignore
        const [homeRoute] = initialState?.filter((r) => r.name === 'home-stack')

        if (authRoute && homeRoute) {
          navigationRef?.current?.reset({
            routes: [{ name: 'home-stack' }],
            index: 0,
          })
        }
      }
    }
  }, [initialState])

  useEffect(() => {
    setChannels()
    initialization()
    initializeNavigation(navigationRef)
    InitializeDeeplinking()
  }, [navigationRef])

  const checkGranted = async () => {
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('Location Always Permission is not available (on this device / in this context)')
            break
          case RESULTS.DENIED:
            console.log('Location Always Permission has not been requested / is denied but requestable')
            break
          case RESULTS.LIMITED:
            console.log('Location Always Permission is limited: some actions are possible')
            break
          case RESULTS.GRANTED:
            console.log('Location Always Permission is granted')
            setLocationPermissionBlocked(false)
            break
          case RESULTS.BLOCKED:
            console.log('Location Always Permission is denied and not requestable anymore')
            setLocationPermissionBlocked(true)
            break
        }
      })
      .catch((error) => {})
  }
  useEffect(() => {
    if (locationPermissionBlocked) {
      navigationRef.navigate(NavigableRoute.LocationBlocked)
    }
  }, [locationPermissionBlocked])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        checkGranted()
      }
      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [navReadyRef.current])

  const { colors } = useTheme()
  colors.background = 'transparent'

  if (initializing) {
    return null
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        check(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
          .then((result) => {
            switch (result) {
              case RESULTS.GRANTED:
                console.log('Location Always Permission is granted')
                break
              case RESULTS.BLOCKED:
                console.log('Location Always Permission is denied and not requestable anymore')
                navigationRef.navigate(NavigableRoute.LocationBlocked)
                break
            }
          })
          .catch((error) => {})
        navReadyRef.current = true
        // routeNameRef.current = navigationRef.current.getCurrentRoute().name
      }}
      // initialState={initialState}

      onStateChange={async (state) => {
        const route = navigationRef?.current
        // console.log("WHAT'S THE NAV REF", route)

        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef?.current.getCurrentRoute().name

        if (previousRouteName !== currentRouteName) {
          // await rc.screen(currentRouteName, {
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // })
        }
        routeNameRef.current = currentRouteName

        const unsubscribe = navigationRef.addListener('state', (e) => {
          /**
           *   You can get the raw navigation state (partial state object of the root navigator)
           *   console.log('nav state', e.data.state.routes)
           *   Or get the full state object with `getRootState()`
           */

          //@ts-ignore
          setInitialState(e?.data?.state?.routes)
        })
        // StorageController(NAV_STATE_KEY).setItem(JSON.stringify(state))
      }}
    >
      <Stack.Navigator
        initialRouteName={
          currentUser?.uid
            ? // locationPermissionBlocked
              //   ? NavigableRoute.OnboardingStack
              // :
              NavigableRoute.HomeStack
            : NavigableRoute.OnboardingStack
        }
        screenOptions={PushPopStackAnimationOptions}
      >
        {/* <Stack.Screen name={NavigableRoute.HomeStack} component={TabNavigator} options={ForcedFullScreenModalOptions} /> */}

        <Stack.Screen
          name={NavigableRoute.HomeStack}
          component={HomeStackNavigator}
          options={ForcedFullScreenModalOptions}
        />
        <Stack.Screen
          name={NavigableRoute.OnboardingStack}
          component={OnboardingStackNavigator}
          options={ForcedFullScreenModalOptions}
        />
        <Stack.Screen
          name={NavigableRoute.ClaimStack}
          component={ClaimStackNavigator}
          options={ForcedFullScreenModalOptions}
        />
        <Stack.Screen
          name={NavigableRoute.LocationBlocked}
          component={OnboardLocationRejected}
          options={ForcedFullScreenModalOptions}
        />
        {/* <Stack.Screen name={NavigableRoute.Group} component={Group} />
        <Stack.Screen name={NavigableRoute.Animated_Line} component={AnimatedLine} />
        <Stack.Screen name={NavigableRoute.Animation_Along_Line} component={DriveTheLine} />
        <Stack.Screen name={NavigableRoute.Camera_Animation} component={CameraAnimation} />
        <Stack.Screen name={NavigableRoute.Globe_Projection} component={GlobeProjection} />
        <Stack.Screen name={NavigableRoute.Map_Handlers} component={MapHandlers} />
        <Stack.Screen name={NavigableRoute.Markers} component={Markers} />
        <Stack.Screen name={NavigableRoute.Terrain_Sky_Atmosphere} component={TerrainSkyAtmosphere} /> */}
        {/* <Stack.Screen name={NavigableRoute.Item} component={Item} /> */}
        {/* <Stack.Screen name={NavigableRoute.NoMap} component={ScreenWithoutMap} /> */}
        {/* <Stack.Screen name={NavigableRoute.AuthEntry} component={AuthEntry} options={ForcedFullScreenModalOptions} /> */}

        {/* <Stack.Screen name={NavigableRoute.Landing} component={LandingScreen} options={ForcedFullScreenModalOptions} /> */}

        <Stack.Screen name={NavigableRoute.ModalCard} component={StaticModalPopup} options={ModalDialogOverlayOptions} />
        <Stack.Screen
          name={NavigableRoute.PermissionsDialog}
          component={PermissionDialog}
          options={ModalDialogOverlayOptions}
        />

        <Stack.Screen
          name={NavigableRoute.AffirmRejectDialog}
          component={AffirmRejectDialogScreen}
          options={ModalDialogOverlayOptions}
        />

        <Stack.Screen name={NavigableRoute.ErrorDialog} component={ErrorDialogScreen} options={ModalDialogOverlayOptions} />
        <Stack.Screen
          name={NavigableRoute.PhotoGalleryModal}
          component={PhotoGalleryModal}
          options={FullScreenModalOptions}
        />
        {/* <Stack.Screen name={NavigableRoute.OptionsDialog2} options={ModalDialogOverlayOptions} component={OptionsDialog} /> */}
        <Stack.Screen name={NavigableRoute.OptionsDialog} options={ModalDialogOverlayOptions} component={OptionsDialog} />
        <Stack.Screen name={NavigableRoute.OptionsModal} options={ModalDialogOverlayOptions} component={OptionsModal} />
        <Stack.Screen
          name={NavigableRoute.DatePickerModal}
          options={ModalDialogOverlayOptions}
          component={DatePickerModal}
        />
        {/* <Stack.Screen name={NavigableRoute.ImageSelect} options={FullScreenModalOptions} component={ImageSelection} /> */}
        {/* <Stack.Screen name={NavigableRoute.CameraRoll} options={FullScreenModalOptions} component={Camera} /> */}
        {/* <Stack.Screen name={NavigableRoute.MediaPage} options={FullScreenModalOptions} component={MediaPage} /> */}
        {/* <Stack.Screen name={NavigableRoute.PhotoEdit} options={FullScreenModalOptions} component={PhotoEdit} />
        <Stack.Screen name={NavigableRoute.CoverPhotoEdit} options={FullScreenModalOptions} component={CoverPhotoEdit} /> */}
        {/* <Stack.Screen name={NavigableRoute.PhotoPreview} options={FullScreenModalOptions} component={PhotoPreview} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
