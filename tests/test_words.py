"""Tests for WordsStorage."""
from __future__ import annotations

from typing import TYPE_CHECKING

import pytest

from custom_components.home_assistant_notes.words import WordsStorage

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant


@pytest.fixture
async def words(hass: HomeAssistant) -> WordsStorage:
    w = WordsStorage(hass)
    await w.async_load()
    return w


async def test_empty_lists(words: WordsStorage) -> None:
    assert words.get_lists() == {"dictionary": {}, "ignored": []}


async def test_add_and_remove_dictionary_word(words: WordsStorage) -> None:
    await words.async_add_dictionary_word("nl", "Hoi")
    await words.async_add_dictionary_word("tr", "Ayşe")
    assert words.get_lists()["dictionary"] == {"nl": ["hoi"], "tr": ["ayşe"]}
    await words.async_remove_dictionary_word("nl", "HOI")
    assert words.get_lists()["dictionary"] == {"tr": ["ayşe"]}


async def test_add_and_remove_ignored_word(words: WordsStorage) -> None:
    await words.async_add_ignored_word("Zigbee")
    await words.async_add_ignored_word("Alpha")
    assert words.get_lists()["ignored"] == ["alpha", "zigbee"]
    await words.async_remove_ignored_word("ALPHA")
    assert words.get_lists()["ignored"] == ["zigbee"]


async def test_dedupe_and_lowercase(words: WordsStorage) -> None:
    await words.async_add_dictionary_word("tr", "Ayşe")
    await words.async_add_dictionary_word("tr", "ayşe")
    await words.async_add_ignored_word("Foo")
    await words.async_add_ignored_word(" foo ")
    assert words.get_lists()["dictionary"]["tr"] == ["ayşe"]
    assert words.get_lists()["ignored"] == ["foo"]


async def test_unicode_normalized(words: WordsStorage) -> None:
    await words.async_add_ignored_word("café")
    await words.async_add_ignored_word("café")
    assert words.get_lists()["ignored"] == ["café"]


async def test_persistence(hass: HomeAssistant, words: WordsStorage) -> None:
    await words.async_add_dictionary_word("en", "Kubernetes")
    await words.async_add_ignored_word("xyzzy")
    reloaded = WordsStorage(hass)
    await reloaded.async_load()
    assert reloaded.get_lists() == {"dictionary": {"en": ["kubernetes"]}, "ignored": ["xyzzy"]}


@pytest.mark.parametrize("bad", ["", "   "])
async def test_rejects_empty(words: WordsStorage, bad: str) -> None:
    with pytest.raises(ValueError):
        await words.async_add_dictionary_word("en", bad)
    with pytest.raises(ValueError):
        await words.async_add_ignored_word(bad)


async def test_unknown_lang_accepted(words: WordsStorage) -> None:
    await words.async_add_dictionary_word("xx", "word")
    assert words.get_lists()["dictionary"] == {"xx": ["word"]}


async def test_remove_missing_is_noop(words: WordsStorage) -> None:
    await words.async_remove_dictionary_word("en", "nope")
    await words.async_remove_ignored_word("nope")
    assert words.get_lists() == {"dictionary": {}, "ignored": []}
