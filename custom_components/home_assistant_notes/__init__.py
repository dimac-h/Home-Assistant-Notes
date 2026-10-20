"""The Home Assistant Notes integration."""
from __future__ import annotations

import logging
import voluptuous as vol

from homeassistant.components.frontend import (
    add_extra_js_url,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import (
    CARD_MODULE_URL,
    DOMAIN,
    SERVICE_CREATE_NOTE,
    SERVICE_UPDATE_NOTE,
    SERVICE_DELETE_NOTE,
    SERVICE_GET_NOTES,
    ATTR_NOTE_ID,
    ATTR_TITLE,
    ATTR_CONTENT,
    ATTR_COLOR,
    ATTR_PINNED,
    ATTR_TAGS,
    DEFAULT_COLOR,
    PANEL_TITLE,
    PANEL_ICON,
    PANEL_URL,
    PANEL_COMPONENT_NAME,
)
from .storage import NotesStorage

_LOGGER = logging.getLogger(__name__)

type NotesConfigEntry = ConfigEntry[NotesStorage]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

# Module-level set to track registered static paths (persists across reloads)
_REGISTERED_STATIC_PATHS: set[str] = set()

# Service schemas
CREATE_NOTE_SCHEMA = vol.Schema({
    vol.Required(ATTR_TITLE): cv.string,
    vol.Optional(ATTR_CONTENT, default=""): cv.string,
    vol.Optional(ATTR_COLOR, default=DEFAULT_COLOR): vol.Match(r'^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$'),
    vol.Optional(ATTR_PINNED, default=False): cv.boolean,
    vol.Optional(ATTR_TAGS, default=list): [cv.string],
})

UPDATE_NOTE_SCHEMA = vol.Schema({
    vol.Required(ATTR_NOTE_ID): cv.string,
    vol.Optional(ATTR_TITLE): cv.string,
    vol.Optional(ATTR_CONTENT): cv.string,
    vol.Optional(ATTR_COLOR): vol.Match(r'^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$'),
    vol.Optional(ATTR_PINNED): cv.boolean,
    vol.Optional(ATTR_TAGS): [cv.string],
})

DELETE_NOTE_SCHEMA = vol.Schema({
    vol.Required(ATTR_NOTE_ID): cv.string,
})


def _get_storage(hass: HomeAssistant) -> NotesStorage:
    """Return the storage of the loaded config entry, or raise if there is none."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.state is ConfigEntryState.LOADED:
            return entry.runtime_data
    raise ServiceValidationError(
        translation_domain=DOMAIN,
        translation_key="not_loaded",
    )


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the services; they live as long as Home Assistant, not the config entry."""

    async def handle_create_note(call: ServiceCall) -> dict:
        """Handle the create note service."""
        note = await _get_storage(hass).async_create_note(
            title=call.data[ATTR_TITLE],
            content=call.data[ATTR_CONTENT],
            color=call.data[ATTR_COLOR],
            pinned=call.data[ATTR_PINNED],
            tags=call.data[ATTR_TAGS],
        )
        hass.bus.async_fire(f"{DOMAIN}_note_created", note)
        return note

    async def handle_update_note(call: ServiceCall) -> None:
        """Handle the update note service."""
        note = await _get_storage(hass).async_update_note(
            note_id=call.data[ATTR_NOTE_ID],
            title=call.data.get(ATTR_TITLE),
            content=call.data.get(ATTR_CONTENT),
            color=call.data.get(ATTR_COLOR),
            pinned=call.data.get(ATTR_PINNED),
            tags=call.data.get(ATTR_TAGS),
        )
        if note is None:
            raise HomeAssistantError(f"Note {call.data[ATTR_NOTE_ID]} not found")
        hass.bus.async_fire(f"{DOMAIN}_note_updated", note)

    async def handle_delete_note(call: ServiceCall) -> None:
        """Handle the delete note service."""
        success = await _get_storage(hass).async_delete_note(call.data[ATTR_NOTE_ID])
        if not success:
            raise HomeAssistantError(f"Note {call.data[ATTR_NOTE_ID]} not found")
        hass.bus.async_fire(
            f"{DOMAIN}_note_deleted",
            {ATTR_NOTE_ID: call.data[ATTR_NOTE_ID]}
        )

    async def handle_get_notes(call: ServiceCall) -> dict:
        """Handle the get notes service."""
        notes = await _get_storage(hass).async_get_all_notes()
        return {"notes": notes}

    hass.services.async_register(
        DOMAIN, SERVICE_CREATE_NOTE, handle_create_note,
        schema=CREATE_NOTE_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_UPDATE_NOTE, handle_update_note, schema=UPDATE_NOTE_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_DELETE_NOTE, handle_delete_note, schema=DELETE_NOTE_SCHEMA
    )
    hass.services.async_register(
        DOMAIN, SERVICE_GET_NOTES, handle_get_notes, supports_response=SupportsResponse.ONLY
    )
    return True


async def async_setup_entry(hass: HomeAssistant, entry: NotesConfigEntry) -> bool:
    """Set up Home Assistant Notes from a config entry."""
    storage = NotesStorage(hass)
    await storage.async_load()
    entry.runtime_data = storage

    # Register frontend panel
    if "/home_assistant_notes_panel" not in _REGISTERED_STATIC_PATHS:
        await hass.http.async_register_static_paths([
            StaticPathConfig(
                url_path="/home_assistant_notes_panel",
                path=hass.config.path("custom_components/home_assistant_notes/www"),
                cache_headers=False,
            )
        ])
        _REGISTERED_STATIC_PATHS.add("/home_assistant_notes_panel")

    # Load the Lovelace card on every dashboard so it shows up in the card picker
    # without users having to add a dashboard resource by hand
    add_extra_js_url(hass, CARD_MODULE_URL)

    await async_register_panel(
        hass,
        frontend_url_path=PANEL_URL,
        webcomponent_name=PANEL_COMPONENT_NAME,
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        module_url="/home_assistant_notes_panel/home-assistant-notes-panel.js",
        embed_iframe=False,
        require_admin=False,
        handle_safe_area=True,
    )

    _LOGGER.info("Home Assistant Notes integration setup complete")
    return True


async def async_unload_entry(hass: HomeAssistant, entry: NotesConfigEntry) -> bool:
    """Unload a config entry."""
    async_remove_panel(hass, PANEL_URL)
    remove_extra_js_url(hass, CARD_MODULE_URL)
    return True
