import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

export const createApolloAuthClient = (graphQlUrl: string, ssrMode?: boolean) => {
  const apolloLink = createApolloAuthLink(graphQlUrl)
  return new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ssrMode,
    // Disable all caching for auth requests
    defaultOptions: {
      mutate: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })
}
