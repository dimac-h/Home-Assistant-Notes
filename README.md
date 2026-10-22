# Home Assistant Notes

**Home Assistant Notes** is an Apple Notes-style notepad for Home Assistant: a full-page sidebar panel with a rich text editor, checklists, colored sticky notes, and a Lovelace card to show notes on any dashboard. Use it for shopping lists, household notes, or reminders the whole family can see, without leaving Home Assistant. Works on desktop, phone, and wall tablets, in light and dark mode.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dimac-h&repository=Home-Assistant-Notes&category=integration)
[![Add Integration to your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_assistant_notes)

<table>
<tr>
<td><img src="https://raw.githubusercontent.com/dimac-h/Home-Assistant-Notes/main/images/screenshot.png" alt="Home Assistant Notes panel on desktop" width="600" height="400"></td>
<td><img src="https://raw.githubusercontent.com/dimac-h/Home-Assistant-Notes/main/images/screenshot-mobile.png" alt="Home Assistant Notes panel on mobile" width="300" height="400"></td>
</tr>
</table>

## Features

- Rich text editing via [Tiptap](https://tiptap.dev/) headings, bold, italic, lists, checklists, highlights, links and code
- Ten note colors with pin support
- Real-time search
- Dashboard card to display notes on any view with filter and configuration options
- Auto-save
- Dark mode

## Installation

### HACS (recommended)

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

Find the integration directly in the Home Assistant Marketplace (formerly HACS)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dimac-h&repository=Home-Assistant-Notes&category=integration)

### Manual

Download `home_assistant_notes.zip` from the [latest release](https://github.com/dimac-h/Home-Assistant-Notes/releases/latest), unzip it into `custom_components/home_assistant_notes` in your HA config directory, and restart. (Copying the folder straight from the repository won't work: the built frontend is only included in release zips.)

### Setup

Go to **Settings → Devices & Services → Add Integration** and search for *Home Assistant Notes*, or click the shortcut button below. The panel appears in the sidebar automatically.

[![Add Integration to your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_assistant_notes)

## Actions

The integration provides four actions (services). They are available in the Actions picker, automations, scripts and Developer Tools.

| Action | Fields | Returns |
|---|---|---|
| `home_assistant_notes.create_note` | `title` (required), `content`, `color` (hex, default `#FFEB3B`), `pinned`, `tags` | The created note (optional response) |
| `home_assistant_notes.update_note` | `note_id` (required), `title`, `content`, `color`, `pinned`, `tags` | Nothing. Fails if the note doesn't exist |
| `home_assistant_notes.delete_note` | `note_id` (required) | Nothing. Fails if the note doesn't exist |
| `home_assistant_notes.get_notes` | none | `{ notes: [...] }` (response only) |

Each action also fires an event you can use as an automation trigger: `home_assistant_notes_note_created`, `home_assistant_notes_note_updated` (the note is attached) and `home_assistant_notes_note_deleted` (carries `note_id`).

```yaml
action: home_assistant_notes.create_note
data:
  title: Shopping list
  content: Milk, eggs, bread
  color: "#FF9800"
  pinned: true
  tags: [shopping]
response_variable: new_note
```

```yaml
action: home_assistant_notes.get_notes
response_variable: result   # result.notes is a list of note objects
```

## Formatting toolbar

| Button  | Action                                                 |
|---------|--------------------------------------------------------|
| **H▾**  | Heading level (Normal / H1 / H2 / H3)                  |
| **B▾**  | Bold, Italic, Strikethrough, Highlight, Code, Code block, Blockquote |
| **≡▾**  | Bullet list, Numbered list, Checklist, Indent, Outdent |
| **🎨▾** | Note color                                             |
| **📌**  | Pin / unpin                                            |
| **🔗**  | Insert / remove link                                   |
## Use cases

- **Shared shopping list**: a checklist note on the kitchen tablet dashboard that everyone can tick off.
- **Household notes**: Wi-Fi password, bin collection days, the plumber's number, pinned to the top.
- **Wall-tablet sticky notes**: color-coded notes via the Lovelace card, always visible on the dashboard.
- **Automation-driven notes**: create or update notes from automations with the `home_assistant_notes.create_note` and `home_assistant_notes.update_note` services.

## FAQ

**Where are my notes stored?** Locally in your Home Assistant `.storage` folder (`home_assistant_notes.notes`). Notes are included in the regular Home Assistant backups.

**Do notes sync between devices?** Yes. Every device opening the panel or card reads from the same Home Assistant storage, so it works across phones, tablets, and desktops.

**Can I show a note on a dashboard?** Yes, add the `custom:home-assistant-notes-card` card to any view.

**Which Home Assistant version do I need?** 2026.8.2 or newer.

**Can I use notes in automations?** Yes. The `create_note`, `update_note`, `delete_note`, and `get_notes` services are available in the Actions picker and in YAML.

## Troubleshooting

**Panel not in sidebar** — disable and re-enable the integration in Settings → Devices & Services, then hard-refresh the browser.

**Card is not loading** — check the browser console for errors. The card type is `custom:home-assistant-notes-card`.

## Removing the integration

1. Go to **Settings → Devices & Services**, open **Home Assistant Notes**, and choose **Delete** from the ⋮ menu. The sidebar panel and the actions disappear immediately.
2. Remove any `custom:home-assistant-notes-card` cards from your dashboards.
3. Optional: uninstall the files via HACS (or delete `custom_components/home_assistant_notes`) and restart.

The notes remain in `.storage/home_assistant_notes.notes` after removal, so you have to manually remove them through the file editor

## License

MIT — contributions are welcome via [pull request](https://github.com/dimac-h/Home-Assistant-Notes/pulls).

If Home Assistant Notes is useful to you, please consider giving it a ⭐ on GitHub. It helps other Home Assistant users find it. Questions and ideas are welcome in [Discussions](https://github.com/dimac-h/Home-Assistant-Notes/discussions).
