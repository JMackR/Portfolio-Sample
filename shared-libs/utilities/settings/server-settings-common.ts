// import { $enum } from 'ts-enum-util'
// import { translate } from '../i18n'
import invariant from 'invariant'
import Config from 'react-native-config'

export enum ServerType {}
// Environment = 'environment',
// Development = 'development',
// Integration = 'integration',
// Uat = 'uat',
// Test = 'test',
// Production = 'production',

export const getServerTitle = (serverType: ServerType) => {
  // const tKey = `account-stack.server-setting.${serverType}`
  // return translate(tKey)
}

export const getServerTypeFromString = (st: string): ServerType => {
  // const value = $enum(ServerType).asValueOrDefault(st)
  // invariant(value, `Invalid ServerType: ${st}`)
  // return value
}

export const getServerEnvType = (): ServerType => getServerTypeFromString(Config.BACKEND_SERVER_TYPE || '')

export const getServerWebsite = (serverType: ServerType) => {
  // switch (serverType) {
  // 	case ServerType.Development:
  // 		return Config.WEBSITE_DEV || ''
  // 	case ServerType.Environment:
  // 		return Config.WEBSITE || ''
  // 	case ServerType.Integration:
  // 		return Config.WEBSITE_INT || ''
  // 	case ServerType.Uat:
  // 		return Config.WEBSITE_STG || ''
  // 	default:
  // 		return ''
  // }
}
