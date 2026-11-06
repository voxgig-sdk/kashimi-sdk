-- Kashimi SDK utility: make_spec

local vs = require("utility.struct.struct")
local graphql = require("utility.graphql")
local Spec = require("core.spec")
local helpers = require("core.helpers")


-- Remove a header whatever its case.
local function drop_header(headers, name)
  local keys = {}
  for key in pairs(headers) do
    if type(key) == "string" and string.lower(key) == name then
      keys[#keys + 1] = key
    end
  end
  for _, key in ipairs(keys) do
    headers[key] = nil
  end
end


-- Form encoding as the ts URLSearchParams writes it: space as "+", and
-- every byte outside A-Z a-z 0-9 * - . _ percent-encoded.
local function form_escape(s)
  s = string.gsub(s, "[^%w%*%-%._ ]", function(c)
    return string.format("%%%02X", string.byte(c))
  end)
  return (string.gsub(s, " ", "+"))
end


local function form_value(item)
  if type(item) == "table" then
    return vs.jsonify(item)
  end
  return tostring(item)
end


-- A credential the call passes under the credential header's name goes as
-- that header, in place of the client's, and not in the body. Kashimi's
-- token call takes its Basic credential this way (voxgig/sdkgen#465).
local function call_credential(ctx, options, spec)
  local authname = vs.getpath(options, "auth.name")
  local name = "authorization"
  if type(authname) == "string" and authname ~= "" then
    name = string.lower(authname)
  end

  local val = vs.getprop(ctx.reqmatch or {}, name)
  if val == nil then
    val = vs.getprop(ctx.reqdata or {}, name)
  end
  if val == nil or val == "" then
    return
  end

  if spec.headers == nil then
    spec.headers = {}
  end
  drop_header(spec.headers, name)
  spec.headers[name] = tostring(val)

  -- A copy, since the body can be the caller's own data.
  if vs.ismap(spec.body) then
    local rest = {}
    for key, v in pairs(spec.body) do
      if key ~= name then
        rest[key] = v
      end
    end
    spec.body = rest
  end
end


-- A body the point declares form-encoded goes form-encoded, under its
-- declared media type, where it would otherwise go as JSON.
local function form_body(point, spec)
  local decl = vs.getprop(point, "body")
  local data = spec.body
  if type(decl) ~= "table" or decl["kind"] ~= "form" or not vs.ismap(data) then
    return
  end

  local pairs_ = {}
  for _, key in ipairs(vs.keysof(data)) do
    local val = data[key]
    if val ~= nil then
      local list = vs.islist(val) and val or { val }
      for _, item in ipairs(list) do
        pairs_[#pairs_ + 1] = form_escape(key) .. "=" .. form_escape(form_value(item))
      end
    end
  end

  spec.body = table.concat(pairs_, "&")

  if spec.headers == nil then
    spec.headers = {}
  end
  drop_header(spec.headers, "content-type")
  local media = decl["media"]
  if type(media) ~= "string" or media == "" then
    media = "application/x-www-form-urlencoded"
  end
  spec.headers["content-type"] = media
end


local function make_spec_util(ctx)
  if ctx.out["spec"] ~= nil then
    local preset = ctx.out["spec"]
    -- PreSpec short-circuit: a feature (e.g. validate) may place an SDK
    -- error in ctx.out["spec"] to abort the operation before the request is
    -- built. The same seam make_point offers one stage earlier.
    if type(preset) == "table" and preset.is_sdk_error == true then
      return nil, preset
    end
    ctx.spec = preset
    return ctx.spec, nil
  end

  local point = ctx.point
  local options = ctx.options
  local utility = ctx.utility

  local base = ""
  local b = vs.getprop(options, "base")
  if type(b) == "string" then base = b end

  local prefix = ""
  local p = vs.getprop(options, "prefix")
  if type(p) == "string" then prefix = p end

  local suffix = ""
  local s = vs.getprop(options, "suffix")
  if type(s) == "string" then suffix = s end

  local parts = {}
  if point ~= nil then
    local pt = vs.getprop(point, "parts")
    if type(pt) == "table" then
      parts = pt
    end
  end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    parts = parts,
    suffix = suffix,
    step = "start",
  })

  ctx.spec.method = utility.prepare_method(ctx)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, ctx.spec.method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. tostring(ctx.spec.method or "") ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  ctx.spec.params = utility.prepare_params(ctx)
  ctx.spec.query = utility.prepare_query(ctx)
  ctx.spec.headers = utility.prepare_headers(ctx)

  if "graphql" == vs.getprop(ctx.point, "kind") then
    -- GraphQL addresses one endpoint: no path parts, no query string, and
    -- the body carries the operation. prepare_body is skipped deliberately
    -- — it only emits a body for data-input ops, whereas every GraphQL op
    -- posts one, including load/list/remove.
    ctx.spec.body = utility.graphql_body(ctx)
    ctx.spec.path = ""
    -- prepare_query already copied the op's match arguments into the query
    -- string. Those same values are bound as operation variables, so
    -- leaving them would send /graphql?id=i1.
    ctx.spec.query = {}
    ctx.spec.headers["content-type"] = graphql.CONTENT_TYPE
  else
    ctx.spec.body = utility.prepare_body(ctx)
    ctx.spec.path = utility.prepare_path(ctx)
  end

  if ctx.ctrl.explain ~= nil then
    ctx.ctrl.explain["spec"] = ctx.spec
  end

  -- Whatever prepare_auth sets in the query, under whichever name, is the
  -- credential; a key it leaves as it was is the caller's.
  local query = {}
  for k, v in pairs(ctx.spec.query or {}) do
    query[k] = v
  end

  local spec, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  spec.authquery = {}
  for k, v in pairs(spec.query or {}) do
    if query[k] ~= v then
      table.insert(spec.authquery, k)
    end
  end

  ctx.spec = spec
  call_credential(ctx, options, spec)
  form_body(point, spec)
  return spec, nil
end

return make_spec_util
