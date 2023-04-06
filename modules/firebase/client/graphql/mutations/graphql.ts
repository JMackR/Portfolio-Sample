import { gql } from '@apollo/client'

export const SetCustomClaimsDocument = gql`
  mutation setCustomClaimsAndCreateUser($uid: String!, $properties: UserPropertiesInput) {
    setCustomClaims(uid: $uid, properties: $properties) {
      code
      success
      message
      errors {
        field
        message
      }
    }
  }
`
export const RegisterUserDocument = gql`
  mutation registerUser($registerUserInput: RegisterUserInput!) {
    registerUser(registerUserInput: $registerUserInput) {
      user {
        userKey
        userUID
        firstName
        lastName
        name
      }
    }
  }
`
