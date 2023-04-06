import { ApplicationVerifier } from 'firebase/auth'

type AuthListener = (user: any) => any | null

export type AuthServiceModuleShape = {
  currentUser: any
  onAuthStateChanged: (listener: AuthListener) => any
  signInWithPhone: (phoneNumber: string, appVerifier?: ApplicationVerifier) => any
  signInWithCustomToken: (token: string) => any
  logout: () => Promise<void>
}
