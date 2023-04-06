import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import localPnBuilder from '../builders/LocalPNBuilder'

export default function useForgroundMessage({ navigation }) {
  useEffect(() => {
    async function onMessageReceived(message) {
      console.log('MESSAGE FOREGROUND', message)
      // localPnBuilder.createAndDisplayNotification(message)
    }
    // if (navigation) {
    // return messaging().onMessage(onMessageReceived)
    // }
  }, [])
}
