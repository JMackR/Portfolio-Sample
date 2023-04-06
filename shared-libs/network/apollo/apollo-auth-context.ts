import { setContext } from '@apollo/client/link/context'
import { useAuth } from '@sample/firebase-client/provider/authProvider'
import { StorageController } from '@sample/utilities/storage'

export const apolloAuthContextLink = setContext(async (_operation, { headers }) => {
  const token: any = await StorageController('USER_TOKEN').getItem()

  return {
    headers: {
      ...headers,
      authorization: token ? token : undefined,
    },
  }
})
