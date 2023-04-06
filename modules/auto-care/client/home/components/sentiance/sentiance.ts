import React, { useEffect } from 'react'
import { Alert, AppState, Platform } from 'react-native'
import { useQuery, useLazyQuery } from '@apollo/client'
import { NavigableRoute } from '@sample/navigation-client/routes'
import Crash from '@sentiance-react-native/crash-detection'
import SentianceCore, { UserLinkingResult } from '@sentiance-react-native/core'
import { Navigation } from '@sample/navigation-client/navigation'
import { PERSISTED_CURRENT_USER, GET_SENTIENCE_AUTH } from '../../../server-state/user-graphql'
import { useLinkUser } from '../../../server-state/hooks/hook-factory'

export const Sentiance = (claims: any) => {
  const {
    data: { currentUserInfo },
  } = useQuery(PERSISTED_CURRENT_USER)

  const { linkUser, loading: linkerLoading } = useLinkUser()
  const [fetchSentianceAuth, { data: teleAuth, loading, error }] = useLazyQuery(GET_SENTIENCE_AUTH, {
    fetchPolicy: 'network-only',
  })

  const { phone_number, policyID } = claims
  useEffect(() => {
    if (currentUserInfo?.user?.id) {
      fetchSentianceAuth({
        variables: {
          external_id: `${policyID}-${phone_number}`,
        },
      })
    }
  }, [currentUserInfo])

  Crash.addVehicleCrashEventListener((crashEvent) => {
    const time = crashEvent.time
    const location = crashEvent.location
    const magnitude = crashEvent.magnitude
    const speedAtImpact = crashEvent.speedAtImpact
    const deltaV = crashEvent.deltaV
    const confidence = crashEvent.confidence
    const { latitude, longitude } = location

    Navigation.navigateToRoute(NavigableRoute.AffirmRejectDialog, {
      onAffirm: async () => {
        Navigation.goBack()
      },
      affirmText: 'DONE',
      icon: PermissionsLocationIcon,
      title: 'YOU CRASHED!',
      body: `
      TIME: 
      ${new Date(time).toUTCString()}\n
      LATITUDE: ${latitude}\n
      LONGITUDE: ${longitude}\n
      MAGNITUDE: ${magnitude}\n
      SPEED AT IMPACT: ${speedAtImpact}\n
      DELTA V: ${deltaV}\n
      CONFIDENCE: ${confidence}\n
      `,
    })
  })

  const handleCreateUser = async () => {
    try {
      // const authCodeResponse = await requestAuthCode()
      // const { auth_code: authCode } = authCodeResponse.data
      let createUserResult
      // console.log('teleAuth', teleAuth)

      const { auth_code, app_id, appSecret, platform_url } = teleAuth.getSentienceAuth
      if (auth_code) {
       

        createUserResult = await SentianceCore.createUser({
          authCode: auth_code,
        })
      }
      if (createUserResult) {
        try {
          const result = await SentianceCore.enableDetections()
          await SentianceCore.updateSdkNotification(
            'Sampleer Reminder',
            `Thank you for enabling Sample to monitor your GOOD Driving habits`
          )
          await SentianceCore.disableBatteryOptimization()
          await SentianceCore.setAppSessionDataCollectionEnabled(true)
          const metadata = {
            corrolation_id: currentUserInfo?.user?.id,
            first_name: currentUserInfo.firstName,
            last_name: currentUserInfo.last_name,
          }
          await SentianceCore.addUserMetadataFields(metadata)
   
        } catch (err) {
          console.log('Detections error ', err.code)
        }
      }

      // console.log('Created a new user with the following ID: ', result.userInfo.userId)
    } catch (err) {
      console.log('error:' + err.code + ' ' + 'message: ' + err.message)

      Alert.alert(`Error: ${err}`)
    }
  }
  const checkSentiance = async () => {
    try {
      const isUserLinked = await SentianceCore.isUserLinked()
      const userId = await SentianceCore.getUserId()
    } catch (error) {
      console.log('SENTIANCE ERROR', error)
    }
  }

  useEffect(() => {
    checkSentiance()

    if (teleAuth) {
      try {
        SentianceCore.userExists().then(async (userExists: any) => {
          // console.log('SentianceCore.userExists', userExists)
          if (userExists) {
            const result = await SentianceCore.enableDetections()
            // console.log('RESU:T', result)

            await SentianceCore.updateSdkNotification(
              'Sampleer Reminder',
              `Thank you for enabling Sample to monitor your GOOD Driving habits`
            )
            if (Platform.OS === 'android') {
              await SentianceCore.disableBatteryOptimization()
            }
            await SentianceCore.setAppSessionDataCollectionEnabled(true)
            const metadata = {
              corrolation_id: currentUserInfo?.user?.id,
              first_name: currentUserInfo.firstName,
              last_name: currentUserInfo.lastName,
            }
            await SentianceCore.addUserMetadataFields(metadata)
            // console.log('Detections are now ' + result.detectionStatus)
            //   SentianceCore.setDidReceiveSdkStatusUpdateHandler { status in
            //     // Check the location permission and precision here.
            // }
            await SentianceCore.addSdkStatusUpdateListener((sdkStatus) => {
              // console.log('SentianceCore UPDATE STATUS', sdkStatus)
              // New vehicle crash event
            })
          }
          if (!userExists) {
            handleCreateUser()
          }
        })
      } catch (error) {
        console.log('SENTIANCE CREATE USER ERROR', error)
      }
    }
  }, [teleAuth])

  return null
}
