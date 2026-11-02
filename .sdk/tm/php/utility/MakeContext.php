<?php
declare(strict_types=1);

// Kashimi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KashimiMakeContext
{
    public static function call(array $ctxmap, ?KashimiContext $basectx): KashimiContext
    {
        return new KashimiContext($ctxmap, $basectx);
    }
}
