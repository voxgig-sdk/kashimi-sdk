<?php
declare(strict_types=1);

// Kashimi SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class KashimiSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new KashimiUtility();
        $this->_utility = $utility;

        $config = KashimiConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = KashimiHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = KashimiHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!KashimiFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, KashimiFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'Kashimi'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return KashimiUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = KashimiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!KashimiPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = KashimiHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = KashimiHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new KashimiSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        $has_accept = false;
        foreach (array_keys($ctx->spec->headers) as $k) {
            if (strtolower((string)$k) === 'accept') {
                $has_accept = true;
                break;
            }
        }
        if (!$has_accept) {
            $ctx->spec->headers['accept'] = 'application/json';
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return KashimiPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new KashimiError($op . "_allow",
                "KashimiSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = KashimiHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = KashimiHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (KashimiFetcher::usesDefault($ctx)) {
                        $sent = KashimiFetcher::sentHeaders($sent);
                    }
                    $body_err = KashimiResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new KashimiError("graphql_error",
                "KashimiSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_callback = null;

    // Canonical facade: $client->Callback()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->callback()
    // resolves here too.
    public function Callback($data = null)
    {
        require_once __DIR__ . '/entity/callback_entity.php';
        if ($data === null) {
            if ($this->_callback === null) {
                $this->_callback = new CallbackEntity($this, null);
            }
            return $this->_callback;
        }
        return new CallbackEntity($this, $data);
    }


    private $_client_jwk = null;

    // Canonical facade: $client->ClientJwk()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->client_jwk()
    // resolves here too.
    public function ClientJwk($data = null)
    {
        require_once __DIR__ . '/entity/client_jwk_entity.php';
        if ($data === null) {
            if ($this->_client_jwk === null) {
                $this->_client_jwk = new ClientJwkEntity($this, null);
            }
            return $this->_client_jwk;
        }
        return new ClientJwkEntity($this, $data);
    }


    private $_confirmation_data = null;

    // Canonical facade: $client->ConfirmationData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->confirmation_data()
    // resolves here too.
    public function ConfirmationData($data = null)
    {
        require_once __DIR__ . '/entity/confirmation_data_entity.php';
        if ($data === null) {
            if ($this->_confirmation_data === null) {
                $this->_confirmation_data = new ConfirmationDataEntity($this, null);
            }
            return $this->_confirmation_data;
        }
        return new ConfirmationDataEntity($this, $data);
    }


    private $_consent_status = null;

    // Canonical facade: $client->ConsentStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->consent_status()
    // resolves here too.
    public function ConsentStatus($data = null)
    {
        require_once __DIR__ . '/entity/consent_status_entity.php';
        if ($data === null) {
            if ($this->_consent_status === null) {
                $this->_consent_status = new ConsentStatusEntity($this, null);
            }
            return $this->_consent_status;
        }
        return new ConsentStatusEntity($this, $data);
    }


    private $_country = null;

    // Canonical facade: $client->Country()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->country()
    // resolves here too.
    public function Country($data = null)
    {
        require_once __DIR__ . '/entity/country_entity.php';
        if ($data === null) {
            if ($this->_country === null) {
                $this->_country = new CountryEntity($this, null);
            }
            return $this->_country;
        }
        return new CountryEntity($this, $data);
    }


    private $_followup = null;

    // Canonical facade: $client->Followup()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->followup()
    // resolves here too.
    public function Followup($data = null)
    {
        require_once __DIR__ . '/entity/followup_entity.php';
        if ($data === null) {
            if ($this->_followup === null) {
                $this->_followup = new FollowupEntity($this, null);
            }
            return $this->_followup;
        }
        return new FollowupEntity($this, $data);
    }


    private $_healthcheck = null;

    // Canonical facade: $client->Healthcheck()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->healthcheck()
    // resolves here too.
    public function Healthcheck($data = null)
    {
        require_once __DIR__ . '/entity/healthcheck_entity.php';
        if ($data === null) {
            if ($this->_healthcheck === null) {
                $this->_healthcheck = new HealthcheckEntity($this, null);
            }
            return $this->_healthcheck;
        }
        return new HealthcheckEntity($this, $data);
    }


    private $_hosted_ui_customization = null;

    // Canonical facade: $client->HostedUiCustomization()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->hosted_ui_customization()
    // resolves here too.
    public function HostedUiCustomization($data = null)
    {
        require_once __DIR__ . '/entity/hosted_ui_customization_entity.php';
        if ($data === null) {
            if ($this->_hosted_ui_customization === null) {
                $this->_hosted_ui_customization = new HostedUiCustomizationEntity($this, null);
            }
            return $this->_hosted_ui_customization;
        }
        return new HostedUiCustomizationEntity($this, $data);
    }


    private $_payment = null;

    // Canonical facade: $client->Payment()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment()
    // resolves here too.
    public function Payment($data = null)
    {
        require_once __DIR__ . '/entity/payment_entity.php';
        if ($data === null) {
            if ($this->_payment === null) {
                $this->_payment = new PaymentEntity($this, null);
            }
            return $this->_payment;
        }
        return new PaymentEntity($this, $data);
    }


    private $_payment_status = null;

    // Canonical facade: $client->PaymentStatus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->payment_status()
    // resolves here too.
    public function PaymentStatus($data = null)
    {
        require_once __DIR__ . '/entity/payment_status_entity.php';
        if ($data === null) {
            if ($this->_payment_status === null) {
                $this->_payment_status = new PaymentStatusEntity($this, null);
            }
            return $this->_payment_status;
        }
        return new PaymentStatusEntity($this, $data);
    }


    private $_provider = null;

    // Canonical facade: $client->Provider()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->provider()
    // resolves here too.
    public function Provider($data = null)
    {
        require_once __DIR__ . '/entity/provider_entity.php';
        if ($data === null) {
            if ($this->_provider === null) {
                $this->_provider = new ProviderEntity($this, null);
            }
            return $this->_provider;
        }
        return new ProviderEntity($this, $data);
    }


    private $_psu_provided_data = null;

    // Canonical facade: $client->PsuProvidedData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->psu_provided_data()
    // resolves here too.
    public function PsuProvidedData($data = null)
    {
        require_once __DIR__ . '/entity/psu_provided_data_entity.php';
        if ($data === null) {
            if ($this->_psu_provided_data === null) {
                $this->_psu_provided_data = new PsuProvidedDataEntity($this, null);
            }
            return $this->_psu_provided_data;
        }
        return new PsuProvidedDataEntity($this, $data);
    }


    private $_report = null;

    // Canonical facade: $client->Report()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->report()
    // resolves here too.
    public function Report($data = null)
    {
        require_once __DIR__ . '/entity/report_entity.php';
        if ($data === null) {
            if ($this->_report === null) {
                $this->_report = new ReportEntity($this, null);
            }
            return $this->_report;
        }
        return new ReportEntity($this, $data);
    }


    private $_sca_data = null;

    // Canonical facade: $client->ScaData()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_data()
    // resolves here too.
    public function ScaData($data = null)
    {
        require_once __DIR__ . '/entity/sca_data_entity.php';
        if ($data === null) {
            if ($this->_sca_data === null) {
                $this->_sca_data = new ScaDataEntity($this, null);
            }
            return $this->_sca_data;
        }
        return new ScaDataEntity($this, $data);
    }


    private $_sca_method = null;

    // Canonical facade: $client->ScaMethod()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sca_method()
    // resolves here too.
    public function ScaMethod($data = null)
    {
        require_once __DIR__ . '/entity/sca_method_entity.php';
        if ($data === null) {
            if ($this->_sca_method === null) {
                $this->_sca_method = new ScaMethodEntity($this, null);
            }
            return $this->_sca_method;
        }
        return new ScaMethodEntity($this, $data);
    }


    private $_sender_account = null;

    // Canonical facade: $client->SenderAccount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->sender_account()
    // resolves here too.
    public function SenderAccount($data = null)
    {
        require_once __DIR__ . '/entity/sender_account_entity.php';
        if ($data === null) {
            if ($this->_sender_account === null) {
                $this->_sender_account = new SenderAccountEntity($this, null);
            }
            return $this->_sender_account;
        }
        return new SenderAccountEntity($this, $data);
    }


    private $_subsidiary = null;

    // Canonical facade: $client->Subsidiary()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->subsidiary()
    // resolves here too.
    public function Subsidiary($data = null)
    {
        require_once __DIR__ . '/entity/subsidiary_entity.php';
        if ($data === null) {
            if ($this->_subsidiary === null) {
                $this->_subsidiary = new SubsidiaryEntity($this, null);
            }
            return $this->_subsidiary;
        }
        return new SubsidiaryEntity($this, $data);
    }


    private $_token = null;

    // Canonical facade: $client->Token()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->token()
    // resolves here too.
    public function Token($data = null)
    {
        require_once __DIR__ . '/entity/token_entity.php';
        if ($data === null) {
            if ($this->_token === null) {
                $this->_token = new TokenEntity($this, null);
            }
            return $this->_token;
        }
        return new TokenEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new KashimiSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
