# ProjectName SDK conform feature
#
# conform's OVERLAY for the bundled `rb` target. Mirrors
# ts/src/feature/conform/ConformFeature.ts: sends and reads what the
# definition declares, where the stock pipeline does not yet
# (voxgig/sdkgen#465).
#
# PreRequest runs after make_spec, so the spec already holds the headers,
# with the client's credential, and the body as the stock pipeline built
# them. It rewrites two things:
#
#   form        a point whose body kind is "form" gets its body form-encoded,
#               with the declared media type as its content type.
#               make_fetch_def sends a string body on a non-JSON point as given.
#   credential  a value the call passes under the credential header's name, or
#               under a header argument the point declares with that name, is
#               sent as that header, in place of the credential prepare_auth set
#               (or restoring the one it removed), and leaves the body.
#
# Counts land on the client as @_conform: { form, credential }.

require 'json'
require 'uri'
require_relative 'base_feature'

class ProjectNameConformFeature < ProjectNameBaseFeature
  CRED_NAME = "authorization"

  def initialize
    super
    @version = "0.1.1"
    @name = "conform"
    @active = true
    @client = nil
    @options = {}
  end

  def init(ctx, options)
    @client = ctx.client
    @options = options.is_a?(Hash) ? options : {}
    @active = @options["active"] == true
  end

  def PreRequest(ctx)
    return unless @active
    spec = ctx.spec
    point = ctx.point
    return if spec.nil? || !point.is_a?(Hash)

    spec.headers = {} if spec.headers.nil?

    _record("credential") if _credential(ctx, spec, point)
    _record("form") if _form(spec, point)
  end

  # The credential header is the client's auth.name, else Authorization.
  # The call passes it under a header argument the point declares with that
  # name, or under the name itself: apidef drops an Authorization parameter,
  # as OpenAPI 3 says to (voxgig/apidef#186), so the token call declares
  # none. Either way it goes as the header, and not in the body.
  def _credential(ctx, spec, point)
    options = ctx.client.nil? ? {} : (ctx.client.options_map || {})
    authname = (options["auth"] || {})["name"]
    credname = authname.is_a?(String) && !authname.empty? ? authname.downcase : CRED_NAME

    names = [credname]
    args = (point["args"] || {})["header"] || []
    args.each do |arg|
      name = arg.is_a?(Hash) ? arg["name"] : nil
      next unless name.is_a?(String) && !name.empty?

      orig = arg["orig"]
      wire = (orig.is_a?(String) && !orig.empty? ? orig : name).downcase
      names.unshift(name) if wire == credname
    end

    names.each do |name|
      val = (ctx.reqmatch || {})[name]
      val = (ctx.reqdata || {})[name] if val.nil?
      next if val.nil? || val == ""

      _drop_header(spec.headers, credname)
      spec.headers[credname] = val.to_s

      # A copy, since the body can be the caller's own data.
      spec.body = spec.body.reject { |key, _| key == name } if spec.body.is_a?(Hash)

      return true
    end

    false
  end

  def _form(spec, point)
    body = point["body"] || {}
    return false unless body["kind"] == "form"

    data = spec.body
    return false unless data.is_a?(Hash)

    pairs = []
    data.each do |key, val|
      next if val.nil?
      (val.is_a?(Array) ? val : [val]).each do |item|
        pairs << [key.to_s, _form_value(item)]
      end
    end

    spec.body = URI.encode_www_form(pairs)

    _drop_header(spec.headers, "content-type")
    media = body["media"]
    spec.headers["content-type"] =
      media.is_a?(String) && !media.empty? ? media : "application/x-www-form-urlencoded"

    true
  end

  def _record(kind)
    return if @client.nil?
    track = @client.instance_variable_get(:@_conform)
    if track.nil?
      track = { "form" => 0, "credential" => 0 }
      @client.instance_variable_set(:@_conform, track)
    end
    track[kind] += 1
  end

  # Remove a header whatever its case.
  def _drop_header(headers, name)
    headers.keys.each do |key|
      headers.delete(key) if key.is_a?(String) && key.downcase == name
    end
  end

  # A value as the ts URLSearchParams writes it: records as JSON.
  def _form_value(item)
    return JSON.generate(item) if item.is_a?(Hash) || item.is_a?(Array)
    item.to_s
  end
end
