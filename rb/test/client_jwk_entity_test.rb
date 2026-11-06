# ClientJwk entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class ClientJwkEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.ClientJwk(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = KashimiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KashimiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ClientJwk(nil).load({ "client_id" => 1, "provider_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = client_jwk_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "client_jwk." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    client_jwk_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.client_jwk")))
    client_jwk_ref01_data = nil
    if client_jwk_ref01_data_raw.length > 0
      client_jwk_ref01_data = Helpers.to_map(client_jwk_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    client_jwk_ref01_ent = client.ClientJwk(nil)
    client_jwk_ref01_match_dt0 = {}
    if setup[:live]
      client_jwk_ref01_match_dt0["client_id"] = "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e"
      client_jwk_ref01_match_dt0["provider_id"] = "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f"
    end
    client_jwk_ref01_data_dt0_loaded = client_jwk_ref01_ent.load(client_jwk_ref01_match_dt0, nil)
    assert !client_jwk_ref01_data_dt0_loaded.nil?

  end
end

def client_jwk_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "client_jwk", "ClientJwkTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["client_jwk01", "client_jwk02", "client_jwk03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_CLIENT_JWK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_CLIENT_JWK_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_CLIENT_JWK_ENTID"])
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
