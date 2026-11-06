-- Payment entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("kashimi_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


local BaseFeature = require("feature.base_feature")

local FailHook = {}
FailHook.__index = FailHook
setmetatable(FailHook, { __index = BaseFeature })

function FailHook.new()
  local self = setmetatable(BaseFeature.new(), FailHook)
  self.name = "failhook"
  self.unexpected = 0
  return self
end

function FailHook:init(_ctx, _options) end
function FailHook:PreSpec(_ctx) error("payment hook failed") end
function FailHook:PreUnexpected(_ctx) self.unexpected = self.unexpected + 1 end

local function errtext(err)
  if type(err) == "table" then
    return tostring(err.msg or err.message or "")
  end
  return tostring(err)
end

describe("PaymentEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Payment(nil)
    assert.is_not_nil(ent)
  end)

  -- Feature #4: the entity stream(action, ...) method runs the op pipeline and
  -- returns an iterator over result items. With the streaming feature active it
  -- yields the feature's incremental output; otherwise it falls back to the
  -- materialised list so stream always yields.
  it("should stream", function()
    local seed = {
      entity = {
        ["payment"] = {
          s1 = { id = "s1" },
          s2 = { id = "s2" },
          s3 = { id = "s3" },
        },
      },
    }

    -- Fallback: streaming inactive -> yields the materialised list items.
    local base = sdk.test(seed, nil)
    local seen = {}
    for item in base:Payment(nil):stream("list", nil, nil) do
      table.insert(seen, item)
    end
    assert.are.equal(3, #seen)

    -- Inbound: streaming active -> yields each item from the feature.
    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.streaming ~= nil then
      local streamsdk = sdk.test(seed, { feature = { streaming = { active = true } } })
      local got = {}
      for item in streamsdk:Payment(nil):stream("list", nil, nil) do
        if vs.islist(item) then
          for _, sub in ipairs(item) do
            table.insert(got, sub)
          end
        else
          table.insert(got, item)
        end
      end
      assert.are.equal(3, #got)
    end
  end)

  it("should report a failed stream", function()
    local offline = { net = { offline = true } }
    local ok, err = pcall(function()
      for _ in sdk.test(offline, nil):Payment(nil):stream("list", nil, nil) do end
    end)
    assert.is_false(ok)
    assert.truthy(string.find(errtext(err), "offline", 1, true))

    for _ in sdk.test(offline, nil):Payment(nil):stream("list", nil, { ctrl = { throw = false } }) do end

    local config = require("config_shared")()
    if type(config.feature) == "table" and config.feature.rbac ~= nil then
      local denied = sdk.test(nil, { feature = { rbac = { active = true, deny = true } } })
      local dok, derr = pcall(function()
        for _ in denied:Payment(nil):stream("list", nil, nil) do end
      end)
      assert.is_false(dok)
      assert.are.equal("rbac_denied", type(derr) == "table" and derr.code or nil)
    end
  end)

  it("should leave the caller's ctrl", function()
    local explain = {}
    local ctrl = { explain = explain }
    for _ in sdk.test(nil, nil):Payment(nil):stream("list", nil, { ctrl = ctrl }) do end
    assert.is_nil(ctrl.stream)
    assert.are.equal(explain, ctrl.explain)
    assert.is_not_nil(next(explain))
  end)

  it("should fire PreUnexpected", function()
    local hook = FailHook.new()
    local client = sdk.new({ feature = { test = { active = true } }, extend = { hook } })

    local out, err = client:Payment(nil):list(nil, nil)
    assert.is_nil(out)
    assert.truthy(string.find(errtext(err), "hook failed", 1, true))
    assert.is_true(hook.unexpected > 0)

    local fired = hook.unexpected
    out, err = client:Payment(nil):list(nil, { throw = false })
    assert.is_nil(err)
    assert.is_true(hook.unexpected > fired)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Payment(nil):list({ ["cursor_value"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = payment_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "payment." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"payment.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ob/payments/cancel\"}")
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["payment01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "payment", function()
        return client:Payment(nil):list({}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local payment_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.payment")))
    local payment_ref01_data = nil
    if #payment_ref01_data_raw > 0 then
      payment_ref01_data = helpers.to_map(payment_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local payment_ref01_ent = client:Payment(nil)
    local payment_ref01_match = {}

    local payment_ref01_list_result, err = payment_ref01_ent:list(payment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(payment_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local payment_ref01_match_dt0 = {
      id = payment_ref01_data["id"],
    }
    local payment_ref01_data_dt0_loaded, err = payment_ref01_ent:load(payment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local payment_ref01_data_dt0_load_result = helpers.to_map(type(payment_ref01_data_dt0_loaded) == 'table' and payment_ref01_data_dt0_loaded.data_get and payment_ref01_data_dt0_loaded:data_get() or payment_ref01_data_dt0_loaded)
    assert.is_not_nil(payment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(payment_ref01_data_dt0_load_result["id"], payment_ref01_data["id"]))

      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local payment_ref01_ent = client:Payment(nil)
    local payment_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.payment"), "payment_ref01"))

    local payment_ref01_data_result, err = payment_ref01_ent:create(payment_ref01_data, nil)
    assert.is_nil(err)
    payment_ref01_data = helpers.to_map(type(payment_ref01_data_result) == 'table' and payment_ref01_data_result.data_get and payment_ref01_data_result:data_get() or payment_ref01_data_result)
    assert.is_not_nil(payment_ref01_data)
    assert.is_not_nil(payment_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local payment_ref01_match = {}

    local payment_ref01_list_result, err = payment_ref01_ent:list(payment_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(payment_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(payment_ref01_list_result),
      { id = payment_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local payment_ref01_match_dt0 = {
      id = payment_ref01_data["id"],
    }
    local payment_ref01_data_dt0_loaded, err = payment_ref01_ent:load(payment_ref01_match_dt0, nil)
    assert.is_nil(err)
    local payment_ref01_data_dt0_load_result = helpers.to_map(type(payment_ref01_data_dt0_loaded) == 'table' and payment_ref01_data_dt0_loaded.data_get and payment_ref01_data_dt0_loaded:data_get() or payment_ref01_data_dt0_loaded)
    assert.is_not_nil(payment_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(payment_ref01_data_dt0_load_result["id"], payment_ref01_data["id"]))

  end)
end)

function payment_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/payment/PaymentTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read payment test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "payment01", "payment02", "payment03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_PAYMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_PAYMENT_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_PAYMENT_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["KASHIMI_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["KASHIMI_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["KASHIMI_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["KASHIMI_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
