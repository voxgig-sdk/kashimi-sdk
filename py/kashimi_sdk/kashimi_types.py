# Typed models for the Kashimi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Capability(TypedDict):
    pass


class CapabilityListMatch(TypedDict):
    pass


class ClientHostedUiCustomizationsOutputDto(TypedDict, total=False):
    id: str


class ClientHostedUiCustomizationsOutputDtoLoadMatch(TypedDict):
    id: str


class CreatePaymentOutputDtoRequired(TypedDict):
    amount: float
    currency: str
    metadata: dict
    paymentScheme: Any
    provider: Any
    recipient: Any
    remittanceInformation: Any


class CreatePaymentOutputDto(CreatePaymentOutputDtoRequired, total=False):
    sender: Any


class CreatePaymentOutputDtoCreateDataRequired(TypedDict):
    amount: float
    currency: str
    metadata: dict
    paymentScheme: Any
    recipient: Any
    remittanceInformation: Any


class CreatePaymentOutputDtoCreateData(CreatePaymentOutputDtoCreateDataRequired, total=False):
    provider: Any
    sender: Any


class CreateTokenOutputDto(TypedDict):
    access_token: str
    expires_in: float
    grant_type: str
    scope: str
    token_type: str


class CreateTokenOutputDtoCreateData(TypedDict):
    access_token: str
    expires_in: float
    grant_type: str
    scope: str
    token_type: str


class Healthcheck(TypedDict, total=False):
    details: dict
    error: dict
    info: dict
    status: str


class HealthcheckLoadMatch(TypedDict, total=False):
    details: dict
    error: dict
    info: dict
    status: str


class Latest(TypedDict):
    createdAt: str
    detailedStatus: str
    failureReasons: list
    id: str
    paymentId: str
    status: str


class LatestListMatch(TypedDict):
    payment_id: str


class Obn(TypedDict):
    pass


class ObnLoadMatch(TypedDict):
    provider_id: str
    state: str


class ObnCreateData(TypedDict):
    provider_id: str
    state: str


class ObnUpdateData(TypedDict):
    pass


class Payment(TypedDict):
    amount: float
    clientId: str
    createdAt: str
    currency: str
    id: str
    metadata: dict
    paymentScheme: Any
    provider: Any
    recipient: dict
    remittanceInformation: Any
    sender: dict
    status: str
    updatedAt: str


class PaymentLoadMatch(TypedDict):
    id: str


class PaymentListMatch(TypedDict, total=False):
    cursor_value: str
    filters_created_at_from: str
    filters_created_at_to: str
    filters_metadata_end_to_end_id: str


class PaymentStatus(TypedDict):
    createdAt: str
    detailedStatus: str
    failureReasons: list
    id: str
    paymentId: str
    status: str


class PaymentStatusListMatch(TypedDict):
    payment_id: str


class Provider(TypedDict):
    bic: str
    countryCode: str
    hasSubsidiaries: bool
    iconUrl: str
    id: str
    logoUrl: str
    name: str
    paymentSchemes: list
    requiredPaymentFields: list


class ProviderListMatch(TypedDict, total=False):
    cursor: dict
    filter: dict


class ProvidersSubsidiaryOutputDto(TypedDict):
    bic: str
    countryCode: str
    hasSubsidiaries: bool
    iconUrl: str
    id: str
    logoUrl: str
    name: str
    paymentSchemes: list
    requiredPaymentFields: list


class ProvidersSubsidiaryOutputDtoListMatchRequired(TypedDict):
    provider_id: str


class ProvidersSubsidiaryOutputDtoListMatch(ProvidersSubsidiaryOutputDtoListMatchRequired, total=False):
    cursor: dict
    filter: dict
