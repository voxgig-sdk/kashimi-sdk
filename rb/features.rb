# Kashimi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KashimiFeatures
  def self.make_feature(name)
    case name
    when "base"
      KashimiBaseFeature.new
    when "debug"
      KashimiDebugFeature.new
    when "idempotency"
      KashimiIdempotencyFeature.new
    when "metrics"
      KashimiMetricsFeature.new
    when "paging"
      KashimiPagingFeature.new
    when "ratelimit"
      KashimiRatelimitFeature.new
    when "retry"
      KashimiRetryFeature.new
    when "secrets"
      KashimiSecretsFeature.new
    when "test"
      KashimiTestFeature.new
    when "timeout"
      KashimiTimeoutFeature.new
    else
      KashimiBaseFeature.new
    end
  end
end
