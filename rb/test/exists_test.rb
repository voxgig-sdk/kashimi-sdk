# Kashimi SDK exists test

require "minitest/autorun"
require_relative "../Kashimi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KashimiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
