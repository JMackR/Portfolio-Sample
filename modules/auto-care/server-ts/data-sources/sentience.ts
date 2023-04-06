import type { RequestOptions } from '@apollo/datasource-rest'
import { RESTDataSource } from '@apollo/datasource-rest'

class SentienceAPI extends RESTDataSource {
  paramsObj: object | null
  private key: string | undefined
  private user_link_api_key: string
  private sentiance_api_base_url: string
  private appId: string
  private app_secret: string
  constructor() {
    super()
    // this.baseURL = process.env.API_GATEWAY_URL
    // this.key = process.env.API_GATEWAY_KEY
    this.paramsObj = {}
    this.sentiance_api_base_url = 'https://api.sentiance.com'
    this.user_link_api_key =
      '6e27a380-e2ee-4321-9eeb-0be2e0dcbfc6.776bfcb22136bb0437e7bee8bffc202b8da9eda82e6a08ce1cbb433490e908dc170e4ea6e4b6515b04419a09035bd4b094f67e2dca782178aa1458d92c9c4a20'
    this.appId = '6345977469a8330800000838'
    this.app_secret = '123'
  }

  willSendRequest(request: RequestOptions) {
    /**
     * TODO: JIM
     */
    // request.params.set('x-api-key', this.key)
    // @ts-ignore
    // request.headers.set('x-api-key', this.key)
    // request.headers.set(
    //   'Authorization',
    //   `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9vcGhvdXNlLTZlOTlmIiwiYXVkIjoibG9vcGhvdXNlLTZlOTlmIiwiYXV0aF90aW1lIjoxNjY1Njc4MjU1LCJ1c2VyX2lkIjoib2ZKWXRHekt3VWNnUlV1cU5VcjBkQUxhWkxUMiIsInN1YiI6Im9mSll0R3pLd1VjZ1JVdXFOVXIwZEFMYVpMVDIiLCJpYXQiOjE2NjU2NzgyNTUsImV4cCI6MTY2NTY4MTg1NSwiZW1haWwiOiJhbGlAcmlkZXdpdGhsb29wLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGlAcmlkZXdpdGhsb29wLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.pRIvl4l5ysUGJKPa80JN0rQItjx38LcbytVPzg2KPW9L1mHYbpkACsaLuixhv5wvD-040WEq6T4VTPYcK7xoSFDfiiZNTRWtqs37JXPX6YwXrotmbwzX5MNBUhNoKfEiEkZWa8cu8RCa1-12Sgk2Tnp9H93jCCmp8JpfiJbv9u59c32mT6qw8Kt_5pqca_GANnoHXdhRITYvRcsh6ruKz0imqv59UCrKwerSgYqSrT27SQmcYNCZSDgj19RsCbz70J7hFpn6zT93-JpGQHC483dxBjT4O1O8zSZgtl8mBFa8D2WUA4XumHXKHA97cmimP4lX82YUPL4MeQUYkNhBaA`
    // )
  }

  // setParamsObj(params) {}

  async getSentienceAuth(args: any) {
    // this.setParamsObj(args)
    console.log('getSentienceAuth ARGS', args)

    try {
      const reqBody = { external_id: args.external_id }
      const response = await this.post(`${this.sentiance_api_base_url}/users/auth-code`, {
        body: reqBody,
        headers: {
          Authorization: `Bearer ${this.user_link_api_key}`,
        },
      })
      console.log('getSentienceAuth RESPONSE', this.appId, this.sentiance_api_base_url, response)

      return {
        app_id: this.appId,
        auth_code: response.authentication_code,
        platform_url: this.sentiance_api_base_url,
        app_secret: this.app_secret,
      }
    } catch (error) {
      console.log('getSentienceAuth ERROR', error)
      throw error
    }

    // res.json({
    //   app_id: this.appId,
    //   auth_code: response.data.authentication_code,
    //   platform_url: this.sentiance_api_base_url,
    // })
  }
  async linkUser(args: any) {
    try {
      console.log('fire linkUser:::')

      const response = await this.post(`${this.sentiance_api_base_url}/v2/users/:install_id/link`, {
        ...args,
        headers: {
          Authorization: `Bearer ${this.user_link_api_key}`,
        },
      })

      console.log('SENTIANCE LINKER RESPONSE', response)

      return {
        user_id: response.id,
      }
    } catch (error) {
      console.log('linkUser ERROR', error)
      throw error
    }
  }
}

export default SentienceAPI
