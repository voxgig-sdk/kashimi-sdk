# Kashimi SDK utility: make_context
require_relative '../core/context'
module KashimiUtilities
  MakeContext = ->(ctxmap, basectx) {
    KashimiContext.new(ctxmap, basectx)
  }
end
