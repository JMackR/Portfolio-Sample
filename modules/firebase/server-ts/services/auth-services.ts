// @nocheck
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Auth } from 'firebase-admin/auth'

type UserProperties = {
  email?: string
  phoneNumber?: string
  emailVerified?: boolean
  password?: string
  displayName?: string
  photoURL?: string
  disabled?: boolean
  policyID?: string
}
export interface AuthServiceShape {
  setClaimsOnToken: (uid: string, claims: Claims) => Promise<any>
  getUserByUid: (uid: string) => Promise<any>
  getListOfUsers: (qty: number) => Promise<any>
  getUserByPhoneNumber: (phoneNumber: string) => Promise<any>
  verifyToken: (idToken: string) => Promise<any>
  updateUser: (uid: string, properties: UserProperties) => Promise<any>
  createCustomToken: (uid: string) => Promise<any>
}

type Claims = {
  role?: string
  customDisplayName?: string
  policyID?: string
}

interface AuthService extends AuthServiceShape {}

class AuthService {
  service: () => Auth

  constructor(service: any) {
    this.service = service
  }

  public async getUserByUid(uid: string) {
    const user = await this.service().getUser(uid)
    return user
  }

  public async getUserByPhoneNumber(phoneNumber: string) {
    try {
      const user = await this.service().getUserByPhoneNumber(phoneNumber)
      return user
    } catch (error) {
      console.log('error', error.errorInfo)
    }
  }

  public async setClaimsOnToken(uid: string, claims: Claims) {
    return this.service().setCustomUserClaims(uid, claims)
  }

  public async updateUser(uid: string, properties: UserProperties) {
    return this.service().updateUser(uid, properties)
  }

  public async verifyToken(idToken: string) {
    if (!!idToken) {
      const token = await this.service().verifyIdToken(idToken)
      return token
    } else {
      console.log('NO TOKEN HERE')

      return false
    }
  }
  public async getListOfUsers(qty: number) {
    const users = await this.service().listUsers(qty)
    return users
  }
  public async createCustomToken(uid: string) {
    try {
      const customToken = await this.service().createCustomToken(uid)
      return customToken
    } catch (e) {
      console.log('ERROR FIREBASE WITH CUSTOM TOKEN', e)
    }
  }
  public async createUser({ phoneNumber }: { phoneNumber: string }) {
    const result = this.service().createUser({
      emailVerified: false,
      phoneNumber: phoneNumber,
      disabled: false,
    })
    return result
  }
}

export default AuthService
