package feature

// conform's OVERLAY for the bundled `go` target. Mirrors
// ts/src/feature/conform/ConformFeature.ts: sends and reads what the
// definition declares, where the stock pipeline does not yet
// (voxgig/sdkgen#465).
//
// PreRequest runs after MakeSpec, so the spec already holds the headers,
// with the client's credential, and the body as the stock pipeline built
// them. It rewrites two things:
//
//   form        a point whose body kind is `form` gets its body form-encoded,
//               with the declared media type as its content type.
//               makeFetchDef sends a string body on a non-JSON point as given.
//   credential  a value the call passes under the credential header's name, or
//               under a header argument the point declares with that name, is
//               sent as that header, in place of the credential prepareAuth set
//               (or restoring the one it removed), and leaves the body.
//
// Counts land on the feature as Form and Credential (the ts
// client._conform record).

import (
	"encoding/json"
	"fmt"
	"net/url"
	"sort"
	"strings"

	"GOMODULE/core"
)

const conformCredName = "authorization"

type ConformFeature struct {
	BaseFeature
	client  *core.ProjectNameSDK
	options map[string]any

	Form       int
	Credential int
}

func NewConformFeature() *ConformFeature {
	return &ConformFeature{
		BaseFeature: BaseFeature{
			Version: "0.1.1",
			Name:    "conform",
			Active:  true,
		},
	}
}

func (f *ConformFeature) Init(ctx *core.Context, options map[string]any) {
	f.client = ctx.Client
	f.options = options
	f.Active = foptBool(options, "active", false)
}

func (f *ConformFeature) PreRequest(ctx *core.Context) {
	if !f.Active {
		return
	}

	spec := ctx.Spec
	point := ctx.Point
	if spec == nil || point == nil {
		return
	}

	if spec.Headers == nil {
		spec.Headers = map[string]any{}
	}

	if f.credential(ctx, spec, point) {
		f.Credential++
	}

	if f.form(spec, point) {
		f.Form++
	}
}

// The credential header is the client's auth.name, else Authorization.
func (f *ConformFeature) credential(ctx *core.Context, spec *core.Spec, point map[string]any) bool {
	credname := conformCredName
	if ctx.Client != nil {
		if auth, ok := ctx.Client.OptionsMap()["auth"].(map[string]any); ok {
			if name, ok := auth["name"].(string); ok && name != "" {
				credname = strings.ToLower(name)
			}
		}
	}

	args, _ := point["args"].(map[string]any)
	header, _ := args["header"].([]any)

	names := []string{credname}
	for _, a := range header {
		arg, _ := a.(map[string]any)
		name, _ := arg["name"].(string)
		if name == "" {
			continue
		}

		wire, _ := arg["orig"].(string)
		if wire == "" {
			wire = name
		}
		if strings.ToLower(wire) == credname {
			names = append([]string{name}, names...)
		}
	}

	for _, name := range names {
		val := ctx.Reqmatch[name]
		if val == nil {
			val = ctx.Reqdata[name]
		}
		if val == nil || val == "" {
			continue
		}

		conformDropHeader(spec.Headers, credname)
		spec.Headers[credname] = fmt.Sprint(val)

		// A copy, since the body can be the caller's own data.
		if body, ok := spec.Body.(map[string]any); ok {
			rest := make(map[string]any, len(body))
			for key, v := range body {
				if key != name {
					rest[key] = v
				}
			}
			spec.Body = rest
		}

		return true
	}

	return false
}

func (f *ConformFeature) form(spec *core.Spec, point map[string]any) bool {
	body, _ := point["body"].(map[string]any)
	if kind, _ := body["kind"].(string); kind != "form" {
		return false
	}

	data, ok := spec.Body.(map[string]any)
	if !ok {
		return false
	}

	keys := make([]string, 0, len(data))
	for key := range data {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	values := url.Values{}
	for _, key := range keys {
		val := data[key]
		if val == nil {
			continue
		}
		list, isList := val.([]any)
		if !isList {
			list = []any{val}
		}
		for _, item := range list {
			values.Add(key, conformFormValue(item))
		}
	}

	spec.Body = values.Encode()

	conformDropHeader(spec.Headers, "content-type")
	media, _ := body["media"].(string)
	if media == "" {
		media = "application/x-www-form-urlencoded"
	}
	spec.Headers["content-type"] = media

	return true
}

// Remove a header whatever its case.
func conformDropHeader(headers map[string]any, name string) {
	for key := range headers {
		if strings.ToLower(key) == name {
			delete(headers, key)
		}
	}
}

// A value as the ts URLSearchParams writes it: records as JSON.
func conformFormValue(item any) string {
	switch item.(type) {
	case map[string]any, []any:
		if b, err := json.Marshal(item); err == nil {
			return string(b)
		}
	}
	return fmt.Sprint(item)
}
