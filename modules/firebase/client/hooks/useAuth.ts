import { useState, useEffect, useContext } from 'react'
import { StorageController } from '@sample/utilities/storage'
import { getIdToken, User } from 'firebase/auth'
import FireAuth from '../gatekeeper/firebase/auth-service'
import type { AuthContextShape } from '../provider/authContext'
import { AuthContext } from '../provider/authContext'

type UseAuth = () => AuthContextShape
/**
 *
 */
export const useAuth: UseAuth = (): AuthContextShape => useContext(AuthContext)
export const useProvideAuth = (auth: any): AuthContextShape => {
  const [initializing, setInitializing] = useState(true)
  const [currentUser, setUser] = useState<any>()
  const [claims, setClaims] = useState<any>()
  let Auth: any
  const Storage = StorageController('USER_TOKEN')
  if (auth.config.clientPlatform !== 'ReactNative') {
    Auth = FireAuth(auth)
  } else {
    Auth = FireAuth
  }

  const setToken = async (user: any) => {
    const token = await getIdToken(user, true)

    user?.getIdTokenResult().then((idTokenResult: any) => {
      if (!!idTokenResult.claims) {
        setClaims(idTokenResult.claims)
      }
    })

    await Storage.setItem(token)
  }
  function authStateChanged(user: User) {
    if (user) {
      setUser(user)
      setToken(user)
    }

    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = Auth.onAuthStateChanged(authStateChanged)

    return () => subscriber()
    // TODO look into best rule for us to use as this is everywhere - AR 11-11-21
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    userInfo: currentUser,
    initializing,
    currentUser,
    authService: Auth,
    auth,
    setToken,
    claims,
  }
}
