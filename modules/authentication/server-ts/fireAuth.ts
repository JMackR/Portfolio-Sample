export default class FirebaseAuth {
  constructor(messaging: any, appCtx: any) {
    // console.log('messaging', messaging)

    this.messaging = messaging
  }

  sendToDevice(PushToken: any, Payload: any) {
    try {
      return this.messaging.sendToDevice(PushToken, Payload)
    } catch (error: any) {
      return { success: false }
    }
  }


  sendMulticast(alerts: any) {
    console.log('hiiii')
    try {
      const registrationTokens = alerts.map((alert) => {
        return alert.pushToken
      })
      const message = {
        data: { score: '850', time: '2:45' },
        tokens: registrationTokens,
      }
      console.log('message ===>', message)
      return this.messaging.sendMulticast(message)
    } catch (error: any) {
      return { success: false }
    }
  }

  sendToCondition(condition: any, payload: any) {
    try {
      return this.messaging.sendToCondition(condition, payload)
    } catch (error: any) {
      return { success: false }
    }
  }

  sendToDeviceGroup(notificationKey: any, payload: any) {
    try {
      return this.messaging.sendToDeviceGroup(notificationKey, payload)
    } catch (error: any) {
      return { success: false }
    }
  }

  createMultiplePayload(alerts: any) {
    if (alerts.length > 0) {
      return (registrationTokens = alerts.map((alert: { pushToken: any }) => {
        return alert.pushToken
      }))
    }
  }
}
