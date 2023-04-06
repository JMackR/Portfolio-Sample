// @ts-nocheck
import { ApolloLink } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { createUploadLink } from 'apollo-upload-client'
import { apolloAuthContextLink } from './apollo-auth-context'
export const createApolloLink = (graphQlUrl: string) => {
  // Determines our terminating link based on if we are doing a file upload or not
  const httpLink = ApolloLink.split(
    (operation) => operation.getContext().isFileUpload,
    new BatchHttpLink({ uri: graphQlUrl }),
    createUploadLink({
      uri: graphQlUrl,
    })
  )
  return apolloAuthContextLink.concat(httpLink)
}
