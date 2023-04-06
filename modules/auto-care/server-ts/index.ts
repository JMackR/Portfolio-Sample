import ServerModule from '@sample/module-server-ts'
import SentienceApi from './data-sources/sentience'
import deepLinking from './deep-linking'
import createResolvers from './resolvers'
import schema from './schema.graphql'
import scopes from './scopes'

const createDataSource = ({ req }) => ({
  sentienceApi: new SentienceApi(),
})

const createContextFunc = ({ req }) => ({
  auth: {
    ...req.auth,
    scope: scopes['user'],
  },
})
export default new ServerModule(deepLinking, {
  schema: [schema],
  createDataSource: [createDataSource],
  createResolversFunc: [createResolvers],
  createContextFunc: [createContextFunc],
})
