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


EXPECTED = {
    "en": ("English", "4.0.0", "en"),
    "nl": ("Nederlands", "2.0.0", "nl"),
    "tr": ("Türkçe", "2.0.0", "tr"),
    "fr": ("Français", "3.0.0", "fr"),
    "de": ("Deutsch", "3.0.0", "de"),
    "es": ("Español", "4.0.0", "es"),
    "pt": ("Português", "4.0.0", "pt"),
    "it": ("Italiano", "2.0.0", "it"),
    "el": ("Ελληνικά", "4.0.0", "el"),
    "sv": ("Svenska", "4.0.0", "sv"),
    "nb": ("Norsk bokmål", "3.0.0", "no"),
    "hu": ("Magyar", "3.0.0", "hu"),
    "ro": ("Română", "3.0.0", "ro"),
    "ru": ("Русский", "3.0.0", "ru"),
    "pl": ("Polski", "2.0.0", "pl"),
    "he": ("עברית", "2.0.0", "he"),
    "ko": ("한국어", "2.0.0", "ko"),
}


def test_catalog_contents() -> None:
    assert set(SUPPORTED_LANGUAGES) == set(EXPECTED)
    assert list(SUPPORTED_LANGUAGES)[:2] == ["en", "nl"]
    for code, (name, version, tinyld) in EXPECTED.items():
        lang = SUPPORTED_LANGUAGES[code]
        assert lang.code == code
        assert lang.package == f"dictionary-{code}"
        assert (lang.name, lang.version, lang.tinyld) == (name, version, tinyld)


def test_french_url_and_new_pairs() -> None:
    assert (
        dictionary_url(SUPPORTED_LANGUAGES["fr"], "index.aff")
        == "https://cdn.jsdelivr.net/npm/dictionary-fr@3.0.0/index.aff"
    )
    assert default_pair("fr") == ["fr", "en"]
    assert default_pair("nb-NO") == ["nb", "en"]
