

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


describe('ClientHostedUiCustomizationsOutputDtoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.ClientHostedUiCustomizationsOutputDto()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ClientHostedUiCustomizationsOutputDto().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'client_hosted_ui_customizations_output_dto.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"client_hosted_ui_customizations_output_dto","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations","q":{"$action":"hosted-ui-customizations","exist":["authorization","id"]},"r":{"param":{"clientId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"capabilities"},{"lit":"clients"},{"var":"id"},{"lit":"hosted-ui-customizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"client_hosted_ui_customizations_output_dto","name__orig":"client_hosted_ui_customizations_output_dto","Name":"ClientHostedUiCustomizationsOutputDto","name_":"client_hosted_ui_customizations_output_dto","name-":"client-hosted-ui-customizations-output-dto","NAME":"CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO","index$":1}, {"active":true,"entity":"client_hosted_ui_customizations_output_dto","key$":"BasicClientHostedUiCustomizationsOutputDtoFlow","kind":"basic","name":"BasicClientHostedUiCustomizationsOutputDtoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"client_hosted_ui_customizations_output_dto_ref01","srcdatavar":"client_hosted_ui_customizations_output_dto_ref01_data","suffix":"_dt0"},"m":{"id":"client_hosted_ui_customizations_output_dto01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-client_hosted_ui_customizations_output_dto_ref01"}}],"index$":0}]}, 'ClientHostedUiCustomizationsOutputDto', {"GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations":{"protocol":"http","parameters":[{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"Bearer token for authentication","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let client_hosted_ui_customizations_output_dto_ref01_data = Object.values(setup.data.existing.client_hosted_ui_customizations_output_dto)[0] as any

    // LOAD
    const client_hosted_ui_customizations_output_dto_ref01_ent = client.ClientHostedUiCustomizationsOutputDto()
    const client_hosted_ui_customizations_output_dto_ref01_match_dt0: any = {}
    client_hosted_ui_customizations_output_dto_ref01_match_dt0.id = client_hosted_ui_customizations_output_dto_ref01_data.id
    const client_hosted_ui_customizations_output_dto_ref01_data_dt0 = (await client_hosted_ui_customizations_output_dto_ref01_ent.load(client_hosted_ui_customizations_output_dto_ref01_match_dt0)).data()
    assert(client_hosted_ui_customizations_output_dto_ref01_data_dt0.id === client_hosted_ui_customizations_output_dto_ref01_data.id)


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
      '../../../../.sdk/test/entity/client_hosted_ui_customizations_output_dto/ClientHostedUiCustomizationsOutputDtoTestData.json')

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
    ['client_hosted_ui_customizations_output_dto01','client_hosted_ui_customizations_output_dto02','client_hosted_ui_customizations_output_dto03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
    'KASHIMI_SERVER_BASE': "",
  })

  idmap = env['KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_CLIENT_HOSTED_UI_CUSTOMIZATIONS_OUTPUT_DTO_ENTID']
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
  
