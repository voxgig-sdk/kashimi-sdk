package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/kashimi-sdk/go"
)

// ListArgs is what an agent sends to kashimi_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: country | payment | payment_status | provider | subsidiary"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to kashimi_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: callback | client_jwk | confirmation_data | consent_status | healthcheck | hosted_ui_customization | payment | payment_status | report | sca_data | sca_method | sender_account"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.KashimiSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "kashimi_list",
		Description: "List records from Kashimi. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("country", "payment", "payment_status", "provider", "subsidiary"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "kashimi_load",
		Description: "Load one record from Kashimi. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("callback", "client_jwk", "confirmation_data", "consent_status", "healthcheck", "hosted_ui_customization", "payment", "payment_status", "report", "sca_data", "sca_method", "sender_account"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.KashimiSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.KashimiSDK, name string) (sdk.KashimiEntityBase, error) {
	switch strings.ToLower(name) {
	case "callback":
		return client.Callback(nil), nil
	case "client_jwk":
		return client.ClientJwk(nil), nil
	case "confirmation_data":
		return client.ConfirmationData(nil), nil
	case "consent_status":
		return client.ConsentStatus(nil), nil
	case "country":
		return client.Country(nil), nil
	case "followup":
		return client.Followup(nil), nil
	case "healthcheck":
		return client.Healthcheck(nil), nil
	case "hosted_ui_customization":
		return client.HostedUiCustomization(nil), nil
	case "payment":
		return client.Payment(nil), nil
	case "payment_status":
		return client.PaymentStatus(nil), nil
	case "provider":
		return client.Provider(nil), nil
	case "psu_provided_data":
		return client.PsuProvidedData(nil), nil
	case "report":
		return client.Report(nil), nil
	case "sca_data":
		return client.ScaData(nil), nil
	case "sca_method":
		return client.ScaMethod(nil), nil
	case "sender_account":
		return client.SenderAccount(nil), nil
	case "subsidiary":
		return client.Subsidiary(nil), nil
	case "token":
		return client.Token(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
