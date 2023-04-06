import { SUCCESS_CODE } from '@sample/core-server-ts/constants'

export default (pubsub: any) => ({
  Query: {
    sendNotification: async (_: any, args: any, { PushNotifications }: any): Promise<Object> => {
      const res = await PushNotifications.sendToDevice(args.deviceToken, args.payload, {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: 'high',
      })
      return { response: res }
    },
  },
  Mutation: {
    createEmailCollection: async (_: any, args: any, { dataSources }: any) => {
      try {
        const result = await dataSources.firestore.createEmailCollection(args)
        return { code: SUCCESS_CODE, success: true, message: result }
      } catch (error: any) {
      
        return {
          code: '404',
          success: false,
          message: 'HOUSTON WE HAVE A PROBLEM',
          errors: [{ field: 'createEmailCollection USER', message: JSON.stringify(error) }],
        }
      }
    },

    sendEmail: async (_: any, args: any, { auth, dataSources }: any): Promise<string | unknown> => {
      try {
        await dataSources.firestore.sendEmail({
          name: 'welcome',
          email: ['jim@ridewithsample.com, ak@ridewithsample.com'],
          template: {
            data: {
              name: "bob",

            },
            name: 'welcome'
          }

        })

        return { success: true }
      } catch (error: any) {
        console.log('errors', error)

        return error
      }
    },
  },
  Subscription: {},
})
