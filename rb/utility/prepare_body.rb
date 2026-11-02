# Kashimi SDK utility: prepare_body
require_relative 'media'
module KashimiUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KashimiUtilities.raw_body(ctx.reqdata) if KashimiUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
