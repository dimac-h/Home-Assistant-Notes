"""The Home Assistant Notes integration."""
from __future__ import annotations

import logging
from dataclasses import dataclass

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.components.frontend import (
    add_extra_js_url,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant, callback, ServiceCall, SupportsResponse
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
    ATTR_SPELLCHECK,
    ATTR_TAGS,
    ATTR_LANG,
    ATTR_WORD,
    EVENT_SPELLCHECK_CHANGED,
    EVENT_WORDS_CHANGED,
    SERVICE_ADD_DICTIONARY_WORD,
    SERVICE_REMOVE_DICTIONARY_WORD,
    SERVICE_ADD_IGNORED_WORD,
    SERVICE_REMOVE_IGNORED_WORD,
    DEFAULT_COLOR,
    DICTIONARIES_URL_PATH,
    PANEL_TITLE,
    PANEL_ICON,
    PANEL_URL,
    PANEL_COMPONENT_NAME,
)
from .dictionaries import DictionaryManager
from .languages import SUPPORTED_LANGUAGES, get_language_pair
from .storage import NotesStorage
from .words import WordsStorage

_LOGGER = logging.getLogger(__name__)



@dataclass
class RuntimeData:
    """Per-entry runtime objects."""

    notes: NotesStorage
    words: WordsStorage
    dictionaries: DictionaryManager


type NotesConfigEntry = ConfigEntry[RuntimeData]

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
    vol.Optional(ATTR_SPELLCHECK, default=True): cv.boolean,
})

UPDATE_NOTE_SCHEMA = vol.Schema({
    vol.Required(ATTR_NOTE_ID): cv.string,
    vol.Optional(ATTR_TITLE): cv.string,
    vol.Optional(ATTR_CONTENT): cv.string,
    vol.Optional(ATTR_COLOR): vol.Match(r'^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$'),
    vol.Optional(ATTR_PINNED): cv.boolean,
    vol.Optional(ATTR_TAGS): [cv.string],
    vol.Optional(ATTR_SPELLCHECK): cv.boolean,
})

DELETE_NOTE_SCHEMA = vol.Schema({
    vol.Required(ATTR_NOTE_ID): cv.string,
})

ADD_REMOVE_DICTIONARY_WORD_SCHEMA = vol.Schema({
    vol.Required(ATTR_LANG): vol.In(list(SUPPORTED_LANGUAGES)),
    vol.Required(ATTR_WORD): cv.string,
})

IGNORED_WORD_SCHEMA = vol.Schema({
    vol.Required(ATTR_WORD): cv.string,
})


def _get_runtime_data(hass: HomeAssistant) -> RuntimeData:
    """Return the runtime data of the loaded config entry, or raise if there is none."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.state is ConfigEntryState.LOADED:
            return entry.runtime_data
    raise ServiceValidationError(
        translation_domain=DOMAIN,
        translation_key="not_loaded",
    )


def _get_storage(hass: HomeAssistant) -> NotesStorage:
    """Return the notes storage of the loaded config entry."""
    return _get_runtime_data(hass).notes


def _get_words(hass: HomeAssistant) -> WordsStorage:
    """Return the word lists storage of the loaded config entry."""
    return _get_runtime_data(hass).words


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/spellcheck_config"})
@callback
def ws_spellcheck_config(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Give the panel the language pair, dictionary files and word lists it needs."""
    entry = next(
        (e for e in hass.config_entries.async_entries(DOMAIN) if e.state is ConfigEntryState.LOADED),
        None,
    )
    if entry is None:
        connection.send_error(msg["id"], "not_loaded", "Home Assistant Notes is not set up.")
        return
    runtime: RuntimeData = entry.runtime_data
    languages = []
    for code in get_language_pair(hass.config.language, entry.options):
        language = SUPPORTED_LANGUAGES[code]
        languages.append({
            "code": code,
            "name": language.name,
            "tinyld": language.tinyld,
            "status": runtime.dictionaries.status(code),
            "aff_url": runtime.dictionaries.url_for(code, "index.aff"),
            "dic_url": runtime.dictionaries.url_for(code, "index.dic"),
        })
    connection.send_result(msg["id"], {"languages": languages, **runtime.words.get_lists()})


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the services; they live as long as Home Assistant, not the config entry."""
    websocket_api.async_register_command(hass, ws_spellcheck_config)

    async def handle_create_note(call: ServiceCall) -> dict:
        """Handle the create note service."""
        note = await _get_storage(hass).async_create_note(
            title=call.data[ATTR_TITLE],
            content=call.data[ATTR_CONTENT],
            color=call.data[ATTR_COLOR],
            pinned=call.data[ATTR_PINNED],
            tags=call.data[ATTR_TAGS],
            spellcheck=call.data[ATTR_SPELLCHECK],
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
            spellcheck=call.data.get(ATTR_SPELLCHECK),
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

    async def _change_words(coro) -> None:
        """Await a word list change, then broadcast the new lists."""
        try:
            await coro
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err
        hass.bus.async_fire(EVENT_WORDS_CHANGED, _get_words(hass).get_lists())

    async def handle_add_dictionary_word(call: ServiceCall) -> None:
        await _change_words(_get_words(hass).async_add_dictionary_word(
            call.data[ATTR_LANG], call.data[ATTR_WORD]))

    async def handle_remove_dictionary_word(call: ServiceCall) -> None:
        await _change_words(_get_words(hass).async_remove_dictionary_word(
            call.data[ATTR_LANG], call.data[ATTR_WORD]))

    async def handle_add_ignored_word(call: ServiceCall) -> None:
        await _change_words(_get_words(hass).async_add_ignored_word(call.data[ATTR_WORD]))

    async def handle_remove_ignored_word(call: ServiceCall) -> None:
        await _change_words(_get_words(hass).async_remove_ignored_word(call.data[ATTR_WORD]))

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
    for name, handler, schema in (
        (SERVICE_ADD_DICTIONARY_WORD, handle_add_dictionary_word, ADD_REMOVE_DICTIONARY_WORD_SCHEMA),
        (SERVICE_REMOVE_DICTIONARY_WORD, handle_remove_dictionary_word, ADD_REMOVE_DICTIONARY_WORD_SCHEMA),
        (SERVICE_ADD_IGNORED_WORD, handle_add_ignored_word, IGNORED_WORD_SCHEMA),
        (SERVICE_REMOVE_IGNORED_WORD, handle_remove_ignored_word, IGNORED_WORD_SCHEMA),
    ):
        hass.services.async_register(DOMAIN, name, handler, schema=schema)
    return True


def _start_dictionary_download(hass: HomeAssistant, entry: NotesConfigEntry) -> None:
    """Download the dictionaries of the current pair in the background."""
    pair = get_language_pair(hass.config.language, entry.options)
    entry.async_create_background_task(
        hass, entry.runtime_data.dictionaries.async_ensure_with_retry(pair), "home_assistant_notes_dictionaries"
    )


async def _async_options_updated(hass: HomeAssistant, entry: NotesConfigEntry) -> None:
    """Tell the panel the pair changed, then fetch the dictionaries it needs."""
    hass.bus.async_fire(EVENT_SPELLCHECK_CHANGED)
    _start_dictionary_download(hass, entry)


async def async_setup_entry(hass: HomeAssistant, entry: NotesConfigEntry) -> bool:
    """Set up Home Assistant Notes from a config entry."""
    notes_storage = NotesStorage(hass)
    await notes_storage.async_load()
    words_storage = WordsStorage(hass)
    await words_storage.async_load()
    dictionaries = DictionaryManager(
        hass, on_change=lambda: hass.bus.async_fire(EVENT_SPELLCHECK_CHANGED)
    )
    await dictionaries.async_load()
    entry.runtime_data = RuntimeData(
        notes=notes_storage, words=words_storage, dictionaries=dictionaries
    )

    _start_dictionary_download(hass, entry)
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))

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

    # Downloaded spellcheck dictionaries (the directory is created by async_load)
    if DICTIONARIES_URL_PATH not in _REGISTERED_STATIC_PATHS:
        await hass.http.async_register_static_paths([
            StaticPathConfig(
                url_path=DICTIONARIES_URL_PATH,
                path=dictionaries.base_path,
                cache_headers=True,
            )
        ])
        _REGISTERED_STATIC_PATHS.add(DICTIONARIES_URL_PATH)

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
