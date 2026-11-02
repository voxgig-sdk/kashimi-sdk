// Typed models for the Kashimi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/kashimi-sdk/go/core"
)

// Capability is the typed data model for the capability entity.
type Capability struct {
}

// CapabilityListMatch is the typed request payload for Capability.ListTyped.
type CapabilityListMatch struct {
}

// ClientHostedUiCustomizationsOutputDto is the typed data model for the client_hosted_ui_customizations_output_dto entity.
type ClientHostedUiCustomizationsOutputDto struct {
}

// ClientHostedUiCustomizationsOutputDtoLoadMatch is the typed request payload for ClientHostedUiCustomizationsOutputDto.LoadTyped.
type ClientHostedUiCustomizationsOutputDtoLoadMatch struct {
	Id string `json:"id"`
}

// CreatePaymentOutputDto is the typed data model for the create_payment_output_dto entity.
type CreatePaymentOutputDto struct {
}

// CreatePaymentOutputDtoCreateData is the typed request payload for CreatePaymentOutputDto.CreateTyped.
type CreatePaymentOutputDtoCreateData struct {
	Amount float64 `json:"amount"`
	Currency string `json:"currency"`
	Metadata map[string]any `json:"metadata"`
	PaymentScheme any `json:"paymentScheme"`
	Provider *any `json:"provider,omitempty"`
	Recipient any `json:"recipient"`
	RemittanceInformation any `json:"remittanceInformation"`
	Sender *any `json:"sender,omitempty"`
}

// CreateTokenOutputDto is the typed data model for the create_token_output_dto entity.
type CreateTokenOutputDto struct {
}

// CreateTokenOutputDtoCreateData is the typed request payload for CreateTokenOutputDto.CreateTyped.
type CreateTokenOutputDtoCreateData struct {
	AccessToken string `json:"access_token"`
	ExpiresIn float64 `json:"expires_in"`
	GrantType string `json:"grant_type"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
}

// Healthcheck is the typed data model for the healthcheck entity.
type Healthcheck struct {
}

// HealthcheckLoadMatch is the typed request payload for Healthcheck.LoadTyped.
type HealthcheckLoadMatch struct {
	Details *map[string]any `json:"details,omitempty"`
	Error *map[string]any `json:"error,omitempty"`
	Info *map[string]any `json:"info,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Latest is the typed data model for the latest entity.
type Latest struct {
}

// LatestListMatch is the typed request payload for Latest.ListTyped.
type LatestListMatch struct {
	PaymentId string `json:"payment_id"`
}

// Obn is the typed data model for the obn entity.
type Obn struct {
}

// ObnLoadMatch is the typed request payload for Obn.LoadTyped.
type ObnLoadMatch struct {
	ProviderId string `json:"provider_id"`
	State string `json:"state"`
}

// ObnCreateData is the typed request payload for Obn.CreateTyped.
type ObnCreateData struct {
	ProviderId string `json:"provider_id"`
	State string `json:"state"`
}

// ObnUpdateData is the typed request payload for Obn.UpdateTyped.
type ObnUpdateData struct {
}

// Payment is the typed data model for the payment entity.
type Payment struct {
}

// PaymentLoadMatch is the typed request payload for Payment.LoadTyped.
type PaymentLoadMatch struct {
	Id string `json:"id"`
}

// PaymentListMatch is the typed request payload for Payment.ListTyped.
type PaymentListMatch struct {
	CursorValue *string `json:"cursor_value,omitempty"`
	FiltersCreatedAtFrom *string `json:"filters_created_at_from,omitempty"`
	FiltersCreatedAtTo *string `json:"filters_created_at_to,omitempty"`
	FiltersMetadataEndToEndId *string `json:"filters_metadata_end_to_end_id,omitempty"`
}

// PaymentStatus is the typed data model for the payment_status entity.
type PaymentStatus struct {
}

// PaymentStatusListMatch is the typed request payload for PaymentStatus.ListTyped.
type PaymentStatusListMatch struct {
	PaymentId string `json:"payment_id"`
}

// Provider is the typed data model for the provider entity.
type Provider struct {
}

// ProviderListMatch is the typed request payload for Provider.ListTyped.
type ProviderListMatch struct {
	Cursor *map[string]any `json:"cursor,omitempty"`
	Filter *map[string]any `json:"filter,omitempty"`
}

// ProvidersSubsidiaryOutputDto is the typed data model for the providers_subsidiary_output_dto entity.
type ProvidersSubsidiaryOutputDto struct {
}

// ProvidersSubsidiaryOutputDtoListMatch is the typed request payload for ProvidersSubsidiaryOutputDto.ListTyped.
type ProvidersSubsidiaryOutputDtoListMatch struct {
	ProviderId string `json:"provider_id"`
	Cursor *map[string]any `json:"cursor,omitempty"`
	Filter *map[string]any `json:"filter,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
