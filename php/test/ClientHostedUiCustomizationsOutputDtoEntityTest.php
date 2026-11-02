<?php
declare(strict_types=1);

// ClientHostedUiCustomizationsOutputDto entity test

require_once __DIR__ . '/../kashimi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ClientHostedUiCustomizationsOutputDtoEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = KashimiSDK::test(null, null);
        $ent = $testsdk->ClientHostedUiCustomizationsOutputDto(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = KashimiConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = KashimiSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->ClientHostedUiCustomizationsOutputDto(null)->load(["id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = client_hosted_ui_customizations_output_dto_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "client_hosted_ui_customizations_output_dto." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: " . "the flow loads a client_hosted_ui_customizations_output_dto record it has no list to find");
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $client_hosted_ui_customizations_output_dto_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.client_hosted_ui_customizations_output_dto")));
        $client_hosted_ui_customizations_output_dto_ref01_data = null;
        if (count($client_hosted_ui_customizations_output_dto_ref01_data_raw) > 0) {
            $client_hosted_ui_customizations_output_dto_ref01_data = Helpers::to_map($client_hosted_ui_customizations_output_dto_ref01_data_raw[0][1]);
        }

        // LOAD
        $client_hosted_ui_customizations_output_dto_ref01_ent = $client->ClientHostedUiCustomizationsOutputDto(null);
        $client_hosted_ui_customizations_output_dto_ref01_match_dt0 = [
            "id" => $client_hosted_ui_customizations_output_dto_ref01_data["id"],
        ];
        $client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded = $client_hosted_ui_customizations_output_dto_ref01_ent->load($client_hosted_ui_customizations_output_dto_ref01_match_dt0, null);
        $client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result = Helpers::to_map(is_object($client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded) && method_exists($client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded, 'data_get') ? $client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded->data_get() : $client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded);
        $this->assertNotNull($client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result);
        $this->assertEquals($client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result["id"], $client_hosted_ui_customizations_output_dto_ref01_data["id"]);

    }
}

function client_hosted_ui_customizations_output_dto_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/client_hosted_ui_customizations_output_dto/ClientHostedUiCustomizationsOutputDtoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KashimiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["client_hosted_ui_customizations_output_dto01", "client_hosted_ui_customizations_output_dto02", "client_hosted_ui_customizations_output_dto03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID" => $idmap,
        "KASHIMI_TEST_LIVE" => "FALSE",
        "KASHIMI_TEST_EXPLAIN" => "FALSE",
        "KASHIMI_APIKEY" => "",
        "KASHIMI_SERVER_BASE" => '',
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["KASHIMI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["KASHIMI_APIKEY"],
                "server" => [
                    "base" => $env["KASHIMI_SERVER_BASE"],
                ],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new KashimiSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["KASHIMI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["KASHIMI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
