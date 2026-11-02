# Kashimi Golang SDK



The Golang SDK for the Kashimi API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Callback(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/kashimi-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/kashimi-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/kashimi-sdk/go=../kashimi-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/kashimi-sdk/go"
)

func main() {
    client := sdk.NewKashimiSDK(map[string]any{
        "apikey": os.Getenv("KASHIMI_APIKEY"),
    })

    // Load a single callback — the value is the entity; Data() reads its record.
    callback, err := client.Callback(nil).Load(map[string]any{"provider_id": "example_provider_id", "state": "example_state"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(callback.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
clientjwk, err := client.ClientJwk(nil).Load(map[string]any{"client_id": "example", "provider_id": "example"}, nil)
if err != nil {
    // handle err
    return
}
_ = clientjwk
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

clientJwk, err := client.ClientJwk(nil).Load(
    map[string]any{"client_id": "example", "provider_id": "example"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(clientJwk.(sdk.Entity).Data()) // the entity's mock record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewKashimiSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewKashimiSDK

```go
func NewKashimiSDK(options map[string]any) *KashimiSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *KashimiSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### KashimiSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Callback` | `(data map[string]any) KashimiEntityBase` | Create a Callback entity instance. |
| `ClientJwk` | `(data map[string]any) KashimiEntityBase` | Create a ClientJwk entity instance. |
| `ConfirmationData` | `(data map[string]any) KashimiEntityBase` | Create a ConfirmationData entity instance. |
| `ConsentStatus` | `(data map[string]any) KashimiEntityBase` | Create a ConsentStatus entity instance. |
| `Country` | `(data map[string]any) KashimiEntityBase` | Create a Country entity instance. |
| `Followup` | `(data map[string]any) KashimiEntityBase` | Create a Followup entity instance. |
| `Healthcheck` | `(data map[string]any) KashimiEntityBase` | Create a Healthcheck entity instance. |
| `HostedUiCustomization` | `(data map[string]any) KashimiEntityBase` | Create a HostedUiCustomization entity instance. |
| `Payment` | `(data map[string]any) KashimiEntityBase` | Create a Payment entity instance. |
| `PaymentStatus` | `(data map[string]any) KashimiEntityBase` | Create a PaymentStatus entity instance. |
| `Provider` | `(data map[string]any) KashimiEntityBase` | Create a Provider entity instance. |
| `PsuProvidedData` | `(data map[string]any) KashimiEntityBase` | Create a PsuProvidedData entity instance. |
| `Report` | `(data map[string]any) KashimiEntityBase` | Create a Report entity instance. |
| `ScaData` | `(data map[string]any) KashimiEntityBase` | Create a ScaData entity instance. |
| `ScaMethod` | `(data map[string]any) KashimiEntityBase` | Create a ScaMethod entity instance. |
| `SenderAccount` | `(data map[string]any) KashimiEntityBase` | Create a SenderAccount entity instance. |
| `Subsidiary` | `(data map[string]any) KashimiEntityBase` | Create a Subsidiary entity instance. |
| `Token` | `(data map[string]any) KashimiEntityBase` | Create a Token entity instance. |

### Entity interface (KashimiEntityBase)

All entities implement the `KashimiEntityBase` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity, and return it. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity, and return it. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    callback, err := client.Callback(nil).Load(map[string]any{"provider_id": "example", "state": "example"}, nil)
    if err != nil { /* handle */ }
    // callback is the entity; callback.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `"provider"` | The provider information for the followup |
| `"sender"` | The sender information to be used with the payment |

Operations: Create.

API path: `/api/v1/ob/payments/{paymentId}/followups`

#### Healthcheck

| Field | Description |
| --- | --- |
| `"details"` |  |
| `"error"` |  |
| `"info"` |  |
| `"status"` |  |

Operations: Load.

API path: `/api/status`

#### HostedUiCustomization

| Field | Description |
| --- | --- |
| `"clientId"` |  |
| `"faviconUrl"` |  |
| `"footerText"` |  |
| `"logoUrl"` |  |
| `"primaryColor"` |  |
| `"privacyPolicyUrl"` |  |
| `"psuPortalBaseUrl"` |  |
| `"termsUrl"` |  |

Operations: Load.

API path: `/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations`

#### Payment

| Field | Description |
| --- | --- |
| `"amount"` | Payment amount |
| `"createdAt"` |  |
| `"currency"` | Currency code |
| `"id"` | Unique payment identifier |
| `"metadata"` |  |
| `"paymentScheme"` | Payment scheme used |
| `"provider"` | Payment provider details. |
| `"recipient"` | Data about the party receiving the payment. |
| `"remittanceInformation"` | Unstructured or structured remittance information. |
| `"sender"` | Data about the party sending the payment. |
| `"updatedAt"` |  |

Operations: Create, List, Load.

API path: `/api/v1/ob/payments/cancel`

#### PaymentStatus

| Field | Description |
| --- | --- |
| `"createdAt"` | Timestamp of status creation |
| `"detailedStatus"` | Detailed payment status |
| `"failureReasons"` | Failure reasons (for `status: FAILED` only) |
| `"id"` | Unique payment status identifier |
| `"paymentId"` | Unique payment identifier |
| `"status"` | Payment status. |

Operations: List, Load.

API path: `/api/v1/archive/payment-statuses`

#### Provider

| Field | Description |
| --- | --- |
| `"bic"` | BIC code of the provider |
| `"countryCode"` | Country code of the provider. |
| `"hasSubsidiaries"` | Whether the provider has subsidiaries. |
| `"iconUrl"` | URL of the provider's icon. |
| `"id"` | Unique identifier for the provider. |
| `"logoUrl"` | URL of the provider's logo. |
| `"name"` | Name of the provider. |
| `"paymentSchemes"` | Array of payment schemes that we support for this provider. |
| `"requiredPaymentFields"` | Array of required payment fields for this provider. |

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
| `"amount"` | Payment amount |
| `"createdAt"` |  |
| `"currency"` | Currency code |
| `"id"` | Unique payment identifier |
| `"provider"` | Selected provider details (name, country). |
| `"recipient"` |  |
| `"remittanceInformation"` |  |
| `"sender"` |  |
| `"status"` | The most recent status of the payment. |

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
| `"bic"` | BIC code of the provider |
| `"countryCode"` | Country code of the provider. |
| `"hasSubsidiaries"` | Whether the provider has subsidiaries. |
| `"iconUrl"` | URL of the provider's icon. |
| `"id"` | Unique identifier for the provider. |
| `"logoUrl"` | URL of the provider's logo. |
| `"name"` | Name of the provider. |
| `"paymentSchemes"` | Array of payment schemes that we support for this provider. |
| `"requiredPaymentFields"` | Array of required payment fields for this provider. |

Operations: List.

API path: `/api/v1/capabilities/providers/{id}/subsidiaries`

#### Token

| Field | Description |
| --- | --- |
| `"access_token"` | The JWT access token. |
| `"expires_in"` | Expiration time of the token in seconds. |
| `"grant_type"` | The type of grant being requested. |
| `"scope"` | Scopes being requested. |
| `"token_type"` | Token type. |

Operations: Create.

API path: `/api/v1/auth/token`



## Entities


### Callback

Create an instance: `callback := client.Callback(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
callback, err := client.Callback(nil).Load(map[string]any{"provider_id": "provider_id", "state": "state"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(callback.(sdk.Entity).Data()) // the loaded entity's record
```


### ClientJwk

Create an instance: `clientJwk := client.ClientJwk(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
clientJwk, err := client.ClientJwk(nil).Load(map[string]any{"client_id": "client_id", "provider_id": "provider_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(clientJwk.(sdk.Entity).Data()) // the loaded entity's record
```


### ConfirmationData

Create an instance: `confirmationData := client.ConfirmationData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
confirmationData, err := client.ConfirmationData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(confirmationData.(sdk.Entity).Data()) // the loaded entity's record
```


### ConsentStatus

Create an instance: `consentStatus := client.ConsentStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
consentStatus, err := client.ConsentStatus(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(consentStatus.(sdk.Entity).Data()) // the loaded entity's record
```


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range countrys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Followup

Create an instance: `followup := client.Followup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `provider` | `any` | The provider information for the followup |
| `sender` | `any` | The sender information to be used with the payment |

#### Example: Create

```go
result, err := client.Followup(nil).Create(map[string]any{
    "payment_id": "example_payment_id",
    "provider": "example_provider",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### Healthcheck

Create an instance: `healthcheck := client.Healthcheck(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `details` | `map[string]any` |  |
| `error` | `map[string]any` |  |
| `info` | `map[string]any` |  |
| `status` | `string` |  |

#### Example: Load

```go
healthcheck, err := client.Healthcheck(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(healthcheck.(sdk.Entity).Data()) // the loaded entity's record
```


### HostedUiCustomization

Create an instance: `hostedUiCustomization := client.HostedUiCustomization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
hostedUiCustomization, err := client.HostedUiCustomization(nil).Load(map[string]any{"client_id": "client_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(hostedUiCustomization.(sdk.Entity).Data()) // the loaded entity's record
```


### Payment

Create an instance: `payment := client.Payment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | Payment amount |
| `createdAt` | `string` |  |
| `currency` | `string` | Currency code |
| `id` | `string` | Unique payment identifier |
| `metadata` | `map[string]any` |  |
| `paymentScheme` | `any` | Payment scheme used |
| `provider` | `any` | Payment provider details. |
| `recipient` | `map[string]any` | Data about the party receiving the payment. |
| `remittanceInformation` | `any` | Unstructured or structured remittance information. |
| `sender` | `map[string]any` | Data about the party sending the payment. |
| `updatedAt` | `string` |  |

#### Example: Load

```go
payment, err := client.Payment(nil).Load(map[string]any{"id": "payment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(payment.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
payments, err := client.Payment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range payments.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

#### Example: Create

```go
result, err := client.Payment(nil).Create(map[string]any{
    "amount": 1,
    "currency": "example_currency",
    "metadata": map[string]any{},
    "paymentScheme": "example_paymentScheme",
    "recipient": map[string]any{},
    "remittanceInformation": "example_remittanceInformation",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
```


### PaymentStatus

Create an instance: `paymentStatus := client.PaymentStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Timestamp of status creation |
| `detailedStatus` | `string` | Detailed payment status |
| `failureReasons` | `[]any` | Failure reasons (for `status: FAILED` only) |
| `id` | `string` | Unique payment status identifier |
| `paymentId` | `string` | Unique payment identifier |
| `status` | `string` | Payment status. |

#### Example: Load

```go
paymentStatus, err := client.PaymentStatus(nil).Load(map[string]any{"payment_id": "payment_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(paymentStatus.(sdk.Entity).Data()) // the loaded entity's record
```

#### Example: List

```go
paymentStatuss, err := client.PaymentStatus(nil).List(map[string]any{"payment_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range paymentStatuss.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Provider

Create an instance: `provider := client.Provider(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `string` | BIC code of the provider |
| `countryCode` | `string` | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | URL of the provider's icon. |
| `id` | `string` | Unique identifier for the provider. |
| `logoUrl` | `string` | URL of the provider's logo. |
| `name` | `string` | Name of the provider. |
| `paymentSchemes` | `[]any` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `[]any` | Array of required payment fields for this provider. |

#### Example: List

```go
providers, err := client.Provider(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range providers.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### PsuProvidedData

Create an instance: `psuProvidedData := client.PsuProvidedData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Update(data, ctrl)` | Update an existing entity. |


### Report

Create an instance: `report := client.Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount` | `float64` | Payment amount |
| `createdAt` | `string` |  |
| `currency` | `string` | Currency code |
| `id` | `string` | Unique payment identifier |
| `provider` | `map[string]any` | Selected provider details (name, country). |
| `recipient` | `map[string]any` |  |
| `remittanceInformation` | `any` |  |
| `sender` | `map[string]any` |  |
| `status` | `string` | The most recent status of the payment. |

#### Example: Load

```go
report, err := client.Report(nil).Load(map[string]any{"id": "report_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(report.(sdk.Entity).Data()) // the loaded entity's record
```


### ScaData

Create an instance: `scaData := client.ScaData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Example: Load

```go
scaData, err := client.ScaData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(scaData.(sdk.Entity).Data()) // the loaded entity's record
```


### ScaMethod

Create an instance: `scaMethod := client.ScaMethod(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Example: Load

```go
scaMethod, err := client.ScaMethod(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(scaMethod.(sdk.Entity).Data()) // the loaded entity's record
```


### SenderAccount

Create an instance: `senderAccount := client.SenderAccount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Example: Load

```go
senderAccount, err := client.SenderAccount(nil).Load(map[string]any{"provider_id": "provider_id", "state": "state"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(senderAccount.(sdk.Entity).Data()) // the loaded entity's record
```


### Subsidiary

Create an instance: `subsidiary := client.Subsidiary(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bic` | `string` | BIC code of the provider |
| `countryCode` | `string` | Country code of the provider. |
| `hasSubsidiaries` | `bool` | Whether the provider has subsidiaries. |
| `iconUrl` | `string` | URL of the provider's icon. |
| `id` | `string` | Unique identifier for the provider. |
| `logoUrl` | `string` | URL of the provider's logo. |
| `name` | `string` | Name of the provider. |
| `paymentSchemes` | `[]any` | Array of payment schemes that we support for this provider. |
| `requiredPaymentFields` | `[]any` | Array of required payment fields for this provider. |

#### Example: List

```go
subsidiarys, err := client.Subsidiary(nil).List(map[string]any{"provider_id": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range subsidiarys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Token

Create an instance: `token := client.Token(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` | The JWT access token. |
| `expires_in` | `float64` | Expiration time of the token in seconds. |
| `grant_type` | `string` | The type of grant being requested. |
| `scope` | `string` | Scopes being requested. |
| `token_type` | `string` | Token type. |

#### Example: Create

```go
result, err := client.Token(nil).Create(map[string]any{
    "access_token": "example_access_token",
    "expires_in": 1,
    "grant_type": "example_grant_type",
    "scope": "example_scope",
    "token_type": "example_token_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result.(sdk.Entity).Data()) // the created entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/kashimi-sdk/go/
├── kashimi.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/kashimi-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
clientjwk := client.ClientJwk(nil)
clientjwk.Load(map[string]any{"client_id": "example", "provider_id": "example"}, nil)

// clientjwk.Data() now returns the clientjwk data from the last load
// clientjwk.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
