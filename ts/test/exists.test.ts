
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KashimiSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KashimiSDK.test()
    equal(testsdk instanceof KashimiSDK, true,
      'KashimiSDK.test() must return a client synchronously')
  })

})
