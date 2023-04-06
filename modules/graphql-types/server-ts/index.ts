import ServerModule from '@sample/module-server-ts'

import schema from './schema.graphql'
import createResolvers from './resolvers'

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
})
