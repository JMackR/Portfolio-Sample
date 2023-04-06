// eslint-disable-next-line import/extensions
import type { IncomingMessage } from 'http'
import ServerModule from '@sample/module-server-ts'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
// eslint-disable-next-line import/extensions
import { getAuth } from 'firebase-admin/auth'
import { FirebaseDynamicLinks } from './dynamic-links'
// eslint-disable-next-line import/extensions
import type { Messaging } from 'firebase-admin/messaging'
import { getMessaging } from 'firebase-admin/messaging'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import type { Firestore } from 'firebase/firestore'
import resolvers from './resolvers'
import schema from './schema.graphql'
import type { AuthServiceShape } from './auth-services'
import AuthService from './auth-services'
import { FirestoreDatabase } from './firestore-service'

const createContextFunction = async ({ req, appContext: { authService } }: { req: IncomingMessage; appContext: any }) => {
  const fire: AuthServiceShape = authService()

  try {
    const idToken = req.headers.authorization

    // console.log('AM I TRUTHY', idToken && process.env.NODE_ENV === 'production')

    if (!!idToken && process.env.NODE_ENV === 'production') {
      const verifiedToken = await fire.verifyToken(idToken)
      console.log('VERIFIED TOKEN EXPIRE TIME:::', verifiedToken.exp)

      if (verifiedToken) {
        console.log('I AM A GOOD TOKEN')

        return {
          auth: {
            isAuthenticated: true,
            scope: null,
            idToken,
          },
          fireAuth: fire,
        }
      } else {
        console.log('I AM NOT AUTHENTICED')

        return {
          auth: {
            isAuthenticated: false,
            scope: null,
            idToken,
          },
          fireAuth: fire,
        }
      }
    } else if (process.env.NODE_ENV === 'development') {
      // console.log('DEV MODE')

      return {
        auth: {
          // eslint-disable-next-line no-unneeded-ternary
          isAuthenticated: true,
          idToken,
        },
        fireAuth: fire,
      }
    } else {
      console.log('I DON"T HAVE A TOKEN')
      return {
        auth: {
          // eslint-disable-next-line no-unneeded-ternary
          isAuthenticated: false,
          idToken,
        },
        fireAuth: fire,
      }
    }
  } catch (error) {
    console.log('AUTHENTICATION ERROR WITH FIREBASE:: INVALID TOKEN')
    return {
      auth: {
        isAuthenticated: false,

        scope: null,
      },
      fireAuth: fire,
    }
  }
}

type AvailableServices = {
  getAuth: AuthServiceShape | undefined
  getMessaging: Messaging | undefined
  // fireAuth: AuthServiceShape | undefined
}
const ref: AvailableServices = {
  getAuth: undefined,
  getMessaging: undefined,
  // fireAuth: undefined,
}

const fireAuth = () => ref.getAuth
const messaging = () => ref.getMessaging

const app = initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  credential: applicationDefault(),
})
const db = getFirestore(app)
// db.settings({ ignoreUndefinedProperties: true })
const createDataSource = () => ({
  firestore: new FirestoreDatabase(db),
  dynamicLink: new FirebaseDynamicLinks(process.env.FIREBASE_API_KEY),
})

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [resolvers],
  createContextFunc: [createContextFunction],
  createDataSource: [createDataSource],
  appContext: { authService: fireAuth, fireMessage: messaging },
  onAppCreate: [
    async () => {
      ref.getAuth = new AuthService(getAuth)

      ref.getMessaging = getMessaging()
    },
  ],
})
