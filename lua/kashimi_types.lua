-- Typed models for the Kashimi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Callback

---@class CallbackLoadMatch
---@field provider_id string
---@field state string

---@class ClientJwk

---@class ClientJwkLoadMatch
---@field client_id string
---@field provider_id string
---@field revoked? boolean

---@class ConfirmationData

---@class ConfirmationDataLoadMatch

---@class ConsentStatus

---@class ConsentStatusLoadMatch

---@class Country

---@class CountryListMatch

---@class Followup
---@field provider any
---@field sender? any

---@class FollowupCreateData
---@field payment_id string
---@field provider any
---@field sender? any

---@class Healthcheck
---@field details? table
---@field error? table
---@field info? table
---@field status? string

---@class HealthcheckLoadMatch
---@field details? table
---@field error? table
---@field info? table
---@field status? string

---@class HostedUiCustomization
---@field clientId string
---@field faviconUrl string
---@field footerText string
---@field id? string
---@field logoUrl string
---@field primaryColor string
---@field privacyPolicyUrl string
---@field psuPortalBaseUrl string
---@field termsUrl string

---@class HostedUiCustomizationLoadMatch
---@field id string

---@class Payment
---@field amount number
---@field createdAt string
---@field currency string
---@field id string
---@field metadata table
---@field paymentScheme any
---@field provider any
---@field recipient table
---@field remittanceInformation any
---@field sender table
---@field updatedAt string

---@class PaymentLoadMatch
---@field id string

---@class PaymentListMatch
---@field cursor_value? string
---@field filters_created_at_from? string
---@field filters_created_at_to? string
---@field filters_metadata_end_to_end_id? string

---@class PaymentCreateData
---@field amount number
---@field currency string
---@field metadata table
---@field paymentScheme any
---@field provider? any
---@field recipient table
---@field remittanceInformation any
---@field sender? table

---@class PaymentStatus
---@field createdAt string
---@field detailedStatus string
---@field failureReasons table
---@field id string
---@field paymentId string
---@field status string

---@class PaymentStatusLoadMatch
---@field payment_id string

---@class PaymentStatusListMatch
---@field payment_id string

---@class Provider
---@field bic string
---@field countryCode string
---@field hasSubsidiaries boolean
---@field iconUrl string
---@field id string
---@field logoUrl string
---@field name string
---@field paymentSchemes table
---@field requiredPaymentFields table

---@class ProviderListMatch
---@field cursor? table
---@field filter? table

---@class PsuProvidedData

---@class PsuProvidedDataUpdateData

---@class Report
---@field amount number
---@field createdAt string
---@field currency string
---@field id string
---@field provider? table
---@field recipient table
---@field remittanceInformation any
---@field sender? table
---@field status string

---@class ReportLoadMatch
---@field id string

---@class ScaData

---@class ScaDataLoadMatch

---@class ScaDataUpdateData

---@class ScaMethod

---@class ScaMethodLoadMatch

---@class ScaMethodUpdateData

---@class SenderAccount

---@class SenderAccountLoadMatch
---@field provider_id string
---@field state string

---@class SenderAccountUpdateData

---@class Subsidiary
---@field bic string
---@field countryCode string
---@field hasSubsidiaries boolean
---@field iconUrl string
---@field id string
---@field logoUrl string
---@field name string
---@field paymentSchemes table
---@field requiredPaymentFields table

---@class SubsidiaryListMatch
---@field provider_id string
---@field cursor? table
---@field filter? table

---@class Token
---@field access_token string
---@field expires_in number
---@field grant_type string
---@field scope string
---@field token_type string

---@class TokenCreateData
---@field access_token string
---@field expires_in number
---@field grant_type string
---@field scope string
---@field token_type string

local M = {}

return M
