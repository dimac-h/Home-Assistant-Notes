"""Config flow for Home Assistant Notes integration."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from .const import DOMAIN
from .languages import OPTION_LANGUAGES, SUPPORTED_LANGUAGES, get_language_pair

_LOGGER = logging.getLogger(__name__)


class HomeAssistantNotesConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Home Assistant Notes."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: config_entries.ConfigEntry) -> HomeAssistantNotesOptionsFlow:
        """Create the options flow."""
        return HomeAssistantNotesOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Handle the initial step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(title="Home Assistant Notes", data={})

        return self.async_show_form(step_id="user", data_schema=vol.Schema({}))


class HomeAssistantNotesOptionsFlow(config_entries.OptionsFlow):
    """Choose the two languages that spelling is checked in."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            first, second = user_input["language_1"], user_input["language_2"]
            if first == second:
                errors["base"] = "same_language"
            else:
                return self.async_create_entry(data={OPTION_LANGUAGES: [first, second]})
        else:
            first, second = get_language_pair(self.hass.config.language, self.config_entry.options)

        selector = SelectSelector(
            SelectSelectorConfig(
                options=[
                    SelectOptionDict(value=lang.code, label=lang.name)
                    for lang in SUPPORTED_LANGUAGES.values()
                ],
                mode=SelectSelectorMode.DROPDOWN,
            )
        )
        schema = vol.Schema({
            vol.Required("language_1", default=first): selector,
            vol.Required("language_2", default=second): selector,
        })
        return self.async_show_form(step_id="init", data_schema=schema, errors=errors)
