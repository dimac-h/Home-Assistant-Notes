"""Canonical list of languages supported by spellcheck."""
from __future__ import annotations

import re
from collections.abc import Mapping
from dataclasses import dataclass
from typing import Any

OPTION_LANGUAGES = "languages"

DICTIONARY_BASE_URL = "https://cdn.jsdelivr.net/npm"


@dataclass(frozen=True)
class Language:
    """A spellcheck language and its pinned dictionary package."""

    code: str
    name: str
    package: str
    version: str
    tinyld: str


SUPPORTED_LANGUAGES: dict[str, Language] = {
    "en": Language("en", "English", "dictionary-en", "4.0.0", "en"),
    "nl": Language("nl", "Nederlands", "dictionary-nl", "2.0.0", "nl"),
    "tr": Language("tr", "Türkçe", "dictionary-tr", "2.0.0", "tr"),
    "fr": Language("fr", "Français", "dictionary-fr", "3.0.0", "fr"),
    "de": Language("de", "Deutsch", "dictionary-de", "3.0.0", "de"),
    "es": Language("es", "Español", "dictionary-es", "4.0.0", "es"),
    "pt": Language("pt", "Português", "dictionary-pt", "4.0.0", "pt"),
    "it": Language("it", "Italiano", "dictionary-it", "2.0.0", "it"),
    "el": Language("el", "Ελληνικά", "dictionary-el", "4.0.0", "el"),
    "sv": Language("sv", "Svenska", "dictionary-sv", "4.0.0", "sv"),
    "nb": Language("nb", "Norsk bokmål", "dictionary-nb", "3.0.0", "no"),
    "hu": Language("hu", "Magyar", "dictionary-hu", "3.0.0", "hu"),
    "ro": Language("ro", "Română", "dictionary-ro", "3.0.0", "ro"),
    "ru": Language("ru", "Русский", "dictionary-ru", "3.0.0", "ru"),
    "pl": Language("pl", "Polski", "dictionary-pl", "2.0.0", "pl"),
    "he": Language("he", "עברית", "dictionary-he", "2.0.0", "he"),
    "ko": Language("ko", "한국어", "dictionary-ko", "2.0.0", "ko"),
}


def dictionary_url(lang: Language, filename: str) -> str:
    """Return the pinned CDN URL of a dictionary file (index.aff / index.dic)."""
    return f"{DICTIONARY_BASE_URL}/{lang.package}@{lang.version}/{filename}"


def default_pair(ha_language: str) -> list[str]:
    """Default language pair: HA's language plus English, else English plus the first other."""
    primary = re.split(r"[-_]", ha_language.strip().lower())[0]
    if primary in SUPPORTED_LANGUAGES and primary != "en":
        return [primary, "en"]
    other = next(code for code in SUPPORTED_LANGUAGES if code != "en")
    return ["en", other]


def get_language_pair(ha_language: str, options: Mapping[str, Any]) -> list[str]:
    """The pair in effect: the stored options if valid, otherwise the default pair."""
    stored = options.get(OPTION_LANGUAGES)
    if (
        isinstance(stored, (list, tuple))
        and len(stored) == 2
        and stored[0] != stored[1]
        and all(code in SUPPORTED_LANGUAGES for code in stored)
    ):
        return list(stored)
    return default_pair(ha_language)
