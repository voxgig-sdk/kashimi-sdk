-- ProjectName SDK conform feature
--
-- conform's OVERLAY for the bundled `lua` target. Mirrors
-- ts/src/feature/conform/ConformFeature.ts: sends and reads what the
-- definition declares, where the stock pipeline does not yet
-- (voxgig/sdkgen#465).
--
-- PreRequest runs after make_spec, so the spec already holds the headers,
-- with the client's credential, and the body as the stock pipeline built
-- them. It rewrites two things:
--
--   form        a point whose body kind is "form" gets its body form-encoded,
--               with the declared media type as its content type.
--               make_fetch_def sends a string body on a non-JSON point as given.
--   credential  a value the call passes under the credential header's name, or
--               under a header argument the point declares with that name, is
--               sent as that header, in place of the credential prepare_auth set
--               (or restoring the one it removed), and leaves the body.
--
-- Counts land on the client as `_conform = { form, credential }`.

local vs = require("utility.struct.struct")
local BaseFeature = require("feature.base_feature")

local CRED_NAME = "authorization"

local ConformFeature = {}
ConformFeature.__index = ConformFeature
setmetatable(ConformFeature, { __index = BaseFeature })


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


function ConformFeature.new()
  local self = setmetatable(BaseFeature.new(), ConformFeature)
  self.version = "0.1.1"
  self.name = "conform"
  self.active = true
  self.client = nil
  self.options = nil
  return self
end


function ConformFeature:init(ctx, options)
  self.client = ctx.client
  self.options = options or {}
  self.active = self.options["active"] == true
end


function ConformFeature:PreRequest(ctx)
  if not self.active then
    return
  end

  local spec = ctx.spec
  local point = ctx.point
  if spec == nil or type(point) ~= "table" then
    return
  end

  if spec.headers == nil then
    spec.headers = {}
  end

  if self:_credential(ctx, spec, point) then
    self:_record("credential")
  end

  if self:_form(spec, point) then
    self:_record("form")
  end
end


-- The credential header is the client's auth.name, else Authorization.
function ConformFeature:_credential(ctx, spec, point)
  local options = ctx.client ~= nil and ctx.client:options_map() or {}
  local authname = vs.getpath(options, "auth.name")
  local credname = CRED_NAME
  if type(authname) == "string" and authname ~= "" then
    credname = string.lower(authname)
  end

  local names = { credname }
  local args = vs.getpath(point, "args.header")
  if type(args) == "table" then
    for _, arg in ipairs(args) do
      local name = type(arg) == "table" and arg["name"] or nil
      if type(name) == "string" and name ~= "" then
        local orig = arg["orig"]
        local wire = string.lower((type(orig) == "string" and orig ~= "") and orig or name)
        if wire == credname then
          table.insert(names, 1, name)
        end
      end
    end
  end

  for _, name in ipairs(names) do
    local val = vs.getprop(ctx.reqmatch or {}, name)
    if val == nil then
      val = vs.getprop(ctx.reqdata or {}, name)
    end
    if val ~= nil and val ~= "" then
      drop_header(spec.headers, credname)
      spec.headers[credname] = tostring(val)

      -- A copy, since the body can be the caller's own data.
      if type(spec.body) == "table" then
        local rest = {}
        for key, v in pairs(spec.body) do
          if key ~= name then
            rest[key] = v
          end
        end
        spec.body = rest
      end

      return true
    end
  end

  return false
end


function ConformFeature:_form(spec, point)
  local body = point["body"] or {}
  if body["kind"] ~= "form" then
    return false
  end

  local data = spec.body
  if not vs.ismap(data) then
    return false
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

  drop_header(spec.headers, "content-type")
  local media = body["media"]
  if type(media) ~= "string" or media == "" then
    media = "application/x-www-form-urlencoded"
  end
  spec.headers["content-type"] = media

  return true
end


function ConformFeature:_record(kind)
  local client = self.client
  if client == nil then
    return
  end
  if client._conform == nil then
    client._conform = { form = 0, credential = 0 }
  end
  client._conform[kind] = client._conform[kind] + 1
end


return ConformFeature
