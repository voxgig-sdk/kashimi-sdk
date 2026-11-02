const { ApiDef } = require('@voxgig/apidef')

const opts = {
  folder: __dirname + '/../model',

  // Kashimi's definition declares no `servers`, so apidef would otherwise
  // leave the base URL as a `{base}` variable for every caller to fill.
  // apidef uses this option ONLY when the definition names no server, so the
  // vendor file in .sdk/def stays byte for byte as published. The value is the
  // Production base URL from https://docs.kashimi.tech/api-reference/environments
  // (Sandbox is https://api-sandbox.kashimi.tech, chosen with the `base` option).
  server: 'https://api.kashimi.tech',
}

module.exports = ApiDef.makeBuild(opts)
