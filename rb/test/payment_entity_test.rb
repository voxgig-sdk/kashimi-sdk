# Payment entity test

require "minitest/autorun"
require "json"
require_relative "../Kashimi_sdk"
require_relative "runner"

class PaymentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = KashimiSDK.test(nil, nil)
    ent = testsdk.Payment(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "payment" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = KashimiSDK.test(seed, nil).Payment(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "payment" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = KashimiSDK.test(seed, nil)
    seen = base.Payment(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = KashimiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = KashimiSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Payment(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < KashimiBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "payment hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      KashimiSDK.test(offline, nil).Payment(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    KashimiSDK.test(offline, nil).Payment(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = KashimiConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = KashimiSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Payment(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    KashimiSDK.test(nil, nil).Payment(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = KashimiSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Payment(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Payment(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = KashimiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = KashimiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Payment(nil).list({ "cursor_value" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = payment_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "payment." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"payment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ob/payments/cancel\"}"
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["payment01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "payment", "id", _live_id) do
        client.Payment(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    payment_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.payment")))
    payment_ref01_data = nil
    if payment_ref01_data_raw.length > 0
      payment_ref01_data = Helpers.to_map(payment_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    payment_ref01_ent = client.Payment(nil)
    payment_ref01_match = {}

    payment_ref01_list_result = payment_ref01_ent.list(payment_ref01_match, nil)
    assert payment_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    payment_ref01_match_dt0 = {
      "id" => payment_ref01_data["id"],
    }
    payment_ref01_data_dt0_loaded = payment_ref01_ent.load(payment_ref01_match_dt0, nil)
    payment_ref01_data_dt0_load_result = Helpers.to_map(payment_ref01_data_dt0_loaded.respond_to?(:data_get) ? payment_ref01_data_dt0_loaded.data_get : payment_ref01_data_dt0_loaded)
    assert !payment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(payment_ref01_data_dt0_load_result["id"], payment_ref01_data["id"])

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    payment_ref01_ent = client.Payment(nil)
    payment_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.payment"), "payment_ref01"))

    payment_ref01_data_result = payment_ref01_ent.create(payment_ref01_data, nil)
    payment_ref01_data = Helpers.to_map(payment_ref01_data_result.respond_to?(:data_get) ? payment_ref01_data_result.data_get : payment_ref01_data_result)
    assert !payment_ref01_data.nil?
    assert !payment_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    payment_ref01_match = {}

    payment_ref01_list_result = payment_ref01_ent.list(payment_ref01_match, nil)
    assert payment_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(payment_ref01_list_result),
      { "id" => payment_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    payment_ref01_match_dt0 = {
      "id" => payment_ref01_data["id"],
    }
    payment_ref01_data_dt0_loaded = payment_ref01_ent.load(payment_ref01_match_dt0, nil)
    payment_ref01_data_dt0_load_result = Helpers.to_map(payment_ref01_data_dt0_loaded.respond_to?(:data_get) ? payment_ref01_data_dt0_loaded.data_get : payment_ref01_data_dt0_loaded)
    assert !payment_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(payment_ref01_data_dt0_load_result["id"], payment_ref01_data["id"])

  end
end

def payment_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "payment", "PaymentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = KashimiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["payment01", "payment02", "payment03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["KASHIMI_TEST_PAYMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "KASHIMI_TEST_PAYMENT_ENTID" => idmap,
    "KASHIMI_TEST_LIVE" => "FALSE",
    "KASHIMI_TEST_EXPLAIN" => "FALSE",
    "KASHIMI_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["KASHIMI_TEST_PAYMENT_ENTID"])
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
