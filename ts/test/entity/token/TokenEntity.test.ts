

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KashimiSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.Token()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Token().create({"access_token":1,"expires_in":1,"grant_type":"x","scope":"x","token_type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"access_token":{"a":true,"h":"Access Token","n":"access_token","r":true,"sh":"The JWT access token.","t":"`$STRING`","key$":"access_token","index$":0},"expires_in":{"a":true,"h":"Expires In","n":"expires_in","r":true,"sh":"Expiration time of the token in seconds.","t":"`$NUMBER`","key$":"expires_in","index$":1},"grant_type":{"a":true,"h":"Grant Type","n":"grant_type","r":true,"sh":"The type of grant being requested.","t":"`$STRING`","key$":"grant_type","index$":2},"scope":{"a":true,"h":"Scope","n":"scope","r":true,"sh":"Scopes being requested.","t":"`$STRING`","key$":"scope","index$":3},"token_type":{"a":true,"h":"Token Type","n":"token_type","r":true,"sh":"Token type.","t":"`$STRING`","key$":"token_type","index$":4}},"name":"token","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/auth/token","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"Basic dXNlcm5hbWU6cGFzc3dvcmQ=","k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/auth/token","q":{"exist":["authorization"]},"r":{},"rb":{"fields":[{"name":"grant_type"},{"name":"scope"}],"kind":"form","media":"application/x-www-form-urlencoded"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"auth"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"token","name__orig":"token","Name":"Token","name_":"token","name-":"token","NAME":"TOKEN","index$":17}, {"active":true,"entity":"token","key$":"BasicTokenFlow","kind":"basic","name":"BasicTokenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"token_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Token', {"POST /api/v1/auth/token":{"protocol":"http","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"grant_type":{"type":"string","description":"The type of grant being requested.","example":"client_credentials","enum":["client_credentials"],"key$":"grant_type"},"scope":{"type":"string","description":"Scopes being requested. Must be a space-separated list of scopes.","example":"payments:read payments:write providers:read","key$":"scope"}},"required":["grant_type","scope"],"x-ref":"#/components/schemas/CreateTokenInputDto","index$":1}}}},"parameters":[{"name":"Authorization","in":"header","description":"Basic authorization header with client credentials in the format 'Basic <base64-encoded string of format clientId:clientSecret>'","required":true,"schema":{"type":"string","example":"Basic dXNlcm5hbWU6cGFzc3dvcmQ="},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"token.create.0":"GET-only live run: needs POST /api/v1/auth/token"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const token_ref01_ent = client.Token()
    let token_ref01_data = setup.data.new.token['token_ref01']

    token_ref01_data = (await token_ref01_ent.create(token_ref01_data)).data()
    assert(null != token_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/token/TokenTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KashimiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['token01','token02','token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_TOKEN_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_TOKEN_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_TOKEN_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KashimiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.KASHIMI_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KASHIMI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
