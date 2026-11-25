import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const MAX_SUGGESTIONS = 5;

// One scrollable row of fixes for the misspelled word at the caret. Buttons
// swallow mousedown so tapping them never moves focus out of the editor
// (which would close the on-screen keyboard), like the toolbar's buttons.
@customElement('home-assistant-notes-spell-strip')
export class HomeAssistantNotesSpellStrip extends LitElement {
  static styles = css`
    :host { display: block; }
    :host([hidden]) { display: none; }
    .row {
      display: flex; flex-wrap: nowrap; align-items: center; gap: var(--ha-space-1, 4px);
      padding: var(--ha-space-1, 4px) var(--ha-space-2, 8px);
      overflow-x: auto; overflow-y: hidden; scrollbar-width: none;
      background: var(--card-background-color); border: 1px solid var(--divider-color);
      border-radius: 12px; box-shadow: var(--ha-box-shadow-m, 0 4px 16px rgba(0,0,0,0.2));
    }
    .row::-webkit-scrollbar { display: none; }
    ha-button { flex-shrink: 0; white-space: nowrap; }
    .none { flex-shrink: 0; white-space: nowrap; color: var(--secondary-text-color); font-size: 14px; padding: 0 var(--ha-space-2, 8px); }
    .sep { flex-shrink: 0; width: 1px; align-self: stretch; margin: var(--ha-space-1, 4px) 0; background: var(--divider-color); }
  `;

  @property({ attribute: false }) word: string | null = null;
  @property({ attribute: false }) suggestions: string[] = [];

  private _emit(type: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }

  private _keepFocus = (e: Event): void => e.preventDefault();

  render() {
    if (!this.word) return nothing;
    const suggestions = this.suggestions.slice(0, MAX_SUGGESTIONS);
    return html`
      <div class="row" @mousedown=${this._keepFocus} @pointerdown=${this._keepFocus}>
        ${suggestions.length
          ? suggestions.map((s) => html`<ha-button class="suggestion" size="s" appearance="filled" variant="neutral" @click=${() => this._emit('spell-suggestion', { suggestion: s })}>${s}</ha-button>`)
          : html`<span class="none">No suggestions</span>`}
        <span class="sep"></span>
        <ha-button class="add" size="s" appearance="plain" variant="neutral" @click=${() => this._emit('spell-add-dictionary')}>Add to dictionary</ha-button>
        <ha-button class="ignore" size="s" appearance="plain" variant="neutral" @click=${() => this._emit('spell-ignore')}>Ignore</ha-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-assistant-notes-spell-strip': HomeAssistantNotesSpellStrip;
  }
}
