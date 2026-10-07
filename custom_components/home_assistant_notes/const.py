"""Constants for the Home Assistant Notes integration."""

DOMAIN = "home_assistant_notes"
STORAGE_VERSION = 1
STORAGE_KEY = f"{DOMAIN}.notes"

# Services
SERVICE_CREATE_NOTE = "create_note"
SERVICE_UPDATE_NOTE = "update_note"
SERVICE_DELETE_NOTE = "delete_note"
SERVICE_GET_NOTES = "get_notes"

# Attributes
ATTR_NOTE_ID = "note_id"
ATTR_TITLE = "title"
ATTR_CONTENT = "content"
ATTR_COLOR = "color"
ATTR_PINNED = "pinned"
ATTR_CREATED = "created"
ATTR_MODIFIED = "modified"
ATTR_TAGS = "tags"

# Default values
DEFAULT_COLOR = "#FFEB3B"
DEFAULT_COLORS = [
    "#FFEB3B",  # Yellow
    "#FF9800",  # Orange
    "#F44336",  # Red
    "#E91E63",  # Pink
    "#9C27B0",  # Purple
    "#3F51B5",  # Indigo
    "#2196F3",  # Blue
    "#00BCD4",  # Cyan
    "#009688",  # Teal
    "#4CAF50",  # Green
]

# Panel configuration
PANEL_TITLE = "Home Assistant Notes"
PANEL_ICON = "mdi:note-multiple"
PANEL_URL = "home-assistant-notes"
PANEL_COMPONENT_NAME = "home-assistant-notes-panel"

# Lovelace card module, served from the same static path as the panel
CARD_MODULE_URL = "/home_assistant_notes_panel/home-assistant-notes-card.js"
