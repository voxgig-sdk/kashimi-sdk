# Kashimi SDK utility: make_context

from projectname_sdk.core.context import KashimiContext


def make_context_util(ctxmap, basectx):
    return KashimiContext(ctxmap, basectx)
