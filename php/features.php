<?php
declare(strict_types=1);

// Kashimi SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/ConformFeature.php';
require_once __DIR__ . '/feature/DebugFeature.php';
require_once __DIR__ . '/feature/IdempotencyFeature.php';
require_once __DIR__ . '/feature/MetricsFeature.php';
require_once __DIR__ . '/feature/PagingFeature.php';
require_once __DIR__ . '/feature/RatelimitFeature.php';
require_once __DIR__ . '/feature/RetryFeature.php';
require_once __DIR__ . '/feature/SecretsFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';
require_once __DIR__ . '/feature/TimeoutFeature.php';


class KashimiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KashimiBaseFeature();
            case "conform":
                return new KashimiConformFeature();
            case "debug":
                return new KashimiDebugFeature();
            case "idempotency":
                return new KashimiIdempotencyFeature();
            case "metrics":
                return new KashimiMetricsFeature();
            case "paging":
                return new KashimiPagingFeature();
            case "ratelimit":
                return new KashimiRatelimitFeature();
            case "retry":
                return new KashimiRetryFeature();
            case "secrets":
                return new KashimiSecretsFeature();
            case "test":
                return new KashimiTestFeature();
            case "timeout":
                return new KashimiTimeoutFeature();
            default:
                return new KashimiBaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "conform":
            case "debug":
            case "idempotency":
            case "metrics":
            case "paging":
            case "ratelimit":
            case "retry":
            case "secrets":
            case "test":
            case "timeout":
                return true;
            default:
                return false;
        }
    }
}
