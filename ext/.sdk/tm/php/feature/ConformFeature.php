<?php
declare(strict_types=1);

// ProjectName SDK conform feature

require_once __DIR__ . '/BaseFeature.php';

// conform's OVERLAY for the bundled `php` target. Mirrors
// ts/src/feature/conform/ConformFeature.ts: sends and reads what the
// definition declares, where the stock pipeline does not yet
// (voxgig/sdkgen#465).
//
// PreRequest runs after makeSpec, so the spec already holds the headers,
// with the client's credential, and the body as the stock pipeline built
// them. It rewrites two things:
//
//   form        a point whose body kind is `form` gets its body form-encoded,
//               with the declared media type as its content type.
//               MakeFetchDef sends a string body on a non-JSON point as given.
//   credential  a value the call passes under the credential header's name, or
//               under a header argument the point declares with that name, is
//               sent as that header, in place of the credential PrepareAuth set
//               (or restoring the one it removed), and leaves the body.
//
// Counts land on the client as `_conform: [form, credential]`.
class ProjectNameConformFeature extends ProjectNameBaseFeature
{
    private const CRED_NAME = 'authorization';

    private mixed $client;
    private ?array $options;

    public function __construct()
    {
        parent::__construct();
        $this->version = '0.1.1';
        $this->name = 'conform';
        $this->active = true;
        $this->client = null;
        $this->options = null;
    }

    public function init(ProjectNameContext $ctx, array $options): void
    {
        $this->client = $ctx->client;
        $this->options = $options;
        $this->active = ($options['active'] ?? null) === true;
    }

    public function PreRequest(ProjectNameContext $ctx): void
    {
        if (!$this->active) {
            return;
        }
        $spec = $ctx->spec;
        $point = $ctx->point;
        if ($spec === null || !is_array($point)) {
            return;
        }

        if (!is_array($spec->headers)) {
            $spec->headers = [];
        }

        if ($this->_credential($ctx, $spec, $point)) {
            $this->_record('credential');
        }

        if ($this->_form($spec, $point)) {
            $this->_record('form');
        }
    }

    // The credential header is the client's `auth.name`, else Authorization.
    // The call passes it under a header argument the point declares with that
    // name, or under the name itself: apidef drops an Authorization parameter,
    // as OpenAPI 3 says to (voxgig/apidef#186), so the token call declares
    // none. Either way it goes as the header, and not in the body.
    private function _credential(ProjectNameContext $ctx, mixed $spec, array $point): bool
    {
        $options = $ctx->client !== null ? $ctx->client->options_map() : [];
        $authname = $options['auth']['name'] ?? null;
        $credname = is_string($authname) && $authname !== '' ? strtolower($authname) : self::CRED_NAME;

        $names = [$credname];
        foreach (($point['args']['header'] ?? []) as $arg) {
            $name = is_array($arg) ? ($arg['name'] ?? null) : null;
            if (!is_string($name) || $name === '') {
                continue;
            }

            $orig = $arg['orig'] ?? null;
            if (strtolower(is_string($orig) && $orig !== '' ? $orig : $name) === $credname) {
                array_unshift($names, $name);
            }
        }

        foreach ($names as $name) {
            $val = ($ctx->reqmatch ?? [])[$name] ?? null;
            if ($val === null) {
                $val = ($ctx->reqdata ?? [])[$name] ?? null;
            }
            if ($val === null || $val === '') {
                continue;
            }

            self::_dropHeader($spec->headers, $credname);
            $spec->headers[$credname] = (string)$val;

            if (is_array($spec->body)) {
                unset($spec->body[$name]);
            }

            return true;
        }

        return false;
    }

    private function _form(mixed $spec, array $point): bool
    {
        $body = $point['body'] ?? [];
        if (($body['kind'] ?? null) !== 'form') {
            return false;
        }

        $data = $spec->body;
        if (!is_array($data) || (array_is_list($data) && $data !== [])) {
            return false;
        }

        $pairs = [];
        foreach ($data as $key => $val) {
            if ($val === null) {
                continue;
            }
            foreach ((is_array($val) && array_is_list($val) ? $val : [$val]) as $item) {
                $pairs[] = urlencode((string)$key) . '=' . urlencode(self::_formValue($item));
            }
        }

        $spec->body = implode('&', $pairs);

        self::_dropHeader($spec->headers, 'content-type');
        $media = $body['media'] ?? null;
        $spec->headers['content-type'] =
            is_string($media) && $media !== '' ? $media : 'application/x-www-form-urlencoded';

        return true;
    }

    private function _record(string $kind): void
    {
        $client = $this->client;
        if ($client === null) {
            return;
        }
        if (!isset($client->_conform)) {
            $client->_conform = ['form' => 0, 'credential' => 0];
        }
        $client->_conform[$kind]++;
    }

    // Remove a header whatever its case.
    private static function _dropHeader(array &$headers, string $name): void
    {
        foreach (array_keys($headers) as $key) {
            if (is_string($key) && strtolower($key) === $name) {
                unset($headers[$key]);
            }
        }
    }

    // A value as the ts URLSearchParams writes it: booleans as true/false,
    // records as JSON.
    private static function _formValue(mixed $item): string
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
