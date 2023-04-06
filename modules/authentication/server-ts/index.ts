import ServerModule from '@sample/module-server-ts'
import FireBaseAuth from './fireAuth'
import createResolvers from './resolvers'
import schema from './schema.graphql'

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
  createContextFunc: [
    ({ appContext }) => {
      return { FirebaseAuth: new FireBaseAuth(appContext.authService(), appContext) }
    },
  ],
})
