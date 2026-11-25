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
- Spellcheck that works in two languages at once, picking the right one for every paragraph
- Auto-save
- Dark mode

## Installation

### Marketplace (recommended)

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

Find *Home Assistant Notes* under **Settings → Marketplace** (formally HACS) or use the button below.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dimac-h&repository=Home-Assistant-Notes&category=integration)

### Manual

Download `home_assistant_notes.zip` from the [latest release](https://github.com/dimac-h/Home-Assistant-Notes/releases/latest), unzip it into `custom_components/home_assistant_notes` in your HA config directory, and restart. (Copying the folder straight from the repository won't work: the built frontend is only included in release zips.)

### Setup

Go to **Settings → Devices & Services → Add Integration** and search for *Home Assistant Notes*, or click the shortcut button below. The panel appears in the sidebar automatically.

[![Add Integration to your Home Assistant instance.](https://my.home-assistant.io/badges/config_flow_start.svg)](https://my.home-assistant.io/redirect/config_flow_start/?domain=home_assistant_notes)

## Actions

The integration provides eight actions (services): four for notes and four for the spellcheck word lists. They are available in the Actions picker, automations, scripts and Developer Tools.

| Action | Fields | Returns |
|---|---|---|
| `home_assistant_notes.create_note` | `title` (required), `content`, `color` (hex, default `#FFEB3B`), `pinned`, `tags` | The created note (optional response) |
| `home_assistant_notes.update_note` | `note_id` (required), `title`, `content`, `color`, `pinned`, `tags` | Nothing. Fails if the note doesn't exist |
| `home_assistant_notes.delete_note` | `note_id` (required) | Nothing. Fails if the note doesn't exist |
| `home_assistant_notes.get_notes` | none | `{ notes: [...] }` (response only) |
| `home_assistant_notes.add_dictionary_word` | `lang` (required), `word` (required) | Nothing. Adds a word to the personal dictionary of one language |
| `home_assistant_notes.remove_dictionary_word` | `lang` (required), `word` (required) | Nothing |
| `home_assistant_notes.add_ignored_word` | `word` (required) | Nothing. Adds a word to the ignore list (all languages) |
| `home_assistant_notes.remove_ignored_word` | `word` (required) | Nothing |

Each action also fires an event you can use as an automation trigger: `home_assistant_notes_note_created`, `home_assistant_notes_note_updated` (the note is attached) and `home_assistant_notes_note_deleted` (carries `note_id`). Changes to the word lists fire `home_assistant_notes_words_changed`, and changing the spellcheck languages fires `home_assistant_notes_spellcheck_changed`.

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

## Spellcheck

Notes are spell-checked while you type. A misspelled word gets a wavy underline, in the error color of your theme.

It is made for people who write in more than one language. Home Assistant Notes works out the language of every paragraph and list item by itself, so one note can have Dutch and English (or Turkish and English, or any other pair) side by side. If a line is too short to tell, it simply uses the language of the line above it.

**Fixing a word.** Put your cursor in an underlined word and a small bar appears above the toolbar with suggestions. Tap one to replace the word. The bar has two more buttons:

- **Add to dictionary**: the word counts as correct from now on in that language, and can show up as a suggestion for other words.
- **Ignore**: the word is never underlined again, but it is not used as a suggestion. Handy for names.

Both lists are kept in Home Assistant, so every device you use shares them.

**The language button.** The first button in the toolbar shows the language of the paragraph you are in. If it guessed wrong, tap it and pick your other language. Pick **Auto-detect** to let it guess again. **Don't check** turns the spellchecker off for the whole note. The button then says "Off", and **Check spelling** turns it back on.

The title of a note is not part of this: it keeps using your browser's own spellcheck.

### Choosing your two languages

Go to **Settings → Devices & services → Home Assistant Notes → Configure** and pick the two languages you write in. Out of the box you get the language of your Home Assistant plus English (or English plus Nederlands, if your Home Assistant language isn't available).

Home Assistant then downloads the word lists in the background. Bigger languages can take a minute. When they are ready the underlines show up on their own: no restart, no reload. If a download fails, for example because the internet isn't up yet after a restart, it tries again a few times by itself.

You can choose from 17 languages: English, Nederlands, Türkçe, Français, Deutsch, Español, Português, Italiano, Ελληνικά, Svenska, Norsk bokmål, Magyar, Română, Русский, Polski, עברית and 한국어.

Your notes are never sent anywhere. The only thing that is downloaded is the word list itself, once, by your Home Assistant, from the public jsDelivr package host. After that everything happens on your own devices, and your Home Assistant serves the word lists itself.

### Dictionary licenses

The word lists are open-source dictionaries made by other projects (the `dictionary-xx` packages on npm). Home Assistant Notes does not include them: your Home Assistant downloads the ones you choose. Each has its own license:

| Language | Package | License | Size |
|---|---|---|---|
| English | `dictionary-en@4.0.0` | MIT AND BSD | 0.6 MB |
| Nederlands | `dictionary-nl@2.0.0` | BSD-3-Clause OR CC-BY-3.0 | 2.6 MB |
| Türkçe | `dictionary-tr@2.0.0` | MIT | 9.4 MB |
| Français | `dictionary-fr@3.0.0` | MPL-2.0 | 1.4 MB |
| Deutsch | `dictionary-de@3.0.0` | GPL-2.0 OR GPL-3.0 | 1.1 MB |
| Español | `dictionary-es@4.0.0` | GPL-3.0 OR LGPL-3.0 OR MPL-1.1 | 0.9 MB |
| Português | `dictionary-pt@4.0.0` | LGPL-3.0 OR MPL-2.0 | 5.5 MB |
| Italiano | `dictionary-it@2.0.0` | GPL-3.0 | 1.4 MB |
| Ελληνικά | `dictionary-el@4.0.0` | GPL-2.0 OR LGPL-2.1 OR MPL-1.1 | 19.4 MB |
| Svenska | `dictionary-sv@4.0.0` | LGPL-3.0 | 2.4 MB |
| Norsk bokmål | `dictionary-nb@3.0.0` | GPL-2.0 | 5.4 MB |
| Magyar | `dictionary-hu@3.0.0` | GPL-2.0 OR LGPL-2.1 OR MPL-1.1 | 3.9 MB |
| Română | `dictionary-ro@3.0.0` | GPL-2.0 OR LGPL-2.1 OR MPL-1.1 | 2.3 MB |
| Русский | `dictionary-ru@3.0.0` | BSD-3-Clause | 3.6 MB |
| Polski | `dictionary-pl@2.0.0` | GPL-3.0 OR LGPL-3.0 OR MPL-2.0 | 5.0 MB |
| עברית | `dictionary-he@2.0.0` | AGPL-3.0 | 5.8 MB |
| 한국어 | `dictionary-ko@2.0.0` | GPL-2.0 OR LGPL-2.1 OR MPL-1.1 | 14.0 MB |

## Use cases

- **Shared shopping list**: a checklist note on the kitchen tablet dashboard that everyone can tick off.
- **Household notes**: Wi-Fi password, bin collection days, the plumber's number, pinned to the top.
- **Wall-tablet sticky notes**: color-coded notes via the Lovelace card, always visible on the dashboard.
- **Automation-driven notes**: create or update notes from automations with the `home_assistant_notes.create_note` and `home_assistant_notes.update_note` services.

## FAQ

**Where are my notes stored?** Locally in your Home Assistant `.storage` folder (`home_assistant_notes.notes`). Notes are included in the regular Home Assistant backups.

**Do notes sync between devices?** Yes. Every device opening the panel or card reads from the same Home Assistant storage, so it works across phones, tablets, and desktops.

**Can I show a note on a dashboard?** Yes, add the `custom:home-assistant-notes-card` card to any view.

**Home Assistant version required** 2026.11.0 or newer.

**Does the spellcheck send my notes anywhere?** No. Only the word lists are downloaded (once, by Home Assistant). Your notes stay in your Home Assistant.

**Can I use notes in automations?** Yes. The `create_note`, `update_note`, `delete_note`, and `get_notes` services are available in the Actions picker and in YAML.

## Troubleshooting

**Panel not in sidebar** — disable and re-enable the integration in Settings → Devices & Services, then hard-refresh the browser.

**No underlines while spellchecking?** — the word list for your language may still be downloading (it needs internet access once). Check the language button in the toolbar: if it says "Off", spellcheck is switched off for that note. You can also check your two languages under **Settings → Devices & services → Home Assistant Notes → Configure**.

**Card is not loading** — check the browser console for errors. The card type is `custom:home-assistant-notes-card`.

## Removing the integration

1. Go to **Settings → Devices & Services**, open **Home Assistant Notes**, and choose **Delete** from the ⋮ menu. The sidebar panel and the actions disappear immediately.
2. Remove any `custom:home-assistant-notes-card` cards from your dashboards.
3. Optional: uninstall the files via the Marketplace (or delete `custom_components/home_assistant_notes`) and restart.

The notes remain in `.storage/home_assistant_notes.notes` after removal, so you have to manually remove them through the file editor

## License

MIT — contributions are welcome via [pull request](https://github.com/dimac-h/Home-Assistant-Notes/pulls).

If Home Assistant Notes is useful to you, please consider giving it a ⭐ on GitHub. It helps other Home Assistant users find it. Questions and ideas are welcome in [Discussions](https://github.com/dimac-h/Home-Assistant-Notes/discussions).
