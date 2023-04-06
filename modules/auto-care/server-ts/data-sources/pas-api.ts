import type { RequestOptions } from '@apollo/datasource-rest'
import { RESTDataSource } from '@apollo/datasource-rest'

class PasAPI extends RESTDataSource {
  paramsObj: object | null
  private key: string | undefined

  constructor() {
    super()
    this.baseURL = process.env.API_GATEWAY_URL
    this.key = process.env.API_GATEWAY_KEY
    this.paramsObj = {}
  }

  willSendRequest(request: RequestOptions) {
    // @ts-ignore
    request.headers.set('x-api-key', this.key)
  }

  // async getPolicy(args: any) {
  //   console.log('pasAPI hit', args)
  //   const response = await this.post(`get-policy`, { ...args })
  //   console.log('getPolicy api response', response)
  //   return response
  // }
}

export default PasAPI
