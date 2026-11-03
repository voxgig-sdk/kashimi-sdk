# Kashimi TypeScript SDK Reference

Complete API reference for the Kashimi TypeScript SDK.


## KashimiSDK

### Constructor

```ts
new KashimiSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KashimiSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = KashimiSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `KashimiSDK` instance in test mode.


### Instance Methods

#### `Callback(data?: object)`

Create a new `Callback` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CallbackEntity` instance.

#### `ClientJwk(data?: object)`

Create a new `ClientJwk` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ClientJwkEntity` instance.

#### `ConfirmationData(data?: object)`

Create a new `ConfirmationData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConfirmationDataEntity` instance.

#### `ConsentStatus(data?: object)`

Create a new `ConsentStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ConsentStatusEntity` instance.

#### `Country(data?: object)`

Create a new `Country` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CountryEntity` instance.

#### `Followup(data?: object)`

Create a new `Followup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FollowupEntity` instance.

#### `Healthcheck(data?: object)`

Create a new `Healthcheck` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HealthcheckEntity` instance.

#### `HostedUiCustomization(data?: object)`

Create a new `HostedUiCustomization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HostedUiCustomizationEntity` instance.

#### `Payment(data?: object)`

Create a new `Payment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentEntity` instance.

#### `PaymentStatus(data?: object)`

Create a new `PaymentStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PaymentStatusEntity` instance.

#### `Provider(data?: object)`

Create a new `Provider` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProviderEntity` instance.

#### `PsuProvidedData(data?: object)`

Create a new `PsuProvidedData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PsuProvidedDataEntity` instance.

#### `Report(data?: object)`

Create a new `Report` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportEntity` instance.

#### `ScaData(data?: object)`

Create a new `ScaData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaDataEntity` instance.

#### `ScaMethod(data?: object)`

Create a new `ScaMethod` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScaMethodEntity` instance.

#### `SenderAccount(data?: object)`

Create a new `SenderAccount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SenderAccountEntity` instance.

#### `Subsidiary(data?: object)`

Create a new `Subsidiary` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubsidiaryEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `KashimiSDK.test()`.

**Returns:** `KashimiSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## CallbackEntity

```ts
const callback = client.Callback()
```

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `with-provider-nano-id` | `/api/v1/ob/callbacks/with-provider-nano-id` | `client.Callback().load({ $action: 'with-provider-nano-id', ... })` |

An action returns that action's OWN response, which is not necessarily a
Callback record — check the API definition for its shape.

```ts
const result = await client.Callback().load({
  $action: 'with-provider-nano-id',
  /* ...the action's own arguments */
})
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Callback().load({ provider_id: 'provider_id', state: 'state' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CallbackEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ClientJwkEntity

```ts
const client_jwk = client.ClientJwk()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ClientJwk().load({ client_id: 'client_id', provider_id: 'provider_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ClientJwkEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConfirmationDataEntity

```ts
const confirmation_data = client.ConfirmationData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ConfirmationData().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConfirmationDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ConsentStatusEntity

```ts
const consent_status = client.ConsentStatus()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ConsentStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ConsentStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CountryEntity

```ts
const country = client.Country()
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Country().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FollowupEntity

```ts
const followup = client.Followup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | `any` | Yes | The provider information for the followup |
| `sender` | `any` | No | The sender information to be used with the payment |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Followup().create({
  payment_id: 'example_payment_id',
  provider: 'example_provider',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FollowupEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HealthcheckEntity

```ts
const healthcheck = client.Healthcheck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Record<string, any>` | No |  |
| `error` | `Record<string, any>` | No |  |
| `info` | `Record<string, any>` | No |  |
| `status` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Healthcheck().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HealthcheckEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HostedUiCustomizationEntity

```ts
const hosted_ui_customization = client.HostedUiCustomization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | Yes |  |
| `faviconUrl` | `string` | Yes |  |
| `footerText` | `string` | Yes |  |
| `id` | `string` | No |  |
| `logoUrl` | `string` | Yes |  |
| `primaryColor` | `string` | Yes |  |
| `privacyPolicyUrl` | `string` | Yes |  |
| `psuPortalBaseUrl` | `string` | Yes |  |
| `termsUrl` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.HostedUiCustomization().load({ id: 'hosted_ui_customization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HostedUiCustomizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentEntity

```ts
const payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `metadata` | `Record<string, any>` | Yes |  |
| `paymentScheme` | `any` | Yes | Payment scheme used |
| `provider` | `any` | Yes | Payment provider details. |
| `recipient` | `Record<string, any>` | Yes | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Yes | Unstructured or structured remittance information. |
| `sender` | `Record<string, any>` | Yes | Data about the party sending the payment. |
| `updatedAt` | `string` | Yes |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `amount` | - | - | - |
| `createdAt` | - | - | - |
| `currency` | - | - | - |
| `id` | - | - | - |
| `metadata` | - | - | - |
| `paymentScheme` | - | - | - |
| `provider` | - | - | Yes |
| `recipient` | - | - | - |
| `remittanceInformation` | - | - | - |
| `sender` | - | - | Yes |
| `updatedAt` | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `cancel` | `/api/v1/ob/payments/cancel` | `client.Payment().create({ $action: 'cancel', ... })` |

An action returns that action's OWN response, which is not necessarily a
Payment record — check the API definition for its shape.

```ts
const result = await client.Payment().create({
  $action: 'cancel',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Payment().create({
  amount: 1,
  currency: 'example_currency',
  metadata: {},
  paymentScheme: 'example_paymentScheme',
  recipient: {},
  remittanceInformation: 'example_remittanceInformation',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Payment().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Payment().load({ id: 'payment_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PaymentStatusEntity

```ts
const payment_status = client.PaymentStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp of status creation |
| `detailedStatus` | `string` | Yes | Detailed payment status |
| `failureReasons` | `any[]` | Yes | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Yes | Unique payment status identifier |
| `paymentId` | `string` | Yes | Unique payment identifier |
| `status` | `string` | Yes | Payment status. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `latest` | `/api/v1/archive/payment-statuses/latest` | `client.PaymentStatus().load({ $action: 'latest', ... })` |

An action returns that action's OWN response, which is not necessarily a
PaymentStatus record — check the API definition for its shape.

```ts
const result = await client.PaymentStatus().load({
  $action: 'latest',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PaymentStatus().list({ payment_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PaymentStatus().load({ payment_id: 'payment_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PaymentStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProviderEntity

```ts
const provider = client.Provider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `string` | Yes | BIC code of the provider |
| `countryCode` | `string` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `boolean` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | Yes | URL of the provider's icon. |
| `id` | `string` | Yes | Unique identifier for the provider. |
| `logoUrl` | `string` | Yes | URL of the provider's logo. |
| `name` | `string` | Yes | Name of the provider. |
| `paymentSchemes` | `any[]` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `any[]` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Provider().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProviderEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PsuProvidedDataEntity

```ts
const psu_provided_data = client.PsuProvidedData()
```

### Operations

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.PsuProvidedData().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PsuProvidedDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportEntity

```ts
const report = client.Report()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `provider` | `Record<string, any>` | No | Selected provider details (name, country). |
| `recipient` | `Record<string, any>` | Yes |  |
| `remittanceInformation` | `any` | Yes |  |
| `sender` | `Record<string, any>` | No |  |
| `status` | `string` | Yes | The most recent status of the payment. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Report().load({ id: 'report_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaDataEntity

```ts
const sca_data = client.ScaData()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ScaData().load()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ScaData().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScaMethodEntity

```ts
const sca_method = client.ScaMethod()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.ScaMethod().load()
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.ScaMethod().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScaMethodEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SenderAccountEntity

```ts
const sender_account = client.SenderAccount()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.SenderAccount().load({ provider_id: 'provider_id', state: 'state' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.SenderAccount().update({
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SenderAccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubsidiaryEntity

```ts
const subsidiary = client.Subsidiary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `string` | Yes | BIC code of the provider |
| `countryCode` | `string` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `boolean` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | Yes | URL of the provider's icon. |
| `id` | `string` | Yes | Unique identifier for the provider. |
| `logoUrl` | `string` | Yes | URL of the provider's logo. |
| `name` | `string` | Yes | Name of the provider. |
| `paymentSchemes` | `any[]` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `any[]` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Subsidiary().list({ provider_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubsidiaryEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes | The JWT access token. |
| `expires_in` | `number` | Yes | Expiration time of the token in seconds. |
| `grant_type` | `string` | Yes | The type of grant being requested. |
| `scope` | `string` | Yes | Scopes being requested. |
| `token_type` | `string` | Yes | Token type. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Token().create({
  access_token: 'example_access_token',
  expires_in: 1,
  grant_type: 'example_grant_type',
  scope: 'example_scope',
  token_type: 'example_token_type',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `KashimiSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `conform` | 0.1.0 | Conform |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `secrets` | 0.1.0 | Secrets |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new KashimiSDK({
  feature: {
    conform: { active: true },
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    secrets: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `secrets`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`conform`, `debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `conform`

Conform.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

**Usage**

Set `feature.conform.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `secrets`

Secrets.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `cache` | `true` |
| `exchange` | `{active: false, method: 'POST', path: 'auth/token', refresh: '', request: 'refresh_token', response: 'access_token', retries: 1, statuses: [401]}` |
| `name` | `'apikey'` |
| `providers` | `[]` |

**Usage**

Set `feature.secrets.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

