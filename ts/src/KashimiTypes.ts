// Typed models for the Kashimi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Callback {
}

export interface CallbackLoadMatch {
  provider_id: string
  state: string

  // Selects a custom action instead of the plain load:
  //   'with-provider-nano-id'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ClientJwk {
}

export interface ClientJwkLoadMatch {
  client_id: string
  provider_id: string
  revoked?: boolean
}

export interface ConfirmationData {
}

export interface ConfirmationDataLoadMatch {
}

export interface ConsentStatus {
}

export interface ConsentStatusLoadMatch {
}

export interface Country {
}

export interface CountryListMatch {
}

export interface Followup {
  provider: any
  sender?: any
}

export interface FollowupCreateData {
  payment_id: string
  provider: any
  sender?: any
}

export interface Healthcheck {
  details?: Record<string, any>
  error?: Record<string, any>
  info?: Record<string, any>
  status?: string
}

export interface HealthcheckLoadMatch {
  details?: Record<string, any>
  error?: Record<string, any>
  info?: Record<string, any>
  status?: string
}

export interface HostedUiCustomization {
  clientId: string
  faviconUrl: string
  footerText: string
  logoUrl: string
  primaryColor: string
  privacyPolicyUrl: string
  psuPortalBaseUrl: string
  termsUrl: string
}

export interface HostedUiCustomizationLoadMatch {
  client_id: string
}

export interface Payment {
  amount: number
  createdAt: string
  currency: string
  id: string
  metadata: Record<string, any>
  paymentScheme: any
  provider: any
  recipient: Record<string, any>
  remittanceInformation: any
  sender: Record<string, any>
  updatedAt: string
}

export interface PaymentLoadMatch {
  id: string
}

export interface PaymentListMatch {
  cursor_value?: string
  filters_created_at_from?: string
  filters_created_at_to?: string
  filters_metadata_end_to_end_id?: string
}

export interface PaymentCreateData {
  amount: number
  currency: string
  metadata: Record<string, any>
  paymentScheme: any
  provider?: any
  recipient: Record<string, any>
  remittanceInformation: any
  sender?: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PaymentStatus {
  createdAt: string
  detailedStatus: string
  failureReasons: any[]
  id: string
  paymentId: string
  status: string
}

export interface PaymentStatusLoadMatch {
  payment_id: string

  // Selects a custom action instead of the plain load:
  //   'latest'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PaymentStatusListMatch {
  payment_id: string
}

export interface Provider {
  bic: string
  countryCode: string
  hasSubsidiaries: boolean
  iconUrl: string
  id: string
  logoUrl: string
  name: string
  paymentSchemes: any[]
  requiredPaymentFields: any[]
}

export interface ProviderListMatch {
  cursor?: Record<string, any>
  filter?: Record<string, any>
}

export interface PsuProvidedData {
}

export interface PsuProvidedDataUpdateData {
}

export interface Report {
  amount: number
  createdAt: string
  currency: string
  id: string
  provider?: Record<string, any>
  recipient: Record<string, any>
  remittanceInformation: any
  sender?: Record<string, any>
  status: string
}

export interface ReportLoadMatch {
  id: string
}

export interface ScaData {
}

export interface ScaDataLoadMatch {
}

export interface ScaDataUpdateData {
}

export interface ScaMethod {
}

export interface ScaMethodLoadMatch {
}

export interface ScaMethodUpdateData {
}

export interface SenderAccount {
}

export interface SenderAccountLoadMatch {
  provider_id: string
  state: string
}

export interface SenderAccountUpdateData {
}

export interface Subsidiary {
  bic: string
  countryCode: string
  hasSubsidiaries: boolean
  iconUrl: string
  id: string
  logoUrl: string
  name: string
  paymentSchemes: any[]
  requiredPaymentFields: any[]
}

export interface SubsidiaryListMatch {
  provider_id: string
  cursor?: Record<string, any>
  filter?: Record<string, any>
}

export interface Token {
  access_token: string
  expires_in: number
  grant_type: string
  scope: string
  token_type: string
}

export interface TokenCreateData {
  access_token: string
  expires_in: number
  grant_type: string
  scope: string
  token_type: string
}

