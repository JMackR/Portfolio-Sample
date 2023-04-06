import { PubSub } from '@google-cloud/pubsub'
const { GoogleAuth } = require('google-auth-library')

const retrySettings = {
  retryCodes: [
    10, // 'ABORTED'
    1, // 'CANCELLED',
    4, // 'DEADLINE_EXCEEDED'
    13, // 'INTERNAL'
    8, // 'RESOURCE_EXHAUSTED'
    14, // 'UNAVAILABLE'
    2, // 'UNKNOWN'
  ],
  backoffSettings: {
    // The initial delay time, in milliseconds, between the completion
    // of the first failed request and the initiation of the first retrying request.
    initialRetryDelayMillis: 100,
    // The multiplier by which to increase the delay time between the completion
    // of failed requests, and the initiation of the subsequent retrying request.
    retryDelayMultiplier: 1.3,
    // The maximum delay time, in milliseconds, between requests.
    // When this value is reached, retryDelayMultiplier will no longer be used to increase delay time.
    maxRetryDelayMillis: 60000,
    // The initial timeout parameter to the request.
    initialRpcTimeoutMillis: 5000,
    // The multiplier by which to increase the timeout parameter between failed requests.
    rpcTimeoutMultiplier: 1.0,
    // The maximum timeout parameter, in milliseconds, for a request. When this value is reached,
    // rpcTimeoutMultiplier will no longer be used to increase the timeout.
    maxRpcTimeoutMillis: 600000,
    // The total time, in milliseconds, starting from when the initial request is sent,
    // after which an error will be returned, regardless of the retrying attempts made meanwhile.
    totalTimeoutMillis: 600000,
  },
}

const pubSubClient = new PubSub()
const PasPubSub = {
  async publishBatchedMessages(data: any) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    try {
          data.map((record:any)=>{
      const dataBuffer = Buffer.from(JSON.stringify(record))

      // Build the request
  
      const batchPublisher = pubSubClient.topic('', {
        batching: {
          maxMessages: 10,
          maxMilliseconds: 10 * 1000,
        },
      })
  

        const messageId = await batchPublisher.publishMessage({ data: dataBuffer })
  

    })
    } catch (error) {
      /**
       * TODO Add Error topic publishing method to send email with error codes
       */
      console.log("PUB SUB TOPIC publishing Error", error);
      
    }

    
    
  },
}

export default PasPubSub
