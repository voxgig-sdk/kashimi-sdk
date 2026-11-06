
import { BaseFeature } from './feature/base/BaseFeature'
import { ConformFeature } from './feature/conform/ConformFeature'
import { DebugFeature } from './feature/debug/DebugFeature'
import { IdempotencyFeature } from './feature/idempotency/IdempotencyFeature'
import { MetricsFeature } from './feature/metrics/MetricsFeature'
import { PagingFeature } from './feature/paging/PagingFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { SecretsFeature } from './feature/secrets/SecretsFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   conform: ConformFeature,
 debug: DebugFeature,
 idempotency: IdempotencyFeature,
 metrics: MetricsFeature,
 paging: PagingFeature,
 ratelimit: RatelimitFeature,
 retry: RetryFeature,
 secrets: SecretsFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Kashimi',
        slug: "kashimi",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     conform:     {
      "options": {
        "active": false
      },
      "optspec": {},
      "strict": false,
      "transport": "none"
    },
 debug:     {
      "options": {
        "active": false,
        "max": 100,
        "redact": [
          "authorization",
          "cookie",
          "set-cookie",
          "api-key",
          "apikey",
          "x-api-key",
          "idempotency-key"
        ]
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "onEntry": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 idempotency:     {
      "options": {
        "active": false,
        "header": "Idempotency-Key",
        "methods": [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        "ops": [
          "create",
          "update",
          "remove"
        ]
      },
      "optspec": {
        "keygen": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 metrics:     {
      "options": {
        "active": false
      },
      "optspec": {
        "now": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "none"
    },
 paging:     {
      "options": {
        "active": false,
        "afterVar": "after",
        "cursorParam": "cursor",
        "firstVar": "first",
        "limitParam": "limit",
        "pageParam": "page",
        "startPage": 1
      },
      "optspec": {
        "limit": "`$NUMBER`",
        "ops": "`$LIST`"
      },
      "strict": false,
      "transport": "none"
    },
 ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 secrets:     {
      "options": {
        "active": false,
        "cache": true,
        "exchange": {
          "active": false,
          "method": "POST",
          "path": "auth/token",
          "refresh": "",
          "request": "refresh_token",
          "response": "access_token",
          "retries": 1,
          "statuses": [
            401
          ]
        },
        "name": "apikey",
        "providers": []
      },
      "optspec": {},
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.kashimi.tech",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        callback: {
        },
  
        client_jwk: {
        },
  
        confirmation_data: {
        },
  
        consent_status: {
        },
  
        country: {
        },
  
        followup: {
        },
  
        healthcheck: {
        },
  
        hosted_ui_customization: {
        },
  
        payment: {
        },
  
        payment_status: {
        },
  
        provider: {
        },
  
        psu_provided_data: {
        },
  
        report: {
        },
  
        sca_data: {
        },
  
        sca_method: {
        },
  
        sender_account: {
        },
  
        subsidiary: {
        },
  
        token: {
        },
  
    }
  }


  entity = {
    "callback": {
      "fields": [],
      "name": "callback",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/callbacks",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "callbacks"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "callbacks"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "provider_id",
                    "orig": "providerId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "provider_id",
                  "state"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/callbacks/with-provider-nano-id",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "callbacks"
                },
                {
                  "lit": "with-provider-nano-id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "callbacks",
                "with-provider-nano-id"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {
                "$action": "with-provider-nano-id"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "client_jwk": {
      "fields": [],
      "name": "client_jwk",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/client-jwks",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "client-jwks"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "client-jwks"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "client_id",
                    "orig": "clientId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e"
                  },
                  {
                    "name": "provider_id",
                    "orig": "providerId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f"
                  },
                  {
                    "name": "revoked",
                    "orig": "revoked",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "client_id",
                  "provider_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "confirmation_data": {
      "fields": [],
      "name": "confirmation_data",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/payments/decoupled/confirmation-data",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "confirmation-data"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "confirmation-data"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "consent_status": {
      "fields": [],
      "name": "consent_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/payments/decoupled/consent-status",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "consent-status"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "consent-status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "country": {
      "fields": [],
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/capabilities/providers/countries",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "capabilities"
                },
                {
                  "lit": "providers"
                },
                {
                  "lit": "countries"
                }
              ],
              "parts": [
                "api",
                "v1",
                "capabilities",
                "providers",
                "countries"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "followup": {
      "fields": [
        {
          "name": "provider",
          "title": "Provider",
          "type": "`$ANY`",
          "req": true,
          "short": "The provider information for the followup"
        },
        {
          "name": "sender",
          "title": "Sender",
          "type": "`$ANY`",
          "short": "The sender information to be used with the payment"
        }
      ],
      "name": "followup",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ob/payments/{paymentId}/followups",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "var": "payment_id"
                },
                {
                  "lit": "followups"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "{payment_id}",
                "followups"
              ],
              "rename": {
                "param": {
                  "paymentId": "payment_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "payment_id",
                    "orig": "paymentId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "payment_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.payment"
          ]
        ]
      }
    },
    "healthcheck": {
      "fields": [
        {
          "name": "details",
          "title": "Details",
          "type": "`$OBJECT`"
        },
        {
          "name": "error",
          "title": "Error",
          "type": "`$OBJECT`"
        },
        {
          "name": "info",
          "title": "Info",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        }
      ],
      "name": "healthcheck",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/status",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "status"
                }
              ],
              "parts": [
                "api",
                "status"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "hosted_ui_customization": {
      "fields": [
        {
          "name": "clientId",
          "title": "Client Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "faviconUrl",
          "title": "Favicon Url",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "footerText",
          "title": "Footer Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "logoUrl",
          "title": "Logo Url",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "primaryColor",
          "title": "Primary Color",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "privacyPolicyUrl",
          "title": "Privacy Policy Url",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "psuPortalBaseUrl",
          "title": "Psu Portal Base Url",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "termsUrl",
          "title": "Terms Url",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "hosted_ui_customization",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "capabilities"
                },
                {
                  "lit": "clients"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "hosted-ui-customizations"
                }
              ],
              "parts": [
                "api",
                "v1",
                "capabilities",
                "clients",
                "{id}",
                "hosted-ui-customizations"
              ],
              "rename": {
                "param": {
                  "clientId": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "clientId",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "payment": {
      "fields": [
        {
          "name": "amount",
          "title": "Amount",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Payment amount"
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "req": true,
          "short": "Currency code"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique payment identifier"
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "paymentScheme",
          "title": "Payment Scheme",
          "type": "`$ANY`",
          "req": true,
          "short": "Payment scheme used"
        },
        {
          "name": "provider",
          "title": "Provider",
          "type": "`$ANY`",
          "req": true,
          "op": {
            "create": {
              "type": "`$ANY`"
            }
          },
          "short": "Payment provider details."
        },
        {
          "name": "recipient",
          "title": "Recipient",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Data about the party receiving the payment."
        },
        {
          "name": "remittanceInformation",
          "title": "Remittance Information",
          "type": "`$ANY`",
          "req": true,
          "short": "Unstructured or structured remittance information."
        },
        {
          "name": "sender",
          "title": "Sender",
          "type": "`$OBJECT`",
          "req": true,
          "op": {
            "create": {
              "type": "`$ANY`"
            }
          },
          "short": "Data about the party sending the payment."
        },
        {
          "name": "updatedAt",
          "title": "Updated At",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "payment",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ob/payments/cancel",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "cancel"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "cancel"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "provider_id",
                    "orig": "providerId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "cancel",
                "exist": [
                  "provider_id",
                  "state"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/ob/payments",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "accept_language",
                    "orig": "Accept-Language",
                    "type": "`$STRING`",
                    "kind": "header",
                    "example": "en"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/archive/payments",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "archive"
                },
                {
                  "lit": "payments"
                }
              ],
              "parts": [
                "api",
                "v1",
                "archive",
                "payments"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor_value",
                    "orig": "cursor[value]",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "filters_created_at_from",
                    "orig": "filters[createdAt][from]",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2026-07-01T00:00:00.000Z"
                  },
                  {
                    "name": "filters_created_at_to",
                    "orig": "filters[createdAt][to]",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2026-07-02T00:00:00.000Z"
                  },
                  {
                    "name": "filters_metadata_end_to_end_id",
                    "orig": "filters[metadata][endToEndId]",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "1234567890"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/archive/payments/{id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "archive"
                },
                {
                  "lit": "payments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "archive",
                "payments",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "payment_status": {
      "fields": [
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true,
          "short": "Timestamp of status creation",
          "format": "date-time"
        },
        {
          "name": "detailedStatus",
          "title": "Detailed Status",
          "type": "`$STRING`",
          "req": true,
          "short": "Detailed payment status"
        },
        {
          "name": "failureReasons",
          "title": "Failure Reasons",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Failure reasons (for `status: FAILED` only)"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique payment status identifier"
        },
        {
          "name": "paymentId",
          "title": "Payment Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique payment identifier"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "short": "Payment status."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "payment_status",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/archive/payment-statuses",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "archive"
                },
                {
                  "lit": "payment-statuses"
                }
              ],
              "parts": [
                "api",
                "v1",
                "archive",
                "payment-statuses"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "payment_id",
                    "orig": "paymentId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "123e4567-e89b-12d3-a456-426614174000"
                  }
                ]
              },
              "select": {
                "exist": [
                  "payment_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/archive/payment-statuses/latest",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "archive"
                },
                {
                  "lit": "payment-statuses"
                },
                {
                  "lit": "latest"
                }
              ],
              "parts": [
                "api",
                "v1",
                "archive",
                "payment-statuses",
                "latest"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "payment_id",
                    "orig": "paymentId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "123e4567-e89b-12d3-a456-426614174000"
                  }
                ]
              },
              "select": {
                "$action": "latest",
                "exist": [
                  "payment_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "provider": {
      "fields": [
        {
          "name": "bic",
          "title": "Bic",
          "type": "`$STRING`",
          "req": true,
          "short": "BIC code of the provider"
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Country code of the provider."
        },
        {
          "name": "hasSubsidiaries",
          "title": "Has Subsidiaries",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the provider has subsidiaries."
        },
        {
          "name": "iconUrl",
          "title": "Icon Url",
          "type": "`$STRING`",
          "req": true,
          "short": "URL of the provider's icon."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique identifier for the provider."
        },
        {
          "name": "logoUrl",
          "title": "Logo Url",
          "type": "`$STRING`",
          "req": true,
          "short": "URL of the provider's logo."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the provider."
        },
        {
          "name": "paymentSchemes",
          "title": "Payment Schemes",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of payment schemes that we support for this provider."
        },
        {
          "name": "requiredPaymentFields",
          "title": "Required Payment Fields",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of required payment fields for this provider."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "provider",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/capabilities/providers",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "capabilities"
                },
                {
                  "lit": "providers"
                }
              ],
              "parts": [
                "api",
                "v1",
                "capabilities",
                "providers"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              },
              "args": {
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$OBJECT`",
                    "kind": "query"
                  },
                  {
                    "name": "filter",
                    "orig": "filters",
                    "type": "`$OBJECT`",
                    "kind": "query"
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "psu_provided_data": {
      "fields": [],
      "name": "psu_provided_data",
      "op": {
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/api/v1/ob/payments/psu-provided-data",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "psu-provided-data"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "psu-provided-data"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "report": {
      "fields": [
        {
          "name": "amount",
          "title": "Amount",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Payment amount"
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "req": true,
          "short": "Currency code"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique payment identifier"
        },
        {
          "name": "provider",
          "title": "Provider",
          "type": "`$OBJECT`",
          "short": "Selected provider details (name, country)."
        },
        {
          "name": "recipient",
          "title": "Recipient",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "remittanceInformation",
          "title": "Remittance Information",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "sender",
          "title": "Sender",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true,
          "short": "The most recent status of the payment."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "report",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/reports/payments/{id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "reports"
                },
                {
                  "lit": "payments"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "api",
                "v1",
                "reports",
                "payments",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "sca_data": {
      "fields": [],
      "name": "sca_data",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/payments/decoupled/sca-data",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "sca-data"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "sca-data"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/api/v1/ob/payments/decoupled/sca-data",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "sca-data"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "sca-data"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "sca_method": {
      "fields": [],
      "name": "sca_method",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/payments/decoupled/sca-methods",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "sca-methods"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "sca-methods"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/api/v1/ob/payments/decoupled/selected-sca-method",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "decoupled"
                },
                {
                  "lit": "selected-sca-method"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "decoupled",
                "selected-sca-method"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "sender_account": {
      "fields": [],
      "name": "sender_account",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/ob/payments/sender-accounts",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "sender-accounts"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "sender-accounts"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "provider_id",
                    "orig": "providerId",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "provider_id",
                  "state"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
              "kind": "http",
              "method": "PATCH",
              "orig": "/api/v1/ob/payments/sender-accounts",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "ob"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "sender-accounts"
                }
              ],
              "parts": [
                "api",
                "v1",
                "ob",
                "payments",
                "sender-accounts"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "subsidiary": {
      "fields": [
        {
          "name": "bic",
          "title": "Bic",
          "type": "`$STRING`",
          "req": true,
          "short": "BIC code of the provider"
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "req": true,
          "short": "Country code of the provider."
        },
        {
          "name": "hasSubsidiaries",
          "title": "Has Subsidiaries",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Whether the provider has subsidiaries."
        },
        {
          "name": "iconUrl",
          "title": "Icon Url",
          "type": "`$STRING`",
          "req": true,
          "short": "URL of the provider's icon."
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "Unique identifier for the provider."
        },
        {
          "name": "logoUrl",
          "title": "Logo Url",
          "type": "`$STRING`",
          "req": true,
          "short": "URL of the provider's logo."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the provider."
        },
        {
          "name": "paymentSchemes",
          "title": "Payment Schemes",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of payment schemes that we support for this provider."
        },
        {
          "name": "requiredPaymentFields",
          "title": "Required Payment Fields",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of required payment fields for this provider."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "subsidiary",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api/v1/capabilities/providers/{id}/subsidiaries",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "capabilities"
                },
                {
                  "lit": "providers"
                },
                {
                  "var": "provider_id"
                },
                {
                  "lit": "subsidiaries"
                }
              ],
              "parts": [
                "api",
                "v1",
                "capabilities",
                "providers",
                "{provider_id}",
                "subsidiaries"
              ],
              "rename": {
                "param": {
                  "id": "provider_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.items`"
              },
              "args": {
                "params": [
                  {
                    "name": "provider_id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "cursor",
                    "orig": "cursor",
                    "type": "`$OBJECT`",
                    "kind": "query"
                  },
                  {
                    "name": "filter",
                    "orig": "filters",
                    "type": "`$OBJECT`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "provider_id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.provider"
          ]
        ]
      }
    },
    "token": {
      "fields": [
        {
          "name": "access_token",
          "title": "Access Token",
          "type": "`$STRING`",
          "req": true,
          "short": "The JWT access token."
        },
        {
          "name": "expires_in",
          "title": "Expires In",
          "type": "`$NUMBER`",
          "req": true,
          "short": "Expiration time of the token in seconds."
        },
        {
          "name": "grant_type",
          "title": "Grant Type",
          "type": "`$STRING`",
          "req": true,
          "short": "The type of grant being requested."
        },
        {
          "name": "scope",
          "title": "Scope",
          "type": "`$STRING`",
          "req": true,
          "short": "Scopes being requested."
        },
        {
          "name": "token_type",
          "title": "Token Type",
          "type": "`$STRING`",
          "req": true,
          "short": "Token type."
        }
      ],
      "name": "token",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api/v1/auth/token",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "auth"
                },
                {
                  "lit": "token"
                }
              ],
              "parts": [
                "api",
                "v1",
                "auth",
                "token"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "body": {
                "fields": [
                  {
                    "name": "grant_type"
                  },
                  {
                    "name": "scope"
                  }
                ],
                "kind": "form",
                "media": "application/x-www-form-urlencoded"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

