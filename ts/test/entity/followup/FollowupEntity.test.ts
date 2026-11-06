

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


describe('FollowupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.Followup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Followup().create({"payment_id":1,"provider":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'followup.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"provider":{"a":true,"h":"Provider","n":"provider","r":true,"sh":"The provider information for the followup","t":"`$ANY`","key$":"provider","index$":0},"sender":{"a":true,"h":"Sender","n":"sender","r":false,"sh":"The sender information to be used with the payment","t":"`$ANY`","key$":"sender","index$":1}},"name":"followup","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["provider","sender"],"co":{"id":"POST /api/v1/ob/payments/{paymentId}/followups","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"payment_id","or":"paymentId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ob/payments/{paymentId}/followups","q":{"exist":["payment_id"]},"r":{"param":{"paymentId":"payment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"var":"payment_id"},{"lit":"followups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.payment"]]},"key$":"followup","name__orig":"followup","Name":"Followup","name_":"followup","name-":"followup","NAME":"FOLLOWUP","index$":5}, {"active":true,"entity":"followup","key$":"BasicFollowupFlow","kind":"basic","name":"BasicFollowupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"followup_ref01"},"m":{"payment_id":"payment01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Followup', {"POST /api/v1/ob/payments/{paymentId}/followups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"provider":{"description":"The provider information for the followup","example":{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851"},"allOf":[{"type":"object","properties":{"id":{}},"required":["id"],"x-ref":"#/components/schemas/FollowupProviderInputDto"}],"key$":"provider"},"sender":{"description":"The sender information to be used with the payment","allOf":[{"type":"object","properties":{"account":{},"credentials":{},"name":{}},"x-ref":"#/components/schemas/PaymentFollowupSenderInputDto"}],"key$":"sender"}},"required":["provider"],"x-ref":"#/components/schemas/CreatePaymentFollowupsAtProviderInputDto","index$":1}}}},"parameters":[{"name":"paymentId","required":true,"in":"path","schema":{"type":"string"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"followup.create.0":"GET-only live run: needs POST /api/v1/ob/payments/{paymentId}/followups"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const followup_ref01_ent = client.Followup()
    let followup_ref01_data = setup.data.new.followup['followup_ref01']
    followup_ref01_data['payment_id'] = setup.idmap['payment01']

    followup_ref01_data = (await followup_ref01_ent.create(followup_ref01_data)).data()
    assert(null != followup_ref01_data)


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
      '../../../../.sdk/test/entity/followup/FollowupTestData.json')

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
    ['followup01','followup02','followup03','payment01','payment02','payment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_FOLLOWUP_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_FOLLOWUP_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_FOLLOWUP_ENTID']
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
  
