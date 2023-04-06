const { DataSource } = require('apollo-datasource')
const stripe = require('stripe')

const parseAmount = (amount) => {
  if (typeof amount !== 'string' && typeof amount !== 'number') {
    throw new Error('Amount passed must be of type String or Number.')
  }

  return Math.round(100 * parseFloat(typeof amount === 'string' ? amount.replace(/[$,]/g, '') : amount))
}

class StripeAPI extends DataSource {
  constructor() {
    super()
    this.paramsObj = {}
    this.key = ''
  }

  willSendRequest(request) {
    request.headers.set('x-api-key', this.key)
  }

  async createPaymentIntent({ input }) {
    const response = await stripe.paymentIntents.create({
      customer: input.customer,
      amount: input.amount,
      confirmation_method: 'automatic',
      currency: 'usd',
      setup_future_usage: 'off_session',
      metadata: {
        policy_locator: input.policy_locator,
        invoice_locator: input.invoice_locator,
        process_source: input.process_source,
      },
    })
    return {
      clientSecret: response.client_secret,
      paymentIntentId: response.id,
      customer: response.customer,
    }
  }

  async getCustomerPaymentMethods(args) {
    try {
      const result = await stripe.customers.listPaymentMethods(args, { type: 'card' })
      const customer = await stripe.customers.retrieve(args)

      const defaultID = customer.invoice_settings.default_payment_method

      const defaultIndex = result?.data?.findIndex((element) => element.id === defaultID)
      let default_payment_method
      if (defaultIndex > -1) {
        default_payment_method = defaultID
      } else {
        default_payment_method = result.data[0].id
      }

      const results = result.data
      return { paymentMethods: results, default_payment_method }
    } catch (err) {
      console.log('getCustomerPaymentMethods Error', err)
    }
  }
  async searchCustomerByEmail({ email }) {
    try {
      const customer = await stripe.customers.search({
        query: `email: "${email}"`,
        limit: 1,
      })

      if (customer.data) {
        // const methods = await this.getCustomerPaymentMethods(customer.data[0].id)
        /**
         * REMOVE ALL OF THIS AND USE CUSTOMER OBJECT DEFAULT_PAYMENT_METHOD
         * AFTER IMPLEMENTING UPDATING THE CUSTOMER IN QUOTE FLOW
         */

        const default_payment_method = customer?.data[0]?.invoice_settings?.default_payment_method
        // ? customer.data[0].invoice_settings?.default_payment_method
        // : methods[0].invoice_settings.payment_method

        return { ...customer.data[0], default_payment_method }
      }
    } catch (error) {
      console.log('Stripe Customer Search Error', error)
    }
  }

  async processAutoPayment({ input }) {
    try {
      const customer = await this.searchCustomerByEmail({ email: input.email })

      if (customer?.default_payment_method) {
        const response = await stripe.paymentIntents.create({
          customer: customer.id,
          amount: input.amount,
          payment_method: customer.default_payment_method,
          confirmation_method: 'automatic',
          currency: 'usd',
          setup_future_usage: 'off_session',
          metadata: {
            policy_locator: input.policy_locator,
            invoice_locator: input.invoice_locator,
            process_source: input.process_source,
          },
        })
        const paymentIntent = await stripe.paymentIntents.confirm(response.id)
        return true
      } else {
        console.log("payment failed", input);
        return false
      }
    } catch (error) {
      console.log("autpay error", error);
      
    }
   
  }
  async getPaymentMethod(paymentIntentId) {
    const intentResponse = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (intentResponse.status === 'succeeded') {
      const response = await stripe.paymentMethods.retrieve(intentResponse.payment_method)
      const obj = { id: response.id, last4: response.card.last4, brand: response.card.brand, created: response.created }

      return obj
    } else {
      return 'payment failure'
    }
  }
}
module.exports = StripeAPI
