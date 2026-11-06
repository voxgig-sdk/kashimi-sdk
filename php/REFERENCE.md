# Kashimi PHP SDK Reference

Complete API reference for the Kashimi PHP SDK.


## KashimiSDK

### Constructor

```php
require_once __DIR__ . '/kashimi_sdk.php';

$client = new KashimiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KashimiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = KashimiSDK::test();
```


### Instance Methods

#### `Callback($data = null)`

Create a new `CallbackEntity` instance. Pass `null` for no initial data.

#### `ClientJwk($data = null)`

Create a new `ClientJwkEntity` instance. Pass `null` for no initial data.

#### `ConfirmationData($data = null)`

Create a new `ConfirmationDataEntity` instance. Pass `null` for no initial data.

#### `ConsentStatus($data = null)`

Create a new `ConsentStatusEntity` instance. Pass `null` for no initial data.

#### `Country($data = null)`

Create a new `CountryEntity` instance. Pass `null` for no initial data.

#### `Followup($data = null)`

Create a new `FollowupEntity` instance. Pass `null` for no initial data.

#### `Healthcheck($data = null)`

Create a new `HealthcheckEntity` instance. Pass `null` for no initial data.

#### `HostedUiCustomization($data = null)`

Create a new `HostedUiCustomizationEntity` instance. Pass `null` for no initial data.

#### `Payment($data = null)`

Create a new `PaymentEntity` instance. Pass `null` for no initial data.

#### `PaymentStatus($data = null)`

Create a new `PaymentStatusEntity` instance. Pass `null` for no initial data.

#### `Provider($data = null)`

Create a new `ProviderEntity` instance. Pass `null` for no initial data.

#### `PsuProvidedData($data = null)`

Create a new `PsuProvidedDataEntity` instance. Pass `null` for no initial data.

#### `Report($data = null)`

Create a new `ReportEntity` instance. Pass `null` for no initial data.

#### `ScaData($data = null)`

Create a new `ScaDataEntity` instance. Pass `null` for no initial data.

#### `ScaMethod($data = null)`

Create a new `ScaMethodEntity` instance. Pass `null` for no initial data.

#### `SenderAccount($data = null)`

Create a new `SenderAccountEntity` instance. Pass `null` for no initial data.

#### `Subsidiary($data = null)`

Create a new `SubsidiaryEntity` instance. Pass `null` for no initial data.

#### `Token($data = null)`

Create a new `TokenEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): KashimiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CallbackEntity

```php
$callback = $client->Callback();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Callback()->load(["provider_id" => "provider_id", "state" => "state"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CallbackEntity`

Create a new `CallbackEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ClientJwkEntity

```php
$client_jwk = $client->ClientJwk();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ClientJwk()->load(["client_id" => "client_id", "provider_id" => "provider_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ClientJwkEntity`

Create a new `ClientJwkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConfirmationDataEntity

```php
$confirmation_data = $client->ConfirmationData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ConfirmationData()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConfirmationDataEntity`

Create a new `ConfirmationDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ConsentStatusEntity

```php
$consent_status = $client->ConsentStatus();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ConsentStatus()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ConsentStatusEntity`

Create a new `ConsentStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CountryEntity

```php
$country = $client->Country();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Country()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FollowupEntity

```php
$followup = $client->Followup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | `mixed` | Yes | The provider information for the followup |
| `sender` | `mixed` | No | The sender information to be used with the payment |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Followup()->create([
  "payment_id" => null, // string
  "provider" => null, // mixed
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FollowupEntity`

Create a new `FollowupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HealthcheckEntity

```php
$healthcheck = $client->Healthcheck();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `array` | No |  |
| `error` | `array` | No |  |
| `info` | `array` | No |  |
| `status` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Healthcheck()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HealthcheckEntity`

Create a new `HealthcheckEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HostedUiCustomizationEntity

```php
$hosted_ui_customization = $client->HostedUiCustomization();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->HostedUiCustomization()->load(["id" => "hosted_ui_customization_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HostedUiCustomizationEntity`

Create a new `HostedUiCustomizationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentEntity

```php
$payment = $client->Payment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `metadata` | `array` | Yes |  |
| `paymentScheme` | `mixed` | Yes | Payment scheme used |
| `provider` | `mixed` | Yes | Payment provider details. |
| `recipient` | `array` | Yes | Data about the party receiving the payment. |
| `remittanceInformation` | `mixed` | Yes | Unstructured or structured remittance information. |
| `sender` | `array` | Yes | Data about the party sending the payment. |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Payment()->create([
  "amount" => null, // float
  "currency" => null, // string
  "metadata" => null, // array
  "paymentScheme" => null, // mixed
  "recipient" => null, // array
  "remittanceInformation" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Payment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Payment()->load(["id" => "payment_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentEntity`

Create a new `PaymentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PaymentStatusEntity

```php
$payment_status = $client->PaymentStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | Yes | Timestamp of status creation |
| `detailedStatus` | `string` | Yes | Detailed payment status |
| `failureReasons` | `array` | Yes | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Yes | Unique payment status identifier |
| `paymentId` | `string` | Yes | Unique payment identifier |
| `status` | `string` | Yes | Payment status. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->PaymentStatus()->list(["payment_id" => "example"]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->PaymentStatus()->load(["payment_id" => "payment_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PaymentStatusEntity`

Create a new `PaymentStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProviderEntity

```php
$provider = $client->Provider();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `string` | Yes | BIC code of the provider |
| `countryCode` | `string` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | Yes | URL of the provider's icon. |
| `id` | `string` | Yes | Unique identifier for the provider. |
| `logoUrl` | `string` | Yes | URL of the provider's logo. |
| `name` | `string` | Yes | Name of the provider. |
| `paymentSchemes` | `array` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `array` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Provider()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProviderEntity`

Create a new `ProviderEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PsuProvidedDataEntity

```php
$psu_provided_data = $client->PsuProvidedData();
```

### Operations

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->PsuProvidedData()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PsuProvidedDataEntity`

Create a new `PsuProvidedDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportEntity

```php
$report = $client->Report();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | Payment amount |
| `createdAt` | `string` | Yes |  |
| `currency` | `string` | Yes | Currency code |
| `id` | `string` | Yes | Unique payment identifier |
| `provider` | `array` | No | Selected provider details (name, country). |
| `recipient` | `array` | Yes |  |
| `remittanceInformation` | `mixed` | Yes |  |
| `sender` | `array` | No |  |
| `status` | `string` | Yes | The most recent status of the payment. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Report()->load(["id" => "report_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportEntity`

Create a new `ReportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaDataEntity

```php
$sca_data = $client->ScaData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ScaData()->load();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ScaData()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaDataEntity`

Create a new `ScaDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ScaMethodEntity

```php
$sca_method = $client->ScaMethod();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ScaMethod()->load();
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->ScaMethod()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ScaMethodEntity`

Create a new `ScaMethodEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SenderAccountEntity

```php
$sender_account = $client->SenderAccount();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->SenderAccount()->load(["provider_id" => "provider_id", "state" => "state"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and throws on error.

```php
$result = $client->SenderAccount()->update([
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SenderAccountEntity`

Create a new `SenderAccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubsidiaryEntity

```php
$subsidiary = $client->Subsidiary();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `string` | Yes | BIC code of the provider |
| `countryCode` | `string` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | Yes | URL of the provider's icon. |
| `id` | `string` | Yes | Unique identifier for the provider. |
| `logoUrl` | `string` | Yes | URL of the provider's logo. |
| `name` | `string` | Yes | Name of the provider. |
| `paymentSchemes` | `array` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `array` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Subsidiary()->list(["provider_id" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubsidiaryEntity`

Create a new `SubsidiaryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TokenEntity

```php
$token = $client->Token();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes | The JWT access token. |
| `expires_in` | `float` | Yes | Expiration time of the token in seconds. |
| `grant_type` | `string` | Yes | The type of grant being requested. |
| `scope` | `string` | Yes | Scopes being requested. |
| `token_type` | `string` | Yes | Token type. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Returns the created entity and throws on error.

```php
$result = $client->Token()->create([
  "access_token" => null, // string
  "expires_in" => null, // float
  "grant_type" => null, // string
  "scope" => null, // string
  "token_type" => null, // string
]);
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TokenEntity`

Create a new `TokenEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new KashimiSDK([
  "feature" => [
    "conform" => ["active" => true],
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "secrets" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

