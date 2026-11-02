# Kashimi Lua SDK



The Lua SDK for the Kashimi API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Callback()` — each with the same small set of operations (`list`, `load`, `create`, `update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/kashimi-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("kashimi_sdk")

local client = sdk.new({
  apikey = os.getenv("KASHIMI_APIKEY"),
})
```

### 3. Load a callback

`load` returns the entity; `data_get()` reads its record.

```lua
local callback, err = client:Callback():load({ provider_id = "example_provider_id", state = "example_state" })
if err then error(err) end
for k, val in pairs(callback:data_get()) do print(k, val) end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local clientjwk, err = client:ClientJwk():load({ client_id = "example", provider_id = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ClientJwk():load({ client_id = "example", provider_id = "example" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### KashimiSDK

```lua
local sdk = require("kashimi_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### KashimiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity, and return it. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local callback, err = client:Callback():load({ provider_id = "example", state = "example" })
    if err then error(err) end
    -- callback is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local callback = client:Callback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local callback, err = client:Callback():load({ provider_id = "provider_id", state = "state" })
```


### ClientJwk

Create an instance: `local client_jwk = client:ClientJwk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local client_jwk, err = client:ClientJwk():load({ client_id = "client_id", provider_id = "provider_id" })
```


### ConfirmationData

Create an instance: `local confirmation_data = client:ConfirmationData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local confirmation_data, err = client:ConfirmationData():load()
```


### ConsentStatus

Create an instance: `local consent_status = client:ConsentStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local consent_status, err = client:ConsentStatus():load()
```


### Country

Create an instance: `local country = client:Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local countrys, err = client:Country():list()
```


### Followup

Create an instance: `local followup = client:Followup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `provider` | `any` | The provider information for the followup |
| `sender` | `any` | The sender information to be used with the payment |

#### Example: Create

```lua
local followup, err = client:Followup():create({
  payment_id = "example_payment_id", -- string
  provider = "example_provider", -- any
})
```


### Healthcheck

Create an instance: `local healthcheck = client:Healthcheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `table` |  |
| `error` | `table` |  |
| `info` | `table` |  |
| `status` | `string` |  |

#### Example: Load

```lua
local healthcheck, err = client:Healthcheck():load()
```


### HostedUiCustomization

Create an instance: `local hosted_ui_customization = client:HostedUiCustomization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` |  |
| `faviconUrl` | `string` |  |
| `footerText` | `string` |  |
| `logoUrl` | `string` |  |
| `primaryColor` | `string` |  |
| `privacyPolicyUrl` | `string` |  |
| `psuPortalBaseUrl` | `string` |  |
| `termsUrl` | `string` |  |

#### Example: Load

```lua
local hosted_ui_customization, err = client:HostedUiCustomization():load({ client_id = "client_id" })
```


### Payment

Create an instance: `local payment = client:Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Payment amount |
| `createdAt` | `string` |  |
| `currency` | `string` | Currency code |
| `id` | `string` | Unique payment identifier |
| `metadata` | `table` |  |
| `paymentScheme` | `any` | Payment scheme used |
| `provider` | `any` | Payment provider details. |
| `recipient` | `table` | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Unstructured or structured remittance information. |
| `sender` | `table` | Data about the party sending the payment. |
| `updatedAt` | `string` |  |

#### Example: Load

```lua
local payment, err = client:Payment():load({ id = "payment_id" })
```

#### Example: List

```lua
local payments, err = client:Payment():list()
```

#### Example: Create

```lua
local payment, err = client:Payment():create({
  amount = 1, -- number
  currency = "example_currency", -- string
  metadata = {}, -- table
  paymentScheme = "example_paymentScheme", -- any
  recipient = {}, -- table
  remittanceInformation = "example_remittanceInformation", -- any
})
```


### PaymentStatus

Create an instance: `local payment_status = client:PaymentStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp of status creation |
| `detailedStatus` | `string` | Detailed payment status |
| `failureReasons` | `table` | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Unique payment status identifier |
| `paymentId` | `string` | Unique payment identifier |
| `status` | `string` | Payment status. |

#### Example: Load

```lua
local payment_status, err = client:PaymentStatus():load({ payment_id = "payment_id" })
```

#### Example: List

```lua
local payment_statuss, err = client:PaymentStatus():list({ payment_id = "example" })
```


### Provider

Create an instance: `local provider = client:Provider(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `string` | BIC code of the provider |
| `countryCode` | `string` | Country code of the provider. |
| `hasSubsidiaries` | `boolean` | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | URL of the provider's icon. |
| `id` | `string` | Unique identifier for the provider. |
| `logoUrl` | `string` | URL of the provider's logo. |
| `name` | `string` | Name of the provider. |
| `paymentSchemes` | `table` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `table` | Array of required payment fields for this provider. |

#### Example: List

```lua
local providers, err = client:Provider():list()
```


### PsuProvidedData

Create an instance: `local psu_provided_data = client:PsuProvidedData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### Report

Create an instance: `local report = client:Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Payment amount |
| `createdAt` | `string` |  |
| `currency` | `string` | Currency code |
| `id` | `string` | Unique payment identifier |
| `provider` | `table` | Selected provider details (name, country). |
| `recipient` | `table` |  |
| `remittanceInformation` | `any` |  |
| `sender` | `table` |  |
| `status` | `string` | The most recent status of the payment. |

#### Example: Load

```lua
local report, err = client:Report():load({ id = "report_id" })
```


### ScaData

Create an instance: `local sca_data = client:ScaData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```lua
local sca_data, err = client:ScaData():load()
```


### ScaMethod

Create an instance: `local sca_method = client:ScaMethod(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```lua
local sca_method, err = client:ScaMethod():load()
```


### SenderAccount

Create an instance: `local sender_account = client:SenderAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```lua
local sender_account, err = client:SenderAccount():load({ provider_id = "provider_id", state = "state" })
```


### Subsidiary

Create an instance: `local subsidiary = client:Subsidiary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `string` | BIC code of the provider |
| `countryCode` | `string` | Country code of the provider. |
| `hasSubsidiaries` | `boolean` | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | URL of the provider's icon. |
| `id` | `string` | Unique identifier for the provider. |
| `logoUrl` | `string` | URL of the provider's logo. |
| `name` | `string` | Name of the provider. |
| `paymentSchemes` | `table` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `table` | Array of required payment fields for this provider. |

#### Example: List

```lua
local subsidiarys, err = client:Subsidiary():list({ provider_id = "example" })
```


### Token

Create an instance: `local token = client:Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The JWT access token. |
| `expires_in` | `number` | Expiration time of the token in seconds. |
| `grant_type` | `string` | The type of grant being requested. |
| `scope` | `string` | Scopes being requested. |
| `token_type` | `string` | Token type. |

#### Example: Create

```lua
local token, err = client:Token():create({
  access_token = "example_access_token", -- string
  expires_in = 1, -- number
  grant_type = "example_grant_type", -- string
  scope = "example_scope", -- string
  token_type = "example_token_type", -- string
})
```

## Features

This SDK ships 9 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── kashimi_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`kashimi_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local clientjwk = client:ClientJwk()
clientjwk:load({ client_id = "example", provider_id = "example" })

-- clientjwk:data_get() now returns the clientjwk data from the last load
-- clientjwk:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
