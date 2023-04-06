import React, { useEffect } from 'react'
import { LogBox, Platform, View, Text, Alert } from 'react-native'
import { Navigator } from '@sample/navigation-client/navigator/navigator'
import { AppProvider } from '@sample/providers/app-provider'
import { StorageController } from '@sample/utilities/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import iid from '@react-native-firebase/installations'
import remoteConfig from '@react-native-firebase/remote-config'
import Shake from '@shakebugs/react-native-shake'
import Config from 'react-native-config'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Orientation from 'react-native-orientation-locker'
import { SafeAreaProvider } from 'react-native-safe-area-context/src/SafeAreaContext'

async function getInstanceId() {
  const id = await iid().getToken()
 
}

const apiUrl = process.env.NODE_ENV === 'production' ? qaURL : 'http://localhost:4000/graphql'

const translations = {
  en: () => require('../shared-libs/translations/en.json'),
  es: () => require('../shared-libs/translations/es.json'),
}

export const App = () => {
  getInstanceId()

  useEffect(() => {


    remoteConfig()
      .setDefaults({
        home_screen_layout: 'alpha',
        translations: require('../shared-libs/translations/en.json'),
        home_screen_config: 'default',
        my_button: 'nobody',
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetchedRemotely) => {
        remoteConfig().fetch(5)
        if (fetchedRemotely) {
          console.log('Configs were retrieved from the backend and activated.')
        } else {
          console.log('No configs were fetched from the backend, and the local configs were already activated')
        }
      })
  }, [])


  useEffect(() => {
    Orientation.lockToPortrait()
  }, [])

  LogBox.ignoreAllLogs()

  return (
    <>
      <SafeAreaProvider>
        <AppProvider
          translations={translations}
          apolloOptions={{
            apiUrl,
            storage: AsyncStorage,
            controller: StorageController,
            isMobile: true,
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Navigator />
          </GestureHandlerRootView>
        </AppProvider>
      </SafeAreaProvider>
    </>
  )
}
