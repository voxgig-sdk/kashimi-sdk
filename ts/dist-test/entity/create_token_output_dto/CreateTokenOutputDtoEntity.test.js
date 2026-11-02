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
(0, node_test_1.describe)('CreateTokenOutputDtoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when KASHIMI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('KASHIMI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.KashimiSDK.test();
        const ent = testsdk.CreateTokenOutputDto();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.KashimiSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CreateTokenOutputDto().create({ "access_token": 1, "expires_in": 1, "grant_type": "x", "scope": "x", "token_type": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.KASHIMI_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'create_token_output_dto.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_token": { "a": true, "h": "Access Token", "n": "access_token", "r": true, "sh": "The JWT access token.", "t": "`$STRING`", "key$": "access_token", "index$": 0 }, "expires_in": { "a": true, "h": "Expires In", "n": "expires_in", "r": true, "sh": "Expiration time of the token in seconds.", "t": "`$NUMBER`", "key$": "expires_in", "index$": 1 }, "grant_type": { "a": true, "h": "Grant Type", "n": "grant_type", "r": true, "sh": "The type of grant being requested.", "t": "`$STRING`", "key$": "grant_type", "index$": 2 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "sh": "Scopes being requested.", "t": "`$STRING`", "key$": "scope", "index$": 3 }, "token_type": { "a": true, "h": "Token Type", "n": "token_type", "r": true, "sh": "Token type.", "t": "`$STRING`", "key$": "token_type", "index$": 4 } }, "name": "create_token_output_dto", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/v1/auth/token", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=", "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/api/v1/auth/token", "q": { "exist": ["authorization"] }, "r": {}, "rb": { "fields": [{ "name": "grant_type" }, { "name": "scope" }], "kind": "form", "media": "application/x-www-form-urlencoded" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "auth" }, { "lit": "token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "create_token_output_dto", "name__orig": "create_token_output_dto", "Name": "CreateTokenOutputDto", "name_": "create_token_output_dto", "name-": "create-token-output-dto", "NAME": "CREATE_TOKEN_OUTPUT_DTO", "index$": 3 }, { "active": true, "entity": "create_token_output_dto", "key$": "BasicCreateTokenOutputDtoFlow", "kind": "basic", "name": "BasicCreateTokenOutputDtoFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "create_token_output_dto_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'CreateTokenOutputDto', { "POST /api/v1/auth/token": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "grant_type": { "type": "string", "description": "The type of grant being requested.", "example": "client_credentials", "enum": ["client_credentials"], "key$": "grant_type" }, "scope": { "type": "string", "description": "Scopes being requested. Must be a space-separated list of scopes.", "example": "payments:read payments:write providers:read", "key$": "scope" } }, "required": ["grant_type", "scope"], "x-ref": "#/components/schemas/CreateTokenInputDto", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "Basic authorization header with client credentials in the format 'Basic <base64-encoded string of format clientId:clientSecret>'", "required": true, "schema": { "type": "string", "example": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "create_token_output_dto.create.0": "GET-only live run: needs POST /api/v1/auth/token" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const create_token_output_dto_ref01_ent = client.CreateTokenOutputDto();
        let create_token_output_dto_ref01_data = setup.data.new.create_token_output_dto['create_token_output_dto_ref01'];
        create_token_output_dto_ref01_data = (await create_token_output_dto_ref01_ent.create(create_token_output_dto_ref01_data)).data();
        (0, node_assert_1.default)(null != create_token_output_dto_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/create_token_output_dto/CreateTokenOutputDtoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.KashimiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['create_token_output_dto01', 'create_token_output_dto02', 'create_token_output_dto03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID': idmap,
        'KASHIMI_TEST_LIVE': 'FALSE',
        'KASHIMI_TEST_EXPLAIN': 'FALSE',
        'KASHIMI_APIKEY': '',
        'KASHIMI_SERVER_BASE': "",
    });
    idmap = env['KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID'];
    const live = 'TRUE' === env.KASHIMI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['KASHIMI_TEST_CREATE_TOKEN_OUTPUT_DTO_ENTID'];
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
//# sourceMappingURL=CreateTokenOutputDtoEntity.test.js.map