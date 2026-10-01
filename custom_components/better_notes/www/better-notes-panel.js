import { A, E as H, i as g, n as l, a as _, h as M, c as B, m as R, b as a, f as j, t as w, d as V, r as p, N as q, j as U, k as G, s as F, g as W, l as Y, D as K, u as X, o as J } from "./format-1mjcoacS.js";
const Q = (t, e, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(t, e, i), i);
function E(t, e) {
  return (i, s, o) => {
    const r = (n) => n.renderRoot?.querySelector(t) ?? null;
    return Q(i, s, { get() {
      return r(this);
    } });
  };
}
const Z = { CHILD: 2 }, tt = (t) => (...e) => ({ _$litDirective$: t, values: e });
class et {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
}
class T extends et {
  constructor(e) {
    if (super(e), this.it = A, e.type !== Z.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === A || e == null) return this._t = void 0, this.it = e;
    if (e === H) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const i = [e];
    return i.raw = i, this._t = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
T.directiveName = "unsafeHTML", T.resultType = 1;
const it = tt(T);
var ot = Object.defineProperty, st = Object.getOwnPropertyDescriptor, N = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? st(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ot(e, i, o), o;
};
const rt = /* @__PURE__ */ new Set([
  "P",
  "BR",
  "UL",
  "OL",
  "LI",
  "LABEL",
  "SPAN",
  "DIV",
  "STRONG",
  "B",
  "EM",
  "I",
  "S",
  "U",
  "MARK",
  "INPUT"
]);
function D(t) {
  let e = t.firstChild;
  for (; e; ) {
    const i = e.nextSibling;
    if (e.nodeType === Node.TEXT_NODE) {
      e = i;
      continue;
    }
    if (e.nodeType !== Node.ELEMENT_NODE) {
      t.removeChild(e), e = i;
      continue;
    }
    const s = e;
    if (!rt.has(s.tagName)) {
      if (s.tagName === "SCRIPT" || s.tagName === "STYLE") {
        s.remove(), e = i;
        continue;
      }
      const o = s.firstChild;
      for (; s.firstChild; ) t.insertBefore(s.firstChild, s);
      t.removeChild(s), e = o ?? i;
      continue;
    }
    Array.from(s.attributes).forEach((o) => {
      s.tagName === "INPUT" && o.name === "checked" || s.tagName === "UL" && o.name === "data-type" || s.tagName === "LI" && o.name === "data-checked" || s.removeAttribute(o.name);
    }), s.tagName === "INPUT" && (s.setAttribute("type", "checkbox"), s.setAttribute("disabled", "")), D(s), e = i;
  }
}
function nt(t) {
  const e = new DOMParser().parseFromString(t, "text/html");
  return D(e.body), Array.from(e.body.querySelectorAll("p")).forEach((i) => {
    !i.textContent?.trim() && !i.querySelector("input") && i.remove();
  }), e.body.innerHTML;
}
let x = class extends _ {
  constructor() {
    super(...arguments), this.active = !1, this._select = () => {
      this.dispatchEvent(new CustomEvent("note-select", {
        detail: { noteId: this.note.note_id },
        bubbles: !0,
        composed: !0
      }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this._select);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this._select);
  }
  render() {
    const t = nt(this.note.content || ""), { title: e, muted: i } = M(this.note.color);
    return a`
      <div
        class="card"
        style="background:${B(this.note.color)}; --note-text:${e}; --note-text-muted:${i}"
      >
        <div class="header">
          <div class="title">${this.note.title || "Untitled"}</div>
          ${this.note.pinned ? a`<ha-svg-icon .path=${R}></ha-svg-icon>` : ""}
        </div>
        <div class="preview">${it(t)}</div>
        <div class="date">${j(this.note.modified)}</div>
      </div>
    `;
  }
};
x.styles = g`
    :host { display: block; cursor: pointer; margin-block-end: var(--ha-space-2); }
    .card {
      border-radius: 6px;
      padding: var(--ha-space-3);
    }
    :host(:hover) .card { box-shadow: var(--ha-box-shadow-s, 0 2px 6px rgba(0, 0, 0, 0.15)); }
    :host([active]) .card { box-shadow: 0 0 0 2px var(--primary-color); }
    .header { display: flex; align-items: center; gap: var(--ha-space-2); margin-block-end: 4px; }
    .title {
      font-size: 15px; line-height: 1.3; font-weight: 600; color: var(--note-text);
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;
    }
    .preview {
      font-size: 13px; line-height: 1.4; color: var(--note-text-muted);
      margin-block-end: 4px; pointer-events: none;
      display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3;
      line-clamp: 3; overflow: hidden;
    }
    .preview p, .preview li { margin: 0; }
    .preview ul, .preview ol { margin: 0; padding-inline-start: 1.1em; }
    .preview ul[data-type='taskList'] { list-style: none; padding-inline-start: 0; }
    .preview ul[data-type='taskList'] li > div,
    .preview ul[data-type='taskList'] li > div > p { display: inline; }
    .preview input[type='checkbox'] { vertical-align: middle; margin-inline-end: 4px; }
    .date { font-size: 12px; line-height: 1.3; color: var(--note-text-muted); }
    ha-svg-icon { --mdc-icon-size: 14px; color: var(--note-text-muted); flex-shrink: 0; }
  `;
N([
  l({ attribute: !1 })
], x.prototype, "note", 2);
N([
  l({ type: Boolean, reflect: !0 })
], x.prototype, "active", 2);
x = N([
  w("better-notes-list-item")
], x);
var at = Object.defineProperty, lt = Object.getOwnPropertyDescriptor, L = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? lt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && at(e, i, o), o;
};
let f = class extends _ {
  constructor() {
    super(...arguments), this.notes = [], this.selectedNoteId = null, this.searchTerm = "";
  }
  _onSearch(t) {
    const e = t.target.value;
    this.dispatchEvent(new CustomEvent("search-changed", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
  _onNew() {
    this.dispatchEvent(new CustomEvent("note-new", { bubbles: !0, composed: !0 }));
  }
  get _filtered() {
    const t = this.searchTerm.toLowerCase();
    return t ? this.notes.filter(
      (e) => (e.title || "").toLowerCase().includes(t) || V(e.content || "").toLowerCase().includes(t)
    ) : this.notes;
  }
  render() {
    const t = this._filtered;
    return a`
      <div class="header">
        <div class="title-row">
          <ha-menu-button></ha-menu-button>
          <h1>Home Assistant Notes</h1>
        </div>
        <div class="search-wrap">
          <ha-input appearance="plain" size="s" placeholder="Search notes..." .value=${this.searchTerm} @input=${this._onSearch} @keydown=${(e) => e.stopPropagation()}></ha-input>
        </div>
        <ha-button size="s" appearance="filled" variant="brand" @click=${this._onNew}>New note</ha-button>
      </div>
      <div class="items">
        ${t.length === 0 ? a`<div class="empty">No notes found</div>` : t.map((e) => a`
              <better-notes-list-item .note=${e} ?active=${this.selectedNoteId === e.note_id}></better-notes-list-item>
            `)}
      </div>
    `;
  }
};
f.styles = g`
    :host { display: flex; flex-direction: column; height: 100%; background: var(--card-background-color); }
    .header {
      background: var(--card-background-color);
      padding-block: max(var(--ha-space-4), var(--safe-area-inset-top, env(safe-area-inset-top, 0px))) var(--ha-space-3);
      padding-inline: var(--ha-space-4);
    }
    .title-row { display: flex; align-items: center; gap: var(--ha-space-2); margin-block-end: var(--ha-space-3); }
    ha-menu-button { flex-shrink: 0; }
    h1 {
      font-size: 20px; line-height: 1.25; font-weight: 600; letter-spacing: -0.01em;
      color: var(--primary-text-color); margin: 0;
    }
    .search-wrap {
      margin-block-end: var(--ha-space-3);
      border-radius: 6px;
      box-shadow: 0 0 0 1px var(--divider-color);
      overflow: hidden;
    }
    ha-input {
      display: block; width: 100%;
      --ha-color-form-background: var(--card-background-color);
      --ha-color-form-background-hover: var(--card-background-color);
      --ha-color-form-background-focus: var(--card-background-color);
      --ha-color-form-background-active: var(--card-background-color);
      font-size: 12px;
    }
    /* ha-input's internal wa-input::part(base) hardcodes height: 56px with
       no CSS variable indirection — target the exported shadow part
       directly instead of clipping/offsetting the whole element, so this
       tracks the control's real box rather than a guessed pixel offset. */
    ha-input::part(base) { height: 28px; min-height: 28px; }
    ha-button { width: 100%; --wa-form-control-border-radius: 6px; --ha-button-height: 40px; }
    ha-button::part(base) { height: 40px; }
    .items { flex: 1; overflow-y: auto; padding: var(--ha-space-3) var(--ha-space-4); scrollbar-width: none; }
    .items::-webkit-scrollbar { display: none; }
    .empty { padding: 20px; text-align: center; color: var(--secondary-text-color); font-size: 14px; }
  `;
L([
  l({ attribute: !1 })
], f.prototype, "notes", 2);
L([
  l({ type: String })
], f.prototype, "selectedNoteId", 2);
L([
  l({ type: String })
], f.prototype, "searchTerm", 2);
f = L([
  w("better-notes-list")
], f);
var ct = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, k = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? dt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ct(e, i, o), o;
};
let h = class extends _ {
  constructor() {
    super(...arguments), this.pinned = !1, this.color = "", this.linkHref = "", this._openGroup = null, this._linkOpen = !1;
  }
  _toggleGroup(t) {
    this._openGroup = this._openGroup === t ? null : t;
  }
  _closeAll() {
    this._openGroup = null;
  }
  _dispatchAction(t, e) {
    this.dispatchEvent(new CustomEvent("toolbar-action", { detail: { action: t, payload: e }, bubbles: !0, composed: !0 })), this._closeAll();
  }
  _selectColor(t) {
    this.dispatchEvent(new CustomEvent("color-select", { detail: { color: t }, bubbles: !0, composed: !0 })), this._closeAll();
  }
  _togglePin() {
    this.dispatchEvent(new CustomEvent("pin-toggle", { bubbles: !0, composed: !0 }));
  }
  _openLink() {
    this._closeAll(), this._linkOpen = !0, this.dispatchEvent(new CustomEvent("link-open-requested", { bubbles: !0, composed: !0 }));
  }
  _isValidUrl(t) {
    try {
      const e = new URL(t);
      return ["https:", "http:", "mailto:"].includes(e.protocol);
    } catch {
      return !1;
    }
  }
  _applyLink() {
    const e = this.renderRoot.querySelector(".link-row ha-input")?.value?.trim();
    e && this._isValidUrl(e) && this._dispatchAction("setLink", { href: e }), this._linkOpen = !1;
  }
  render() {
    return a`
      <div class="group ${this._openGroup === "heading" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("heading")} @mousedown=${(t) => t.preventDefault()}>H<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <button class="item" @click=${() => this._dispatchAction("paragraph")}>Normal</button>
          <button class="item" @click=${() => this._dispatchAction("h1")}>H1</button>
          <button class="item" @click=${() => this._dispatchAction("h2")}>H2</button>
          <button class="item" @click=${() => this._dispatchAction("h3")}>H3</button>
        </div>
      </div>
      <div class="group ${this._openGroup === "format" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("format")} @mousedown=${(t) => t.preventDefault()}>B<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <button class="item" @click=${() => this._dispatchAction("bold")}>Bold</button>
          <button class="item" @click=${() => this._dispatchAction("italic")}>Italic</button>
          <button class="item" @click=${() => this._dispatchAction("strike")}>Strikethrough</button>
          <button class="item" @click=${() => this._dispatchAction("highlight")}>Highlight</button>
          <div class="divider"></div>
          <button class="item" @click=${() => this._dispatchAction("code")}>Code</button>
          <button class="item" @click=${() => this._dispatchAction("codeBlock")}>Code block</button>
          <button class="item" @click=${() => this._dispatchAction("blockquote")}>Blockquote</button>
        </div>
      </div>
      <div class="group ${this._openGroup === "list" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("list")} @mousedown=${(t) => t.preventDefault()}>≡<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <button class="item" @click=${() => this._dispatchAction("bulletList")}>Bullet list</button>
          <button class="item" @click=${() => this._dispatchAction("orderedList")}>Numbered list</button>
          <button class="item" @click=${() => this._dispatchAction("taskList")}>Checklist</button>
          <div class="divider"></div>
          <button class="item" @click=${() => this._dispatchAction("indent")}>Indent</button>
          <button class="item" @click=${() => this._dispatchAction("outdent")}>Outdent</button>
        </div>
      </div>
      <div class="group ${this._openGroup === "color" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("color")} @mousedown=${(t) => t.preventDefault()}>Color<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <div class="swatches">
            ${q.map((t) => a`
              <div class="dot ${this.color === t ? "active" : ""}" style="background:${t}"
                   @click=${() => this._selectColor(t)}></div>
            `)}
          </div>
        </div>
      </div>
      <ha-button size="s" appearance="plain" variant=${this.pinned ? "brand" : "neutral"} @click=${() => this._togglePin()} @mousedown=${(t) => t.preventDefault()}>
        ${this.pinned ? "Pinned" : "Pin"}
      </ha-button>
      <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._openLink()} @mousedown=${(t) => t.preventDefault()}>Link</ha-button>
      ${this._linkOpen ? a`
        <div class="link-row">
          <ha-input type="url" placeholder="https://…" .value=${this.linkHref} @keydown=${(t) => t.stopPropagation()}></ha-input>
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._applyLink()}>Apply</ha-button>
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._dispatchAction("unsetLink")}>Remove</ha-button>
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => {
      this._linkOpen = !1;
    }}>✕</ha-button>
        </div>
      ` : ""}
    `;
  }
};
h.styles = g`
    :host {
      display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 8px 12px;
      background: var(--card-background-color); border: 1px solid var(--divider-color);
      border-radius: 16px; box-shadow: var(--ha-box-shadow-m, 0 4px 16px rgba(0,0,0,0.2));
    }
    @media (max-width: 767px) {
      :host { gap: 2px; padding: 4px 6px; border-radius: 12px; }
      .caret { display: none; }
    }
    .group { position: relative; }
    .dropdown {
      display: none; position: absolute; bottom: calc(100% + 6px); left: 0;
      background: var(--card-background-color); border: 1px solid var(--divider-color);
      border-radius: 8px; box-shadow: var(--ha-box-shadow-m, 0 4px 16px rgba(0,0,0,0.2));
      z-index: 200; min-width: 150px; padding: 4px 0;
    }
    .group.open .dropdown { display: block; }
    .item {
      display: block; width: 100%; padding: 8px 14px; text-align: left; border: none;
      background: none; color: var(--primary-text-color); cursor: pointer; font-size: 14px;
    }
    .item:hover { background: var(--secondary-background-color); }
    .divider { height: 1px; background: var(--divider-color); margin: 4px 0; }
    .swatches { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px; }
    .dot { width: 24px; height: 24px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; }
    .dot.active { border-color: var(--primary-text-color); }
    .link-row { display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px 0 2px; flex-basis: 100%; }
    .link-row ha-input { flex: 1; }
  `;
k([
  l({ type: Boolean })
], h.prototype, "pinned", 2);
k([
  l({ type: String })
], h.prototype, "color", 2);
k([
  l({ type: String })
], h.prototype, "linkHref", 2);
k([
  p()
], h.prototype, "_openGroup", 2);
k([
  p()
], h.prototype, "_linkOpen", 2);
h = k([
  w("better-notes-toolbar")
], h);
async function pt() {
  const [{ Editor: t }, { StarterKit: e }, { TaskList: i }, { TaskItem: s }, { Link: o }, { Highlight: r }, { ListItem: n }] = await Promise.all([
    import("./index-pa5U7i3D.js").then((u) => u.O),
    import("./index-Yys9n5GD.js"),
    import("./index-B0TKEn8L.js"),
    import("./index-D6ncd5DV.js"),
    import("./index-Vi6toNLn.js"),
    import("./index-lBYWkvms.js"),
    import("./index-C46ou4Bj.js")
  ]);
  return {
    Editor: t,
    extensions: [
      // listItem: false — replaced below with a ListItem that also allows a
      // heading as its first child. The default ListItem content model is
      // 'paragraph block*' (first child must specifically be a paragraph),
      // so toggling a list item to a heading is invalid at that level and
      // ProseMirror climbs up through every ancestor list to find a place
      // it IS valid, collapsing all nested indentation in the process.
      e.configure({ heading: { levels: [1, 2, 3] }, link: !1, listItem: !1, hardBreak: !1 }),
      n.extend({ content: "(paragraph|heading) block*" }),
      i,
      s.configure({ nested: !0 }),
      o.configure({ openOnClick: !0 }),
      r
    ]
  };
}
var ht = Object.defineProperty, ut = Object.getOwnPropertyDescriptor, P = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ut(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && ht(e, i, o), o;
};
let y = class extends _ {
  constructor() {
    super(...arguments), this.content = "", this._editor = null, this._fallback = !1, this._lastEmitted = "";
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this._init();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._editor?.destroy(), this._editor = null;
  }
  updated(t) {
    t.has("content") && this._editor && this.content !== this._lastEmitted && (this._lastEmitted = this.content, this._editor.commands.setContent(this.content, { emitUpdate: !1 }), this._editor.commands.focus("end"));
  }
  // Re-scrolls the caret into view if the editor has focus. Needed after the
  // on-screen keyboard finishes opening: the autofocus scroll runs before the
  // viewport has shrunk, so the caret (at the end of the note) ends up hidden.
  scrollCaretIntoView() {
    this._editor?.isFocused && this._editor.commands.scrollIntoView();
  }
  async _init() {
    let t;
    try {
      t = await pt();
    } catch (s) {
      console.warn("Home Assistant Notes: Tiptap failed to load, falling back to textarea", s), t = null;
    }
    if (!t || !this._mount) {
      this._fallback = !0, this.requestUpdate();
      return;
    }
    const { Editor: e, extensions: i } = t;
    this._editor = new e({
      element: this._mount,
      extensions: i,
      content: this.content,
      autofocus: "end",
      onUpdate: () => this._emitChanged()
    }), this._lastEmitted = this._editor.getHTML(), this._mount?.addEventListener("change", (s) => {
      const o = s.target;
      o instanceof HTMLInputElement && o.type === "checkbox" && o.closest('ul[data-type="taskList"]') && this._reorderTaskList(o);
    });
  }
  // Keeps a checklist tidy after a check/uncheck: unchecked items on top,
  // checked items below, each group sorted alphabetically. Only runs on
  // checkbox toggle (not on every keystroke) so typing a new item doesn't
  // jump around the list while the user is still writing it.
  _reorderTaskList(t) {
    const e = this._editor?.view, i = t.closest("li");
    if (!e || !i) return;
    const s = e.state.doc.resolve(e.posAtDOM(i, 0));
    let o = s.depth;
    for (; o > 0 && s.node(o).type.name !== "taskList"; ) o--;
    if (s.node(o).type.name !== "taskList") return;
    const r = s.node(o), n = [];
    r.forEach((m) => n.push(m));
    const u = [...n].sort((m, C) => {
      const S = !!m.attrs.checked, z = !!C.attrs.checked;
      return S !== z ? S ? 1 : -1 : (m.textContent || "").trim().localeCompare((C.textContent || "").trim());
    });
    if (u.every((m, C) => m === n[C])) return;
    const $ = s.before(o) + 1, I = $ + r.content.size;
    e.dispatch(e.state.tr.replaceWith($, I, u));
  }
  _emitChanged() {
    this._lastEmitted = this.getHTML(), this.dispatchEvent(new CustomEvent("content-changed", {
      detail: { html: this._lastEmitted },
      bubbles: !0,
      composed: !0
    }));
  }
  getHTML() {
    return this._editor ? this._editor.getHTML() : this.renderRoot.querySelector("#fallback")?.value ?? this.content;
  }
  getLinkHref() {
    return this._editor?.getAttributes("link").href ?? "";
  }
  runAction(t, e) {
    const i = this._editor?.chain().focus();
    if (i)
      switch (t) {
        case "paragraph":
          i.setParagraph().run();
          break;
        case "h1":
          i.toggleHeading({ level: 1 }).run();
          break;
        case "h2":
          i.toggleHeading({ level: 2 }).run();
          break;
        case "h3":
          i.toggleHeading({ level: 3 }).run();
          break;
        case "bold":
          i.toggleBold().run();
          break;
        case "italic":
          i.toggleItalic().run();
          break;
        case "strike":
          i.toggleStrike().run();
          break;
        case "highlight":
          i.toggleHighlight().run();
          break;
        case "code":
          i.toggleCode().run();
          break;
        case "codeBlock":
          i.toggleCodeBlock().run();
          break;
        case "blockquote":
          i.toggleBlockquote().run();
          break;
        case "bulletList":
          i.toggleBulletList().run();
          break;
        case "orderedList":
          i.toggleOrderedList().run();
          break;
        case "taskList":
          i.toggleTaskList().run();
          break;
        case "indent":
          i.sinkListItem("listItem").run();
          break;
        case "outdent":
          i.liftListItem("listItem").run();
          break;
        case "setLink":
          e?.href && i.setLink({ href: e.href }).run();
          break;
        case "unsetLink":
          i.unsetLink().run();
          break;
      }
  }
  render() {
    return this._fallback ? a`<textarea
        id="fallback"
        class="fallback"
        placeholder="Start typing..."
        .value=${this.content}
        @input=${() => this._emitChanged()}
        @keydown=${(t) => t.stopPropagation()}
      ></textarea>` : a`<div id="mount" @keydown=${(t) => t.stopPropagation()}></div>`;
  }
};
y.styles = g`
    :host { display: flex; flex-direction: column; min-height: 0; flex: 1; }
    .fallback {
      width: 100%; min-height: 300px; font-size: 15px; line-height: 1.6;
      border: none; outline: none; resize: none; color: var(--primary-text-color);
      background: transparent; font-family: inherit;
    }
    #mount { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .ProseMirror,
    .ProseMirror:focus,
    .ProseMirror:focus-visible {
      outline: none;
    }
    .ProseMirror {
      flex: 1; min-height: 100%; cursor: text; overflow-wrap: anywhere;
    }
    .ProseMirror ul[data-type="taskList"] {
      list-style: none;
      padding-left: 0;
    }
    .ProseMirror ul[data-type="taskList"] li {
      display: flex;
      align-items: flex-start;
      margin: 1em 0;
    }
    .ProseMirror ul[data-type="taskList"] li > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }
    .ProseMirror ul[data-type="taskList"] li > div {
      flex: 1 1 auto;
    }
    .ProseMirror ul[data-type="taskList"] li > div > p {
      margin: 0;
    }
    .ProseMirror ul[data-type="taskList"] input[type="checkbox"] {
      cursor: pointer;
    }
    .ProseMirror pre {
      background-color: var(--primary-text-color);
      color: var(--card-background-color);
      border-radius: var(--ha-border-radius-sm, 8px);
      padding: var(--ha-space-4, 16px);
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--ha-font-family-code, monospace);
    }
    .ProseMirror pre code {
      background: none;
      color: inherit;
      padding: 0;
    }
    .ProseMirror blockquote {
      border-left: 4px solid var(--divider-color);
      margin-inline: 0;
      padding-inline: 1em;
    }
  `;
P([
  l({ attribute: !1 })
], y.prototype, "content", 2);
P([
  E("#mount")
], y.prototype, "_mount", 2);
y = P([
  w("better-notes-tiptap-editor")
], y);
var bt = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, b = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? vt(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && bt(e, i, o), o;
};
function O(t) {
  if (!/data-type=["']taskList["']/.test(t)) return t;
  const e = new DOMParser().parseFromString(t, "text/html");
  return e.body.querySelectorAll('ul[data-type="taskList"]').forEach((i) => {
    [...Array.from(i.children).filter((r) => r.tagName === "LI")].sort((r, n) => {
      const u = r.getAttribute("data-checked") === "true", $ = n.getAttribute("data-checked") === "true";
      return u !== $ ? u ? 1 : -1 : (r.textContent || "").trim().localeCompare((n.textContent || "").trim());
    }).forEach((r) => i.appendChild(r));
  }), e.body.innerHTML;
}
let c = class extends _ {
  constructor() {
    super(...arguments), this.note = null, this._pendingDelete = !1, this._justSaved = !1, this._displayContent = "", this._onViewportResize = () => {
      const t = window.visualViewport;
      if (!t) return;
      this.style.setProperty("--better-notes-visible-height", `${t.height}px`);
      const e = window.innerHeight - t.height > 100;
      this.toggleAttribute("keyboard-open", e), this.toggleAttribute("browser-bar", !e && t.offsetTop + t.height < window.screen.height - 20), this.style.setProperty("--better-notes-offset-top", e ? `${t.offsetTop}px` : "0px"), !e && (window.scrollY || t.offsetTop) && window.scrollTo(0, 0), e && requestAnimationFrame(() => this._tiptap?.scrollCaretIntoView());
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.visualViewport?.addEventListener("resize", this._onViewportResize), window.visualViewport?.addEventListener("scroll", this._onViewportResize), this._onViewportResize();
  }
  // Flushes a sorted save for the note we're navigating away from — using
  // willUpdate (before render) rather than updated() means `this._tiptap`
  // still holds the departing note's (possibly unsaved) content, since the
  // child's `.content` binding hasn't re-rendered to the new note yet.
  willUpdate(t) {
    if (!t.has("note")) return;
    const e = t.get("note");
    e?.note_id !== this.note?.note_id && (e && this._flushSorted(e), this._displayContent = this.note ? O(this.note.content || "") : "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._saveTimeout), clearTimeout(this._deleteTimeout), clearTimeout(this._toastTimeout), window.visualViewport?.removeEventListener("resize", this._onViewportResize), window.visualViewport?.removeEventListener("scroll", this._onViewportResize);
  }
  _scheduleSave() {
    clearTimeout(this._saveTimeout), this._saveTimeout = setTimeout(() => this._save(), 1e3);
  }
  _save(t = {}) {
    if (!this.note) return;
    const e = {
      note_id: this.note.note_id,
      title: t.title ?? this._titleInput?.value ?? this.note.title,
      content: t.content ?? this._tiptap?.getHTML() ?? this.note.content,
      color: t.color ?? this.note.color,
      pinned: t.pinned ?? this.note.pinned
    };
    this.dispatchEvent(new CustomEvent("note-save", { detail: e, bubbles: !0, composed: !0 })), this._justSaved = !0, clearTimeout(this._toastTimeout), this._toastTimeout = setTimeout(() => {
      this._justSaved = !1;
    }, 1e3);
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
  _flushSorted(t) {
    clearTimeout(this._saveTimeout);
    const e = O(this._tiptap?.getHTML() ?? t.content), i = this._titleInput?.value ?? t.title;
    this._displayContent = e, !(e === t.content && i === t.title) && this.dispatchEvent(new CustomEvent("note-save", {
      detail: { note_id: t.note_id, title: i, content: e, color: t.color, pinned: t.pinned },
      bubbles: !0,
      composed: !0
    }));
  }
  _onToolbarAction(t) {
    this._tiptap?.runAction(t.detail.action, t.detail.payload);
  }
  _onColorSelect(t) {
    clearTimeout(this._saveTimeout), this._save({ color: t.detail.color });
  }
  _onPinToggle() {
    this.note && (clearTimeout(this._saveTimeout), this._save({ pinned: !this.note.pinned }));
  }
  _onLinkOpenRequested(t) {
    const e = t.target;
    e.linkHref = this._tiptap?.getLinkHref() ?? "";
  }
  _onDelete() {
    if (this.note) {
      if (!this._pendingDelete) {
        this._pendingDelete = !0, this._deleteTimeout = setTimeout(() => {
          this._pendingDelete = !1;
        }, 3e3);
        return;
      }
      clearTimeout(this._deleteTimeout), this._pendingDelete = !1, this.dispatchEvent(new CustomEvent("note-delete", { detail: { noteId: this.note.note_id }, bubbles: !0, composed: !0 }));
    }
  }
  render() {
    return this.note ? a`
      <div class="header">
        <ha-icon-button class="back-btn" .path=${U} @click=${() => {
      this.note && this._flushSorted(this.note), this.dispatchEvent(new CustomEvent("editor-back", { bubbles: !0, composed: !0 }));
    }}></ha-icon-button>
        <div class="actions">
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => {
      clearTimeout(this._saveTimeout), this._save();
    }}>
            ${this._justSaved ? a`<ha-svg-icon .path=${G}></ha-svg-icon>` : "Save"}
          </ha-button>
          <ha-button size="s" appearance="plain" variant="danger" @click=${() => this._onDelete()}>${this._pendingDelete ? "Confirm?" : "Delete"}</ha-button>
        </div>
      </div>
      <div class="body">
        <input
          class="title-input"
          type="text"
          placeholder="Note Title"
          .value=${this.note.title || ""}
          @input=${() => this._scheduleSave()}
          @keydown=${(t) => t.stopPropagation()}
        >
        <better-notes-tiptap-editor
          .content=${this._displayContent}
          @content-changed=${() => this._scheduleSave()}
        ></better-notes-tiptap-editor>
      </div>
      <better-notes-toolbar
        .pinned=${this.note.pinned}
        .color=${this.note.color}
        @toolbar-action=${this._onToolbarAction}
        @color-select=${this._onColorSelect}
        @pin-toggle=${this._onPinToggle}
        @link-open-requested=${this._onLinkOpenRequested}
      ></better-notes-toolbar>
    ` : a`<div class="empty">Select a note or create one</div>`;
  }
};
c.styles = g`
    :host {
      display: flex; flex-direction: column; height: var(--better-notes-visible-height, 100%);
      background: var(--card-background-color);
      min-width: 0; min-height: 0; position: relative;
      transform: translateY(var(--better-notes-offset-top, 0px));
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
    better-notes-tiptap-editor { flex: 1; min-height: 0; display: flex; flex-direction: column; }
    better-notes-toolbar {
      flex-shrink: 0;
      margin: 8px 12px 12px;
      margin-bottom: calc(12px + var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px)));
    }
    /* The home-indicator inset is covered by the keyboard while it's open. */
    :host([keyboard-open]) better-notes-toolbar { margin-bottom: 8px; }
    /* Same when Safari's own bottom bar sits over the inset instead of the keyboard. */
    :host([browser-bar]) better-notes-toolbar { margin-bottom: 12px; }
    .title-input {
      width: 100%; font-size: 28px; font-weight: 700; border: none; outline: none; margin-bottom: 16px;
      color: var(--primary-text-color); background: transparent; font-family: inherit;
    }
    .empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100%; color: var(--secondary-text-color);
    }
  `;
b([
  l({ attribute: !1 })
], c.prototype, "note", 2);
b([
  p()
], c.prototype, "_pendingDelete", 2);
b([
  p()
], c.prototype, "_justSaved", 2);
b([
  E("better-notes-tiptap-editor")
], c.prototype, "_tiptap", 2);
b([
  E(".title-input")
], c.prototype, "_titleInput", 2);
b([
  p()
], c.prototype, "_displayContent", 2);
c = b([
  w("better-notes-editor")
], c);
var mt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, v = (t, e, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ft(e, i) : e, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (o = (s ? n(e, i, o) : n(o)) || o);
  return s && o && mt(e, i, o), o;
};
function gt(t) {
  return [...t].sort((e, i) => e.pinned !== i.pinned ? e.pinned ? -1 : 1 : new Date(i.modified).getTime() - new Date(e.modified).getTime());
}
let d = class extends _ {
  constructor() {
    super(...arguments), this.narrow = !1, this._notes = [], this._selectedId = null, this._searchTerm = "", this._view = "list", this._creatingNote = !1, this._pushedEditorState = !1, this._onPopState = () => {
      this._pushedEditorState && (this._pushedEditorState = !1, this._view = "list");
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.hass && this._init(), window.addEventListener("popstate", this._onPopState);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribe?.(), this._unsubscribe = void 0, window.removeEventListener("popstate", this._onPopState);
  }
  _enterEditor(t) {
    this._selectedId = t, this.narrow && this._view !== "editor" && (history.pushState({ betterNotesEditor: !0 }, "", location.href), this._pushedEditorState = !0), this._view = "editor";
  }
  _leaveEditor() {
    this._pushedEditorState ? (this._pushedEditorState = !1, this._view = "list", history.back()) : this._view = "list";
  }
  updated(t) {
    t.has("hass") && this.hass && !this._unsubscribe && this._init(), t.has("_view") && this.setAttribute("data-view", this._view);
  }
  async _init() {
    await this._loadNotes(), this._unsubscribe = await F(this.hass, () => this._loadNotes());
  }
  async _loadNotes() {
    this._notes = gt(await W(this.hass));
  }
  get _selectedNote() {
    return this._notes.find((t) => t.note_id === this._selectedId) ?? null;
  }
  async _onNoteNew() {
    if (!this._creatingNote) {
      this._creatingNote = !0;
      try {
        const t = await Y(this.hass, { title: "New Note", content: "", color: K, pinned: !1 });
        await this._loadNotes(), t && this._enterEditor(t);
      } finally {
        this._creatingNote = !1;
      }
    }
  }
  _onNoteSelect(t) {
    this._enterEditor(t.detail.noteId);
  }
  _onSearchChanged(t) {
    this._searchTerm = t.detail.value;
  }
  async _onNoteSave(t) {
    await X(this.hass, t.detail), await this._loadNotes();
  }
  async _onNoteDelete(t) {
    await J(this.hass, t.detail.noteId), this._selectedId = null, this._leaveEditor(), await this._loadNotes();
  }
  _onEditorBack() {
    this._leaveEditor();
  }
  render() {
    return a`
      <div class="layout">
        <div class="list-pane">
          <better-notes-list
            .notes=${this._notes}
            .selectedNoteId=${this._selectedId}
            .searchTerm=${this._searchTerm}
            @note-select=${this._onNoteSelect}
            @note-new=${this._onNoteNew}
            @search-changed=${this._onSearchChanged}
          ></better-notes-list>
        </div>
        <div class="editor-pane">
          <better-notes-editor
            .note=${this._selectedNote}
            @editor-back=${this._onEditorBack}
            @note-save=${this._onNoteSave}
            @note-delete=${this._onNoteDelete}
          ></better-notes-editor>
        </div>
      </div>
    `;
  }
};
d.styles = g`
    :host { display: block; height: 100%; }
    .layout { display: flex; height: 100%; background: var(--card-background-color); overflow: hidden; }
    .list-pane { flex-shrink: 0; border-inline-end: 1px solid var(--divider-color); }
    .editor-pane { flex: 1; min-width: 0; }
    @media (min-width: 768px) { .list-pane { width: 280px; } }
    @media (max-width: 767px) {
      .list-pane { width: 100%; flex: 1; }
      :host([data-view="list"]) .editor-pane { display: none; }
      :host([data-view="editor"]) .list-pane { display: none; }
    }
  `;
v([
  l({ attribute: !1 })
], d.prototype, "hass", 2);
v([
  l({ type: Boolean })
], d.prototype, "narrow", 2);
v([
  p()
], d.prototype, "_notes", 2);
v([
  p()
], d.prototype, "_selectedId", 2);
v([
  p()
], d.prototype, "_searchTerm", 2);
v([
  p()
], d.prototype, "_view", 2);
d = v([
  w("better-notes-panel")
], d);
export {
  d as BetterNotesPanel
};
