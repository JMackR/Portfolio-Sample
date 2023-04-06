export type QuoteUserInfo = {
  firstName: string
  lastName: string
  suffix?: string
  gender?: string
  email: string
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  longitude?: number
  latitude?: number
  dateOfBirth: string
  maritalStatus: MaritalStatusType
  licenseStatus: LicenseType
  driverLicenseNumber: string
  driverLicenseState: string
  encryptedLicenseNumber?: string
  drivers: DriverInfo[]
  vehicles: VehicleInfo[]
  phoneNumber: string
  coverages: PolicyWideCoverage
  coverageStartDate: string
  quoteData: Policy
  selectedQuoteId: string
  docID: string
  policyholderID: string
  clientSecret?: string | undefined
  paymentIntentId?: string | undefined
  stripeCustomerID?: string | undefined
  documentRequestID?: string | undefined
  quoteID?: string
  policyID?: string
  policyNumber?: string
  documents?: any[]
  amount?: number
  signatureRequestId?: string
  autoPay?: boolean
  dynamicLinkSent?: boolean
  driverVehicleTimeStamp?: string
  activeMember?: boolean
}

export type Address = {
  street1: string
  street2?: string | null
  city: string
  state: string
  zipCode: string
  latitude?: number
  longitude?: number
}

export type LicenseInfo = {
  number: string
  state: string
}

export type DriverInfo = {
  driverAndVehicleDocID?: string
  firstName: string
  lastName: string
  suffix?: string
  title?: string
  driverLicenseNumber?: string
  driverLicenseState?: string
  encryptedLicenseNumber?: string
  licenseStatus?: LicenseType
  address?: Address
  dateOfBirth?: string
  phoneNumber?: string
  maritalStatus?: MaritalStatusType
  relation?: RelationType
  isSelected?: boolean
  isPrimary?: boolean
  isInvited?: boolean
  isExcluded?: boolean
}

export type VehicleInfo = {
  vehicleDocID?: string
  vehicleInternalID?: string
  driverAndVehicleDocID?: string
  vin: string
  vinCheck?: boolean
  encryptedVIN?: string
  title?: string
  year?: string
  model?: string
  make?: string
  vehicleOwnership?: VehicleOwnershipType
  businessUse?: boolean
  ridesharing?: boolean
  commuting?: boolean
  vehicleYearlyMiles?: VehicleMilesType
  isSelected?: boolean
  coverages?: VehicleCoverage
}

export interface PolicyWideCoverage {
  bodilyInjury: CoverageObject
  propertyDamage: CoverageObject
  personalInjury: CoverageObject
  uninsuredMotorist: CoverageObject
  uninsuredProperty: CoverageObject
}

export interface VehicleCoverage {
  comprehensive: VehicleCoverageObject
  collision: VehicleCoverageObject
}

export interface CoverageObject {
  name: string
  isSelected: boolean
  limit: string
}

export interface VehicleCoverageObject {
  name: string
  isSelected: boolean
  deductible: string
}

export type LicenseType = 'V' | 'L' | 'I' | ''
export type GenderType = 'M' | 'F' | 'O' | ''
export type MaritalStatusType = 'S' | 'M' | 'W' | ''
export type VehicleOwnershipType = 'OWN' | 'LEASE' | 'FINANCE' | ''
export type VehicleCommuteType = 'REMOTE' | 'ONCE' | 'TWICE' | 'THRICE' | ''
export type VehicleMilesType = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | ''
export type RelationType = 'S' | 'P' | 'C' | 'SB' | 'OR' | 'O' | 'I' | ''
export type CustomizationModalTypes = 'injury' | 'property' | 'fee-info' | 'personal-injury' | ''

export interface DriverData {
  driverAndVehicleDocID: string
  firstName: string
  lastName: string
  suffix?: string
  driverLicenseNumber: string
  driverLicenseState: string
  isPrimary: boolean
  isSelected: boolean
  maritalStatus: MaritalStatusType
  licenseStatus: LicenseType
  relation: RelationType
  address: Address
  dateOfBirth: string
}

export interface VehicleData {
  vehicleDocID: string
  driverAndVehicleDocID: string
  make: string
  model: string
  vin: string
  year: string
  isSelected: boolean
}

export interface GetQuoteInput extends QuoteUserInfo {
  clientTimeZone?: string
}

// TODO: This should probably extend Person but making these changes right now for speed
// Come back later to change the Person type and extend again
export interface PolicyHolder {
  id: string | null
  policyID: string | null
  firstName: string
  lastName: string
  suffix: string | null
  quote: QuoteInput
}

export interface QuoteInput {
  lineOfBusiness: string
  lengthInMonths: number
  effectiveDate: string
  eDelivery: 'Y' | 'N' | 'No Use'
  coverages: Coverage[]
  drivers: DriverQuoteInfo[]
  vehicles: VehicleQuoteInfo[]
}

interface Coverage {
  name: string
  isSelected: boolean
  limit: string | null
}

interface VehicleQuoteCoverage {
  name: string
  isSelected: boolean
  deductible: string | null
}

interface DriverQuoteInfo extends Person {
  driverAndVehicleDocID: string | null
  isPrimary: boolean
  isExcluded: boolean
}

interface Person {
  firstName: string
  lastName: string
  dateOfBirth: string
  maritalStatus: string
  email: string
  cell: string
  suffix?: string | null
  relation: string
  homeAddress: Address
  mailingAddress: Address
  licenseState: string
  licenseNumber: string
}

interface VehicleQuoteInfo {
  driverAndVehicleDocID: string | null
  vehicleDocID: string | null
  vin: string
  year: string
  make: string
  model: string
  garagingStreetAddress: Address
  licensePlate: string
  licensePlateState: string
  coverages: VehicleQuoteCoverage[]
  ratingData: RatingData
}

interface RatingData {
  ownership: string
  use: string
  weeklyNumberTimesToDrive: string
  yearlyMiles: string
  oemCoverageIncluded: string
}

export interface QuoteResponse {
  id: string
  policy: Policy
}

export interface Policy {
  effectiveDate: string
  expirationDate: string
  id: string
  lengthInMonths: number
  quotes: PaymentQuote[]
  vehicles?: VehicleInfo[]
  drivers?: DriverInfo[]
}

export interface PaymentQuote {
  discountsApplied: Discount[]
  id: string
  name: 'monthly30' | 'payInFull'
  paymentSchedule: PaymentSchedule[]
  totalQuotePremium: number
  premiumByCoverage: PremiumCoverage[]
}

export interface Discount {
  discountAmount: number
  discount: string
  name: string
}

export interface PaymentSchedule {
  amount: number
  date: string
}

export interface PremiumCoverage {
  premium: number
  shortName: string
  vehicleInternalID: string
}

export interface QuoteCoverageInfo {
  coverages: PolicyWideCoverage
  vehicles: VehicleInfo[]
}

export type AddDriverSteps =
  | 'info'
  | 'name'
  | 'address'
  | 'address-entry'
  | 'address-not-found'
  | 'birthday'
  | 'license'
  | 'license-status'
  | 'marital-status'
  | 'relation'
  | ''

export type AddVehicleModalSteps =
  | 'info'
  | 'vehicleInfo'
  | 'vinInfo'
  | 'vin'
  | 'ownership'
  | 'business'
  | 'ridesharing'
  | 'milage'
  | 'commuting'
  | ''
