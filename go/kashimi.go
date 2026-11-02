package voxgigkashimisdk

import (
	"github.com/voxgig-sdk/kashimi-sdk/go/core"
	"github.com/voxgig-sdk/kashimi-sdk/go/entity"
	"github.com/voxgig-sdk/kashimi-sdk/go/feature"
	_ "github.com/voxgig-sdk/kashimi-sdk/go/utility"
)

// Type aliases preserve external API.
type KashimiSDK = core.KashimiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KashimiEntityBase = core.KashimiEntityBase

// Deprecated: use KashimiEntityBase.
type KashimiEntity = core.KashimiEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KashimiError = core.KashimiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewSecretsFeatureFunc = func() core.Feature {
		return feature.NewSecretsFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCallbackEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewCallbackEntity(client, entopts)
	}
	core.NewClientJwkEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewClientJwkEntity(client, entopts)
	}
	core.NewConfirmationDataEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewConfirmationDataEntity(client, entopts)
	}
	core.NewConsentStatusEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewConsentStatusEntity(client, entopts)
	}
	core.NewCountryEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewFollowupEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewFollowupEntity(client, entopts)
	}
	core.NewHealthcheckEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewHealthcheckEntity(client, entopts)
	}
	core.NewHostedUiCustomizationEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewHostedUiCustomizationEntity(client, entopts)
	}
	core.NewPaymentEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewPaymentEntity(client, entopts)
	}
	core.NewPaymentStatusEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewPaymentStatusEntity(client, entopts)
	}
	core.NewProviderEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewProviderEntity(client, entopts)
	}
	core.NewPsuProvidedDataEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewPsuProvidedDataEntity(client, entopts)
	}
	core.NewReportEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewReportEntity(client, entopts)
	}
	core.NewScaDataEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewScaDataEntity(client, entopts)
	}
	core.NewScaMethodEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewScaMethodEntity(client, entopts)
	}
	core.NewSenderAccountEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewSenderAccountEntity(client, entopts)
	}
	core.NewSubsidiaryEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewSubsidiaryEntity(client, entopts)
	}
	core.NewTokenEntityFunc = func(client *core.KashimiSDK, entopts map[string]any) core.KashimiEntityBase {
		return entity.NewTokenEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKashimiSDK = core.NewKashimiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewKashimiSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *KashimiSDK  { return NewKashimiSDK(nil) }
func Test() *KashimiSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewSecretsFeature = feature.NewSecretsFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
