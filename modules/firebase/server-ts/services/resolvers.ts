import { SUCCESS_CODE } from '@sample/core-server-ts/constants'
import { AuthServiceShape } from './auth-services'
import withAuth from 'graphql-auth'
import { Payload } from '@sample/comms-server-ts/notification-payload'
import * as crypto from 'crypto'
import fs from 'fs'
// import crypto from 'crypto'

export default () => ({
  Mutation: {
    setCustomClaims: async (
      _: any,
      { uid, properties }: { uid: string; properties: any },
      { FirebaseAuth }: any
    ): Promise<Object> => {
      try {
        const { role, policyID } = properties
        console.log('SET CUSTOM CLAIM')

        await FirebaseAuth.messaging.setClaimsOnToken(uid, {
          role: role,
          policyID: policyID,
        })
        console.log('CUSTOM CLAIM SUCESS')

        return {
          code: SUCCESS_CODE,
          success: true,
          message: 'BOB WAS HERE',
        }
      } catch (error: any) {
        console.log('ERROR WITH CLAIMS OR TOKEN::?', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'setCustomClaims', message: JSON.stringify(error) }],
        }
      }
    },
    createWannabe: async (_: any, { input }: any, { dataSources }: any) => {
      try {
        let userData = { ...input }

        if (input.email) {
          userData.email = userData.email.toLowerCase()
        }

        const nowString = new Date().toISOString()
        userData.createdOn = nowString
        userData.updatedOn = nowString

        const wannabeId = await dataSources.firestore.create({ obj: userData, path: 'wannabe-sampleers' })

        return { data: wannabeId, code: SUCCESS_CODE, success: true, message: 'wannabeId successfully added' }
      } catch (error: any) {
        console.log('ERROR createWannabe', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'createWannabe', message: JSON.stringify(error) }],
        }
      }
    },
    updateUserInfo: async (_: any, { docID, userInput }: any, { dataSources }: any) => {
      try {
        let userData = { ...userInput }

        if (userInput?.email) {
          userData.email = userData?.email.toLowerCase()
        }

        // If we have drivers
        if (userData?.drivers?.length > 1) {
          // If some of those drivers do not have encrypted license numbers
          if (!userData?.drivers?.every((driver: any) => !!driver.encryptedLicenseNumber)) {
            // Then sample through the drivers and give them encrypted license numbers and mask the
            // real license number before saving
            userData?.drivers?.forEach(async (driver: any) => {
              if (!driver.encryptedLicenseNumber && !!driver.driverLicenseNumber) {
                driver.encryptedLicenseNumber = await encryptText(driver.driverLicenseNumber)

                const maskedValue = driver.driverLicenseNumber.slice(0, driver.driverLicenseNumber.length - 2)
                const endValue = driver.driverLicenseNumber.slice(driver.driverLicenseNumber.length - 2)
                driver.driverLicenseNumber = `${maskedValue.replace(/[a-z\d]/gi, '#')}${endValue}`
              }
            })
          }
        }

        userData.updatedOn = new Date().toISOString()
        console.log('update user info resolver docID', docID)
        const result = await dataSources.firestore.update({ ...userData, path: 'wannabe-sampleers' }, docID)
        return { code: SUCCESS_CODE, success: true, message: result }
      } catch (error: any) {
        console.log('ERROR WITH updateUserInfo::?', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'updateUserInfo', message: JSON.stringify(error) }],
        }
      }
    },
    sendSMS: async (_: any, { input }: any, { dataSources }: any) => {
      try {
        await dataSources.firestore.sendSMS(input)
        return { code: SUCCESS_CODE, success: true, message: 'SMS successfully sent' }
      } catch (error: any) {
        console.log('SMS ERROR', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'SMS USER', message: JSON.stringify(error) }],
        }
      }
    },
  },
  Query: {
    verifyPhoneNumber: async (_: any, { phoneNumber }: { phoneNumber: string }, { FirebaseAuth }: any): Promise<Object> => {
      try {
        // console.log('verifyPhoneNumber INPUT:::;', phoneNumber)

        const result = await FirebaseAuth.messaging.getUserByPhoneNumber(phoneNumber)
        console.log('verifyPhone number custom claims result', result?.customClaims)

        if (result?.customClaims?.policyID) {
          return {
            success: true,
            policyID: result?.customClaims?.policyID,
          }
        } else {
          return {
            success: false,
            policyID: null,
          }
        }
      } catch (error: any) {
        console.log('ERROR WITH verifyPhoneNumber', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'setCustomClaims', message: JSON.stringify(error) }],
        }
      }
    },
    verifyDriversLicense: async (
      _: any,
      { driverLicense, policyID, phoneNumber }: { driverLicense: string; policyID: string; phoneNumber: string },
      { FirebaseAuth, dataSources }: any
    ): Promise<Object> => {
      try {
        console.log('verifyDriversLicense resolver input', driverLicense, policyID, phoneNumber)

        const {
          data: { policyholder },
        } = await dataSources.pasAPI.getPolicy({
          args: { policyID: policyID },
        })

        const decryptedDriversLicenseNumber = (await decryptText(driverLicense)) || ''

        const insuredUser = await policyholder.policy.drivers.find(async (driver: any, idx: any) => {
          const result = await decryptText(driver.encryptedLicenseNumber)
          if (result) {
            if (result.toString() === decryptedDriversLicenseNumber.toString()) {
              return driver
            }
          }
        })

        const filteredDrivers = policyholder.policy.drivers.filter((driver: any) => driver.isExcluded === false)

        const convertedDriverArray = await Promise.all(
          filteredDrivers.map(async (driver: any, idx: any) => {
            const result = await decryptText(driver.encryptedLicenseNumber)
            // console.log('filteredDrivers RESULT', result)

            return {
              ...driver,
              decryptedLicenseNumber: result,
            }
          })
        )
        // console.log(" driverLicense, policyID, phoneNumber", driverLicense, policyID, phoneNumber);
        // console.log("convertedDriverArray", convertedDriverArray);

        const foundDriver = convertedDriverArray.filter(
          (driver: any) => driver.decryptedLicenseNumber?.toString() === decryptedDriversLicenseNumber?.toString()
        )[0]

        if (foundDriver) {
          /**
           * Check if user exists on firebase
           *
           */
          const userExistsInFirebase = await FirebaseAuth.messaging.getUserByPhoneNumber(phoneNumber)
          console.log('userExistsInFirebase:::', userExistsInFirebase)

          if (!userExistsInFirebase) {
            /**
             * Create user in Firebase not authenticated
             */

            const additionalDriverRecord = await FirebaseAuth.messaging
              .createUser({
                phoneNumber: phoneNumber,
              })
              .then((userRecord: any) => {
                console.log('Created userRecord:::: ', userRecord)
                console.log('INSURED USER TO SET CLAIMS ON', insuredUser)

                /**
                 * Set customer claims for additional driver
                 */
                FirebaseAuth.messaging.setClaimsOnToken(userRecord.uid, {
                  policyID: policyID,
                  role: 'additional_user',
                  firstName: foundDriver.firstName,
                  lastName: foundDriver.lastName,
                  suffix: foundDriver.suffix,
                  dateOfBirth: foundDriver.dateOfBirth,
                  email: foundDriver.email,
                  cell: foundDriver.cell,
                  driversLicense: foundDriver.encryptedLicenseNumber,
                })
                return userRecord
              })
              .catch((error: any) => {
                console.log('Error creating new user:', error)
              })
            // console.log('additionalDriverRecord', additionalDriverRecord)

            return {
              uid: additionalDriverRecord.uid,
              success: true,
              message: 'User Created',
            }
          }
          // console.log('I ALREADY EXIST')

          return {
            success: false,
            message: 'Why are you going through additional driver flow again',
          }
        } else {
          /**
           * User doesn't exist on the policy
           */
          console.log('SHIT OUTTA LUCK')

          return {
            success: false,
            message: 'Shit outta luck bub!',
          }
        }
      } catch (error: any) {
        console.log('ERROR verifyDriversLicense', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'verifyDriversLicense', message: JSON.stringify(error) }],
        }
      }
    },
    getUserByField: async (_: any, input: any, { dataSources }: any) => {
      try {
        // console.log('getUserByField INPUT:::', input)

        const result = await dataSources.firestore.getByField({ ...input, path: 'wannabe-sampleers' })
        // console.log('getUserByField RESULT', result)

        if (result) {
          return {
            code: SUCCESS_CODE,
            success: true,
            message: 'HI BOB!',
            ...result,
          }
        } else {
          return {
            code: SUCCESS_CODE,
            success: false,
            message: 'No user was found',
            userData: 'user not found',
          }
        }
      } catch (error: any) {
        console.log('ERROR WITH CLAIMS OR TOKEN::?', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'getUserByField', message: JSON.stringify(error) }],
        }
      }
    },
    getUserByDocId: async (_: any, { docID }: any, { dataSources }: any) => {
      try {
        const result = await dataSources.firestore.getUserByDocId(docID, 'wannabe-sampleers')

        if (result) {
          return {
            ...result,
            code: '200',
            success: true,
            message: 'HI BOB!',
          }
        } else {
          return {
            message: 'No user was found',
          }
        }
      } catch (error: any) {
        console.log('ERROR WITH CLAIMS OR TOKEN::?', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'getUserByDocId', message: JSON.stringify(error) }],
        }
      }
    },
    getEasterEggs: async (
      _: any,
      { type, token, name }: { type: string; token: string; name: string },
      { PushNotifications }: any
    ) => {
      try {
        console.log('FIREING THE EGG')

        sendNotification(type, token, name, PushNotifications)

        return {
          code: '200',
          success: true,
          message: 'HI BOB!',
        }
      } catch (error: any) {
        console.log('ERROR WITH getEasterEggs::?', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
        }
      }
    },
  },
})

async function sendNotification(type: string, token: string, name: string, PushNotifications: any) {
  const NotificationParam = { notificationType: type, user: { name } }

  const payload = Payload(NotificationParam)
  // console.log('NotificationParam', token, payload)
  const registrationTokens = [
    'fXiJKdguzk3Uh6fldsueaO:APA91bEPKrpXc5Kau8w-Omgf6eHEcUiI6cDJ_mzVBmXTpENJHyfic1w7Rn2f1NsY99y9HQtOauPrjCqcj9qopsfU-QeR3c29t1Be3Qy-X8C0kSoxFDp06rHGybV30ZDzLa02hX2BF_kM',
    token,
  ]
  console.log('SEND TO ', token)

  const res = await PushNotifications.messaging.sendMulticast({
    data: payload.data,
    tokens: [token],
    // Required for background/quit data-only messages on iOS
    contentAvailable: true,
    // Required for background/quit data-only messages on Android
    priority: 'high',
  })

  // PushNotifications.messaging.sendToDevice(token, payload)
}

export const decryptText = async (encryptedText: string) => {
  const privatePem = process?.env?.PAS_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (privatePem) {
    const privateKey = crypto.createPrivateKey({
      key: privatePem,
    })

    const rsaPrivateKey = {
      key: privateKey,
      // passphrase: '',
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    }
    // console.log('rsaPrivateKey pem', rsaPrivateKey)
    const decryptedMessage = await crypto.privateDecrypt(rsaPrivateKey, Buffer.from(encryptedText, 'base64'))
    // console.log('decryptedMessage', decryptedMessage.toString('utf8'))

    return decryptedMessage.toString('utf8')
  }
}

const pasKey = `
-----BEGIN PUBLIC KEY-----
${process.env.PAS_PUBLIC_KEY}
-----END PUBLIC KEY-----
`

export const encryptText = async (plainText: string) => {
  const buffer = crypto.publicEncrypt(
    {
      key: pasKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    } as any,
    // We convert the data string to a buffer
    Buffer.from(plainText)
  )

  return buffer.toString('base64')
}
