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


class Callback(TypedDict):
    pass


class CallbackLoadMatch(TypedDict):
    provider_id: str
    state: str


class ClientJwk(TypedDict):
    pass


class ClientJwkLoadMatchRequired(TypedDict):
    client_id: str
    provider_id: str


class ClientJwkLoadMatch(ClientJwkLoadMatchRequired, total=False):
    revoked: bool


class ConfirmationData(TypedDict):
    pass


class ConfirmationDataLoadMatch(TypedDict):
    pass


class ConsentStatus(TypedDict):
    pass


class ConsentStatusLoadMatch(TypedDict):
    pass


class Country(TypedDict):
    pass


class CountryListMatch(TypedDict):
    pass


class FollowupRequired(TypedDict):
    provider: Any


class Followup(FollowupRequired, total=False):
    sender: Any


class FollowupCreateDataRequired(TypedDict):
    payment_id: str
    provider: Any


class FollowupCreateData(FollowupCreateDataRequired, total=False):
    sender: Any


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


class HostedUiCustomizationRequired(TypedDict):
    clientId: str
    faviconUrl: str
    footerText: str
    logoUrl: str
    primaryColor: str
    privacyPolicyUrl: str
    psuPortalBaseUrl: str
    termsUrl: str


class HostedUiCustomization(HostedUiCustomizationRequired, total=False):
    id: str


class HostedUiCustomizationLoadMatch(TypedDict):
    id: str


class Payment(TypedDict):
    amount: float
    createdAt: str
    currency: str
    id: str
    metadata: dict
    paymentScheme: Any
    provider: Any
    recipient: dict
    remittanceInformation: Any
    sender: dict
    updatedAt: str


class PaymentLoadMatch(TypedDict):
    id: str


class PaymentListMatch(TypedDict, total=False):
    cursor_value: str
    filters_created_at_from: str
    filters_created_at_to: str
    filters_metadata_end_to_end_id: str


class PaymentCreateDataRequired(TypedDict):
    amount: float
    currency: str
    metadata: dict
    paymentScheme: Any
    recipient: dict
    remittanceInformation: Any


class PaymentCreateData(PaymentCreateDataRequired, total=False):
    provider: Any
    sender: dict


class PaymentStatus(TypedDict):
    createdAt: str
    detailedStatus: str
    failureReasons: list
    id: str
    paymentId: str
    status: str


class PaymentStatusLoadMatch(TypedDict):
    payment_id: str


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


class PsuProvidedData(TypedDict):
    pass


class PsuProvidedDataUpdateData(TypedDict):
    pass


class ReportRequired(TypedDict):
    amount: float
    createdAt: str
    currency: str
    id: str
    recipient: dict
    remittanceInformation: Any
    status: str


class Report(ReportRequired, total=False):
    provider: dict
    sender: dict


class ReportLoadMatch(TypedDict):
    id: str


class ScaData(TypedDict):
    pass


class ScaDataLoadMatch(TypedDict):
    pass


class ScaDataUpdateData(TypedDict):
    pass


class ScaMethod(TypedDict):
    pass


class ScaMethodLoadMatch(TypedDict):
    pass


class ScaMethodUpdateData(TypedDict):
    pass


class SenderAccount(TypedDict):
    pass


class SenderAccountLoadMatch(TypedDict):
    provider_id: str
    state: str


class SenderAccountUpdateData(TypedDict):
    pass


class Subsidiary(TypedDict):
    bic: str
    countryCode: str
    hasSubsidiaries: bool
    iconUrl: str
    id: str
    logoUrl: str
    name: str
    paymentSchemes: list
    requiredPaymentFields: list


class SubsidiaryListMatchRequired(TypedDict):
    provider_id: str


class SubsidiaryListMatch(SubsidiaryListMatchRequired, total=False):
    cursor: dict
    filter: dict


class Token(TypedDict):
    access_token: str
    expires_in: float
    grant_type: str
    scope: str
    token_type: str


class TokenCreateData(TypedDict):
    access_token: str
    expires_in: float
    grant_type: str
    scope: str
    token_type: str
