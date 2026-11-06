-- ScaData entity test

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


describe("ScaDataEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ScaData(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = sca_data_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "sca_data." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"sca_data.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/decoupled/sca-data\"}")
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local sca_data_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.sca_data")))
    local sca_data_ref01_data = nil
    if #sca_data_ref01_data_raw > 0 then
      sca_data_ref01_data = helpers.to_map(sca_data_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local sca_data_ref01_ent = client:ScaData(nil)
    local sca_data_ref01_match_dt0 = {}
    local sca_data_ref01_data_dt0_loaded, err = sca_data_ref01_ent:load(sca_data_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(sca_data_ref01_data_dt0_loaded)

      return
    end

    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local sca_data_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.sca_data")))
    local sca_data_ref01_data = nil
    if #sca_data_ref01_data_raw > 0 then
      sca_data_ref01_data = helpers.to_map(sca_data_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local sca_data_ref01_ent = client:ScaData(nil)
    local sca_data_ref01_data_up0_up = {
    }

    local sca_data_ref01_resdata_up0_result, err = sca_data_ref01_ent:update(sca_data_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local sca_data_ref01_resdata_up0 = helpers.to_map(type(sca_data_ref01_resdata_up0_result) == 'table' and sca_data_ref01_resdata_up0_result.data_get and sca_data_ref01_resdata_up0_result:data_get() or sca_data_ref01_resdata_up0_result)
    assert.is_not_nil(sca_data_ref01_resdata_up0)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local sca_data_ref01_match_dt0 = {}
    local sca_data_ref01_data_dt0_loaded, err = sca_data_ref01_ent:load(sca_data_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(sca_data_ref01_data_dt0_loaded)

  end)
end)

function sca_data_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/sca_data/ScaDataTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read sca_data test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "sca_data01", "sca_data02", "sca_data03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_SCA_DATA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_SCA_DATA_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_SCA_DATA_ENTID"])
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
