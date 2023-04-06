import React, { useContext, useEffect } from 'react'
import { Platform } from 'react-native'
import notifee from '@notifee/react-native'
// import messaging from '@react-native-firebase/messaging'
import { firebase } from '@react-native-firebase/dynamic-links'

const IOS = Platform.OS === 'ios'

export const useNotifEventListener = ({ navigation }) => {
  useEffect(() => {
    // console.log('DYNAMIC LINK FIRE')
    const getAppLaunchLink = async () => {
      try {
        const { url } = await firebase.dynamicLinks().getInitialLink()
        // handle your link here
        // console.log('DYNAMIC LINK', url)
      } catch {
        // handle errors
      }
    }
  }, [])

  useEffect(() => {
    // if (navigation) {
    notifee.stopForegroundService()

    // notifee.registerForegroundService((notification) => {
    //   // return new Promise(() => {
    //   console.log('FOREGROUND SERVICE', notification)

    //   // })
    // })

    return notifee.onForegroundEvent((event) => {
      // console.log('onForegroundEvent', event)
      if (event.type === 1) {
        // const {
        //   // notification: { data },
        // } = event.detail
        // const { route } = data
        // navigation.navigate(route, { ...data })
      }
    })
    // }
  }, [])

  useEffect(() => {
    // if (navigation) {
    // console.log('FIRE BACKGROUND')
    notifee.onBackgroundEvent(async (event) => {
      console.log('EVENT', event)
      // if (event.type === 1) {
      //   // const {
      //   //   notification: { data },
      //   // } = event.detail
      //   // const { route } = data
      //   // navigation.navigate(route, { ...data })
      // }
    })
    // }
  }, [])

  useEffect(() => {
    if (IOS && navigation) {
      // return messaging().onNotificationOpenedApp(async (remoteMessage) => {
      //   const {
      //     notification: { data },
      //   } = remoteMessage
      //   const { route } = data
      //   navigation.navigate(route, { ...data })
      // })
    }
  }, [navigation])
}
