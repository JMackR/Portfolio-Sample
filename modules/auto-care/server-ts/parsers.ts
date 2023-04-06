import CoverageConfig from './coverages.json'

export const policyParser = ({
  policyholder,
  currentUser,
  includedDrivers,
  updatedFBDrivers,
  customer,
}: {
  policyholder: any
  currentUser: any
  includedDrivers: any
  updatedFBDrivers: any
  customer: any
}) => {
  const parseDrivers = () => {
    const driverArr: {
      firstName: any
      lastName: any
      suffix: any
      phoneNumber: any
      email: any
      isPrimary: any
      isInstalled: any
      isInvited: any
      encryptedLicenseNumber: any
    }[] = []
    includedDrivers.map((driver: any) => {
      const fbDriver = updatedFBDrivers.filter((obj: { firstName: any; lastName: any }) => {
        return obj.firstName === driver.firstName && obj.lastName === driver.lastName
      })

      const result = {
        firstName: driver.firstName,
        lastName: driver.lastName,
        suffix: driver.suffix,
        phoneNumber: driver.cell,
        email: driver.email,
        isPrimary: driver.isPrimary,
        isInstalled: fbDriver[0].isInstalled,
        isInvited: fbDriver[0].isInvited,
        encryptedLicenseNumber: fbDriver[0].encryptedLicenseNumber,
      }
      driverArr.push(result)
    })
    return driverArr
  }
  const result = {
    user: {
      id: policyholder?.id,
      firstName: policyholder?.firstName,
      lastName: policyholder?.lastName,
      suffix: policyholder?.suffix,
      phoneNumber: currentUser[0]?.cell,
      email: currentUser[0]?.email,
    },
    policy: {
      policyID: policyholder?.policy?.id,
      policyNumber: policyholder?.policy?.number,
      effectiveDate: policyholder?.policy.effectiveDate,
      expirationDate: policyholder?.policy.expirationDate,
      status: policyholder?.policy?.status,
    },
    vehicles: policyholder.policy.vehicles.map((vehicle: any) => ({
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
    })),
    coveredDrivers: parseDrivers(),
    coreBilling: {
      stripeCustomerID: customer?.id ? customer?.id : null,
      upcomingPayments: policyholder.policy.paymentDetails.upcomingPaymentSchedule.map((payment: any) => {
        // console.log('PAYMENT', payment)

        return {
          paymentDate: payment.date,
          paymentAmount: payment.amount,
          invoiceID: payment.invoiceID,
          status: payment.status,
        }
      }),
      upcomingPaymentDate: policyholder?.policy?.paymentDetails?.upcomingPaymentSchedule[0]?.date || '',
      upcomingPaymentAmount: policyholder?.policy?.paymentDetails?.upcomingPaymentSchedule[0]?.amount || 0,
      upcomingPaymentInvoiceID: policyholder?.policy?.paymentDetails?.upcomingPaymentSchedule[0]?.invoiceID,
      upcomingPaymentStatus: policyholder?.policy?.paymentDetails?.upcomingPaymentSchedule[0]?.status,
    },
  }
  return result
}
export const policyCoverageParser = (policyCoverage: any) => {
  let updatedObj
  const parsedCoverages: any = []

  policyCoverage.forEach((coverage: any) => {
    const { shortName, isSelected, limit } = coverage
    const config = CoverageConfig['policy-coverages'].filter((coverage) => coverage.name === shortName)
    /**
     * !NOTE:: manually filtering out 'medpay' because it is being returned from pas when it is not supposed to at this time, and breaking resolver in the process ~lexi
     */
    if (isSelected === true && shortName !== 'medpay') {
      updatedObj = {
        name: shortName,
        title: config[0]?.title,
        description: config[0]?.description,
        limit: coverageAmountParser(shortName)[limit],
        icon: config[0]?.icon,
        subContentSuffix: config[0]?.subContentSuffix,
      }
      parsedCoverages.push(updatedObj)
    }
  })
  return parsedCoverages
}

const coverageAmountParser = (coverageName: any) => {
  switch (coverageName) {
    case 'bi':
      return CoverageConfig['coverage-amount-matrix'].bucketCombo
      break
    case 'umUimbi':
      return CoverageConfig['coverage-amount-matrix'].bucketCombo
      break
    case 'pd':
      return CoverageConfig['coverage-amount-matrix'].bucketAccident
      break
    case 'umUimpd':
      return CoverageConfig['coverage-amount-matrix'].bucketAccident
      break
    case 'comp':
      return CoverageConfig['coverage-amount-matrix'].bucketDeductible
      break
    case 'coll':
      return CoverageConfig['coverage-amount-matrix'].bucketDeductible
      break
    case 'pip':
      return CoverageConfig['coverage-amount-matrix'].bucketPerson
      break
    /**
     * !NOTE:: BELOW IS JUST WRITTEN TO KEEP FROM BREAKING. MEDPAY IS NOT SUPPOSED TO BE INCLUDED AT THIS TIME, BUT IS RETURNING FROM PAS, AND SINCE IT IS NOT ACCOUNTED FOR IT BREAKS THE WHOLE PARSER. ~lexi
     */
    case 'medpay':
      return CoverageConfig['coverage-amount-matrix'].bucketDeductible
      break
  }
}

export const vehicleCoverageParser = (vehicles: any) => {
  let updatedObj: any

  vehicles.map((vehicle: any, idx: any) => {
    const { coverages } = vehicle

    const updatedCoverages = coverages.map((coverage: any, index: any) => {
      const { shortName, deductible, isSelected, limit } = coverage
      const config = CoverageConfig['vehicle-coverages'].filter((coverage) => coverage.name === shortName)

      if (isSelected === true && !limit) {
        updatedObj = {
          vehicleName: `${vehicle.make} ${vehicle.model}, ${vehicle.year}`,
          title: config[0].title,
          description: config[0].description,
          deductible: coverageAmountParser(shortName)[deductible],
          icon: config[0].icon,
          subContentSuffix: config[0].subContentSuffix,
        }
      }
      return updatedObj
    })

    vehicles[idx] = {
      vehicleName: `${vehicle.make} ${vehicle.model}, ${vehicle.year}`,
      coverages: updatedCoverages,
    }
  })

  return vehicles
}
