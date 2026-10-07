"""Fixtures for testing the Home Assistant Notes integration."""
from __future__ import annotations

from typing import TYPE_CHECKING
from unittest.mock import MagicMock, patch

import pytest
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry, mock_component

from custom_components.better_notes.const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

pytest_plugins = "pytest_homeassistant_custom_component"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Enable custom integration loading in every test."""
    return enable_custom_integrations


@pytest.fixture(autouse=True)
def mock_frontend_component(hass: HomeAssistant) -> None:
    """Declared as a dependency in manifest.json; the real component needs hass_frontend."""
    mock_component(hass, "frontend")


@pytest.fixture
def add_extra_js_url_mock() -> MagicMock:
    """Stub the frontend's extra-module registry (the frontend package isn't installed in tests)."""
    with patch("custom_components.better_notes.add_extra_js_url") as mock:
        yield mock


@pytest.fixture
async def setup_integration(hass: HomeAssistant, add_extra_js_url_mock: MagicMock) -> MockConfigEntry:
    """Set up the better_notes integration with a fresh store."""
    # better_notes registers a static path on hass.http during setup, which
    # is None until the "http" component itself has been set up.
    await async_setup_component(hass, "http", {})
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry
