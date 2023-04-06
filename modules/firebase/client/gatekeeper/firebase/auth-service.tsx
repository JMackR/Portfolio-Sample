// eslint-disable-next-line import/no-extraneous-dependencies

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  ApplicationVerifier,
  signInWithCustomToken,
} from 'firebase/auth'
import { AuthServiceModuleShape } from '../AuthServiceModule'


type AuthListener = (user: any) => any | null

const FireAuth = (fireAuth: any): AuthServiceModuleShape => {
  const authService = fireAuth

  const init = () => ({
    currentUser: authService.currentUser,
    onAuthStateChanged: (listener: AuthListener) => onAuthStateChanged(authService, listener),
    signInWithPhone: (phoneNumber: string, appVerifier: ApplicationVerifier) =>
      signInWithPhoneNumber(authService, phoneNumber, appVerifier),
    signInWithCustomToken: (token: string) => signInWithCustomToken(authService, token),
    logout: () => signOut(authService),
  })

  return init() as AuthServiceModuleShape
}

export default FireAuth
