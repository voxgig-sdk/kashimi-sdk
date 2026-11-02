<?php
declare(strict_types=1);

// Typed models for the Kashimi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Callback entity data model. */
class Callback
{
}

/** Request payload for Callback#load. */
class CallbackLoadMatch
{
    public string $provider_id;
    public string $state;
}

/** ClientJwk entity data model. */
class ClientJwk
{
}

/** Request payload for ClientJwk#load. */
class ClientJwkLoadMatch
{
    public string $client_id;
    public string $provider_id;
    public ?bool $revoked = null;
}

/** ConfirmationData entity data model. */
class ConfirmationData
{
}

/** Request payload for ConfirmationData#load. */
class ConfirmationDataLoadMatch
{
}

/** ConsentStatus entity data model. */
class ConsentStatus
{
}

/** Request payload for ConsentStatus#load. */
class ConsentStatusLoadMatch
{
}

/** Country entity data model. */
class Country
{
}

/** Request payload for Country#list. */
class CountryListMatch
{
}

/** Followup entity data model. */
class Followup
{
    public mixed $provider;
    public mixed $sender = null;
}

/** Request payload for Followup#create. */
class FollowupCreateData
{
    public string $payment_id;
    public mixed $provider;
    public mixed $sender = null;
}

/** Healthcheck entity data model. */
class Healthcheck
{
    public ?array $details = null;
    public ?array $error = null;
    public ?array $info = null;
    public ?string $status = null;
}

/** Request payload for Healthcheck#load. */
class HealthcheckLoadMatch
{
    public ?array $details = null;
    public ?array $error = null;
    public ?array $info = null;
    public ?string $status = null;
}

/** HostedUiCustomization entity data model. */
class HostedUiCustomization
{
    public string $clientId;
    public string $faviconUrl;
    public string $footerText;
    public string $logoUrl;
    public string $primaryColor;
    public string $privacyPolicyUrl;
    public string $psuPortalBaseUrl;
    public string $termsUrl;
}

/** Request payload for HostedUiCustomization#load. */
class HostedUiCustomizationLoadMatch
{
    public string $client_id;
}

/** Payment entity data model. */
class Payment
{
    public float $amount;
    public string $createdAt;
    public string $currency;
    public string $id;
    public array $metadata;
    public mixed $paymentScheme;
    public mixed $provider;
    public array $recipient;
    public mixed $remittanceInformation;
    public array $sender;
    public string $updatedAt;
}

/** Request payload for Payment#load. */
class PaymentLoadMatch
{
    public string $id;
}

/** Request payload for Payment#list. */
class PaymentListMatch
{
    public ?string $cursor_value = null;
    public ?string $filters_created_at_from = null;
    public ?string $filters_created_at_to = null;
    public ?string $filters_metadata_end_to_end_id = null;
}

/** Request payload for Payment#create. */
class PaymentCreateData
{
    public float $amount;
    public string $currency;
    public array $metadata;
    public mixed $paymentScheme;
    public mixed $provider = null;
    public array $recipient;
    public mixed $remittanceInformation;
    public ?array $sender = null;
}

/** PaymentStatus entity data model. */
class PaymentStatus
{
    public string $createdAt;
    public string $detailedStatus;
    public array $failureReasons;
    public string $id;
    public string $paymentId;
    public string $status;
}

/** Request payload for PaymentStatus#load. */
class PaymentStatusLoadMatch
{
    public string $payment_id;
}

/** Request payload for PaymentStatus#list. */
class PaymentStatusListMatch
{
    public string $payment_id;
}

/** Provider entity data model. */
class Provider
{
    public string $bic;
    public string $countryCode;
    public bool $hasSubsidiaries;
    public string $iconUrl;
    public string $id;
    public string $logoUrl;
    public string $name;
    public array $paymentSchemes;
    public array $requiredPaymentFields;
}

/** Request payload for Provider#list. */
class ProviderListMatch
{
    public ?array $cursor = null;
    public ?array $filter = null;
}

/** PsuProvidedData entity data model. */
class PsuProvidedData
{
}

/** Request payload for PsuProvidedData#update. */
class PsuProvidedDataUpdateData
{
}

/** Report entity data model. */
class Report
{
    public float $amount;
    public string $createdAt;
    public string $currency;
    public string $id;
    public ?array $provider = null;
    public array $recipient;
    public mixed $remittanceInformation;
    public ?array $sender = null;
    public string $status;
}

/** Request payload for Report#load. */
class ReportLoadMatch
{
    public string $id;
}

/** ScaData entity data model. */
class ScaData
{
}

/** Request payload for ScaData#load. */
class ScaDataLoadMatch
{
}

/** Request payload for ScaData#update. */
class ScaDataUpdateData
{
}

/** ScaMethod entity data model. */
class ScaMethod
{
}

/** Request payload for ScaMethod#load. */
class ScaMethodLoadMatch
{
}

/** Request payload for ScaMethod#update. */
class ScaMethodUpdateData
{
}

/** SenderAccount entity data model. */
class SenderAccount
{
}

/** Request payload for SenderAccount#load. */
class SenderAccountLoadMatch
{
    public string $provider_id;
    public string $state;
}

/** Request payload for SenderAccount#update. */
class SenderAccountUpdateData
{
}

/** Subsidiary entity data model. */
class Subsidiary
{
    public string $bic;
    public string $countryCode;
    public bool $hasSubsidiaries;
    public string $iconUrl;
    public string $id;
    public string $logoUrl;
    public string $name;
    public array $paymentSchemes;
    public array $requiredPaymentFields;
}

/** Request payload for Subsidiary#list. */
class SubsidiaryListMatch
{
    public string $provider_id;
    public ?array $cursor = null;
    public ?array $filter = null;
}

/** Token entity data model. */
class Token
{
    public string $access_token;
    public float $expires_in;
    public string $grant_type;
    public string $scope;
    public string $token_type;
}

/** Request payload for Token#create. */
class TokenCreateData
{
    public string $access_token;
    public float $expires_in;
    public string $grant_type;
    public string $scope;
    public string $token_type;
}

