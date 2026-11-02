"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PaymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.Payment();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('payment hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.KashimiSDK.test(offline).Payment().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.KashimiSDK.test(offline).Payment()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.KashimiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Payment().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.KashimiSDK.test().Payment().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.KashimiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Payment().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Payment().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KashimiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Payment().list({ "cursor_value": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": true, "sh": "Payment amount", "t": "`$NUMBER`", "key$": "amount", "index$": 0 }, "createdAt": { "a": true, "h": "Created At", "n": "createdAt", "r": true, "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": true, "sh": "Currency code", "t": "`$STRING`", "key$": "currency", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique payment identifier", "t": "`$STRING`", "key$": "id", "index$": 3 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "t": "`$OBJECT`", "key$": "metadata", "index$": 4 }, "paymentScheme": { "a": true, "h": "Payment Scheme", "n": "paymentScheme", "r": true, "sh": "Payment scheme used", "t": "`$ANY`", "key$": "paymentScheme", "index$": 5 }, "provider": { "a": true, "h": "Provider", "n": "provider", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Payment provider details.", "t": "`$ANY`", "key$": "provider", "index$": 6 }, "recipient": { "a": true, "h": "Recipient", "n": "recipient", "r": true, "sh": "Data about the party receiving the payment.", "t": "`$OBJECT`", "key$": "recipient", "index$": 7 }, "remittanceInformation": { "a": true, "h": "Remittance Information", "n": "remittanceInformation", "r": true, "sh": "Unstructured or structured remittance information.", "t": "`$ANY`", "key$": "remittanceInformation", "index$": 8 }, "sender": { "a": true, "h": "Sender", "n": "sender", "op": { "create": { "req": false, "type": "`$ANY`" } }, "r": true, "sh": "Data about the party sending the payment.", "t": "`$OBJECT`", "key$": "sender", "index$": 9 }, "updatedAt": { "a": true, "h": "Updated At", "n": "updatedAt", "r": true, "t": "`$STRING`", "key$": "updatedAt", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "payment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/ob/payments/cancel", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "provider_id", "or": "providerId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "state", "or": "state", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ob/payments/cancel", "q": { "$action": "cancel", "exist": ["provider_id", "state"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ob" }, { "lit": "payments" }, { "lit": "cancel" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["amount", "currency", "metadata", "paymentScheme", "provider", "recipient", "remittanceInformation", "sender"], "co": { "id": "POST /api/v1/ob/payments", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "en", "k": "header", "n": "accept_language", "or": "Accept-Language", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/api/v1/ob/payments", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ob" }, { "lit": "payments" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/archive/payments", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor_value", "or": "cursor[value]", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2026-07-01T00:00:00.000Z", "k": "query", "n": "filters_created_at_from", "or": "filters[createdAt][from]", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2026-07-02T00:00:00.000Z", "k": "query", "n": "filters_created_at_to", "or": "filters[createdAt][to]", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "1234567890", "k": "query", "n": "filters_metadata_end_to_end_id", "or": "filters[metadata][endToEndId]", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/v1/archive/payments", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "archive" }, { "lit": "payments" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/archive/payments/{id}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/archive/payments/{id}", "q": { "exist": ["authorization", "id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "archive" }, { "lit": "payments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment", "name__orig": "payment", "Name": "Payment", "name_": "payment", "name-": "payment", "NAME": "PAYMENT", "index$": 8 }, { "active": true, "entity": "payment", "key$": "BasicPaymentFlow", "kind": "basic", "name": "BasicPaymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payment_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "payment_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "payment_ref01", "srcdatavar": "payment_ref01_data", "suffix": "_dt0" }, "m": { "id": "payment01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_ref01" } }], "index$": 2, "route": "GET /api/v1/archive/payments/{id}", "record": {} }] }, 'Payment', { "POST /api/v1/ob/payments/cancel": { "protocol": "http", "parameters": [{ "name": "state", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 0 }, { "name": "providerId", "required": true, "in": "query", "schema": { "type": "string" }, "index$": 1 }] }, "POST /api/v1/ob/payments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "provider": { "description": "Data about the payment provider.", "allOf": [{ "type": "object", "properties": { "id": {}, "preferences": {} }, "x-ref": "#/components/schemas/PaymentProviderInputDto" }], "key$": "provider" }, "paymentScheme": { "description": "Payment scheme.", "example": { "name": "SEPA" }, "allOf": [{ "type": "object", "properties": { "name": {}, "preferences": {} }, "required": ["name"], "x-ref": "#/components/schemas/PaymentPaymentSchemeInputDto" }], "key$": "paymentScheme" }, "sender": { "description": "Data about the party sending the payment.", "allOf": [{ "type": "object", "properties": { "account": {}, "address": {}, "credentials": {} }, "x-ref": "#/components/schemas/PaymentSenderInputDto" }], "key$": "sender" }, "recipient": { "description": "Data about the party receiving the payment.", "allOf": [{ "type": "object", "properties": { "account": {}, "name": {}, "address": {} }, "required": ["account", "name", "address"], "x-ref": "#/components/schemas/PaymentRecipientInputDto" }], "key$": "recipient" }, "amount": { "type": "number", "description": "The amount to be transferred.", "example": 10, "key$": "amount" }, "currency": { "type": "string", "description": "The currency of the payment.", "example": "EUR", "key$": "currency" }, "remittanceInformation": { "description": "Unstructured or structured remittance information.", "allOf": [{ "type": "object", "properties": { "type": {}, "value": {}, "preferences": {} }, "required": ["type", "value"], "x-ref": "#/components/schemas/PaymentRemittanceInformationInputDto" }], "key$": "remittanceInformation" }, "metadata": { "type": "object", "properties": { "redirectUri": { "type": "string", "description": "The URI to which the PSU will be redirected once the payment flow is completed.", "example": "https://example.com/redirect?paymentId=12345" }, "psuIpAddress": { "type": "string", "description": "The IPv4 or IPv6 address of the PSU. Required by providers. IPv4 must be a full four-octet IP address, e.g. 84.240.80.120. IPv6 must be expanded to eight segments without the `::` shorthand.", "example": "84.240.80.120" }, "psuUserAgent": { "type": "string", "description": "The user agent of the PSU. Required by providers.", "example": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3" }, "endToEndId": { "type": "string", "description": "The ID of the payment in your system. Maximum 35 characters. If you are using UUIDs, remove hyphens to fit into the character limit. Only alphanumeric characters and these special characters are allowed: / + - : [space].", "example": "123456789123456789" }, "webhookUrl": { "type": "string", "description": "The URL where you want to receive a webhook when the payment status changes. Must be a valid HTTPS URL.", "example": "https://example.com/webhook" }, "note": { "type": "string", "description": "A free-text note for your own reference. This value is not passed to the bank and is purely for the client's usage.", "example": "Invoice 12345" } }, "required": ["redirectUri", "psuIpAddress", "psuUserAgent", "endToEndId"], "x-ref": "#/components/schemas/PaymentMetadataInputDto", "key$": "metadata" } }, "required": ["paymentScheme", "recipient", "amount", "currency", "remittanceInformation", "metadata"], "x-ref": "#/components/schemas/CreatePaymentInputDto", "index$": 1 } } } }, "parameters": [{ "name": "Accept-Language", "in": "header", "description": "Preferred initial UI language for payment initiation. The user will be able to change it later. Must be a two-letter ISO 639-1 language code (e.g., 'en' for English, 'fr' for French). Invalid values will be ignored.", "required": false, "schema": { "type": "string", "example": "en" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/archive/payments": { "protocol": "http", "parameters": [{ "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "cursor[value]", "required": false, "in": "query", "description": "Opaque cursor returned as `meta.cursor.next.value` by a previous response. Returns items after this position. Omit to fetch the first page.", "schema": { "type": "string" }, "index$": 1 }, { "name": "filters[createdAt][to]", "required": false, "in": "query", "description": "Exclusive upper bound (ISO-8601). Matches payments created strictly before this instant.", "schema": { "example": "2026-07-02T00:00:00.000Z", "type": "string" }, "index$": 2 }, { "name": "filters[createdAt][from]", "required": false, "in": "query", "description": "Inclusive lower bound (ISO-8601). Matches payments created at or after this instant.", "schema": { "example": "2026-07-01T00:00:00.000Z", "type": "string" }, "index$": 3 }, { "name": "filters[metadata][endToEndId]", "required": false, "in": "query", "description": "Filter payments by end-to-end ID", "schema": { "example": "1234567890", "type": "string" }, "index$": 4 }] }, "GET /api/v1/archive/payments/{id}": { "protocol": "http", "parameters": [{ "name": "id", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "payment.create.0": "GET-only live run: needs POST /api/v1/ob/payments/cancel" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const payment_ref01_ent = client.Payment();
        let payment_ref01_data = setup.data.new.payment['payment_ref01'];
        payment_ref01_data = (await payment_ref01_ent.create(payment_ref01_data)).data();
        (0, node_assert_1.default)(null != payment_ref01_data.id);
        // LIST
        const payment_ref01_match = {};
        const payment_ref01_list = (await payment_ref01_ent.list(payment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(payment_ref01_list, { id: payment_ref01_data.id })));
        // LOAD
        const payment_ref01_match_dt0 = {};
        payment_ref01_match_dt0.id = payment_ref01_data.id;
        const payment_ref01_data_dt0 = (await payment_ref01_ent.load(payment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(payment_ref01_data_dt0.id === payment_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment/PaymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment01', 'payment02', 'payment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_PAYMENT_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
    });
    idmap = env['KASHIMI_TEST_PAYMENT_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_PAYMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.KashimiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PaymentEntity.test.js.map