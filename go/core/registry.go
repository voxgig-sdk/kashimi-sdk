package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewSecretsFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCapabilityEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewClientHostedUiCustomizationsOutputDtoEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewCreatePaymentOutputDtoEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewCreateTokenOutputDtoEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewHealthcheckEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewLatestEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewObnEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewPaymentEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewPaymentStatusEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewProviderEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewProvidersSubsidiaryOutputDtoEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

