import { i as f, r as p, a as g, b as n, t as m, n as w, g as _, s as x, c as u, m as y, d as N, f as $, e as E } from "./format-C5dR12RB.js";
const l = 5, A = 3, C = 1;
var O = Object.defineProperty, S = Object.getOwnPropertyDescriptor, b = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? S(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && O(e, s, o), o;
};
let d = class extends g {
  constructor() {
    super(...arguments), this._config = { type: "custom:home-assistant-notes-card" };
  }
  setConfig(t) {
    this._config = t;
  }
  _update(t) {
    this._config = { ...this._config, ...t }, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  render() {
    return n`
      <div class="option">
        <label for="title">Title</label>
        <ha-input id="title" .value=${this._config.title ?? "Notes"}
          @input=${(t) => this._update({ title: t.target.value })}></ha-input>
      </div>
      <div class="option">
        <label for="max_notes">Max Notes to Display</label>
        <ha-input id="max_notes" type="number" ?disabled=${!!this._config.show_all} min="1" max="20" .value=${String(this._config.max_notes ?? l)}
          @input=${(t) => this._update({ max_notes: parseInt(t.target.value, 10) || l })}></ha-input>
      </div>
      <div class="option">
        <ha-formfield label="Show Pinned Notes Only">
          <ha-checkbox .checked=${!!this._config.show_pinned_only}
            @change=${(t) => this._update({ show_pinned_only: t.target.checked })}></ha-checkbox>
        </ha-formfield>
      </div>
      <div class="option">
        <ha-formfield label="Show All Notes">
          <ha-checkbox .checked=${!!this._config.show_all}
            @change=${(t) => this._update({ show_all: t.target.checked })}></ha-checkbox>
        </ha-formfield>
      </div>
      <div class="option">
        <label for="card_color">Card Background Color (hex)</label>
        <ha-input id="card_color" .value=${this._config.card_color ?? "#FFEB3B"} placeholder="#FFEB3B"
          @input=${(t) => this._update({ card_color: t.target.value })}></ha-input>
      </div>
      <div class="option">
        <label for="note_id">Specific Note ID (optional)</label>
        <ha-input id="note_id" .value=${this._config.note_id ?? ""} placeholder="Leave empty to show all"
          @input=${(t) => this._update({ note_id: t.target.value || null })}></ha-input>
      </div>
    `;
  }
};
d.styles = f`
    .option { margin-bottom: 16px; }
    label { display: block; margin-bottom: 4px; font-weight: 500; }
    ha-input { width: 100%; }
  `;
b([
  p()
], d.prototype, "_config", 2);
d = b([
  m("home-assistant-notes-card-editor")
], d);
var T = Object.defineProperty, D = Object.getOwnPropertyDescriptor, h = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? D(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && T(e, s, o), o;
};
const P = /* @__PURE__ */ new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "s",
  "u",
  "mark",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "blockquote",
  "code",
  "pre",
  "input",
  "label",
  "span",
  "div"
]), k = {
  a: ["href", "target", "rel"],
  input: ["type", "checked", "disabled"]
}, L = /^(https?:|mailto:)/i;
function v(t) {
  if (t.nodeType === Node.TEXT_NODE) return;
  if (t.nodeType !== Node.ELEMENT_NODE) {
    t.parentNode?.removeChild(t);
    return;
  }
  const e = t, s = e.tagName.toLowerCase();
  if (!P.has(s)) {
    const o = e.parentNode;
    for (; e.firstChild; ) o?.insertBefore(e.firstChild, e);
    o?.removeChild(e);
    return;
  }
  const i = k[s] || [];
  if (Array.from(e.attributes).forEach((o) => {
    !i.includes(o.name) && o.name !== "data-type" && o.name !== "data-checked" && e.removeAttribute(o.name);
  }), s === "a") {
    const o = e.getAttribute("href") || "";
    L.test(o) || e.removeAttribute("href"), e.setAttribute("rel", "noopener noreferrer");
  }
  Array.from(e.childNodes).forEach(v);
}
function H(t) {
  const e = new DOMParser().parseFromString(t, "text/html");
  return Array.from(e.body.childNodes).forEach(v), e.body.innerHTML;
}
let c = class extends g {
  constructor() {
    super(...arguments), this._config = { type: "custom:home-assistant-notes-card" }, this._notes = [];
  }
  setConfig(t) {
    if (!t) throw new Error("Invalid configuration");
    this._config = {
      title: "Notes",
      note_id: null,
      show_all: !1,
      max_notes: l,
      show_pinned_only: !1,
      card_color: null,
      ...t
    };
  }
  updated(t) {
    t.has("hass") && this.hass && !this._unsubscribe && this._init();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe?.(), this._unsubscribe = void 0;
  }
  async _init() {
    this._notes = await _(this.hass), this._unsubscribe = await x(this.hass, async () => {
      this._notes = await _(this.hass);
    });
  }
  getCardSize() {
    return this._config.note_id ? A : (this._config.show_all ? this._notes.length : Math.min(this._config.max_notes ?? l, this._notes.length)) + C;
  }
  static getConfigElement() {
    return document.createElement("home-assistant-notes-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:home-assistant-notes-card", title: "Notes", show_all: !1, max_notes: l, show_pinned_only: !1 };
  }
  _openPanel() {
    window.history.pushState(null, "", "/home-assistant-notes"), window.dispatchEvent(new Event("location-changed", { bubbles: !0, composed: !0 }));
  }
  _renderNote(t, e) {
    return n`
      <div class="note" style="--note-color:${u(t.color)}" @click=${() => this._openPanel()}>
        <div class="note-title">
          <span>${t.title || "Untitled"}</span>
          ${t.pinned ? n`<ha-svg-icon .path=${y}></ha-svg-icon>` : ""}
        </div>
        ${e ? n`<div class="note-content" .innerHTML=${H(t.content || "")}></div>` : n`<div class="note-content">${(() => {
      const s = N(t.content || "");
      return s.length > 150 ? `${s.slice(0, 150)}…` : s;
    })()}</div>`}
        ${t.tags?.length ? n`<div class="tags">${t.tags.map((s) => n`<span class="tag">${s}</span>`)}</div>` : ""}
        <div class="note-meta">${$(t.modified)}</div>
      </div>
    `;
  }
  render() {
    const t = this._config.card_color ? `background:${u(this._config.card_color)}` : "";
    let e;
    if (this._config.note_id) {
      const s = this._notes.find((i) => i.note_id === this._config.note_id);
      e = s ? this._renderNote(s, !0) : n`<div class="empty">Note not found</div>`;
    } else {
      let s = this._config.show_pinned_only ? this._notes.filter((a) => a.pinned) : this._notes;
      const i = s.length, o = this._config.max_notes ?? l;
      this._config.show_all || (s = s.slice(0, o)), e = s.length === 0 ? n`<div class="empty">No notes to display</div>` : n`
            ${s.map((a) => this._renderNote(a, !1))}
            ${!this._config.show_all && i > o ? n`<ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._openPanel()}>View All Notes</ha-button>` : ""}
          `;
    }
    return n`
      <ha-card style=${t}>
        <div class="header">
          <ha-svg-icon .path=${E}></ha-svg-icon>
          <span>${this._config.title}</span>
        </div>
        ${e}
      </ha-card>
    `;
  }
};
c.styles = f`
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
h([
  w({ attribute: !1 })
], c.prototype, "hass", 2);
h([
  p()
], c.prototype, "_config", 2);
h([
  p()
], c.prototype, "_notes", 2);
c = h([
  m("home-assistant-notes-card")
], c);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "home-assistant-notes-card",
  name: "Home Assistant Notes Card",
  description: "Display notes from Home Assistant Notes",
  preview: !0,
  documentationURL: "https://github.com/dimac-h/Home-Assistant-Notes"
});
export {
  c as HomeAssistantNotesCard
};
