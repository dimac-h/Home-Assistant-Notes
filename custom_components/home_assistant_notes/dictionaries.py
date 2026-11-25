"""Download Hunspell dictionaries into the HA config dir so the panel can load them."""
from __future__ import annotations

import asyncio
import logging
import os
import shutil
from collections.abc import Callable
from typing import Literal

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import DICTIONARIES_URL_PATH, DICTIONARY_FILES, DICTIONARY_MAX_BYTES
from .languages import SUPPORTED_LANGUAGES, dictionary_url

_LOGGER = logging.getLogger(__name__)

type Status = Literal["missing", "downloading", "ready", "failed"]


class DictionaryError(Exception):
    """A dictionary download or its validation failed."""


def _validate(filename: str, body: bytes) -> None:
    """Raise DictionaryError unless the body is a plausible dictionary file."""
    if not body:
        raise DictionaryError(f"{filename} is empty")
    if filename.endswith(".dic"):
        first_line = body.split(b"\n", 1)[0].decode("utf-8-sig", errors="ignore").strip()
        try:
            int(first_line)
        except ValueError as err:
            raise DictionaryError(f"{filename} does not start with a word count") from err


def _files_valid(directory: str) -> bool:
    """Return True if both dictionary files exist in the directory and look valid."""
    try:
        for filename in DICTIONARY_FILES:
            with open(os.path.join(directory, filename), "rb") as file:
                body = file.read(DICTIONARY_MAX_BYTES + 1)
            if len(body) > DICTIONARY_MAX_BYTES:
                return False
            _validate(filename, body)
    except (OSError, DictionaryError):
        return False
    return True


def _install(base: str, code: str, bodies: dict[str, bytes]) -> None:
    """Write the files to a temp dir next to the target, then move it into place."""
    target = os.path.join(base, code)
    temp = os.path.join(base, f".{code}.tmp")
    shutil.rmtree(temp, ignore_errors=True)
    os.makedirs(temp)
    try:
        for filename, body in bodies.items():
            with open(os.path.join(temp, filename), "wb") as file:
                file.write(body)
        shutil.rmtree(target, ignore_errors=True)
        os.replace(temp, target)
    finally:
        shutil.rmtree(temp, ignore_errors=True)


def _scan(base: str) -> set[str]:
    """Return the codes of the languages whose files are already on disk and valid."""
    return {code for code in SUPPORTED_LANGUAGES if _files_valid(os.path.join(base, code))}


class DictionaryManager:
    """Downloads and tracks the dictionary files of the supported languages."""

    def __init__(self, hass: HomeAssistant, on_change: Callable[[], None] | None = None) -> None:
        self._hass = hass
        self._on_change = on_change
        self.base_path = hass.config.path("home_assistant_notes", "dictionaries")
        self._status: dict[str, Status] = {}
        self._in_flight: dict[str, asyncio.Future[None]] = {}

    async def async_load(self) -> None:
        """Create the base directory and pick up dictionaries that are already on disk."""

        def _prepare() -> set[str]:
            os.makedirs(self.base_path, exist_ok=True)
            return _scan(self.base_path)

        changed = False
        for code in await self._hass.async_add_executor_job(_prepare):
            if self._status.get(code) != "ready":
                self._status[code] = "ready"
                changed = True
        if changed:
            self._notify()

    def _notify(self) -> None:
        if self._on_change is not None:
            self._on_change()

    def _set_status(self, code: str, status: Status) -> None:
        if self.status(code) != status:
            self._status[code] = status
            self._notify()

    def status(self, code: str) -> Status:
        return self._status.get(code, "missing")

    def url_for(self, code: str, filename: str) -> str:
        return f"{DICTIONARIES_URL_PATH}/{code}/{filename}"

    async def async_ensure(self, codes: list[str]) -> None:
        """Download every listed language that is not ready yet, one after another."""
        for code in codes:
            if code not in SUPPORTED_LANGUAGES:
                _LOGGER.warning("Ignoring unsupported spellcheck language %s", code)
                continue
            if self.status(code) == "ready":
                continue
            if (pending := self._in_flight.get(code)) is not None:
                await asyncio.shield(pending)
                continue
            future = self._hass.loop.create_future()
            self._in_flight[code] = future
            self._set_status(code, "downloading")
            try:
                await self._async_download(code)
                self._set_status(code, "ready")
            except (DictionaryError, aiohttp.ClientError, TimeoutError, OSError) as err:
                _LOGGER.warning("Could not download the %s dictionary: %s", code, err)
                self._set_status(code, "failed")
            finally:
                del self._in_flight[code]
                future.set_result(None)

    async def _async_download(self, code: str) -> None:
        language = SUPPORTED_LANGUAGES[code]
        session = async_get_clientsession(self._hass)
        bodies: dict[str, bytes] = {}
        for filename in DICTIONARY_FILES:
            url = dictionary_url(language, filename)
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=120)) as response:
                if response.status != 200:
                    raise DictionaryError(f"{url} returned HTTP {response.status}")
                body = bytearray()
                async for chunk in response.content.iter_chunked(64 * 1024):
                    body.extend(chunk)
                    if len(body) > DICTIONARY_MAX_BYTES:
                        raise DictionaryError(f"{url} is larger than the size limit")
            _validate(filename, bytes(body))
            bodies[filename] = bytes(body)
        await self._hass.async_add_executor_job(_install, self.base_path, code, bodies)
