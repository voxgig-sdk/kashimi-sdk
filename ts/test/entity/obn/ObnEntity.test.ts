

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


describe('ObnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.Obn()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Obn().load({"provider_id":1,"state":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'obn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"obn","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/v1/ob/payments/cancel","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"provider_id","or":"providerId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ob/payments/cancel","q":{"exist":["provider_id","state"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/ob/callbacks","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"provider_id","or":"providerId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ob/callbacks","q":{"$action":"callback","exist":["provider_id","state"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"callbacks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/v1/ob/client-jwks","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e","k":"query","n":"client_id","or":"clientId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f","k":"query","n":"provider_id","or":"providerId","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"revoked","or":"revoked","r":false,"t":"`$BOOLEAN`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/ob/client-jwks","q":{"$action":"client_jwk","exist":["client_id","provider_id"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"client-jwks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /api/v1/ob/payments/sender-accounts","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"provider_id","or":"providerId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"state","or":"state","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/ob/payments/sender-accounts","q":{"exist":["provider_id","state"]},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"sender-accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /api/v1/ob/callbacks/with-provider-nano-id","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ob/callbacks/with-provider-nano-id","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"callbacks"},{"lit":"with-provider-nano-id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /api/v1/ob/payments/decoupled/confirmation-data","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ob/payments/decoupled/confirmation-data","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"confirmation-data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /api/v1/ob/payments/decoupled/consent-status","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ob/payments/decoupled/consent-status","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"consent-status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /api/v1/ob/payments/decoupled/sca-data","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ob/payments/decoupled/sca-data","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"sca-data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"co":{"id":"GET /api/v1/ob/payments/decoupled/sca-methods","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/ob/payments/decoupled/sca-methods","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"sca-methods"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/ob/payments/decoupled/sca-data","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/ob/payments/decoupled/sca-data","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"sca-data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/ob/payments/decoupled/selected-sca-method","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/ob/payments/decoupled/selected-sca-method","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"decoupled"},{"lit":"selected-sca-method"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"PATCH /api/v1/ob/payments/psu-provided-data","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/ob/payments/psu-provided-data","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"psu-provided-data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":false,"co":{"id":"PATCH /api/v1/ob/payments/sender-accounts","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/ob/payments/sender-accounts","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"sender-accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"obn","name__orig":"obn","Name":"Obn","name_":"obn","name-":"obn","NAME":"OBN","index$":6}, {"active":true,"entity":"obn","key$":"BasicObnFlow","kind":"basic","name":"BasicObnFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"obn_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"obn_ref01","srcdatavar":"obn_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-obn_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"obn_ref01","srcdatavar":"obn_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-obn_ref01"}}],"index$":2}]}, 'Obn', {"POST /api/v1/ob/payments/cancel":{"protocol":"http","parameters":[{"name":"state","required":true,"in":"query","schema":{"type":"string"},"index$":0},{"name":"providerId","required":true,"in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/ob/callbacks":{"protocol":"http","parameters":[{"name":"state","required":true,"in":"query","schema":{"type":"string"},"index$":0},{"name":"providerId","required":true,"in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/ob/client-jwks":{"protocol":"http","parameters":[{"name":"providerId","required":true,"in":"query","description":"Provider id in uuid format.","schema":{"example":"b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f","type":"string"},"index$":0},{"name":"clientId","required":true,"in":"query","description":"Client id in uuid format.","schema":{"example":"f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e","type":"string"},"index$":1},{"name":"revoked","required":false,"in":"query","schema":{"type":"boolean"},"index$":2}]},"GET /api/v1/ob/payments/sender-accounts":{"protocol":"http","parameters":[{"name":"state","required":true,"in":"query","schema":{"type":"string"},"index$":0},{"name":"providerId","required":true,"in":"query","schema":{"type":"string"},"index$":1}]},"GET /api/v1/ob/callbacks/with-provider-nano-id":{"protocol":"http","parameters":[]},"GET /api/v1/ob/payments/decoupled/confirmation-data":{"protocol":"http","parameters":[]},"GET /api/v1/ob/payments/decoupled/consent-status":{"protocol":"http","parameters":[]},"GET /api/v1/ob/payments/decoupled/sca-data":{"protocol":"http","parameters":[]},"GET /api/v1/ob/payments/decoupled/sca-methods":{"protocol":"http","parameters":[]},"PATCH /api/v1/ob/payments/decoupled/sca-data":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{},"x-ref":"#/components/schemas/UpdateDecoupledPaymentScaDataBodyInputDto","index$":1}}}},"parameters":[]},"PATCH /api/v1/ob/payments/decoupled/selected-sca-method":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{},"x-ref":"#/components/schemas/UpdateDecoupledPaymentScaMethodBodyInputDto","index$":1}}}},"parameters":[]},"PATCH /api/v1/ob/payments/psu-provided-data":{"protocol":"http","parameters":[]},"PATCH /api/v1/ob/payments/sender-accounts":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{},"x-ref":"#/components/schemas/UpdatePaymentSenderAccountBodyInputDto","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"obn.create.0":"GET-only live run: needs POST /api/v1/ob/payments/cancel","obn.update.1":"GET-only live run: needs PATCH /api/v1/ob/payments/decoupled/sca-data"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const obn_ref01_ent = client.Obn()
    let obn_ref01_data = setup.data.new.obn['obn_ref01']

    obn_ref01_data = (await obn_ref01_ent.create(obn_ref01_data)).data()
    assert(null != obn_ref01_data)


    // UPDATE
    const obn_ref01_data_up0: any = {}

    const obn_ref01_resdata_up0 = (await obn_ref01_ent.update(obn_ref01_data_up0)).data()
    assert(null != obn_ref01_resdata_up0)


    // LOAD
    const obn_ref01_match_dt0: any = {}
    const obn_ref01_data_dt0 = (await obn_ref01_ent.load(obn_ref01_match_dt0)).data()
    assert(null != obn_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/obn/ObnTestData.json')

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
    ['obn01','obn02','obn03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_OBN_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
    'KASHIMI_SERVER_BASE': "",
  })

  idmap = env['KASHIMI_TEST_OBN_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_OBN_ENTID']
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
        server: {
          base: env.KASHIMI_SERVER_BASE,
        },
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
  
