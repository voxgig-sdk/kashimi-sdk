# Kashimi API

gatekeeper API

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 18 entities and 26 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Callback](docs/api/callback.html)

The bank redirect back into the hosted payment flow.

SDK operations: `load`.

### [ClientJwk](docs/api/client_jwk.html)

The JSON Web Key Set of a client at a provider.

SDK operations: `load`.

### [ConfirmationData](docs/api/confirmation_data.html)

The confirmation data of a decoupled payment.

Results: Returns the confirmation data for the payment.

SDK operations: `load`.

### [ConsentStatus](docs/api/consent_status.html)

The consent status of a decoupled payment.

Results: Returns the consent status for the payment.

SDK operations: `load`.

### [Country](docs/api/country.html)

A country where Kashimi supports payment providers.

Results: The list of provider countries has been retrieved successfully.

SDK operations: `list`.

### [Followup](docs/api/followup.html)

A follow-up for a payment, created at its provider.

Results: The payment followup has been stored successfully.

SDK operations: `create`.

Key fields to recognise:

- `provider`: The provider information for the followup
- `sender`: The sender information to be used with the payment

### [Healthcheck](docs/api/healthcheck.html)

The status of the API.

Results: The Health Check is successful.

SDK operations: `load`.

### [HostedUiCustomization](docs/api/hosted_ui_customization.html)

The customizations of the hosted payment UI for a client.

Results: The UI customizations have been retrieved successfully.

SDK operations: `load`.

### [Payment](docs/api/payment.html)

A bank payment: initiate one, list yours, load one by id, or cancel one in the hosted flow.

Results: The payment has been cancelled successfully; The payment object has been stored successfully; Returns a page of payments.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `amount`: Payment amount
- `currency`: Currency code
- `id`: Unique payment identifier
- `paymentScheme`: Payment scheme used
- `provider`: Payment provider details.

### [PaymentStatus](docs/api/payment_status.html)

The status of a payment: its full history, or the latest.

Results: Returns all payment statuses for the given payment ID; Returns the latest payment status for the given payment ID.

SDK operations: `list`, `load`.

Key fields to recognise:

- `createdAt`: Timestamp of status creation
- `detailedStatus`: Detailed payment status
- `failureReasons`: Failure reasons (for `status: FAILED` only)
- `id`: Unique payment status identifier
- `paymentId`: Unique payment identifier

### [Provider](docs/api/provider.html)

A bank or payment provider, with its supported payment schemes and required fields.

Results: The list of providers has been retrieved successfully.

SDK operations: `list`.

Key fields to recognise:

- `bic`: BIC code of the provider
- `countryCode`: Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers.
- `hasSubsidiaries`: Whether the provider has subsidiaries. Subsidiaries can be retrieved with GET /capabilities/providers/:providerId/subsidiaries.
- `iconUrl`: URL of the provider&#39;s icon.
- `id`: Unique identifier for the provider. This value should be used in the payment object as providerId.

### [PsuProvidedData](docs/api/psu_provided_data.html)

Data the payer provides in the hosted payment flow.

SDK operations: `update`.

### [Report](docs/api/report.html)

A reporting summary of one payment: amount, status, provider, sender, recipient and remittance information.

SDK operations: `load`.

Key fields to recognise:

- `amount`: Payment amount
- `currency`: Currency code
- `id`: Unique payment identifier
- `provider`: Selected provider details (name, country). Null when the payment has no provider assigned to it.
- `status`: The most recent status of the payment.

### [ScaData](docs/api/sca_data.html)

The strong customer authentication data of a decoupled payment.

Results: Returns the SCA data for the selected SCA method.

SDK operations: `load`, `update`.

### [ScaMethod](docs/api/sca_method.html)

The strong customer authentication methods of a decoupled payment, and the one chosen.

Results: Returns the available SCA methods for the payment.

SDK operations: `load`, `update`.

### [SenderAccount](docs/api/sender_account.html)

The sender accounts offered in the hosted payment flow, and the one chosen.

Results: Returns the sender accounts.

SDK operations: `load`, `update`.

### [Subsidiary](docs/api/subsidiary.html)

A regional or subsidiary institution of a provider.

Results: The list of the provider&#39;s subsidiaries has been retrieved successfully.

SDK operations: `list`.

Key fields to recognise:

- `bic`: BIC code of the provider
- `countryCode`: Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers.
- `hasSubsidiaries`: Whether the provider has subsidiaries. Subsidiaries can be retrieved with GET /capabilities/providers/:providerId/subsidiaries.
- `iconUrl`: URL of the provider&#39;s icon.
- `id`: Unique identifier for the provider. This value should be used in the payment object as providerId.

### [Token](docs/api/token.html)

A short-lived access token, issued for your client credentials.

Results: Returns the access token.

SDK operations: `create`.

Key fields to recognise:

- `access_token`: The JWT access token.
- `expires_in`: Expiration time of the token in seconds.
- `grant_type`: The type of grant being requested.
- `scope`: Scopes being requested.
- `token_type`: Token type.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Callback](docs/api/callback.html) | `load` | `GET /api/v1/ob/callbacks` | See reference |
| [Callback](docs/api/callback.html) | `load` | `GET /api/v1/ob/callbacks/with-provider-nano-id` | See reference |
| [ClientJwk](docs/api/client_jwk.html) | `load` | `GET /api/v1/ob/client-jwks` | See reference |
| [ConfirmationData](docs/api/confirmation_data.html) | `load` | `GET /api/v1/ob/payments/decoupled/confirmation-data` | See reference |
| [ConsentStatus](docs/api/consent_status.html) | `load` | `GET /api/v1/ob/payments/decoupled/consent-status` | See reference |
| [Country](docs/api/country.html) | `list` | `GET /api/v1/capabilities/providers/countries` | Required |
| [Followup](docs/api/followup.html) | `create` | `POST /api/v1/ob/payments/{paymentId}/followups` | Required |
| [Healthcheck](docs/api/healthcheck.html) | `load` | `GET /api/status` | See reference |
| [HostedUiCustomization](docs/api/hosted_ui_customization.html) | `load` | `GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations` | Required |
| [Payment](docs/api/payment.html) | `create` | `POST /api/v1/ob/payments/cancel` | See reference |
| [Payment](docs/api/payment.html) | `create` | `POST /api/v1/ob/payments` | Required |
| [Payment](docs/api/payment.html) | `list` | `GET /api/v1/archive/payments` | Required |
| [Payment](docs/api/payment.html) | `load` | `GET /api/v1/archive/payments/{id}` | Required |
| [PaymentStatus](docs/api/payment_status.html) | `list` | `GET /api/v1/archive/payment-statuses` | Required |
| [PaymentStatus](docs/api/payment_status.html) | `load` | `GET /api/v1/archive/payment-statuses/latest` | Required |
| [Provider](docs/api/provider.html) | `list` | `GET /api/v1/capabilities/providers` | Required |
| [PsuProvidedData](docs/api/psu_provided_data.html) | `update` | `PATCH /api/v1/ob/payments/psu-provided-data` | See reference |
| [Report](docs/api/report.html) | `load` | `GET /api/v1/reports/payments/{id}` | Required |
| [ScaData](docs/api/sca_data.html) | `load` | `GET /api/v1/ob/payments/decoupled/sca-data` | See reference |
| [ScaData](docs/api/sca_data.html) | `update` | `PATCH /api/v1/ob/payments/decoupled/sca-data` | See reference |
| [ScaMethod](docs/api/sca_method.html) | `load` | `GET /api/v1/ob/payments/decoupled/sca-methods` | See reference |
| [ScaMethod](docs/api/sca_method.html) | `update` | `PATCH /api/v1/ob/payments/decoupled/selected-sca-method` | See reference |
| [SenderAccount](docs/api/sender_account.html) | `load` | `GET /api/v1/ob/payments/sender-accounts` | See reference |
| [SenderAccount](docs/api/sender_account.html) | `update` | `PATCH /api/v1/ob/payments/sender-accounts` | See reference |
| [Subsidiary](docs/api/subsidiary.html) | `list` | `GET /api/v1/capabilities/providers/{id}/subsidiaries` | Required |
| [Token](docs/api/token.html) | `create` | `POST /api/v1/auth/token` | See reference |

## Connect to the API

- API server: `https://api.kashimi.tech`

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
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `kashimi_list`: List records for an entity. Supported entities: `country`, `payment`, `payment_status`, `provider`, `subsidiary`.
- `kashimi_load`: Load one record for an entity. Supported entities: `callback`, `client_jwk`, `confirmation_data`, `consent_status`, `healthcheck`, `hosted_ui_customization`, `payment`, `payment_status`, `report`, `sca_data`, `sca_method`, `sender_account`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`secrets`](docs/features/secrets.html): Secret access: resolve the API credential through a provider chain, and exchange a refresh token for short-lived access tokens
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

