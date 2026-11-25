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


async def test_on_change_called_per_transition(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    statuses = []
    manager = DictionaryManager(hass, on_change=lambda: statuses.append(manager.status("nl")))
    await manager.async_load()
    await manager.async_ensure(["nl"])
    assert statuses == ["downloading", "ready"]


async def test_on_change_called_on_failure(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl", status=404)
    statuses = []
    manager = DictionaryManager(hass, on_change=lambda: statuses.append(manager.status("nl")))
    await manager.async_load()
    await manager.async_ensure(["nl"])
    assert statuses == ["downloading", "failed"]


async def test_on_change_not_called_when_already_ready(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    await (await _manager(hass)).async_ensure(["nl"])
    calls = []
    manager = DictionaryManager(hass, on_change=lambda: calls.append(1))
    await manager.async_load()
    calls.clear()
    await manager.async_ensure(["nl"])
    assert calls == []


async def test_on_change_called_once_when_load_finds_files(hass: HomeAssistant, aioclient_mock) -> None:
    _mock(aioclient_mock, "nl")
    await (await _manager(hass)).async_ensure(["nl"])
    calls = []
    await DictionaryManager(hass, on_change=lambda: calls.append(1)).async_load()
    assert calls == [1]


async def test_unexpected_exception_fails_and_continues(hass: HomeAssistant, aioclient_mock) -> None:
    from unittest.mock import patch

    _mock(aioclient_mock, "tr")
    statuses = []
    manager = DictionaryManager(hass, on_change=lambda: statuses.append(manager.status("nl")))
    await manager.async_load()
    original = manager._async_download

    async def flaky(code):
        if code == "nl":
            raise ValueError("boom")
        await original(code)

    with patch.object(manager, "_async_download", flaky):
        await manager.async_ensure(["nl", "tr"])
    assert manager.status("nl") == "failed"
    assert manager.status("tr") == "ready"
    assert statuses[:2] == ["downloading", "failed"]


async def test_cancellation_does_not_leave_downloading(hass: HomeAssistant) -> None:
    import asyncio
    from unittest.mock import patch

    manager = await _manager(hass)
    started = asyncio.Event()

    async def hang(code):
        started.set()
        await asyncio.sleep(3600)

    with patch.object(manager, "_async_download", hang):
        task = hass.async_create_task(manager.async_ensure(["nl"]))
        waiter = hass.async_create_task(manager.async_ensure(["nl"]))
        await started.wait()
        await asyncio.sleep(0)
        task.cancel()
        with pytest.raises(asyncio.CancelledError):
            await task
        await asyncio.wait_for(waiter, 1)  # waiter woken, no deadlock
    assert manager.status("nl") == "failed"
    assert not manager._in_flight


async def test_retry_succeeds_after_first_failure(hass: HomeAssistant, aioclient_mock) -> None:
    from unittest.mock import patch

    _mock(aioclient_mock, "nl", status=500)
    manager = await _manager(hass)
    sleeps = []

    async def fake_sleep(delay):
        sleeps.append(delay)
        aioclient_mock.clear_requests()
        _mock(aioclient_mock, "nl")

    with patch("custom_components.home_assistant_notes.dictionaries._sleep", fake_sleep):
        await manager.async_ensure_with_retry(["nl"], delays=(1, 2, 3))
    assert manager.status("nl") == "ready"
    assert sleeps == [1]


async def test_retry_stops_after_all_delays(hass: HomeAssistant, aioclient_mock) -> None:
    from unittest.mock import patch

    _mock(aioclient_mock, "nl", status=500)
    manager = await _manager(hass)
    sleeps = []

    async def fake_sleep(delay):
        sleeps.append(delay)

    with patch("custom_components.home_assistant_notes.dictionaries._sleep", fake_sleep):
        await manager.async_ensure_with_retry(["nl"], delays=(1, 2, 3))
    assert manager.status("nl") == "failed"
    assert sleeps == [1, 2, 3]
    assert aioclient_mock.call_count == 4  # 1 request per attempt (first file 500s)


async def test_retry_only_failed_languages(hass: HomeAssistant, aioclient_mock) -> None:
    from unittest.mock import patch

    _mock(aioclient_mock, "nl", status=500)
    _mock(aioclient_mock, "tr")
    manager = await _manager(hass)

    async def fake_sleep(delay):
        pass

    with patch("custom_components.home_assistant_notes.dictionaries._sleep", fake_sleep):
        await manager.async_ensure_with_retry(["nl", "tr"], delays=(1,))
    tr_url = dictionary_url(SUPPORTED_LANGUAGES["tr"], "index.aff")
    assert sum(1 for call in aioclient_mock.mock_calls if str(call[1]) == tr_url) == 1
