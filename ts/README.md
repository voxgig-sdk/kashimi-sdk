# Kashimi TypeScript SDK



The TypeScript SDK for the Kashimi API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Callback()` — each with a small set of operations (`list`, `load`, `create`, `update`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/kashimi-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/kashimi-sdk
npm install ./kashimi-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { KashimiSDK } from '@voxgig-sdk/kashimi-sdk'

const client = new KashimiSDK({
  apikey: process.env.KASHIMI_APIKEY,
})
```

### 3. Load a callback

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const callback = await client.Callback().load({ provider_id: 'example_provider_id', state: 'example_state' })
  console.log(callback.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const clientjwk = await client.ClientJwk().load({ client_id: "example", provider_id: "example" })
  console.log(clientjwk.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = KashimiSDK.test()

const clientjwk = await client.ClientJwk().load({ client_id: 'example_client_id', provider_id: 'example_provider_id' })
// clientjwk is the ClientJwk entity; .data() reads its mock record
console.log(clientjwk.data())
```

You can also use the instance method:

```ts
const client = new KashimiSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ClientJwk()

// First call runs the operation and stores its result
await entity.load({ client_id: 'example_client_id', provider_id: 'example_provider_id' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new KashimiSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### KashimiSDK

#### Constructor

```ts
new KashimiSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Callback(data?)` | `CallbackEntity` | Create a Callback entity instance. |
| `ClientJwk(data?)` | `ClientJwkEntity` | Create a ClientJwk entity instance. |
| `ConfirmationData(data?)` | `ConfirmationDataEntity` | Create a ConfirmationData entity instance. |
| `ConsentStatus(data?)` | `ConsentStatusEntity` | Create a ConsentStatus entity instance. |
| `Country(data?)` | `CountryEntity` | Create a Country entity instance. |
| `Followup(data?)` | `FollowupEntity` | Create a Followup entity instance. |
| `Healthcheck(data?)` | `HealthcheckEntity` | Create a Healthcheck entity instance. |
| `HostedUiCustomization(data?)` | `HostedUiCustomizationEntity` | Create a HostedUiCustomization entity instance. |
| `Payment(data?)` | `PaymentEntity` | Create a Payment entity instance. |
| `PaymentStatus(data?)` | `PaymentStatusEntity` | Create a PaymentStatus entity instance. |
| `Provider(data?)` | `ProviderEntity` | Create a Provider entity instance. |
| `PsuProvidedData(data?)` | `PsuProvidedDataEntity` | Create a PsuProvidedData entity instance. |
| `Report(data?)` | `ReportEntity` | Create a Report entity instance. |
| `ScaData(data?)` | `ScaDataEntity` | Create a ScaData entity instance. |
| `ScaMethod(data?)` | `ScaMethodEntity` | Create a ScaMethod entity instance. |
| `SenderAccount(data?)` | `SenderAccountEntity` | Create a SenderAccount entity instance. |
| `Subsidiary(data?)` | `SubsidiaryEntity` | Create a Subsidiary entity instance. |
| `Token(data?)` | `TokenEntity` | Create a Token entity instance. |
| `tester(testopts?, sdkopts?)` | `KashimiSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `KashimiSDK.test(testopts?, sdkopts?)` | `KashimiSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): KashimiSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Callback

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/ob/callbacks`

#### ClientJwk

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/ob/client-jwks`

#### ConfirmationData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/ob/payments/decoupled/confirmation-data`

#### ConsentStatus

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/ob/payments/decoupled/consent-status`

#### Country

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/capabilities/providers/countries`

#### Followup

| Field | Description |
| --- | --- |
| `provider` | The provider information for the followup |
| `sender` | The sender information to be used with the payment |

Operations: create.

API path: `/api/v1/ob/payments/{paymentId}/followups`

#### Healthcheck

| Field | Description |
| --- | --- |
| `details` |  |
| `error` |  |
| `info` |  |
| `status` |  |

Operations: load.

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

Operations: load.

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

Operations: create, list, load.

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

Operations: list, load.

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

Operations: list.

API path: `/api/v1/capabilities/providers`

#### PsuProvidedData

| Field | Description |
| --- | --- |

Operations: update.

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

Operations: load.

API path: `/api/v1/reports/payments/{id}`

#### ScaData

| Field | Description |
| --- | --- |

Operations: load, update.

API path: `/api/v1/ob/payments/decoupled/sca-data`

#### ScaMethod

| Field | Description |
| --- | --- |

Operations: load, update.

API path: `/api/v1/ob/payments/decoupled/sca-methods`

#### SenderAccount

| Field | Description |
| --- | --- |

Operations: load, update.

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

Operations: list.

API path: `/api/v1/capabilities/providers/{id}/subsidiaries`

#### Token

| Field | Description |
| --- | --- |
| `access_token` | The JWT access token. |
| `expires_in` | Expiration time of the token in seconds. |
| `grant_type` | The type of grant being requested. |
| `scope` | Scopes being requested. |
| `token_type` | Token type. |

Operations: create.

API path: `/api/v1/auth/token`



## Entities


### Callback

Create an instance: `const callback = client.Callback()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const callback = await client.Callback().load({ provider_id: 'provider_id', state: 'state' })
```


### ClientJwk

Create an instance: `const client_jwk = client.ClientJwk()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const client_jwk = await client.ClientJwk().load({ client_id: 'client_id', provider_id: 'provider_id' })
```


### ConfirmationData

Create an instance: `const confirmation_data = client.ConfirmationData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const confirmation_data = await client.ConfirmationData().load()
```


### ConsentStatus

Create an instance: `const consent_status = client.ConsentStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const consent_status = await client.ConsentStatus().load()
```


### Country

Create an instance: `const country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const countrys = await client.Country().list()
```


### Followup

Create an instance: `const followup = client.Followup()`

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

```ts
const followup = await client.Followup().create({
  payment_id: 'example_payment_id',
  provider: 'example_provider',
})
```


### Healthcheck

Create an instance: `const healthcheck = client.Healthcheck()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `Record<string, any>` |  |
| `error` | `Record<string, any>` |  |
| `info` | `Record<string, any>` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const healthcheck = await client.Healthcheck().load()
```


### HostedUiCustomization

Create an instance: `const hosted_ui_customization = client.HostedUiCustomization()`

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
| `id` | `string` |  |
| `logoUrl` | `string` |  |
| `primaryColor` | `string` |  |
| `privacyPolicyUrl` | `string` |  |
| `psuPortalBaseUrl` | `string` |  |
| `termsUrl` | `string` |  |

#### Example: Load

```ts
const hosted_ui_customization = await client.HostedUiCustomization().load({ id: 'hosted_ui_customization_id' })
```


### Payment

Create an instance: `const payment = client.Payment()`

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
| `metadata` | `Record<string, any>` |  |
| `paymentScheme` | `any` | Payment scheme used |
| `provider` | `any` | Payment provider details. |
| `recipient` | `Record<string, any>` | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Unstructured or structured remittance information. |
| `sender` | `Record<string, any>` | Data about the party sending the payment. |
| `updatedAt` | `string` |  |

#### Example: Load

```ts
const payment = await client.Payment().load({ id: 'payment_id' })
```

#### Example: List

```ts
const payments = await client.Payment().list()
```

#### Example: Create

```ts
const payment = await client.Payment().create({
  amount: 1,
  currency: 'example_currency',
  metadata: {},
  paymentScheme: 'example_paymentScheme',
  recipient: {},
  remittanceInformation: 'example_remittanceInformation',
})
```


### PaymentStatus

Create an instance: `const payment_status = client.PaymentStatus()`

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
| `failureReasons` | `any[]` | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Unique payment status identifier |
| `paymentId` | `string` | Unique payment identifier |
| `status` | `string` | Payment status. |

#### Example: Load

```ts
const payment_status = await client.PaymentStatus().load({ payment_id: 'payment_id' })
```

#### Example: List

```ts
const payment_statuss = await client.PaymentStatus().list({ payment_id: "example" })
```


### Provider

Create an instance: `const provider = client.Provider()`

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
| `paymentSchemes` | `any[]` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `any[]` | Array of required payment fields for this provider. |

#### Example: List

```ts
const providers = await client.Provider().list()
```


### PsuProvidedData

Create an instance: `const psu_provided_data = client.PsuProvidedData()`

#### Operations

| Method | Description |
| --- | --- |
| `update(data)` | Update an existing entity. |


### Report

Create an instance: `const report = client.Report()`

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
| `provider` | `Record<string, any>` | Selected provider details (name, country). |
| `recipient` | `Record<string, any>` |  |
| `remittanceInformation` | `any` |  |
| `sender` | `Record<string, any>` |  |
| `status` | `string` | The most recent status of the payment. |

#### Example: Load

```ts
const report = await client.Report().load({ id: 'report_id' })
```


### ScaData

Create an instance: `const sca_data = client.ScaData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ts
const sca_data = await client.ScaData().load()
```


### ScaMethod

Create an instance: `const sca_method = client.ScaMethod()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ts
const sca_method = await client.ScaMethod().load()
```


### SenderAccount

Create an instance: `const sender_account = client.SenderAccount()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```ts
const sender_account = await client.SenderAccount().load({ provider_id: 'provider_id', state: 'state' })
```


### Subsidiary

Create an instance: `const subsidiary = client.Subsidiary()`

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
| `paymentSchemes` | `any[]` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `any[]` | Array of required payment fields for this provider. |

#### Example: List

```ts
const subsidiarys = await client.Subsidiary().list({ provider_id: "example" })
```


### Token

Create an instance: `const token = client.Token()`

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

```ts
const token = await client.Token().create({
  access_token: 'example_access_token',
  expires_in: 1,
  grant_type: 'example_grant_type',
  scope: 'example_scope',
  token_type: 'example_token_type',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
kashimi/
├── src/
│   ├── KashimiSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { KashimiSDK } from '@voxgig-sdk/kashimi-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const clientjwk = client.ClientJwk()
await clientjwk.load({ client_id: "example", provider_id: "example" })

// clientjwk.data() now returns the clientjwk data from the last `load`
// clientjwk.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
