import { createContext } from 'react'
import { Auth, User } from 'firebase/auth'
import type { AuthServiceModuleShape } from '../gatekeeper/AuthServiceModule'

// export type User = {
//   uid: string
//   id: string
//   phoneNumber: string
//   getIdTokenResult: () => Promise<string | unknown>
// }
export type UserInfo = {
  name: string
  accessToken: string
}
export type AuthContextShape = {
  userInfo: UserInfo | null
  currentUser: User | null
  initializing: boolean
  authService: AuthServiceModuleShape | null
  auth: Auth | null
  claims: any
  setToken: (user: any) => Promise<any>
}

const auth: AuthContextShape = {
  userInfo: null,
  currentUser: null,
  initializing: true,
  authService: null,
  auth: null,
  claims: null,
  setToken: async () => {},
}

export const AuthContext = createContext<AuthContextShape>(auth)
