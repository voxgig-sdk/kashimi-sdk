# API Definition

`kashimi-openapi.json` is Kashimi's published OpenAPI definition, vendored byte for byte.

| | |
|---|---|
| Source | https://docs.kashimi.tech/api-reference/openapi.json (listed under "OpenAPI Specs" in https://docs.kashimi.tech/llms.txt) |
| Fetched | 2026-11-02 |
| Size | 183317 bytes |
| sha256 | `0c27c22de1742245d383f0ceef60d29705f172a17fce2e7391701e4d0f1c71ea` |
| Version | `info.version` 1.0, OpenAPI 3.0.0 — 27 paths, 29 operations, 69 schemas |

The definition declares no `servers`. The base URL, `https://api.kashimi.tech`, comes from
Kashimi's Environments page and is passed to apidef as the `server` build option in
`.sdk/build/apidef.js`, so this file stays as published.
