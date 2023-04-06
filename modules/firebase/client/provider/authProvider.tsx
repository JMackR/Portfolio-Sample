import React from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuth, useProvideAuth } from '../hooks/useAuth'
import { AuthContext } from './authContext'


interface AuthProviderProps {
  config?: any
}

const AuthProvider = (props: React.PropsWithChildren<AuthProviderProps>) => {
  const app = initializeApp(props.config || qaConfig)
  const { children } = props
  const authFire = getAuth(app)
  const auth = useProvideAuth(authFire)
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider
