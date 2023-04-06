import { SUCCESS_CODE } from '@sample/core-server-ts/constants'

export default (pubsub: any) => ({
  Query: {},
  Mutation: {
    createCustomAgentToken: async (
      _: any,
      { phoneNumber }: { phoneNumber: string },
      {
        FirebaseAuth,
        PushNotifications,
        dataSources,
        ...rest
      }: { FirebaseAuth: any; PushNotifications: any; dataSources: any; authService: any }
    ): Promise<Object> => {
      try {
        const customToken = await FirebaseAuth.messaging.createCustomToken(phoneNumber)

        return { token: customToken, code: SUCCESS_CODE, success: true, message: 'good' }
      } catch (error: any) {
        console.log('custom token create ERROR', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'custom token USER', message: JSON.stringify(error) }],
        }
      }
    },
    createCustomToken: async (
      _: any,
      {
        uuid,
        phoneNumber,
        driversLicense,
        policyID,
      }: { uuid: string; driversLicense: string; phoneNumber: string; policyID: string },
      {
        FirebaseAuth,
        PushNotifications,
        dataSources,
        ...rest
      }: { FirebaseAuth: any; PushNotifications: any; dataSources: any; authService: any }
    ): Promise<Object> => {
      try {
       

        const customToken = await FirebaseAuth.messaging.createCustomToken(uuid)

        sendTokenToUser({ phoneNumber: phoneNumber, authToken: customToken, policyID: policyID }, dataSources)
        // sendNotification({ type: 'winner' }, PushNotifications)
        return { code: SUCCESS_CODE, success: true, message: 'good' }
      } catch (error: any) {
        console.log('custom token create ERROR', error)
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'custom token USER', message: JSON.stringify(error) }],
        }
      }
    },
  },
  Subscription: {},
})
async function sendTokenToUser(data: any, dataSources: any) {
  try {
    console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT)

    let suffix
    let domainUriPrefix
    switch (process.env.ENVIRONMENT) {
      case 'QA':
        suffix = '.qa'
        domainUriPrefix = 'https://get.ridewithsample.com'
        break
      case 'UAT':
        suffix = '.uat'
        domainUriPrefix = 'https://ridewithsample.page.link'
        break
      case 'PROD':
        suffix = ''
        domainUriPrefix = 'https://ridewithsample.com'
      default:
        suffix = ''
        domainUriPrefix = 'https://get.ridewithsample.com'
        break
    }
    const { shortLink, previewLink } = await dataSources.dynamicLink.createLink({
      dynamicLinkInfo: {
        domainUriPrefix: `${domainUriPrefix}`,
        link: `${domainUriPrefix}/auth-loading/${data.authToken}/${data.policyID}/${data.phoneNumber}`,
        androidInfo: {
          androidPackageName: `com.ride.sample${suffix}`,
        },
        iosInfo: {
          iosBundleId: `com.ride.sample`,
        },
      },
    })
    console.log('sendTokenToUser preview link', shortLink)
    await dataSources.firestore.sendSMS({
      phoneNumber: data.phoneNumber,
      message: `Your mission if you choose to accept it, is to Save money on your insurance by installing the LOOP Mobile App!\n${shortLink}`,
    })
  } catch (error) {
    console.log('ERROR WITH TOKEN::?', error)
  }
}
