import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      // console.log('[GraphQL error]:', { message, locations, path })
      switch (message) {
        case 'Not authenticated!': {
          console.log('NOT AUTHENTICATED')
        }
      }
    })
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export default errorLink
