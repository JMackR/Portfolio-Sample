const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getMessaging, Messaging } = require('firebase-admin/messaging')

initializeApp({
  credential: applicationDefault(),
})

const MAX_CHUNK_SIZE = 500

const chunk = (arr, size) => {
  const chunkedArr = []
  for (let i = 0; i < arr.length; i += size) {


    chunkedArr.push(arr.slice(i, i + size))
  }
  return chunkedArr
}

const processNotifications = (alerts) => {
  const messaging = getMessaging()
  const registrationTokens = alerts.map((alert) => {
    if (alert.pushToken != null) {
      return alert.pushToken
    }
  })

  const validTokens = registrationTokens.filter((item) => item !== undefined)

  const chunks = chunk(validTokens, MAX_CHUNK_SIZE)
  const notificationPromises = chunks.map(async (tokenChunk) => {
    const message = {
      data: { score: '850', time: '2:45' },
      tokens: tokenChunk,
    }
    try {
      return messaging.sendMulticast(message)
    } catch (error) {
      return { success: false }
    }
  })
  return Promise.all(notificationPromises)
}

process.on('message', (message) => {
  const { messageType, data } = JSON.parse(message)
  if (messageType === 'notification') {
    const processed = processNotifications(data)
    process.send(`{"message": ${JSON.stringify(processed)}}`)
  }
})
