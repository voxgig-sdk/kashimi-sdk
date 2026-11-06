package utility

import (
	"encoding/json"
	"fmt"
	"net/url"
	"reflect"
	"sort"
	"strings"

	vs "github.com/voxgig/struct"

	"GOMODULE/core"
)

func makeSpecUtil(ctx *core.Context) (*core.Spec, error) {
	if ctx.Out["spec"] != nil {
		// A PreSpec hook (validate) rejects the operation by placing its error
		// here; the pipeline raises it, and ctx.Spec stays a request spec.
		if err, ok := ctx.Out["spec"].(error); ok {
			return nil, err
		}
		if sp, ok := ctx.Out["spec"].(*core.Spec); ok {
			ctx.Spec = sp
			return sp, nil
		}
	}

	point := ctx.Point
	options := ctx.Options
	utility := ctx.Utility

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	var parts []any
	if p := vs.GetProp(point, "parts"); p != nil {
		if pl, ok := p.([]any); ok {
			parts = pl
		}
	}

	ctx.Spec = core.NewSpec(map[string]any{
		"base":   base,
		"prefix": prefix,
		"parts":  parts,
		"suffix": suffix,
		"step":   "start",
	})

	ctx.Spec.Method = utility.PrepareMethod(ctx)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	allowMethod, _ := allowMethodVal.(string)
	if !core.Allowed(allowMethodVal, ctx.Spec.Method) {
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+ctx.Spec.Method+
				"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	ctx.Spec.Params = utility.PrepareParams(ctx)
	ctx.Spec.Query = utility.PrepareQuery(ctx)
	ctx.Spec.Headers = utility.PrepareHeaders(ctx)

	kind, _ := vs.GetProp(point, "kind").(string)

	if kind == "graphql" {
		ctx.Spec.Body = utility.GraphqlBody(ctx)
		ctx.Spec.Path = ""
		// PrepareQuery already copied the op's match arguments into the
		// query string. Those same values are bound as operation
		// variables, so leaving them would send /graphql?id=i1.
		ctx.Spec.Query = map[string]any{}
		ctx.Spec.Headers["content-type"] = GraphqlContentType
	} else {
		ctx.Spec.Body = utility.PrepareBody(ctx)

		if berr, isErr := ctx.Spec.Body.(error); isErr {
			return nil, berr
		}

		ctx.Spec.Path = utility.PreparePath(ctx)
	}

	if ctx.Ctrl.Explain != nil {
		ctx.Ctrl.Explain["spec"] = ctx.Spec
	}

	// Whatever PrepareAuth sets in the query, under whichever name, is the
	// credential; a key it leaves as it was is the caller's.
	query := map[string]any{}
	for k, v := range ctx.Spec.Query {
		query[k] = v
	}

	spec, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	spec.AuthQuery = []string{}
	for k, v := range spec.Query {
		if prev, had := query[k]; !had || !reflect.DeepEqual(prev, v) {
			spec.AuthQuery = append(spec.AuthQuery, k)
		}
	}

	ctx.Spec = spec
	callCredential(ctx, options, spec)
	formBody(point, spec)
	return spec, nil
}

// A credential the call passes under the credential header's name goes as
// that header, in place of the client's, and not in the body. Kashimi's
// token call takes its Basic credential this way (voxgig/sdkgen#465).
func callCredential(ctx *core.Context, options map[string]any, spec *core.Spec) {
	name := "authorization"
	if authname, ok := vs.GetPath(options, []any{"auth", "name"}).(string); ok && authname != "" {
		name = strings.ToLower(authname)
	}

	val := ctx.Reqmatch[name]
	if val == nil {
		val = ctx.Reqdata[name]
	}
	if val == nil || val == "" {
		return
	}

	if spec.Headers == nil {
		spec.Headers = map[string]any{}
	}
	dropHeader(spec.Headers, name)
	spec.Headers[name] = fmt.Sprint(val)

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
}

// A body the point declares form-encoded goes form-encoded, under its
// declared media type, where it would otherwise go as JSON.
func formBody(point map[string]any, spec *core.Spec) {
	decl, _ := vs.GetProp(point, "body").(map[string]any)
	data, isMap := spec.Body.(map[string]any)
	if kind, _ := decl["kind"].(string); kind != "form" || !isMap {
		return
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
			values.Add(key, formValue(item))
		}
	}

	spec.Body = values.Encode()

	if spec.Headers == nil {
		spec.Headers = map[string]any{}
	}
	dropHeader(spec.Headers, "content-type")
	media, _ := decl["media"].(string)
	if media == "" {
		media = "application/x-www-form-urlencoded"
	}
	spec.Headers["content-type"] = media
}

// Remove a header whatever its case.
func dropHeader(headers map[string]any, name string) {
	for key := range headers {
		if strings.ToLower(key) == name {
			delete(headers, key)
		}
	}
}

// A value as the ts URLSearchParams writes it: records as JSON.
func formValue(item any) string {
	switch item.(type) {
	case map[string]any, []any:
		if b, err := json.Marshal(item); err == nil {
			return string(b)
		}
	}
	return fmt.Sprint(item)
}
