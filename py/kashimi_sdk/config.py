# Kashimi SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Kashimi",
            "slug": "kashimi",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "secrets": {
        "options": {
          "active": False,
          "cache": True,
          "exchange": {
            "active": False,
            "method": "POST",
            "path": "auth/token",
            "refresh": "",
            "request": "refresh_token",
            "response": "access_token",
            "retries": 1,
            "statuses": [
              401,
            ],
          },
          "name": "apikey",
          "providers": [],
        },
        "optspec": {},
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "{base}",
            "server": {
                "base": "",
            },
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "capability": {},
                "client_hosted_ui_customizations_output_dto": {},
                "create_payment_output_dto": {},
                "create_token_output_dto": {},
                "healthcheck": {},
                "latest": {},
                "obn": {},
                "payment": {},
                "payment_status": {},
                "provider": {},
                "providers_subsidiary_output_dto": {},
            },
        },
        "entity": {
      "capability": {
        "fields": [],
        "name": "capability",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "providers",
                  },
                  {
                    "lit": "countries",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "providers",
                  "countries",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "client_hosted_ui_customizations_output_dto": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "client_hosted_ui_customizations_output_dto",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "clients",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "hosted-ui-customizations",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "clients",
                  "{id}",
                  "hosted-ui-customizations",
                ],
                "rename": {
                  "param": {
                    "clientId": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "clientId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "hosted-ui-customizations",
                  "exist": [
                    "authorization",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "create_payment_output_dto": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "req": True,
            "short": "The amount to be transferred.",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
            "short": "The currency of the payment.",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "paymentScheme",
            "title": "Payment Scheme",
            "type": "`$ANY`",
            "req": True,
            "short": "Payment scheme.",
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$ANY`",
            "req": True,
            "op": {
              "create": {
                "type": "`$ANY`",
              },
            },
            "short": "The provider information for the followup",
          },
          {
            "name": "recipient",
            "title": "Recipient",
            "type": "`$ANY`",
            "req": True,
            "short": "Data about the party receiving the payment.",
          },
          {
            "name": "remittanceInformation",
            "title": "Remittance Information",
            "type": "`$ANY`",
            "req": True,
            "short": "Unstructured or structured remittance information.",
          },
          {
            "name": "sender",
            "title": "Sender",
            "type": "`$ANY`",
            "short": "The sender information to be used with the payment",
          },
        ],
        "name": "create_payment_output_dto",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "var": "payment_id",
                  },
                  {
                    "lit": "followups",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "{payment_id}",
                  "followups",
                ],
                "rename": {
                  "param": {
                    "paymentId": "payment_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "payment_id",
                      "orig": "paymentId",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "payment_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/v1/ob/payments",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "accept_language",
                      "orig": "Accept-Language",
                      "type": "`$STRING`",
                      "kind": "header",
                      "example": "en",
                    },
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.payment",
            ],
          ],
        },
      },
      "create_token_output_dto": {
        "fields": [
          {
            "name": "access_token",
            "title": "Access Token",
            "type": "`$STRING`",
            "req": True,
            "short": "The JWT access token.",
          },
          {
            "name": "expires_in",
            "title": "Expires In",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Expiration time of the token in seconds.",
          },
          {
            "name": "grant_type",
            "title": "Grant Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The type of grant being requested.",
          },
          {
            "name": "scope",
            "title": "Scope",
            "type": "`$STRING`",
            "req": True,
            "short": "Scopes being requested.",
          },
          {
            "name": "token_type",
            "title": "Token Type",
            "type": "`$STRING`",
            "req": True,
            "short": "Token type.",
          },
        ],
        "name": "create_token_output_dto",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "auth",
                  },
                  {
                    "lit": "token",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "auth",
                  "token",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                      "example": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                  ],
                },
                "body": {
                  "fields": [
                    {
                      "name": "grant_type",
                    },
                    {
                      "name": "scope",
                    },
                  ],
                  "kind": "form",
                  "media": "application/x-www-form-urlencoded",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "healthcheck": {
        "fields": [
          {
            "name": "details",
            "title": "Details",
            "type": "`$OBJECT`",
          },
          {
            "name": "error",
            "title": "Error",
            "type": "`$OBJECT`",
          },
          {
            "name": "info",
            "title": "Info",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "status",
                  },
                ],
                "parts": [
                  "api",
                  "status",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "latest": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp of status creation",
            "format": "date-time",
          },
          {
            "name": "detailedStatus",
            "title": "Detailed Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Detailed payment status",
          },
          {
            "name": "failureReasons",
            "title": "Failure Reasons",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Failure reasons (for `status: FAILED` only)",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique payment status identifier",
          },
          {
            "name": "paymentId",
            "title": "Payment Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique payment identifier",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Payment status.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "latest",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/archive/payment-statuses/latest",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "archive",
                  },
                  {
                    "lit": "payment-statuses",
                  },
                  {
                    "lit": "latest",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "archive",
                  "payment-statuses",
                  "latest",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.failureReasons`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "payment_id",
                      "orig": "paymentId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "123e4567-e89b-12d3-a456-426614174000",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "payment_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "obn": {
        "fields": [],
        "name": "obn",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "cancel",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "cancel",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "provider_id",
                      "orig": "providerId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "provider_id",
                    "state",
                  ],
                },
              },
            ],
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "callbacks",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "callbacks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "provider_id",
                      "orig": "providerId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "callback",
                  "exist": [
                    "provider_id",
                    "state",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/client-jwks",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "client-jwks",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "client-jwks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "client_id",
                      "orig": "clientId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "f2d4a1b7-3c8e-4f9a-b2d1-7e6c5b4a3f2e",
                    },
                    {
                      "name": "provider_id",
                      "orig": "providerId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "b7e1c2a4-8f3b-4e2a-9c5d-2a1b3c4d5e6f",
                    },
                    {
                      "name": "revoked",
                      "orig": "revoked",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "$action": "client_jwk",
                  "exist": [
                    "client_id",
                    "provider_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/payments/sender-accounts",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "sender-accounts",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "sender-accounts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "provider_id",
                      "orig": "providerId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "provider_id",
                    "state",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/callbacks/with-provider-nano-id",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "callbacks",
                  },
                  {
                    "lit": "with-provider-nano-id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "callbacks",
                  "with-provider-nano-id",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/payments/decoupled/confirmation-data",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "confirmation-data",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "confirmation-data",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/payments/decoupled/consent-status",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "consent-status",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "consent-status",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/payments/decoupled/sca-data",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "sca-data",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "sca-data",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/ob/payments/decoupled/sca-methods",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "sca-methods",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "sca-methods",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "sca-data",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "sca-data",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/api/v1/ob/payments/decoupled/selected-sca-method",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "decoupled",
                  },
                  {
                    "lit": "selected-sca-method",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "decoupled",
                  "selected-sca-method",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/api/v1/ob/payments/psu-provided-data",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "psu-provided-data",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "psu-provided-data",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/api/v1/ob/payments/sender-accounts",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "ob",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "sender-accounts",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "ob",
                  "payments",
                  "sender-accounts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "payment": {
        "fields": [
          {
            "name": "amount",
            "title": "Amount",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Payment amount",
          },
          {
            "name": "clientId",
            "title": "Client Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Client identifier",
          },
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "req": True,
            "short": "Currency code",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique payment identifier",
          },
          {
            "name": "metadata",
            "title": "Metadata",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "paymentScheme",
            "title": "Payment Scheme",
            "type": "`$ANY`",
            "req": True,
            "short": "Payment scheme used",
          },
          {
            "name": "provider",
            "title": "Provider",
            "type": "`$ANY`",
            "req": True,
            "op": {
              "load": {
                "type": "`$OBJECT`",
              },
            },
            "short": "Payment provider details.",
          },
          {
            "name": "recipient",
            "title": "Recipient",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "remittanceInformation",
            "title": "Remittance Information",
            "type": "`$ANY`",
            "req": True,
            "short": "Unstructured or structured remittance information.",
          },
          {
            "name": "sender",
            "title": "Sender",
            "type": "`$OBJECT`",
            "req": True,
            "op": {
              "load": {
                "type": "`$OBJECT`",
              },
            },
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "The most recent status of the payment.",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "payment",
        "op": {
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "archive",
                  },
                  {
                    "lit": "payments",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "archive",
                  "payments",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor_value",
                      "orig": "cursor[value]",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "filters_created_at_from",
                      "orig": "filters[createdAt][from]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2026-07-01T00:00:00.000Z",
                    },
                    {
                      "name": "filters_created_at_to",
                      "orig": "filters[createdAt][to]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2026-07-02T00:00:00.000Z",
                    },
                    {
                      "name": "filters_metadata_end_to_end_id",
                      "orig": "filters[metadata][endToEndId]",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "1234567890",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/archive/internal/payments/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "archive",
                  },
                  {
                    "lit": "internal",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "archive",
                  "internal",
                  "payments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/archive/payments/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "archive",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "archive",
                  "payments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/reports/payments/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "reports",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "reports",
                  "payments",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "payment_status": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "req": True,
            "short": "Timestamp of status creation",
            "format": "date-time",
          },
          {
            "name": "detailedStatus",
            "title": "Detailed Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Detailed payment status",
          },
          {
            "name": "failureReasons",
            "title": "Failure Reasons",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Failure reasons (for `status: FAILED` only)",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique payment status identifier",
          },
          {
            "name": "paymentId",
            "title": "Payment Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique payment identifier",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Payment status.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "archive",
                  },
                  {
                    "lit": "payment-statuses",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "archive",
                  "payment-statuses",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "payment_id",
                      "orig": "paymentId",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "123e4567-e89b-12d3-a456-426614174000",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "payment_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "provider": {
        "fields": [
          {
            "name": "bic",
            "title": "Bic",
            "type": "`$STRING`",
            "req": True,
            "short": "BIC code of the provider",
          },
          {
            "name": "countryCode",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Country code of the provider.",
          },
          {
            "name": "hasSubsidiaries",
            "title": "Has Subsidiaries",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the provider has subsidiaries.",
          },
          {
            "name": "iconUrl",
            "title": "Icon Url",
            "type": "`$STRING`",
            "req": True,
            "short": "URL of the provider's icon.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the provider.",
          },
          {
            "name": "logoUrl",
            "title": "Logo Url",
            "type": "`$STRING`",
            "req": True,
            "short": "URL of the provider's logo.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the provider.",
          },
          {
            "name": "paymentSchemes",
            "title": "Payment Schemes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of payment schemes that we support for this provider.",
          },
          {
            "name": "requiredPaymentFields",
            "title": "Required Payment Fields",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of required payment fields for this provider.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "orig": "/api/v1/capabilities/internal/providers",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "internal",
                  },
                  {
                    "lit": "providers",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "internal",
                  "providers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filters",
                      "type": "`$OBJECT`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "filter",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/capabilities/providers",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "providers",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "providers",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filters",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "providers_subsidiary_output_dto": {
        "fields": [
          {
            "name": "bic",
            "title": "Bic",
            "type": "`$STRING`",
            "req": True,
            "short": "BIC code of the provider",
          },
          {
            "name": "countryCode",
            "title": "Country Code",
            "type": "`$STRING`",
            "req": True,
            "short": "Country code of the provider.",
          },
          {
            "name": "hasSubsidiaries",
            "title": "Has Subsidiaries",
            "type": "`$BOOLEAN`",
            "req": True,
            "short": "Whether the provider has subsidiaries.",
          },
          {
            "name": "iconUrl",
            "title": "Icon Url",
            "type": "`$STRING`",
            "req": True,
            "short": "URL of the provider's icon.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the provider.",
          },
          {
            "name": "logoUrl",
            "title": "Logo Url",
            "type": "`$STRING`",
            "req": True,
            "short": "URL of the provider's logo.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Name of the provider.",
          },
          {
            "name": "paymentSchemes",
            "title": "Payment Schemes",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of payment schemes that we support for this provider.",
          },
          {
            "name": "requiredPaymentFields",
            "title": "Required Payment Fields",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of required payment fields for this provider.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "providers_subsidiary_output_dto",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/capabilities/internal/providers/{id}/subsidiaries",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "internal",
                  },
                  {
                    "lit": "providers",
                  },
                  {
                    "var": "provider_id",
                  },
                  {
                    "lit": "subsidiaries",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "internal",
                  "providers",
                  "{provider_id}",
                  "subsidiaries",
                ],
                "rename": {
                  "param": {
                    "id": "provider_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "provider_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filters",
                      "type": "`$OBJECT`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "filter",
                    "provider_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/capabilities/providers/{id}/subsidiaries",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "capabilities",
                  },
                  {
                    "lit": "providers",
                  },
                  {
                    "var": "provider_id",
                  },
                  {
                    "lit": "subsidiaries",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "capabilities",
                  "providers",
                  "{provider_id}",
                  "subsidiaries",
                ],
                "rename": {
                  "param": {
                    "id": "provider_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "header": [
                    {
                      "name": "authorization",
                      "orig": "Authorization",
                      "type": "`$STRING`",
                      "kind": "header",
                      "reqd": True,
                    },
                  ],
                  "params": [
                    {
                      "name": "provider_id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "cursor",
                      "orig": "cursor",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                    {
                      "name": "filter",
                      "orig": "filters",
                      "type": "`$OBJECT`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "authorization",
                    "provider_id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.provider",
            ],
          ],
        },
      },
    },
    }
