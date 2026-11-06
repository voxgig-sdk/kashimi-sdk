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
const psu_provided_dataEntityLiveStrict = true


func TestPsuProvidedDataEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PsuProvidedData(nil)
		if ent == nil {
			t.Fatal("expected non-nil PsuProvidedDataEntity")
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := psu_provided_dataBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "psu_provided_data." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"psu_provided_data.update.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data\"}")
			t.Skip("Live coverage incomplete: psu_provided_data.update.0 excluded (GET-only live run: needs PATCH /api/v1/ob/payments/psu-provided-data)")
			return
		}

		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		psuProvidedDataRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.psu_provided_data")))
		var psuProvidedDataRef01Data map[string]any
		if len(psuProvidedDataRef01DataRaw) > 0 {
			psuProvidedDataRef01Data = core.ToMapAny(psuProvidedDataRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = psuProvidedDataRef01Data

		if setup.live {
			livePace()
		}
		// UPDATE
		psuProvidedDataRef01Ent := client.PsuProvidedData(nil)
		psuProvidedDataRef01DataUp0Up := map[string]any{
		}

		psuProvidedDataRef01ResdataUp0Result, err := psuProvidedDataRef01Ent.Update(psuProvidedDataRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		psuProvidedDataRef01ResdataUp0 := core.ToMapAny(entityData(psuProvidedDataRef01ResdataUp0Result))
		if psuProvidedDataRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}

	})
}

func psu_provided_dataBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "psu_provided_data", "PsuProvidedDataTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read psu_provided_data test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse psu_provided_data test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"psu_provided_data01", "psu_provided_data02", "psu_provided_data03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID": idmap,
		"KASHIMI_TEST_LIVE":      "FALSE",
		"KASHIMI_TEST_EXPLAIN":   "FALSE",
		"KASHIMI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["KASHIMI_TEST_PSU_PROVIDED_DATA_ENTID"])
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
