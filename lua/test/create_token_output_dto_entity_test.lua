-- CreateTokenOutputDto entity test

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


describe("CreateTokenOutputDtoEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CreateTokenOutputDto(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CreateTokenOutputDto(nil):create({ ["access_token"] = 1, ["expires_in"] = 1, ["grant_type"] = "x", ["scope"] = "x", ["token_type"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = create_token_output_dto_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "create_token_output_dto." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"create_token_output_dto.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /api/v1/auth/token\"}")
      pending("Live coverage incomplete: create_token_output_dto.create.0 excluded (GET-only live run: needs POST /api/v1/auth/token)")
      return
    end

    local client = setup.client

    -- CREATE
    local create_token_output_dto_ref01_ent = client:CreateTokenOutputDto(nil)
    local create_token_output_dto_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.create_token_output_dto"), "create_token_output_dto_ref01"))

    local create_token_output_dto_ref01_data_result, err = create_token_output_dto_ref01_ent:create(create_token_output_dto_ref01_data, nil)
    assert.is_nil(err)
    create_token_output_dto_ref01_data = helpers.to_map(type(create_token_output_dto_ref01_data_result) == 'table' and create_token_output_dto_ref01_data_result.data_get and create_token_output_dto_ref01_data_result:data_get() or create_token_output_dto_ref01_data_result)
    assert.is_not_nil(create_token_output_dto_ref01_data)

  end)
end)

function create_token_output_dto_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/create_token_output_dto/CreateTokenOutputDtoTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read create_token_output_dto test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "create_token_output_dto01", "create_token_output_dto02", "create_token_output_dto03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID"] = idmap,
    ["KASHIMI_TEST_LIVE"] = "FALSE",
    ["KASHIMI_TEST_EXPLAIN"] = "FALSE",
    ["KASHIMI_APIKEY"] = "",
    ["KASHIMI_SERVER_BASE"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID"])
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
