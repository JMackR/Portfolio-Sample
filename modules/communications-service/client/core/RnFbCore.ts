/* eslint-disable @typescript-eslint/no-empty-function */
// import messaging from '@react-native-firebase/messaging'

export default class RnFbCore {
  public token: null | string = null

  public defaultAndroidChannel?: string

  public getToken = async (): Promise<string> => {
    const { token } = this
    if (typeof token === 'string') {
      return token
    }
    // const fetchedToken = await messaging().getToken()
    // this.token = fetchedToken
    // return fetchedToken
  }
}
