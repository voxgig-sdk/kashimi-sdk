

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


describe('CreatePaymentOutputDtoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
  afterEach(liveDelay('KASHIMI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KashimiSDK.test()
    const ent = testsdk.CreatePaymentOutputDto()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KashimiSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CreatePaymentOutputDto().create({"amount":"x","currency":"x","metadata":"x","paymentScheme":"x","recipient":"x","remittanceInformation":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'create_payment_output_dto.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":true,"sh":"The amount to be transferred.","t":"`$NUMBER`","key$":"amount","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":true,"sh":"The currency of the payment.","t":"`$STRING`","key$":"currency","index$":1},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":true,"t":"`$OBJECT`","key$":"metadata","index$":2},"paymentScheme":{"a":true,"h":"Payment Scheme","n":"paymentScheme","r":true,"sh":"Payment scheme.","t":"`$ANY`","key$":"paymentScheme","index$":3},"provider":{"a":true,"h":"Provider","n":"provider","op":{"create":{"req":false,"type":"`$ANY`"}},"r":true,"sh":"The provider information for the followup","t":"`$ANY`","key$":"provider","index$":4},"recipient":{"a":true,"h":"Recipient","n":"recipient","r":true,"sh":"Data about the party receiving the payment.","t":"`$ANY`","key$":"recipient","index$":5},"remittanceInformation":{"a":true,"h":"Remittance Information","n":"remittanceInformation","r":true,"sh":"Unstructured or structured remittance information.","t":"`$ANY`","key$":"remittanceInformation","index$":6},"sender":{"a":true,"h":"Sender","n":"sender","r":false,"sh":"The sender information to be used with the payment","t":"`$ANY`","key$":"sender","index$":7}},"name":"create_payment_output_dto","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["provider","sender"],"co":{"id":"POST /api/v1/ob/payments/{paymentId}/followups","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"payment_id","or":"paymentId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api/v1/ob/payments/{paymentId}/followups","q":{"exist":["authorization","payment_id"]},"r":{"param":{"paymentId":"payment_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"},{"var":"payment_id"},{"lit":"followups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["amount","currency","metadata","paymentScheme","provider","recipient","remittanceInformation","sender"],"co":{"id":"POST /api/v1/ob/payments","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"en","k":"header","n":"accept_language","or":"Accept-Language","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/api/v1/ob/payments","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"ob"},{"lit":"payments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.payment"]]},"key$":"create_payment_output_dto","name__orig":"create_payment_output_dto","Name":"CreatePaymentOutputDto","name_":"create_payment_output_dto","name-":"create-payment-output-dto","NAME":"CREATE_PAYMENT_OUTPUT_DTO","index$":2}, {"active":true,"entity":"create_payment_output_dto","key$":"BasicCreatePaymentOutputDtoFlow","kind":"basic","name":"BasicCreatePaymentOutputDtoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"create_payment_output_dto_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'CreatePaymentOutputDto', {"POST /api/v1/ob/payments/{paymentId}/followups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"provider":{"description":"The provider information for the followup","example":{"id":"d290f1ee-6c54-4b01-90e6-d701748f0851"},"allOf":[{"type":"object","properties":{"id":{}},"required":["id"],"x-ref":"#/components/schemas/FollowupProviderInputDto"}],"key$":"provider"},"sender":{"description":"The sender information to be used with the payment","allOf":[{"type":"object","properties":{"account":{},"credentials":{},"name":{}},"x-ref":"#/components/schemas/PaymentFollowupSenderInputDto"}],"key$":"sender"}},"required":["provider"],"x-ref":"#/components/schemas/CreatePaymentFollowupsAtProviderInputDto","index$":1}}}},"parameters":[{"name":"paymentId","required":true,"in":"path","schema":{"type":"string"},"index$":0},{"name":"Authorization","in":"header","description":"Bearer token for authentication","required":true,"schema":{"type":"string"},"index$":1}]},"POST /api/v1/ob/payments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"provider":{"description":"Data about the payment provider.","allOf":[{"type":"object","properties":{"id":{},"preferences":{}},"x-ref":"#/components/schemas/PaymentProviderInputDto"}],"key$":"provider"},"paymentScheme":{"description":"Payment scheme.","example":{"name":"SEPA"},"allOf":[{"type":"object","properties":{"name":{},"preferences":{}},"required":["name"],"x-ref":"#/components/schemas/PaymentPaymentSchemeInputDto"}],"key$":"paymentScheme"},"sender":{"description":"Data about the party sending the payment.","allOf":[{"type":"object","properties":{"account":{},"address":{},"credentials":{}},"x-ref":"#/components/schemas/PaymentSenderInputDto"}],"key$":"sender"},"recipient":{"description":"Data about the party receiving the payment.","allOf":[{"type":"object","properties":{"account":{},"name":{},"address":{}},"required":["account","name","address"],"x-ref":"#/components/schemas/PaymentRecipientInputDto"}],"key$":"recipient"},"amount":{"type":"number","description":"The amount to be transferred.","example":10,"key$":"amount"},"currency":{"type":"string","description":"The currency of the payment.","example":"EUR","key$":"currency"},"remittanceInformation":{"description":"Unstructured or structured remittance information.","allOf":[{"type":"object","properties":{"type":{},"value":{},"preferences":{}},"required":["type","value"],"x-ref":"#/components/schemas/PaymentRemittanceInformationInputDto"}],"key$":"remittanceInformation"},"metadata":{"type":"object","properties":{"redirectUri":{"type":"string","description":"The URI to which the PSU will be redirected once the payment flow is completed.","example":"https://example.com/redirect?paymentId=12345"},"psuIpAddress":{"type":"string","description":"The IPv4 or IPv6 address of the PSU. Required by providers. IPv4 must be a full four-octet IP address, e.g. 84.240.80.120. IPv6 must be expanded to eight segments without the `::` shorthand.","example":"84.240.80.120"},"psuUserAgent":{"type":"string","description":"The user agent of the PSU. Required by providers.","example":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"},"endToEndId":{"type":"string","description":"The ID of the payment in your system. Maximum 35 characters. If you are using UUIDs, remove hyphens to fit into the character limit. Only alphanumeric characters and these special characters are allowed: / + - : [space].","example":"123456789123456789"},"webhookUrl":{"type":"string","description":"The URL where you want to receive a webhook when the payment status changes. Must be a valid HTTPS URL.","example":"https://example.com/webhook"},"note":{"type":"string","description":"A free-text note for your own reference. This value is not passed to the bank and is purely for the client's usage.","example":"Invoice 12345"}},"required":["redirectUri","psuIpAddress","psuUserAgent","endToEndId"],"x-ref":"#/components/schemas/PaymentMetadataInputDto","key$":"metadata"}},"required":["paymentScheme","recipient","amount","currency","remittanceInformation","metadata"],"x-ref":"#/components/schemas/CreatePaymentInputDto","index$":1}}}},"parameters":[{"name":"Accept-Language","in":"header","description":"Preferred initial UI language for payment initiation. The user will be able to change it later. Must be a two-letter ISO 639-1 language code (e.g., 'en' for English, 'fr' for French). Invalid values will be ignored.","required":false,"schema":{"type":"string","example":"en"},"index$":0},{"name":"Authorization","in":"header","description":"Bearer token for authentication","required":true,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"create_payment_output_dto.create.0":"GET-only live run: needs POST /api/v1/ob/payments/{paymentId}/followups"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const create_payment_output_dto_ref01_ent = client.CreatePaymentOutputDto()
    let create_payment_output_dto_ref01_data = setup.data.new.create_payment_output_dto['create_payment_output_dto_ref01']

    create_payment_output_dto_ref01_data = (await create_payment_output_dto_ref01_ent.create(create_payment_output_dto_ref01_data)).data()
    assert(null != create_payment_output_dto_ref01_data)


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
      '../../../../.sdk/test/entity/create_payment_output_dto/CreatePaymentOutputDtoTestData.json')

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
    ['create_payment_output_dto01','create_payment_output_dto02','create_payment_output_dto03','payment01','payment02','payment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KASHIMI_TEST_CREATE_PAYMENT_OUTPUT_DTO_ENTID': idmap,
    'KASHIMI_TEST_LIVE': 'FALSE',
    'KASHIMI_TEST_EXPLAIN': 'FALSE',
    'KASHIMI_APIKEY': '',
    'KASHIMI_SERVER_BASE': "",
  })

  idmap = env['KASHIMI_TEST_CREATE_PAYMENT_OUTPUT_DTO_ENTID']

  const live = 'TRUE' === env.KASHIMI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KASHIMI_TEST_CREATE_PAYMENT_OUTPUT_DTO_ENTID']
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
  
