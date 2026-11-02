-- Typed models for the Kashimi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Capability

---@class CapabilityListMatch

---@class ClientHostedUiCustomizationsOutputDto
---@field id? string

---@class ClientHostedUiCustomizationsOutputDtoLoadMatch
---@field id string

---@class CreatePaymentOutputDto
---@field amount number
---@field currency string
---@field metadata table
---@field paymentScheme any
---@field provider any
---@field recipient any
---@field remittanceInformation any
---@field sender? any

---@class CreatePaymentOutputDtoCreateData
---@field amount number
---@field currency string
---@field metadata table
---@field paymentScheme any
---@field provider? any
---@field recipient any
---@field remittanceInformation any
---@field sender? any

---@class CreateTokenOutputDto
---@field access_token string
---@field expires_in number
---@field grant_type string
---@field scope string
---@field token_type string

---@class CreateTokenOutputDtoCreateData
---@field access_token string
---@field expires_in number
---@field grant_type string
---@field scope string
---@field token_type string

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

---@class Latest
---@field createdAt string
---@field detailedStatus string
---@field failureReasons table
---@field id string
---@field paymentId string
---@field status string

---@class LatestListMatch
---@field payment_id string

---@class Obn

---@class ObnLoadMatch
---@field provider_id string
---@field state string

---@class ObnCreateData
---@field provider_id string
---@field state string

---@class ObnUpdateData

---@class Payment
---@field amount number
---@field clientId string
---@field createdAt string
---@field currency string
---@field id string
---@field metadata table
---@field paymentScheme any
---@field provider any
---@field recipient table
---@field remittanceInformation any
---@field sender table
---@field status string
---@field updatedAt string

---@class PaymentLoadMatch
---@field id string

---@class PaymentListMatch
---@field cursor_value? string
---@field filters_created_at_from? string
---@field filters_created_at_to? string
---@field filters_metadata_end_to_end_id? string

---@class PaymentStatus
---@field createdAt string
---@field detailedStatus string
---@field failureReasons table
---@field id string
---@field paymentId string
---@field status string

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

---@class ProvidersSubsidiaryOutputDto
---@field bic string
---@field countryCode string
---@field hasSubsidiaries boolean
---@field iconUrl string
---@field id string
---@field logoUrl string
---@field name string
---@field paymentSchemes table
---@field requiredPaymentFields table

---@class ProvidersSubsidiaryOutputDtoListMatch
---@field provider_id string
---@field cursor? table
---@field filter? table

local M = {}

return M
