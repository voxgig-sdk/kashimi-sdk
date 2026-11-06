# @voxgig-sdk/sdkgen-kashimi-ext

This project's own **sdkgen package**: what the Kashimi SDK adds on top of
stock [`@voxgig/sdkgen`](https://github.com/voxgig/sdkgen). It lives outside
the files `target add` and `package update @voxgig/sdkgen` own, so a resync
or a regeneration never reverts it.

It provides one feature:

| Kind | Name | What it is |
| --- | --- | --- |
| feature | `conform` | Sends what Kashimi's definition declares, where stock sdkgen does not yet ([voxgig/sdkgen#465](https://github.com/voxgig/sdkgen/issues/465)): a body declared `application/x-www-form-urlencoded` goes form-encoded, and a credential the call passes under the header's name is sent as that header, whether or not the operation declares it (apidef drops a declared `Authorization` parameter, as OpenAPI 3 says to). Kashimi's token call, `POST /api/v1/auth/token`, needs both. |

`conform` is implemented for every target this SDK builds: ts, py, php, go,
rb and lua. go-cli and go-mcp use the go SDK, so they carry only the marker
folder the feature convention asks for. Like every sdkgen feature, it runs
only when the caller turns it on:

```ts
new KashimiSDK({ feature: { conform: { active: true } } })
```

## Layout

```
ext/
├── sdkgen-package.json             # the manifest sdkgen reads
└── .sdk/
    ├── model/feature/conform.aontu # the feature's definition
    └── tm/                         # its source, at each target's own layout
        ├── ts/src/feature/conform/ConformFeature.ts
        ├── py/pkg/feature/conform_feature.py
        ├── php/feature/ConformFeature.php
        ├── go/feature/conform_feature.go
        ├── rb/feature/conform_feature.rb
        ├── lua/feature/conform_feature.lua
        ├── go-cli/src/feature/conform/   # marker only
        └── go-mcp/src/feature/conform/   # marker only
```

## How it is wired into the project

From `.sdk/`:

```bash
npx voxgig-sdkgen package add ../ext
npm run generate
```

`package add` copies the definition into `.sdk/model/feature/` and the source
into `.sdk/tm/<target>/`, and records where they came from, so a later
`feature add conform` resolves back to this folder. Edit HERE, then re-add.
Never edit the copies under `.sdk/`.

Check the package itself with `npx voxgig-sdkgen package check ../ext`.

## When sdkgen catches up

Once voxgig/sdkgen#465 is fixed in a release this SDK generates with, the
stock pipeline does what `conform` does. Remove the feature then: drop its
line from `.sdk/model/feature/feature-index.aontu`, delete its copies and
this folder, and take the `feature` option out of the README's token call.
