# PaymentStatus entity test

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


class _FailHook(KashimiBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("payment_status hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestPaymentStatusEntity:

    def test_should_create_instance(self):
        testsdk = KashimiSDK.test(None, None)
        ent = testsdk.PaymentStatus(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "payment_status": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = KashimiSDK.test(seed, None)
        seen = list(base.PaymentStatus(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from kashimi_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = KashimiSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.PaymentStatus(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(KashimiSDK.test(offline, None).PaymentStatus(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(KashimiSDK.test(offline, None).PaymentStatus(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = KashimiSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.PaymentStatus(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(KashimiSDK.test(None, None).PaymentStatus(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = KashimiSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.PaymentStatus(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.PaymentStatus(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = KashimiSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.PaymentStatus(None).list({"payment_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _payment_status_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "payment_status." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("payment_status01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "payment_status",
                                 lambda: client.PaymentStatus(None).list({"payment_id": "123e4567-e89b-12d3-a456-426614174000"}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        payment_status_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.payment_status")))
        payment_status_ref01_data = None
        if len(payment_status_ref01_data_raw) > 0:
            payment_status_ref01_data = helpers.to_map(payment_status_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        payment_status_ref01_ent = client.PaymentStatus(None)
        payment_status_ref01_match = {}
        if setup["live"]:
            payment_status_ref01_match["payment_id"] = "123e4567-e89b-12d3-a456-426614174000"

        payment_status_ref01_list_result = payment_status_ref01_ent.list(payment_status_ref01_match, None)
        assert isinstance(payment_status_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        payment_status_ref01_match_dt0 = {
            "id": payment_status_ref01_data["id"],
        }
        if setup["live"]:
            payment_status_ref01_match_dt0["payment_id"] = "123e4567-e89b-12d3-a456-426614174000"
        payment_status_ref01_data_dt0_loaded = payment_status_ref01_ent.load(payment_status_ref01_match_dt0, None)
        payment_status_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(payment_status_ref01_data_dt0_loaded))
        assert payment_status_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(payment_status_ref01_data_dt0_load_result.get("id"), payment_status_ref01_data["id"])



def _payment_status_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/payment_status/PaymentStatusTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = KashimiSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["payment_status01", "payment_status02", "payment_status03"],
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
        "KASHIMI_TEST_PAYMENT_STATUS_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "KASHIMI_TEST_PAYMENT_STATUS_ENTID": idmap,
        "KASHIMI_TEST_LIVE": "FALSE",
        "KASHIMI_TEST_EXPLAIN": "FALSE",
        "KASHIMI_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("KASHIMI_TEST_PAYMENT_STATUS_ENTID"))
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
