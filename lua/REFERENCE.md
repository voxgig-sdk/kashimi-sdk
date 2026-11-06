# Kashimi Lua SDK Reference

Complete API reference for the Kashimi Lua SDK.


## KashimiSDK

### Constructor

```lua
local sdk = require("kashimi_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Callback(data)`

Create a new `Callback` entity instance. Pass `nil` for no initial data.

#### `ClientJwk(data)`

Create a new `ClientJwk` entity instance. Pass `nil` for no initial data.

#### `ConfirmationData(data)`

Create a new `ConfirmationData` entity instance. Pass `nil` for no initial data.

#### `ConsentStatus(data)`

Create a new `ConsentStatus` entity instance. Pass `nil` for no initial data.

#### `Country(data)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Followup(data)`

Create a new `Followup` entity instance. Pass `nil` for no initial data.

#### `Healthcheck(data)`

Create a new `Healthcheck` entity instance. Pass `nil` for no initial data.

#### `HostedUiCustomization(data)`

Create a new `HostedUiCustomization` entity instance. Pass `nil` for no initial data.

#### `Payment(data)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `PaymentStatus(data)`

Create a new `PaymentStatus` entity instance. Pass `nil` for no initial data.

#### `Provider(data)`

Create a new `Provider` entity instance. Pass `nil` for no initial data.

#### `PsuProvidedData(data)`

Create a new `PsuProvidedData` entity instance. Pass `nil` for no initial data.

#### `Report(data)`

Create a new `Report` entity instance. Pass `nil` for no initial data.

#### `ScaData(data)`

Create a new `ScaData` entity instance. Pass `nil` for no initial data.

#### `ScaMethod(data)`

Create a new `ScaMethod` entity instance. Pass `nil` for no initial data.

#### `SenderAccount(data)`

Create a new `SenderAccount` entity instance. Pass `nil` for no initial data.

#### `Subsidiary(data)`

Create a new `Subsidiary` entity instance. Pass `nil` for no initial data.

#### `Token(data)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CallbackEntity

```lua
local callback = client:Callback(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Callback():load({ provider_id = "provider_id", state = "state" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CallbackEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ClientJwkEntity

```lua
local client_jwk = client:ClientJwk(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ClientJwk():load({ client_id = "client_id", provider_id = "provider_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClientJwkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConfirmationDataEntity

```lua
local confirmation_data = client:ConfirmationData(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ConfirmationData():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConfirmationDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ConsentStatusEntity

```lua
local consent_status = client:ConsentStatus(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ConsentStatus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsentStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CountryEntity

```lua
local country = client:Country(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Country():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FollowupEntity

```lua
local followup = client:Followup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | `any` | Yes | The provider information for the followup |
| `sender` | `any` | No | The sender information to be used with the payment |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Followup():create({
  payment_id = --[[ string ]],
  provider = --[[ any ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FollowupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HealthcheckEntity

```lua
local healthcheck = client:Healthcheck(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `table` | No |  |
| `error` | `table` | No |  |
| `info` | `table` | No |  |
| `status` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Healthcheck():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthcheckEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HostedUiCustomizationEntity

```lua
local hosted_ui_customization = client:HostedUiCustomization(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:HostedUiCustomization():load({ id = "hosted_ui_customization_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostedUiCustomizationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentEntity

```lua
local payment = client:Payment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `metadata` | `table` | Yes |  |
| `paymentScheme` | `any` | Yes | Payment scheme used |
| `provider` | `any` | Yes | Payment provider details. |
| `recipient` | `table` | Yes | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Yes | Unstructured or structured remittance information. |
| `sender` | `table` | Yes | Data about the party sending the payment. |
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

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Payment():create({
  amount = --[[ number ]],
  currency = --[[ string ]],
  metadata = --[[ table ]],
  paymentScheme = --[[ any ]],
  recipient = --[[ table ]],
  remittanceInformation = --[[ any ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Payment():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Payment():load({ id = "payment_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PaymentStatusEntity

```lua
local payment_status = client:PaymentStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp of status creation |
| `detailedStatus` | `string` | Yes | Detailed payment status |
| `failureReasons` | `table` | Yes | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Yes | Unique payment status identifier |
| `paymentId` | `string` | Yes | Unique payment identifier |
| `status` | `string` | Yes | Payment status. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PaymentStatus():list({ payment_id = "example" })
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PaymentStatus():load({ payment_id = "payment_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProviderEntity

```lua
local provider = client:Provider(nil)
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
| `paymentSchemes` | `table` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `table` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Provider():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProviderEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PsuProvidedDataEntity

```lua
local psu_provided_data = client:PsuProvidedData(nil)
```

### Operations

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:PsuProvidedData():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PsuProvidedDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportEntity

```lua
local report = client:Report(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `number` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `provider` | `table` | No | Selected provider details (name, country). |
| `recipient` | `table` | Yes |  |
| `remittanceInformation` | `any` | Yes |  |
| `sender` | `table` | No |  |
| `status` | `string` | Yes | The most recent status of the payment. |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Report():load({ id = "report_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaDataEntity

```lua
local sca_data = client:ScaData(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ScaData():load()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ScaData():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ScaMethodEntity

```lua
local sca_method = client:ScaMethod(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ScaMethod():load()
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:ScaMethod():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaMethodEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SenderAccountEntity

```lua
local sender_account = client:SenderAccount(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:SenderAccount():load({ provider_id = "provider_id", state = "state" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`. Returns the updated entity, or `nil` and an error on failure.

```lua
local result, err = client:SenderAccount():update({
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SenderAccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SubsidiaryEntity

```lua
local subsidiary = client:Subsidiary(nil)
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
| `paymentSchemes` | `table` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `table` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Subsidiary():list({ provider_id = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubsidiaryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TokenEntity

```lua
local token = client:Token(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Token():create({
  access_token = --[[ string ]],
  expires_in = --[[ number ]],
  grant_type = --[[ string ]],
  scope = --[[ string ]],
  token_type = --[[ string ]],
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `conform` | 0.1.1 | Conform |
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

```lua
local client = sdk.new({
  feature = {
    conform = { active = true },
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    secrets = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
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

