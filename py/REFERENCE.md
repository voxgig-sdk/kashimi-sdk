# Kashimi Python SDK Reference

Complete API reference for the Kashimi Python SDK.


## KashimiSDK

### Constructor

```python
from kashimi_sdk import KashimiSDK

client = KashimiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KashimiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = KashimiSDK.test()
```


### Instance Methods

#### `Callback(data=None)`

Create a new `CallbackEntity` instance. Pass `None` for no initial data.

#### `ClientJwk(data=None)`

Create a new `ClientJwkEntity` instance. Pass `None` for no initial data.

#### `ConfirmationData(data=None)`

Create a new `ConfirmationDataEntity` instance. Pass `None` for no initial data.

#### `ConsentStatus(data=None)`

Create a new `ConsentStatusEntity` instance. Pass `None` for no initial data.

#### `Country(data=None)`

Create a new `CountryEntity` instance. Pass `None` for no initial data.

#### `Followup(data=None)`

Create a new `FollowupEntity` instance. Pass `None` for no initial data.

#### `Healthcheck(data=None)`

Create a new `HealthcheckEntity` instance. Pass `None` for no initial data.

#### `HostedUiCustomization(data=None)`

Create a new `HostedUiCustomizationEntity` instance. Pass `None` for no initial data.

#### `Payment(data=None)`

Create a new `PaymentEntity` instance. Pass `None` for no initial data.

#### `PaymentStatus(data=None)`

Create a new `PaymentStatusEntity` instance. Pass `None` for no initial data.

#### `Provider(data=None)`

Create a new `ProviderEntity` instance. Pass `None` for no initial data.

#### `PsuProvidedData(data=None)`

Create a new `PsuProvidedDataEntity` instance. Pass `None` for no initial data.

#### `Report(data=None)`

Create a new `ReportEntity` instance. Pass `None` for no initial data.

#### `ScaData(data=None)`

Create a new `ScaDataEntity` instance. Pass `None` for no initial data.

#### `ScaMethod(data=None)`

Create a new `ScaMethodEntity` instance. Pass `None` for no initial data.

#### `SenderAccount(data=None)`

Create a new `SenderAccountEntity` instance. Pass `None` for no initial data.

#### `Subsidiary(data=None)`

Create a new `SubsidiaryEntity` instance. Pass `None` for no initial data.

#### `Token(data=None)`

Create a new `TokenEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CallbackEntity

```python
callback = client.Callback()
```

### Operations

#### `load(reqmatch, ctrl=None) -> CallbackEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Callback().load({"provider_id": "provider_id", "state": "state"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CallbackEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ClientJwkEntity

```python
client_jwk = client.ClientJwk()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ClientJwkEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ClientJwk().load({"client_id": "client_id", "provider_id": "provider_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ClientJwkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConfirmationDataEntity

```python
confirmation_data = client.ConfirmationData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ConfirmationDataEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ConfirmationData().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConfirmationDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConsentStatusEntity

```python
consent_status = client.ConsentStatus()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ConsentStatusEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ConsentStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConsentStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CountryEntity

```python
country = client.Country()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CountryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Country().list()
for country in results:
    print(country.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FollowupEntity

```python
followup = client.Followup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | `Any` | Yes | The provider information for the followup |
| `sender` | `Any` | No | The sender information to be used with the payment |

### Operations

#### `create(reqdata, ctrl=None) -> FollowupEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Followup().create({
    "payment_id": "example_payment_id",  # str
    "provider": "example_provider",  # Any
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FollowupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HealthcheckEntity

```python
healthcheck = client.Healthcheck()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `details` | `dict` | No |  |
| `error` | `dict` | No |  |
| `info` | `dict` | No |  |
| `status` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> HealthcheckEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Healthcheck().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HealthcheckEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HostedUiCustomizationEntity

```python
hosted_ui_customization = client.HostedUiCustomization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `clientId` | `str` | Yes |  |
| `faviconUrl` | `str` | Yes |  |
| `footerText` | `str` | Yes |  |
| `id` | `str` | No |  |
| `logoUrl` | `str` | Yes |  |
| `primaryColor` | `str` | Yes |  |
| `privacyPolicyUrl` | `str` | Yes |  |
| `psuPortalBaseUrl` | `str` | Yes |  |
| `termsUrl` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> HostedUiCustomizationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.HostedUiCustomization().load({"id": "hosted_ui_customization_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HostedUiCustomizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentEntity

```python
payment = client.Payment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | Payment amount |
| `createdAt` | `str` | Yes |  |
| `currency` | `str` | Yes | Currency code |
| `id` | `str` | Yes | Unique payment identifier |
| `metadata` | `dict` | Yes |  |
| `paymentScheme` | `Any` | Yes | Payment scheme used |
| `provider` | `Any` | Yes | Payment provider details. |
| `recipient` | `dict` | Yes | Data about the party receiving the payment. |
| `remittanceInformation` | `Any` | Yes | Unstructured or structured remittance information. |
| `sender` | `dict` | Yes | Data about the party sending the payment. |
| `updatedAt` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> PaymentEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Payment().create({
    "amount": 1,  # float
    "currency": "example_currency",  # str
    "metadata": {},  # dict
    "paymentScheme": "example_paymentScheme",  # Any
    "recipient": {},  # dict
    "remittanceInformation": "example_remittanceInformation",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list[PaymentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Payment().list()
for payment in results:
    print(payment.data_get())
```

#### `load(reqmatch, ctrl=None) -> PaymentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Payment().load({"id": "payment_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PaymentStatusEntity

```python
payment_status = client.PaymentStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | Yes | Timestamp of status creation |
| `detailedStatus` | `str` | Yes | Detailed payment status |
| `failureReasons` | `list` | Yes | Failure reasons (for `status: FAILED` only) |
| `id` | `str` | Yes | Unique payment status identifier |
| `paymentId` | `str` | Yes | Unique payment identifier |
| `status` | `str` | Yes | Payment status. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[PaymentStatusEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.PaymentStatus().list({"payment_id": "example"})
for payment_status in results:
    print(payment_status.data_get())
```

#### `load(reqmatch, ctrl=None) -> PaymentStatusEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.PaymentStatus().load({"payment_id": "payment_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PaymentStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProviderEntity

```python
provider = client.Provider()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `str` | Yes | BIC code of the provider |
| `countryCode` | `str` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `str` | Yes | URL of the provider's icon. |
| `id` | `str` | Yes | Unique identifier for the provider. |
| `logoUrl` | `str` | Yes | URL of the provider's logo. |
| `name` | `str` | Yes | Name of the provider. |
| `paymentSchemes` | `list` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `list` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ProviderEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Provider().list()
for provider in results:
    print(provider.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProviderEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PsuProvidedDataEntity

```python
psu_provided_data = client.PsuProvidedData()
```

### Operations

#### `update(reqdata, ctrl=None) -> PsuProvidedDataEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.PsuProvidedData().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PsuProvidedDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportEntity

```python
report = client.Report()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount` | `float` | Yes | Payment amount |
| `createdAt` | `str` | Yes |  |
| `currency` | `str` | Yes | Currency code |
| `id` | `str` | Yes | Unique payment identifier |
| `provider` | `dict` | No | Selected provider details (name, country). |
| `recipient` | `dict` | Yes |  |
| `remittanceInformation` | `Any` | Yes |  |
| `sender` | `dict` | No |  |
| `status` | `str` | Yes | The most recent status of the payment. |

### Operations

#### `load(reqmatch, ctrl=None) -> ReportEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Report().load({"id": "report_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaDataEntity

```python
sca_data = client.ScaData()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ScaDataEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ScaData().load()
```

#### `update(reqdata, ctrl=None) -> ScaDataEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ScaData().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScaMethodEntity

```python
sca_method = client.ScaMethod()
```

### Operations

#### `load(reqmatch, ctrl=None) -> ScaMethodEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ScaMethod().load()
```

#### `update(reqdata, ctrl=None) -> ScaMethodEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.ScaMethod().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScaMethodEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SenderAccountEntity

```python
sender_account = client.SenderAccount()
```

### Operations

#### `load(reqmatch, ctrl=None) -> SenderAccountEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.SenderAccount().load({"provider_id": "provider_id", "state": "state"})
```

#### `update(reqdata, ctrl=None) -> SenderAccountEntity`

Update an existing entity. The data must include the entity `id`. Returns the updated entity and raises on error.

```python
result = client.SenderAccount().update({
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SenderAccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubsidiaryEntity

```python
subsidiary = client.Subsidiary()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bic` | `str` | Yes | BIC code of the provider |
| `countryCode` | `str` | Yes | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Yes | Whether the provider has subsidiaries. |
| `iconUrl` | `str` | Yes | URL of the provider's icon. |
| `id` | `str` | Yes | Unique identifier for the provider. |
| `logoUrl` | `str` | Yes | URL of the provider's logo. |
| `name` | `str` | Yes | Name of the provider. |
| `paymentSchemes` | `list` | Yes | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `list` | Yes | Array of required payment fields for this provider. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SubsidiaryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Subsidiary().list({"provider_id": "example"})
for subsidiary in results:
    print(subsidiary.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubsidiaryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TokenEntity

```python
token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | Yes | The JWT access token. |
| `expires_in` | `float` | Yes | Expiration time of the token in seconds. |
| `grant_type` | `str` | Yes | The type of grant being requested. |
| `scope` | `str` | Yes | Scopes being requested. |
| `token_type` | `str` | Yes | Token type. |

### Operations

#### `create(reqdata, ctrl=None) -> TokenEntity`

Create a new entity with the given data. Returns the created entity and raises on error.

```python
result = client.Token().create({
    "access_token": "example_access_token",  # str
    "expires_in": 1,  # float
    "grant_type": "example_grant_type",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


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

```python
client = KashimiSDK({
    "feature": {
        "conform": {"active": True},
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "secrets": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

