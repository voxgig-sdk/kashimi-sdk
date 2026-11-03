"use strict";
// conform's OVERLAY for the bundled `ts` target.
//
// Sends and reads what the definition declares, where the stock pipeline
// does not yet (voxgig/sdkgen#465). The bundled ts target's template tree
// knows nothing about this feature; this package ships the source at the
// layout `ts` uses (`src/feature/<name>/`), and `package add` copies it in.
//
// PreRequest runs after makeSpec, so the spec already holds the headers,
// with the client's credential, and the body as the stock pipeline built
// them. It rewrites two things:
//
//   form        a point whose body kind is `form` gets its body form-encoded,
//               with the declared media type as its content type. makeFetchDef
//               sends a string body on a non-JSON point as given.
//   credential  a header argument the point declares, under the credential
//               header's name, and the call passes, replaces the credential
//               prepareAuth set (or restores the one it removed).
//
// Counts land on the client as `_conform: { form, credential }`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConformFeature = void 0;
const BaseFeature_1 = require("../base/BaseFeature");
const CRED_name = 'authorization';
class ConformFeature extends BaseFeature_1.BaseFeature {
    version = '0.1.0';
    name = 'conform';
    active = true;
    _client;
    _options = {};
    init(ctx, options) {
        this._client = ctx.client;
        this._options = options || {};
        this.active = true === options.active;
    }
    PreRequest(ctx) {
        if (!this.active) {
            return;
        }
        const spec = ctx.spec;
        const point = ctx.point;
        if (null == spec || null == point) {
            return;
        }
        if (null == spec.headers) {
            spec.headers = {};
        }
        if (this._credential(ctx, spec, point)) {
            this._record('credential');
        }
        if (this._form(spec, point)) {
            this._record('form');
        }
    }
    // The credential header is the client's `auth.name`, else Authorization.
    _credential(ctx, spec, point) {
        const authname = ctx.options?.auth?.name;
        const credname = 'string' === typeof authname && '' !== authname ?
            authname.toLowerCase() : CRED_name;
        let sent = false;
        for (const arg of (point.args?.header || [])) {
            if ('string' !== typeof arg?.name || '' === arg.name) {
                continue;
            }
            const wire = String(arg.orig || arg.name).toLowerCase();
            if (credname !== wire) {
                continue;
            }
            const val = ctx.reqmatch?.[arg.name] ?? ctx.reqdata?.[arg.name];
            if (null == val || '' === val) {
                continue;
            }
            dropHeader(spec.headers, wire);
            spec.headers[wire] = String(val);
            sent = true;
        }
        return sent;
    }
    _form(spec, point) {
        const body = point.body;
        if ('form' !== body?.kind) {
            return false;
        }
        const data = spec.body;
        if (null == data || 'object' !== typeof data || Array.isArray(data)) {
            return false;
        }
        const form = new URLSearchParams();
        for (const key of Object.keys(data)) {
            const val = data[key];
            if (null == val) {
                continue;
            }
            for (const item of (Array.isArray(val) ? val : [val])) {
                form.append(key, 'object' === typeof item ? JSON.stringify(item) : String(item));
            }
        }
        spec.body = form.toString();
        dropHeader(spec.headers, 'content-type');
        spec.headers['content-type'] =
            'string' === typeof body.media && '' !== body.media ?
                body.media : 'application/x-www-form-urlencoded';
        return true;
    }
    _record(kind) {
        const client = this._client;
        if (null == client) {
            return;
        }
        if (null == client._conform) {
            client._conform = { form: 0, credential: 0 };
        }
        client._conform[kind]++;
    }
}
exports.ConformFeature = ConformFeature;
// Remove a header whatever its case.
function dropHeader(headers, name) {
    for (const key of Object.keys(headers)) {
        if (name === key.toLowerCase()) {
            delete headers[key];
        }
    }
}
//# sourceMappingURL=ConformFeature.js.map