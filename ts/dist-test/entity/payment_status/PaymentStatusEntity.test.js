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
(0, node_test_1.describe)('PaymentStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.PaymentStatus();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('payment_status hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.KashimiSDK.test(offline).PaymentStatus().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.KashimiSDK.test(offline).PaymentStatus()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.KashimiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PaymentStatus().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.KashimiSDK.test().PaymentStatus().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.KashimiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PaymentStatus().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PaymentStatus().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KashimiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PaymentStatus().list({ "payment_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": true, "sh": "Timestamp of status creation", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "detailedStatus": { "a": true, "h": "Detailed Status", "n": "detailedStatus", "r": true, "sh": "Detailed payment status", "t": "`$STRING`", "key$": "detailedStatus", "index$": 1 }, "failureReasons": { "a": true, "h": "Failure Reasons", "n": "failureReasons", "r": true, "sh": "Failure reasons (for `status: FAILED` only)", "t": "`$ARRAY`", "key$": "failureReasons", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique payment status identifier", "t": "`$STRING`", "key$": "id", "index$": 3 }, "paymentId": { "a": true, "h": "Payment Id", "n": "paymentId", "r": true, "sh": "Unique payment identifier", "t": "`$STRING`", "key$": "paymentId", "index$": 4 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Payment status.", "t": "`$STRING`", "key$": "status", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "payment_status", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/archive/payment-statuses", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "123e4567-e89b-12d3-a456-426614174000", "k": "query", "n": "payment_id", "or": "paymentId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/archive/payment-statuses", "q": { "exist": ["authorization", "payment_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "archive" }, { "lit": "payment-statuses" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/archive/payment-statuses/latest", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "123e4567-e89b-12d3-a456-426614174000", "k": "query", "n": "payment_id", "or": "paymentId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/archive/payment-statuses/latest", "q": { "$action": "latest", "exist": ["authorization", "payment_id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "archive" }, { "lit": "payment-statuses" }, { "lit": "latest" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment_status", "name__orig": "payment_status", "Name": "PaymentStatus", "name_": "payment_status", "name-": "payment-status", "NAME": "PAYMENT_STATUS", "index$": 9 }, { "active": true, "entity": "payment_status", "key$": "BasicPaymentStatusFlow", "kind": "basic", "name": "BasicPaymentStatusFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "payment_status_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "payment_status_ref01", "srcdatavar": "payment_status_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_status_ref01" } }], "index$": 1 }] }, 'PaymentStatus', { "GET /api/v1/archive/payment-statuses": { "protocol": "http", "parameters": [{ "name": "paymentId", "required": true, "in": "query", "description": "Kashimi payment ID", "schema": { "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 1 }] }, "GET /api/v1/archive/payment-statuses/latest": { "protocol": "http", "parameters": [{ "name": "paymentId", "required": true, "in": "query", "description": "Kashimi payment ID", "schema": { "example": "123e4567-e89b-12d3-a456-426614174000", "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let payment_status_ref01_data = Object.values(setup.data.existing.payment_status)[0];
        // LIST
        const payment_status_ref01_ent = client.PaymentStatus();
        const payment_status_ref01_match = {};
        const payment_status_ref01_list = (await payment_status_ref01_ent.list(payment_status_ref01_match)).map((e) => e.data());
        // LOAD
        const payment_status_ref01_match_dt0 = {};
        payment_status_ref01_match_dt0.id = payment_status_ref01_data.id;
        const payment_status_ref01_data_dt0 = (await payment_status_ref01_ent.load(payment_status_ref01_match_dt0)).data();
        (0, node_assert_1.default)(payment_status_ref01_data_dt0.id === payment_status_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment_status/PaymentStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment_status01', 'payment_status02', 'payment_status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_PAYMENT_STATUS_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
    });
    idmap = env['KASHIMI_TEST_PAYMENT_STATUS_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_PAYMENT_STATUS_ENTID'];
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
//# sourceMappingURL=PaymentStatusEntity.test.js.map