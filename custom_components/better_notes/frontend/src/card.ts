import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { mdiNoteMultipleOutline, mdiPin } from '@mdi/js';
import './card-editor';
import { getNotes, subscribeNoteEvents } from './api';
import type { Note } from './api';
import { safeColor } from './colors';
import { formatRelativeDate, stripHtml } from './format';
import type { HomeAssistant } from './ha-types';

// Ported verbatim from the current www/better-notes-card.js _sanitizeHtml —
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

export interface BetterNotesCardConfig {
  type: string;
  title?: string;
  note_id?: string | null;
  show_all?: boolean;
  max_notes?: number;
  show_pinned_only?: boolean;
  card_color?: string | null;
}

@customElement('better-notes-card')
export class BetterNotesCard extends LitElement {
  static styles = css`
    :host { display: block; }
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
    .note-meta { margin-top: 8px; font-size: 12px; color: rgba(0,0,0,0.5); }
    .tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
    .tag { background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 12px; font-size: 11px; color: rgba(0,0,0,0.7); }
    .empty { text-align: center; padding: 32px; color: var(--secondary-text-color); }
    ha-button { width: 100%; margin-top: 12px; }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: BetterNotesCardConfig = { type: 'custom:better-notes-card' };
  @state() private _notes: Note[] = [];

  private _unsubscribe?: () => void;

  setConfig(config: BetterNotesCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = {
      title: 'Notes', note_id: null, show_all: false, max_notes: 5, show_pinned_only: false, card_color: null,
      ...config,
    };
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('hass') && this.hass && !this._unsubscribe) this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  private async _init(): Promise<void> {
    this._notes = await getNotes(this.hass);
    this._unsubscribe = await subscribeNoteEvents(this.hass, async () => {
      this._notes = await getNotes(this.hass);
    });
  }

  getCardSize(): number {
    if (this._config.note_id) return 3;
    const shown = this._config.show_all ? this._notes.length : Math.min(this._config.max_notes ?? 5, this._notes.length);
    return shown + 1;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('better-notes-card-editor');
  }

  static getStubConfig(): BetterNotesCardConfig {
    return { type: 'custom:better-notes-card', title: 'Notes', show_all: false, max_notes: 5, show_pinned_only: false };
  }

  private _openPanel(): void {
    window.history.pushState(null, '', '/better-notes');
    window.dispatchEvent(new Event('location-changed', { bubbles: true, composed: true }));
  }

  private _renderNote(note: Note, isSingle: boolean) {
    return html`
      <div class="note" style="--note-color:${safeColor(note.color)}" @click=${() => this._openPanel()}>
        <div class="note-title">
          <span>${note.title || 'Untitled'}</span>
          ${note.pinned ? html`<ha-svg-icon .path=${mdiPin}></ha-svg-icon>` : ''}
        </div>
        ${isSingle
          ? html`<div class="note-content" .innerHTML=${sanitizeNoteHtml(note.content || '')}></div>`
          : html`<div class="note-content">${(() => {
              const plain = stripHtml(note.content || '');
              return plain.length > 150 ? `${plain.slice(0, 150)}…` : plain;
            })()}</div>`}
        ${note.tags?.length ? html`<div class="tags">${note.tags.map(t => html`<span class="tag">${t}</span>`)}</div>` : ''}
        <div class="note-meta">${formatRelativeDate(note.modified)}</div>
      </div>
    `;
  }

  render() {
    const cardStyle = this._config.card_color ? `background:${safeColor(this._config.card_color)}` : '';
    let content;
    if (this._config.note_id) {
      const note = this._notes.find(n => n.note_id === this._config.note_id);
      content = note ? this._renderNote(note, true) : html`<div class="empty">Note not found</div>`;
    } else {
      let notes = this._config.show_pinned_only ? this._notes.filter(n => n.pinned) : this._notes;
      const total = notes.length;
      const maxNotes = this._config.max_notes ?? 5;
      if (!this._config.show_all) notes = notes.slice(0, maxNotes);
      content = notes.length === 0
        ? html`<div class="empty">No notes to display</div>`
        : html`
            ${notes.map(n => this._renderNote(n, false))}
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
  type: 'better-notes-card',
  name: 'Home Assistant Notes Card',
  description: 'Display notes from Home Assistant Notes',
  preview: true,
  documentationURL: 'https://github.com/dimac-h/BetterNotesforHA',
});

declare global {
  interface Window {
    customCards?: unknown[];
  }
  interface HTMLElementTagNameMap {
    'better-notes-card': BetterNotesCard;
  }
}
