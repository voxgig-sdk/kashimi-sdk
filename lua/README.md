# Kashimi Lua SDK



The Lua SDK for the Kashimi API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Capability()` — each with the same small set of operations (`list`, `load`, `create`, `update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

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

### 2. List capability records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local capabilitys, err = client:Capability():list()
if err then error(err) end

for _, item in ipairs(capabilitys) do
  for k, val in pairs(item:data_get()) do print(k, val) end
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local latests, err = client:Latest():list({ payment_id = "example" })
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

local result, err = client:Latest():list({ payment_id = "example" })
-- result is an array of entities, one per mock record; err is set on failure
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
| `Capability` | `(data) -> CapabilityEntity` | Create a Capability entity instance. |
| `ClientHostedUiCustomizationsOutputDto` | `(data) -> ClientHostedUiCustomizationsOutputDtoEntity` | Create a ClientHostedUiCustomizationsOutputDto entity instance. |
| `CreatePaymentOutputDto` | `(data) -> CreatePaymentOutputDtoEntity` | Create a CreatePaymentOutputDto entity instance. |
| `CreateTokenOutputDto` | `(data) -> CreateTokenOutputDtoEntity` | Create a CreateTokenOutputDto entity instance. |
| `Healthcheck` | `(data) -> HealthcheckEntity` | Create a Healthcheck entity instance. |
| `Latest` | `(data) -> LatestEntity` | Create a Latest entity instance. |
| `Obn` | `(data) -> ObnEntity` | Create an Obn entity instance. |
| `Payment` | `(data) -> PaymentEntity` | Create a Payment entity instance. |
| `PaymentStatus` | `(data) -> PaymentStatusEntity` | Create a PaymentStatus entity instance. |
| `Provider` | `(data) -> ProviderEntity` | Create a Provider entity instance. |
| `ProvidersSubsidiaryOutputDto` | `(data) -> ProvidersSubsidiaryOutputDtoEntity` | Create a ProvidersSubsidiaryOutputDto entity instance. |

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

    local client_hosted_ui_customizations_output_dto, err = client:ClientHostedUiCustomizationsOutputDto():load({ id = "example_id" })
    if err then error(err) end
    -- client_hosted_ui_customizations_output_dto is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Capability

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/capabilities/providers/countries`

#### ClientHostedUiCustomizationsOutputDto

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations`

#### CreatePaymentOutputDto

| Field | Description |
| --- | --- |
| `amount` | The amount to be transferred. |
| `currency` | The currency of the payment. |
| `metadata` |  |
| `paymentScheme` | Payment scheme. |
| `provider` | The provider information for the followup |
| `recipient` | Data about the party receiving the payment. |
| `remittanceInformation` | Unstructured or structured remittance information. |
| `sender` | The sender information to be used with the payment |

Operations: Create.

API path: `/api/v1/ob/payments/{paymentId}/followups`

#### CreateTokenOutputDto

| Field | Description |
| --- | --- |
| `access_token` | The JWT access token. |
| `expires_in` | Expiration time of the token in seconds. |
| `grant_type` | The type of grant being requested. |
| `scope` | Scopes being requested. |
| `token_type` | Token type. |

Operations: Create.

API path: `/api/v1/auth/token`

#### Healthcheck

| Field | Description |
| --- | --- |
| `details` |  |
| `error` |  |
| `info` |  |
| `status` |  |

Operations: Load.

API path: `/api/status`

#### Latest

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp of status creation |
| `detailedStatus` | Detailed payment status |
| `failureReasons` | Failure reasons (for `status: FAILED` only) |
| `id` | Unique payment status identifier |
| `paymentId` | Unique payment identifier |
| `status` | Payment status. |

Operations: List.

API path: `/api/v1/archive/payment-statuses/latest`

#### Obn

| Field | Description |
| --- | --- |

Operations: Create, Load, Update.

API path: `/api/v1/ob/payments/cancel`

#### Payment

| Field | Description |
| --- | --- |
| `amount` | Payment amount |
| `clientId` | Client identifier |
| `createdAt` |  |
| `currency` | Currency code |
| `id` | Unique payment identifier |
| `metadata` |  |
| `paymentScheme` | Payment scheme used |
| `provider` | Payment provider details. |
| `recipient` |  |
| `remittanceInformation` | Unstructured or structured remittance information. |
| `sender` |  |
| `status` | The most recent status of the payment. |
| `updatedAt` |  |

Operations: List, Load.

API path: `/api/v1/archive/payments`

#### PaymentStatus

| Field | Description |
| --- | --- |
| `createdAt` | Timestamp of status creation |
| `detailedStatus` | Detailed payment status |
| `failureReasons` | Failure reasons (for `status: FAILED` only) |
| `id` | Unique payment status identifier |
| `paymentId` | Unique payment identifier |
| `status` | Payment status. |

Operations: List.

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

API path: `/api/v1/capabilities/internal/providers`

#### ProvidersSubsidiaryOutputDto

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

API path: `/api/v1/capabilities/internal/providers/{id}/subsidiaries`



## Entities


### Capability

Create an instance: `local capability = client:Capability(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local capabilitys, err = client:Capability():list()
```


### ClientHostedUiCustomizationsOutputDto

Create an instance: `local client_hosted_ui_customizations_output_dto = client:ClientHostedUiCustomizationsOutputDto(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local client_hosted_ui_customizations_output_dto, err = client:ClientHostedUiCustomizationsOutputDto():load({ id = "client_hosted_ui_customizations_output_dto_id" })
```


### CreatePaymentOutputDto

Create an instance: `local create_payment_output_dto = client:CreatePaymentOutputDto(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | The amount to be transferred. |
| `currency` | `string` | The currency of the payment. |
| `metadata` | `table` |  |
| `paymentScheme` | `any` | Payment scheme. |
| `provider` | `any` | The provider information for the followup |
| `recipient` | `any` | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Unstructured or structured remittance information. |
| `sender` | `any` | The sender information to be used with the payment |

#### Example: Create

```lua
local create_payment_output_dto, err = client:CreatePaymentOutputDto():create({
  amount = 1, -- number
  currency = "example_currency", -- string
  metadata = {}, -- table
  paymentScheme = "example_paymentScheme", -- any
  recipient = "example_recipient", -- any
  remittanceInformation = "example_remittanceInformation", -- any
})
```


### CreateTokenOutputDto

Create an instance: `local create_token_output_dto = client:CreateTokenOutputDto(nil)`

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
local create_token_output_dto, err = client:CreateTokenOutputDto():create({
  access_token = "example_access_token", -- string
  expires_in = 1, -- number
  grant_type = "example_grant_type", -- string
  scope = "example_scope", -- string
  token_type = "example_token_type", -- string
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


### Latest

Create an instance: `local latest = client:Latest(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp of status creation |
| `detailedStatus` | `string` | Detailed payment status |
| `failureReasons` | `table` | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Unique payment status identifier |
| `paymentId` | `string` | Unique payment identifier |
| `status` | `string` | Payment status. |

#### Example: List

```lua
local latests, err = client:Latest():list({ payment_id = "example" })
```


### Obn

Create an instance: `local obn = client:Obn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```lua
local obn, err = client:Obn():load({ provider_id = "provider_id", state = "state" })
```

#### Example: Create

```lua
local obn, err = client:Obn():create({
  provider_id = "example_provider_id", -- string
  state = "example_state", -- string
})
```


### Payment

Create an instance: `local payment = client:Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `number` | Payment amount |
| `clientId` | `string` | Client identifier |
| `createdAt` | `string` |  |
| `currency` | `string` | Currency code |
| `id` | `string` | Unique payment identifier |
| `metadata` | `table` |  |
| `paymentScheme` | `any` | Payment scheme used |
| `provider` | `any` | Payment provider details. |
| `recipient` | `table` |  |
| `remittanceInformation` | `any` | Unstructured or structured remittance information. |
| `sender` | `table` |  |
| `status` | `string` | The most recent status of the payment. |
| `updatedAt` | `string` |  |

#### Example: Load

```lua
local payment, err = client:Payment():load({ id = "payment_id" })
```

#### Example: List

```lua
local payments, err = client:Payment():list()
```


### PaymentStatus

Create an instance: `local payment_status = client:PaymentStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp of status creation |
| `detailedStatus` | `string` | Detailed payment status |
| `failureReasons` | `table` | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Unique payment status identifier |
| `paymentId` | `string` | Unique payment identifier |
| `status` | `string` | Payment status. |

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


### ProvidersSubsidiaryOutputDto

Create an instance: `local providers_subsidiary_output_dto = client:ProvidersSubsidiaryOutputDto(nil)`

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
local providers_subsidiary_output_dtos, err = client:ProvidersSubsidiaryOutputDto():list({ provider_id = "example" })
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local latest = client:Latest()
latest:list({ payment_id = "example" })

-- latest:data_get() now returns the latest data from the last list
-- latest:match_get() returns the last match criteria
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
