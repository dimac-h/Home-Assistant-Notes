"""Tests for DictionaryManager."""
from __future__ import annotations

import os
from typing import TYPE_CHECKING

import pytest

from custom_components.home_assistant_notes.dictionaries import DictionaryManager
from custom_components.home_assistant_notes.languages import SUPPORTED_LANGUAGES, dictionary_url

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from pytest_homeassistant.test_util.aiohttp import AiohttpClientMocker

AFF = b"SET UTF-8\n"
DIC = b"2\nhello\nworld\n"


def _mock(aioclient_mock: AiohttpClientMocker, code: str, aff=AFF, dic=DIC, status=200) -> None:
    lang = SUPPORTED_LANGUAGES[code]
    aioclient_mock.get(dictionary_url(lang, "index.aff"), content=aff, status=status)
    aioclient_mock.get(dictionary_url(lang, "index.dic"), content=dic, status=status)


@pytest.fixture(autouse=True)
def isolated_config_dir(hass: HomeAssistant, tmp_path) -> None:
    """The test config dir is shared between tests; give each test its own."""
    hass.config.config_dir = str(tmp_path)


async def _manager(hass: HomeAssistant) -> DictionaryManager:
    manager = DictionaryManager(hass)
    await manager.async_load()
    return manager


def _files(manager: DictionaryManager, code: str) -> list[str]:
    path = os.path.join(manager.base_path, code)
    return sorted(os.listdir(path)) if os.path.isdir(path) else []


async def test_download_creates_files(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    manager = await _manager(hass)
    assert manager.status("nl") == "missing"
    await manager.async_ensure(["nl"])
    assert manager.status("nl") == "ready"
    assert await hass.async_add_executor_job(_files, manager, "nl") == ["index.aff", "index.dic"]
    assert manager.url_for("nl", "index.dic") == "/home_assistant_notes_dictionaries/nl/index.dic"


async def test_second_ensure_makes_no_requests(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    manager = await _manager(hass)
    await manager.async_ensure(["nl"])
    count = aioclient_mock.call_count
    await manager.async_ensure(["nl"])
    assert aioclient_mock.call_count == count


async def test_existing_files_are_ready_after_load(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    await (await _manager(hass)).async_ensure(["nl"])
    fresh = await _manager(hass)
    assert fresh.status("nl") == "ready"
    await fresh.async_ensure(["nl"])
    assert aioclient_mock.call_count == 2


async def test_http_error_fails_without_files(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl", status=404)
    manager = await _manager(hass)
    await manager.async_ensure(["nl"])
    assert manager.status("nl") == "failed"
    assert await hass.async_add_executor_job(_files, manager, "nl") == []


@pytest.mark.parametrize(
    ("aff", "dic"),
    [(b"", DIC), (AFF, b""), (AFF, b"not a number\nhello\n")],
)
async def test_invalid_body_fails_without_files(hass: HomeAssistant, aioclient_mock, aff, dic) -> None:
    _mock(aioclient_mock, "nl", aff=aff, dic=dic)
    manager = await _manager(hass)
    await manager.async_ensure(["nl"])
    assert manager.status("nl") == "failed"
    assert await hass.async_add_executor_job(_files, manager, "nl") == []
    assert await hass.async_add_executor_job(os.listdir, manager.base_path) == []


async def test_failure_does_not_stop_other_languages(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl", status=500)
    _mock(aioclient_mock, "tr")
    manager = await _manager(hass)
    await manager.async_ensure(["nl", "tr"])
    assert manager.status("nl") == "failed"
    assert manager.status("tr") == "ready"


async def test_failed_language_can_be_retried(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl", status=500)
    manager = await _manager(hass)
    await manager.async_ensure(["nl"])
    aioclient_mock.clear_requests()
    _mock(aioclient_mock, "nl")
    await manager.async_ensure(["nl"])
    assert manager.status("nl") == "ready"


async def test_concurrent_ensure_downloads_once(hass: HomeAssistant, aioclient_mock) -> None:
    import asyncio

    _mock(aioclient_mock, "nl")
    manager = await _manager(hass)
    await asyncio.gather(manager.async_ensure(["nl"]), manager.async_ensure(["nl"]))
    assert aioclient_mock.call_count == 2
    assert manager.status("nl") == "ready"


async def test_unknown_language_is_ignored(hass: HomeAssistant, aioclient_mock, caplog) -> None:
    manager = await _manager(hass)
    await manager.async_ensure(["xx"])
    assert manager.status("xx") == "missing"
    assert aioclient_mock.call_count == 0
    assert "xx" in caplog.text
