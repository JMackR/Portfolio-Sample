import { FirestoreError } from '@firebase/firestore-types'

// @ts-ignore
import admin from 'firebase-admin'

/**
 * Apollo DataSource Abstraction
 */

export type createInput<T> = {
  obj: T
  path: string // collection path
}

export type deleteInput = {
  docId: string
  path: string // collection path
}

export type sendEmail<T> = {
  email: string
  template: string
  name: string
}
export type createEmailInput<T> = {
  emailInput: EmailInput
}
type EmailInput = {
  templateName: string
}
interface IDatabase {
  db: any
  getByField<T>(input: createInput<T>): any
  getUserByDocId<T>(docID: string, path: string): any
  getByField<T>(args: any): any
  create<T>(input: createInput<T>, id?: string): void
  delete(input: deleteInput): Promise<any>
  list(collection: string): Promise<any[]>
}

/**
 * Firestore CRUD methods
 */
export class FirestoreDatabase implements IDatabase {
  db: admin.firestore.Firestore
  constructor(db: admin.firestore.Firestore) {
    this.db = db
  }

  async create<T>(input: createInput<T>) {
    const newUser = await this.db.collection(input.path).add(input.obj)
    return newUser?.id
  }
  async delete(input: deleteInput) {
    try {
      await this.db.collection(input.path).doc(input.docId).delete()
      return 'success'
    } catch (e) {
      return e
    }
  }
  async createEmailCollection<T>({ emailInput }: createEmailInput<T>) {
    const success = await this.db.collection('email-templates').doc(emailInput.templateName).set(emailInput)

    return success
  }
  async sendEmail<T>(input: sendEmail<T>) {
    console.log("EMAIL INPUT", input);

    const success = await this.db
      .collection('email')
      .add({
        to: input.email,
        template: input.template,
      })
      .then((result) => {
        return result
      })
      .catch((err) => {
        console.log('ERR', err)
        return err
      })
    // console.log('SUCCESS email', success)

    return success
  }

  async update<T>(input: createInput<T>, id: string) {
    const { path, ...rest } = input

    await this.db.collection(path).doc(id).update(rest)
    return 'success'
  }

  async getUserByDocId<T>(docID: string, path: string) {
    let userData
    let firstItem
    await this.db
      .collection(path)
      .doc(docID)
      .get()
      .then(async (querySnapshot: any) => {
        if (querySnapshot.exists) {
          userData = querySnapshot.data()
          firstItem = { docID, ...userData }
        } else {
          return 'user not found'
        }
      })
    return firstItem
  }

  async getByField<T>(args: any) {
    let firstItem: any
    let docID: string
    let userData: any

    await this.db
      .collection(args.path)
      .where(args.field1, '==', args.value1)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.size > 1 && args.input?.field2) {
          await this.db
            .collection(args.path)
            .where(args.input.field1, '==', args.input.field1)
            .where(args.input.field2, '==', args.input.field2)
            .get()
            .then(async (querySnapshot) => {
              if (querySnapshot.size > 1 && args.input?.field3) {
                await this.db
                  .collection(args.path)
                  .where(args.input.field1, '==', args.input.field1)
                  .where(args.input.field2, '==', args.input.field2)
                  .where(args.input.field3, '==', args.input.field3)
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((documentSnapshot) => {
                      if (documentSnapshot.exists) {
                        docID = documentSnapshot.ref.id
                        userData = documentSnapshot.data()
                        firstItem = { docID, ...userData }
                      } else {
                        return 'user not found'
                      }
                    })
                  })
              } else {
                querySnapshot.forEach((documentSnapshot) => {
                  if (documentSnapshot.exists) {
                    docID = documentSnapshot.ref.id
                    userData = documentSnapshot.data()
                    firstItem = { docID, ...userData }
                  } else {
                    return 'user not found'
                  }
                })
              }
            })
        } else {
          querySnapshot.forEach((documentSnapshot) => {
            if (documentSnapshot.exists) {
              docID = documentSnapshot.ref.id
              userData = documentSnapshot.data()
              firstItem = { docID, ...userData }
            } else {
              return 'user not found'
            }
          })
        }
      })
      .catch((err: FirestoreError) => {
        console.log('404: Error getting documents', err)
      })

    return firstItem
  }

  async list(collection: string) {
    const list: any[] = []
    await this.db
      .collection(collection)
      .get()
      .then((snapshot: admin.firestore.QuerySnapshot) => {
        snapshot.forEach((doc: admin.firestore.DocumentData) => {
          const visit = doc.data()
          list.push(visit)
        })
      })
      .catch((err: FirestoreError) => {
        console.log('404: Error getting documents', err)
      })

    return list
  }
  async sendSMS(input: any) {
    console.log('PHONE NUMBER', input.phoneNumber)

    this.db
      .collection('messages')
      .add({
        to: input.phoneNumber,
        body: input.message,
      })
      .then(() => console.log('Queued message for delivery!'))
  }
}
