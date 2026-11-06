<?php
declare(strict_types=1);

// Kashimi SDK utility: make_spec

require_once __DIR__ . '/Graphql.php';
require_once __DIR__ . '/PrepareMethod.php';

require_once __DIR__ . '/../core/Spec.php';

class KashimiMakeSpec
{
    public static function call(KashimiContext $ctx): array
    {
        if (isset($ctx->out['spec'])) {
            // A PreSpec hook (validate) rejects the operation by placing its
            // error here; the pipeline raises it, and ctx->spec stays a spec.
            if ($ctx->out['spec'] instanceof \Throwable) {
                return [null, $ctx->out['spec']];
            }
            $ctx->spec = $ctx->out['spec'];
            return [$ctx->spec, null];
        }

        $point = $ctx->point;
        $options = $ctx->options;
        $utility = $ctx->utility;

        $base = \Voxgig\Struct\Struct::getprop($options, 'base') ?? '';
        $prefix = \Voxgig\Struct\Struct::getprop($options, 'prefix') ?? '';
        $suffix = \Voxgig\Struct\Struct::getprop($options, 'suffix') ?? '';

        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }

        $ctx->spec = new KashimiSpec([
            'base' => $base, 'prefix' => $prefix, 'parts' => $parts,
            'suffix' => $suffix, 'step' => 'start',
        ]);

        // prepare_method answers null for an op name outside the convention
        // (mirrors the ts reference, where methodMap[key] is undefined) -
        // which then fails the allow check below, never a TypeError and
        // never a silently-allowed empty method.
        $method = ($utility->prepare_method)($ctx);

        $allow_method = \Voxgig\Struct\Struct::getpath($options, 'allow.method');
        if (!KashimiPrepareMethod::allowed($allow_method, $method)) {
            $shown = is_string($method) ? $method : '';
            $list = is_string($allow_method) ? $allow_method : '';
            return [null, $ctx->make_error('spec_method_allow',
                "Method \"{$shown}\" not allowed by SDK option allow.method value: \"{$list}\"")];
        }
        $ctx->spec->method = $method;

        $ctx->spec->params = ($utility->prepare_params)($ctx);
        $ctx->spec->query = ($utility->prepare_query)($ctx);
        $ctx->spec->headers = ($utility->prepare_headers)($ctx);

        if ('graphql' === \Voxgig\Struct\Struct::getprop($point, 'kind')) {
            // GraphQL addresses one endpoint: no path parts, no query
            // string, and the body carries the operation. prepare_body is
            // skipped deliberately — it only emits a body for data-input
            // ops, whereas every GraphQL op posts one, including
            // load/list/remove.
            $ctx->spec->body = ($utility->graphql_body)($ctx);
            $ctx->spec->path = '';
            // prepare_query already copied the op's match arguments into
            // the query string. Those same values are bound as operation
            // variables, so leaving them would send /graphql?id=i1.
            $ctx->spec->query = [];
            $ctx->spec->headers['content-type'] = KashimiGraphql::CONTENT_TYPE;
        } else {
            $ctx->spec->body = ($utility->prepare_body)($ctx);
            $ctx->spec->path = ($utility->prepare_path)($ctx);
        }

        if ($ctx->ctrl->explain) {
            $ctx->ctrl->explain['spec'] = $ctx->spec;
        }

        // Whatever prepare_auth sets in the query, under whichever name, is
        // the credential; a key it leaves as it was is the caller's.
        $query = $ctx->spec->query;

        [$spec, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return [null, $err];
        }

        $spec->authquery = [];
        foreach ($spec->query as $key => $val) {
            if (!array_key_exists($key, $query) || $query[$key] !== $val) {
                $spec->authquery[] = $key;
            }
        }

        $ctx->spec = $spec;
        self::callCredential($ctx, $options, $spec);
        self::formBody($point, $spec);
        return [$spec, null];
    }

    // A credential the call passes under the credential header's name goes as
    // that header, in place of the client's, and not in the body. Kashimi's
    // token call takes its Basic credential this way (voxgig/sdkgen#465).
    private static function callCredential(KashimiContext $ctx, mixed $options, mixed $spec): void
    {
        $authname = \Voxgig\Struct\Struct::getpath($options, 'auth.name');
        $name = is_string($authname) && $authname !== '' ? strtolower($authname) : 'authorization';

        $val = ($ctx->reqmatch ?? [])[$name] ?? null;
        if ($val === null) {
            $val = ($ctx->reqdata ?? [])[$name] ?? null;
        }
        if ($val === null || $val === '') {
            return;
        }

        if (!is_array($spec->headers)) {
            $spec->headers = [];
        }
        self::dropHeader($spec->headers, $name);
        $spec->headers[$name] = (string)$val;

        if (is_array($spec->body)) {
            unset($spec->body[$name]);
        }
    }

    // A body the point declares form-encoded goes form-encoded, under its
    // declared media type, where it would otherwise go as JSON.
    private static function formBody(mixed $point, mixed $spec): void
    {
        $decl = \Voxgig\Struct\Struct::getprop($point, 'body');
        $data = $spec->body;
        if (!is_array($decl) || ($decl['kind'] ?? null) !== 'form' ||
            !is_array($data) || (array_is_list($data) && $data !== [])) {
            return;
        }

        $pairs = [];
        foreach ($data as $key => $val) {
            if ($val === null) {
                continue;
            }
            foreach ((is_array($val) && array_is_list($val) ? $val : [$val]) as $item) {
                $pairs[] = urlencode((string)$key) . '=' . urlencode(self::formValue($item));
            }
        }

        $spec->body = implode('&', $pairs);

        if (!is_array($spec->headers)) {
            $spec->headers = [];
        }
        self::dropHeader($spec->headers, 'content-type');
        $media = $decl['media'] ?? null;
        $spec->headers['content-type'] =
            is_string($media) && $media !== '' ? $media : 'application/x-www-form-urlencoded';
    }

    // Remove a header whatever its case.
    private static function dropHeader(array &$headers, string $name): void
    {
        foreach (array_keys($headers) as $key) {
            if (is_string($key) && strtolower($key) === $name) {
                unset($headers[$key]);
            }
        }
    }

    // A value as the ts URLSearchParams writes it: booleans as true/false,
    // records as JSON.
    private static function formValue(mixed $item): string
    {
        if (is_bool($item)) {
            return $item ? 'true' : 'false';
        }
        if (is_array($item) || is_object($item)) {
            return (string)json_encode($item, JSON_UNESCAPED_SLASHES);
        }
        return (string)$item;
    }
}
