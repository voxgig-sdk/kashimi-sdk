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
(0, node_test_1.describe)('ClientJwkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.ClientJwk();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KashimiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ClientJwk().load({ "client_id": 1, "provider_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'client_jwk.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "client_jwk", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/ob/client-jwks", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e", "k": "query", "n": "client_id", "or": "clientId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f", "k": "query", "n": "provider_id", "or": "providerId", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "revoked", "or": "revoked", "r": false, "t": "`$BOOLEAN`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/api/v1/ob/client-jwks", "q": { "exist": ["client_id", "provider_id"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "ob" }, { "lit": "client-jwks" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "client_jwk", "name__orig": "client_jwk", "Name": "ClientJwk", "name_": "client_jwk", "name-": "client-jwk", "NAME": "CLIENT_JWK", "index$": 1 }, { "active": true, "entity": "client_jwk", "key$": "BasicClientJwkFlow", "kind": "basic", "name": "BasicClientJwkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "client_jwk_ref01", "srcdatavar": "client_jwk_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-client_jwk_ref01" } }], "index$": 0 }] }, 'ClientJwk', { "GET /api/v1/ob/client-jwks": { "protocol": "http", "parameters": [{ "name": "providerId", "required": true, "in": "query", "description": "Provider id in uuid format.", "schema": { "example": "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f", "type": "string" }, "index$": 0 }, { "name": "clientId", "required": true, "in": "query", "description": "Client id in uuid format.", "schema": { "example": "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e", "type": "string" }, "index$": 1 }, { "name": "revoked", "required": false, "in": "query", "schema": { "type": "boolean" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let client_jwk_ref01_data = Object.values(setup.data.existing.client_jwk)[0];
        // LOAD
        const client_jwk_ref01_ent = client.ClientJwk();
        const client_jwk_ref01_match_dt0 = {};
        const client_jwk_ref01_data_dt0 = (await client_jwk_ref01_ent.load(client_jwk_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != client_jwk_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/client_jwk/ClientJwkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['client_jwk01', 'client_jwk02', 'client_jwk03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_CLIENT_JWK_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
    });
    idmap = env['KASHIMI_TEST_CLIENT_JWK_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_CLIENT_JWK_ENTID'];
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
//# sourceMappingURL=ClientJwkEntity.test.js.map