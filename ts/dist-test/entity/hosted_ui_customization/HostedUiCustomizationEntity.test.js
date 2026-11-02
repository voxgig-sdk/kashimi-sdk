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
(0, node_test_1.describe)('HostedUiCustomizationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.HostedUiCustomization();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KashimiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.HostedUiCustomization().load({ "client_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'hosted_ui_customization.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "clientId": { "a": true, "h": "Client Id", "n": "clientId", "r": true, "t": "`$STRING`", "key$": "clientId", "index$": 0 }, "faviconUrl": { "a": true, "h": "Favicon Url", "n": "faviconUrl", "r": true, "t": "`$STRING`", "key$": "faviconUrl", "index$": 1 }, "footerText": { "a": true, "h": "Footer Text", "n": "footerText", "r": true, "t": "`$STRING`", "key$": "footerText", "index$": 2 }, "logoUrl": { "a": true, "h": "Logo Url", "n": "logoUrl", "r": true, "t": "`$STRING`", "key$": "logoUrl", "index$": 3 }, "primaryColor": { "a": true, "h": "Primary Color", "n": "primaryColor", "r": true, "t": "`$STRING`", "key$": "primaryColor", "index$": 4 }, "privacyPolicyUrl": { "a": true, "h": "Privacy Policy Url", "n": "privacyPolicyUrl", "r": true, "t": "`$STRING`", "key$": "privacyPolicyUrl", "index$": 5 }, "psuPortalBaseUrl": { "a": true, "h": "Psu Portal Base Url", "n": "psuPortalBaseUrl", "r": true, "t": "`$STRING`", "key$": "psuPortalBaseUrl", "index$": 6 }, "termsUrl": { "a": true, "h": "Terms Url", "n": "termsUrl", "r": true, "t": "`$STRING`", "key$": "termsUrl", "index$": 7 } }, "name": "hosted_ui_customization", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "client_id", "or": "clientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations", "q": { "exist": ["authorization", "client_id"] }, "r": { "param": { "clientId": "client_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "capabilities" }, { "lit": "clients" }, { "var": "client_id" }, { "lit": "hosted-ui-customizations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "hosted_ui_customization", "name__orig": "hosted_ui_customization", "Name": "HostedUiCustomization", "name_": "hosted_ui_customization", "name-": "hosted-ui-customization", "NAME": "HOSTED_UI_CUSTOMIZATION", "index$": 7 }, { "active": true, "entity": "hosted_ui_customization", "key$": "BasicHostedUiCustomizationFlow", "kind": "basic", "name": "BasicHostedUiCustomizationFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "hosted_ui_customization_ref01", "srcdatavar": "hosted_ui_customization_ref01_data", "suffix": "_dt0" }, "m": { "id": "hosted_ui_customization01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-hosted_ui_customization_ref01" } }], "unreachable": true }] }, 'HostedUiCustomization', { "GET /api/v1/capabilities/clients/{clientId}/hosted-ui-customizations": { "protocol": "http", "parameters": [{ "name": "clientId", "required": true, "in": "path", "schema": { "type": "string" }, "index$": 0 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let hosted_ui_customization_ref01_data = Object.values(setup.data.existing.hosted_ui_customization)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/hosted_ui_customization/HostedUiCustomizationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['hosted_ui_customization01', 'hosted_ui_customization02', 'hosted_ui_customization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
    });
    idmap = env['KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_HOSTED_UI_CUSTOMIZATION_ENTID'];
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
//# sourceMappingURL=HostedUiCustomizationEntity.test.js.map