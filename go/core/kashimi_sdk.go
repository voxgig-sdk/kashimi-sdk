package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/kashimi-sdk/go/utility/struct"
)

type KashimiSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewKashimiSDK(options map[string]any) *KashimiSDK {
	sdk := &KashimiSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk KashimiSDK) String() string {
	return "Kashimi " + vs.Jsonify(map[string]any{"name": "Kashimi"},
		map[string]any{"indent": 0})
}

func (sdk KashimiSDK) GoString() string {
	return sdk.String()
}

func (sdk KashimiSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Kashimi"})
}

func (sdk *KashimiSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *KashimiSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *KashimiSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *KashimiSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *KashimiSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *KashimiSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *KashimiSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("KashimiSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *KashimiSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *KashimiSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *KashimiSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("KashimiSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Callback returns a Callback entity bound to this client.
// Idiomatic usage: client.Callback(nil).List(nil, nil) or
// client.Callback(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Callback(data map[string]any) KashimiEntityBase {
	return NewCallbackEntityFunc(sdk, data)
}


// ClientJwk returns a ClientJwk entity bound to this client.
// Idiomatic usage: client.ClientJwk(nil).List(nil, nil) or
// client.ClientJwk(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) ClientJwk(data map[string]any) KashimiEntityBase {
	return NewClientJwkEntityFunc(sdk, data)
}


// ConfirmationData returns a ConfirmationData entity bound to this client.
// Idiomatic usage: client.ConfirmationData(nil).List(nil, nil) or
// client.ConfirmationData(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) ConfirmationData(data map[string]any) KashimiEntityBase {
	return NewConfirmationDataEntityFunc(sdk, data)
}


// ConsentStatus returns a ConsentStatus entity bound to this client.
// Idiomatic usage: client.ConsentStatus(nil).List(nil, nil) or
// client.ConsentStatus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) ConsentStatus(data map[string]any) KashimiEntityBase {
	return NewConsentStatusEntityFunc(sdk, data)
}


// Country returns a Country entity bound to this client.
// Idiomatic usage: client.Country(nil).List(nil, nil) or
// client.Country(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Country(data map[string]any) KashimiEntityBase {
	return NewCountryEntityFunc(sdk, data)
}


// Followup returns a Followup entity bound to this client.
// Idiomatic usage: client.Followup(nil).List(nil, nil) or
// client.Followup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Followup(data map[string]any) KashimiEntityBase {
	return NewFollowupEntityFunc(sdk, data)
}


// Healthcheck returns a Healthcheck entity bound to this client.
// Idiomatic usage: client.Healthcheck(nil).List(nil, nil) or
// client.Healthcheck(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Healthcheck(data map[string]any) KashimiEntityBase {
	return NewHealthcheckEntityFunc(sdk, data)
}


// HostedUiCustomization returns a HostedUiCustomization entity bound to this client.
// Idiomatic usage: client.HostedUiCustomization(nil).List(nil, nil) or
// client.HostedUiCustomization(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) HostedUiCustomization(data map[string]any) KashimiEntityBase {
	return NewHostedUiCustomizationEntityFunc(sdk, data)
}


// Payment returns a Payment entity bound to this client.
// Idiomatic usage: client.Payment(nil).List(nil, nil) or
// client.Payment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Payment(data map[string]any) KashimiEntityBase {
	return NewPaymentEntityFunc(sdk, data)
}


// PaymentStatus returns a PaymentStatus entity bound to this client.
// Idiomatic usage: client.PaymentStatus(nil).List(nil, nil) or
// client.PaymentStatus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) PaymentStatus(data map[string]any) KashimiEntityBase {
	return NewPaymentStatusEntityFunc(sdk, data)
}


// Provider returns a Provider entity bound to this client.
// Idiomatic usage: client.Provider(nil).List(nil, nil) or
// client.Provider(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Provider(data map[string]any) KashimiEntityBase {
	return NewProviderEntityFunc(sdk, data)
}


// PsuProvidedData returns a PsuProvidedData entity bound to this client.
// Idiomatic usage: client.PsuProvidedData(nil).List(nil, nil) or
// client.PsuProvidedData(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) PsuProvidedData(data map[string]any) KashimiEntityBase {
	return NewPsuProvidedDataEntityFunc(sdk, data)
}


// Report returns a Report entity bound to this client.
// Idiomatic usage: client.Report(nil).List(nil, nil) or
// client.Report(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Report(data map[string]any) KashimiEntityBase {
	return NewReportEntityFunc(sdk, data)
}


// ScaData returns a ScaData entity bound to this client.
// Idiomatic usage: client.ScaData(nil).List(nil, nil) or
// client.ScaData(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) ScaData(data map[string]any) KashimiEntityBase {
	return NewScaDataEntityFunc(sdk, data)
}


// ScaMethod returns a ScaMethod entity bound to this client.
// Idiomatic usage: client.ScaMethod(nil).List(nil, nil) or
// client.ScaMethod(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) ScaMethod(data map[string]any) KashimiEntityBase {
	return NewScaMethodEntityFunc(sdk, data)
}


// SenderAccount returns a SenderAccount entity bound to this client.
// Idiomatic usage: client.SenderAccount(nil).List(nil, nil) or
// client.SenderAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) SenderAccount(data map[string]any) KashimiEntityBase {
	return NewSenderAccountEntityFunc(sdk, data)
}


// Subsidiary returns a Subsidiary entity bound to this client.
// Idiomatic usage: client.Subsidiary(nil).List(nil, nil) or
// client.Subsidiary(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Subsidiary(data map[string]any) KashimiEntityBase {
	return NewSubsidiaryEntityFunc(sdk, data)
}


// Token returns a Token entity bound to this client.
// Idiomatic usage: client.Token(nil).List(nil, nil) or
// client.Token(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *KashimiSDK) Token(data map[string]any) KashimiEntityBase {
	return NewTokenEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *KashimiSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewKashimiSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
