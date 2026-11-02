-- PsuProvidedData entity test

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


describe("PsuProvidedDataEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:PsuProvidedData(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = psu_provided_data_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"update"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "psu_provided_data." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"psu_provided_data.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data\"}")
      pending("Live coverage incomplete: psu_provided_data.update.0 excluded (GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data)")
      return
    end

    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local psu_provided_data_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.psu_provided_data")))
    local psu_provided_data_ref01_data = nil
    if #psu_provided_data_ref01_data_raw > 0 then
      psu_provided_data_ref01_data = helpers.to_map(psu_provided_data_ref01_data_raw[1][2])
    end

    -- UPDATE
    local psu_provided_data_ref01_ent = client:PsuProvidedData(nil)
    local psu_provided_data_ref01_data_up0_up = {
    }

    local psu_provided_data_ref01_resdata_up0_result, err = psu_provided_data_ref01_ent:update(psu_provided_data_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local psu_provided_data_ref01_resdata_up0 = helpers.to_map(type(psu_provided_data_ref01_resdata_up0_result) == 'table' and psu_provided_data_ref01_resdata_up0_result.data_get and psu_provided_data_ref01_resdata_up0_result:data_get() or psu_provided_data_ref01_resdata_up0_result)
    assert.is_not_nil(psu_provided_data_ref01_resdata_up0)

  end)
end)

function psu_provided_data_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/psu_provided_data/PsuProvidedDataTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read psu_provided_data test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "psu_provided_data01", "psu_provided_data02", "psu_provided_data03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"])
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
