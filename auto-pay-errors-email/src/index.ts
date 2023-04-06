import functions from '@google-cloud/functions-framework';
import * as admin from 'firebase-admin';
import { getEventarc } from 'firebase-admin/eventarc';
import * as firebase from 'firebase-functions';
import { Context } from '@google-cloud/functions-framework/build/src/functions';

admin.initializeApp();

exports.autopayErrorEmail = async (
  event: any,
  context: Context
): Promise<void> => {
  // The Pub/Sub message is passed as the CloudEvent's data payload.
  const message: any = JSON.parse(
    Buffer.from(event.data as any, 'base64').toString()
  ) as any;

  const list = await admin
    .firestore()
    .collection('distribution-lists')
    .doc('autopay-failures')
    .get();

  console.log('emails', list.data());
  const emails = await list.data();
  await admin
    .firestore()
    .collection('email')
    .add({
      to: emails,
      message: {
        subject: 'Whoops! PAYMENT FAILED',
        html: JSON.stringify(message),
      },
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log('ERR', err);
      return err;
    });
};
