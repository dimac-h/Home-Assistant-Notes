"""Canonical list of languages supported by spellcheck."""
from __future__ import annotations

import re
from dataclasses import dataclass

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
