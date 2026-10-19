import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { mdiNoteMultipleOutline, mdiPin } from '@mdi/js';
import './card-editor';
import { DEFAULT_MAX_NOTES, HEADER_CARD_SIZE, SINGLE_NOTE_CARD_SIZE } from './card-defaults';
import { getNotes, subscribeNoteEvents } from './api';
import type { Note } from './api';
import { safeColor, getNoteTextColor } from './colors';
import { notePreviewHtml, notePreviewStyles } from './note-preview';
import { formatRelativeDate } from './format';
import type { HomeAssistant } from './ha-types';

// Ported verbatim from the current www/home-assistant-notes-card.js _sanitizeHtml —
// used by the card's single-note view, which renders note HTML directly.
const SANITIZE_ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 's', 'u', 'mark',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre',
  'input', 'label', 'span', 'div',
]);
const SANITIZE_ALLOWED_ATTRS_BY_TAG: Record<string, string[]> = {
  a: ['href', 'target', 'rel'],
  input: ['type', 'checked', 'disabled'],
};
const SAFE_PROTOCOLS = /^(https?:|mailto:)/i;

function sanitizeNode(node: Node): void {
  if (node.nodeType === Node.TEXT_NODE) return;
  if (node.nodeType !== Node.ELEMENT_NODE) {
    node.parentNode?.removeChild(node);
    return;
  }
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  if (!SANITIZE_ALLOWED_TAGS.has(tag)) {
    const parent = el.parentNode;
    while (el.firstChild) parent?.insertBefore(el.firstChild, el);
    parent?.removeChild(el);
    return;
  }
  const allowed = SANITIZE_ALLOWED_ATTRS_BY_TAG[tag] || [];
  Array.from(el.attributes).forEach(attr => {
    if (!allowed.includes(attr.name) && attr.name !== 'data-type' && attr.name !== 'data-checked') {
      el.removeAttribute(attr.name);
    }
  });
  if (tag === 'a') {
    const href = el.getAttribute('href') || '';
    if (!SAFE_PROTOCOLS.test(href)) el.removeAttribute('href');
    el.setAttribute('rel', 'noopener noreferrer');
  }
  Array.from(el.childNodes).forEach(sanitizeNode);
}

function sanitizeNoteHtml(htmlText: string): string {
  const doc = new DOMParser().parseFromString(htmlText, 'text/html');
  Array.from(doc.body.childNodes).forEach(sanitizeNode);
  return doc.body.innerHTML;
}

export interface HomeAssistantNotesCardConfig {
  type: string;
  title?: string;
  note_id?: string | null;
  show_all?: boolean;
  max_notes?: number;
  show_pinned_only?: boolean;
  card_color?: string | null;
}

@customElement('home-assistant-notes-card')
export class HomeAssistantNotesCard extends LitElement {
  static styles = [notePreviewStyles, css`
    :host { display: block; }
    .list-note { border-radius: 6px; padding: var(--ha-space-3); margin-block-end: var(--ha-space-2); cursor: pointer; }
    .list-note:hover { box-shadow: var(--ha-box-shadow-s, 0 2px 6px rgba(0, 0, 0, 0.15)); }
    .list-header { display: flex; align-items: center; gap: var(--ha-space-2); margin-block-end: 4px; }
    .list-title {
      font-size: 15px; line-height: 1.3; font-weight: 600; color: var(--note-text);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;
    }
    .list-note .date { font-size: 12px; line-height: 1.3; color: var(--note-text-muted); }
    .list-note ha-svg-icon { --mdc-icon-size: 14px; color: var(--note-text-muted); flex-shrink: 0; }
    ha-card { padding: 16px; }
    .header {
      font-size: 18px; font-weight: 600; margin-bottom: 16px; color: var(--primary-text-color);
      display: flex; align-items: center; gap: 8px;
    }
    .note {
      background: var(--note-color, #FFEB3B); padding: 16px; border-radius: 8px; margin-bottom: 12px;
      box-shadow: var(--ha-box-shadow-s, 0 2px 4px rgba(0,0,0,0.1)); cursor: pointer;
    }
    .note:last-child { margin-bottom: 0; }
    .note-title {
      font-size: 16px; font-weight: 600; margin-bottom: 8px; color: rgba(0,0,0,0.87);
      display: flex; align-items: center; justify-content: space-between;
    }
    .note-content { font-size: 14px; color: rgba(0,0,0,0.6); line-height: 1.5; word-wrap: break-word; }
    .note-content p, .note-content li { margin: 0; }
    .note-content ul, .note-content ol { margin: 0; padding-inline-start: 1.1em; }
    /* TipTap task lists: <li><label><input></label><div><p>text</p></div></li> —
       checkbox beside the text, text wrapping within its own column. */
    .note-content ul[data-type='taskList'] { list-style: none; padding-inline-start: 0; }
    .note-content ul[data-type='taskList'] li { display: flex; align-items: flex-start; gap: var(--ha-space-2); }
    .note-content ul[data-type='taskList'] li > label { flex-shrink: 0; display: flex; align-items: center; min-height: 1.5em; }
    .note-content ul[data-type='taskList'] li > div { flex: 1; min-width: 0; }
    .note-content input[type='checkbox'] { margin: 0; }
    .note-meta { margin-top: 8px; font-size: 12px; color: rgba(0,0,0,0.5); }
    .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .tag { background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 12px; font-size: 11px; color: rgba(0,0,0,0.7); }
    .empty { text-align: center; padding: 32px; color: var(--secondary-text-color); }
    ha-button { width: 100%; margin-top: 12px; }
  `];

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: HomeAssistantNotesCardConfig = { type: 'custom:home-assistant-notes-card' };
  @state() private _notes: Note[] = [];

  private _unsubscribe?: () => void;
  private _initializing = false;

  setConfig(config: HomeAssistantNotesCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = {
      title: 'Notes', note_id: null, show_all: false, max_notes: DEFAULT_MAX_NOTES, show_pinned_only: false, card_color: null,
      ...config,
    };
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('hass') && this.hass && !this._unsubscribe && !this._initializing) this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  private async _init(): Promise<void> {
    this._initializing = true;
    try {
      this._notes = await getNotes(this.hass);
      const unsubscribe = await subscribeNoteEvents(this.hass, async () => {
        this._notes = await getNotes(this.hass);
      });
      if (this.isConnected) this._unsubscribe = unsubscribe;
      else unsubscribe(); // removed from the DOM while subscribing
    } finally {
      this._initializing = false;
    }
  }

  getCardSize(): number {
    if (this._config.note_id) return SINGLE_NOTE_CARD_SIZE;
    const shown = this._config.show_all ? this._notes.length : Math.min(this._config.max_notes ?? DEFAULT_MAX_NOTES, this._notes.length);
    return shown + HEADER_CARD_SIZE;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('home-assistant-notes-card-editor');
  }

  static getStubConfig(): HomeAssistantNotesCardConfig {
    return { type: 'custom:home-assistant-notes-card', title: 'Notes', show_all: false, max_notes: DEFAULT_MAX_NOTES, show_pinned_only: false };
  }

  private _openPanel(noteId?: string): void {
    const query = noteId ? `?note=${encodeURIComponent(noteId)}` : '';
    window.history.pushState(null, '', `/home-assistant-notes${query}`);
    window.dispatchEvent(new Event('location-changed', { bubbles: true, composed: true }));
  }

  private _renderSingleNote(note: Note) {
    return html`
      <div class="note" style="--note-color:${safeColor(note.color)}" @click=${() => this._openPanel(note.note_id)}>
        <div class="note-title">
          <span>${note.title || 'Untitled'}</span>
          ${note.pinned ? html`<ha-svg-icon .path=${mdiPin}></ha-svg-icon>` : ''}
        </div>
        <div class="note-content" .innerHTML=${sanitizeNoteHtml(note.content || '')}></div>
        ${note.tags?.length ? html`<div class="tags">${note.tags.map(t => html`<span class="tag">${t}</span>`)}</div>` : ''}
        <div class="note-meta">${formatRelativeDate(note.modified)}</div>
      </div>
    `;
  }

  private _renderListNote(note: Note) {
    const { title, muted } = getNoteTextColor(note.color);
    return html`
      <div
        class="list-note"
        style="background:${safeColor(note.color)}; --note-text:${title}; --note-text-muted:${muted}"
        @click=${() => this._openPanel(note.note_id)}
      >
        <div class="list-header">
          <div class="list-title">${note.title || 'Untitled'}</div>
          ${note.pinned ? html`<ha-svg-icon .path=${mdiPin}></ha-svg-icon>` : ''}
        </div>
        <div class="preview">${unsafeHTML(notePreviewHtml(note.content || ''))}</div>
        <div class="date">${formatRelativeDate(note.modified)}</div>
      </div>
    `;
  }

  render() {
    const cardStyle = this._config.card_color ? `background:${safeColor(this._config.card_color)}` : '';
    let content;
    if (this._config.note_id) {
      const note = this._notes.find(n => n.note_id === this._config.note_id);
      content = note ? this._renderSingleNote(note) : html`<div class="empty">Note not found</div>`;
    } else {
      let notes = this._config.show_pinned_only ? this._notes.filter(n => n.pinned) : this._notes;
      const total = notes.length;
      const maxNotes = this._config.max_notes ?? DEFAULT_MAX_NOTES;
      if (!this._config.show_all) notes = notes.slice(0, maxNotes);
      content = notes.length === 0
        ? html`<div class="empty">No notes to display</div>`
        : html`
            ${notes.map(n => this._renderListNote(n))}
            ${!this._config.show_all && total > maxNotes ? html`<ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._openPanel()}>View All Notes</ha-button>` : ''}
          `;
    }
    return html`
      <ha-card style=${cardStyle}>
        <div class="header">
          <ha-svg-icon .path=${mdiNoteMultipleOutline}></ha-svg-icon>
          <span>${this._config.title}</span>
        </div>
        ${content}
      </ha-card>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'home-assistant-notes-card',
  name: 'Home Assistant Notes Card',
  description: 'Display notes from Home Assistant Notes',
  preview: true,
  documentationURL: 'https://github.com/dimac-h/Home-Assistant-Notes',
});

declare global {
  interface Window {
    customCards?: unknown[];
  }
  interface HTMLElementTagNameMap {
    'home-assistant-notes-card': HomeAssistantNotesCard;
  }
}
