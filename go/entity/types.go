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

// Callback is the typed data model for the callback entity.
type Callback struct {
}

// CallbackLoadMatch is the typed request payload for Callback.LoadTyped.
type CallbackLoadMatch struct {
	ProviderId string `json:"provider_id"`
	State string `json:"state"`
}

// ClientJwk is the typed data model for the client_jwk entity.
type ClientJwk struct {
}

// ClientJwkLoadMatch is the typed request payload for ClientJwk.LoadTyped.
type ClientJwkLoadMatch struct {
	ClientId string `json:"client_id"`
	ProviderId string `json:"provider_id"`
	Revoked *bool `json:"revoked,omitempty"`
}

// ConfirmationData is the typed data model for the confirmation_data entity.
type ConfirmationData struct {
}

// ConfirmationDataLoadMatch is the typed request payload for ConfirmationData.LoadTyped.
type ConfirmationDataLoadMatch struct {
}

// ConsentStatus is the typed data model for the consent_status entity.
type ConsentStatus struct {
}

// ConsentStatusLoadMatch is the typed request payload for ConsentStatus.LoadTyped.
type ConsentStatusLoadMatch struct {
}

// Country is the typed data model for the country entity.
type Country struct {
}

// CountryListMatch is the typed request payload for Country.ListTyped.
type CountryListMatch struct {
}

// Followup is the typed data model for the followup entity.
type Followup struct {
}

// FollowupCreateData is the typed request payload for Followup.CreateTyped.
type FollowupCreateData struct {
	PaymentId string `json:"payment_id"`
	Provider any `json:"provider"`
	Sender *any `json:"sender,omitempty"`
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

// HostedUiCustomization is the typed data model for the hosted_ui_customization entity.
type HostedUiCustomization struct {
}

// HostedUiCustomizationLoadMatch is the typed request payload for HostedUiCustomization.LoadTyped.
type HostedUiCustomizationLoadMatch struct {
	ClientId string `json:"client_id"`
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

// PaymentCreateData is the typed request payload for Payment.CreateTyped.
type PaymentCreateData struct {
	Amount float64 `json:"amount"`
	Currency string `json:"currency"`
	Metadata map[string]any `json:"metadata"`
	PaymentScheme any `json:"paymentScheme"`
	Provider *any `json:"provider,omitempty"`
	Recipient map[string]any `json:"recipient"`
	RemittanceInformation any `json:"remittanceInformation"`
	Sender *map[string]any `json:"sender,omitempty"`
}

// PaymentStatus is the typed data model for the payment_status entity.
type PaymentStatus struct {
}

// PaymentStatusLoadMatch is the typed request payload for PaymentStatus.LoadTyped.
type PaymentStatusLoadMatch struct {
	PaymentId string `json:"payment_id"`
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

// PsuProvidedData is the typed data model for the psu_provided_data entity.
type PsuProvidedData struct {
}

// PsuProvidedDataUpdateData is the typed request payload for PsuProvidedData.UpdateTyped.
type PsuProvidedDataUpdateData struct {
}

// Report is the typed data model for the report entity.
type Report struct {
}

// ReportLoadMatch is the typed request payload for Report.LoadTyped.
type ReportLoadMatch struct {
	Id string `json:"id"`
}

// ScaData is the typed data model for the sca_data entity.
type ScaData struct {
}

// ScaDataLoadMatch is the typed request payload for ScaData.LoadTyped.
type ScaDataLoadMatch struct {
}

// ScaDataUpdateData is the typed request payload for ScaData.UpdateTyped.
type ScaDataUpdateData struct {
}

// ScaMethod is the typed data model for the sca_method entity.
type ScaMethod struct {
}

// ScaMethodLoadMatch is the typed request payload for ScaMethod.LoadTyped.
type ScaMethodLoadMatch struct {
}

// ScaMethodUpdateData is the typed request payload for ScaMethod.UpdateTyped.
type ScaMethodUpdateData struct {
}

// SenderAccount is the typed data model for the sender_account entity.
type SenderAccount struct {
}

// SenderAccountLoadMatch is the typed request payload for SenderAccount.LoadTyped.
type SenderAccountLoadMatch struct {
	ProviderId string `json:"provider_id"`
	State string `json:"state"`
}

// SenderAccountUpdateData is the typed request payload for SenderAccount.UpdateTyped.
type SenderAccountUpdateData struct {
}

// Subsidiary is the typed data model for the subsidiary entity.
type Subsidiary struct {
}

// SubsidiaryListMatch is the typed request payload for Subsidiary.ListTyped.
type SubsidiaryListMatch struct {
	ProviderId string `json:"provider_id"`
	Cursor *map[string]any `json:"cursor,omitempty"`
	Filter *map[string]any `json:"filter,omitempty"`
}

// Token is the typed data model for the token entity.
type Token struct {
}

// TokenCreateData is the typed request payload for Token.CreateTyped.
type TokenCreateData struct {
	AccessToken string `json:"access_token"`
	ExpiresIn float64 `json:"expires_in"`
	GrantType string `json:"grant_type"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
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
