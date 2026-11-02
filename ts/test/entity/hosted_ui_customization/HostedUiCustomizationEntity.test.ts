

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


describe('HostedUiCustomizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.HostedUiCustomization()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.HostedUiCustomization().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'hosted_ui_customization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clientId":{"a":true,"h":"Client Id","n":"clientId","r":true,"t":"`$STRING`","key$":"clientId","index$":0},"faviconUrl":{"a":true,"h":"Favicon Url","n":"faviconUrl","r":true,"t":"`$STRING`","key$":"faviconUrl","index$":1},"footerText":{"a":true,"h":"Footer Text","n":"footerText","r":true,"t":"`$STRING`","key$":"footerText","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"logoUrl":{"a":true,"h":"Logo Url","n":"logoUrl","r":true,"t":"`$STRING`","key$":"logoUrl","index$":4},"primaryColor":{"a":true,"h":"Primary Color","n":"primaryColor","r":true,"t":"`$STRING`","key$":"primaryColor","index$":5},"privacyPolicyUrl":{"a":true,"h":"Privacy Policy Url","n":"privacyPolicyUrl","r":true,"t":"`$STRING`","key$":"privacyPolicyUrl","index$":6},"psuPortalBaseUrl":{"a":true,"h":"Psu Portal Base Url","n":"psuPortalBaseUrl","r":true,"t":"`$STRING`","key$":"psuPortalBaseUrl","index$":7},"termsUrl":{"a":true,"h":"Terms Url","n":"termsUrl","r":true,"t":"`$STRING`","key$":"termsUrl","index$":8}},"id":{"field":"id","name":"id"},"name":"hosted_ui_customization","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations","q":{"exist":["authorization","id"]},"r":{"param":{"clientId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"capabilities"},{"lit":"clients"},{"var":"id"},{"lit":"hosted-ui-customizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"hosted_ui_customization","name__orig":"hosted_ui_customization","Name":"HostedUiCustomization","name_":"hosted_ui_customization","name-":"hosted-ui-customization","NAME":"HOSTED_UI_CUSTOMIZATION","index$":7}, {"active":true,"entity":"hosted_ui_customization","key$":"BasicHostedUiCustomizationFlow","kind":"basic","name":"BasicHostedUiCustomizationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"hosted_ui_customization_ref01","srcdatavar":"hosted_ui_customization_ref01_data","suffix":"_dt0"},"m":{"id":"hosted_ui_customization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-hosted_ui_customization_ref01"}}],"index$":0,"route":"GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations","record":{}}]}, 'HostedUiCustomization', {"GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations":{"protocol":"http","parameters":[{"name":"clientId","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"Bearer token for authentication","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let hosted_ui_customization_ref01_data = Object.values(setup.data.existing.hosted_ui_customization)[0] as any

    // LOAD
    const hosted_ui_customization_ref01_ent = client.HostedUiCustomization()
    const hosted_ui_customization_ref01_match_dt0: any = {}
    hosted_ui_customization_ref01_match_dt0.id = hosted_ui_customization_ref01_data.id
    const hosted_ui_customization_ref01_data_dt0 = (await hosted_ui_customization_ref01_ent.load(hosted_ui_customization_ref01_match_dt0)).data()
    assert(hosted_ui_customization_ref01_data_dt0.id === hosted_ui_customization_ref01_data.id)


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
      '../../../../.sdk/test/entity/hosted_ui_customization/HostedUiCustomizationTestData.json')

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
    ['hosted_ui_customization01','hosted_ui_customization02','hosted_ui_customization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID']
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
  
