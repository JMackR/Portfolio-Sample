import { Alert } from 'react-native'
import { RetryLink } from '@apollo/client/link/retry'
const retryLink = new RetryLink({
  delay: { initial: 500, jitter: true, max: Infinity },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => {
      // console.log('APOLLO NETWORK ERROR ', error, _operation)

      return !!error
    },
  },
  // attempts: (count, operation, error) => {
  //   console.log('COUNT', count, error)

  //   if (count >= 3) {
  //     // TODO:: need to refactor this alert business, has got to be a better approach than this... -AR
  //     Alert.alert(
  //       'We are unable to establish a network connection to our servers. Please close the App and retry again later.'
  //     )
  //     return !!error
  //   }
  //   return !!error && operation.operationName != 'specialCase'
  // },
})

export default retryLink
