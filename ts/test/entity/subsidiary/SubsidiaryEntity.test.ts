

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


describe('SubsidiaryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.Subsidiary()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Subsidiary().list({"provider_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'subsidiary.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bic":{"a":true,"h":"Bic","n":"bic","r":true,"sh":"BIC code of the provider","t":"`$STRING`","key$":"bic","index$":0},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":true,"sh":"Country code of the provider.","t":"`$STRING`","key$":"countryCode","index$":1},"hasSubsidiaries":{"a":true,"h":"Has Subsidiaries","n":"hasSubsidiaries","r":true,"sh":"Whether the provider has subsidiaries.","t":"`$BOOLEAN`","key$":"hasSubsidiaries","index$":2},"iconUrl":{"a":true,"h":"Icon Url","n":"iconUrl","r":true,"sh":"URL of the provider's icon.","t":"`$STRING`","key$":"iconUrl","index$":3},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for the provider.","t":"`$STRING`","key$":"id","index$":4},"logoUrl":{"a":true,"h":"Logo Url","n":"logoUrl","r":true,"sh":"URL of the provider's logo.","t":"`$STRING`","key$":"logoUrl","index$":5},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Name of the provider.","t":"`$STRING`","key$":"name","index$":6},"paymentSchemes":{"a":true,"h":"Payment Schemes","n":"paymentSchemes","r":true,"sh":"Array of payment schemes that we support for this provider.","t":"`$ARRAY`","key$":"paymentSchemes","index$":7},"requiredPaymentFields":{"a":true,"h":"Required Payment Fields","n":"requiredPaymentFields","r":true,"sh":"Array of required payment fields for this provider.","t":"`$ARRAY`","key$":"requiredPaymentFields","index$":8}},"id":{"field":"id","name":"id"},"name":"subsidiary","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/capabilities/providers/{id}/subsidiaries","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"provider_id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$OBJECT`","index$":0},{"a":true,"k":"query","n":"filter","or":"filters","r":false,"t":"`$OBJECT`","index$":1}]},"k":"http","m":"GET","o":"/api/v1/capabilities/providers/{id}/subsidiaries","q":{"exist":["provider_id"]},"r":{"param":{"id":"provider_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"capabilities"},{"lit":"providers"},{"var":"provider_id"},{"lit":"subsidiaries"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.provider"]]},"key$":"subsidiary","name__orig":"subsidiary","Name":"Subsidiary","name_":"subsidiary","name-":"subsidiary","NAME":"SUBSIDIARY","index$":16}, {"active":true,"entity":"subsidiary","key$":"BasicSubsidiaryFlow","kind":"basic","name":"BasicSubsidiaryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"provider_id":"provider01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"subsidiary_ref01"}}],"index$":0}]}, 'Subsidiary', {"GET /api/v1/capabilities/providers/{id}/subsidiaries":{"protocol":"http","parameters":[{"name":"id","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"filters","required":false,"in":"query","description":"Filters narrowing down the returned providers, passed as nested query parameters, e.g. ?filters[countryCode]=NL","schema":{"type":"object","properties":{"countryCode":{"type":"string","enum":["AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BR","IO","BN","BG","BF","BI","CV","KH","CM","CA","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","HR","CU","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI","FR","GF","PF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GN","GW","GY","HT","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","SS","ES","LK","SD","SR","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TV","UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW"],"example":"NL","description":"Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers."}},"x-ref":"#/components/schemas/GetProvidersFilters"},"index$":1},{"name":"cursor","required":false,"in":"query","description":"Opaque cursor for pagination, passed as a nested query parameter, e.g. ?cursor[value]=... Use the `meta.cursor.next.value` from a previous response; omit to fetch the first page.","schema":{"type":"object","properties":{},"x-ref":"#/components/schemas/GetProvidersCursorInputDto"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let subsidiary_ref01_data = Object.values(setup.data.existing.subsidiary)[0] as any

    // LIST
    const subsidiary_ref01_ent = client.Subsidiary()
    const subsidiary_ref01_match: any = {}
    subsidiary_ref01_match['provider_id'] = setup.idmap['provider01']

    const subsidiary_ref01_list = (await subsidiary_ref01_ent.list(subsidiary_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/subsidiary/SubsidiaryTestData.json')

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
    ['subsidiary01','subsidiary02','subsidiary03','provider01','provider02','provider03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_SUBSIDIARY_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
  })

  idmap = env['KASHIMI_TEST_SUBSIDIARY_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_SUBSIDIARY_ENTID']
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
  
