# Kashimi Ruby SDK Reference

Complete API reference for the Kashimi Ruby SDK.


## KashimiSDK

### Constructor

```ruby
require_relative 'Kashimi_sdk'

client = KashimiSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KashimiSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = KashimiSDK.test
```


### Instance Methods

#### `Callback(data = nil)`

Create a new `Callback` entity instance. Pass `nil` for no initial data.

#### `ClientJwk(data = nil)`

Create a new `ClientJwk` entity instance. Pass `nil` for no initial data.

#### `ConfirmationData(data = nil)`

Create a new `ConfirmationData` entity instance. Pass `nil` for no initial data.

#### `ConsentStatus(data = nil)`

Create a new `ConsentStatus` entity instance. Pass `nil` for no initial data.

#### `Country(data = nil)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Followup(data = nil)`

Create a new `Followup` entity instance. Pass `nil` for no initial data.

#### `Healthcheck(data = nil)`

Create a new `Healthcheck` entity instance. Pass `nil` for no initial data.

#### `HostedUiCustomization(data = nil)`

Create a new `HostedUiCustomization` entity instance. Pass `nil` for no initial data.

#### `Payment(data = nil)`

Create a new `Payment` entity instance. Pass `nil` for no initial data.

#### `PaymentStatus(data = nil)`

Create a new `PaymentStatus` entity instance. Pass `nil` for no initial data.

#### `Provider(data = nil)`

Create a new `Provider` entity instance. Pass `nil` for no initial data.

#### `PsuProvidedData(data = nil)`

Create a new `PsuProvidedData` entity instance. Pass `nil` for no initial data.

#### `Report(data = nil)`

Create a new `Report` entity instance. Pass `nil` for no initial data.

#### `ScaData(data = nil)`

Create a new `ScaData` entity instance. Pass `nil` for no initial data.

#### `ScaMethod(data = nil)`

Create a new `ScaMethod` entity instance. Pass `nil` for no initial data.

#### `SenderAccount(data = nil)`

Create a new `SenderAccount` entity instance. Pass `nil` for no initial data.

#### `Subsidiary(data = nil)`

Create a new `Subsidiary` entity instance. Pass `nil` for no initial data.

#### `Token(data = nil)`

Create a new `Token` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CallbackEntity

```ruby
callback = client.Callback
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Callback.load({ "provider_id" => "provider_id", "state" => "state" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CallbackEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ClientJwkEntity

```ruby
client_jwk = client.ClientJwk
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ClientJwk.load({ "client_id" => "client_id", "provider_id" => "provider_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ClientJwkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConfirmationDataEntity

```ruby
confirmation_data = client.ConfirmationData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ConfirmationData.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConfirmationDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ConsentStatusEntity

```ruby
consent_status = client.ConsentStatus
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ConsentStatus.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ConsentStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CountryEntity

```ruby
country = client.Country
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Country.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FollowupEntity

```ruby
followup = client.Followup
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | `Object` | Yes | The provider information for the followup |
| `sender` | `Object` | No | The sender information to be used with the payment |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Followup.create({
  "payment_id" => "example_payment_id", # String
  "provider" => "example_provider", # Object
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FollowupEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HealthcheckEntity

```ruby
healthcheck = client.Healthcheck
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `Hash` | No |  |
| `error` | `Hash` | No |  |
| `info` | `Hash` | No |  |
| `status` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Healthcheck.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HealthcheckEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HostedUiCustomizationEntity

```ruby
hosted_ui_customization = client.HostedUiCustomization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `String` | Yes |  |
| `faviconUrl` | `String` | Yes |  |
| `footerText` | `String` | Yes |  |
| `id` | `String` | No |  |
| `logoUrl` | `String` | Yes |  |
| `primaryColor` | `String` | Yes |  |
| `privacyPolicyUrl` | `String` | Yes |  |
| `psuPortalBaseUrl` | `String` | Yes |  |
| `termsUrl` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.HostedUiCustomization.load({ "id" => "hosted_ui_customization_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HostedUiCustomizationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentEntity

```ruby
payment = client.Payment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | Yes | Payment amount |
| `createdAt` | `String` | Yes |  |
| `currency` | `String` | Yes | Currency code |
| `id` | `String` | Yes | Unique payment identifier |
| `metadata` | `Hash` | Yes |  |
| `paymentScheme` | `Object` | Yes | Payment scheme used |
| `provider` | `Object` | Yes | Payment provider details. |
| `recipient` | `Hash` | Yes | Data about the party receiving the payment. |
| `remittanceInformation` | `Object` | Yes | Unstructured or structured remittance information. |
| `sender` | `Hash` | Yes | Data about the party sending the payment. |
| `updatedAt` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Payment.create({
  "amount" => 1, # Float
  "currency" => "example_currency", # String
  "metadata" => {}, # Hash
  "paymentScheme" => "example_paymentScheme", # Object
  "recipient" => {}, # Hash
  "remittanceInformation" => "example_remittanceInformation", # Object
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Payment.list
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Payment.load({ "id" => "payment_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PaymentStatusEntity

```ruby
payment_status = client.PaymentStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | Yes | Timestamp of status creation |
| `detailedStatus` | `String` | Yes | Detailed payment status |
| `failureReasons` | `Array` | Yes | Failure reasons (for `status: FAILED` only) |
| `id` | `String` | Yes | Unique payment status identifier |
| `paymentId` | `String` | Yes | Unique payment identifier |
| `status` | `String` | Yes | Payment status. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PaymentStatus.list({ "payment_id" => "example" })
results.each { |item| puts item.data_get }
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PaymentStatus.load({ "payment_id" => "payment_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PaymentStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProviderEntity

```ruby
provider = client.Provider
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `String` | Yes | BIC code of the provider |
| `countryCode` | `String` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `Boolean` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `String` | Yes | URL of the provider's icon. |
| `id` | `String` | Yes | Unique identifier for the provider. |
| `logoUrl` | `String` | Yes | URL of the provider's logo. |
| `name` | `String` | Yes | Name of the provider. |
| `paymentSchemes` | `Array` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `Array` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Provider.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProviderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PsuProvidedDataEntity

```ruby
psu_provided_data = client.PsuProvidedData
```

### Operations

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.PsuProvidedData.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PsuProvidedDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReportEntity

```ruby
report = client.Report
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `Float` | Yes | Payment amount |
| `createdAt` | `String` | Yes |  |
| `currency` | `String` | Yes | Currency code |
| `id` | `String` | Yes | Unique payment identifier |
| `provider` | `Hash` | No | Selected provider details (name, country). |
| `recipient` | `Hash` | Yes |  |
| `remittanceInformation` | `Object` | Yes |  |
| `sender` | `Hash` | No |  |
| `status` | `String` | Yes | The most recent status of the payment. |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Report.load({ "id" => "report_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaDataEntity

```ruby
sca_data = client.ScaData
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ScaData.load()
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ScaData.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ScaMethodEntity

```ruby
sca_method = client.ScaMethod
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ScaMethod.load()
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.ScaMethod.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ScaMethodEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SenderAccountEntity

```ruby
sender_account = client.SenderAccount
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.SenderAccount.load({ "provider_id" => "provider_id", "state" => "state" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```ruby
result = client.SenderAccount.update({
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SenderAccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubsidiaryEntity

```ruby
subsidiary = client.Subsidiary
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `String` | Yes | BIC code of the provider |
| `countryCode` | `String` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `Boolean` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `String` | Yes | URL of the provider's icon. |
| `id` | `String` | Yes | Unique identifier for the provider. |
| `logoUrl` | `String` | Yes | URL of the provider's logo. |
| `name` | `String` | Yes | Name of the provider. |
| `paymentSchemes` | `Array` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `Array` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Subsidiary.list({ "provider_id" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubsidiaryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TokenEntity

```ruby
token = client.Token
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `String` | Yes | The JWT access token. |
| `expires_in` | `Float` | Yes | Expiration time of the token in seconds. |
| `grant_type` | `String` | Yes | The type of grant being requested. |
| `scope` | `String` | Yes | Scopes being requested. |
| `token_type` | `String` | Yes | Token type. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Token.create({
  "access_token" => "example_access_token", # String
  "expires_in" => 1, # Float
  "grant_type" => "example_grant_type", # String
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = KashimiSDK.new({
  "feature" => {
    "conform" => { "active" => true },
    "debug" => { "active" => true },
    "idempotency" => { "active" => true },
    "metrics" => { "active" => true },
    "paging" => { "active" => true },
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "secrets" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

