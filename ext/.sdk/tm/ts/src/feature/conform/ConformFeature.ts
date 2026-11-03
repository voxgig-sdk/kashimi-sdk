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

import type { Context, FeatureOptions } from '../../types'
import type { ProjectNameSDK } from '../../ProjectNameSDK'

import { BaseFeature } from '../base/BaseFeature'


const CRED_name = 'authorization'


class ConformFeature extends BaseFeature {
  version = '0.1.0'
  name = 'conform'
  active = true

  _client?: ProjectNameSDK
  _options: any = {}


  init(ctx: Context, options: FeatureOptions): void | Promise<any> {
    this._client = ctx.client
    this._options = options || {}
    this.active = true === (options as any).active
  }


  PreRequest(this: any, ctx: any) {
    if (!this.active) {
      return
    }

    const spec = ctx.spec
    const point = ctx.point
    if (null == spec || null == point) {
      return
    }

    if (null == spec.headers) {
      spec.headers = {}
    }

    if (this._credential(ctx, spec, point)) {
      this._record('credential')
    }

    if (this._form(spec, point)) {
      this._record('form')
    }
  }


  // The credential header is the client's `auth.name`, else Authorization.
  _credential(this: any, ctx: any, spec: any, point: any): boolean {
    const authname = ctx.options?.auth?.name
    const credname = 'string' === typeof authname && '' !== authname ?
      authname.toLowerCase() : CRED_name

    let sent = false
    for (const arg of (point.args?.header || [])) {
      if ('string' !== typeof arg?.name || '' === arg.name) {
        continue
      }

      const wire = String(arg.orig || arg.name).toLowerCase()
      if (credname !== wire) {
        continue
      }

      const val = ctx.reqmatch?.[arg.name] ?? ctx.reqdata?.[arg.name]
      if (null == val || '' === val) {
        continue
      }

      dropHeader(spec.headers, wire)
      spec.headers[wire] = String(val)
      sent = true
    }

    return sent
  }


  _form(this: any, spec: any, point: any): boolean {
    const body = point.body
    if ('form' !== body?.kind) {
      return false
    }

    const data = spec.body
    if (null == data || 'object' !== typeof data || Array.isArray(data)) {
      return false
    }

    const form = new URLSearchParams()
    for (const key of Object.keys(data)) {
      const val = data[key]
      if (null == val) {
        continue
      }
      for (const item of (Array.isArray(val) ? val : [val])) {
        form.append(key, 'object' === typeof item ? JSON.stringify(item) : String(item))
      }
    }

    spec.body = form.toString()

    dropHeader(spec.headers, 'content-type')
    spec.headers['content-type'] =
      'string' === typeof body.media && '' !== body.media ?
        body.media : 'application/x-www-form-urlencoded'

    return true
  }


  _record(this: any, kind: string) {
    const client: any = this._client
    if (null == client) {
      return
    }
    if (null == client._conform) {
      client._conform = { form: 0, credential: 0 }
    }
    client._conform[kind]++
  }
}


// Remove a header whatever its case.
function dropHeader(headers: Record<string, any>, name: string) {
  for (const key of Object.keys(headers)) {
    if (name === key.toLowerCase()) {
      delete headers[key]
    }
  }
}


export {
  ConformFeature
}
