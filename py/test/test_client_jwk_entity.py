# ClientJwk entity test

import json
import os
import time

import pytest

from kashimi_sdk.utility.voxgig_struct import voxgig_struct as vs
from kashimi_sdk import KashimiSDK
from kashimi_sdk.core import helpers
from kashimi_sdk.config import shared_config
from kashimi_sdk.feature.base_feature import KashimiBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestClientJwkEntity:

    def test_should_create_instance(self):
        testsdk = KashimiSDK.test(None, None)
        ent = testsdk.ClientJwk(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = KashimiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.ClientJwk(None).load({"client_id": 1, "provider_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _client_jwk_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "client_jwk." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        client_jwk_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.client_jwk")))
        client_jwk_ref01_data = None
        if len(client_jwk_ref01_data_raw) > 0:
            client_jwk_ref01_data = helpers.to_map(client_jwk_ref01_data_raw[0][1])

        # LOAD
        client_jwk_ref01_ent = client.ClientJwk(None)
        client_jwk_ref01_match_dt0 = {}
        if setup["live"]:
            client_jwk_ref01_match_dt0["client_id"] = "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e"
            client_jwk_ref01_match_dt0["provider_id"] = "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f"
        client_jwk_ref01_data_dt0_loaded = client_jwk_ref01_ent.load(client_jwk_ref01_match_dt0, None)
        assert client_jwk_ref01_data_dt0_loaded is not None



def _client_jwk_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/client_jwk/ClientJwkTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = KashimiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["client_jwk01", "client_jwk02", "client_jwk03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "KASHIMI_TEST_CLIENT_JWK_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "KASHIMI_TEST_CLIENT_JWK_ENTID": idmap,
        "KASHIMI_TEST_LIVE": "FALSE",
        "KASHIMI_TEST_EXPLAIN": "FALSE",
        "KASHIMI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("KASHIMI_TEST_CLIENT_JWK_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("KASHIMI_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("KASHIMI_APIKEY"),
            },
            extra or {},
        ])
        client = KashimiSDK(helpers.to_map(merged_opts))

    _live = env.get("KASHIMI_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("KASHIMI_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
