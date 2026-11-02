# Gatekeeper docs

gatekeeper API

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 11 entities and 29 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Capability

Results: The list of provider countries has been retrieved successfully.

SDK operations: `list`.

### ClientHostedUiCustomizationsOutputDto

Results: The UI customizations have been retrieved successfully.

SDK operations: `load`.

### CreatePaymentOutputDto

Results: The payment followup has been stored successfully; The payment object has been stored successfully.

SDK operations: `create`.

Key fields to recognise:

- `amount`: The amount to be transferred.
- `currency`: The currency of the payment.
- `paymentScheme`: Payment scheme.
- `provider`: The provider information for the followup
- `recipient`: Data about the party receiving the payment.

### CreateTokenOutputDto

Results: Returns the access token.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: The JWT access token.
- `expires_in`: Expiration time of the token in seconds.
- `grant_type`: The type of grant being requested.
- `scope`: Scopes being requested.
- `token_type`: Token type.

### Healthcheck

Results: The Health Check is successful.

SDK operations: `load`.

### Latest

Results: Returns the latest payment status for the given payment ID.

SDK operations: `list`.

Key fields to recognise:

- `createdAt`: Timestamp of status creation
- `detailedStatus`: Detailed payment status
- `failureReasons`: Failure reasons (for `status: FAILED` only)
- `id`: Unique payment status identifier
- `paymentId`: Unique payment identifier

### Obn

Results: The payment has been cancelled successfully; Returns the sender accounts.; Returns the confirmation data for the payment.; Returns the consent status for the payment.; Returns the SCA data for the selected SCA method.; Returns the available SCA methods for the payment.

SDK operations: `create`, `load`, `update`.

### Payment

Results: Returns a page of payments.

SDK operations: `list`, `load`.

Key fields to recognise:

- `amount`: Payment amount
- `clientId`: Client identifier
- `currency`: Currency code
- `id`: Unique payment identifier
- `paymentScheme`: Payment scheme used

### PaymentStatus

Results: Returns all payment statuses for the given payment ID.

SDK operations: `list`.

Key fields to recognise:

- `createdAt`: Timestamp of status creation
- `detailedStatus`: Detailed payment status
- `failureReasons`: Failure reasons (for `status: FAILED` only)
- `id`: Unique payment status identifier
- `paymentId`: Unique payment identifier

### Provider

Results: The list of providers has been retrieved successfully.

SDK operations: `list`.

Key fields to recognise:

- `bic`: BIC code of the provider
- `countryCode`: Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers.
- `hasSubsidiaries`: Whether the provider has subsidiaries. Subsidiaries can be retrieved with GET /capabilities/providers/:providerId/subsidiaries.
- `iconUrl`: URL of the provider&#39;s icon.
- `id`: Unique identifier for the provider. This value should be used in the payment object as providerId.

### ProvidersSubsidiaryOutputDto

Results: The list of the provider&#39;s subsidiaries has been retrieved successfully.

SDK operations: `list`.

Key fields to recognise:

- `bic`: BIC code of the provider
- `countryCode`: Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers.
- `hasSubsidiaries`: Whether the provider has subsidiaries. Subsidiaries can be retrieved with GET /capabilities/providers/:providerId/subsidiaries.
- `iconUrl`: URL of the provider&#39;s icon.
- `id`: Unique identifier for the provider. This value should be used in the payment object as providerId.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Capability | `list` | `GET /api/v1/capabilities/providers/countries` | Required |
| ClientHostedUiCustomizationsOutputDto | `load` | `GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations` | Required |
| CreatePaymentOutputDto | `create` | `POST /api/v1/ob/payments/{paymentId}/followups` | Required |
| CreatePaymentOutputDto | `create` | `POST /api/v1/ob/payments` | Required |
| CreateTokenOutputDto | `create` | `POST /api/v1/auth/token` | See reference |
| Healthcheck | `load` | `GET /api/status` | See reference |
| Latest | `list` | `GET /api/v1/archive/payment-statuses/latest` | Required |
| Obn | `create` | `POST /api/v1/ob/payments/cancel` | See reference |
| Obn | `load` | `GET /api/v1/ob/callbacks` | See reference |
| Obn | `load` | `GET /api/v1/ob/client-jwks` | See reference |
| Obn | `load` | `GET /api/v1/ob/payments/sender-accounts` | See reference |
| Obn | `load` | `GET /api/v1/ob/callbacks/with-provider-nano-id` | See reference |
| Obn | `load` | `GET /api/v1/ob/payments/decoupled/confirmation-data` | See reference |
| Obn | `load` | `GET /api/v1/ob/payments/decoupled/consent-status` | See reference |
| Obn | `load` | `GET /api/v1/ob/payments/decoupled/sca-data` | See reference |
| Obn | `load` | `GET /api/v1/ob/payments/decoupled/sca-methods` | See reference |
| Obn | `update` | `PATCH /api/v1/ob/payments/decoupled/sca-data` | See reference |
| Obn | `update` | `PATCH /api/v1/ob/payments/decoupled/selected-sca-method` | See reference |
| Obn | `update` | `PATCH /api/v1/ob/payments/psu-provided-data` | See reference |
| Obn | `update` | `PATCH /api/v1/ob/payments/sender-accounts` | See reference |
| Payment | `list` | `GET /api/v1/archive/payments` | Required |
| Payment | `load` | `GET /api/v1/archive/internal/payments/{id}` | Required |
| Payment | `load` | `GET /api/v1/archive/payments/{id}` | Required |
| Payment | `load` | `GET /api/v1/reports/payments/{id}` | Required |
| PaymentStatus | `list` | `GET /api/v1/archive/payment-statuses` | Required |
| Provider | `list` | `GET /api/v1/capabilities/internal/providers` | Required |
| Provider | `list` | `GET /api/v1/capabilities/providers` | Required |
| ProvidersSubsidiaryOutputDto | `list` | `GET /api/v1/capabilities/internal/providers/{id}/subsidiaries` | Required |
| ProvidersSubsidiaryOutputDto | `list` | `GET /api/v1/capabilities/providers/{id}/subsidiaries` | Required |

## Connect to the API

- API server: `{base}`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `kashimi_list`: List records for an entity. Supported entities: `capability`, `latest`, `payment`, `payment_status`, `provider`, `providers_subsidiary_output_dto`.
- `kashimi_load`: Load one record for an entity. Supported entities: `client_hosted_ui_customizations_output_dto`, `healthcheck`, `obn`, `payment`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `secrets`: Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

