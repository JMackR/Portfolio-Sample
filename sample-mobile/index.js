/**
 * @format
 */
// import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import { App } from './App'
import { name as appName } from './app.json'
// import './ignore-warnings'
import notifee, { EventType } from '@notifee/react-native';
import localPnBuilder from '@sample/comms-client/builders/LocalPNBuilder'
import 'react-native-get-random-values'

async function onMessageReceived(message) {
  // Do something
  console.log("onMessageReceived", message)
  localPnBuilder.createAndDisplayNotification(message)
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
// async function onMessageReceived(message: any) {
//   localPnBuilder.createAndDisplayNotification(message)
// }
// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail;
// console.log('onBackgroundEvent', detail, type)
//   // Check if the user pressed the "Mark as read" action
//   if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
//     // Update external API
//     // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
//     //   method: 'POST',
//     // });

//     // Remove the notification
//    // await notifee.cancelNotification(notification.id);
//   }
// });

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   // onMessageReceived(remoteMessage)
// })

function HeadlessCheck({ isHeadless }: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  return App
}

AppRegistry.registerComponent(appName, () => App)
