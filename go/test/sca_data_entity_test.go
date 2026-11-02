package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/kashimi-sdk/go"
	"github.com/voxgig-sdk/kashimi-sdk/go/core"

	vs "github.com/voxgig-sdk/kashimi-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const sca_dataEntityLiveStrict = true


func TestScaDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ScaData(nil)
		if ent == nil {
			t.Fatal("expected non-nil ScaDataEntity")
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := sca_dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "sca_data." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"sca_data.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/decoupled/sca-data\"}")
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		scaDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.sca_data")))
		var scaDataRef01Data map[string]any
		if len(scaDataRef01DataRaw) > 0 {
			scaDataRef01Data = core.ToMapAny(scaDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = scaDataRef01Data

		// LOAD
		scaDataRef01Ent := client.ScaData(nil)
		scaDataRef01MatchDt0 := map[string]any{}
		scaDataRef01DataDt0Loaded, err := scaDataRef01Ent.Load(scaDataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if scaDataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

		return
		}

		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		scaDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.sca_data")))
		var scaDataRef01Data map[string]any
		if len(scaDataRef01DataRaw) > 0 {
			scaDataRef01Data = core.ToMapAny(scaDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = scaDataRef01Data

		// UPDATE
		scaDataRef01Ent := client.ScaData(nil)
		scaDataRef01DataUp0Up := map[string]any{
		}

		scaDataRef01ResdataUp0Result, err := scaDataRef01Ent.Update(scaDataRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		scaDataRef01ResdataUp0 := core.ToMapAny(entityData(scaDataRef01ResdataUp0Result))
		if scaDataRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

		// LOAD
		scaDataRef01MatchDt0 := map[string]any{}
		scaDataRef01DataDt0Loaded, err := scaDataRef01Ent.Load(scaDataRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if scaDataRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func sca_dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "sca_data", "ScaDataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read sca_data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse sca_data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"sca_data01", "sca_data02", "sca_data03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("KASHIMI_TEST_SCA_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KASHIMI_TEST_SCA_DATA_ENTID": idmap,
		"KASHIMI_TEST_LIVE":      "FALSE",
		"KASHIMI_TEST_EXPLAIN":   "FALSE",
		"KASHIMI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["KASHIMI_TEST_SCA_DATA_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["KASHIMI_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["KASHIMI_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewKashimiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["KASHIMI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["KASHIMI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
