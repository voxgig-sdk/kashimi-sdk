

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


describe('ReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.Report()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Report().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":true,"sh":"Payment amount","t":"`$NUMBER`","key$":"amount","index$":0},"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":true,"t":"`$STRING`","key$":"createdAt","index$":1},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"sh":"Currency code","t":"`$STRING`","key$":"currency","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique payment identifier","t":"`$STRING`","key$":"id","index$":3},"provider":{"a":true,"h":"Provider","n":"provider","r":false,"sh":"Selected provider details (name, country).","t":"`$OBJECT`","key$":"provider","index$":4},"recipient":{"a":true,"h":"Recipient","n":"recipient","r":true,"t":"`$OBJECT`","key$":"recipient","index$":5},"remittanceInformation":{"a":true,"h":"Remittance Information","n":"remittanceInformation","r":true,"t":"`$ANY`","key$":"remittanceInformation","index$":6},"sender":{"a":true,"h":"Sender","n":"sender","r":false,"t":"`$OBJECT`","key$":"sender","index$":7},"status":{"a":true,"h":"Status","n":"status","r":true,"sh":"The most recent status of the payment.","t":"`$STRING`","key$":"status","index$":8}},"id":{"field":"id","name":"id"},"name":"report","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/reports/payments/{id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/reports/payments/{id}","q":{"exist":["authorization","id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"reports"},{"lit":"payments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report","name__orig":"report","Name":"Report","name_":"report","name-":"report","NAME":"REPORT","index$":12}, {"active":true,"entity":"report","key$":"BasicReportFlow","kind":"basic","name":"BasicReportFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"report_ref01","srcdatavar":"report_ref01_data","suffix":"_dt0"},"m":{"id":"report01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_ref01"}}],"index$":0,"route":"GET /api/v1/reports/payments/{id}","record":{}}]}, 'Report', {"GET /api/v1/reports/payments/{id}":{"protocol":"http","parameters":[{"name":"id","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"Bearer token for authentication","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_ref01_data = Object.values(setup.data.existing.report)[0] as any

    // LOAD
    const report_ref01_ent = client.Report()
    const report_ref01_match_dt0: any = {}
    report_ref01_match_dt0.id = report_ref01_data.id
    const report_ref01_data_dt0 = (await report_ref01_ent.load(report_ref01_match_dt0)).data()
    assert(report_ref01_data_dt0.id === report_ref01_data.id)


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
      '../../../../.sdk/test/entity/report/ReportTestData.json')

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
    ['report01','report02','report03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_REPORT_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_REPORT_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_REPORT_ENTID']
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
  
