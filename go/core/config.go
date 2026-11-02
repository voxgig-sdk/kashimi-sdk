package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Kashimi",
			"slug": "kashimi",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"secrets": map[string]any{
				"options": map[string]any{
					"active": false,
					"cache": true,
					"exchange": map[string]any{
						"active": false,
						"method": "POST",
						"path": "auth/token",
						"refresh": "",
						"request": "refresh_token",
						"response": "access_token",
						"retries": 1,
						"statuses": []any{
							401,
						},
					},
					"name": "apikey",
					"providers": []any{},
				},
				"optspec": map[string]any{},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.kashimi.tech",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"callback": map[string]any{},
				"client_jwk": map[string]any{},
				"confirmation_data": map[string]any{},
				"consent_status": map[string]any{},
				"country": map[string]any{},
				"followup": map[string]any{},
				"healthcheck": map[string]any{},
				"hosted_ui_customization": map[string]any{},
				"payment": map[string]any{},
				"payment_status": map[string]any{},
				"provider": map[string]any{},
				"psu_provided_data": map[string]any{},
				"report": map[string]any{},
				"sca_data": map[string]any{},
				"sca_method": map[string]any{},
				"sender_account": map[string]any{},
				"subsidiary": map[string]any{},
				"token": map[string]any{},
			},
		},
		"entity": map[string]any{
			"callback": map[string]any{
				"fields": []any{},
				"name": "callback",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/callbacks",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "callbacks",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"callbacks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "provider_id",
											"orig": "providerId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"provider_id",
										"state",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/callbacks/with-provider-nano-id",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "callbacks",
									},
									map[string]any{
										"lit": "with-provider-nano-id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"callbacks",
									"with-provider-nano-id",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "with-provider-nano-id",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"client_jwk": map[string]any{
				"fields": []any{},
				"name": "client_jwk",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/client-jwks",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "client-jwks",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"client-jwks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "client_id",
											"orig": "clientId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e",
										},
										map[string]any{
											"name": "provider_id",
											"orig": "providerId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f",
										},
										map[string]any{
											"name": "revoked",
											"orig": "revoked",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"client_id",
										"provider_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"confirmation_data": map[string]any{
				"fields": []any{},
				"name": "confirmation_data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/payments/decoupled/confirmation-data",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "confirmation-data",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"confirmation-data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"consent_status": map[string]any{
				"fields": []any{},
				"name": "consent_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/payments/decoupled/consent-status",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "consent-status",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"consent-status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country": map[string]any{
				"fields": []any{},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/capabilities/providers/countries",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "capabilities",
									},
									map[string]any{
										"lit": "providers",
									},
									map[string]any{
										"lit": "countries",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"capabilities",
									"providers",
									"countries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"followup": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$ANY`",
						"req": true,
						"short": "The provider information for the followup",
					},
					map[string]any{
						"name": "sender",
						"title": "Sender",
						"type": "`$ANY`",
						"short": "The sender information to be used with the payment",
					},
				},
				"name": "followup",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/ob/payments/{paymentId}/followups",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"var": "payment_id",
									},
									map[string]any{
										"lit": "followups",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"{payment_id}",
									"followups",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"paymentId": "payment_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"params": []any{
										map[string]any{
											"name": "payment_id",
											"orig": "paymentId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"payment_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.payment",
						},
					},
				},
			},
			"healthcheck": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "info",
						"title": "Info",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
				},
				"name": "healthcheck",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/status",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"api",
									"status",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hosted_ui_customization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "clientId",
						"title": "Client Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "faviconUrl",
						"title": "Favicon Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "footerText",
						"title": "Footer Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logoUrl",
						"title": "Logo Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "primaryColor",
						"title": "Primary Color",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "privacyPolicyUrl",
						"title": "Privacy Policy Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "psuPortalBaseUrl",
						"title": "Psu Portal Base Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "termsUrl",
						"title": "Terms Url",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "hosted_ui_customization",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "capabilities",
									},
									map[string]any{
										"lit": "clients",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "hosted-ui-customizations",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"capabilities",
									"clients",
									"{id}",
									"hosted-ui-customizations",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"clientId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "clientId",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"payment": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"title": "Amount",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Payment amount",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
						"short": "Currency code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique payment identifier",
					},
					map[string]any{
						"name": "metadata",
						"title": "Metadata",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "paymentScheme",
						"title": "Payment Scheme",
						"type": "`$ANY`",
						"req": true,
						"short": "Payment scheme used",
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$ANY`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Payment provider details.",
					},
					map[string]any{
						"name": "recipient",
						"title": "Recipient",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Data about the party receiving the payment.",
					},
					map[string]any{
						"name": "remittanceInformation",
						"title": "Remittance Information",
						"type": "`$ANY`",
						"req": true,
						"short": "Unstructured or structured remittance information.",
					},
					map[string]any{
						"name": "sender",
						"title": "Sender",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$ANY`",
							},
						},
						"short": "Data about the party sending the payment.",
					},
					map[string]any{
						"name": "updatedAt",
						"title": "Updated At",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "payment",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/ob/payments/cancel",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "cancel",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"cancel",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "provider_id",
											"orig": "providerId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "cancel",
									"exist": []any{
										"provider_id",
										"state",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/ob/payments",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "accept_language",
											"orig": "Accept-Language",
											"type": "`$STRING`",
											"kind": "header",
											"example": "en",
										},
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/archive/payments",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "archive",
									},
									map[string]any{
										"lit": "payments",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"archive",
									"payments",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor_value",
											"orig": "cursor[value]",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "filters_created_at_from",
											"orig": "filters[createdAt][from]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2026-07-01T00:00:00.000Z",
										},
										map[string]any{
											"name": "filters_created_at_to",
											"orig": "filters[createdAt][to]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2026-07-02T00:00:00.000Z",
										},
										map[string]any{
											"name": "filters_metadata_end_to_end_id",
											"orig": "filters[metadata][endToEndId]",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1234567890",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/archive/payments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "archive",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"archive",
									"payments",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"payment_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
						"short": "Timestamp of status creation",
						"format": "date-time",
					},
					map[string]any{
						"name": "detailedStatus",
						"title": "Detailed Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Detailed payment status",
					},
					map[string]any{
						"name": "failureReasons",
						"title": "Failure Reasons",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Failure reasons (for `status: FAILED` only)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique payment status identifier",
					},
					map[string]any{
						"name": "paymentId",
						"title": "Payment Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique payment identifier",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Payment status.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "payment_status",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/archive/payment-statuses",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "archive",
									},
									map[string]any{
										"lit": "payment-statuses",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"archive",
									"payment-statuses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "payment_id",
											"orig": "paymentId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "123e4567-e89b-12d3-a456-426614174000",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"payment_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/archive/payment-statuses/latest",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "archive",
									},
									map[string]any{
										"lit": "payment-statuses",
									},
									map[string]any{
										"lit": "latest",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"archive",
									"payment-statuses",
									"latest",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "payment_id",
											"orig": "paymentId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "123e4567-e89b-12d3-a456-426614174000",
										},
									},
								},
								"select": map[string]any{
									"$action": "latest",
									"exist": []any{
										"authorization",
										"payment_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"provider": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bic",
						"title": "Bic",
						"type": "`$STRING`",
						"req": true,
						"short": "BIC code of the provider",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Country code of the provider.",
					},
					map[string]any{
						"name": "hasSubsidiaries",
						"title": "Has Subsidiaries",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the provider has subsidiaries.",
					},
					map[string]any{
						"name": "iconUrl",
						"title": "Icon Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the provider's icon.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier for the provider.",
					},
					map[string]any{
						"name": "logoUrl",
						"title": "Logo Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the provider's logo.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the provider.",
					},
					map[string]any{
						"name": "paymentSchemes",
						"title": "Payment Schemes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of payment schemes that we support for this provider.",
					},
					map[string]any{
						"name": "requiredPaymentFields",
						"title": "Required Payment Fields",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of required payment fields for this provider.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "provider",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/capabilities/providers",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "capabilities",
									},
									map[string]any{
										"lit": "providers",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"capabilities",
									"providers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter",
											"orig": "filters",
											"type": "`$OBJECT`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"psu_provided_data": map[string]any{
				"fields": []any{},
				"name": "psu_provided_data",
				"op": map[string]any{
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/api/v1/ob/payments/psu-provided-data",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "psu-provided-data",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"psu-provided-data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"report": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amount",
						"title": "Amount",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Payment amount",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"req": true,
						"short": "Currency code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique payment identifier",
					},
					map[string]any{
						"name": "provider",
						"title": "Provider",
						"type": "`$OBJECT`",
						"short": "Selected provider details (name, country).",
					},
					map[string]any{
						"name": "recipient",
						"title": "Recipient",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "remittanceInformation",
						"title": "Remittance Information",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "sender",
						"title": "Sender",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "The most recent status of the payment.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "report",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/reports/payments/{id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "reports",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"reports",
									"payments",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sca_data": map[string]any{
				"fields": []any{},
				"name": "sca_data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/payments/decoupled/sca-data",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "sca-data",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"sca-data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/api/v1/ob/payments/decoupled/sca-data",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "sca-data",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"sca-data",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sca_method": map[string]any{
				"fields": []any{},
				"name": "sca_method",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/payments/decoupled/sca-methods",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "sca-methods",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"sca-methods",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/api/v1/ob/payments/decoupled/selected-sca-method",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "decoupled",
									},
									map[string]any{
										"lit": "selected-sca-method",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"decoupled",
									"selected-sca-method",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sender_account": map[string]any{
				"fields": []any{},
				"name": "sender_account",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/ob/payments/sender-accounts",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "sender-accounts",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"sender-accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "provider_id",
											"orig": "providerId",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"provider_id",
										"state",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/api/v1/ob/payments/sender-accounts",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "ob",
									},
									map[string]any{
										"lit": "payments",
									},
									map[string]any{
										"lit": "sender-accounts",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"ob",
									"payments",
									"sender-accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"subsidiary": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bic",
						"title": "Bic",
						"type": "`$STRING`",
						"req": true,
						"short": "BIC code of the provider",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Country code of the provider.",
					},
					map[string]any{
						"name": "hasSubsidiaries",
						"title": "Has Subsidiaries",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Whether the provider has subsidiaries.",
					},
					map[string]any{
						"name": "iconUrl",
						"title": "Icon Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the provider's icon.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Unique identifier for the provider.",
					},
					map[string]any{
						"name": "logoUrl",
						"title": "Logo Url",
						"type": "`$STRING`",
						"req": true,
						"short": "URL of the provider's logo.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the provider.",
					},
					map[string]any{
						"name": "paymentSchemes",
						"title": "Payment Schemes",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of payment schemes that we support for this provider.",
					},
					map[string]any{
						"name": "requiredPaymentFields",
						"title": "Required Payment Fields",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of required payment fields for this provider.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "subsidiary",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/v1/capabilities/providers/{id}/subsidiaries",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "capabilities",
									},
									map[string]any{
										"lit": "providers",
									},
									map[string]any{
										"var": "provider_id",
									},
									map[string]any{
										"lit": "subsidiaries",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"capabilities",
									"providers",
									"{provider_id}",
									"subsidiaries",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "provider_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"params": []any{
										map[string]any{
											"name": "provider_id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "cursor",
											"orig": "cursor",
											"type": "`$OBJECT`",
											"kind": "query",
										},
										map[string]any{
											"name": "filter",
											"orig": "filters",
											"type": "`$OBJECT`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"provider_id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.provider",
						},
					},
				},
			},
			"token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_token",
						"title": "Access Token",
						"type": "`$STRING`",
						"req": true,
						"short": "The JWT access token.",
					},
					map[string]any{
						"name": "expires_in",
						"title": "Expires In",
						"type": "`$NUMBER`",
						"req": true,
						"short": "Expiration time of the token in seconds.",
					},
					map[string]any{
						"name": "grant_type",
						"title": "Grant Type",
						"type": "`$STRING`",
						"req": true,
						"short": "The type of grant being requested.",
					},
					map[string]any{
						"name": "scope",
						"title": "Scope",
						"type": "`$STRING`",
						"req": true,
						"short": "Scopes being requested.",
					},
					map[string]any{
						"name": "token_type",
						"title": "Token Type",
						"type": "`$STRING`",
						"req": true,
						"short": "Token type.",
					},
				},
				"name": "token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/v1/auth/token",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "auth",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"api",
									"v1",
									"auth",
									"token",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "Authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
											"example": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"body": map[string]any{
									"fields": []any{
										map[string]any{
											"name": "grant_type",
										},
										map[string]any{
											"name": "scope",
										},
									},
									"kind": "form",
									"media": "application/x-www-form-urlencoded",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "secrets":
		if NewSecretsFeatureFunc != nil {
			return NewSecretsFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
