// @ts-nocheck
import React, { useEffect, useState } from 'react'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import AuthProvider from '@sample/firebase-client/provider/authProvider'
import { createApolloClient } from '@sample/network'
import { MediaQueryProvider } from '@sample/providers/media-query-provider'
import { ThemeProvider } from '@sample/themes'
import { setI18nConfig, StorageController } from '@sample/utilities'
import { cssGlobal } from '@sample/widgets'
import markerSDK from '@marker.io/browser'
import { css, StyleSheet } from 'aphrodite'
import { BrowserRouter } from 'react-router-dom'
import en from '../../shared-libs/translations/en.json'
import es from '../../shared-libs/translations/es.json'
import { SampleRouter } from './router'
import { rudderanalytics } from '@auto/quote-client/rudderstack'

const translations = {
  en: () => en,
  es: () => es,
}



const apiUrl = import.meta.env.VITE_APOLLO_GRAPHQL_URL

const widget = await markerSDK.loadWidget({
  project: '',
})
function App(): JSX.Element {
  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: 'white',
      flex: 1,
    },
  })

  cssGlobal({
    body: {
      margin: 0,
      overflow: 'auto !important',
      overflowX: 'hidden !important',
    },
    a: {
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    },
    ':focus': {
      outline: 'none',
    },
  })
  const [client, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>()
  useEffect(() => {


    async function init() {
      const options = {
        apiUrl,
        storage: sessionStorage,
        controller: StorageController,
        isMobile: false,
      }
      const clientInstance = await createApolloClient(options)
      setApolloClient(clientInstance)

    }

    init().catch(console.error)
  }, [])

  useEffect(() => {
    setI18nConfig(translations)
    rudderanalytics.reset(true)
  }, [])

  if (!client) {
    return <div className={css(styles.safeArea)} />
  }

  return (
    <MediaQueryProvider>
      <ThemeProvider>
        <AuthProvider config={qaConfig}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <SampleRouter />
            </BrowserRouter>
          </ApolloProvider>
        </AuthProvider>
      </ThemeProvider>
    </MediaQueryProvider>
  )
}

export default App
