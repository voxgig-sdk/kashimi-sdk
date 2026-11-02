# frozen_string_literal: true

# Typed models for the Kashimi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Callback entity data model.
class Callback
end

# Request payload for Callback#load.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
CallbackLoadMatch = Struct.new(
  :provider_id,
  :state,
  keyword_init: true
)

# ClientJwk entity data model.
class ClientJwk
end

# Request payload for ClientJwk#load.
#
# @!attribute [rw] client_id
#   @return [String]
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] revoked
#   @return [Boolean, nil]
ClientJwkLoadMatch = Struct.new(
  :client_id,
  :provider_id,
  :revoked,
  keyword_init: true
)

# ConfirmationData entity data model.
class ConfirmationData
end

# Request payload for ConfirmationData#load.
class ConfirmationDataLoadMatch
end

# ConsentStatus entity data model.
class ConsentStatus
end

# Request payload for ConsentStatus#load.
class ConsentStatusLoadMatch
end

# Country entity data model.
class Country
end

# Request payload for Country#list.
class CountryListMatch
end

# Followup entity data model.
#
# @!attribute [rw] provider
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Object, nil]
Followup = Struct.new(
  :provider,
  :sender,
  keyword_init: true
)

# Request payload for Followup#create.
#
# @!attribute [rw] payment_id
#   @return [String]
#
# @!attribute [rw] provider
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Object, nil]
FollowupCreateData = Struct.new(
  :payment_id,
  :provider,
  :sender,
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

# HostedUiCustomization entity data model.
#
# @!attribute [rw] clientId
#   @return [String]
#
# @!attribute [rw] faviconUrl
#   @return [String]
#
# @!attribute [rw] footerText
#   @return [String]
#
# @!attribute [rw] logoUrl
#   @return [String]
#
# @!attribute [rw] primaryColor
#   @return [String]
#
# @!attribute [rw] privacyPolicyUrl
#   @return [String]
#
# @!attribute [rw] psuPortalBaseUrl
#   @return [String]
#
# @!attribute [rw] termsUrl
#   @return [String]
HostedUiCustomization = Struct.new(
  :clientId,
  :faviconUrl,
  :footerText,
  :logoUrl,
  :primaryColor,
  :privacyPolicyUrl,
  :psuPortalBaseUrl,
  :termsUrl,
  keyword_init: true
)

# Request payload for HostedUiCustomization#load.
#
# @!attribute [rw] client_id
#   @return [String]
HostedUiCustomizationLoadMatch = Struct.new(
  :client_id,
  keyword_init: true
)

# Payment entity data model.
#
# @!attribute [rw] amount
#   @return [Float]
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
# @!attribute [rw] updatedAt
#   @return [String]
Payment = Struct.new(
  :amount,
  :createdAt,
  :currency,
  :id,
  :metadata,
  :paymentScheme,
  :provider,
  :recipient,
  :remittanceInformation,
  :sender,
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

# Request payload for Payment#create.
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
#   @return [Hash]
#
# @!attribute [rw] remittanceInformation
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Hash, nil]
PaymentCreateData = Struct.new(
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

# Request payload for PaymentStatus#load.
#
# @!attribute [rw] payment_id
#   @return [String]
PaymentStatusLoadMatch = Struct.new(
  :payment_id,
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

# PsuProvidedData entity data model.
class PsuProvidedData
end

# Request payload for PsuProvidedData#update.
class PsuProvidedDataUpdateData
end

# Report entity data model.
#
# @!attribute [rw] amount
#   @return [Float]
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
# @!attribute [rw] provider
#   @return [Hash, nil]
#
# @!attribute [rw] recipient
#   @return [Hash]
#
# @!attribute [rw] remittanceInformation
#   @return [Object]
#
# @!attribute [rw] sender
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [String]
Report = Struct.new(
  :amount,
  :createdAt,
  :currency,
  :id,
  :provider,
  :recipient,
  :remittanceInformation,
  :sender,
  :status,
  keyword_init: true
)

# Request payload for Report#load.
#
# @!attribute [rw] id
#   @return [String]
ReportLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# ScaData entity data model.
class ScaData
end

# Request payload for ScaData#load.
class ScaDataLoadMatch
end

# Request payload for ScaData#update.
class ScaDataUpdateData
end

# ScaMethod entity data model.
class ScaMethod
end

# Request payload for ScaMethod#load.
class ScaMethodLoadMatch
end

# Request payload for ScaMethod#update.
class ScaMethodUpdateData
end

# SenderAccount entity data model.
class SenderAccount
end

# Request payload for SenderAccount#load.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] state
#   @return [String]
SenderAccountLoadMatch = Struct.new(
  :provider_id,
  :state,
  keyword_init: true
)

# Request payload for SenderAccount#update.
class SenderAccountUpdateData
end

# Subsidiary entity data model.
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
Subsidiary = Struct.new(
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

# Request payload for Subsidiary#list.
#
# @!attribute [rw] provider_id
#   @return [String]
#
# @!attribute [rw] cursor
#   @return [Hash, nil]
#
# @!attribute [rw] filter
#   @return [Hash, nil]
SubsidiaryListMatch = Struct.new(
  :provider_id,
  :cursor,
  :filter,
  keyword_init: true
)

# Token entity data model.
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
Token = Struct.new(
  :access_token,
  :expires_in,
  :grant_type,
  :scope,
  :token_type,
  keyword_init: true
)

# Request payload for Token#create.
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
TokenCreateData = Struct.new(
  :access_token,
  :expires_in,
  :grant_type,
  :scope,
  :token_type,
  keyword_init: true
)

