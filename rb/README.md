# Kashimi Ruby SDK



The Ruby SDK for the Kashimi API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Callback` — with named operations (`list`/`load`/`create`/`update`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/kashimi-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/kashimi-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-kashimi-sdk", path: "./kashimi-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Kashimi_sdk"

client = KashimiSDK.new({
  "apikey" => ENV["KASHIMI_APIKEY"],
})
```

### 3. Load a callback

```ruby
begin
  # load returns the ENTITY — call data_get for the Callback record (raises on error).
  callback = client.Callback.load({ "provider_id" => "example_provider_id", "state" => "example_state" })
  puts callback.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  clientjwk = client.ClientJwk.load({ "client_id" => "example", "provider_id" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = KashimiSDK.test

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
clientjwk = client.ClientJwk.load({ "client_id" => "example", "provider_id" => "example" })
puts clientjwk.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = KashimiSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
KASHIMI_TEST_LIVE=TRUE
KASHIMI_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### KashimiSDK

```ruby
require_relative "Kashimi_sdk"
client = KashimiSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = KashimiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### KashimiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Callback` | `(data) -> CallbackEntity` | Create a Callback entity instance. |
| `ClientJwk` | `(data) -> ClientJwkEntity` | Create a ClientJwk entity instance. |
| `ConfirmationData` | `(data) -> ConfirmationDataEntity` | Create a ConfirmationData entity instance. |
| `ConsentStatus` | `(data) -> ConsentStatusEntity` | Create a ConsentStatus entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Followup` | `(data) -> FollowupEntity` | Create a Followup entity instance. |
| `Healthcheck` | `(data) -> HealthcheckEntity` | Create a Healthcheck entity instance. |
| `HostedUiCustomization` | `(data) -> HostedUiCustomizationEntity` | Create a HostedUiCustomization entity instance. |
| `Payment` | `(data) -> PaymentEntity` | Create a Payment entity instance. |
| `PaymentStatus` | `(data) -> PaymentStatusEntity` | Create a PaymentStatus entity instance. |
| `Provider` | `(data) -> ProviderEntity` | Create a Provider entity instance. |
| `PsuProvidedData` | `(data) -> PsuProvidedDataEntity` | Create a PsuProvidedData entity instance. |
| `Report` | `(data) -> ReportEntity` | Create a Report entity instance. |
| `ScaData` | `(data) -> ScaDataEntity` | Create a ScaData entity instance. |
| `ScaMethod` | `(data) -> ScaMethodEntity` | Create a ScaMethod entity instance. |
| `SenderAccount` | `(data) -> SenderAccountEntity` | Create a SenderAccount entity instance. |
| `Subsidiary` | `(data) -> SubsidiaryEntity` | Create a Subsidiary entity instance. |
| `Token` | `(data) -> TokenEntity` | Create a Token entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`KashimiError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Callback

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/ob/callbacks`

#### ClientJwk

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/ob/client-jwks`

#### ConfirmationData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/ob/payments/decoupled/confirmation-data`

#### ConsentStatus

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/ob/payments/decoupled/consent-status`

#### Country

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/capabilities/providers/countries`

#### Followup

| Field | Description |
| --- | --- |
| `provider` | The provider information for the followup |
| `sender` | The sender information to be used with the payment |

Operations: Create.

API path: `/api/v1/ob/payments/{paymentId}/followups`

#### Healthcheck

| Field | Description |
| --- | --- |
| `details` |  |
| `error` |  |
| `info` |  |
| `status` |  |

Operations: Load.

API path: `/api/status`

#### HostedUiCustomization

| Field | Description |
| --- | --- |
| `clientId` |  |
| `faviconUrl` |  |
| `footerText` |  |
| `id` |  |
| `logoUrl` |  |
| `primaryColor` |  |
| `privacyPolicyUrl` |  |
| `psuPortalBaseUrl` |  |
| `termsUrl` |  |

Operations: Load.

API path: `/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations`

#### Payment

| Field | Description |
| --- | --- |
| `amount` | Payment amount |
| `createdAt` |  |
| `currency` | Currency code |
| `id` | Unique payment identifier |
| `metadata` |  |
| `paymentScheme` | Payment scheme used |
| `provider` | Payment provider details. |
| `recipient` | Data about the party receiving the payment. |
| `remittanceInformation` | Unstructured or structured remittance information. |
| `sender` | Data about the party sending the payment. |
| `updatedAt` |  |

Operations: Create, List, Load.

API path: `/api/v1/ob/payments/cancel`

#### PaymentStatus

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp of status creation |
| `detailedStatus` | Detailed payment status |
| `failureReasons` | Failure reasons (for `status: FAILED` only) |
| `id` | Unique payment status identifier |
| `paymentId` | Unique payment identifier |
| `status` | Payment status. |

Operations: List, Load.

API path: `/api/v1/archive/payment-statuses`

#### Provider

| Field | Description |
| --- | --- |
| `bic` | BIC code of the provider |
| `countryCode` | Country code of the provider. |
| `hasSubsidiaries` | Whether the provider has subsidiaries. |
| `iconUrl` | URL of the provider's icon. |
| `id` | Unique identifier for the provider. |
| `logoUrl` | URL of the provider's logo. |
| `name` | Name of the provider. |
| `paymentSchemes` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | Array of required payment fields for this provider. |

Operations: List.

API path: `/api/v1/capabilities/providers`

#### PsuProvidedData

| Field | Description |
| --- | --- |

Operations: Update.

API path: `/api/v1/ob/payments/psu-provided-data`

#### Report

| Field | Description |
| --- | --- |
| `amount` | Payment amount |
| `createdAt` |  |
| `currency` | Currency code |
| `id` | Unique payment identifier |
| `provider` | Selected provider details (name, country). |
| `recipient` |  |
| `remittanceInformation` |  |
| `sender` |  |
| `status` | The most recent status of the payment. |

Operations: Load.

API path: `/api/v1/reports/payments/{id}`

#### ScaData

| Field | Description |
| --- | --- |

Operations: Load, Update.

API path: `/api/v1/ob/payments/decoupled/sca-data`

#### ScaMethod

| Field | Description |
| --- | --- |

Operations: Load, Update.

API path: `/api/v1/ob/payments/decoupled/sca-methods`

#### SenderAccount

| Field | Description |
| --- | --- |

Operations: Load, Update.

API path: `/api/v1/ob/payments/sender-accounts`

#### Subsidiary

| Field | Description |
| --- | --- |
| `bic` | BIC code of the provider |
| `countryCode` | Country code of the provider. |
| `hasSubsidiaries` | Whether the provider has subsidiaries. |
| `iconUrl` | URL of the provider's icon. |
| `id` | Unique identifier for the provider. |
| `logoUrl` | URL of the provider's logo. |
| `name` | Name of the provider. |
| `paymentSchemes` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | Array of required payment fields for this provider. |

Operations: List.

API path: `/api/v1/capabilities/providers/{id}/subsidiaries`

#### Token

| Field | Description |
| --- | --- |
| `access_token` | The JWT access token. |
| `expires_in` | Expiration time of the token in seconds. |
| `grant_type` | The type of grant being requested. |
| `scope` | Scopes being requested. |
| `token_type` | Token type. |

Operations: Create.

API path: `/api/v1/auth/token`



## Entities


### Callback

Create an instance: `callback = client.Callback`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Callback record (raises on error).
callback = client.Callback.load({ "provider_id" => "provider_id", "state" => "state" })
```


### ClientJwk

Create an instance: `client_jwk = client.ClientJwk`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ClientJwk record (raises on error).
client_jwk = client.ClientJwk.load({ "client_id" => "client_id", "provider_id" => "provider_id" })
```


### ConfirmationData

Create an instance: `confirmation_data = client.ConfirmationData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConfirmationData record (raises on error).
confirmation_data = client.ConfirmationData.load()
```


### ConsentStatus

Create an instance: `consent_status = client.ConsentStatus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ConsentStatus record (raises on error).
consent_status = client.ConsentStatus.load()
```


### Country

Create an instance: `country = client.Country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of Country entities, one per record (raises on error).
countrys = client.Country.list
countrys.each { |item| puts item.data_get }
```


### Followup

Create an instance: `followup = client.Followup`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `provider` | `Object` | The provider information for the followup |
| `sender` | `Object` | The sender information to be used with the payment |

#### Example: Create

```ruby
followup = client.Followup.create({
  "payment_id" => "example_payment_id", # String
  "provider" => "example_provider", # Object
})
```


### Healthcheck

Create an instance: `healthcheck = client.Healthcheck`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Hash` |  |
| `error` | `Hash` |  |
| `info` | `Hash` |  |
| `status` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Healthcheck record (raises on error).
healthcheck = client.Healthcheck.load()
```


### HostedUiCustomization

Create an instance: `hosted_ui_customization = client.HostedUiCustomization`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `String` |  |
| `faviconUrl` | `String` |  |
| `footerText` | `String` |  |
| `id` | `String` |  |
| `logoUrl` | `String` |  |
| `primaryColor` | `String` |  |
| `privacyPolicyUrl` | `String` |  |
| `psuPortalBaseUrl` | `String` |  |
| `termsUrl` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the HostedUiCustomization record (raises on error).
hosted_ui_customization = client.HostedUiCustomization.load({ "id" => "hosted_ui_customization_id" })
```


### Payment

Create an instance: `payment = client.Payment`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | Payment amount |
| `createdAt` | `String` |  |
| `currency` | `String` | Currency code |
| `id` | `String` | Unique payment identifier |
| `metadata` | `Hash` |  |
| `paymentScheme` | `Object` | Payment scheme used |
| `provider` | `Object` | Payment provider details. |
| `recipient` | `Hash` | Data about the party receiving the payment. |
| `remittanceInformation` | `Object` | Unstructured or structured remittance information. |
| `sender` | `Hash` | Data about the party sending the payment. |
| `updatedAt` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Payment record (raises on error).
payment = client.Payment.load({ "id" => "payment_id" })
```

#### Example: List

```ruby
# list returns an Array of Payment entities, one per record (raises on error).
payments = client.Payment.list
payments.each { |item| puts item.data_get }
```

#### Example: Create

```ruby
payment = client.Payment.create({
  "amount" => 1, # Float
  "currency" => "example_currency", # String
  "metadata" => {}, # Hash
  "paymentScheme" => "example_paymentScheme", # Object
  "recipient" => {}, # Hash
  "remittanceInformation" => "example_remittanceInformation", # Object
})
```


### PaymentStatus

Create an instance: `payment_status = client.PaymentStatus`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` | Timestamp of status creation |
| `detailedStatus` | `String` | Detailed payment status |
| `failureReasons` | `Array` | Failure reasons (for `status: FAILED` only) |
| `id` | `String` | Unique payment status identifier |
| `paymentId` | `String` | Unique payment identifier |
| `status` | `String` | Payment status. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PaymentStatus record (raises on error).
payment_status = client.PaymentStatus.load({ "payment_id" => "payment_id" })
```

#### Example: List

```ruby
# list returns an Array of PaymentStatus entities, one per record (raises on error).
payment_statuss = client.PaymentStatus.list({ "payment_id" => "example" })
payment_statuss.each { |item| puts item.data_get }
```


### Provider

Create an instance: `provider = client.Provider`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `String` | BIC code of the provider |
| `countryCode` | `String` | Country code of the provider. |
| `hasSubsidiaries` | `Boolean` | Whether the provider has subsidiaries. |
| `iconUrl` | `String` | URL of the provider's icon. |
| `id` | `String` | Unique identifier for the provider. |
| `logoUrl` | `String` | URL of the provider's logo. |
| `name` | `String` | Name of the provider. |
| `paymentSchemes` | `Array` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `Array` | Array of required payment fields for this provider. |

#### Example: List

```ruby
# list returns an Array of Provider entities, one per record (raises on error).
providers = client.Provider.list
providers.each { |item| puts item.data_get }
```


### PsuProvidedData

Create an instance: `psu_provided_data = client.PsuProvidedData`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### Report

Create an instance: `report = client.Report`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `Float` | Payment amount |
| `createdAt` | `String` |  |
| `currency` | `String` | Currency code |
| `id` | `String` | Unique payment identifier |
| `provider` | `Hash` | Selected provider details (name, country). |
| `recipient` | `Hash` |  |
| `remittanceInformation` | `Object` |  |
| `sender` | `Hash` |  |
| `status` | `String` | The most recent status of the payment. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Report record (raises on error).
report = client.Report.load({ "id" => "report_id" })
```


### ScaData

Create an instance: `sca_data = client.ScaData`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ScaData record (raises on error).
sca_data = client.ScaData.load()
```


### ScaMethod

Create an instance: `sca_method = client.ScaMethod`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ScaMethod record (raises on error).
sca_method = client.ScaMethod.load()
```


### SenderAccount

Create an instance: `sender_account = client.SenderAccount`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SenderAccount record (raises on error).
sender_account = client.SenderAccount.load({ "provider_id" => "provider_id", "state" => "state" })
```


### Subsidiary

Create an instance: `subsidiary = client.Subsidiary`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `String` | BIC code of the provider |
| `countryCode` | `String` | Country code of the provider. |
| `hasSubsidiaries` | `Boolean` | Whether the provider has subsidiaries. |
| `iconUrl` | `String` | URL of the provider's icon. |
| `id` | `String` | Unique identifier for the provider. |
| `logoUrl` | `String` | URL of the provider's logo. |
| `name` | `String` | Name of the provider. |
| `paymentSchemes` | `Array` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `Array` | Array of required payment fields for this provider. |

#### Example: List

```ruby
# list returns an Array of Subsidiary entities, one per record (raises on error).
subsidiarys = client.Subsidiary.list({ "provider_id" => "example" })
subsidiarys.each { |item| puts item.data_get }
```


### Token

Create an instance: `token = client.Token`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `String` | The JWT access token. |
| `expires_in` | `Float` | Expiration time of the token in seconds. |
| `grant_type` | `String` | The type of grant being requested. |
| `scope` | `String` | Scopes being requested. |
| `token_type` | `String` | Token type. |

#### Example: Create

```ruby
token = client.Token.create({
  "access_token" => "example_access_token", # String
  "expires_in" => 1, # Float
  "grant_type" => "example_grant_type", # String
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
})
```

## Features

This SDK ships 10 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`conform`](#conform) | Conform |
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`secrets`](#secrets) | Secrets |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `secrets`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### conform

Conform.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.conform.active` to enable it, then override any of the options above.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### secrets

Secrets.

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

Set `feature.secrets.active` to enable it, then override any of the options above.

`secrets` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **ConformFeature**: Conform
- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **SecretsFeature**: Secrets
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Kashimi_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Kashimi_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
clientjwk = client.ClientJwk
clientjwk.load({ "client_id" => "example", "provider_id" => "example" })

# clientjwk.data_get now returns the clientjwk data from the last load
# clientjwk.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
