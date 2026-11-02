<?php
declare(strict_types=1);

// PsuProvidedData entity test

require_once __DIR__ . '/../kashimi_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PsuProvidedDataEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = KashimiSDK::test(null, null);
        $ent = $testsdk->PsuProvidedData(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = psu_provided_data_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["update"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "psu_provided_data." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"psu_provided_data.update.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: psu_provided_data.update.0 excluded (GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data)');
        }

        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $psu_provided_data_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.psu_provided_data")));
        $psu_provided_data_ref01_data = null;
        if (count($psu_provided_data_ref01_data_raw) > 0) {
            $psu_provided_data_ref01_data = Helpers::to_map($psu_provided_data_ref01_data_raw[0][1]);
        }

        // UPDATE
        $psu_provided_data_ref01_ent = $client->PsuProvidedData(null);
        $psu_provided_data_ref01_data_up0_up = [
        ];

        $psu_provided_data_ref01_resdata_up0_result = $psu_provided_data_ref01_ent->update($psu_provided_data_ref01_data_up0_up, null);
        $psu_provided_data_ref01_resdata_up0 = Helpers::to_map(is_object($psu_provided_data_ref01_resdata_up0_result) && method_exists($psu_provided_data_ref01_resdata_up0_result, 'data_get') ? $psu_provided_data_ref01_resdata_up0_result->data_get() : $psu_provided_data_ref01_resdata_up0_result);
        $this->assertNotNull($psu_provided_data_ref01_resdata_up0);

    }
}

function psu_provided_data_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/psu_provided_data/PsuProvidedDataTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = KashimiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["psu_provided_data01", "psu_provided_data02", "psu_provided_data03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID" => $idmap,
        "KASHIMI_TEST_LIVE" => "FALSE",
        "KASHIMI_TEST_EXPLAIN" => "FALSE",
        "KASHIMI_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"]);
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
