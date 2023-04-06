import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { currentUserInfo } from '@sample/network'
import notifee, { AndroidImportance, IOSAuthorizationStatus, AndroidVisibility, AndroidColor } from '@notifee/react-native'
import messaging from '@react-native-firebase/messaging'

export const useCoreNotifConfig = () => {
  const checkPermission = async () => {
    await notifee.requestPermission()
  }
  // console.log('ANDROID COLOR', AndroidColor)
  const setChannels = async () => {
    // // Create a channel (required for Android)
    if (Platform.OS === 'android') {
      const speedId = await notifee.createChannel({
        id: 'speeding',
        name: 'Driving Too Fast Channel',
        sound: 'siren',
        vibration: true,
        vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        lights: true,
        lightColor: AndroidColor.RED,
      })
      const paybillId = await notifee.createChannel({
        id: 'paybill',
        name: 'Payment Due Channel',
        sound: 'honk',
        // vibration: true,
        // vibrationPattern: [300, 500],
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        lights: true,
        lightColor: AndroidColor.WHITE,
      })
    } else {
      await notifee.setNotificationCategories([
        {
          id: 'paybill',
          actions: [
            {
              id: 'contact',
              title: 'YES',
              foreground: true,
              input: {
                placeholderText: 'Tell me how you feel, like i really care. just kidding',
                buttonText: 'Ping me',
              },
            },
            {
              id: 'dismiss',
              title: `Hell No...`,
              foreground: true,
            },
          ],
        },
        {
          id: 'speeding',
          actions: [
            {
              id: 'like',
              title: 'Pullover and get a ticket?',
              foreground: true,
            },
            {
              id: 'dislike',
              title: 'Outrun the cop!',
              foreground: true,
            },
            {
              id: 'send-help',
              title: 'SEND TEXT FOR BAIL MONEY',
              foreground: true,
            },
          ],
        },
      ])
    }

    return null
  }
  // if (settings.authorizationStatus === IOSAuthorizationStatus.DENIED) {
  // 	console.log('User denied permissions request')
  // } else if (settings.authorizationStatus === IOSAuthorizationStatus.AUTHORIZED) {
  // 	console.log('User granted permissions request')
  // } else if (settings.authorizationStatus === IOSAuthorizationStatus.PROVISIONAL) {
  // 	console.log('User provisionally granted permissions request')
  // }
  // const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled()
  // console.log('what is the power setting ', batteryOptimizationEnabled)
  // if (batteryOptimizationEnabled) {
  // 2. ask your users to disable the feature
  // Alert.alert(
  //   'Restrictions Detected',
  //   'To ensure notifications are delivered, please disable battery optimization for the app.',
  //   [
  //     // 3. launch intent to navigate the user to the appropriate screen
  //     {
  //       text: 'OK, open settings',
  //       onPress: async () => await notifee.openBatteryOptimizationSettings(),
  //     },
  //     {
  //       text: 'Cancel',
  //       onPress: () => console.log('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //   ],
  //   { cancelable: false },
  // )
  // }

  // messaging().onTokenRefresh((refreshToken) => {})

  return { setChannels, checkPermission }
}
