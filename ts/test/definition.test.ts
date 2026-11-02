import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "capability",
    "accessor": "Capability",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/capabilities/providers/countries",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": [
      "DE",
      "LT",
      "NL"
    ],
    "idField": "id"
  },
  {
    "entity": "client_hosted_ui_customizations_output_dto",
    "accessor": "ClientHostedUiCustomizationsOutputDto",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/capabilities/clients/{clientId}/hosted-ui-customizations",
    "action": "hosted-ui-customizations",
    "args": [
      {
        "name": "id",
        "wire": "clientId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "clientId": "123e4567-e89b-12d3-a456-426614174000",
      "primaryColor": "#000000",
      "faviconUrl": "https://example.com/favicon.ico",
      "logoUrl": "https://example.com/logo.png",
      "termsUrl": "https://example.com/terms",
      "privacyPolicyUrl": "https://example.com/privacy",
      "footerText": "© 2023 Example Company. All rights reserved.",
      "psuPortalBaseUrl": "https://psu.example.com"
    },
    "idField": "id"
  },
  {
    "entity": "create_payment_output_dto",
    "accessor": "CreatePaymentOutputDto",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/ob/payments/{paymentId}/followups",
    "args": [
      {
        "name": "payment_id",
        "wire": "paymentId",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "paymentId": "56caec01-85cc-4fc6-8080-cc0f7ed03a7e",
      "redirectUrl": "https://example.com/provider/specific/redirect/url",
      "createdAt": "2023-04-05T17:02:11.954Z",
      "updatedAt": "2023-04-05T17:02:11.954Z",
      "status": "PENDING"
    },
    "idField": "id"
  },
  {
    "entity": "create_payment_output_dto",
    "accessor": "CreatePaymentOutputDto",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/ob/payments",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [
      {
        "name": "accept_language",
        "wire": "Accept-Language",
        "value": "en"
      }
    ],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 201,
    "sample": {
      "paymentId": "56caec01-85cc-4fc6-8080-cc0f7ed03a7e",
      "providerPaymentId": "123456789",
      "redirectUrl": "https://example.com/provider/specific/redirect/url",
      "createdAt": "2023-04-05T17:02:11.954Z",
      "updatedAt": "2023-04-05T17:02:11.954Z",
      "status": "PENDING"
    },
    "idField": "id"
  },
  {
    "entity": "create_token_output_dto",
    "accessor": "CreateTokenOutputDto",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/auth/token",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "access_token": "YOUR_ACCESS_TOKEN",
      "token_type": "Bearer",
      "expires_in": 1800
    },
    "idField": "id"
  },
  {
    "entity": "healthcheck",
    "accessor": "Healthcheck",
    "op": "load",
    "method": "GET",
    "path": "/api/status",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "status": "ok",
      "info": {
        "database": {
          "status": "up"
        }
      },
      "error": {},
      "details": {
        "database": {
          "status": "up"
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "latest",
    "accessor": "Latest",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/archive/payment-statuses/latest",
    "args": [],
    "select": {
      "authorization": "v1",
      "payment_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "paymentId"
    ],
    "queryArgs": [
      {
        "name": "payment_id",
        "wire": "paymentId"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "e68eee70-bfe9-4885-8650-46ec7d017458",
      "paymentId": "123e4567-e89b-12d3-a456-426614174000",
      "status": "PENDING",
      "detailedStatus": "PAYMENT_CONSENT_CALLBACK_PROCESSING_PENDING",
      "failureReasons": [
        "AMOUNT_EXCEEDS_AVAILABLE_FUNDS"
      ],
      "createdAt": "2023-10-01T12:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "obn",
    "accessor": "Obn",
    "op": "create",
    "method": "POST",
    "path": "/api/v1/ob/payments/cancel",
    "args": [],
    "select": {
      "provider_id": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "providerId"
    ],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "obn",
    "accessor": "Obn",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/ob/callbacks",
    "action": "callback",
    "args": [],
    "select": {
      "provider_id": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "providerId"
    ],
    "queryArgs": [
      {
        "name": "provider_id",
        "wire": "providerId"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "obn",
    "accessor": "Obn",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/ob/client-jwks",
    "action": "client_jwk",
    "args": [],
    "select": {
      "client_id": "v1",
      "provider_id": "v1",
      "revoked": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "providerId",
      "clientId",
      "revoked"
    ],
    "queryArgs": [
      {
        "name": "client_id",
        "wire": "clientId"
      },
      {
        "name": "provider_id",
        "wire": "providerId"
      },
      {
        "name": "revoked",
        "wire": "revoked"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "obn",
    "accessor": "Obn",
    "op": "load",
    "method": "GET",
    "path": "/api/v1/ob/payments/sender-accounts",
    "args": [],
    "select": {
      "provider_id": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "state",
      "providerId"
    ],
    "queryArgs": [
      {
        "name": "provider_id",
        "wire": "providerId"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "payment",
    "accessor": "Payment",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/archive/payments",
    "args": [],
    "select": {
      "authorization": "v1",
      "cursor_value": "v1",
      "filters_created_at_from": "2026-07-01T00:00:00.000Z",
      "filters_created_at_to": "2026-07-02T00:00:00.000Z",
      "filters_metadata_end_to_end_id": "1234567890"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cursor[value]",
      "filters[createdAt][to]",
      "filters[createdAt][from]",
      "filters[metadata][endToEndId]"
    ],
    "queryArgs": [
      {
        "name": "cursor_value",
        "wire": "cursor[value]"
      },
      {
        "name": "filters_created_at_from",
        "wire": "filters[createdAt][from]"
      },
      {
        "name": "filters_created_at_to",
        "wire": "filters[createdAt][to]"
      },
      {
        "name": "filters_metadata_end_to_end_id",
        "wire": "filters[metadata][endToEndId]"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": "5fad63ad-f79d-4505-b068-88450100750d",
          "createdAt": "2023-04-05T17:02:11.954Z",
          "updatedAt": "2023-04-05T17:02:11.954Z",
          "provider": {
            "id": "a5613c23-0317-4c51-a6fe-6723993e43e9",
            "preferences": {}
          },
          "paymentScheme": {
            "name": "SEPA",
            "preferences": {
              "mode": "INSTANT",
              "feePaidBy": "SENDER"
            }
          },
          "sender": {
            "account": {
              "currency": "x"
            },
            "address": {
              "country": "AF",
              "city": "Amsterdam",
              "streetName": "Damstraat",
              "buildingNumber": "1A",
              "postCode": "1012AB"
            },
            "credentials": {}
          },
          "recipient": {
            "account": {},
            "name": "x",
            "address": {
              "country": "AF",
              "city": "Amsterdam",
              "streetName": "Damstraat",
              "buildingNumber": "1A",
              "postCode": "1012AB"
            }
          },
          "amount": 100,
          "currency": "EUR",
          "remittanceInformation": {},
          "metadata": {
            "redirectUri": "https://example.com/redirect",
            "psuIpAddress": "192.168.1.1",
            "psuUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "endToEndId": "E2E123456789",
            "webhookUrl": "https://example.com/webhook",
            "note": "Invoice #12345"
          }
        }
      ],
      "meta": {
        "cursor": {
          "next": {}
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "payment_status",
    "accessor": "PaymentStatus",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/archive/payment-statuses",
    "args": [],
    "select": {
      "authorization": "v1",
      "payment_id": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "paymentId"
    ],
    "queryArgs": [
      {
        "name": "payment_id",
        "wire": "paymentId"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "e68eee70-bfe9-4885-8650-46ec7d017458",
        "paymentId": "123e4567-e89b-12d3-a456-426614174000",
        "status": "PENDING",
        "detailedStatus": "PAYMENT_CONSENT_CALLBACK_PROCESSING_PENDING",
        "failureReasons": [],
        "createdAt": "2023-10-01T12:00:00Z"
      },
      {
        "id": "f79fff81-cff0-5996-9761-57fd8e128569",
        "paymentId": "123e4567-e89b-12d3-a456-426614174000",
        "status": "COMPLETED",
        "detailedStatus": "PAYMENT_EXECUTION_COMPLETED",
        "failureReasons": [],
        "createdAt": "2023-10-01T12:05:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "provider",
    "accessor": "Provider",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/capabilities/internal/providers",
    "args": [],
    "select": {
      "authorization": "v1",
      "filter": "v1",
      "cursor": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "filters",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "filter",
        "wire": "filters"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": "3a9f7916-1b45-473c-bf34-3e601b8aae90",
          "name": "Swedbank",
          "countryCode": "LT",
          "bic": "HABALT22",
          "logoUrl": "https://kashimi.s3.com/logo.png",
          "iconUrl": "https://kashimi.s3.com/icon.png",
          "paymentSchemes": [
            "SEPA"
          ],
          "requiredPaymentFields": [
            "SENDER_ACCOUNT"
          ],
          "hasSubsidiaries": false
        }
      ],
      "meta": {
        "cursor": {
          "next": {}
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "provider",
    "accessor": "Provider",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/capabilities/providers",
    "args": [],
    "select": {
      "authorization": "v1",
      "cursor": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "filters",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": "3a9f7916-1b45-473c-bf34-3e601b8aae90",
          "name": "Swedbank",
          "countryCode": "LT",
          "bic": "HABALT22",
          "logoUrl": "https://kashimi.s3.com/logo.png",
          "iconUrl": "https://kashimi.s3.com/icon.png",
          "paymentSchemes": [
            "SEPA"
          ],
          "requiredPaymentFields": [
            "SENDER_ACCOUNT"
          ],
          "hasSubsidiaries": false
        }
      ],
      "meta": {
        "cursor": {
          "next": {}
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "providers_subsidiary_output_dto",
    "accessor": "ProvidersSubsidiaryOutputDto",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/capabilities/internal/providers/{id}/subsidiaries",
    "args": [
      {
        "name": "provider_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "filter": "v1",
      "cursor": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "filters",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      },
      {
        "name": "filter",
        "wire": "filters"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": "3a9f7916-1b45-473c-bf34-3e601b8aae90",
          "name": "Swedbank",
          "countryCode": "LT",
          "bic": "HABALT22",
          "logoUrl": "https://kashimi.s3.com/logo.png",
          "iconUrl": "https://kashimi.s3.com/icon.png",
          "paymentSchemes": [
            "SEPA"
          ],
          "requiredPaymentFields": [
            "SENDER_ACCOUNT"
          ],
          "hasSubsidiaries": false
        }
      ],
      "meta": {
        "cursor": {
          "next": {}
        }
      }
    },
    "idField": "id"
  },
  {
    "entity": "providers_subsidiary_output_dto",
    "accessor": "ProvidersSubsidiaryOutputDto",
    "op": "list",
    "method": "GET",
    "path": "/api/v1/capabilities/providers/{id}/subsidiaries",
    "args": [
      {
        "name": "provider_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "authorization": "v1",
      "cursor": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "filters",
      "cursor"
    ],
    "queryArgs": [
      {
        "name": "cursor",
        "wire": "cursor"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": [
        {
          "id": "3a9f7916-1b45-473c-bf34-3e601b8aae90",
          "name": "Swedbank",
          "countryCode": "LT",
          "bic": "HABALT22",
          "logoUrl": "https://kashimi.s3.com/logo.png",
          "iconUrl": "https://kashimi.s3.com/icon.png",
          "paymentSchemes": [
            "SEPA"
          ],
          "requiredPaymentFields": [
            "SENDER_ACCOUNT"
          ],
          "hasSubsidiaries": false
        }
      ],
      "meta": {
        "cursor": {
          "next": {}
        }
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
