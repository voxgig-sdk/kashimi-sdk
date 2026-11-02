

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


describe('PsuProvidedDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.PsuProvidedData()
    assert(null != ent)
  })




  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'psu_provided_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"psu_provided_data","op":{"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /api/v1/ob/payments/psu-provided-data","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/v1/ob/payments/psu-provided-data","q":{},"r":{},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"lit":"psu-provided-data"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"psu_provided_data","name__orig":"psu_provided_data","Name":"PsuProvidedData","name_":"psu_provided_data","name-":"psu-provided-data","NAME":"PSU_PROVIDED_DATA","index$":11}, {"active":true,"entity":"psu_provided_data","key$":"BasicPsuProvidedDataFlow","kind":"basic","name":"BasicPsuProvidedDataFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"psu_provided_data_ref01","srcdatavar":"psu_provided_data_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-psu_provided_data_ref01"}}],"v":[],"index$":0}]}, 'PsuProvidedData', {"PATCH /api/v1/ob/payments/psu-provided-data":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"psu_provided_data.update.0":"GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let psu_provided_data_ref01_data = Object.values(setup.data.existing.psu_provided_data)[0] as any

    // UPDATE
    const psu_provided_data_ref01_ent = client.PsuProvidedData()
    const psu_provided_data_ref01_data_up0: any = {}

    const psu_provided_data_ref01_resdata_up0 = (await psu_provided_data_ref01_ent.update(psu_provided_data_ref01_data_up0)).data()
    assert(null != psu_provided_data_ref01_resdata_up0)


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
      '../../../../.sdk/test/entity/psu_provided_data/PsuProvidedDataTestData.json')

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
    ['psu_provided_data01','psu_provided_data02','psu_provided_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID']
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
  
