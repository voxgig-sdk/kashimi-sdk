# ClientHostedUiCustomizationsOutputDto entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class ClientHostedUiCustomizationsOutputDtoEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.ClientHostedUiCustomizationsOutputDto(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = KashimiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KashimiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ClientHostedUiCustomizationsOutputDto(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = client_hosted_ui_customizations_output_dto_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "client_hosted_ui_customizations_output_dto." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      Runner.live_miss(LIVE_STRICT, "Live entity test blocked: " + "the flow loads a client_hosted_ui_customizations_output_dto record it has no list to find")
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    client_hosted_ui_customizations_output_dto_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.client_hosted_ui_customizations_output_dto")))
    client_hosted_ui_customizations_output_dto_ref01_data = nil
    if client_hosted_ui_customizations_output_dto_ref01_data_raw.length > 0
      client_hosted_ui_customizations_output_dto_ref01_data = Helpers.to_map(client_hosted_ui_customizations_output_dto_ref01_data_raw[0][1])
    end

    # LOAD
    client_hosted_ui_customizations_output_dto_ref01_ent = client.ClientHostedUiCustomizationsOutputDto(nil)
    client_hosted_ui_customizations_output_dto_ref01_match_dt0 = {
      "id" => client_hosted_ui_customizations_output_dto_ref01_data["id"],
    }
    client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded = client_hosted_ui_customizations_output_dto_ref01_ent.load(client_hosted_ui_customizations_output_dto_ref01_match_dt0, nil)
    client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result = Helpers.to_map(client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded.respond_to?(:data_get) ? client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded.data_get : client_hosted_ui_customizations_output_dto_ref01_data_dt0_loaded)
    assert !client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result.nil?
    assert_equal client_hosted_ui_customizations_output_dto_ref01_data_dt0_load_result["id"], client_hosted_ui_customizations_output_dto_ref01_data["id"]

  end
end

def client_hosted_ui_customizations_output_dto_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "client_hosted_ui_customizations_output_dto", "ClientHostedUiCustomizationsOutputDtoTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["client_hosted_ui_customizations_output_dto01", "client_hosted_ui_customizations_output_dto02", "client_hosted_ui_customizations_output_dto03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
    "KASHIMI_SERVER_BASE" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID"])
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
