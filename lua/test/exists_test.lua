-- Kashimi SDK exists test

local sdk = require("kashimi_sdk")

describe("KashimiSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
