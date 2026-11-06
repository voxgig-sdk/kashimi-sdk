# Kashimi SDK utility: make_spec
require 'json'
require 'uri'
require_relative 'struct/voxgig_struct'
require_relative 'graphql'
require_relative 'prepare_method'
require_relative '../core/spec'
module KashimiUtilities
  MakeSpec = ->(ctx) {
    if ctx.out["spec"]
      # A PreSpec hook (validate) rejects the operation by placing its error
      # here; the pipeline raises it, and ctx.spec stays a request spec.
      return nil, ctx.out["spec"] if ctx.out["spec"].is_a?(Exception)
      ctx.spec = ctx.out["spec"]
      return ctx.spec, nil
    end

    point = ctx.point
    options = ctx.options
    utility = ctx.utility

    base = VoxgigStruct.getprop(options, "base") || ""
    prefix = VoxgigStruct.getprop(options, "prefix") || ""
    suffix = VoxgigStruct.getprop(options, "suffix") || ""

    parts = []
    parts = VoxgigStruct.getprop(point, "parts") if point
    parts = [] unless parts.is_a?(Array)

    ctx.spec = KashimiSpec.new({
      "base" => base, "prefix" => prefix, "parts" => parts,
      "suffix" => suffix, "step" => "start",
    })

    ctx.spec.method = utility.prepare_method.call(ctx)

    allow_method = VoxgigStruct.getpath(options, "allow.method")
    unless KashimiUtilities.allowed(allow_method, ctx.spec.method)
      return nil, ctx.make_error("spec_method_allow",
        "Method \"#{ctx.spec.method}\" not allowed by SDK option allow.method value: \"#{allow_method}\"")
    end

    ctx.spec.params = utility.prepare_params.call(ctx)
    ctx.spec.query = utility.prepare_query.call(ctx)
    ctx.spec.headers = utility.prepare_headers.call(ctx)

    if 'graphql' == VoxgigStruct.getprop(point, 'kind')
      # GraphQL addresses one endpoint: no path parts, no query string, and
      # the body carries the operation. prepare_body is skipped
      # deliberately — it only emits a body for data-input ops, whereas
      # every GraphQL op posts one, including load/list/remove.
      ctx.spec.body = utility.graphql_body.call(ctx)
      ctx.spec.path = ''
      # prepare_query already copied the op's match arguments into the
      # query string. Those same values are bound as operation variables,
      # so leaving them would send /graphql?id=i1.
      ctx.spec.query = {}
      ctx.spec.headers['content-type'] = GRAPHQL_CONTENT_TYPE
    else
      ctx.spec.body = utility.prepare_body.call(ctx)
      ctx.spec.path = utility.prepare_path.call(ctx)
    end

    ctx.ctrl.explain["spec"] = ctx.spec if ctx.ctrl.explain

    # Whatever prepare_auth sets in the query, under whichever name, is the
    # credential; a key it leaves as it was is the caller's.
    query = (ctx.spec.query || {}).dup

    spec, err = utility.prepare_auth.call(ctx)
    return nil, err if err

    spec.authquery = (spec.query || {}).keys.select { |k|
      !query.key?(k) || query[k] != spec.query[k]
    }

    ctx.spec = spec
    KashimiUtilities.call_credential(ctx, options, spec)
    KashimiUtilities.form_body(point, spec)
    return spec, nil
  }

  # A credential the call passes under the credential header's name goes as
  # that header, in place of the client's, and not in the body. Kashimi's
  # token call takes its Basic credential this way (voxgig/sdkgen#465).
  def self.call_credential(ctx, options, spec)
    authname = VoxgigStruct.getpath(options, "auth.name")
    name = authname.is_a?(String) && !authname.empty? ? authname.downcase : "authorization"

    val = (ctx.reqmatch || {})[name]
    val = (ctx.reqdata || {})[name] if val.nil?
    return if val.nil? || val == ""

    spec.headers = {} if spec.headers.nil?
    drop_header(spec.headers, name)
    spec.headers[name] = val.to_s

    # A copy, since the body can be the caller's own data.
    spec.body = spec.body.reject { |key, _| key == name } if spec.body.is_a?(Hash)
  end

  # A body the point declares form-encoded goes form-encoded, under its
  # declared media type, where it would otherwise go as JSON.
  def self.form_body(point, spec)
    decl = VoxgigStruct.getprop(point, "body")
    return unless decl.is_a?(Hash) && decl["kind"] == "form" && spec.body.is_a?(Hash)

    pairs = []
    spec.body.each do |key, val|
      next if val.nil?
      (val.is_a?(Array) ? val : [val]).each do |item|
        pairs << [key.to_s, (item.is_a?(Hash) || item.is_a?(Array)) ? JSON.generate(item) : item.to_s]
      end
    end

    spec.body = URI.encode_www_form(pairs)

    spec.headers = {} if spec.headers.nil?
    drop_header(spec.headers, "content-type")
    media = decl["media"]
    spec.headers["content-type"] =
      media.is_a?(String) && !media.empty? ? media : "application/x-www-form-urlencoded"
  end

  # Remove a header whatever its case.
  def self.drop_header(headers, name)
    headers.keys.each do |key|
      headers.delete(key) if key.is_a?(String) && key.downcase == name
    end
  end
end
