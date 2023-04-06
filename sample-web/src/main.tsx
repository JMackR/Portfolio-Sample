import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App'
import ErrorFallback from './error-fallback/errorFallback'
import '../../shared-libs/assets/fonts/fieldwork-geo-bold-webfont.ttf'
import '../../shared-libs/assets/fonts/fieldwork-geo-demibold.otf'
import '../../shared-libs/assets/fonts/fieldwork-geo-regular.otf'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
)
