"""Tests for the Home Assistant Notes config flow."""
from __future__ import annotations

from typing import TYPE_CHECKING
from unittest.mock import AsyncMock, patch

from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant.common import MockConfigEntry

from custom_components.home_assistant_notes.const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant


async def test_user_flow_creates_entry(hass: HomeAssistant) -> None:
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER},
    )
    assert result["type"] == FlowResultType.FORM

    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert result["title"] == "Home Assistant Notes"


async def test_user_flow_aborts_if_already_configured(hass: HomeAssistant) -> None:
    entry = MockConfigEntry(domain=DOMAIN)
    entry.add_to_hass(hass)

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER},
    )
    assert result["type"] == FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def _start_options(hass: HomeAssistant, entry: MockConfigEntry):
    return await hass.config_entries.options.async_init(entry.entry_id)


async def test_options_flow_shows_defaults_for_ha_language(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    hass.config.language = "nl"
    result = await _start_options(hass, setup_integration)

    assert result["type"] == FlowResultType.FORM
    assert result["step_id"] == "init"
    defaults = {str(key): key.default() for key in result["data_schema"].schema}
    assert defaults == {"language_1": "nl", "language_2": "en"}


async def test_options_flow_rejects_identical_languages(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    result = await _start_options(hass, setup_integration)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"language_1": "nl", "language_2": "nl"}
    )

    assert result["type"] == FlowResultType.FORM
    assert result["errors"] == {"base": "same_language"}


async def test_options_flow_stores_pair_and_downloads(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    manager = setup_integration.runtime_data.dictionaries
    with patch.object(manager, "async_ensure", new=AsyncMock()) as ensure:
        result = await _start_options(hass, setup_integration)
        result = await hass.config_entries.options.async_configure(
            result["flow_id"], {"language_1": "tr", "language_2": "en"}
        )
        await hass.async_block_till_done()

    assert result["type"] == FlowResultType.CREATE_ENTRY
    assert setup_integration.options["languages"] == ["tr", "en"]
    ensure.assert_awaited_once_with(["tr", "en"])
