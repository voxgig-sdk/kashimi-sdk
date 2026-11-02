# Obn entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class ObnEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.Obn(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = KashimiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KashimiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Obn(nil).load({ "provider_id" => 1, "state" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = obn_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "obn." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"obn.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ob/payments/cancel\"}"
      puts "LIVE STEP {\"id\":\"obn.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/decoupled/sca-data\"}"
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    obn_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.obn")))
    obn_ref01_data = nil
    if obn_ref01_data_raw.length > 0
      obn_ref01_data = Helpers.to_map(obn_ref01_data_raw[0][1])
    end

    # LOAD
    obn_ref01_ent = client.Obn(nil)
    obn_ref01_match_dt0 = {}
    obn_ref01_data_dt0_loaded = obn_ref01_ent.load(obn_ref01_match_dt0, nil)
    assert !obn_ref01_data_dt0_loaded.nil?

      return
    end

    client = setup[:client]

    # CREATE
    obn_ref01_ent = client.Obn(nil)
    obn_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.obn"), "obn_ref01"))

    obn_ref01_data_result = obn_ref01_ent.create(obn_ref01_data, nil)
    obn_ref01_data = Helpers.to_map(obn_ref01_data_result.respond_to?(:data_get) ? obn_ref01_data_result.data_get : obn_ref01_data_result)
    assert !obn_ref01_data.nil?

    # UPDATE
    obn_ref01_data_up0_up = {
    }

    obn_ref01_resdata_up0_result = obn_ref01_ent.update(obn_ref01_data_up0_up, nil)
    obn_ref01_resdata_up0 = Helpers.to_map(obn_ref01_resdata_up0_result.respond_to?(:data_get) ? obn_ref01_resdata_up0_result.data_get : obn_ref01_resdata_up0_result)
    assert !obn_ref01_resdata_up0.nil?

    # LOAD
    obn_ref01_match_dt0 = {}
    obn_ref01_data_dt0_loaded = obn_ref01_ent.load(obn_ref01_match_dt0, nil)
    assert !obn_ref01_data_dt0_loaded.nil?

  end
end

def obn_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "obn", "ObnTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["obn01", "obn02", "obn03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_OBN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_OBN_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
    "KASHIMI_SERVER_BASE" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_OBN_ENTID"])
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
        "server" => {
          "base" => env["KASHIMI_SERVER_BASE"],
        },
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
