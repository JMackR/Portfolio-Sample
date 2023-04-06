import { SUCCESS_CODE } from '@sample/core-server-ts/constants'
import withAuth from 'graphql-auth'
const fs = require('fs')
import { policyParser, policyCoverageParser, vehicleCoverageParser } from './parsers'
import * as crypto from 'crypto'

const storeDocument = async (createReadStream: any, storage: any, bucketName: string, filename: any) => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  // let sanitizedName = removeWhiteSpaces(filename)
  const docUrl = await new Promise((resolve, reject) => {
    fs.createWriteStream().pipe(
      storage
        .bucket(bucketName)
        .file(`${year}/${month}/${filename}`)
        .createWriteStream()
        .on('finish', () => {
          storage
            .bucket(bucketName)
            .file(`${year}/${month}/${filename}`)
            .makePublic()
            .then(() => {
              const url = `https://storage.googleapis.com/${bucketName}/${year}/${month}/${filename}`

              resolve(url)
            })
            .catch((e: any) => {
              reject((e: any) => console.log(`exec error : ${e}`))
            })
        })
    )
  })

  return docUrl
}

export default () => ({
  Query: {
    getCorePolicy: async (
      _: any | undefined,
      { input }: { input: any },
      { auth, dataSources, FirebaseAuth, ...rest }: any
    ): Promise<string | unknown> => {
      try {
        const {
          data: { policyholder },
        } = await dataSources.pasAPI.getPolicy({
          args: input,
        })

        const decryptedDriversLicenseNumber = (await decryptText(input.driversLicense)) || ''

        const filteredDrivers = policyholder.policy.drivers.filter((driver: any) => driver.isExcluded === false)
        const convertedDriverArray = await Promise.all(
          filteredDrivers.map(async (driver: any, idx: any) => {
            const result = await decryptText(driver.encryptedLicenseNumber)
            return {
              ...driver,
              decryptedLicenseNumber: result,
            }
          })
        )
        const foundDriver = convertedDriverArray.filter(
          (driver: any) => driver.decryptedLicenseNumber?.toString() === decryptedDriversLicenseNumber?.toString()
        )[0]
        const primaryDriver = convertedDriverArray.find((o) => o.isPrimary === true)

        const isPrimary = foundDriver.isPrimary

        const customerEmail = isPrimary ? primaryDriver?.email : null
        const cleaned = `${primaryDriver.cell}`.replace(/\D/g, '')

        const customer = await dataSources.stripeAPI.searchCustomerByEmail(primaryDriver?.email)


        const firestoreUser = await dataSources.firestore.getByField({
          field1: 'phoneNumber',
          value1: `+1${cleaned}`,
          path: 'wannabe-sampleers',
        })

        // TODO: in includedDrivers, the encrypted license number does not match what is in pas or firebase and looks like it is randomized each time ~ls
        const includedDrivers = policyholder?.policy?.drivers?.filter((driver: any) => driver.isExcluded === false)
        const firestoreDrivers = firestoreUser?.drivers
        const updatedFBDrivers = includedDrivers?.map((pd) => {
          const firebaseDriver = firestoreDrivers?.filter((fd) => {

            return fd.firstName === pd.firstName
          })

          if (firebaseDriver?.length > 0 && pd.firstName === firebaseDriver[0]?.firstName) {
            return firebaseDriver[0]
          }
          if (firebaseDriver?.length === 0) {
            return pd
          }
        })
        const updatedFirestoreUser = { ...firestoreUser, drivers: updatedFBDrivers }
        const updateResult = await dataSources.firestore.update(
          { ...updatedFirestoreUser, path: 'wannabe-sampleers' },
          firestoreUser.docID
        )

        const finalPolicy = policyParser({
          policyholder,
          currentUser: foundDriver,
          includedDrivers,
          updatedFBDrivers,
          customer,
        })

        return { ...finalPolicy, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
      } catch (err) {
        console.log('getCorePolicy RESOLVER ERROR', err)
        return {
          message: err,
        }
      }
    },
    getCoverages: withAuth(
      async (
        _: any | undefined,
        { input }: { input: any },
        { auth, dataSources, ...rest }: any
      ): Promise<string | unknown> => {
        try {
          const {
            data: { policyholder },
          } = await dataSources.pasAPI.getPolicy({
            args: input,
          })
          const vehicles = await vehicleCoverageParser(policyholder.policy.vehicles)
          const result = {
            policyCoverages: policyCoverageParser(policyholder.policy.coverages),
            vehicleCoverage: vehicles,
          }

          return { ...result, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
        } catch (err) {

          return {
            code: err.extensions.response.status,
            success: err.extensions.response.statusText,
            message: err.extensions.response.body?.message,
            data: null,
          }
        }
      }
    ),

    getDocuments: withAuth(
      async (
        _: any | undefined,
        { input }: { input: any },
        { auth, dataSources, ...rest }: any
      ): Promise<string | unknown> => {
        try {
          const {
            data: { policyholder },
          } = await dataSources.pasAPI.getPolicy({
            args: input,
          })

          const result = {
            documents: policyholder.policy.documents.map((document: any) => ({
              id: document.id,
              name: document.name,
              url: document.url,
            })),
          }
          return { ...result, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
        } catch (err) {
          console.log('getDocuments RESOLVER ERROR', err)
          return {
            message: err.extensions.response.body?.message,
          }
        }
      }
    ),
    getSentienceAuth: withAuth(
      async (
        _: any | undefined,
        { external_id }: { external_id: string },
        { dataSources }: any
      ): Promise<string | unknown> => {
        try {
          const data = await dataSources.sentienceApi.getSentienceAuth({ external_id })

          return { ...data, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
        } catch (err) {
          console.log('getSentienceAuth RESOLVER ERROR', err.extensions.response)
          return {
            code: err.extensions.response.status,
            success: err.extensions.response.statusText,
            message: err.extensions.response.body?.message,
            data: null,
          }
        }
      }
    ),
    linkSentienceUser: withAuth(
      async (
        _: any | undefined,
        { external_id }: { external_id: string },
        { dataSources }: any
      ): Promise<string | unknown> => {
        try {
          const data = await dataSources.sentienceApi.linkUser({ external_id })

          return { ...data, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
        } catch (err) {
        
          return {
            code: err.extensions.response.status,
            success: err.extensions.response.statusText,
            message: err.extensions.response.body?.message,
            data: null,
          }
        }
      }
    ),
    findAddress: async (_: any, searchValue: string, { auth, dataSources, ...rest }: any): Promise<string | unknown> => {
      try {
        const responseData = await dataSources.tomtomAPI.searchAddress(searchValue)

        return { response: responseData, success: true, message: 'Success', code: SUCCESS_CODE }
      } catch (error: any) {
        console.log('errors', error)

        return error
      }
    },
  },

  Mutation: {
    saveAndSendClaim: async (_: any, { sendTo }: any, { auth, dataSources }: any): Promise<string | unknown> => {
      try {

        const { answers } = sendTo

        await dataSources.firestore.sendEmail({
          email: ['jim@bob.com'],
          template: {
            name: 'claims-email',
            data: {
              ...answers,
            },
          },
        })

        return { success: true }
      } catch (error: any) {
        console.log('errors', error)

        return error
      }
    },
    makeMobilePayment: withAuth(
      async (_: any | undefined, { input }: any, { dataSources }: any): Promise<string | unknown> => {
        try {
          const { customerID, amount, policy_locator, invoice_locator, process_source } = input

          const data = await dataSources.stripeAPI.paymentSheet({
            customerID,
            amount,
            policy_locator,
            invoice_locator,
            process_source,
          })
          return { ...data, code: SUCCESS_CODE, success: 'OK', message: 'Saul Good man' }
        } catch (err) {
          console.log('makeMobilePayment error', err)

          return {
            code: err.extensions.response.status,
            success: err.extensions.response.statusText,
            message: err.extensions.response.body?.message,
            data: null,
          }
        }
      }
    ),
  },
})

export const decryptText = async (encryptedText: string) => {
  const privatePem = process?.env?.PAS_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (privatePem) {
    const privateKey = crypto.createPrivateKey({
      key: privatePem,
    })

    const rsaPrivateKey = {
      key: privateKey,

      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    }
    const decryptedMessage = await crypto.privateDecrypt(rsaPrivateKey, Buffer.from(encryptedText, 'base64'))

    return decryptedMessage.toString('utf8')
  }
}
