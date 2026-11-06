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
const subsidiaryEntityLiveStrict = true


func TestSubsidiaryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Subsidiary(nil)
		if ent == nil {
			t.Fatal("expected non-nil SubsidiaryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Subsidiary(nil).List(map[string]any{"provider_id": 1}, nil)
		if sdkerr, ok := err.(*core.KashimiError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := subsidiaryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "subsidiary." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"provider01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, subsidiaryEntityLiveStrict, "Live entity test blocked: needs %s via KASHIMI_TEST_SUBSIDIARY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		subsidiaryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.subsidiary")))
		var subsidiaryRef01Data map[string]any
		if len(subsidiaryRef01DataRaw) > 0 {
			subsidiaryRef01Data = core.ToMapAny(subsidiaryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = subsidiaryRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		subsidiaryRef01Ent := client.Subsidiary(nil)
		subsidiaryRef01Match := map[string]any{
			"provider_id": setup.idmap["provider01"],
		}

		subsidiaryRef01ListResult, err := subsidiaryRef01Ent.List(subsidiaryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, subsidiaryRef01ListOk := subsidiaryRef01ListResult.([]any)
		if !subsidiaryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", subsidiaryRef01ListResult)
		}

	})
}

func subsidiaryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "subsidiary", "SubsidiaryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read subsidiary test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse subsidiary test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"subsidiary01", "subsidiary02", "subsidiary03", "provider01", "provider02", "provider03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("KASHIMI_TEST_SUBSIDIARY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"KASHIMI_TEST_SUBSIDIARY_ENTID": idmap,
		"KASHIMI_TEST_LIVE":      "FALSE",
		"KASHIMI_TEST_EXPLAIN":   "FALSE",
		"KASHIMI_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["KASHIMI_TEST_SUBSIDIARY_ENTID"])
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
