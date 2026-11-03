# Kashimi SDK feature factory

from kashimi_sdk.feature.base_feature import KashimiBaseFeature
from kashimi_sdk.feature.conform_feature import KashimiConformFeature
from kashimi_sdk.feature.debug_feature import KashimiDebugFeature
from kashimi_sdk.feature.idempotency_feature import KashimiIdempotencyFeature
from kashimi_sdk.feature.metrics_feature import KashimiMetricsFeature
from kashimi_sdk.feature.paging_feature import KashimiPagingFeature
from kashimi_sdk.feature.ratelimit_feature import KashimiRatelimitFeature
from kashimi_sdk.feature.retry_feature import KashimiRetryFeature
from kashimi_sdk.feature.secrets_feature import KashimiSecretsFeature
from kashimi_sdk.feature.test_feature import KashimiTestFeature
from kashimi_sdk.feature.timeout_feature import KashimiTimeoutFeature


_FEATURES = {
    "base": lambda: KashimiBaseFeature(),
    "conform": lambda: KashimiConformFeature(),
    "debug": lambda: KashimiDebugFeature(),
    "idempotency": lambda: KashimiIdempotencyFeature(),
    "metrics": lambda: KashimiMetricsFeature(),
    "paging": lambda: KashimiPagingFeature(),
    "ratelimit": lambda: KashimiRatelimitFeature(),
    "retry": lambda: KashimiRetryFeature(),
    "secrets": lambda: KashimiSecretsFeature(),
    "test": lambda: KashimiTestFeature(),
    "timeout": lambda: KashimiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
