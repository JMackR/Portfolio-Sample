import functions from '@google-cloud/functions-framework';
import * as admin from 'firebase-admin';
import { getEventarc } from 'firebase-admin/eventarc';
import * as firebase from 'firebase-functions';
import Stripe from 'stripe';
import dayjs from 'dayjs';
import {
  Product,
  Price,
  Subscription,
  CustomerData,
  TaxRate,
} from './interfaces';
import * as logs from './logs';
import config from './config';
import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();

const apiVersion = '2022-11-15';
const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion,
  // Register extension as a Stripe plugin
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: 'Firebase firestore-stripe-payments',
    version: '0.3.2',
  },
});

admin.initializeApp();

import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

const createCustomerRecord = async (obj) => {
  const { id, created, email, name, phone } = obj;
  try {
    logs.creatingCustomer(id);

    const customerData: CustomerData = {
      metadata: {
        firebaseUID: id,
      },
    };
    if (email) customerData.email = email;
    if (phone) customerData.phone = phone;

    // Add a mapping record in Cloud Firestore.
    const customerRecord = {
      email: email,
      stripeId: id,
      stripeLink: `https://dashboard.stripe.com${'/test'}/customers/${id}`,
    };
    if (phone) (customerRecord as any).phone = phone;
    await admin
      .firestore()
      .collection(config.customersCollectionPath)
      .doc(id)
      .set(customerRecord, { merge: true });
    logs.customerCreated(id, false);

    return customerRecord;
  } catch (error) {
    logs.customerCreationError(error, id);
    return null;
  }
};

/**
 * Add PaymentIntent objects to Cloud Firestore for one-time payments.
 */
const insertPaymentRecord = async (payment: Stripe.PaymentIntent) => {
  // Get customer's UID from Firestore
  const customersSnap = await admin
    .firestore()
    .collection(config.customersCollectionPath)
    .where('stripeId', '==', payment.customer)
    .get();
  if (customersSnap.size !== 1) {
    throw new Error('User not found!');
  }

  const { amount, ...rest } = payment;
  const parsePayment = {
    ...rest,
    amount: amount / 100,
  };
  await customersSnap.docs[0].ref
    .collection('payments')
    .doc(payment.id)
    .set(parsePayment, { merge: true });
  logs.firestoreDocCreated('payments', payment.id);
};

const updateSocotra = async (
  payment: any //Stripe.PaymentIntent
) => {
  const { id, amount_received, created, customer } = payment;
  const topic = pubsub.topic(
    'projects/payments'
  );

  const messageObject = {
    message: {
      source: 'stripe',
      timestamp: created,
      amount: amount_received / 100,
      paymentIntentID: id,
      brand: payment.charges.data[0].payment_method_details.card.brand,
      last4: payment.charges.data[0].payment_method_details.card.last4,
      customerID: customer,
      invoice_locator: payment.charges.data[0].metadata.invoice_locator,
      policy_locator: payment.charges.data[0].metadata.policy_locator,
    },
  };
  const messageBuffer = Buffer.from(JSON.stringify(messageObject));

  try {
    if (payment.charges.data[0].metadata.process_source === 'quote-flow') {
      return;
    }
    await topic.publishMessage({ data: messageBuffer });
  } catch (err) {
    console.log('pub/sub publish error', err);
  }
};

const addUpdateDunning = async (payment: any) => {
  const { id, amount_received } = payment;
  const recordID = payment.customer as string;
  try {
    const customersSnap: any = await admin
      .firestore()
      .collection(config.dunningCollectionPath)
      .doc(recordID)
      .get();
    if (customersSnap.size !== 1) {
      /**
       * CUSTOMER DOESN"T EXIST,  ADD TO DUNNING
       */
      const customerRecord = {
        stripeID: payment.customer,
      };
      console.log('customer record', customerRecord);

      await admin
        .firestore()
        .collection(config.dunningCollectionPath)
        .doc(recordID)
        .set(customerRecord, { merge: true });
      let interval;
      for (let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            interval = 3;
            break;
          case 1:
            interval = 5;
            break;
          case 2:
            interval = 7;
            break;
          default:
            break;
        }

        await admin
          .firestore()
          .collection(
            `${config.dunningCollectionPath}/${payment.customer}/to_be_processed`
          )
          .doc(dayjs().add(interval, 'day').format('YYYYMMDD'))
          .set(
            {
              customerID: payment.customer,
              amount: amount_received / 100,
              invoice_locator: payment.charges.data[0].metadata.invoice_locator,
              policy_locator: payment.charges.data[0].metadata.policy_locator,
            },
            { merge: true }
          );
      }
    } 
  } catch (error) {
    logs.dunningCreationError(error, recordID);
  }
};

/**
 * A webhook handler function for the relevant Stripe events.
 */
export const stripeHook: HttpFunction = async (req, res) => {
  const relevantEvents = new Set([
    'customer.created',
    'customer.updated',
    'payment_intent.succeeded',
    'payment_intent.canceled',
    'payment_intent.payment_failed',
  ]);
  let event: Stripe.Event;

  // Instead of getting the `Stripe.Event`
  // object directly from `req.body`,
  // use the Stripe webhooks API to make sure
  // this webhook call came from a trusted source
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers['stripe-signature'],
      config.stripeWebhookSecret
    );
  } catch (error) {
    logs.badWebhookSecret(error);
    res.status(401).send('Webhook Error: Invalid Secret');
    return;
  }

  if (relevantEvents.has(event.type)) {
    logs.startWebhookEventProcessing(event.id, event.type);
    try {
      switch (event.type) {
        case 'customer.created':
        case 'customer.updated':
          console.log('customer created event triggered::', event.type);

          const subscription = event.data.object as Stripe.Subscription;
          await createCustomerRecord(subscription);
          break;
        case 'payment_intent.succeeded':
          const success = event.data.object as Stripe.PaymentIntent;
          await insertPaymentRecord(success);
          await updateSocotra(success);
         
          break;
        case 'payment_intent.canceled':
          const canceled = event.data.object as Stripe.PaymentIntent;
          await insertPaymentRecord(canceled);
          await addUpdateDunning(canceled);
          break;
        case 'payment_intent.payment_failed':
          const failed = event.data.object as Stripe.PaymentIntent;
          await insertPaymentRecord(failed);
          await addUpdateDunning(failed);
          break;
        default:
          logs.webhookHandlerError(
            new Error('Unhandled relevant event!'),
            event.id,
            event.type
          );
      }
      logs.webhookHandlerSucceeded(event.id, event.type);
    } catch (error) {
      logs.webhookHandlerError(error, event.id, event.type);
      res.json({
        error: 'Webhook handler failed. View function logs in Firebase.',
      });
      return;
    }
  }

  // Return a response to Stripe to acknowledge receipt of the event.
  res.json({ received: true });
};

const deleteStripeCustomer = async ({
  uid,
  stripeId,
}: {
  uid: string;
  stripeId: string;
}) => {
  try {
    // Delete their customer object.
    // Deleting the customer object will immediately cancel all their active subscriptions.

    // Mark all their subscriptions as cancelled in Firestore.
    const update = {
      status: 'canceled',
      ended_at: admin.firestore.Timestamp.now(),
    };
    // Set all subscription records to canceled.
    const subscriptionsSnap = await admin
      .firestore()
      .collection(config.customersCollectionPath)
      .doc(uid)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
      .get();
    subscriptionsSnap.forEach((doc) => {
      doc.ref.set(update, { merge: true });
    });
  } catch (error) {
    logs.customerDeletionError(error, uid);
  }
};

/*
 * The `onUserDeleted` deletes their customer object in Stripe which immediately cancels all their subscriptions.
 */
export const onUserDeleted = firebase.auth.user().onDelete(async (user) => {
  if (!config.autoDeleteUsers) return;
  // Get the Stripe customer id.
  const customer = (
    await admin
      .firestore()
      .collection(config.customersCollectionPath)
      .doc(user.uid)
      .get()
  ).data();
  // If you use the `delete-user-data` extension it could be the case that the customer record is already deleted.
  // In that case, the `onCustomerDataDeleted` function below takes care of deleting the Stripe customer object.
  if (customer) {
    await deleteStripeCustomer({ uid: user.uid, stripeId: customer.stripeId });
  }
});

/*
 * The `onCustomerDataDeleted` deletes their customer object in Stripe which immediately cancels all their subscriptions.
 */
export const onCustomerDataDeleted = firebase.firestore
  .document(`/${config.customersCollectionPath}/{uid}`)
  .onDelete(async (snap, context) => {
    if (!config.autoDeleteUsers) return;
    const { stripeId } = snap.data();
    await deleteStripeCustomer({ uid: context.params.uid, stripeId });
  });
