# Kashimi Python SDK



The Python SDK for the Kashimi API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Capability()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/kashimi-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from kashimi_sdk import KashimiSDK

client = KashimiSDK({
    "apikey": os.environ.get("KASHIMI_APIKEY"),
    "server": {
        "base": "<base>",
    },
})
```

### 2. List capability records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    capabilitys = client.Capability().list()
    for capability in capabilitys:
        print(capability.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    latests = client.Latest().list({"payment_id": "example"})
    print([item.data_get() for item in latests])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = KashimiSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
latest = client.Latest().list({"payment_id": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = KashimiSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### KashimiSDK

```python
from kashimi_sdk import KashimiSDK

client = KashimiSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = KashimiSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### KashimiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity, and return it. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity, and return it. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `capability = client.Capability()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
capabilitys = client.Capability().list()
```


### ClientHostedUiCustomizationsOutputDto

Create an instance: `client_hosted_ui_customizations_output_dto = client.ClientHostedUiCustomizationsOutputDto()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
client_hosted_ui_customizations_output_dto = client.ClientHostedUiCustomizationsOutputDto().load({"id": "client_hosted_ui_customizations_output_dto_id"})
```


### CreatePaymentOutputDto

Create an instance: `create_payment_output_dto = client.CreatePaymentOutputDto()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | The amount to be transferred. |
| `currency` | `str` | The currency of the payment. |
| `metadata` | `dict` |  |
| `paymentScheme` | `Any` | Payment scheme. |
| `provider` | `Any` | The provider information for the followup |
| `recipient` | `Any` | Data about the party receiving the payment. |
| `remittanceInformation` | `Any` | Unstructured or structured remittance information. |
| `sender` | `Any` | The sender information to be used with the payment |

#### Example: Create

```python
create_payment_output_dto = client.CreatePaymentOutputDto().create({
    "amount": 1,  # float
    "currency": "example_currency",  # str
    "metadata": {},  # dict
    "paymentScheme": "example_paymentScheme",  # Any
    "recipient": "example_recipient",  # Any
    "remittanceInformation": "example_remittanceInformation",  # Any
})
```


### CreateTokenOutputDto

Create an instance: `create_token_output_dto = client.CreateTokenOutputDto()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` | The JWT access token. |
| `expires_in` | `float` | Expiration time of the token in seconds. |
| `grant_type` | `str` | The type of grant being requested. |
| `scope` | `str` | Scopes being requested. |
| `token_type` | `str` | Token type. |

#### Example: Create

```python
create_token_output_dto = client.CreateTokenOutputDto().create({
    "access_token": "example_access_token",  # str
    "expires_in": 1,  # float
    "grant_type": "example_grant_type",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```


### Healthcheck

Create an instance: `healthcheck = client.Healthcheck()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `dict` |  |
| `error` | `dict` |  |
| `info` | `dict` |  |
| `status` | `str` |  |

#### Example: Load

```python
healthcheck = client.Healthcheck().load()
```


### Latest

Create an instance: `latest = client.Latest()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp of status creation |
| `detailedStatus` | `str` | Detailed payment status |
| `failureReasons` | `list` | Failure reasons (for `status: FAILED` only) |
| `id` | `str` | Unique payment status identifier |
| `paymentId` | `str` | Unique payment identifier |
| `status` | `str` | Payment status. |

#### Example: List

```python
latests = client.Latest().list({"payment_id": "example"})
```


### Obn

Create an instance: `obn = client.Obn()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Example: Load

```python
obn = client.Obn().load({"provider_id": "provider_id", "state": "state"})
```

#### Example: Create

```python
obn = client.Obn().create({
    "provider_id": "example_provider_id",  # str
    "state": "example_state",  # str
})
```


### Payment

Create an instance: `payment = client.Payment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float` | Payment amount |
| `clientId` | `str` | Client identifier |
| `createdAt` | `str` |  |
| `currency` | `str` | Currency code |
| `id` | `str` | Unique payment identifier |
| `metadata` | `dict` |  |
| `paymentScheme` | `Any` | Payment scheme used |
| `provider` | `Any` | Payment provider details. |
| `recipient` | `dict` |  |
| `remittanceInformation` | `Any` | Unstructured or structured remittance information. |
| `sender` | `dict` |  |
| `status` | `str` | The most recent status of the payment. |
| `updatedAt` | `str` |  |

#### Example: Load

```python
payment = client.Payment().load({"id": "payment_id"})
```

#### Example: List

```python
payments = client.Payment().list()
```


### PaymentStatus

Create an instance: `payment_status = client.PaymentStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Timestamp of status creation |
| `detailedStatus` | `str` | Detailed payment status |
| `failureReasons` | `list` | Failure reasons (for `status: FAILED` only) |
| `id` | `str` | Unique payment status identifier |
| `paymentId` | `str` | Unique payment identifier |
| `status` | `str` | Payment status. |

#### Example: List

```python
payment_statuss = client.PaymentStatus().list({"payment_id": "example"})
```


### Provider

Create an instance: `provider = client.Provider()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `str` | BIC code of the provider |
| `countryCode` | `str` | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Whether the provider has subsidiaries. |
| `iconUrl` | `str` | URL of the provider's icon. |
| `id` | `str` | Unique identifier for the provider. |
| `logoUrl` | `str` | URL of the provider's logo. |
| `name` | `str` | Name of the provider. |
| `paymentSchemes` | `list` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `list` | Array of required payment fields for this provider. |

#### Example: List

```python
providers = client.Provider().list()
```


### ProvidersSubsidiaryOutputDto

Create an instance: `providers_subsidiary_output_dto = client.ProvidersSubsidiaryOutputDto()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `str` | BIC code of the provider |
| `countryCode` | `str` | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Whether the provider has subsidiaries. |
| `iconUrl` | `str` | URL of the provider's icon. |
| `id` | `str` | Unique identifier for the provider. |
| `logoUrl` | `str` | URL of the provider's logo. |
| `name` | `str` | Name of the provider. |
| `paymentSchemes` | `list` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `list` | Array of required payment fields for this provider. |

#### Example: List

```python
providers_subsidiary_output_dtos = client.ProvidersSubsidiaryOutputDto().list({"provider_id": "example"})
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── kashimi_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`kashimi_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
latest = client.Latest()
latest.list({"payment_id": "example"})

# latest.data_get() now returns the latest data from the last list
# latest.match_get() returns the last match criteria
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
