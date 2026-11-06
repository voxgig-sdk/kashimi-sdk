# PsuProvidedData entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class PsuProvidedDataEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.PsuProvidedData(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = psu_provided_data_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["update"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "psu_provided_data." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"psu_provided_data.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data\"}"
      skip("Live coverage incomplete: psu_provided_data.update.0 excluded (GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data)")
    end

    client = setup[:client]

    # Bootstrap entity data from existing test data.
    psu_provided_data_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.psu_provided_data")))
    psu_provided_data_ref01_data = nil
    if psu_provided_data_ref01_data_raw.length > 0
      psu_provided_data_ref01_data = Helpers.to_map(psu_provided_data_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # UPDATE
    psu_provided_data_ref01_ent = client.PsuProvidedData(nil)
    psu_provided_data_ref01_data_up0_up = {
    }

    psu_provided_data_ref01_resdata_up0_result = psu_provided_data_ref01_ent.update(psu_provided_data_ref01_data_up0_up, nil)
    psu_provided_data_ref01_resdata_up0 = Helpers.to_map(psu_provided_data_ref01_resdata_up0_result.respond_to?(:data_get) ? psu_provided_data_ref01_resdata_up0_result.data_get : psu_provided_data_ref01_resdata_up0_result)
    assert !psu_provided_data_ref01_resdata_up0.nil?

  end
end

def psu_provided_data_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "psu_provided_data", "PsuProvidedDataTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["psu_provided_data01", "psu_provided_data02", "psu_provided_data03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["KASHIMI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["KASHIMI_APIKEY"],
      },
      extra || {},
    ])
    client = KashimiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["KASHIMI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["KASHIMI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
