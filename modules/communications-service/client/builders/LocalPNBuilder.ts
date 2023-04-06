import { Platform } from 'react-native'
import { StorageController } from '@sample/utilities/storage'
import type { NotificationAndroid, Notification, NotificationIOS } from '@notifee/react-native'
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native'
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

abstract class LocalNotifBuilder {
  defaultPlatformConfig?: NotificationAndroid | NotificationIOS

  defaultAndroidConfig?: NotificationAndroid

  defaultIOSConfig?: NotificationIOS
  public abstract createAndDisplayNotification(remoteMsg: FirebaseMessagingTypes.RemoteMessage): Promise<string>
}

class PlatformLocalNotifBuilder extends LocalNotifBuilder {
  defaultPlatformConfig: NotificationAndroid | NotificationIOS

  defaultAndroidConfig: NotificationAndroid = {
    sound: 'winner',
    channelId: 'default',
    importance: AndroidImportance.HIGH,
    pressAction: {
      id: 'default',
      launchActivity: 'default',
    },
  }

  defaultIOSConfig: NotificationIOS = {
    // importance: AndroidImportance.HIGH,
    sound: 'notification.wav',
  }

  constructor() {
    super()
    this.defaultPlatformConfig = Platform.OS === 'ios' ? this.defaultIOSConfig : this.defaultAndroidConfig
  }

  public async createAndDisplayNotification(remoteMsg: FirebaseMessagingTypes.RemoteMessage): Promise<string> {
    const platform = Platform.OS === 'ios' ? 'ios' : 'android'

    console.log('remoteMsg.data.notifee', remoteMsg.data.notifee)

    return notifee.displayNotification(JSON.parse(remoteMsg.data.notifee))
  }
}

export default new PlatformLocalNotifBuilder()
