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
(0, node_test_1.describe)('ProviderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.Provider();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('provider hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.KashimiSDK.test(offline).Provider().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.KashimiSDK.test(offline).Provider()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.KashimiSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Provider().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.KashimiSDK.test().Provider().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.KashimiSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Provider().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Provider().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'provider.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bic": { "a": true, "h": "Bic", "n": "bic", "r": true, "sh": "BIC code of the provider", "t": "`$STRING`", "key$": "bic", "index$": 0 }, "countryCode": { "a": true, "h": "Country Code", "n": "countryCode", "r": true, "sh": "Country code of the provider.", "t": "`$STRING`", "key$": "countryCode", "index$": 1 }, "hasSubsidiaries": { "a": true, "h": "Has Subsidiaries", "n": "hasSubsidiaries", "r": true, "sh": "Whether the provider has subsidiaries.", "t": "`$BOOLEAN`", "key$": "hasSubsidiaries", "index$": 2 }, "iconUrl": { "a": true, "h": "Icon Url", "n": "iconUrl", "r": true, "sh": "URL of the provider's icon.", "t": "`$STRING`", "key$": "iconUrl", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Unique identifier for the provider.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "logoUrl": { "a": true, "h": "Logo Url", "n": "logoUrl", "r": true, "sh": "URL of the provider's logo.", "t": "`$STRING`", "key$": "logoUrl", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the provider.", "t": "`$STRING`", "key$": "name", "index$": 6 }, "paymentSchemes": { "a": true, "h": "Payment Schemes", "n": "paymentSchemes", "r": true, "sh": "Array of payment schemes that we support for this provider.", "t": "`$ARRAY`", "key$": "paymentSchemes", "index$": 7 }, "requiredPaymentFields": { "a": true, "h": "Required Payment Fields", "n": "requiredPaymentFields", "r": true, "sh": "Array of required payment fields for this provider.", "t": "`$ARRAY`", "key$": "requiredPaymentFields", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "provider", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/v1/capabilities/providers", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$OBJECT`", "index$": 0 }, { "a": true, "k": "query", "n": "filter", "or": "filters", "r": false, "t": "`$OBJECT`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/api/v1/capabilities/providers", "q": { "exist": ["authorization"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "capabilities" }, { "lit": "providers" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "provider", "name__orig": "provider", "Name": "Provider", "name_": "provider", "name-": "provider", "NAME": "PROVIDER", "index$": 10 }, { "active": true, "entity": "provider", "key$": "BasicProviderFlow", "kind": "basic", "name": "BasicProviderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "provider_ref01" } }], "index$": 0 }] }, 'Provider', { "GET /api/v1/capabilities/providers": { "protocol": "http", "parameters": [{ "name": "filters", "required": false, "in": "query", "description": "Filters narrowing down the returned providers, passed as nested query parameters, e.g. ?filters[countryCode]=NL", "schema": { "type": "object", "properties": { "countryCode": { "type": "string", "enum": ["AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI", "FR", "GF", "PF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GN", "GW", "GY", "HT", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "SS", "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TV", "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"], "example": "NL", "description": "Country code of the provider. Providers that operate in multiple countries are treated as separate entities in our system, each with their own ID. For instance, Swedbank Lithuania and Swedbank Estonia are considered two different providers." } }, "x-ref": "#/components/schemas/GetProvidersFilters" }, "index$": 0 }, { "name": "cursor", "required": false, "in": "query", "description": "Opaque cursor for pagination, passed as a nested query parameter, e.g. ?cursor[value]=... Use the `meta.cursor.next.value` from a previous response; omit to fetch the first page.", "schema": { "type": "object", "properties": {}, "x-ref": "#/components/schemas/GetProvidersCursorInputDto" }, "index$": 1 }, { "name": "Authorization", "in": "header", "description": "Bearer token for authentication", "required": true, "schema": { "type": "string" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let provider_ref01_data = Object.values(setup.data.existing.provider)[0];
        // LIST
        const provider_ref01_ent = client.Provider();
        const provider_ref01_match = {};
        const provider_ref01_list = (await provider_ref01_ent.list(provider_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/provider/ProviderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['provider01', 'provider02', 'provider03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_PROVIDER_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
    });
    idmap = env['KASHIMI_TEST_PROVIDER_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_PROVIDER_ENTID'];
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
//# sourceMappingURL=ProviderEntity.test.js.map