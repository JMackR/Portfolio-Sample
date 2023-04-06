import { BatchHttpLink } from '@apollo/client/link/batch-http'

import { apolloAuthContextLink } from './apollo-auth-context'

export const createApolloAuthLink = (apiUrl: string) => {
  const httpLink = new BatchHttpLink({
    uri: apiUrl,
    credentials: 'same-origin',
  })
  return apolloAuthContextLink.concat(httpLink)
}
