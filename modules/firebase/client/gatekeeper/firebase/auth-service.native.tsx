// eslint-disable-next-line import/no-extraneous-dependencies
import auth from '@react-native-firebase/auth'

import { AuthServiceModuleShape } from '../AuthServiceModule'

type AuthListener = (user: any) => any | null

const Auth = (fireAuth: typeof auth) => {
  const authService = fireAuth()

  const init = () => ({
    currentUser: authService.currentUser,
    onAuthStateChanged: (listener: AuthListener) => authService.onAuthStateChanged(listener),
    signInWithPhone: (phoneNumber: string) => authService.signInWithPhoneNumber(phoneNumber),
    signInWithCustomToken: (token: string) => authService.signInWithCustomToken(token),
    logout: () => authService.signOut(),
  })
  return init()
}
const FireAuth: AuthServiceModuleShape = Auth(auth)

export default FireAuth
