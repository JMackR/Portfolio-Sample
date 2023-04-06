import ServerModule from '@sample/module-server-ts'
import PushNotifications from './pushNotification'
import createResolvers from './resolvers'
import schema from './schema.graphql'

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
  createContextFunc: [
    ({ appContext }) => ({ PushNotifications: new PushNotifications(appContext.fireMessage(), appContext) }),
  ],
})
