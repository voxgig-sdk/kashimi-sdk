export interface Capability {
}
export interface CapabilityListMatch {
}
export interface ClientHostedUiCustomizationsOutputDto {
    id?: string;
}
export interface ClientHostedUiCustomizationsOutputDtoLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface CreatePaymentOutputDto {
    amount: number;
    currency: string;
    metadata: Record<string, any>;
    paymentScheme: any;
    provider: any;
    recipient: any;
    remittanceInformation: any;
    sender?: any;
}
export interface CreatePaymentOutputDtoCreateData {
    amount: number;
    currency: string;
    metadata: Record<string, any>;
    paymentScheme: any;
    provider?: any;
    recipient: any;
    remittanceInformation: any;
    sender?: any;
}
export interface CreateTokenOutputDto {
    access_token: string;
    expires_in: number;
    grant_type: string;
    scope: string;
    token_type: string;
}
export interface CreateTokenOutputDtoCreateData {
    access_token: string;
    expires_in: number;
    grant_type: string;
    scope: string;
    token_type: string;
}
export interface Healthcheck {
    details?: Record<string, any>;
    error?: Record<string, any>;
    info?: Record<string, any>;
    status?: string;
}
export interface HealthcheckLoadMatch {
    details?: Record<string, any>;
    error?: Record<string, any>;
    info?: Record<string, any>;
    status?: string;
}
export interface Latest {
    createdAt: string;
    detailedStatus: string;
    failureReasons: any[];
    id: string;
    paymentId: string;
    status: string;
}
export interface LatestListMatch {
    payment_id: string;
}
export interface Obn {
}
export interface ObnLoadMatch {
    provider_id: string;
    state: string;
    $action?: string;
    [action: string]: any;
}
export interface ObnCreateData {
    provider_id: string;
    state: string;
}
export interface ObnUpdateData {
}
export interface Payment {
    amount: number;
    clientId: string;
    createdAt: string;
    currency: string;
    id: string;
    metadata: Record<string, any>;
    paymentScheme: any;
    provider: any;
    recipient: Record<string, any>;
    remittanceInformation: any;
    sender: Record<string, any>;
    status: string;
    updatedAt: string;
}
export interface PaymentLoadMatch {
    id: string;
}
export interface PaymentListMatch {
    cursor_value?: string;
    filters_created_at_from?: string;
    filters_created_at_to?: string;
    filters_metadata_end_to_end_id?: string;
}
export interface PaymentStatus {
    createdAt: string;
    detailedStatus: string;
    failureReasons: any[];
    id: string;
    paymentId: string;
    status: string;
}
export interface PaymentStatusListMatch {
    payment_id: string;
}
export interface Provider {
    bic: string;
    countryCode: string;
    hasSubsidiaries: boolean;
    iconUrl: string;
    id: string;
    logoUrl: string;
    name: string;
    paymentSchemes: any[];
    requiredPaymentFields: any[];
}
export interface ProviderListMatch {
    cursor?: Record<string, any>;
    filter?: Record<string, any>;
}
export interface ProvidersSubsidiaryOutputDto {
    bic: string;
    countryCode: string;
    hasSubsidiaries: boolean;
    iconUrl: string;
    id: string;
    logoUrl: string;
    name: string;
    paymentSchemes: any[];
    requiredPaymentFields: any[];
}
export interface ProvidersSubsidiaryOutputDtoListMatch {
    provider_id: string;
    cursor?: Record<string, any>;
    filter?: Record<string, any>;
}
