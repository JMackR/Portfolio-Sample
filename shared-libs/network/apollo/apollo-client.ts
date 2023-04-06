import { ApolloClient, from } from '@apollo/client'
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist'
import { apolloCache } from './apollo-cache'
import errorLink from './apollo-error-link'
import { createApolloLink } from './apollo-link'
import retryLink from './apollo-retry-link'

export const createApolloClient = async ({ apiUrl, storage, controller, isMobile = false }: any) => {
  // console.log('createApolloClient', apiUrl, isMobile)
  const cache = apolloCache()
  // cache.gc()
  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(storage),
  })
  const authLink = createApolloLink(apiUrl)
  const apiLink = from([errorLink, retryLink, authLink])
  const clientParams = {
    link: apiLink,
    cache,
  }

  const client = new ApolloClient(clientParams)

  return client
}
