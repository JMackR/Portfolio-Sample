import { ServerType, getServerEnvType, getServerWebsite } from './server-settings-common'
import invariant from 'invariant'
import Config from 'react-native-config'

export const getServerType = (): ServerType => {
  if (Config.BACKEND_SERVER_TYPE === undefined) {
    return ServerType.Environment
  }
  return getServerEnvType()
}

const getServerGraphQL = (serverType: ServerType, internal = false) => {
  switch (serverType) {
    case ServerType.Development:
      return Config.GRAPHQL_URL_DEV || ''
    case ServerType.Environment:
      return (internal ? Config.GRAPHQL_URL_INTERNAL : Config.GRAPHQL_URL_PUBLIC) || ''
    case ServerType.Integration:
      return (internal ? Config.GRAPHQL_URL_INT_INTERNAL : Config.GRAPHQL_URL_INT_PUBLIC) || ''
    case ServerType.Uat:
      return (internal ? Config.GRAPHQL_URL_STG_INTERNAL : Config.GRAPHQL_URL_STG_PUBLIC) || ''
    default:
      return ''
  }
}

/*
 * Priority for server settings:
 * 1) GRAPHQL_URL, WEBSITE
 * 2) Environment
 */

export const getAppUrl = (internal = false) => {
  const serverType = getServerType()
  const appUrl = getServerGraphQL(serverType, internal)

  invariant(appUrl.length > 0, 'GRAPHQL_URL is required in .env')
  return appUrl
}

export const getWebsiteUrl = () => {
  const serverType = getServerType()
  const website = getServerWebsite(serverType)

  invariant(website.length > 0, 'WEBSITE is required in .env')
  return website
}
