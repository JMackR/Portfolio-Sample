type NotificationParam = { notificationType?: any; user?: any; postId?: any; receiver?: any }

export const Payload = (params: NotificationParam) => {
  const noificationType = params.notificationType
  const sender = params.user
  const event_id = params.postId

  let payloadData = { data: {} }

  if (noificationType === 'speeding') {
    payloadData = {
      data: {
        notifee: JSON.stringify({
          title: 'DUDE,',
          body: 'DUDE, your going to fast... slow your roll',
          ios: {
            sound: 'siren.wav',
            categoryId: 'speeding',
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },

            attachments: [
              {
                // Remote image
                url: 'https://firebasestorage.googleapis.com/v0/b/samplehouse-6e99f.appspot.com/o/speed.jpg?alt=media&token=7bdeea28-e967-457c-9ea7-81faebba7769',
              },
            ],
          },
          android: {
            priority: 'high',
            channelId: 'speeding',
            sound: 'siren',
            id: '0',
            visibility: 1,
            vibrationPattern: [300, 500],
            lights: ['white', 300, 600],
            importance: 4,
            smallIcon: 'ic_launcher',
            largeIcon:
              'https://appspot.com/o/toofast.png?alt=media&token=05042b7f-b1a1-4e66-92d0-8e65b696927e',
            style: {
              type: 0,
              picture:
                'https://appspot.com/o/speed.jpg?alt=media&token=7bdeea28-e967-457c-9ea7-81faebba7769',
            },
            actions: [
              {
                title: 'SEND TEXT FOR BAIL MONEY',
                icon: 'ic_launcher',
                pressAction: {
                  id: 'send-help',
                },
                input: {
                  allowFreeFormInput: false, // set to false
                  choices: ['Yes', 'No', 'Maybe'],
                  placeholder: 'SEND FOR HELP?...',
                },
              },
            ],
          },
        }),
      },
    }
  } else if (noificationType === 'winner') {
    payloadData = {
      data: {
        notifee: JSON.stringify({
          title: `HEY ${sender.name},`,
          body: `Winner,Winner Chicken Dinner!`,
          ios: {
            sound: 'airhorn.wav',
            categoryId: 'winner',
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },

            attachments: [
              {
                // Remote image
                url: 'https://sunrisepsychiatry.com/wp-content/uploads/2019/04/IMG_3538-Darkened-Black25.jpg',
              },
            ],
          },
          android: {
            priority: 'high',
            channelId: 'winner',
            sound: 'airhorn',
            id: '0',
            visibility: 1,
            vibrationPattern: [300, 500],
            // asForegroundService: true,
            importance: 4,
            smallIcon: 'ic_launcher',
            largeIcon:
              'https://appspot.com/o/me.jpg?alt=media&token=dbc963a6-3c10-4146-981f-1f4b8b5fcee2',
            style: {
              type: 0,
              picture: 'https://sunrisepsychiatry.com/wp-content/uploads/2019/04/IMG_3538-Darkened-Black25.jpg',
            },
          },
        }),
      },
    }
  } else if (noificationType === 'paybill') {
    payloadData = {
      data: {
        notifee: JSON.stringify({
          title: `Hello ${sender.name},`,
          body: `Hello we noticed your bill is over due.\n We can help!`,

          ios: {
            sound: 'beep.wav',
            categoryId: 'paybill',
            foregroundPresentationOptions: {
              badge: true,
              sound: true,
              banner: true,
              list: true,
            },

            attachments: [
              {
                // Remote image
                url: 'https://appspot.com/o/money.jpg?alt=media&token=2b335eb7-8286-4436-a084-56823fc593e7',
              },
            ],
          },
          android: {
            priority: 'high',
            channelId: 'paybill',
            sound: 'honk',
            id: '3',
            visibility: 1,
            lights: ['white', 300, 600],
            vibrationPattern: [300, 500],
            // asForegroundService: true,
            importance: 4,
            smallIcon: 'ic_launcher',
            largeIcon:
              'https://appspot.com/o/money.jpg?alt=media&token=2b335eb7-8286-4436-a084-56823fc593e7',
            style: {
              type: 1,
              text: `Would you like a Sample Customer Care Specialists to contact you? \n We don't want to lose you as a valued client. \n We understand times are tough on everyone these days. \n 15 minutes could save you 16%`,
            },
            actions: [
              {
                title: 'YES',
                icon: 'ic_launcher',
                pressAction: {
                  id: 'contact',
                },
                input: {
                  allowFreeFormInput: true, // set to false
                  // choices: ['Yes', 'No', 'Maybe'],
                  placeholder: 'Tell me how you feel, like i really care. just kidding',
                },
              },
              {
                title: `Hell No...`,
                icon: 'ic_launcher',
                pressAction: {
                  id: 'dismiss',
                },
                input: {
                  allowFreeFormInput: false, // set to false
                  choices: ['STOP CONTACTING ME.'],
                  // placeholder: 'Well...',
                },
              },
            ],
          },
        }),
      },
    }
  }
  return payloadData
}
