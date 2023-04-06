import React, { useState, useEffect } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import dynamicLinks from '@react-native-firebase/dynamic-links'

const useMount = (func) => useEffect(() => func(), [])

export const useInitialURL = () => {
  const [url, setUrl] = useState(null)
  const [processing, setProcessing] = useState(true)

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      // const initialUrl = await Linking.getInitialURL()
      // setTimeout(async () => {
      // await dynamicLinks()
      // 	.getInitialLink()
      // 	.then(dynamicLink => {
      // 		// setUrl(dynamicLink?.url)
      // 		setProcessing(false)
      // 		console.log('DYNAMIC LINK', dynamicLink)
      // 	})
      // 	.catch(err => {
      // 		console.log('ERR', err)
      // 	})
      // }, 2000)
      // console.log('INITIAL URL', initialUrl)
      // The setTimeout is just for testing purpose
      // setTimeout(() => {
      // setUrl(initialUrl)
      // setProcessing(false)
      // }, 1000)
      // if (initialUrl) {
      // }
    }
    // console.log('urlurlurlurl', url)
    getUrlAsync()
  })

  return { url, processing }
}
