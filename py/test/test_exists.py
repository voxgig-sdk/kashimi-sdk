# Kashimi SDK exists test

import pytest
from kashimi_sdk import KashimiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KashimiSDK.test(None, None)
        assert testsdk is not None
