-- Obn entity test

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


describe("ObnEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Obn(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Obn(nil):load({ ["provider_id"] = 1, ["state"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = obn_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "obn." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"obn.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/ob/payments/cancel\"}")
      print("LIVE STEP {\"id\":\"obn.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/decoupled/sca-data\"}")
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local obn_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.obn")))
    local obn_ref01_data = nil
    if #obn_ref01_data_raw > 0 then
      obn_ref01_data = helpers.to_map(obn_ref01_data_raw[1][2])
    end

    -- LOAD
    local obn_ref01_ent = client:Obn(nil)
    local obn_ref01_match_dt0 = {}
    local obn_ref01_data_dt0_loaded, err = obn_ref01_ent:load(obn_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(obn_ref01_data_dt0_loaded)

      return
    end

    local client = setup.client

    -- CREATE
    local obn_ref01_ent = client:Obn(nil)
    local obn_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.obn"), "obn_ref01"))

    local obn_ref01_data_result, err = obn_ref01_ent:create(obn_ref01_data, nil)
    assert.is_nil(err)
    obn_ref01_data = helpers.to_map(type(obn_ref01_data_result) == 'table' and obn_ref01_data_result.data_get and obn_ref01_data_result:data_get() or obn_ref01_data_result)
    assert.is_not_nil(obn_ref01_data)

    -- UPDATE
    local obn_ref01_data_up0_up = {
    }

    local obn_ref01_resdata_up0_result, err = obn_ref01_ent:update(obn_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local obn_ref01_resdata_up0 = helpers.to_map(type(obn_ref01_resdata_up0_result) == 'table' and obn_ref01_resdata_up0_result.data_get and obn_ref01_resdata_up0_result:data_get() or obn_ref01_resdata_up0_result)
    assert.is_not_nil(obn_ref01_resdata_up0)

    -- LOAD
    local obn_ref01_match_dt0 = {}
    local obn_ref01_data_dt0_loaded, err = obn_ref01_ent:load(obn_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(obn_ref01_data_dt0_loaded)

  end)
end)

function obn_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/obn/ObnTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read obn test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "obn01", "obn02", "obn03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_OBN_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_OBN_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
    ["KASHIMI_SERVER_BASE"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_OBN_ENTID"])
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
        server = {
          ["base"] = env["KASHIMI_SERVER_BASE"],
        },
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
