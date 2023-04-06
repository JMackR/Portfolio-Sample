import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import notifee from '@notifee/react-native'
// import messaging from '@react-native-firebase/messaging'

const IOS = Platform.OS === 'ios'

export default function useInitialNotification({ navigation }) {
  useEffect(() => {
    const initialPnNav = (nav, payload) => {}

    const checkPnInitialLocal = async (nav) => {
      const initialLocal = await notifee.getInitialNotification()
      if (initialLocal) {
        initialPnNav(nav, initialLocal)
      }
    }
    const checkPnInitialRemote = () => {
      // return messaging().getInitialNotification()
    }
    const handlePnInitialIOS = async (nav) => {
      const initialRemote = await checkPnInitialRemote()
      if (initialRemote) {
        initialPnNav(nav, initialRemote)
      } else {
        checkPnInitialLocal(nav)
      }
    }

    if (navigation) {
      if (IOS) {
        handlePnInitialIOS(navigation)
      } else {
        checkPnInitialLocal(navigation)
      }
    }
  }, [navigation])
}
