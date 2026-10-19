import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistantNotesCardConfig } from './card';
import { DEFAULT_MAX_NOTES } from './card-defaults';
import { getNotes } from './api';
import type { Note } from './api';
import type { HomeAssistant } from './ha-types';

@customElement('home-assistant-notes-card-editor')
export class HomeAssistantNotesCardEditor extends LitElement {
  static styles = css`
    .option { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; font-weight: 500; }
    ha-input { width: 100%; }
  `;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: HomeAssistantNotesCardConfig = { type: 'custom:home-assistant-notes-card' };
  @state() private _notes: Note[] = [];

  private _loadedNotes = false;

  updated(changed: Map<string, unknown>): void {
    if (changed.has('hass') && this.hass && !this._loadedNotes) {
      this._loadedNotes = true;
      getNotes(this.hass).then(notes => { this._notes = notes; });
    }
  }

  setConfig(config: HomeAssistantNotesCardConfig): void {
    this._config = config;
  }

  private _update(partial: Partial<HomeAssistantNotesCardConfig>): void {
    this._config = { ...this._config, ...partial };
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="option">
        <label for="title">Title</label>
        <ha-input id="title" .value=${this._config.title ?? 'Notes'}
          @input=${(e: Event) => this._update({ title: (e.target as HTMLInputElement).value })}></ha-input>
      </div>
      <div class="option">
        <label for="max_notes">Max Notes to Display</label>
        <ha-input id="max_notes" type="number" ?disabled=${!!this._config.show_all || !!this._config.note_id} min="1" max="20"
          .value=${this._config.note_id ? '1' : String(this._config.max_notes ?? DEFAULT_MAX_NOTES)}
          @input=${(e: Event) => this._update({ max_notes: parseInt((e.target as HTMLInputElement).value, 10) || DEFAULT_MAX_NOTES })}></ha-input>
      </div>
      <div class="option">
        <ha-formfield label="Show Pinned Notes Only">
          <ha-checkbox .checked=${!!this._config.show_pinned_only}
            @change=${(e: Event) => this._update({ show_pinned_only: (e.target as HTMLInputElement).checked })}></ha-checkbox>
        </ha-formfield>
      </div>
      <div class="option">
        <ha-formfield label="Show All Notes">
          <ha-checkbox .checked=${!!this._config.show_all}
            @change=${(e: Event) => this._update({ show_all: (e.target as HTMLInputElement).checked })}></ha-checkbox>
        </ha-formfield>
      </div>
      <div class="option">
        <label for="card_color">Card Background Color (hex)</label>
        <ha-input id="card_color" .value=${this._config.card_color ?? '#FFEB3B'} placeholder="#FFEB3B"
          @input=${(e: Event) => this._update({ card_color: (e.target as HTMLInputElement).value })}></ha-input>
      </div>
      <div class="option">
        <ha-form
          .hass=${this.hass}
          .data=${{ note_id: this._config.note_id ?? '' }}
          .schema=${[{
            name: 'note_id',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: '', label: 'All notes' },
                  ...this._notes.map(n => ({ value: n.note_id, label: n.title || 'Untitled' })),
                ],
              },
            },
          }]}
          .computeLabel=${() => 'Specific Note (optional)'}
          @value-changed=${(e: CustomEvent<{ value: { note_id?: string } }>) => this._update({ note_id: e.detail.value.note_id || null })}
        ></ha-form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-assistant-notes-card-editor': HomeAssistantNotesCardEditor;
  }
}
