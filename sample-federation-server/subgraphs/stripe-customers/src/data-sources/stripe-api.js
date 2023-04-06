const { DataSource } = require('apollo-datasource')
const stripe = require('stripe')

class StripeAPI extends DataSource {
  constructor() {
    super()
    this.paramsObj = {}
    this.key = ''
  }

  willSendRequest(request) {
    request.headers.set('x-api-key', this.key)
  }

  async searchCustomerByEmail({ email }) {
    try {
      const customer = await stripe.customers.search({
        query: `email: "${email}"`,
        limit: 1,
      })

      if (customer?.data?.length) {
        return { ...customer.data[0], default_payment_method: customer.data[0]?.invoice_settings?.default_payment_method }
      }
    } catch (error) {
      console.log('Stripe Customer Search Error', error)
    }
  }

  async createCustomer({ customer }) {
    const result = await stripe.customers.create({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: {
        line1: customer.address1,
        line2: customer.address2,
        city: customer.city,
        state: customer.state,
        postal_code: customer.zipCode,
      },
      metadata: {
        policy_locator: customer.policyID?.trim(),
        amount: customer.paymentAmount?.trim(),
        sample_id: customer.customerID?.trim(),
      },
    })

    const { id, ...rest } = result
    return { customerID: result.id, id: result.id, ...rest }
  }
  async updateCustomer({ input }) {
    const result = await stripe.customers.create({
      description: input.description,
      email: input.email,
      name: input.name,
      phone: input.phone,
    })
    const { id, ...rest } = result
    return { customerID: result.id, id: result.id, ...rest }
  }
  async setDefaultPaymentMethod(args) {
    const result = await stripe.paymentMethods.attach(args.id, { customer: args.customerId })
    const customer = await stripe.customers.update(args.customerId, {
      invoice_settings: { default_payment_method: args.id },
    })
    return result
  }

  async getCustomerPaymentMethods(args) {
    try {
      const result = await stripe.customers.listPaymentMethods(args, { type: 'card' })
      const customer = await stripe.customers.retrieve(args)

      const defaultID = customer.invoice_settings.default_payment_method
      const defaultIndex = result?.data?.findIndex((element) => element.id === defaultID)
      if (defaultIndex > -1) {
        result[defaultIndex].defaultPaymentMethod = true
      }
      const last_payment_method = result.data[0].id
      const results = result.data
      return { paymentMethods: results, last_payment_method }
    } catch (err) {
      console.log('getCustomerPaymentMethods Error', err)
    }
  }

  async getCustomerPaymentHistory(args) {
    try {
      const result = await stripe.charges.list({ customer: args.customerID })
      return result
    } catch (error) {
      console.log('getCustomerPaymentHistory Error', error)
    }
  }
}

module.exports = StripeAPI
