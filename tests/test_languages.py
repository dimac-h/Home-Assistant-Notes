"""Tests for the supported-language catalog."""
from __future__ import annotations

import pytest

from custom_components.home_assistant_notes.languages import (
    SUPPORTED_LANGUAGES,
    default_pair,
    dictionary_url,
)


@pytest.mark.parametrize(
    ("ha_language", "expected"),
    [
        ("nl", ["nl", "en"]),
        ("nl-NL", ["nl", "en"]),
        ("nl_NL", ["nl", "en"]),
        ("NL-be", ["nl", "en"]),
        ("tr", ["tr", "en"]),
        ("en-GB", ["en", "nl"]),
        ("en", ["en", "nl"]),
        ("xx", ["en", "nl"]),
        ("", ["en", "nl"]),
    ],
)
def test_default_pair(ha_language: str, expected: list[str]) -> None:
    assert default_pair(ha_language) == expected


def test_dictionary_url_is_pinned() -> None:
    assert (
        dictionary_url(SUPPORTED_LANGUAGES["nl"], "index.dic")
        == "https://cdn.jsdelivr.net/npm/dictionary-nl@2.0.0/index.dic"
    )


def test_catalog_contents() -> None:
    assert list(SUPPORTED_LANGUAGES) == ["en", "nl", "tr"]
    assert SUPPORTED_LANGUAGES["en"].name == "English"
    assert SUPPORTED_LANGUAGES["en"].version == "4.0.0"
    assert SUPPORTED_LANGUAGES["tr"].name == "Türkçe"
    assert SUPPORTED_LANGUAGES["tr"].tinyld == "tr"
