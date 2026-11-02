# ProvidersSubsidiaryOutputDto entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class ProvidersSubsidiaryOutputDtoEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.ProvidersSubsidiaryOutputDto(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = KashimiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KashimiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ProvidersSubsidiaryOutputDto(nil).list({ "provider_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = providers_subsidiary_output_dto_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "providers_subsidiary_output_dto." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["provider01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via KASHIMI_TEST_PROVIDERS_SUBSIDIARY_OUTPUT_DTO_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    providers_subsidiary_output_dto_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.providers_subsidiary_output_dto")))
    providers_subsidiary_output_dto_ref01_data = nil
    if providers_subsidiary_output_dto_ref01_data_raw.length > 0
      providers_subsidiary_output_dto_ref01_data = Helpers.to_map(providers_subsidiary_output_dto_ref01_data_raw[0][1])
    end

    # LIST
    providers_subsidiary_output_dto_ref01_ent = client.ProvidersSubsidiaryOutputDto(nil)
    providers_subsidiary_output_dto_ref01_match = {
      "provider_id" => setup[:idmap]["provider01"],
    }

    providers_subsidiary_output_dto_ref01_list_result = providers_subsidiary_output_dto_ref01_ent.list(providers_subsidiary_output_dto_ref01_match, nil)
    assert providers_subsidiary_output_dto_ref01_list_result.is_a?(Array)

  end
end

def providers_subsidiary_output_dto_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "providers_subsidiary_output_dto", "ProvidersSubsidiaryOutputDtoTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["providers_subsidiary_output_dto01", "providers_subsidiary_output_dto02", "providers_subsidiary_output_dto03", "provider01", "provider02", "provider03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_PROVIDERS_SUBSIDIARY_OUTPUT_DTO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_PROVIDERS_SUBSIDIARY_OUTPUT_DTO_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
    "KASHIMI_SERVER_BASE" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_PROVIDERS_SUBSIDIARY_OUTPUT_DTO_ENTID"])
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
