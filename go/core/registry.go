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

var NewCallbackEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewClientJwkEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewConfirmationDataEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewConsentStatusEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewCountryEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewFollowupEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewHealthcheckEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewHostedUiCustomizationEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewPaymentEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewPaymentStatusEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewProviderEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewPsuProvidedDataEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewReportEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewScaDataEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewScaMethodEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewSenderAccountEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewSubsidiaryEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

var NewTokenEntityFunc func(client *KashimiSDK, entopts map[string]any) KashimiEntityBase

