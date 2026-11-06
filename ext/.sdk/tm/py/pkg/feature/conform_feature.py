# ProjectName SDK conform feature
#
# conform's OVERLAY for the bundled `py` target. Mirrors
# ts/src/feature/conform/ConformFeature.ts: sends and reads what the
# definition declares, where the stock pipeline does not yet
# (voxgig/sdkgen#465).
#
# PreRequest runs after make_spec, so the spec already holds the headers,
# with the client's credential, and the body as the stock pipeline built
# them. It rewrites two things:
#
#   form        a point whose body kind is `form` gets its body form-encoded,
#               with the declared media type as its content type.
#               make_fetch_def sends a string body on a non-JSON point as given.
#   credential  a value the call passes under the credential header's name, or
#               under a header argument the point declares with that name, is
#               sent as that header, in place of the credential prepare_auth set
#               (or restoring the one it removed), and leaves the body.
#
# Counts land on the client as `_conform: {form, credential}`.

from __future__ import annotations

import json
from urllib.parse import urlencode

from projectname_sdk.feature.base_feature import ProjectNameBaseFeature


CRED_NAME = "authorization"


class ProjectNameConformFeature(ProjectNameBaseFeature):
    def __init__(self):
        super().__init__()
        self.version = "0.1.1"
        self.name = "conform"
        self.active = True
        self.client = None
        self.options = {}

    def init(self, ctx, options):
        self.client = ctx.client
        self.options = options if isinstance(options, dict) else {}
        self.active = self.options.get("active") is True

    def PreRequest(self, ctx):
        if not self.active:
            return

        spec = ctx.spec
        point = ctx.point
        if spec is None or point is None:
            return

        if spec.headers is None:
            spec.headers = {}

        if self._credential(ctx, spec, point):
            self._record("credential")

        if self._form(spec, point):
            self._record("form")

    # The credential header is the client's `auth.name`, else Authorization.
    # The call passes it under a header argument the point declares with that
    # name, or under the name itself: apidef drops an Authorization parameter,
    # as OpenAPI 3 says to (voxgig/apidef#186), so the token call declares
    # none. Either way it goes as the header, and not in the body.
    def _credential(self, ctx, spec, point):
        options = ctx.client.options_map() if ctx.client is not None else {}
        authname = ((options or {}).get("auth") or {}).get("name")
        credname = authname.lower() if isinstance(authname, str) and authname != "" else CRED_NAME

        names = [credname]
        args = (point.get("args") or {}).get("header") or []
        for arg in args:
            name = arg.get("name") if isinstance(arg, dict) else None
            if isinstance(name, str) and name != "" and \
                    str(arg.get("orig") or name).lower() == credname:
                names.insert(0, name)

        for name in names:
            val = (ctx.reqmatch or {}).get(name)
            if val is None:
                val = (ctx.reqdata or {}).get(name)
            if val is None or val == "":
                continue

            _drop_header(spec.headers, credname)
            spec.headers[credname] = str(val)

            # A copy, since the body can be the caller's own data.
            if isinstance(spec.body, dict):
                spec.body = {k: v for k, v in spec.body.items() if k != name}

            return True

        return False

    def _form(self, spec, point):
        body = point.get("body") or {}
        if body.get("kind") != "form":
            return False

        data = spec.body
        if not isinstance(data, dict):
            return False

        pairs = []
        for key, val in data.items():
            if val is None:
                continue
            for item in (val if isinstance(val, list) else [val]):
                pairs.append((key, _formvalue(item)))

        spec.body = urlencode(pairs)

        _drop_header(spec.headers, "content-type")
        media = body.get("media")
        spec.headers["content-type"] = (
            media if isinstance(media, str) and media != ""
            else "application/x-www-form-urlencoded")

        return True

    def _record(self, kind):
        client = self.client
        if client is None:
            return
        track = getattr(client, "_conform", None)
        if track is None:
            track = {"form": 0, "credential": 0}
            client._conform = track
        track[kind] += 1


# Remove a header whatever its case.
def _drop_header(headers, name):
    for key in [k for k in headers if isinstance(k, str) and k.lower() == name]:
        del headers[key]


# A value as the ts URLSearchParams writes it: booleans lower case, records
# as JSON.
def _formvalue(item):
    if isinstance(item, bool):
        return "true" if item else "false"
    if isinstance(item, (dict, list)):
        return json.dumps(item, separators=(",", ":"))
    return str(item)
