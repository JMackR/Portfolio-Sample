const resolvers = {
  Query: {
    stripeGetPaymentMethod: async (_, { paymentIntentId }, { dataSources }) => {
      try {
        const response = await dataSources.StripeAPI.getPaymentMethod(paymentIntentId)
        return response
      } catch (error) {
        console.log('errors', error)

        return error
      }
    },
  },
  Mutation: {
    stripeCreatePaymentIntent: async (_, args, { dataSources }) => {
      try {
        const response = await dataSources.StripeAPI.createPaymentIntent(args)
        return {
          clientSecret: response.clientSecret,
          paymentIntentId: response.paymentIntentId,
          stripeCustomerID: response.customer,
          success: true,
          message: 'Success',
          code: 200,
        }
      } catch (error) {
        console.log('errors', error)
        return error
      }
    },
    stripeAutoPay: async (_, args, { dataSources }) => {
      try {
        const response = await dataSources.StripeAPI.processAutoPayment(args)
        return {
          success: true,
          message: 'Success',
          code: 200,
        }
      } catch (error) {
        console.log('errors', error)

        return error
      }
    },
  },
}
module.exports = resolvers
