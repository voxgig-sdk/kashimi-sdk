-- ClientJwk entity test

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


describe("ClientJwkEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:ClientJwk(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:ClientJwk(nil):load({ ["client_id"] = 1, ["provider_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = client_jwk_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "client_jwk." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local client_jwk_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.client_jwk")))
    local client_jwk_ref01_data = nil
    if #client_jwk_ref01_data_raw > 0 then
      client_jwk_ref01_data = helpers.to_map(client_jwk_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local client_jwk_ref01_ent = client:ClientJwk(nil)
    local client_jwk_ref01_match_dt0 = {}
    if setup.live then
      client_jwk_ref01_match_dt0["client_id"] = "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e"
      client_jwk_ref01_match_dt0["provider_id"] = "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f"
    end
    local client_jwk_ref01_data_dt0_loaded, err = client_jwk_ref01_ent:load(client_jwk_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(client_jwk_ref01_data_dt0_loaded)

  end)
end)

function client_jwk_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/client_jwk/ClientJwkTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read client_jwk test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "client_jwk01", "client_jwk02", "client_jwk03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_CLIENT_JWK_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_CLIENT_JWK_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_CLIENT_JWK_ENTID"])
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
