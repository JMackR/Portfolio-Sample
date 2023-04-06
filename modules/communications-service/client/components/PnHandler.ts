import React from 'react'
import useForegroundMessage from '../hooks/useForegroundMessage'
import useInitialNotification from '../hooks/useInitialNotification'
import { useNotifEventListener } from '../hooks/useNotifEventListener'

export default function PnHandler(props) {
  useInitialNotification(props)
  useForegroundMessage(props)
  useNotifEventListener(props)
  return null
}
