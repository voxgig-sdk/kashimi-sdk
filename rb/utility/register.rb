# Kashimi SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KashimiUtility.registrar = ->(u) {
  u.clean = KashimiUtilities::Clean
  u.clean_add = KashimiUtilities::CleanAdd
  u.clean_explain = KashimiUtilities::CleanExplain
  u.done = KashimiUtilities::Done
  u.make_error = KashimiUtilities::MakeError
  u.feature_add = KashimiUtilities::FeatureAdd
  u.feature_hook = KashimiUtilities::FeatureHook
  u.feature_init = KashimiUtilities::FeatureInit
  u.fetcher = KashimiUtilities::Fetcher
  u.make_fetch_def = KashimiUtilities::MakeFetchDef
  u.make_context = KashimiUtilities::MakeContext
  u.make_options = KashimiUtilities::MakeOptions
  u.make_request = KashimiUtilities::MakeRequest
  u.make_response = KashimiUtilities::MakeResponse
  u.make_result = KashimiUtilities::MakeResult
  u.make_point = KashimiUtilities::MakePoint
  u.make_spec = KashimiUtilities::MakeSpec
  u.make_url = KashimiUtilities::MakeUrl
  u.param = KashimiUtilities::Param
  u.prepare_auth = KashimiUtilities::PrepareAuth
  u.prepare_body = KashimiUtilities::PrepareBody
  u.prepare_headers = KashimiUtilities::PrepareHeaders
  u.prepare_method = KashimiUtilities::PrepareMethod
  u.prepare_params = KashimiUtilities::PrepareParams
  u.prepare_path = KashimiUtilities::PreparePath
  u.prepare_query = KashimiUtilities::PrepareQuery
  u.graphql_body = KashimiUtilities::GraphqlBody
  u.graphql_errors = KashimiUtilities::GraphqlErrors
  u.result_basic = KashimiUtilities::ResultBasic
  u.result_body = KashimiUtilities::ResultBody
  u.result_headers = KashimiUtilities::ResultHeaders
  u.transform_request = KashimiUtilities::TransformRequest
  u.transform_response = KashimiUtilities::TransformResponse
}
