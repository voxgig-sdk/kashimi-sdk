-- Kashimi SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("kashimi_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local KashimiSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

KashimiSDK.__index = function(self, key)
  local member = rawget(KashimiSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

KashimiSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function KashimiSDK:to_record()
  return { sdk = "Kashimi", mode = self.mode }
end

KashimiSDK.__tostring = function(self)
  return "KashimiSDK mode=" .. tostring(self.mode)
end

KashimiSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

KashimiSDK._make_feature = _make_feature


function KashimiSDK.new(options)
  local self = setmetatable({}, KashimiSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: conform
  -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: secrets
  -- feature: test
  -- feature: timeout


  return self
end


function KashimiSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function KashimiSDK:get_utility()
  return Utility.copy(self._utility)
end


function KashimiSDK:get_root_ctx()
  return self._rootctx
end


function KashimiSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  -- A raw request has no point to declare its response type, so it asks
  -- for the JSON it reads: an API that negotiates on Accept otherwise
  -- answers in its own default format. A caller's own accept wins.
  local has_accept = false
  for k, _ in pairs(ctx.spec.headers) do
    if string.lower(tostring(k)) == "accept" then
      has_accept = true
      break
    end
  end
  if not has_accept then
    ctx.spec.headers["accept"] = "application/json"
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function KashimiSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function KashimiSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function KashimiSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "KashimiSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function KashimiSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function KashimiSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "KashimiSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Callback():list() / client:Callback():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Callback(data)
  local EntityMod = require("entity.callback_entity")
  if data == nil then
    if self._callback == nil then
      self._callback = EntityMod.new(self, nil)
    end
    return self._callback
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ClientJwk():list() / client:ClientJwk():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:ClientJwk(data)
  local EntityMod = require("entity.client_jwk_entity")
  if data == nil then
    if self._client_jwk == nil then
      self._client_jwk = EntityMod.new(self, nil)
    end
    return self._client_jwk
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConfirmationData():list() / client:ConfirmationData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:ConfirmationData(data)
  local EntityMod = require("entity.confirmation_data_entity")
  if data == nil then
    if self._confirmation_data == nil then
      self._confirmation_data = EntityMod.new(self, nil)
    end
    return self._confirmation_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ConsentStatus():list() / client:ConsentStatus():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:ConsentStatus(data)
  local EntityMod = require("entity.consent_status_entity")
  if data == nil then
    if self._consent_status == nil then
      self._consent_status = EntityMod.new(self, nil)
    end
    return self._consent_status
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Country():list() / client:Country():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Country(data)
  local EntityMod = require("entity.country_entity")
  if data == nil then
    if self._country == nil then
      self._country = EntityMod.new(self, nil)
    end
    return self._country
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Followup():list() / client:Followup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Followup(data)
  local EntityMod = require("entity.followup_entity")
  if data == nil then
    if self._followup == nil then
      self._followup = EntityMod.new(self, nil)
    end
    return self._followup
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Healthcheck():list() / client:Healthcheck():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Healthcheck(data)
  local EntityMod = require("entity.healthcheck_entity")
  if data == nil then
    if self._healthcheck == nil then
      self._healthcheck = EntityMod.new(self, nil)
    end
    return self._healthcheck
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HostedUiCustomization():list() / client:HostedUiCustomization():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:HostedUiCustomization(data)
  local EntityMod = require("entity.hosted_ui_customization_entity")
  if data == nil then
    if self._hosted_ui_customization == nil then
      self._hosted_ui_customization = EntityMod.new(self, nil)
    end
    return self._hosted_ui_customization
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Payment():list() / client:Payment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Payment(data)
  local EntityMod = require("entity.payment_entity")
  if data == nil then
    if self._payment == nil then
      self._payment = EntityMod.new(self, nil)
    end
    return self._payment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PaymentStatus():list() / client:PaymentStatus():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:PaymentStatus(data)
  local EntityMod = require("entity.payment_status_entity")
  if data == nil then
    if self._payment_status == nil then
      self._payment_status = EntityMod.new(self, nil)
    end
    return self._payment_status
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Provider():list() / client:Provider():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Provider(data)
  local EntityMod = require("entity.provider_entity")
  if data == nil then
    if self._provider == nil then
      self._provider = EntityMod.new(self, nil)
    end
    return self._provider
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PsuProvidedData():list() / client:PsuProvidedData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:PsuProvidedData(data)
  local EntityMod = require("entity.psu_provided_data_entity")
  if data == nil then
    if self._psu_provided_data == nil then
      self._psu_provided_data = EntityMod.new(self, nil)
    end
    return self._psu_provided_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Report():list() / client:Report():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Report(data)
  local EntityMod = require("entity.report_entity")
  if data == nil then
    if self._report == nil then
      self._report = EntityMod.new(self, nil)
    end
    return self._report
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaData():list() / client:ScaData():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:ScaData(data)
  local EntityMod = require("entity.sca_data_entity")
  if data == nil then
    if self._sca_data == nil then
      self._sca_data = EntityMod.new(self, nil)
    end
    return self._sca_data
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaMethod():list() / client:ScaMethod():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:ScaMethod(data)
  local EntityMod = require("entity.sca_method_entity")
  if data == nil then
    if self._sca_method == nil then
      self._sca_method = EntityMod.new(self, nil)
    end
    return self._sca_method
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SenderAccount():list() / client:SenderAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:SenderAccount(data)
  local EntityMod = require("entity.sender_account_entity")
  if data == nil then
    if self._sender_account == nil then
      self._sender_account = EntityMod.new(self, nil)
    end
    return self._sender_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Subsidiary():list() / client:Subsidiary():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Subsidiary(data)
  local EntityMod = require("entity.subsidiary_entity")
  if data == nil then
    if self._subsidiary == nil then
      self._subsidiary = EntityMod.new(self, nil)
    end
    return self._subsidiary
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Token():list() / client:Token():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function KashimiSDK:Token(data)
  local EntityMod = require("entity.token_entity")
  if data == nil then
    if self._token == nil then
      self._token = EntityMod.new(self, nil)
    end
    return self._token
  end
  return EntityMod.new(self, data)
end




function KashimiSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = KashimiSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return KashimiSDK
