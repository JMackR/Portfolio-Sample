import React from 'react'

import {
  AddressEntryPage,
  BirthdayEntryPage,
  EmailDobEntryPage,
  LicenseEntryPage,
  LicenseStatusEntryPage,
  MaritalStatusEntryPage,
  NameEntryPage,
  PaymentPlanPage,
  PhoneEntryPage,
  QuoteCustomizationPage,
  QuoteSummaryPage,
  DriverSelectionPage,
  VehicleSelectionPage,
  PaymentEntryPage,
  PaymentSuccessPage,
  SignatureEntryPage,
  HelloSignIntroPage,
  CodeVerificationPage,
  FailedAddressEntryPage,
  QuoteDataLoader,
  UbiOptInPage,
  DownloadAppPage,
} from '@auto/quote-client'
import { Page, PageBody } from '@sample/widgets'
import { Header } from '@sample/widgets/header'
import type { RouteObject } from 'react-router-dom'
import { Outlet, useRoutes, Navigate } from 'react-router-dom'
import { Page404 } from './404'

function Layout() {
  return (
    <Page>
      <Header />
      <PageBody>
        <Outlet />
      </PageBody>
      {/* Removing the footer for now, as we decided it's not needed for initial quote flow */}
      {/* <Footer /> */}
    </Page>
  )
}

export const SampleRouter = () => {
  return <InnerRouter />
}

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/quote/name-entry" />,
        },
        {
          path: '/quote/*',
          element: <QuoteDataLoader />,
          children: [
            {
              path: 'name-entry',
              element: <NameEntryPage />,
            },
            // {
            //   path: '/quote/gender-entry',
            //   element: <GenderEntryPage />,
            // },
            {
              path: 'email-dob-entry',
              element: <EmailDobEntryPage />,
            },
            {
              path: 'address-entry',
              element: <AddressEntryPage />,
            },
            {
              path: 'address-not-found',
              element: <FailedAddressEntryPage />,
            },
            {
              path: 'birthday-entry',
              element: <BirthdayEntryPage />,
            },
            {
              path: 'ubi-opt-in',
              element: <UbiOptInPage />,
            },
            {
              path: 'license-status-entry',
              element: <LicenseStatusEntryPage />,
            },
            {
              path: 'marital-entry',
              element: <MaritalStatusEntryPage />,
            },
            {
              path: 'license-entry',
              element: <LicenseEntryPage />,
            },
            {
              path: 'driver/*',
              element: <DriverSelectionPage />,
            },
            {
              path: 'vehicle/*',
              element: <VehicleSelectionPage />,
            },
            {
              path: 'phone-entry',
              element: <PhoneEntryPage />,
            },
            {
              path: 'code-validation',
              element: <CodeVerificationPage />,
            },
            {
              path: 'customization',
              element: <QuoteCustomizationPage />,
            },
            {
              path: 'signature-entry',
              element: <SignatureEntryPage />,
            },
            {
              path: 'payment-entry',
              element: <PaymentEntryPage />,
            },
            {
              path: 'payment-success',
              element: <PaymentSuccessPage />,
            },
            {
              path: 'welcome',
              element: <DownloadAppPage />,
            },
          ],
        },
        {
          path: '*',
          element: <Page404 />,
        },
      ],
    },
  ]
  const element = useRoutes(routes)
  console.log('ELEMENT', element)

  return element
}
