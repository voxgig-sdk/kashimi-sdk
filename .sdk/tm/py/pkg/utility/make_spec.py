# Kashimi SDK utility: make_spec

from __future__ import annotations

import json
from urllib.parse import urlencode

from projectname_sdk.utility.voxgig_struct import voxgig_struct as vs
from projectname_sdk.core.spec import KashimiSpec
from projectname_sdk.utility.graphql import GRAPHQL_CONTENT_TYPE
from projectname_sdk.utility.prepare_method import allowed


def make_spec_util(ctx):
    pre = ctx.out.get("spec")
    if pre is not None:
        # A feature hook may short-circuit with an error (see make_point).
        if isinstance(pre, Exception):
            return None, pre
        ctx.spec = pre
        return ctx.spec, None

    point = ctx.point
    options = ctx.options
    utility = ctx.utility

    base = ""
    b = vs.getprop(options, "base")
    if isinstance(b, str):
        base = b

    prefix = ""
    p = vs.getprop(options, "prefix")
    if isinstance(p, str):
        prefix = p

    suffix = ""
    s = vs.getprop(options, "suffix")
    if isinstance(s, str):
        suffix = s

    parts = []
    if point is not None:
        pt = vs.getprop(point, "parts")
        if isinstance(pt, list):
            parts = pt

    ctx.spec = KashimiSpec({
        "base": base,
        "prefix": prefix,
        "parts": parts,
        "suffix": suffix,
        "step": "start",
    })

    ctx.spec.method = utility.prepare_method(ctx)

    allow_method = vs.getpath(options, "allow.method")
    if not allowed(allow_method, ctx.spec.method):
        return None, ctx.make_error("spec_method_allow",
            'Method "' + str(ctx.spec.method) +
            '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

    ctx.spec.params = utility.prepare_params(ctx)
    ctx.spec.query = utility.prepare_query(ctx)
    ctx.spec.headers = utility.prepare_headers(ctx)

    if "graphql" == vs.getprop(point, "kind"):
        # GraphQL addresses one endpoint: no path parts, no query string,
        # and the body carries the operation. prepare_body is skipped
        # deliberately — it only emits a body for data-input ops, whereas
        # every GraphQL op posts one, including load/list/remove.
        ctx.spec.body = utility.graphql_body(ctx)
        ctx.spec.path = ""
        # prepare_query already copied the op's match arguments into the
        # query string. Those same values are bound as operation
        # variables, so leaving them would send /graphql?id=i1.
        ctx.spec.query = {}
        ctx.spec.headers["content-type"] = GRAPHQL_CONTENT_TYPE
    else:
        ctx.spec.body = utility.prepare_body(ctx)
        ctx.spec.path = utility.prepare_path(ctx)

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["spec"] = ctx.spec

    # Whatever prepare_auth sets in the query, under whichever name, is the
    # credential; a key it leaves as it was is the caller's.
    query = dict(ctx.spec.query or {})

    spec, err = utility.prepare_auth(ctx)
    if err is not None:
        return None, err

    spec.authquery = [k for k, v in (spec.query or {}).items()
                      if k not in query or query[k] != v]

    ctx.spec = spec
    _call_credential(ctx, options, spec)
    _form_body(point, spec)
    return spec, None


# A credential the call passes under the credential header's name goes as
# that header, in place of the client's, and not in the body. Kashimi's
# token call takes its Basic credential this way (voxgig/sdkgen#465).
def _call_credential(ctx, options, spec):
    authname = vs.getpath(options, "auth.name")
    name = authname.lower() if isinstance(authname, str) and authname != "" else "authorization"

    val = (ctx.reqmatch or {}).get(name)
    if val is None:
        val = (ctx.reqdata or {}).get(name)
    if val is None or val == "":
        return

    if spec.headers is None:
        spec.headers = {}
    _drop_header(spec.headers, name)
    spec.headers[name] = str(val)

    # A copy, since the body can be the caller's own data.
    if isinstance(spec.body, dict):
        spec.body = {k: v for k, v in spec.body.items() if k != name}


# A body the point declares form-encoded goes form-encoded, under its
# declared media type, where it would otherwise go as JSON.
def _form_body(point, spec):
    decl = vs.getprop(point, "body")
    if not isinstance(decl, dict) or decl.get("kind") != "form" or not isinstance(spec.body, dict):
        return

    pairs = []
    for key, val in spec.body.items():
        if val is None:
            continue
        for item in (val if isinstance(val, list) else [val]):
            pairs.append((key, _form_value(item)))

    spec.body = urlencode(pairs)

    if spec.headers is None:
        spec.headers = {}
    _drop_header(spec.headers, "content-type")
    media = decl.get("media")
    spec.headers["content-type"] = (
        media if isinstance(media, str) and media != ""
        else "application/x-www-form-urlencoded")


# Remove a header whatever its case.
def _drop_header(headers, name):
    for key in [k for k in headers if isinstance(k, str) and k.lower() == name]:
        del headers[key]


# A value as the ts URLSearchParams writes it: booleans lower case, records
# as JSON.
def _form_value(item):
    if isinstance(item, bool):
        return "true" if item else "false"
    if isinstance(item, (dict, list)):
        return json.dumps(item, separators=(",", ":"))
    return str(item)
