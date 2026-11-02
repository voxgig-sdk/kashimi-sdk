# frozen_string_literal: true

# Typed models for the Kashimi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Capability entity data model.
class Capability
end

# Request payload for Capability#list.
class CapabilityListMatch
end

# ClientHostedUiCustomizationsOutputDto entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ClientHostedUiCustomizationsOutputDto = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ClientHostedUiCustomizationsOutputDto#load.
#
# @!attribute [rw] id
#   @return [String]
ClientHostedUiCustomizationsOutputDtoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# CreatePaymentOutputDto entity data model.
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] paymentScheme
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [Object]
#
# @!attribute [rw] recipient
#   @return [Object]
#
# @!attribute [rw] remittanceInformation
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Object, nil]
CreatePaymentOutputDto = Struct.new(
  :amount,
  :currency,
  :metadata,
  :paymentScheme,
  :provider,
  :recipient,
  :remittanceInformation,
  :sender,
  keyword_init: true
)

# Request payload for CreatePaymentOutputDto#create.
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] paymentScheme
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [Object, nil]
#
# @!attribute [rw] recipient
#   @return [Object]
#
# @!attribute [rw] remittanceInformation
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Object, nil]
CreatePaymentOutputDtoCreateData = Struct.new(
  :amount,
  :currency,
  :metadata,
  :paymentScheme,
  :provider,
  :recipient,
  :remittanceInformation,
  :sender,
  keyword_init: true
)

# CreateTokenOutputDto entity data model.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Float]
#
# @!attribute [rw] grant_type
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
CreateTokenOutputDto = Struct.new(
  :access_token,
  :expires_in,
  :grant_type,
  :scope,
  :token_type,
  keyword_init: true
)

# Request payload for CreateTokenOutputDto#create.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Float]
#
# @!attribute [rw] grant_type
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
CreateTokenOutputDtoCreateData = Struct.new(
  :access_token,
  :expires_in,
  :grant_type,
  :scope,
  :token_type,
  keyword_init: true
)

# Healthcheck entity data model.
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] error
#   @return [Hash, nil]
#
# @!attribute [rw] info
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Healthcheck = Struct.new(
  :details,
  :error,
  :info,
  :status,
  keyword_init: true
)

# Request payload for Healthcheck#load.
#
# @!attribute [rw] details
#   @return [Hash, nil]
#
# @!attribute [rw] error
#   @return [Hash, nil]
#
# @!attribute [rw] info
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
HealthcheckLoadMatch = Struct.new(
  :details,
  :error,
  :info,
  :status,
  keyword_init: true
)

# Latest entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] detailedStatus
#   @return [String]
#
# @!attribute [rw] failureReasons
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] paymentId
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
Latest = Struct.new(
  :createdAt,
  :detailedStatus,
  :failureReasons,
  :id,
  :paymentId,
  :status,
  keyword_init: true
)

# Request payload for Latest#list.
#
# @!attribute [rw] payment_id
#   @return [String]
LatestListMatch = Struct.new(
  :payment_id,
  keyword_init: true
)

# Obn entity data model.
class Obn
end

# Request payload for Obn#load.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
ObnLoadMatch = Struct.new(
  :provider_id,
  :state,
  keyword_init: true
)

# Request payload for Obn#create.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
ObnCreateData = Struct.new(
  :provider_id,
  :state,
  keyword_init: true
)

# Request payload for Obn#update.
class ObnUpdateData
end

# Payment entity data model.
#
# @!attribute [rw] amount
#   @return [Float]
#
# @!attribute [rw] clientId
#   @return [String]
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] currency
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] metadata
#   @return [Hash]
#
# @!attribute [rw] paymentScheme
#   @return [Object]
#
# @!attribute [rw] provider
#   @return [Object]
#
# @!attribute [rw] recipient
#   @return [Hash]
#
# @!attribute [rw] remittanceInformation
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Hash]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String]
Payment = Struct.new(
  :amount,
  :clientId,
  :createdAt,
  :currency,
  :id,
  :metadata,
  :paymentScheme,
  :provider,
  :recipient,
  :remittanceInformation,
  :sender,
  :status,
  :updatedAt,
  keyword_init: true
)

# Request payload for Payment#load.
#
# @!attribute [rw] id
#   @return [String]
PaymentLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Payment#list.
#
# @!attribute [rw] cursor_value
#   @return [String, nil]
#
# @!attribute [rw] filters_created_at_from
#   @return [String, nil]
#
# @!attribute [rw] filters_created_at_to
#   @return [String, nil]
#
# @!attribute [rw] filters_metadata_end_to_end_id
#   @return [String, nil]
PaymentListMatch = Struct.new(
  :cursor_value,
  :filters_created_at_from,
  :filters_created_at_to,
  :filters_metadata_end_to_end_id,
  keyword_init: true
)

# PaymentStatus entity data model.
#
# @!attribute [rw] createdAt
#   @return [String]
#
# @!attribute [rw] detailedStatus
#   @return [String]
#
# @!attribute [rw] failureReasons
#   @return [Array]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] paymentId
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
PaymentStatus = Struct.new(
  :createdAt,
  :detailedStatus,
  :failureReasons,
  :id,
  :paymentId,
  :status,
  keyword_init: true
)

# Request payload for PaymentStatus#list.
#
# @!attribute [rw] payment_id
#   @return [String]
PaymentStatusListMatch = Struct.new(
  :payment_id,
  keyword_init: true
)

# Provider entity data model.
#
# @!attribute [rw] bic
#   @return [String]
#
# @!attribute [rw] countryCode
#   @return [String]
#
# @!attribute [rw] hasSubsidiaries
#   @return [Boolean]
#
# @!attribute [rw] iconUrl
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] logoUrl
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] paymentSchemes
#   @return [Array]
#
# @!attribute [rw] requiredPaymentFields
#   @return [Array]
Provider = Struct.new(
  :bic,
  :countryCode,
  :hasSubsidiaries,
  :iconUrl,
  :id,
  :logoUrl,
  :name,
  :paymentSchemes,
  :requiredPaymentFields,
  keyword_init: true
)

# Request payload for Provider#list.
#
# @!attribute [rw] cursor
#   @return [Hash, nil]
#
# @!attribute [rw] filter
#   @return [Hash, nil]
ProviderListMatch = Struct.new(
  :cursor,
  :filter,
  keyword_init: true
)

# ProvidersSubsidiaryOutputDto entity data model.
#
# @!attribute [rw] bic
#   @return [String]
#
# @!attribute [rw] countryCode
#   @return [String]
#
# @!attribute [rw] hasSubsidiaries
#   @return [Boolean]
#
# @!attribute [rw] iconUrl
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] logoUrl
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] paymentSchemes
#   @return [Array]
#
# @!attribute [rw] requiredPaymentFields
#   @return [Array]
ProvidersSubsidiaryOutputDto = Struct.new(
  :bic,
  :countryCode,
  :hasSubsidiaries,
  :iconUrl,
  :id,
  :logoUrl,
  :name,
  :paymentSchemes,
  :requiredPaymentFields,
  keyword_init: true
)

# Request payload for ProvidersSubsidiaryOutputDto#list.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [Hash, nil]
#
# @!attribute [rw] filter
#   @return [Hash, nil]
ProvidersSubsidiaryOutputDtoListMatch = Struct.new(
  :provider_id,
  :cursor,
  :filter,
  keyword_init: true
)

