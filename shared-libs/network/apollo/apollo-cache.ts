import { InMemoryCache } from '@apollo/client'
import { userCache } from '@auto/care-client/app-state'
import { quoteCache } from '@auto/quote-client/server-state/quote-cache'
import { agentCache } from '../../../modules/agent-portal/client/server-state/agent-cache'
import { claimData, validationState } from '@auto/care-client/claim/claim-cache'
import _ from 'lodash'

const mergedCache = { ...userCache, ...quoteCache, ...agentCache, ...claimData, ...validationState }

export const apolloCache = () => {
  // console.log('MERGED CACHE', mergedCache)

  return new InMemoryCache({
    // addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          ...mergedCache,
        },
      },
    },
  })
}
