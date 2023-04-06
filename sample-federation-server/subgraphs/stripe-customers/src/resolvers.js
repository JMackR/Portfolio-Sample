const parsePaymentIntentResult = (results) => {
  let parsedResult
  results.map((result) => {
    const { payment_method_details, receipt_number, created, description } = result
    const { card, last4 } = payment_method_details
    const { brand } = card
    const updatedResult = {
      last4,
      brand,
      confirmationNumber: receipt_number,
      created,
      description,
    }
    parsedResult = [...parsedResult, updatedResult]
  })
  return parsedResult
}

const resolvers = {
  Query: {
    searchCustomerByEmail: async (_parent, { email }, { dataSources }) => {
      const result = await dataSources.StripeAPI.searchCustomerByEmail({ email })
      return { code: 200, success: true, message: 'success', data: result }
    },
    getCustomerPaymentMethods: async (_parent, { customerID }, { dataSources }) => {
      const result = await dataSources.StripeAPI.getCustomerPaymentMethods(customerID)
      return { code: 200, success: true, message: 'success', ...result }
    },
    getCustomerPaymentHistory: async (_parent, { customerID }, { dataSources }) => {
      const result = await dataSources.StripeAPI.getCustomerPaymentHistory(customerID)
      return { code: 200, success: true, message: 'success', paymentHistory: parsePaymentIntentResult(result) }
    },
  },

  Mutation: {
    createCustomer: async (_parent, { createInput }, { dataSources }) => {
      const result = await dataSources.StripeAPI.createCustomer(createInput)
      return { code: 200, success: true, message: 'success', ...result }
    },
    setDefaultPaymentMethod: async (_parent, { setDefaultInput }, { dataSources }) => {
      const result = await dataSources.StripeAPI.setDefaultPaymentMethod(setDefaultInput)
      return { success: true }
    },
    updateCustomer: async (_parent, { input }, { dataSources }) => {
      const result = await dataSources.StripeAPI.updateCustomer(input)
      return { code: 200, success: true, message: 'success', ...result }
    },
  },
}

module.exports = resolvers
