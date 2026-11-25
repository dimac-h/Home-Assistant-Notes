import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { mdiCheck, mdiArrowLeft } from '@mdi/js';
import './note-toolbar';
import './tiptap-editor';
import './note-spell-strip';
import type { HomeAssistantNotesTiptapEditor, ToolbarAction } from './tiptap-editor';
import type { Note, SpellcheckConfig } from '../api';

// Sorts every checklist in the note's content: unchecked items on top,
// checked items below, each group alphabetical. Applied wholesale when a
// note is opened or closed rather than live during editing, so items don't
// jump out from under the user mid-edit while typing or checking a box.
function sortTaskListsHtml(html: string): string {
  if (!/data-type=["']taskList["']/.test(html)) return html;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.body.querySelectorAll('ul[data-type="taskList"]').forEach((ul) => {
    const items = Array.from(ul.children).filter((el) => el.tagName === 'LI');
    const sorted = [...items].sort((a, b) => {
      const aChecked = a.getAttribute('data-checked') === 'true';
      const bChecked = b.getAttribute('data-checked') === 'true';
      if (aChecked !== bChecked) return aChecked ? 1 : -1;
      return (a.textContent || '').trim().localeCompare((b.textContent || '').trim());
    });
    sorted.forEach((li) => ul.appendChild(li));
  });
  return doc.body.innerHTML;
}

@customElement('home-assistant-notes-editor')
export class HomeAssistantNotesEditor extends LitElement {
  static styles = css`
    :host {
      display: flex; flex-direction: column; height: var(--home-assistant-notes-visible-height, 100%);
      background: var(--card-background-color);
      min-width: 0; min-height: 0; position: relative;
      top: var(--home-assistant-notes-offset-top, 0px);
    }
    .header {
      padding: 12px 16px; border-bottom: 1px solid var(--divider-color); display: flex; align-items: center; gap: 10px;
      padding-top: max(12px, var(--safe-area-inset-top, env(safe-area-inset-top, 0px)));
    }
    .back-btn { display: none; }
    @media (max-width: 767px) {
      .back-btn { display: inline-flex; --mdc-icon-size: 28px; }
    }
    .actions { display: flex; gap: 8px; margin-left: auto; }
    .body {
      flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column;
      padding: 20px 24px 40px;
    }
    home-assistant-notes-tiptap-editor { flex: 1 0 auto; display: flex; flex-direction: column; }
    /* Sits directly above the toolbar; the toolbar's bottom margin (keyboard / home
       indicator aware) is untouched, and a hidden strip takes no space. */
    home-assistant-notes-spell-strip { flex-shrink: 0; min-width: 0; margin: 8px 12px 0; }
    home-assistant-notes-toolbar {
      flex-shrink: 0;
      margin: 8px 12px 12px;
      margin-bottom: calc(12px + var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)));
    }
    /* The home-indicator inset is covered by the keyboard while it's open. */
    :host([keyboard-open]) home-assistant-notes-toolbar { margin-bottom: 8px; }
    /* Same when Safari's own bottom bar sits over the inset instead of the keyboard. */
    :host([browser-bar]) home-assistant-notes-toolbar { margin-bottom: 12px; }
    /* A textarea (auto-grown to its content) rather than an input so long titles
       wrap instead of scrolling sideways; padding/appearance are reset because
       iOS adds its own inset to form controls. */
    .title-input {
      display: block; flex-shrink: 0; width: 100%; box-sizing: border-box; margin: 0 0 16px; padding: 0;
      font-size: 28px; font-weight: 700; line-height: 1.25; font-family: inherit;
      border: none; border-radius: 0; outline: none; resize: none; overflow: hidden;
      -webkit-appearance: none; appearance: none;
      color: var(--primary-text-color); background: transparent;
    }
    .empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100%; color: var(--secondary-text-color);
    }
  `;

  @property({ attribute: false }) note: Note | null = null;
  // HA's UI language; becomes the editor's default spellcheck language.
  @property({ attribute: false }) language?: string;
  @property({ attribute: false }) spellcheckConfig: SpellcheckConfig | null = null;

  @state() private _pendingDelete = false;
  @state() private _justSaved = false;
  @state() private _spellWord: string | null = null;
  @state() private _spellSuggestions: string[] = [];
  // Language of the block at the caret, as last reported by the editor.
  @state() private _blockLang: { code: string; manual: boolean } | null = null;
  // The note-wide switch as just toggled, until the saved note catches up.
  @state() private _spellcheckOverride: boolean | null = null;
  // word + language the strip is showing or fetching suggestions for.
  private _spellKey = '';

  @query('home-assistant-notes-tiptap-editor') private _tiptap?: HomeAssistantNotesTiptapEditor;
  @query('.title-input') private _titleInput?: HTMLTextAreaElement;

  private _saveTimeout?: ReturnType<typeof setTimeout>;
  private _deleteTimeout?: ReturnType<typeof setTimeout>;
  private _toastTimeout?: ReturnType<typeof setTimeout>;

  // Computed once per note-open (in willUpdate below) or refreshed directly
  // by _flushSorted, not on every render — recomputing it from
  // `this.note.content` on every render would re-sort on each autosave
  // round-trip too (the parent re-passes `note` with the just-saved
  // content), diverging from the tiptap editor's own last-emitted HTML and
  // forcing an unwanted mid-edit reset of the editor's content. @state so a
  // direct assignment from _flushSorted (outside the normal note-switch
  // update cycle, e.g. the mobile back button) still triggers a re-render.
  @state() private _displayContent = '';

  connectedCallback(): void {
    super.connectedCallback();
    window.visualViewport?.addEventListener('resize', this._onViewportResize);
    window.visualViewport?.addEventListener('scroll', this._onViewportResize);
    this._onViewportResize();
  }

  // Flushes a sorted save for the note we're navigating away from — using
  // willUpdate (before render) rather than updated() means `this._tiptap`
  // still holds the departing note's (possibly unsaved) content, since the
  // child's `.content` binding hasn't re-rendered to the new note yet.
  willUpdate(changed: Map<string, unknown>): void {
    if (!changed.has('note')) return;
    const previous = changed.get('note') as Note | null | undefined;
    if (previous?.note_id !== this.note?.note_id || this.note?.spellcheck === this._spellcheckOverride) {
      this._spellcheckOverride = null;
    }
    if (previous?.note_id === this.note?.note_id) return;
    this._spellKey = '';
    this._spellWord = null;
    this._spellSuggestions = [];
    this._blockLang = null;
    if (previous) this._flushSorted(previous);
    this._displayContent = this.note ? sortTaskListsHtml(this.note.content || '') : '';
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._saveTimeout);
    clearTimeout(this._deleteTimeout);
    clearTimeout(this._toastTimeout);
    window.visualViewport?.removeEventListener('resize', this._onViewportResize);
    window.visualViewport?.removeEventListener('scroll', this._onViewportResize);
  }

  // Mobile browsers keep the layout viewport full-height when the on-screen keyboard
  // opens, shrinking only the visual viewport — so a plain height:100% app shell
  // extends below the visible area and its in-flow bottom toolbar ends up hidden
  // behind the keyboard. Shrinking the shell itself to match keeps everything,
  // including the toolbar, within the visible area without any position hacks.
  private _onViewportResize = (): void => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    this.style.setProperty('--home-assistant-notes-visible-height', `${viewport.height}px`);
    const keyboardOpen = window.innerHeight - viewport.height > 100;
    this.toggleAttribute('keyboard-open', keyboardOpen);
    // In a Safari tab the page ends above the browser's bottom bar, which already
    // covers the home-indicator inset; only a full-height viewport needs our margin.
    this.toggleAttribute('browser-bar', !keyboardOpen && viewport.offsetTop + viewport.height < window.screen.height - 20);
    // iOS also pans the visual viewport down within the layout viewport to reveal the
    // focused field, which would leave the shell (and its header) scrolled off-screen
    // above a blank area. While the keyboard is open, follow the pan so the shell stays
    // pinned to what's visible. Once it closes iOS leaves the page scrolled, so reset it.
    this.style.setProperty('--home-assistant-notes-offset-top', keyboardOpen ? `${viewport.offsetTop}px` : '0px');
    if (!keyboardOpen && (window.scrollY || viewport.offsetTop)) window.scrollTo(0, 0);
    if (keyboardOpen) requestAnimationFrame(() => this._tiptap?.scrollCaretIntoView());
  };

  // Titles are single-line: Enter is ignored and pasted line breaks become spaces.
  private _onTitleKeydown = (e: KeyboardEvent): void => {
    e.stopPropagation();
    if (e.key === 'Enter') e.preventDefault();
  };

  private _onTitleInput = (): void => {
    const title = this._titleInput;
    if (title && title.value.includes('\n')) title.value = title.value.replace(/\s*\n\s*/g, ' ');
    this._fitTitle();
    this._scheduleSave();
  };

  private _fitTitle(): void {
    const title = this._titleInput;
    if (!title) return;
    title.style.height = 'auto';
    title.style.height = `${title.scrollHeight}px`;
  }

  updated(): void {
    this._fitTitle();
  }

  private _scheduleSave(): void {
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => this._save(), 1000);
  }

  private _save(overrides: Partial<Note> = {}): void {
    if (!this.note) return;
    const detail = {
      note_id: this.note.note_id,
      title: overrides.title ?? this._titleInput?.value ?? this.note.title,
      content: overrides.content ?? this._tiptap?.getHTML() ?? this.note.content,
      color: overrides.color ?? this.note.color,
      pinned: overrides.pinned ?? this.note.pinned,
      spellcheck: overrides.spellcheck ?? this.note.spellcheck,
    };
    this.dispatchEvent(new CustomEvent('note-save', { detail, bubbles: true, composed: true }));
    this._justSaved = true;
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => { this._justSaved = false; }, 1000);
  }

  // Sorts and saves the note being navigated away from: unchecked checklist
  // items on top, checked below, each group alphabetical. Cancels any
  // pending debounced save first — otherwise that timeout would later fire
  // against `this.note`, which by then points at whatever note we're
  // switching to, misattributing the departing note's content to it.
  //
  // Also pushes the sorted HTML into `_displayContent` unconditionally: when
  // switching to a different note, willUpdate immediately overwrites it
  // again with that note's own content (harmless). But when `note` is still
  // the one on screen — the mobile back button doesn't change note_id, it
  // only toggles which pane is visible — willUpdate's same-note guard would
  // otherwise skip refreshing the display, leaving the live editor showing
  // the pre-sort order even though the sorted version was already saved.
  private _flushSorted(note: Note): void {
    clearTimeout(this._saveTimeout);
    const content = sortTaskListsHtml(this._tiptap?.getHTML() ?? note.content);
    const title = this._titleInput?.value ?? note.title;
    this._displayContent = content;
    if (content === note.content && title === note.title) return;
    this.dispatchEvent(new CustomEvent('note-save', {
      detail: { note_id: note.note_id, title, content, color: note.color, pinned: note.pinned, spellcheck: note.spellcheck },
      bubbles: true,
      composed: true,
    }));
  }

  // The caret moved or check results arrived. Keeps the strip as is while the caret stays
  // on the same word (no flicker) and drops suggestions that come back for a word the
  // caret has since left.
  private _onSpellcheckState = async (): Promise<void> => {
    this._blockLang = this._tiptap?.blockLanguage() ?? null;
    const hit = this._tiptap?.wordAtCaret();
    if (!hit) {
      this._spellKey = '';
      this._spellWord = null;
      this._spellSuggestions = [];
      return;
    }
    const key = `${hit.lang}:${hit.word}`;
    if (key === this._spellKey) return;
    this._spellKey = key;
    // Drop the previous word now so the strip never offers fixes for a word the caret left.
    this._spellWord = null;
    this._spellSuggestions = [];
    let suggestions: string[] = [];
    try {
      suggestions = (await this._tiptap?.suggest(hit.word, hit.lang)) ?? [];
    } catch { /* show the strip without suggestions */ }
    if (this._spellKey !== key) return;
    const now = this._tiptap?.wordAtCaret();
    if (!now || `${now.lang}:${now.word}` !== key) return;
    this._spellWord = hit.word;
    this._spellSuggestions = suggestions;
  };

  // The word the strip refers to, only if the caret is still on it.
  private _currentSpellHit(): { word: string; from: number; to: number; lang: string } | null {
    const hit = this._tiptap?.wordAtCaret();
    return hit && hit.word === this._spellWord ? hit : null;
  }

  private _onSpellSuggestion(e: CustomEvent<{ suggestion: string }>): void {
    const hit = this._currentSpellHit();
    if (hit) this._tiptap?.replaceRange(hit.from, hit.to, e.detail.suggestion);
  }

  private _onSpellAddDictionary(): void {
    const hit = this._currentSpellHit();
    if (hit) this.dispatchEvent(new CustomEvent('spell-add-dictionary-word', { detail: { lang: hit.lang, word: hit.word }, bubbles: true, composed: true }));
  }

  private _onSpellIgnore(): void {
    const hit = this._currentSpellHit();
    if (hit) this.dispatchEvent(new CustomEvent('spell-add-ignored-word', { detail: { word: hit.word }, bubbles: true, composed: true }));
  }

  private _onToolbarAction(e: CustomEvent<{ action: ToolbarAction; payload?: { href?: string } }>): void {
    this._tiptap?.runAction(e.detail.action, e.detail.payload);
  }

  private _onColorSelect(e: CustomEvent<{ color: string }>): void {
    clearTimeout(this._saveTimeout);
    this._save({ color: e.detail.color });
  }

  private _onPinToggle(): void {
    if (!this.note) return;
    clearTimeout(this._saveTimeout);
    this._save({ pinned: !this.note.pinned });
  }

  private get _spellcheckOn(): boolean {
    return this._spellcheckOverride ?? this.note?.spellcheck !== false;
  }

  private _onLanguageSelect(e: CustomEvent<{ mode: 'other' | 'auto' }>): void {
    if (e.detail.mode === 'auto') {
      this._tiptap?.setBlockLanguage(null);
      return;
    }
    const other = this._otherLanguage();
    if (other) this._tiptap?.setBlockLanguage(other.code);
  }

  private _otherLanguage(): { code: string; name: string } | undefined {
    const current = this._blockLang?.code;
    return (this._tiptap?.spellcheckLanguages ?? []).find((l) => l.code !== current);
  }

  private _onSpellcheckToggle(): void {
    if (!this.note) return;
    const next = !this._spellcheckOn;
    this._spellcheckOverride = next;
    clearTimeout(this._saveTimeout);
    this._save({ spellcheck: next });
  }

  // Chip props for the toolbar. Without a spellcheck config (or when spellcheck is on but
  // the block's language isn't known yet) the name stays empty and the chip hidden.
  private _chipProps(): { languageName: string; otherLanguageName: string; languageManual: boolean } {
    const languages = this._tiptap?.spellcheckLanguages ?? [];
    if (!this.spellcheckConfig?.languages.length || !languages.length) {
      return { languageName: '', otherLanguageName: '', languageManual: false };
    }
    const current = languages.find((l) => l.code === this._blockLang?.code);
    return {
      languageName: this._spellcheckOn ? (current?.name ?? '') : 'Off',
      otherLanguageName: current ? (languages.find((l) => l.code !== current.code)?.name ?? '') : '',
      languageManual: this._blockLang?.manual ?? false,
    };
  }

  private _onLinkOpenRequested(e: Event): void {
    const toolbar = e.target as HTMLElement & { linkHref: string };
    toolbar.linkHref = this._tiptap?.getLinkHref() ?? '';
  }

  private _onDelete(): void {
    if (!this.note) return;
    if (!this._pendingDelete) {
      this._pendingDelete = true;
      this._deleteTimeout = setTimeout(() => { this._pendingDelete = false; }, 3000);
      return;
    }
    clearTimeout(this._deleteTimeout);
    this._pendingDelete = false;
    this.dispatchEvent(new CustomEvent('note-delete', { detail: { noteId: this.note.note_id }, bubbles: true, composed: true }));
  }

  render() {
    if (!this.note) {
      return html`<div class="empty">Select a note or create one</div>`;
    }
    const spellWord = this._spellcheckOn ? this._spellWord : null;
    const chip = this._chipProps();
    return html`
      <div class="header">
        <ha-icon-button class="back-btn" .path=${mdiArrowLeft} @click=${() => {
          if (this.note) this._flushSorted(this.note);
          this.dispatchEvent(new CustomEvent('editor-back', { bubbles: true, composed: true }));
        }}></ha-icon-button>
        <div class="actions">
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => { clearTimeout(this._saveTimeout); this._save(); }}>
            ${this._justSaved ? html`<ha-svg-icon .path=${mdiCheck}></ha-svg-icon>` : 'Save'}
          </ha-button>
          <ha-button size="s" appearance="plain" variant="danger" @click=${() => this._onDelete()}>${this._pendingDelete ? 'Confirm?' : 'Delete'}</ha-button>
        </div>
      </div>
      <div class="body">
        <textarea
          class="title-input"
          rows="1"
          placeholder="Note Title"
          .value=${this.note.title || ''}
          @input=${this._onTitleInput}
          @keydown=${this._onTitleKeydown}
        ></textarea>
        <home-assistant-notes-tiptap-editor
          .content=${this._displayContent}
          .lang=${this.language ?? ''}
          .spellcheck=${this._spellcheckOn}
          .spellcheckConfig=${this.spellcheckConfig}
          @content-changed=${() => this._scheduleSave()}
          @spellcheck-state=${this._onSpellcheckState}
        ></home-assistant-notes-tiptap-editor>
      </div>
      <home-assistant-notes-spell-strip
        ?hidden=${!spellWord}
        .word=${spellWord}
        .suggestions=${this._spellSuggestions}
        @spell-suggestion=${this._onSpellSuggestion}
        @spell-add-dictionary=${this._onSpellAddDictionary}
        @spell-ignore=${this._onSpellIgnore}
      ></home-assistant-notes-spell-strip>
      <home-assistant-notes-toolbar
        .pinned=${this.note.pinned}
        .color=${this.note.color}
        .languageName=${chip.languageName}
        .otherLanguageName=${chip.otherLanguageName}
        .languageManual=${chip.languageManual}
        .spellcheckOn=${this._spellcheckOn}
        @language-select=${this._onLanguageSelect}
        @spellcheck-toggle=${this._onSpellcheckToggle}
        @toolbar-action=${this._onToolbarAction}
        @color-select=${this._onColorSelect}
        @pin-toggle=${this._onPinToggle}
        @link-open-requested=${this._onLinkOpenRequested}
      ></home-assistant-notes-toolbar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-assistant-notes-editor': HomeAssistantNotesEditor;
  }
}
