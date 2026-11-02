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

/** Capability entity data model. */
class Capability
{
}

/** Request payload for Capability#list. */
class CapabilityListMatch
{
}

/** ClientHostedUiCustomizationsOutputDto entity data model. */
class ClientHostedUiCustomizationsOutputDto
{
    public ?string $id = null;
}

/** Request payload for ClientHostedUiCustomizationsOutputDto#load. */
class ClientHostedUiCustomizationsOutputDtoLoadMatch
{
    public string $id;
}

/** CreatePaymentOutputDto entity data model. */
class CreatePaymentOutputDto
{
    public float $amount;
    public string $currency;
    public array $metadata;
    public mixed $paymentScheme;
    public mixed $provider;
    public mixed $recipient;
    public mixed $remittanceInformation;
    public mixed $sender = null;
}

/** Request payload for CreatePaymentOutputDto#create. */
class CreatePaymentOutputDtoCreateData
{
    public float $amount;
    public string $currency;
    public array $metadata;
    public mixed $paymentScheme;
    public mixed $provider = null;
    public mixed $recipient;
    public mixed $remittanceInformation;
    public mixed $sender = null;
}

/** CreateTokenOutputDto entity data model. */
class CreateTokenOutputDto
{
    public string $access_token;
    public float $expires_in;
    public string $grant_type;
    public string $scope;
    public string $token_type;
}

/** Request payload for CreateTokenOutputDto#create. */
class CreateTokenOutputDtoCreateData
{
    public string $access_token;
    public float $expires_in;
    public string $grant_type;
    public string $scope;
    public string $token_type;
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

/** Latest entity data model. */
class Latest
{
    public string $createdAt;
    public string $detailedStatus;
    public array $failureReasons;
    public string $id;
    public string $paymentId;
    public string $status;
}

/** Request payload for Latest#list. */
class LatestListMatch
{
    public string $payment_id;
}

/** Obn entity data model. */
class Obn
{
}

/** Request payload for Obn#load. */
class ObnLoadMatch
{
    public string $provider_id;
    public string $state;
}

/** Request payload for Obn#create. */
class ObnCreateData
{
    public string $provider_id;
    public string $state;
}

/** Request payload for Obn#update. */
class ObnUpdateData
{
}

/** Payment entity data model. */
class Payment
{
    public float $amount;
    public string $clientId;
    public string $createdAt;
    public string $currency;
    public string $id;
    public array $metadata;
    public mixed $paymentScheme;
    public mixed $provider;
    public array $recipient;
    public mixed $remittanceInformation;
    public array $sender;
    public string $status;
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

/** ProvidersSubsidiaryOutputDto entity data model. */
class ProvidersSubsidiaryOutputDto
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

/** Request payload for ProvidersSubsidiaryOutputDto#list. */
class ProvidersSubsidiaryOutputDtoListMatch
{
    public string $provider_id;
    public ?array $cursor = null;
    public ?array $filter = null;
}

