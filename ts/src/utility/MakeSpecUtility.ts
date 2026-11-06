
import { Context, Spec } from '../types'

import { allowed } from './PrepareMethodUtility'


function makeSpec(ctx: Context): Spec | Error {
  // A PreSpec hook's rejection, which the pipeline raises; ctx.spec stays a spec.
  if (ctx.out.spec instanceof Error) {
    return ctx.out.spec
  }

  if (ctx.out.spec) {
    return ctx.spec = ctx.out.spec
  }

  const point = ctx.point
  const options = ctx.options
  const utility = ctx.utility

  const prepareMethod = utility.prepareMethod
  const prepareParams = utility.prepareParams
  const prepareQuery = utility.prepareQuery
  const prepareHeaders = utility.prepareHeaders
  const prepareBody = utility.prepareBody
  const preparePath = utility.preparePath
  const prepareAuth = utility.prepareAuth

  ctx.spec = new Spec({
    base: options.base, // string, URL endpoint base prefix,
    prefix: options.prefix,
    parts: point.parts,
    suffix: options.suffix,
    step: 'start',
  })

  ctx.spec.method = prepareMethod(ctx)

  if (!allowed(options.allow.method, ctx.spec.method)) {
    return ctx.error('spec_method_allow', 'Method "' + ctx.spec.method +
      '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
  }

  ctx.spec.params = prepareParams(ctx)
  ctx.spec.query = prepareQuery(ctx)
  ctx.spec.headers = prepareHeaders(ctx)

  if ('graphql' === (point as any).kind) {
    ctx.spec.body = utility.graphqlBody(ctx)
    ctx.spec.path = ''
    // The match arguments prepareQuery copied here travel as operation
    // variables; sent twice, they would also leak into the URL.
    ctx.spec.query = {}
    ctx.spec.headers['content-type'] = utility.GRAPHQL_CONTENT_TYPE
  }
  else {
    ctx.spec.body = prepareBody(ctx)
    ctx.spec.path = preparePath(ctx)
  }

  if (ctx.ctrl.explain) {
    ctx.ctrl.explain.spec = ctx.spec
  }

  // Whatever prepareAuth sets in the query, under whichever name, is the
  // credential; a key it leaves as it was is the caller's.
  const query: Record<string, any> = { ...ctx.spec.query }

  const spec = prepareAuth(ctx)

  if (!(spec instanceof Error)) {
    spec.authquery = Object.keys(spec.query || {})
      .filter((key) => spec.query[key] !== query[key])
    ctx.spec = spec
    callCredential(ctx, spec)
    formBody(point, spec)
  }

  return spec
}


// A credential the call passes under the credential header's name goes as
// that header, in place of the client's, and not in the body. Kashimi's
// token call takes its Basic credential this way (voxgig/sdkgen#465).
function callCredential(ctx: Context, spec: Spec) {
  const authname = ctx.options.auth?.name
  const name = 'string' === typeof authname && '' !== authname ?
    authname.toLowerCase() : 'authorization'

  const val = ctx.reqmatch?.[name] ?? ctx.reqdata?.[name]
  if (null == val || '' === val) {
    return
  }

  dropHeader(spec.headers, name)
  spec.headers[name] = String(val)

  // A copy, since the body can be the caller's own data.
  const body = spec.body
  if (null != body && 'object' === typeof body && !Array.isArray(body)) {
    const rest: Record<string, any> = {}
    for (const key of Object.keys(body)) {
      if (name !== key) {
        rest[key] = body[key]
      }
    }
    spec.body = rest
  }
}


// A body the point declares form-encoded goes form-encoded, under its
// declared media type, where it would otherwise go as JSON.
function formBody(point: any, spec: Spec) {
  const decl = point?.body
  const data = spec.body
  if ('form' !== decl?.kind || null == data || 'object' !== typeof data || Array.isArray(data)) {
    return
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
  spec.headers['content-type'] = 'string' === typeof decl.media && '' !== decl.media ?
    decl.media : 'application/x-www-form-urlencoded'
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
  makeSpec
}
