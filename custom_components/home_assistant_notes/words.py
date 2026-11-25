"""Storage for the shared spellcheck word lists."""
from __future__ import annotations

import logging
import unicodedata
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import WORDS_STORAGE_KEY, WORDS_STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)


def normalize_word(word: str) -> str:
    """Trim, Unicode-normalize (NFC) and lowercase a word; reject empty words."""
    normalized = unicodedata.normalize("NFC", word.strip()).lower()
    if not normalized:
        raise ValueError("Word must not be empty")
    return normalized


class WordsStorage:
    """Personal dictionary (per language) and ignore list (language-independent)."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the storage handler."""
        self.hass = hass
        self._store = Store(hass, WORDS_STORAGE_VERSION, WORDS_STORAGE_KEY)
        self._dictionary: dict[str, list[str]] = {}
        self._ignored: list[str] = []

    async def async_load(self) -> None:
        """Load the word lists from storage."""
        data = await self._store.async_load() or {}
        self._dictionary = {
            lang: sorted(set(words)) for lang, words in data.get("dictionary", {}).items() if words
        }
        self._ignored = sorted(set(data.get("ignored", [])))

    async def _async_save(self) -> None:
        await self._store.async_save(self.get_lists())

    def get_lists(self) -> dict[str, Any]:
        """Return copies of both lists."""
        return {
            "dictionary": {lang: list(words) for lang, words in self._dictionary.items()},
            "ignored": list(self._ignored),
        }

    async def async_add_dictionary_word(self, lang: str, word: str) -> None:
        """Add a word to a language's personal dictionary."""
        word = normalize_word(word)
        self._dictionary[lang] = sorted({*self._dictionary.get(lang, []), word})
        await self._async_save()

    async def async_remove_dictionary_word(self, lang: str, word: str) -> None:
        """Remove a word from a language's personal dictionary."""
        word = normalize_word(word)
        words = [w for w in self._dictionary.get(lang, []) if w != word]
        if words:
            self._dictionary[lang] = words
        else:
            self._dictionary.pop(lang, None)
        await self._async_save()

    async def async_add_ignored_word(self, word: str) -> None:
        """Add a word to the ignore list."""
        self._ignored = sorted({*self._ignored, normalize_word(word)})
        await self._async_save()

    async def async_remove_ignored_word(self, word: str) -> None:
        """Remove a word from the ignore list."""
        word = normalize_word(word)
        self._ignored = [w for w in self._ignored if w != word]
        await self._async_save()
