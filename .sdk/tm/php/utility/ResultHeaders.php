<?php
declare(strict_types=1);

// Kashimi SDK utility: result_headers

class KashimiResultHeaders
{
    public static function call(KashimiContext $ctx): ?KashimiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
