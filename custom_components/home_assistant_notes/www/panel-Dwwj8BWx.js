import { A as Qt, E as Ze, i as Q, n as N, a as Z, h as tn, c as en, m as nn, b as E, f as rn, t as tt, d as sn, r as L, N as on, j as ln, k as an, s as hn, g as cn, l as pn, D as un, u as dn, o as fn } from "./format-C5dR12RB.js";
const mn = (r, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(r, t, e), e);
function qt(r, t) {
  return (e, n, i) => {
    const s = (o) => o.renderRoot?.querySelector(r) ?? null;
    return mn(e, n, { get() {
      return s(this);
    } });
  };
}
const gn = { CHILD: 2 }, yn = (r) => (...t) => ({ _$litDirective$: r, values: t });
class wn {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, n) {
    this._$Ct = t, this._$AM = e, this._$Ci = n;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
class Lt extends wn {
  constructor(t) {
    if (super(t), this.it = Qt, t.type !== gn.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === Qt || t == null) return this._t = void 0, this.it = t;
    if (t === Ze) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const e = [t];
    return e.raw = e, this._t = { _$litType$: this.constructor.resultType, strings: e, values: [] };
  }
}
Lt.directiveName = "unsafeHTML", Lt.resultType = 1;
const xn = yn(Lt);
var vn = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, Ht = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? kn(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && vn(t, e, i), i;
};
const bn = /* @__PURE__ */ new Set([
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
function we(r) {
  let t = r.firstChild;
  for (; t; ) {
    const e = t.nextSibling;
    if (t.nodeType === Node.TEXT_NODE) {
      t = e;
      continue;
    }
    if (t.nodeType !== Node.ELEMENT_NODE) {
      r.removeChild(t), t = e;
      continue;
    }
    const n = t;
    if (!bn.has(n.tagName)) {
      if (n.tagName === "SCRIPT" || n.tagName === "STYLE") {
        n.remove(), t = e;
        continue;
      }
      const i = n.firstChild;
      for (; n.firstChild; ) r.insertBefore(n.firstChild, n);
      r.removeChild(n), t = i ?? e;
      continue;
    }
    Array.from(n.attributes).forEach((i) => {
      n.tagName === "INPUT" && i.name === "checked" || n.tagName === "UL" && i.name === "data-type" || n.tagName === "LI" && i.name === "data-checked" || n.removeAttribute(i.name);
    }), n.tagName === "INPUT" && (n.setAttribute("type", "checkbox"), n.setAttribute("disabled", "")), we(n), t = e;
  }
}
function Sn(r) {
  const t = new DOMParser().parseFromString(r, "text/html");
  return we(t.body), Array.from(t.body.querySelectorAll("p")).forEach((e) => {
    !e.textContent?.trim() && !e.querySelector("input") && e.remove();
  }), t.body.innerHTML;
}
let at = class extends Z {
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
    const r = Sn(this.note.content || ""), { title: t, muted: e } = tn(this.note.color);
    return E`
      <div
        class="card"
        style="background:${en(this.note.color)}; --note-text:${t}; --note-text-muted:${e}"
      >
        <div class="header">
          <div class="title">${this.note.title || "Untitled"}</div>
          ${this.note.pinned ? E`<ha-svg-icon .path=${nn}></ha-svg-icon>` : ""}
        </div>
        <div class="preview">${xn(r)}</div>
        <div class="date">${rn(this.note.modified)}</div>
      </div>
    `;
  }
};
at.styles = Q`
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
Ht([
  N({ attribute: !1 })
], at.prototype, "note", 2);
Ht([
  N({ type: Boolean, reflect: !0 })
], at.prototype, "active", 2);
at = Ht([
  tt("home-assistant-notes-list-item")
], at);
var Cn = Object.defineProperty, En = Object.getOwnPropertyDescriptor, Tt = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? En(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Cn(t, e, i), i;
};
let Y = class extends Z {
  constructor() {
    super(...arguments), this.notes = [], this.selectedNoteId = null, this.searchTerm = "";
  }
  _onSearch(r) {
    const t = r.target.value;
    this.dispatchEvent(new CustomEvent("search-changed", { detail: { value: t }, bubbles: !0, composed: !0 }));
  }
  _onNew() {
    this.dispatchEvent(new CustomEvent("note-new", { bubbles: !0, composed: !0 }));
  }
  get _filtered() {
    const r = this.searchTerm.toLowerCase();
    return r ? this.notes.filter(
      (t) => (t.title || "").toLowerCase().includes(r) || sn(t.content || "").toLowerCase().includes(r)
    ) : this.notes;
  }
  render() {
    const r = this._filtered;
    return E`
      <div class="header">
        <div class="title-row">
          <ha-menu-button></ha-menu-button>
          <h1>Home Assistant Notes</h1>
        </div>
        <div class="search-wrap">
          <ha-input appearance="plain" size="s" placeholder="Search notes..." .value=${this.searchTerm} @input=${this._onSearch} @keydown=${(t) => t.stopPropagation()}></ha-input>
        </div>
        <ha-button size="s" appearance="filled" variant="brand" @click=${this._onNew}>New note</ha-button>
      </div>
      <div class="items">
        ${r.length === 0 ? E`<div class="empty">No notes found</div>` : r.map((t) => E`
              <home-assistant-notes-list-item .note=${t} ?active=${this.selectedNoteId === t.note_id}></home-assistant-notes-list-item>
            `)}
      </div>
    `;
  }
};
Y.styles = Q`
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
Tt([
  N({ attribute: !1 })
], Y.prototype, "notes", 2);
Tt([
  N({ type: String })
], Y.prototype, "selectedNoteId", 2);
Tt([
  N({ type: String })
], Y.prototype, "searchTerm", 2);
Y = Tt([
  tt("home-assistant-notes-list")
], Y);
var Tn = Object.defineProperty, _n = Object.getOwnPropertyDescriptor, et = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? _n(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Tn(t, e, i), i;
};
let B = class extends Z {
  constructor() {
    super(...arguments), this.pinned = !1, this.color = "", this.linkHref = "", this._openGroup = null, this._linkOpen = !1;
  }
  _toggleGroup(r) {
    this._openGroup = this._openGroup === r ? null : r;
  }
  _closeAll() {
    this._openGroup = null;
  }
  _dispatchAction(r, t) {
    this.dispatchEvent(new CustomEvent("toolbar-action", { detail: { action: r, payload: t }, bubbles: !0, composed: !0 })), this._closeAll();
  }
  _selectColor(r) {
    this.dispatchEvent(new CustomEvent("color-select", { detail: { color: r }, bubbles: !0, composed: !0 })), this._closeAll();
  }
  _togglePin() {
    this.dispatchEvent(new CustomEvent("pin-toggle", { bubbles: !0, composed: !0 }));
  }
  _openLink() {
    this._closeAll(), this._linkOpen = !0, this.dispatchEvent(new CustomEvent("link-open-requested", { bubbles: !0, composed: !0 }));
  }
  _isValidUrl(r) {
    try {
      const t = new URL(r);
      return ["https:", "http:", "mailto:"].includes(t.protocol);
    } catch {
      return !1;
    }
  }
  _applyLink() {
    const t = this.renderRoot.querySelector(".link-row ha-input")?.value?.trim();
    t && this._isValidUrl(t) && this._dispatchAction("setLink", { href: t }), this._linkOpen = !1;
  }
  render() {
    return E`
      <div class="group ${this._openGroup === "heading" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("heading")} @mousedown=${(r) => r.preventDefault()}>H<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <button class="item" @click=${() => this._dispatchAction("paragraph")}>Normal</button>
          <button class="item" @click=${() => this._dispatchAction("h1")}>H1</button>
          <button class="item" @click=${() => this._dispatchAction("h2")}>H2</button>
          <button class="item" @click=${() => this._dispatchAction("h3")}>H3</button>
        </div>
      </div>
      <div class="group ${this._openGroup === "format" ? "open" : ""}">
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("format")} @mousedown=${(r) => r.preventDefault()}>B<span class="caret"> ▾</span></ha-button>
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
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("list")} @mousedown=${(r) => r.preventDefault()}>≡<span class="caret"> ▾</span></ha-button>
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
        <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._toggleGroup("color")} @mousedown=${(r) => r.preventDefault()}>Color<span class="caret"> ▾</span></ha-button>
        <div class="dropdown">
          <div class="swatches">
            ${on.map((r) => E`
              <div class="dot ${this.color === r ? "active" : ""}" style="background:${r}"
                   @click=${() => this._selectColor(r)}></div>
            `)}
          </div>
        </div>
      </div>
      <ha-button size="s" appearance="plain" variant=${this.pinned ? "brand" : "neutral"} @click=${() => this._togglePin()} @mousedown=${(r) => r.preventDefault()}>
        ${this.pinned ? "Pinned" : "Pin"}
      </ha-button>
      <ha-button size="s" appearance="plain" variant="neutral" @click=${() => this._openLink()} @mousedown=${(r) => r.preventDefault()}>Link</ha-button>
      ${this._linkOpen ? E`
        <div class="link-row">
          <ha-input type="url" placeholder="https://…" .value=${this.linkHref} @keydown=${(r) => r.stopPropagation()}></ha-input>
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
B.styles = Q`
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
et([
  N({ type: Boolean })
], B.prototype, "pinned", 2);
et([
  N({ type: String })
], B.prototype, "color", 2);
et([
  N({ type: String })
], B.prototype, "linkHref", 2);
et([
  L()
], B.prototype, "_openGroup", 2);
et([
  L()
], B.prototype, "_linkOpen", 2);
B = et([
  tt("home-assistant-notes-toolbar")
], B);
function S(r) {
  this.content = r;
}
S.prototype = {
  constructor: S,
  find: function(r) {
    for (var t = 0; t < this.content.length; t += 2)
      if (this.content[t] === r) return t;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(r) {
    var t = this.find(r);
    return t == -1 ? void 0 : this.content[t + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(r, t, e) {
    var n = e && e != r ? this.remove(e) : this, i = n.find(r), s = n.content.slice();
    return i == -1 ? s.push(e || r, t) : (s[i + 1] = t, e && (s[i] = e)), new S(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(r) {
    var t = this.find(r);
    if (t == -1) return this;
    var e = this.content.slice();
    return e.splice(t, 2), new S(e);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(r, t) {
    return new S([r, t].concat(this.remove(r).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(r, t) {
    var e = this.remove(r).content.slice();
    return e.push(r, t), new S(e);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(r, t, e) {
    var n = this.remove(t), i = n.content.slice(), s = n.find(r);
    return i.splice(s == -1 ? i.length : s, 0, t, e), new S(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(r) {
    for (var t = 0; t < this.content.length; t += 2)
      r(this.content[t], this.content[t + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(r) {
    return r = S.from(r), r.size ? new S(r.content.concat(this.subtract(r).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(r) {
    return r = S.from(r), r.size ? new S(this.subtract(r).content.concat(r.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(r) {
    var t = this;
    r = S.from(r);
    for (var e = 0; e < r.content.length; e += 2)
      t = t.remove(r.content[e]);
    return t;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var r = {};
    return this.forEach(function(t, e) {
      r[t] = e;
    }), r;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
S.from = function(r) {
  if (r instanceof S) return r;
  var t = [];
  if (r) for (var e in r) t.push(e, r[e]);
  return new S(t);
};
function xe(r, t, e) {
  for (let n = 0; ; n++) {
    if (n == r.childCount || n == t.childCount)
      return r.childCount == t.childCount ? null : e;
    let i = r.child(n), s = t.child(n);
    if (i == s) {
      e += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return e;
    if (i.isText && i.text != s.text) {
      let o = i.text, l = s.text, a = 0;
      for (; o[a] == l[a]; a++)
        e++;
      return a && a < o.length && a < l.length && be(o.charCodeAt(a - 1)) && ke(o.charCodeAt(a)) && e--, e;
    }
    if (i.content.size || s.content.size) {
      let o = xe(i.content, s.content, e + 1);
      if (o != null)
        return o;
    }
    e += i.nodeSize;
  }
}
function ve(r, t, e, n) {
  for (let i = r.childCount, s = t.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: e, b: n };
    let o = r.child(--i), l = t.child(--s), a = o.nodeSize;
    if (o == l) {
      e -= a, n -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: e, b: n };
    if (o.isText && o.text != l.text) {
      let h = o.text, c = l.text, p = h.length, u = c.length;
      for (; p > 0 && u > 0 && h[p - 1] == c[u - 1]; )
        p--, u--, e--, n--;
      return p && u && p < h.length && be(h.charCodeAt(p - 1)) && ke(h.charCodeAt(p)) && (e++, n++), { a: e, b: n };
    }
    if (o.content.size || l.content.size) {
      let h = ve(o.content, l.content, e - 1, n - 1);
      if (h)
        return h;
    }
    e -= a, n -= a;
  }
}
function ke(r) {
  return r >= 56320 && r < 57344;
}
function be(r) {
  return r >= 55296 && r < 56320;
}
class f {
  /**
  @internal
  */
  constructor(t, e) {
    if (this.content = t, this.size = e || 0, e == null)
      for (let n = 0; n < t.length; n++)
        this.size += t[n].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(t, e, n, i = 0, s) {
    for (let o = 0, l = 0; l < e; o++) {
      let a = this.content[o], h = l + a.nodeSize;
      if (h > t && n(a, i + l, s || null, o) !== !1 && a.content.size) {
        let c = l + 1;
        a.nodesBetween(Math.max(0, t - c), Math.min(a.content.size, e - c), n, i + c);
      }
      l = h;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(t) {
    this.nodesBetween(0, this.size, t);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(t, e, n, i) {
    let s = "", o = !0;
    return this.nodesBetween(t, e, (l, a) => {
      let h = l.isText ? l.text.slice(Math.max(t, a) - a, e - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && h || l.isTextblock) && n && (o ? o = !1 : s += n), s += h;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(t) {
    if (!t.size)
      return this;
    if (!this.size)
      return t;
    let e = this.lastChild, n = t.firstChild, i = this.content.slice(), s = 0;
    for (e.isText && e.sameMarkup(n) && (i[i.length - 1] = e.withText(e.text + n.text), s = 1); s < t.content.length; s++)
      i.push(t.content[s]);
    return new f(i, this.size + t.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(t, e = this.size) {
    if (t == 0 && e == this.size)
      return this;
    let n = [], i = 0;
    if (e > t)
      for (let s = 0, o = 0; o < e; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > t && ((o < t || a > e) && (l.isText ? l = l.cut(Math.max(0, t - o), Math.min(l.text.length, e - o)) : l = l.cut(Math.max(0, t - o - 1), Math.min(l.content.size, e - o - 1))), n.push(l), i += l.nodeSize), o = a;
      }
    return new f(n, i);
  }
  /**
  @internal
  */
  cutByIndex(t, e) {
    return t == e ? f.empty : t == 0 && e == this.content.length ? this : new f(this.content.slice(t, e));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(t, e) {
    let n = this.content[t];
    if (n == e)
      return this;
    let i = this.content.slice(), s = this.size + e.nodeSize - n.nodeSize;
    return i[t] = e, new f(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(t) {
    return new f([t].concat(this.content), this.size + t.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(t) {
    return new f(this.content.concat(t), this.size + t.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(t) {
    if (this.content.length != t.content.length)
      return !1;
    for (let e = 0; e < this.content.length; e++)
      if (!this.content[e].eq(t.content[e]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(t) {
    let e = this.content[t];
    if (!e)
      throw new RangeError("Index " + t + " out of range for " + this);
    return e;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(t) {
    return this.content[t] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(t) {
    for (let e = 0, n = 0; e < this.content.length; e++) {
      let i = this.content[e];
      t(i, n, e), n += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(t, e = 0) {
    return xe(this, t, e);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(t, e = this.size, n = t.size) {
    return ve(this, t, e, n);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(t) {
    if (t == 0)
      return mt(0, t);
    if (t == this.size)
      return mt(this.content.length, t);
    if (t > this.size || t < 0)
      throw new RangeError(`Position ${t} outside of fragment (${this})`);
    for (let e = 0, n = 0; ; e++) {
      let i = this.child(e), s = n + i.nodeSize;
      if (s >= t)
        return s == t ? mt(e + 1, s) : mt(e, n);
      n = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((t) => t.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(t, e) {
    if (!e)
      return f.empty;
    if (!Array.isArray(e))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return f.fromArray(e.map(t.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(t) {
    if (!t.length)
      return f.empty;
    let e, n = 0;
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      n += s.nodeSize, i && s.isText && t[i - 1].sameMarkup(s) ? (e || (e = t.slice(0, i)), e[e.length - 1] = s.withText(e[e.length - 1].text + s.text)) : e && e.push(s);
    }
    return new f(e || t, n);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(t) {
    if (!t)
      return f.empty;
    if (t instanceof f)
      return t;
    if (Array.isArray(t))
      return this.fromArray(t);
    if (t.attrs)
      return new f([t], t.nodeSize);
    throw new RangeError("Can not convert " + t + " to a Fragment" + (t.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
f.empty = new f([], 0);
const Ot = { index: 0, offset: 0 };
function mt(r, t) {
  return Ot.index = r, Ot.offset = t, Ot;
}
function kt(r, t) {
  if (r === t)
    return !0;
  if (!(r && typeof r == "object") || !(t && typeof t == "object"))
    return !1;
  let e = Array.isArray(r);
  if (Array.isArray(t) != e)
    return !1;
  if (e) {
    if (r.length != t.length)
      return !1;
    for (let n = 0; n < r.length; n++)
      if (!kt(r[n], t[n]))
        return !1;
  } else {
    for (let n in r)
      if (!(n in t) || !kt(r[n], t[n]))
        return !1;
    for (let n in t)
      if (!(n in r))
        return !1;
  }
  return !0;
}
class w {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.attrs = e;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(t) {
    let e, n = !1;
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      if (this.eq(s))
        return t;
      if (this.type.excludes(s.type))
        e || (e = t.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return t;
        !n && s.type.rank > this.type.rank && (e || (e = t.slice(0, i)), e.push(this), n = !0), e && e.push(s);
      }
    }
    return e || (e = t.slice()), n || e.push(this), e;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(t) {
    for (let e = 0; e < t.length; e++)
      if (this.eq(t[e]))
        return t.slice(0, e).concat(t.slice(e + 1));
    return t;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(t) {
    for (let e = 0; e < t.length; e++)
      if (this.eq(t[e]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(t) {
    return this == t || this.type == t.type && kt(this.attrs, t.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let t = { type: this.type.name };
    for (let e in this.attrs) {
      t.attrs = this.attrs;
      break;
    }
    return t;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(t, e) {
    if (!e)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let n = t.marks[e.type];
    if (!n)
      throw new RangeError(`There is no mark type ${e.type} in this schema`);
    let i = n.create(e.attrs);
    return n.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(t, e) {
    if (t == e)
      return !0;
    if (t.length != e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (!t[n].eq(e[n]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(t) {
    if (!t || Array.isArray(t) && t.length == 0)
      return w.none;
    if (t instanceof w)
      return [t];
    let e = t.slice();
    return e.sort((n, i) => n.type.rank - i.type.rank), e;
  }
}
w.none = [];
class ht extends Error {
}
class g {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(t, e, n) {
    this.content = t, this.openStart = e, this.openEnd = n;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(t, e) {
    let n = Ce(this.content, t + this.openStart, e, this.openStart + 1, this.openEnd + 1);
    return n && new g(n, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(t, e) {
    return new g(Se(this.content, t + this.openStart, e + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(t) {
    return this.content.eq(t.content) && this.openStart == t.openStart && this.openEnd == t.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let t = { content: this.content.toJSON() };
    return this.openStart > 0 && (t.openStart = this.openStart), this.openEnd > 0 && (t.openEnd = this.openEnd), t;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(t, e) {
    if (!e)
      return g.empty;
    let n = e.openStart || 0, i = e.openEnd || 0;
    if (typeof n != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new g(f.fromJSON(t, e.content), n, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(t, e = !0) {
    let n = 0, i = 0;
    for (let s = t.firstChild; s && !s.isLeaf && (e || !s.type.spec.isolating); s = s.firstChild)
      n++;
    for (let s = t.lastChild; s && !s.isLeaf && (e || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new g(t, n, i);
  }
}
g.empty = new g(f.empty, 0, 0);
function Se(r, t, e) {
  let { index: n, offset: i } = r.findIndex(t), s = r.maybeChild(n), { index: o, offset: l } = r.findIndex(e);
  if (i == t || s.isText) {
    if (l != e && !r.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return r.cut(0, t).append(r.cut(e));
  }
  if (n != o)
    throw new RangeError("Removing non-flat range");
  return r.replaceChild(n, s.copy(Se(s.content, t - i - 1, e - i - 1)));
}
function Ce(r, t, e, n, i, s) {
  let { index: o, offset: l } = r.findIndex(t), a = r.maybeChild(o);
  if (l == t || a.isText)
    return s && n <= 0 && i <= 0 && !s.canReplace(o, o, e) ? null : r.cut(0, t).append(e).append(r.cut(t));
  let h = Ce(a.content, t - l - 1, e, o == 0 ? n - 1 : 0, o == r.childCount - 1 ? i - 1 : 0, a);
  return h && r.replaceChild(o, a.copy(h));
}
function Nn(r, t, e) {
  if (e.openStart > r.depth)
    throw new ht("Inserted content deeper than insertion position");
  if (r.depth - e.openStart != t.depth - e.openEnd)
    throw new ht("Inconsistent open depths");
  return Ee(r, t, e, 0);
}
function Ee(r, t, e, n) {
  let i = r.index(n), s = r.node(n);
  if (i == t.index(n) && n < r.depth - e.openStart) {
    let o = Ee(r, t, e, n + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (e.content.size)
    if (!e.openStart && !e.openEnd && r.depth == n && t.depth == n) {
      let o = r.parent, l = o.content;
      return J(o, l.cut(0, r.parentOffset).append(e.content).append(l.cut(t.parentOffset)));
    } else {
      let { start: o, end: l } = On(e, r);
      return J(s, _e(r, o, l, t, n));
    }
  else return J(s, bt(r, t, n));
}
function Te(r, t) {
  if (!t.type.compatibleContent(r.type))
    throw new ht("Cannot join " + t.type.name + " onto " + r.type.name);
}
function Pt(r, t, e) {
  let n = r.node(e);
  return Te(n, t.node(e)), n;
}
function F(r, t) {
  let e = t.length - 1;
  e >= 0 && r.isText && r.sameMarkup(t[e]) ? t[e] = r.withText(t[e].text + r.text) : t.push(r);
}
function ot(r, t, e, n) {
  let i = (t || r).node(e), s = 0, o = t ? t.index(e) : i.childCount;
  r && (s = r.index(e), r.depth > e ? s++ : r.textOffset && (F(r.nodeAfter, n), s++));
  for (let l = s; l < o; l++)
    F(i.child(l), n);
  t && t.depth == e && t.textOffset && F(t.nodeBefore, n);
}
function J(r, t) {
  if (!r.type.validContent(t))
    throw new ht("Invalid content for node " + r.type.name);
  return r.copy(t);
}
function _e(r, t, e, n, i) {
  let s = r.depth > i && Pt(r, t, i + 1), o = n.depth > i && Pt(e, n, i + 1), l = [];
  return ot(null, r, i, l), s && o && t.index(i) == e.index(i) ? (Te(s, o), F(J(s, _e(r, t, e, n, i + 1)), l)) : (s && F(J(s, bt(r, t, i + 1)), l), ot(t, e, i, l), o && F(J(o, bt(e, n, i + 1)), l)), ot(n, null, i, l), new f(l);
}
function bt(r, t, e) {
  let n = [];
  if (ot(null, r, e, n), r.depth > e) {
    let i = Pt(r, t, e + 1);
    F(J(i, bt(r, t, e + 1)), n);
  }
  return ot(t, null, e, n), new f(n);
}
function On(r, t) {
  let e = t.depth - r.openStart, i = t.node(e).copy(r.content);
  for (let s = e - 1; s >= 0; s--)
    i = t.node(s).copy(f.from(i));
  return {
    start: i.resolveNoCache(r.openStart + e),
    end: i.resolveNoCache(i.content.size - r.openEnd - e)
  };
}
class ct {
  /**
  @internal
  */
  constructor(t, e, n) {
    this.pos = t, this.path = e, this.parentOffset = n, this.depth = e.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(t) {
    return t == null ? this.depth : t < 0 ? this.depth + t : t;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(t) {
    return this.path[this.resolveDepth(t) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(t) {
    return this.path[this.resolveDepth(t) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(t) {
    return t = this.resolveDepth(t), this.index(t) + (t == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(t) {
    return t = this.resolveDepth(t), t == 0 ? 0 : this.path[t * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(t) {
    return t = this.resolveDepth(t), this.start(t) + this.node(t).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(t) {
    if (t = this.resolveDepth(t), !t)
      throw new RangeError("There is no position before the top-level node");
    return t == this.depth + 1 ? this.pos : this.path[t * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(t) {
    if (t = this.resolveDepth(t), !t)
      throw new RangeError("There is no position after the top-level node");
    return t == this.depth + 1 ? this.pos : this.path[t * 3 - 1] + this.path[t * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let t = this.parent, e = this.index(this.depth);
    if (e == t.childCount)
      return null;
    let n = this.pos - this.path[this.path.length - 1], i = t.child(e);
    return n ? t.child(e).cut(n) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let t = this.index(this.depth), e = this.pos - this.path[this.path.length - 1];
    return e ? this.parent.child(t).cut(0, e) : t == 0 ? null : this.parent.child(t - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(t, e) {
    e = this.resolveDepth(e);
    let n = this.path[e * 3], i = e == 0 ? 0 : this.path[e * 3 - 1] + 1;
    for (let s = 0; s < t; s++)
      i += n.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let t = this.parent, e = this.index();
    if (t.content.size == 0)
      return w.none;
    if (this.textOffset)
      return t.child(e).marks;
    let n = t.maybeChild(e - 1), i = t.maybeChild(e);
    if (!n) {
      let l = n;
      n = i, i = l;
    }
    let s = n.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(t) {
    let e = this.parent.maybeChild(this.index());
    if (!e || !e.isInline)
      return null;
    let n = e.marks, i = t.parent.maybeChild(t.index());
    for (var s = 0; s < n.length; s++)
      n[s].type.spec.inclusive === !1 && (!i || !n[s].isInSet(i.marks)) && (n = n[s--].removeFromSet(n));
    return n;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(t) {
    for (let e = this.depth; e > 0; e--)
      if (this.start(e) <= t && this.end(e) >= t)
        return e;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(t = this, e) {
    if (t.pos < this.pos)
      return t.blockRange(this);
    for (let n = this.depth - (this.parent.inlineContent || this.pos == t.pos ? 1 : 0); n >= 0; n--)
      if (t.pos <= this.end(n) && (!e || e(this.node(n))))
        return new In(this, t, n);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(t) {
    return this.pos - this.parentOffset == t.pos - t.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(t) {
    return t.pos > this.pos ? t : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(t) {
    return t.pos < this.pos ? t : this;
  }
  /**
  @internal
  */
  toString() {
    let t = "";
    for (let e = 1; e <= this.depth; e++)
      t += (t ? "/" : "") + this.node(e).type.name + "_" + this.index(e - 1);
    return t + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(t, e) {
    if (!(e >= 0 && e <= t.content.size))
      throw new RangeError("Position " + e + " out of range");
    let n = [], i = 0, s = e;
    for (let o = t; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), h = s - a;
      if (n.push(o, l, i + a), !h || (o = o.child(l), o.isText))
        break;
      s = h - 1, i += a + 1;
    }
    return new ct(e, n, s);
  }
  /**
  @internal
  */
  static resolveCached(t, e) {
    let n = Zt.get(t);
    if (n)
      for (let s = 0; s < n.elts.length; s++) {
        let o = n.elts[s];
        if (o.pos == e)
          return o;
      }
    else
      Zt.set(t, n = new Mn());
    let i = n.elts[n.i] = ct.resolve(t, e);
    return n.i = (n.i + 1) % An, i;
  }
}
class Mn {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const An = 12, Zt = /* @__PURE__ */ new WeakMap();
class In {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(t, e, n) {
    this.$from = t, this.$to = e, this.depth = n;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Rn = /* @__PURE__ */ Object.create(null);
let W = class $t {
  /**
  @internal
  */
  constructor(t, e, n, i = w.none) {
    this.type = t, this.attrs = e, this.marks = i, this.content = n || f.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(t) {
    return this.content.child(t);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(t) {
    return this.content.maybeChild(t);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(t) {
    this.content.forEach(t);
  }
  /**
  Invoke a callback for all descendant nodes recursively overlapping
  the given two positions that are relative to start of this
  node's content. This includes all ancestors of the nodes
  containing the two positions. The callback is invoked with the
  node, its position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(t, e, n, i = 0) {
    this.content.nodesBetween(t, e, n, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(t) {
    this.nodesBetween(0, this.content.size, t);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(t, e, n, i) {
    return this.content.textBetween(t, e, n, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(t) {
    return this == t || this.sameMarkup(t) && this.content.eq(t.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(t) {
    return this.hasMarkup(t.type, t.attrs, t.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(t, e, n) {
    return this.type == t && kt(this.attrs, e || t.defaultAttrs || Rn) && w.sameSet(this.marks, n || w.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(t = null) {
    return t == this.content ? this : new $t(this.type, this.attrs, t, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(t) {
    return t == this.marks ? this : new $t(this.type, this.attrs, this.content, t);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(t, e = this.content.size) {
    return t == 0 && e == this.content.size ? this : this.copy(this.content.cut(t, e));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(t, e = this.content.size, n = !1) {
    if (t == e)
      return g.empty;
    let i = this.resolve(t), s = this.resolve(e), o = n ? 0 : i.sharedDepth(e), l = i.start(o), h = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new g(h, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(t, e, n) {
    return Nn(this.resolve(t), this.resolve(e), n);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(t) {
    for (let e = this; ; ) {
      let { index: n, offset: i } = e.content.findIndex(t);
      if (e = e.maybeChild(n), !e)
        return null;
      if (i == t || e.isText)
        return e;
      t -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(t) {
    let { index: e, offset: n } = this.content.findIndex(t);
    return { node: this.content.maybeChild(e), index: e, offset: n };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(t) {
    if (t == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: e, offset: n } = this.content.findIndex(t);
    if (n < t)
      return { node: this.content.child(e), index: e, offset: n };
    let i = this.content.child(e - 1);
    return { node: i, index: e - 1, offset: n - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(t) {
    return ct.resolveCached(this, t);
  }
  /**
  @internal
  */
  resolveNoCache(t) {
    return ct.resolve(this, t);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(t, e, n) {
    let i = !1;
    return e > t && this.nodesBetween(t, e, (s) => (n.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let t = this.type.name;
    return this.content.size && (t += "(" + this.content.toStringInner() + ")"), Ne(this.marks, t);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(t) {
    let e = this.type.contentMatch.matchFragment(this.content, 0, t);
    if (!e)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return e;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(t, e, n = f.empty, i = 0, s = n.childCount) {
    let o = this.contentMatchAt(t).matchFragment(n, i, s), l = o && o.matchFragment(this.content, e);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(n.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(t, e, n, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(t).matchType(n), o = s && s.matchFragment(this.content, e);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(t) {
    return t.content.size ? this.canReplace(this.childCount, this.childCount, t.content) : this.type.compatibleContent(t.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let t = w.none;
    for (let e = 0; e < this.marks.length; e++) {
      let n = this.marks[e];
      n.type.checkAttrs(n.attrs), t = n.addToSet(t);
    }
    if (!w.sameSet(t, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((e) => e.type.name)}`);
    this.content.forEach((e) => e.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let t = { type: this.type.name };
    for (let e in this.attrs) {
      t.attrs = this.attrs;
      break;
    }
    return this.content.size && (t.content = this.content.toJSON()), this.marks.length && (t.marks = this.marks.map((e) => e.toJSON())), t;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(t, e) {
    if (!e)
      throw new RangeError("Invalid input for Node.fromJSON");
    let n;
    if (e.marks) {
      if (!Array.isArray(e.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      n = e.marks.map(t.markFromJSON);
    }
    if (e.type == "text") {
      if (typeof e.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return t.text(e.text, n);
    }
    let i = f.fromJSON(t, e.content), s = t.nodeType(e.type).create(e.attrs, i, n);
    return s.type.checkAttrs(s.attrs), s;
  }
};
W.prototype.text = void 0;
class St extends W {
  /**
  @internal
  */
  constructor(t, e, n, i) {
    if (super(t, e, null, i), !n)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = n;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ne(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(t, e) {
    return this.text.slice(t, e);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(t) {
    return t == this.marks ? this : new St(this.type, this.attrs, this.text, t);
  }
  withText(t) {
    return t == this.text ? this : new St(this.type, this.attrs, t, this.marks);
  }
  cut(t = 0, e = this.text.length) {
    return t == 0 && e == this.text.length ? this : this.withText(this.text.slice(t, e));
  }
  eq(t) {
    return this.sameMarkup(t) && this.text == t.text;
  }
  toJSON() {
    let t = super.toJSON();
    return t.text = this.text, t;
  }
}
function Ne(r, t) {
  for (let e = r.length - 1; e >= 0; e--)
    t = r[e].type.name + "(" + t + ")";
  return t;
}
class q {
  /**
  @internal
  */
  constructor(t) {
    this.validEnd = t, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(t, e) {
    let n = new zn(t, e);
    if (n.next == null)
      return q.empty;
    let i = Oe(n);
    n.next && n.err("Unexpected trailing text");
    let s = Jn(Fn(i));
    return Wn(s, n), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(t) {
    for (let e = 0; e < this.next.length; e++)
      if (this.next[e].type == t)
        return this.next[e].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(t, e = 0, n = t.childCount) {
    let i = this;
    for (let s = e; i && s < n; s++)
      i = i.matchType(t.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let t = 0; t < this.next.length; t++) {
      let { type: e } = this.next[t];
      if (!(e.isText || e.hasRequiredAttrs()))
        return e;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(t) {
    for (let e = 0; e < this.next.length; e++)
      for (let n = 0; n < t.next.length; n++)
        if (this.next[e].type == t.next[n].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(t, e = !1, n = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(t, n);
      if (a && (!e || a.validEnd))
        return f.from(l.map((h) => h.createAndFill()));
      for (let h = 0; h < o.next.length; h++) {
        let { type: c, next: p } = o.next[h];
        if (!(c.isText || c.hasRequiredAttrs()) && i.indexOf(p) == -1) {
          i.push(p);
          let u = s(p, l.concat(c));
          if (u)
            return u;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(t) {
    for (let n = 0; n < this.wrapCache.length; n += 2)
      if (this.wrapCache[n] == t)
        return this.wrapCache[n + 1];
    let e = this.computeWrapping(t);
    return this.wrapCache.push(t, e), e;
  }
  /**
  @internal
  */
  computeWrapping(t) {
    let e = /* @__PURE__ */ Object.create(null), n = [{ match: this, type: null, via: null }];
    for (; n.length; ) {
      let i = n.shift(), s = i.match;
      if (s.matchType(t)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in e) && (!i.type || a.validEnd) && (n.push({ match: l.contentMatch, type: l, via: i }), e[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(t) {
    if (t >= this.next.length)
      throw new RangeError(`There's no ${t}th edge in this content match`);
    return this.next[t];
  }
  /**
  @internal
  */
  toString() {
    let t = [];
    function e(n) {
      t.push(n);
      for (let i = 0; i < n.next.length; i++)
        t.indexOf(n.next[i].next) == -1 && e(n.next[i].next);
    }
    return e(this), t.map((n, i) => {
      let s = i + (n.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < n.next.length; o++)
        s += (o ? ", " : "") + n.next[o].type.name + "->" + t.indexOf(n.next[o].next);
      return s;
    }).join(`
`);
  }
}
q.empty = new q(!0);
class zn {
  constructor(t, e) {
    this.string = t, this.nodeTypes = e, this.inline = null, this.pos = 0, this.tokens = t.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(t) {
    return this.next == t && (this.pos++ || !0);
  }
  err(t) {
    throw new SyntaxError(t + " (in content expression '" + this.string + "')");
  }
}
function Oe(r) {
  let t = [];
  do
    t.push(Dn(r));
  while (r.eat("|"));
  return t.length == 1 ? t[0] : { type: "choice", exprs: t };
}
function Dn(r) {
  let t = [];
  do
    t.push(Ln(r));
  while (r.next && r.next != ")" && r.next != "|");
  return t.length == 1 ? t[0] : { type: "seq", exprs: t };
}
function Ln(r) {
  let t = Bn(r);
  for (; ; )
    if (r.eat("+"))
      t = { type: "plus", expr: t };
    else if (r.eat("*"))
      t = { type: "star", expr: t };
    else if (r.eat("?"))
      t = { type: "opt", expr: t };
    else if (r.eat("{"))
      t = Pn(r, t);
    else
      break;
  return t;
}
function te(r) {
  /\D/.test(r.next) && r.err("Expected number, got '" + r.next + "'");
  let t = Number(r.next);
  return r.pos++, t;
}
function Pn(r, t) {
  let e = te(r), n = e;
  return r.eat(",") && (r.next != "}" ? n = te(r) : n = -1), r.eat("}") || r.err("Unclosed braced range"), { type: "range", min: e, max: n, expr: t };
}
function $n(r, t) {
  let e = r.nodeTypes, n = e[t];
  if (n)
    return [n];
  let i = [];
  for (let s in e) {
    let o = e[s];
    o.isInGroup(t) && i.push(o);
  }
  return i.length == 0 && r.err("No node type or group '" + t + "' found"), i;
}
function Bn(r) {
  if (r.eat("(")) {
    let t = Oe(r);
    return r.eat(")") || r.err("Missing closing paren"), t;
  } else if (/\W/.test(r.next))
    r.err("Unexpected token '" + r.next + "'");
  else {
    let t = $n(r, r.next).map((e) => (r.inline == null ? r.inline = e.isInline : r.inline != e.isInline && r.err("Mixing inline and block content"), { type: "name", value: e }));
    return r.pos++, t.length == 1 ? t[0] : { type: "choice", exprs: t };
  }
}
function Fn(r) {
  let t = [[]];
  return i(s(r, 0), e()), t;
  function e() {
    return t.push([]) - 1;
  }
  function n(o, l, a) {
    let h = { term: a, to: l };
    return t[o].push(h), h;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, h) => a.concat(s(h, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let h = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return h;
        i(h, l = e());
      }
    else if (o.type == "star") {
      let a = e();
      return n(l, a), i(s(o.expr, a), a), [n(a)];
    } else if (o.type == "plus") {
      let a = e();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [n(a)];
    } else {
      if (o.type == "opt")
        return [n(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let h = 0; h < o.min; h++) {
          let c = e();
          i(s(o.expr, a), c), a = c;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let h = o.min; h < o.max; h++) {
            let c = e();
            n(a, c), i(s(o.expr, a), c), a = c;
          }
        return [n(a)];
      } else {
        if (o.type == "name")
          return [n(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Me(r, t) {
  return t - r;
}
function ee(r, t) {
  let e = [];
  return n(t), e.sort(Me);
  function n(i) {
    let s = r[i];
    if (s.length == 1 && !s[0].term)
      return n(s[0].to);
    e.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && e.indexOf(a) == -1 && n(a);
    }
  }
}
function Jn(r) {
  let t = /* @__PURE__ */ Object.create(null);
  return e(ee(r, 0));
  function e(n) {
    let i = [];
    n.forEach((o) => {
      r[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let h;
        for (let c = 0; c < i.length; c++)
          i[c][0] == l && (h = i[c][1]);
        ee(r, a).forEach((c) => {
          h || i.push([l, h = []]), h.indexOf(c) == -1 && h.push(c);
        });
      });
    });
    let s = t[n.join(",")] = new q(n.indexOf(r.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(Me);
      s.next.push({ type: i[o][0], next: t[l.join(",")] || e(l) });
    }
    return s;
  }
}
function Wn(r, t) {
  for (let e = 0, n = [r]; e < n.length; e++) {
    let i = n[e], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: h } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), n.indexOf(h) == -1 && n.push(h);
    }
    s && t.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ae(r) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e in r) {
    let n = r[e];
    if (!n.hasDefault)
      return null;
    t[e] = n.default;
  }
  return t;
}
function Ie(r, t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in r) {
    let i = t && t[n];
    if (i === void 0) {
      let s = r[n];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + n);
    }
    e[n] = i;
  }
  return e;
}
function Re(r, t, e, n) {
  for (let i in t)
    if (!(i in r))
      throw new RangeError(`Unsupported attribute ${i} for ${e} of type ${n}`);
  for (let i in r)
    r[i].validate && r[i].validate(t[i]);
}
function ze(r, t) {
  let e = /* @__PURE__ */ Object.create(null);
  if (t)
    for (let n in t)
      e[n] = new Hn(r, n, t[n]);
  return e;
}
class Ct {
  /**
  @internal
  */
  constructor(t, e, n) {
    this.name = t, this.schema = e, this.spec = n, this.markSet = null, this.groups = n.group ? n.group.split(" ") : [], this.attrs = ze(t, n.attrs), this.defaultAttrs = Ae(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(n.inline || t == "text"), this.isText = t == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == q.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(t) {
    return this.groups.indexOf(t) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let t in this.attrs)
      if (this.attrs[t].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(t) {
    return this == t || this.contentMatch.compatible(t.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(t) {
    return !t && this.defaultAttrs ? this.defaultAttrs : Ie(this.attrs, t);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(t = null, e, n) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new W(this, this.computeAttrs(t), f.from(e), w.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(t = null, e, n) {
    return e = f.from(e), this.checkContent(e), new W(this, this.computeAttrs(t), e, w.setFrom(n));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(t = null, e, n) {
    if (t = this.computeAttrs(t), e = f.from(e), e.size) {
      let o = this.contentMatch.fillBefore(e);
      if (!o)
        return null;
      e = o.append(e);
    }
    let i = this.contentMatch.matchFragment(e), s = i && i.fillBefore(f.empty, !0);
    return s ? new W(this, t, e.append(s), w.setFrom(n)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(t) {
    let e = this.contentMatch.matchFragment(t);
    if (!e || !e.validEnd)
      return !1;
    for (let n = 0; n < t.childCount; n++)
      if (!this.allowsMarks(t.child(n).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(t) {
    if (!this.validContent(t))
      throw new RangeError(`Invalid content for node ${this.name}: ${t.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(t) {
    Re(this.attrs, t, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(t) {
    return this.markSet == null || this.markSet.indexOf(t) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(t) {
    if (this.markSet == null)
      return !0;
    for (let e = 0; e < t.length; e++)
      if (!this.allowsMarkType(t[e].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(t) {
    if (this.markSet == null)
      return t;
    let e;
    for (let n = 0; n < t.length; n++)
      this.allowsMarkType(t[n].type) ? e && e.push(t[n]) : e || (e = t.slice(0, n));
    return e ? e.length ? e : w.none : t;
  }
  /**
  @internal
  */
  static compile(t, e) {
    let n = /* @__PURE__ */ Object.create(null);
    t.forEach((s, o) => n[s] = new Ct(s, e, o));
    let i = e.spec.topNode || "doc";
    if (!n[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!n.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in n.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return n;
  }
}
function qn(r, t, e) {
  let n = e.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (n.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${n} for attribute ${t} on type ${r}, got ${s}`);
  };
}
class Hn {
  constructor(t, e, n) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(n, "default"), this.default = n.default, this.validate = typeof n.validate == "string" ? qn(t, e, n.validate) : n.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class _t {
  /**
  @internal
  */
  constructor(t, e, n, i) {
    this.name = t, this.rank = e, this.schema = n, this.spec = i, this.attrs = ze(t, i.attrs), this.excluded = null;
    let s = Ae(this.attrs);
    this.instance = s ? new w(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(t = null) {
    return !t && this.instance ? this.instance : new w(this, Ie(this.attrs, t));
  }
  /**
  @internal
  */
  static compile(t, e) {
    let n = /* @__PURE__ */ Object.create(null), i = 0;
    return t.forEach((s, o) => n[s] = new _t(s, i++, e, o)), n;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(t) {
    for (var e = 0; e < t.length; e++)
      t[e].type == this && (t = t.slice(0, e).concat(t.slice(e + 1)), e--);
    return t;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(t) {
    for (let e = 0; e < t.length; e++)
      if (t[e].type == this)
        return t[e];
  }
  /**
  @internal
  */
  checkAttrs(t) {
    Re(this.attrs, t, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(t) {
    return this.excluded.indexOf(t) > -1;
  }
}
class Di {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(t) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let e = this.spec = {};
    for (let i in t)
      e[i] = t[i];
    e.nodes = S.from(t.nodes), e.marks = S.from(t.marks || {}), this.nodes = Ct.compile(this.spec.nodes, this), this.marks = _t.compile(this.spec.marks, this);
    let n = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = n[o] || (n[o] = q.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? ne(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : ne(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => W.fromJSON(this, i), this.markFromJSON = (i) => w.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(t, e = null, n, i) {
    if (typeof t == "string")
      t = this.nodeType(t);
    else if (t instanceof Ct) {
      if (t.schema != this)
        throw new RangeError("Node type from different schema used (" + t.name + ")");
    } else throw new RangeError("Invalid node type: " + t);
    return t.createChecked(e, n, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(t, e) {
    let n = this.nodes.text;
    return new St(n, n.defaultAttrs, t, w.setFrom(e));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(t, e) {
    return typeof t == "string" && (t = this.marks[t]), t.create(e);
  }
  /**
  @internal
  */
  nodeType(t) {
    let e = this.nodes[t];
    if (!e)
      throw new RangeError("Unknown node type: " + t);
    return e;
  }
}
function ne(r, t) {
  let e = [];
  for (let n = 0; n < t.length; n++) {
    let i = t[n], s = r.marks[i], o = s;
    if (s)
      e.push(s);
    else
      for (let l in r.marks) {
        let a = r.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && e.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + t[n] + "'");
  }
  return e;
}
function Un(r) {
  return r.tag != null;
}
function Vn(r) {
  return r.style != null;
}
let Li = class Bt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(t, e) {
    this.schema = t, this.rules = e, this.tags = [], this.styles = [];
    let n = this.matchedStyles = [];
    e.forEach((i) => {
      if (Un(i))
        this.tags.push(i);
      else if (Vn(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        n.indexOf(s) < 0 && n.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = t.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(t, e = {}) {
    let n = new re(this, e, !1);
    return n.addAll(t, w.none, e.from, e.to), n.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(t, e = {}) {
    let n = new re(this, e, !0);
    return n.addAll(t, w.none, e.from, e.to), g.maxOpen(n.finish());
  }
  /**
  @internal
  */
  matchTag(t, e, n) {
    for (let i = n ? this.tags.indexOf(n) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (Kn(t, s.tag) && (s.namespace === void 0 || t.namespaceURI == s.namespace) && (!s.context || e.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(t);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(t, e, n, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(t) != 0 || o.context && !n.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > t.length && (l.charCodeAt(t.length) != 61 || l.slice(t.length + 1) != e))) {
        if (o.getAttrs) {
          let a = o.getAttrs(e);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(t) {
    let e = [];
    function n(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < e.length; o++) {
        let l = e[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      e.splice(o, 0, i);
    }
    for (let i in t.marks) {
      let s = t.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        n(o = se(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in t.nodes) {
      let s = t.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        n(o = se(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return e;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(t) {
    return t.cached.domParser || (t.cached.domParser = new Bt(t, Bt.schemaRules(t)));
  }
};
const De = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  body: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, Gn = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Le = { ol: !0, ul: !0 }, pt = 1, Ft = 2, lt = 4;
function ie(r, t, e) {
  return t != null ? (t ? pt : 0) | (t === "full" ? Ft : 0) : r && r.whitespace == "pre" ? pt | Ft : e & ~lt;
}
class gt {
  constructor(t, e, n, i, s, o) {
    this.type = t, this.attrs = e, this.marks = n, this.solid = i, this.options = o, this.content = [], this.activeMarks = w.none, this.match = s || (o & lt ? null : t.contentMatch);
  }
  findWrapping(t) {
    if (!this.match) {
      if (!this.type)
        return [];
      let e = this.type.contentMatch.fillBefore(f.from(t));
      if (e)
        this.match = this.type.contentMatch.matchFragment(e);
      else {
        let n = this.type.contentMatch, i;
        return (i = n.findWrapping(t.type)) ? (this.match = n, i) : null;
      }
    }
    return this.match.findWrapping(t.type);
  }
  finish(t) {
    if (!(this.options & pt)) {
      let n = this.content[this.content.length - 1], i;
      if (n && n.isText && (i = /[ \t\r\n\u000c]+$/.exec(n.text))) {
        let s = n;
        n.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let e = f.from(this.content);
    return !t && this.match && (e = e.append(this.match.fillBefore(f.empty, !0))), this.type ? this.type.create(this.attrs, e, this.marks) : e;
  }
  inlineContext(t) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : t.parentNode && !De.hasOwnProperty(t.parentNode.nodeName.toLowerCase());
  }
}
class re {
  constructor(t, e, n) {
    this.parser = t, this.options = e, this.isOpen = n, this.open = 0, this.localPreserveWS = !1;
    let i = e.topNode, s, o = ie(null, e.preserveWhitespace, 0) | (n ? lt : 0);
    i ? s = new gt(i.type, i.attrs, w.none, !0, e.topMatch || i.type.contentMatch, o) : n ? s = new gt(null, null, w.none, !0, null, o) : s = new gt(t.schema.topNodeType, null, w.none, !0, null, o), this.nodes = [s], this.find = e.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(t, e) {
    t.nodeType == 3 ? this.addTextNode(t, e) : t.nodeType == 1 && this.addElement(t, e);
  }
  addTextNode(t, e) {
    let n = t.nodeValue, i = this.top, s = i.options & Ft ? "full" : this.localPreserveWS || (i.options & pt) > 0, { schema: o } = this.parser;
    if (s === "full" || i.inlineContext(t) || /[^ \t\r\n\u000c]/.test(n)) {
      if (s)
        if (s === "full")
          n = n.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(n) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let l = n.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(o.linebreakReplacement.create(), e, !0), l[a] && this.insertNode(o.text(l[a]), e, !/\S/.test(l[a]));
          n = "";
        } else
          n = n.replace(/\r?\n|\r/g, " ");
      else if (n = n.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(n) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = t.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (n = n.slice(1));
      }
      n && this.insertNode(o.text(n), e, !/\S/.test(n)), this.findInText(t);
    } else
      this.findInside(t);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(t, e, n) {
    let i = this.localPreserveWS, s = this.top;
    (t.tagName == "PRE" || /pre/.test(t.style && t.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = t.nodeName.toLowerCase(), l;
    Le.hasOwnProperty(o) && this.parser.normalizeLists && jn(t);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(t) || (l = this.parser.matchTag(t, this, n));
    t: if (a ? a.ignore : Gn.hasOwnProperty(o))
      this.findInside(t), this.ignoreFallback(t, e);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (t = a.skip);
      let h, c = this.needsBlock;
      if (De.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), h = !0, s.type || (this.needsBlock = !0);
      else if (!t.firstChild) {
        this.leafFallback(t, e);
        break t;
      }
      let p = a && a.skip ? e : this.readStyles(t, e);
      p && this.addAll(t, p), h && this.sync(s), this.needsBlock = c;
    } else {
      let h = this.readStyles(t, e);
      h && this.addElementByRule(t, a, h, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(t, e) {
    t.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(t.ownerDocument.createTextNode(`
`), e);
  }
  // Called for ignored nodes
  ignoreFallback(t, e) {
    t.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), e, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(t, e) {
    let n = t.style;
    if (n && n.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = n.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? e = e.filter((h) => !a.clearMark(h)) : e = e.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return e;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(t, e, n, i) {
    let s, o;
    if (e.node)
      if (o = this.parser.schema.nodes[e.node], o.isLeaf)
        this.insertNode(o.create(e.attrs), n, t.nodeName == "BR") || this.leafFallback(t, n);
      else {
        let a = this.enter(o, e.attrs || null, n, e.preserveWhitespace);
        a && (s = !0, n = a);
      }
    else {
      let a = this.parser.schema.marks[e.mark];
      n = n.concat(a.create(e.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(t);
    else if (i)
      this.addElement(t, n, i);
    else if (e.getContent)
      this.findInside(t), e.getContent(t, this.parser.schema).forEach((a) => this.insertNode(a, n, !1));
    else {
      let a = t;
      typeof e.contentElement == "string" ? a = t.querySelector(e.contentElement) : typeof e.contentElement == "function" ? a = e.contentElement(t) : e.contentElement && (a = e.contentElement), this.findAround(t, a, !0), this.addAll(a, n), this.findAround(t, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(t, e, n, i) {
    let s = n || 0;
    for (let o = n ? t.childNodes[n] : t.firstChild, l = i == null ? null : t.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(t, s), this.addDOM(o, e);
    this.findAtPoint(t, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(t, e, n) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], h = a.findWrapping(t);
      if (h && (!i || i.length > h.length + l) && (i = h, s = a, !h.length))
        break;
      if (a.solid) {
        if (n)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      e = this.enterInner(i[o], null, e, !1);
    return e;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(t, e, n) {
    if (t.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (e = this.enterInner(s, null, e));
    }
    let i = this.findPlace(t, e, n);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(t.type));
      let o = w.none;
      for (let l of i.concat(t.marks))
        (s.type ? s.type.allowsMarkType(l.type) : oe(l.type, t.type)) && (o = l.addToSet(o));
      return s.content.push(t.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(t, e, n, i) {
    let s = this.findPlace(t.create(e), n, !1);
    return s && (s = this.enterInner(t, e, n, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(t, e, n, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(t);
    let l = ie(t, s, o.options);
    o.options & lt && o.content.length == 0 && (l |= lt);
    let a = w.none;
    return n = n.filter((h) => (o.type ? o.type.allowsMarkType(h.type) : oe(h.type, t)) ? (a = h.addToSet(a), !1) : !0), this.nodes.push(new gt(t, e, a, i, null, l)), this.open++, n;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(t = !1) {
    let e = this.nodes.length - 1;
    if (e > this.open) {
      for (; e > this.open; e--)
        this.nodes[e - 1].content.push(this.nodes[e].finish(t));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(t) {
    for (let e = this.open; e >= 0; e--) {
      if (this.nodes[e] == t)
        return this.open = e, !0;
      this.localPreserveWS && (this.nodes[e].options |= pt);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let t = 0;
    for (let e = this.open; e >= 0; e--) {
      let n = this.nodes[e].content;
      for (let i = n.length - 1; i >= 0; i--)
        t += n[i].nodeSize;
      e && t++;
    }
    return t;
  }
  findAtPoint(t, e) {
    if (this.find)
      for (let n = 0; n < this.find.length; n++)
        this.find[n].node == t && this.find[n].offset == e && (this.find[n].pos = this.currentPos);
  }
  findInside(t) {
    if (this.find)
      for (let e = 0; e < this.find.length; e++)
        this.find[e].pos == null && t.nodeType == 1 && t.contains(this.find[e].node) && (this.find[e].pos = this.currentPos);
  }
  findAround(t, e, n) {
    if (t != e && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && t.nodeType == 1 && t.contains(this.find[i].node) && e.compareDocumentPosition(this.find[i].node) & (n ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(t) {
    if (this.find)
      for (let e = 0; e < this.find.length; e++)
        this.find[e].node == t && (this.find[e].pos = this.currentPos - (t.nodeValue.length - this.find[e].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(t) {
    if (t.indexOf("|") > -1)
      return t.split(/\s*\|\s*/).some(this.matchesContext, this);
    let e = t.split("/"), n = this.options.context, i = !this.isOpen && (!n || n.parent.type == this.nodes[0].type), s = -(n ? n.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let h = e[l];
        if (h == "") {
          if (l == e.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let c = a > 0 || a == 0 && i ? this.nodes[a].type : n && a >= s ? n.node(a - s).type : null;
          if (!c || c.name != h && !c.isInGroup(h))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(e.length - 1, this.open);
  }
  textblockFromContext() {
    let t = this.options.context;
    if (t)
      for (let e = t.depth; e >= 0; e--) {
        let n = t.node(e).contentMatchAt(t.indexAfter(e)).defaultType;
        if (n && n.isTextblock && n.defaultAttrs)
          return n;
      }
    for (let e in this.parser.schema.nodes) {
      let n = this.parser.schema.nodes[e];
      if (n.isTextblock && n.defaultAttrs)
        return n;
    }
  }
}
function jn(r) {
  for (let t = r.firstChild, e = null; t; t = t.nextSibling) {
    let n = t.nodeType == 1 ? t.nodeName.toLowerCase() : null;
    n && Le.hasOwnProperty(n) && e ? (e.appendChild(t), t = e) : n == "li" ? e = t : n && (e = null);
  }
}
function Kn(r, t) {
  return (r.matches || r.msMatchesSelector || r.webkitMatchesSelector || r.mozMatchesSelector).call(r, t);
}
function se(r) {
  let t = {};
  for (let e in r)
    t[e] = r[e];
  return t;
}
function oe(r, t) {
  let e = t.schema.nodes;
  for (let n in e) {
    let i = e[n];
    if (!i.allowsMarkType(r))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: h, next: c } = l.edge(a);
        if (h == t || s.indexOf(c) < 0 && o(c))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class Pe {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(t, e) {
    this.nodes = t, this.marks = e;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(t, e = {}, n) {
    n || (n = yt(e).createDocumentFragment());
    let i = n, s = [];
    return t.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let h = o.marks[a];
          if (!this.marks[h.type.name]) {
            a++;
            continue;
          }
          if (!h.eq(s[l][0]) || h.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let h = o.marks[a++], c = this.serializeMark(h, o.isInline, e);
          c && (s.push([h, i]), i.appendChild(c.dom), i = c.contentDOM || c.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, e));
    }), n;
  }
  /**
  @internal
  */
  serializeNodeInner(t, e) {
    if (t.isText)
      return yt(e).createTextNode(t.text);
    let { dom: n, contentDOM: i } = xt(yt(e), this.nodes[t.type.name](t), null, t.attrs);
    if (i) {
      if (t.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(t.content, e, i);
    }
    return n;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(t, e = {}) {
    let n = this.serializeNodeInner(t, e);
    for (let i = t.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(t.marks[i], t.isInline, e);
      s && ((s.contentDOM || s.dom).appendChild(n), n = s.dom);
    }
    return n;
  }
  /**
  @internal
  */
  serializeMark(t, e, n = {}) {
    let i = this.marks[t.type.name];
    return i && xt(yt(n), i(t, e), null, t.attrs);
  }
  static renderSpec(t, e, n = null, i) {
    return typeof e == "string" ? { dom: t.createTextNode(e) } : xt(t, e, n, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(t) {
    return t.cached.domSerializer || (t.cached.domSerializer = new Pe(this.nodesFromSchema(t), this.marksFromSchema(t)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(t) {
    let e = le(t.nodes);
    return e.text || (e.text = (n) => n.text), e;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(t) {
    return le(t.marks);
  }
}
function le(r) {
  let t = {};
  for (let e in r) {
    let n = r[e].spec.toDOM;
    n && (t[e] = n);
  }
  return t;
}
function yt(r) {
  return r.document || window.document;
}
const ae = /* @__PURE__ */ new WeakMap();
function Yn(r) {
  let t = ae.get(r);
  return t === void 0 && ae.set(r, t = Xn(r)), t;
}
function Xn(r) {
  let t = null;
  function e(n) {
    if (n && typeof n == "object")
      if (Array.isArray(n))
        if (typeof n[0] == "string")
          t || (t = []), t.push(n);
        else
          for (let i = 0; i < n.length; i++)
            e(n[i]);
      else
        for (let i in n)
          e(n[i]);
  }
  return e(r), t;
}
function xt(r, t, e, n) {
  if (t.nodeType == 1)
    return { dom: t };
  if (t.dom && t.dom.nodeType == 1)
    return t;
  let i = t[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (n && (s = Yn(n)) && s.indexOf(t) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (e = i.slice(0, o), i = i.slice(o + 1));
  let l, a = e ? r.createElementNS(e, i) : r.createElement(i), h = t[1], c = 1;
  if (h && typeof h == "object" && h.nodeType == null && !Array.isArray(h)) {
    c = 2;
    for (let p in h)
      if (h[p] != null) {
        let u = p.indexOf(" ");
        u > 0 ? a.setAttributeNS(p.slice(0, u), p.slice(u + 1), h[p]) : p == "style" && a.style ? a.style.cssText = h[p] : a.setAttribute(p, h[p]);
      }
  }
  for (let p = c; p < t.length; p++) {
    let u = t[p];
    if (u === 0) {
      if (p < t.length - 1 || p > c)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else if (typeof u == "string")
      a.appendChild(r.createTextNode(u));
    else {
      let { dom: d, contentDOM: m } = xt(r, u, e, n);
      if (a.appendChild(d), m) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = m;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const $e = 65535, Be = Math.pow(2, 16);
function Qn(r, t) {
  return r + t * Be;
}
function he(r) {
  return r & $e;
}
function Zn(r) {
  return (r - (r & $e)) / Be;
}
const Fe = 1, Je = 2, vt = 4, We = 8;
class Jt {
  /**
  @internal
  */
  constructor(t, e, n) {
    this.pos = t, this.delInfo = e, this.recover = n;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & We) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Fe | vt)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Je | vt)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & vt) > 0;
  }
}
class T {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(t, e = !1) {
    if (this.ranges = t, this.inverted = e, !t.length && T.empty)
      return T.empty;
  }
  /**
  @internal
  */
  recover(t) {
    let e = 0, n = he(t);
    if (!this.inverted)
      for (let i = 0; i < n; i++)
        e += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[n * 3] + e + Zn(t);
  }
  mapResult(t, e = 1) {
    return this._map(t, e, !1);
  }
  map(t, e = 1) {
    return this._map(t, e, !0);
  }
  /**
  @internal
  */
  _map(t, e, n) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > t)
        break;
      let h = this.ranges[l + s], c = this.ranges[l + o], p = a + h;
      if (t <= p) {
        let u = h ? t == a ? -1 : t == p ? 1 : e : e, d = a + i + (u < 0 ? 0 : c);
        if (n)
          return d;
        let m = t == (e < 0 ? a : p) ? null : Qn(l / 3, t - a), y = t == a ? Je : t == p ? Fe : vt;
        return (e < 0 ? t != a : t != p) && (y |= We), new Jt(d, y, m);
      }
      i += c - h;
    }
    return n ? t + i : new Jt(t + i, 0, null);
  }
  /**
  @internal
  */
  touches(t, e) {
    let n = 0, i = he(e), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? n : 0);
      if (a > t)
        break;
      let h = this.ranges[l + s], c = a + h;
      if (t <= c && l == i * 3)
        return !0;
      n += this.ranges[l + o] - h;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(t) {
    let e = this.inverted ? 2 : 1, n = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), h = this.ranges[i + e], c = this.ranges[i + n];
      t(l, l + h, a, a + c), s += c - h;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new T(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(t) {
    return t == 0 ? T.empty : new T(t < 0 ? [0, -t, 0] : [0, 0, t]);
  }
}
T.empty = new T([]);
class Et {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(t, e, n = 0, i = t ? t.length : 0) {
    this.mirror = e, this.from = n, this.to = i, this._maps = t || [], this.ownData = !(t || e);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(t = 0, e = this.maps.length) {
    return new Et(this._maps, this.mirror, t, e);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(t, e) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(t), e != null && this.setMirror(this._maps.length - 1, e);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(t) {
    for (let e = 0, n = this._maps.length; e < t._maps.length; e++) {
      let i = t.getMirror(e);
      this.appendMap(t._maps[e], i != null && i < e ? n + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(t) {
    if (this.mirror) {
      for (let e = 0; e < this.mirror.length; e++)
        if (this.mirror[e] == t)
          return this.mirror[e + (e % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(t, e) {
    this.mirror || (this.mirror = []), this.mirror.push(t, e);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(t) {
    for (let e = t.maps.length - 1, n = this._maps.length + t._maps.length; e >= 0; e--) {
      let i = t.getMirror(e);
      this.appendMap(t._maps[e].invert(), i != null && i > e ? n - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let t = new Et();
    return t.appendMappingInverted(this), t;
  }
  /**
  Map a position through this mapping.
  */
  map(t, e = 1) {
    if (this.mirror)
      return this._map(t, e, !0);
    for (let n = this.from; n < this.to; n++)
      t = this._maps[n].map(t, e);
    return t;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(t, e = 1) {
    return this._map(t, e, !1);
  }
  /**
  @internal
  */
  _map(t, e, n) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(t, e);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, t = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, t = l.pos;
    }
    return n ? t : new Jt(t, i, null);
  }
}
const Mt = /* @__PURE__ */ Object.create(null);
class C {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return T.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(t) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(t, e) {
    if (!e || !e.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let n = Mt[e.stepType];
    if (!n)
      throw new RangeError(`No step type ${e.stepType} defined`);
    return n.fromJSON(t, e);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(t, e) {
    if (t in Mt)
      throw new RangeError("Duplicate use of step JSON ID " + t);
    return Mt[t] = e, e.prototype.jsonID = t, e;
  }
}
class v {
  /**
  @internal
  */
  constructor(t, e) {
    this.doc = t, this.failed = e;
  }
  /**
  Create a successful step result.
  */
  static ok(t) {
    return new v(t, null);
  }
  /**
  Create a failed step result.
  */
  static fail(t) {
    return new v(null, t);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(t, e, n, i) {
    try {
      return v.ok(t.replace(e, n, i));
    } catch (s) {
      if (s instanceof ht)
        return v.fail(s.message);
      throw s;
    }
  }
}
function Ut(r, t, e) {
  let n = [];
  for (let i = 0; i < r.childCount; i++) {
    let s = r.child(i);
    s.content.size && (s = s.copy(Ut(s.content, t, s))), s.isInline && (s = t(s, e, i)), n.push(s);
  }
  return f.fromArray(n);
}
class P extends C {
  /**
  Create a mark step.
  */
  constructor(t, e, n) {
    super(), this.from = t, this.to = e, this.mark = n;
  }
  apply(t) {
    let e = t.slice(this.from, this.to), n = t.resolve(this.from), i = n.node(n.sharedDepth(this.to)), s = new g(Ut(e.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), e.openStart, e.openEnd);
    return v.fromReplace(t, this.from, this.to, s);
  }
  invert() {
    return new I(this.from, this.to, this.mark);
  }
  map(t) {
    let e = t.mapResult(this.from, 1), n = t.mapResult(this.to, -1);
    return e.deleted && n.deleted || e.pos >= n.pos ? null : new P(e.pos, n.pos, this.mark);
  }
  merge(t) {
    return t instanceof P && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new P(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.from != "number" || typeof e.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new P(e.from, e.to, t.markFromJSON(e.mark));
  }
}
C.jsonID("addMark", P);
class I extends C {
  /**
  Create a mark-removing step.
  */
  constructor(t, e, n) {
    super(), this.from = t, this.to = e, this.mark = n;
  }
  apply(t) {
    let e = t.slice(this.from, this.to), n = new g(Ut(e.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), t), e.openStart, e.openEnd);
    return v.fromReplace(t, this.from, this.to, n);
  }
  invert() {
    return new P(this.from, this.to, this.mark);
  }
  map(t) {
    let e = t.mapResult(this.from, 1), n = t.mapResult(this.to, -1);
    return e.deleted && n.deleted || e.pos >= n.pos ? null : new I(e.pos, n.pos, this.mark);
  }
  merge(t) {
    return t instanceof I && t.mark.eq(this.mark) && this.from <= t.to && this.to >= t.from ? new I(Math.min(this.from, t.from), Math.max(this.to, t.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.from != "number" || typeof e.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new I(e.from, e.to, t.markFromJSON(e.mark));
  }
}
C.jsonID("removeMark", I);
class $ extends C {
  /**
  Create a node mark step.
  */
  constructor(t, e) {
    super(), this.pos = t, this.mark = e;
  }
  apply(t) {
    let e = t.nodeAt(this.pos);
    if (!e)
      return v.fail("No node at mark step's position");
    let n = e.type.create(e.attrs, null, this.mark.addToSet(e.marks));
    return v.fromReplace(t, this.pos, this.pos + 1, new g(f.from(n), 0, e.isLeaf ? 0 : 1));
  }
  invert(t) {
    let e = t.nodeAt(this.pos);
    if (e) {
      let n = this.mark.addToSet(e.marks);
      if (n.length == e.marks.length) {
        for (let i = 0; i < e.marks.length; i++)
          if (!e.marks[i].isInSet(n))
            return new $(this.pos, e.marks[i]);
        return new $(this.pos, this.mark);
      }
    }
    return new H(this.pos, this.mark);
  }
  map(t) {
    let e = t.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new $(e.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new $(e.pos, t.markFromJSON(e.mark));
  }
}
C.jsonID("addNodeMark", $);
class H extends C {
  /**
  Create a mark-removing step.
  */
  constructor(t, e) {
    super(), this.pos = t, this.mark = e;
  }
  apply(t) {
    let e = t.nodeAt(this.pos);
    if (!e)
      return v.fail("No node at mark step's position");
    let n = e.type.create(e.attrs, null, this.mark.removeFromSet(e.marks));
    return v.fromReplace(t, this.pos, this.pos + 1, new g(f.from(n), 0, e.isLeaf ? 0 : 1));
  }
  invert(t) {
    let e = t.nodeAt(this.pos);
    return !e || !this.mark.isInSet(e.marks) ? this : new $(this.pos, this.mark);
  }
  map(t) {
    let e = t.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new H(e.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new H(e.pos, t.markFromJSON(e.mark));
  }
}
C.jsonID("removeNodeMark", H);
class k extends C {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(t, e, n, i = !1) {
    super(), this.from = t, this.to = e, this.slice = n, this.structure = i;
  }
  apply(t) {
    return this.structure && Wt(t, this.from, this.to) ? v.fail("Structure replace would overwrite content") : v.fromReplace(t, this.from, this.to, this.slice);
  }
  getMap() {
    return new T([this.from, this.to - this.from, this.slice.size]);
  }
  invert(t) {
    return new k(this.from, this.from + this.slice.size, t.slice(this.from, this.to));
  }
  map(t) {
    let e = t.mapResult(this.to, -1), n = this.from == this.to && k.MAP_BIAS < 0 ? e : t.mapResult(this.from, 1);
    return n.deletedAcross && e.deletedAcross ? null : new k(n.pos, Math.max(n.pos, e.pos), this.slice, this.structure);
  }
  merge(t) {
    if (!(t instanceof k) || t.structure || this.structure)
      return null;
    if (this.from + this.slice.size == t.from && !this.slice.openEnd && !t.slice.openStart) {
      let e = this.slice.size + t.slice.size == 0 ? g.empty : new g(this.slice.content.append(t.slice.content), this.slice.openStart, t.slice.openEnd);
      return new k(this.from, this.to + (t.to - t.from), e, this.structure);
    } else if (t.to == this.from && !this.slice.openStart && !t.slice.openEnd) {
      let e = this.slice.size + t.slice.size == 0 ? g.empty : new g(t.slice.content.append(this.slice.content), t.slice.openStart, this.slice.openEnd);
      return new k(t.from, this.to, e, this.structure);
    } else
      return null;
  }
  toJSON() {
    let t = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (t.slice = this.slice.toJSON()), this.structure && (t.structure = !0), t;
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.from != "number" || typeof e.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new k(e.from, e.to, g.fromJSON(t, e.slice), !!e.structure);
  }
}
k.MAP_BIAS = 1;
C.jsonID("replace", k);
class A extends C {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(t, e, n, i, s, o, l = !1) {
    super(), this.from = t, this.to = e, this.gapFrom = n, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(t) {
    if (this.structure && (Wt(t, this.from, this.gapFrom) || Wt(t, this.gapTo, this.to)))
      return v.fail("Structure gap-replace would overwrite content");
    let e = t.slice(this.gapFrom, this.gapTo);
    if (e.openStart || e.openEnd)
      return v.fail("Gap is not a flat range");
    let n = this.slice.insertAt(this.insert, e.content);
    return n ? v.fromReplace(t, this.from, this.to, n) : v.fail("Content does not fit in gap");
  }
  getMap() {
    return new T([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(t) {
    let e = this.gapTo - this.gapFrom;
    return new A(this.from, this.from + this.slice.size + e, this.from + this.insert, this.from + this.insert + e, t.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(t) {
    let e = t.mapResult(this.from, 1), n = t.mapResult(this.to, -1), i = this.from == this.gapFrom ? e.pos : t.map(this.gapFrom, -1), s = this.to == this.gapTo ? n.pos : t.map(this.gapTo, 1);
    return e.deletedAcross && n.deletedAcross || i < e.pos || s > n.pos ? null : new A(e.pos, n.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let t = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (t.slice = this.slice.toJSON()), this.structure && (t.structure = !0), t;
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.from != "number" || typeof e.to != "number" || typeof e.gapFrom != "number" || typeof e.gapTo != "number" || typeof e.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new A(e.from, e.to, e.gapFrom, e.gapTo, g.fromJSON(t, e.slice), e.insert, !!e.structure);
  }
}
C.jsonID("replaceAround", A);
function Wt(r, t, e) {
  let n = r.resolve(t), i = e - t, s = n.depth;
  for (; i > 0 && s > 0 && n.indexAfter(s) == n.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = n.node(s).maybeChild(n.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function ti(r, t, e, n) {
  let i = [], s = [], o, l;
  r.doc.nodesBetween(t, e, (a, h, c) => {
    if (!a.isInline)
      return;
    let p = a.marks;
    if (!n.isInSet(p) && c.type.allowsMarkType(n.type)) {
      let u = Math.max(h, t), d = Math.min(h + a.nodeSize, e), m = n.addToSet(p);
      for (let y = 0; y < p.length; y++)
        p[y].isInSet(m) || (o && o.to == u && o.mark.eq(p[y]) ? o.to = d : i.push(o = new I(u, d, p[y])));
      l && l.to == u ? l.to = d : s.push(l = new P(u, d, n));
    }
  }), i.forEach((a) => r.step(a)), s.forEach((a) => r.step(a));
}
function ei(r, t, e, n) {
  let i = [], s = 0;
  r.doc.nodesBetween(t, e, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (n instanceof _t) {
      let h = o.marks, c;
      for (; c = n.isInSet(h); )
        (a || (a = [])).push(c), h = c.removeFromSet(h);
    } else n ? n.isInSet(o.marks) && (a = [n]) : a = o.marks;
    if (a && a.length) {
      let h = Math.min(l + o.nodeSize, e);
      for (let c = 0; c < a.length; c++) {
        let p = a[c], u;
        for (let d = 0; d < i.length; d++) {
          let m = i[d];
          m.step == s - 1 && p.eq(i[d].style) && (u = m);
        }
        u ? (u.to = h, u.step = s) : i.push({ style: p, from: Math.max(l, t), to: h, step: s });
      }
    }
  }), i.forEach((o) => r.step(new I(o.from, o.to, o.style)));
}
function Vt(r, t, e, n = e.contentMatch, i = !0) {
  let s = r.doc.nodeAt(t), o = [], l = t + 1;
  for (let a = 0; a < s.childCount; a++) {
    let h = s.child(a), c = l + h.nodeSize, p = n.matchType(h.type);
    if (!p)
      o.push(new k(l, c, g.empty));
    else {
      n = p;
      for (let u = 0; u < h.marks.length; u++)
        e.allowsMarkType(h.marks[u].type) || r.step(new I(l, c, h.marks[u]));
      if (i && h.isText && e.whitespace != "pre") {
        let u, d = /\r?\n|\r/g, m;
        for (; u = d.exec(h.text); )
          m || (m = new g(f.from(e.schema.text(" ", e.allowedMarks(h.marks))), 0, 0)), o.push(new k(l + u.index, l + u.index + u[0].length, m));
      }
    }
    l = c;
  }
  if (!n.validEnd) {
    let a = n.fillBefore(f.empty, !0);
    r.replace(l, l, new g(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    r.step(o[a]);
}
function ni(r, t, e) {
  return (t == 0 || r.canReplace(t, r.childCount)) && (e == r.childCount || r.canReplace(0, e));
}
function Pi(r) {
  let e = r.parent.content.cutByIndex(r.startIndex, r.endIndex);
  for (let n = r.depth, i = 0, s = 0; ; --n) {
    let o = r.$from.node(n), l = r.$from.index(n) + i, a = r.$to.indexAfter(n) - s;
    if (n < r.depth && o.canReplace(l, a, e))
      return n;
    if (n == 0 || o.type.spec.isolating || !ni(o, l, a))
      break;
    l && (i = 1), a < o.childCount && (s = 1);
  }
  return null;
}
function ii(r, t, e) {
  let { $from: n, $to: i, depth: s } = t, o = n.before(s + 1), l = i.after(s + 1), a = o, h = l, c = f.empty, p = 0;
  for (let m = s, y = !1; m > e; m--)
    y || n.index(m) > 0 ? (y = !0, c = f.from(n.node(m).copy(c)), p++) : a--;
  let u = f.empty, d = 0;
  for (let m = s, y = !1; m > e; m--)
    y || i.after(m + 1) < i.end(m) ? (y = !0, u = f.from(i.node(m).copy(u)), d++) : h++;
  r.step(new A(a, h, o, l, new g(c.append(u), p, d), c.size - p, !0));
}
function $i(r, t, e = null, n = r) {
  let i = ri(r, t), s = i && si(n, t);
  return s ? i.map(ce).concat({ type: t, attrs: e }).concat(s.map(ce)) : null;
}
function ce(r) {
  return { type: r, attrs: null };
}
function ri(r, t) {
  let { parent: e, startIndex: n, endIndex: i } = r, s = e.contentMatchAt(n).findWrapping(t);
  if (!s)
    return null;
  let o = s.length ? s[0] : t;
  return e.canReplaceWith(n, i, o) ? s : null;
}
function si(r, t) {
  let { parent: e, startIndex: n, endIndex: i } = r, s = e.child(n), o = t.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : t).contentMatch;
  for (let h = n; a && h < i; h++)
    a = a.matchType(e.child(h).type);
  return !a || !a.validEnd ? null : o;
}
function oi(r, t, e) {
  let n = f.empty;
  for (let o = e.length - 1; o >= 0; o--) {
    if (n.size) {
      let l = e[o].type.contentMatch.matchFragment(n);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    n = f.from(e[o].type.create(e[o].attrs, n));
  }
  let i = t.start, s = t.end;
  r.step(new A(i, s, i, s, new g(n, 0, 0), e.length, !0));
}
function li(r, t, e, n, i) {
  if (!n.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = r.steps.length;
  r.doc.nodesBetween(t, e, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(n, a) && ai(r.doc, r.mapping.slice(s).map(l), n)) {
      let h = null;
      if (n.schema.linebreakReplacement) {
        let d = n.whitespace == "pre", m = !!n.contentMatch.matchType(n.schema.linebreakReplacement);
        d && !m ? h = !1 : !d && m && (h = !0);
      }
      h === !1 && He(r, o, l, s), Vt(r, r.mapping.slice(s).map(l, 1), n, void 0, h === null);
      let c = r.mapping.slice(s), p = c.map(l, 1), u = c.map(l + o.nodeSize, 1);
      return r.step(new A(p, u, p + 1, u - 1, new g(f.from(n.create(a, null, o.marks)), 0, 0), 1, !0)), h === !0 && qe(r, o, l, s), !1;
    }
  });
}
function qe(r, t, e, n) {
  t.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = r.mapping.slice(n).map(e + 1 + s + o.index);
        r.replaceWith(a, a + 1, t.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function He(r, t, e, n) {
  t.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = r.mapping.slice(n).map(e + 1 + s);
      r.replaceWith(o, o + 1, t.type.schema.text(`
`));
    }
  });
}
function ai(r, t, e) {
  let n = r.resolve(t), i = n.index();
  return n.parent.canReplaceWith(i, i + 1, e);
}
function hi(r, t, e, n, i) {
  let s = r.doc.nodeAt(t);
  if (!s)
    throw new RangeError("No node at given position");
  e || (e = s.type);
  let o = e.create(n, null, i || s.marks);
  if (s.isLeaf)
    return r.replaceWith(t, t + s.nodeSize, o);
  if (!e.validContent(s.content))
    throw new RangeError("Invalid content for node type " + e.name);
  r.step(new A(t, t + s.nodeSize, t + 1, t + s.nodeSize - 1, new g(f.from(o), 0, 0), 1, !0));
}
function Bi(r, t, e = 1, n) {
  let i = r.resolve(t), s = i.depth - e, o = n && n[n.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let h = i.depth - 1, c = e - 2; h > s; h--, c--) {
    let p = i.node(h), u = i.index(h);
    if (p.type.spec.isolating)
      return !1;
    let d = p.content.cutByIndex(u, p.childCount), m = n && n[c + 1];
    m && (d = d.replaceChild(0, m.type.create(m.attrs)));
    let y = n && n[c] || p;
    if (!p.canReplace(u + 1, p.childCount) || !y.type.validContent(d))
      return !1;
  }
  let l = i.indexAfter(s), a = n && n[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function ci(r, t, e = 1, n) {
  let i = r.doc.resolve(t), s = f.empty, o = f.empty;
  for (let l = i.depth, a = i.depth - e, h = e - 1; l > a; l--, h--) {
    s = f.from(i.node(l).copy(s));
    let c = n && n[h];
    o = f.from(c ? c.type.create(c.attrs, o) : i.node(l).copy(o));
  }
  r.step(new k(t, t, new g(s.append(o), e, e), !0));
}
function Fi(r, t) {
  let e = r.resolve(t), n = e.index();
  return Ue(e.nodeBefore, e.nodeAfter) && e.parent.canReplace(n, n + 1);
}
function pi(r, t) {
  t.content.size || r.type.compatibleContent(t.type);
  let e = r.contentMatchAt(r.childCount), { linebreakReplacement: n } = r.type.schema;
  for (let i = 0; i < t.childCount; i++) {
    let s = t.child(i), o = s.type == n ? r.type.schema.nodes.text : s.type;
    if (e = e.matchType(o), !e || !r.type.allowsMarks(s.marks))
      return !1;
  }
  return e.validEnd;
}
function Ue(r, t) {
  return !!(r && t && !r.isLeaf && pi(r, t));
}
function Ji(r, t, e = -1) {
  let n = r.resolve(t);
  for (let i = n.depth; ; i--) {
    let s, o, l = n.index(i);
    if (i == n.depth ? (s = n.nodeBefore, o = n.nodeAfter) : e > 0 ? (s = n.node(i + 1), l++, o = n.node(i).maybeChild(l)) : (s = n.node(i).maybeChild(l - 1), o = n.node(i + 1)), s && !s.isTextblock && Ue(s, o) && n.node(i).canReplace(l, l + 1))
      return t;
    if (i == 0)
      break;
    t = e < 0 ? n.before(i) : n.after(i);
  }
}
function ui(r, t, e) {
  let n = null, { linebreakReplacement: i } = r.doc.type.schema, s = r.doc.resolve(t - e), o = s.node().type;
  if (i && o.inlineContent) {
    let c = o.whitespace == "pre", p = !!o.contentMatch.matchType(i);
    c && !p ? n = !1 : !c && p && (n = !0);
  }
  let l = r.steps.length;
  if (n === !1) {
    let c = r.doc.resolve(t + e);
    He(r, c.node(), c.before(), l);
  }
  o.inlineContent && Vt(r, t + e - 1, o, s.node().contentMatchAt(s.index()), n == null);
  let a = r.mapping.slice(l), h = a.map(t - e);
  if (r.step(new k(h, a.map(t + e, -1), g.empty, !0)), n === !0) {
    let c = r.doc.resolve(h);
    qe(r, c.node(), c.before(), r.steps.length);
  }
  return r;
}
function di(r, t, e) {
  let n = r.resolve(t);
  if (n.parent.canReplaceWith(n.index(), n.index(), e))
    return t;
  if (n.parentOffset == 0)
    for (let i = n.depth - 1; i >= 0; i--) {
      let s = n.index(i);
      if (n.node(i).canReplaceWith(s, s, e))
        return n.before(i + 1);
      if (s > 0)
        return null;
    }
  if (n.parentOffset == n.parent.content.size)
    for (let i = n.depth - 1; i >= 0; i--) {
      let s = n.indexAfter(i);
      if (n.node(i).canReplaceWith(s, s, e))
        return n.after(i + 1);
      if (s < n.node(i).childCount)
        return null;
    }
  return null;
}
function Wi(r, t, e) {
  let n = r.resolve(t);
  if (!e.content.size)
    return t;
  let i = e.content;
  for (let s = 0; s < e.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (e.openStart == 0 && e.size ? 2 : 1); s++)
    for (let o = n.depth; o >= 0; o--) {
      let l = o == n.depth ? 0 : n.pos <= (n.start(o + 1) + n.end(o + 1)) / 2 ? -1 : 1, a = n.index(o) + (l > 0 ? 1 : 0), h = n.node(o), c = !1;
      if (s == 1)
        c = h.canReplace(a, a, i);
      else {
        let p = h.contentMatchAt(a).findWrapping(i.firstChild.type);
        c = p && h.canReplaceWith(a, a, p[0]);
      }
      if (c)
        return l == 0 ? n.pos : l < 0 ? n.before(o + 1) : n.after(o + 1);
    }
  return null;
}
function fi(r, t, e = t, n = g.empty) {
  if (t == e && !n.size)
    return null;
  let i = r.resolve(t), s = r.resolve(e);
  return Ve(i, s, n) ? new k(t, e, n) : new mi(i, s, n).fit();
}
function Ve(r, t, e) {
  return !e.openStart && !e.openEnd && r.start() == t.start() && r.parent.canReplace(r.index(), t.index(), e.content);
}
class mi {
  constructor(t, e, n) {
    this.$from = t, this.$to = e, this.unplaced = n, this.frontier = [], this.placed = f.empty;
    for (let i = 0; i <= t.depth; i++) {
      let s = t.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(t.indexAfter(i))
      });
    }
    for (let i = t.depth; i > 0; i--)
      this.placed = f.from(t.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let h = this.findFittable();
      h ? this.placeNodes(h) : this.openMore() || this.dropNode();
    }
    let t = this.mustMoveInline(), e = this.placed.size - this.depth - this.$from.depth, n = this.$from, i = this.close(t < 0 ? this.$to : n.doc.resolve(t));
    if (!i)
      return null;
    let s = this.placed, o = n.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new g(s, o, l);
    return t > -1 ? new A(n.pos, t, this.$to.pos, this.$to.end(), a, e) : a.size || n.pos != this.$to.pos ? new k(n.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let t = this.unplaced.openStart;
    for (let e = this.unplaced.content, n = 0, i = this.unplaced.openEnd; n < t; n++) {
      let s = e.firstChild;
      if (e.childCount > 1 && (i = 0), s.type.spec.isolating && i <= n) {
        t = n;
        break;
      }
      e = s.content;
    }
    for (let e = 1; e <= 2; e++)
      for (let n = e == 1 ? t : this.unplaced.openStart; n >= 0; n--) {
        let i, s = null;
        n ? (s = At(this.unplaced.content, n - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: h } = this.frontier[l], c, p = null;
          if (e == 1 && (o ? h.matchType(o.type) || (p = h.fillBefore(f.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: n, frontierDepth: l, parent: s, inject: p };
          if (e == 2 && o && (c = h.findWrapping(o.type)))
            return { sliceDepth: n, frontierDepth: l, parent: s, wrap: c };
          if (s && h.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: t, openStart: e, openEnd: n } = this.unplaced, i = At(t, e);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new g(t, e + 1, Math.max(n, i.size + e >= t.size - n ? e + 1 : 0)), !0);
  }
  dropNode() {
    let { content: t, openStart: e, openEnd: n } = this.unplaced, i = At(t, e);
    if (i.childCount <= 1 && e > 0) {
      let s = t.size - e <= e + i.size;
      this.unplaced = new g(nt(t, e - 1, 1), e - 1, s ? e - 1 : n);
    } else
      this.unplaced = new g(nt(t, e, 1), e, n);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: t, frontierDepth: e, parent: n, inject: i, wrap: s }) {
    for (; this.depth > e; )
      this.closeFrontierNode();
    if (s)
      for (let y = 0; y < s.length; y++)
        this.openFrontierNode(s[y]);
    let o = this.unplaced, l = n ? n.content : o.content, a = o.openStart - t, h = 0, c = [], { match: p, type: u } = this.frontier[e];
    if (i) {
      for (let y = 0; y < i.childCount; y++)
        c.push(i.child(y));
      p = p.matchFragment(i);
    }
    let d = l.size + t - (o.content.size - o.openEnd);
    for (; h < l.childCount; ) {
      let y = l.child(h), b = p.matchType(y.type);
      if (!b)
        break;
      h++, (h > 1 || a == 0 || y.content.size) && (p = b, c.push(Ge(y.mark(u.allowedMarks(y.marks)), h == 1 ? a : 0, h == l.childCount ? d : -1)));
    }
    let m = h == l.childCount;
    m || (d = -1), this.placed = it(this.placed, e, f.from(c)), this.frontier[e].match = p, m && d < 0 && n && n.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let y = 0, b = l; y < d; y++) {
      let O = b.lastChild;
      this.frontier.push({ type: O.type, match: O.contentMatchAt(O.childCount) }), b = O.content;
    }
    this.unplaced = m ? t == 0 ? g.empty : new g(nt(o.content, t - 1, 1), t - 1, d < 0 ? o.openEnd : t - 1) : new g(nt(o.content, t, h), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let t = this.frontier[this.depth], e;
    if (!t.type.isTextblock || !It(this.$to, this.$to.depth, t.type, t.match, !1) || this.$to.depth == this.depth && (e = this.findCloseLevel(this.$to)) && e.depth == this.depth)
      return -1;
    let { depth: n } = this.$to, i = this.$to.after(n);
    for (; n > 1 && i == this.$to.end(--n); )
      ++i;
    return i;
  }
  findCloseLevel(t) {
    t: for (let e = Math.min(this.depth, t.depth); e >= 0; e--) {
      let { match: n, type: i } = this.frontier[e], s = e < t.depth && t.end(e + 1) == t.pos + (t.depth - (e + 1)), o = It(t, e, i, n, s);
      if (o) {
        for (let l = e - 1; l >= 0; l--) {
          let { match: a, type: h } = this.frontier[l], c = It(t, l, h, a, !0);
          if (!c || c.childCount)
            continue t;
        }
        return { depth: e, fit: o, move: s ? t.doc.resolve(t.after(e + 1)) : t };
      }
    }
  }
  close(t) {
    let e = this.findCloseLevel(t);
    if (!e)
      return null;
    for (; this.depth > e.depth; )
      this.closeFrontierNode();
    e.fit.childCount && (this.placed = it(this.placed, e.depth, e.fit)), t = e.move;
    for (let n = e.depth + 1; n <= t.depth; n++) {
      let i = t.node(n), s = i.type.contentMatch.fillBefore(i.content, !0, t.index(n));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return t;
  }
  openFrontierNode(t, e = null, n) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(t), this.placed = it(this.placed, this.depth, f.from(t.create(e, n))), this.frontier.push({ type: t, match: t.contentMatch });
  }
  closeFrontierNode() {
    let e = this.frontier.pop().match.fillBefore(f.empty, !0);
    e.childCount && (this.placed = it(this.placed, this.frontier.length, e));
  }
}
function nt(r, t, e) {
  return t == 0 ? r.cutByIndex(e, r.childCount) : r.replaceChild(0, r.firstChild.copy(nt(r.firstChild.content, t - 1, e)));
}
function it(r, t, e) {
  return t == 0 ? r.append(e) : r.replaceChild(r.childCount - 1, r.lastChild.copy(it(r.lastChild.content, t - 1, e)));
}
function At(r, t) {
  for (let e = 0; e < t; e++)
    r = r.firstChild.content;
  return r;
}
function Ge(r, t, e) {
  if (t <= 0)
    return r;
  let n = r.content;
  return t > 1 && (n = n.replaceChild(0, Ge(n.firstChild, t - 1, n.childCount == 1 ? e - 1 : 0))), t > 0 && (n = r.type.contentMatch.fillBefore(n).append(n), e <= 0 && (n = n.append(r.type.contentMatch.matchFragment(n).fillBefore(f.empty, !0)))), r.copy(n);
}
function It(r, t, e, n, i) {
  let s = r.node(t), o = i ? r.indexAfter(t) : r.index(t);
  if (o == s.childCount && !e.compatibleContent(s.type))
    return null;
  let l = n.fillBefore(s.content, !0, o);
  return l && !gi(e, s.content, o) ? l : null;
}
function gi(r, t, e) {
  for (let n = e; n < t.childCount; n++)
    if (!r.allowsMarks(t.child(n).marks))
      return !0;
  return !1;
}
function yi(r) {
  return r.spec.defining || r.spec.definingForContent;
}
function wi(r, t, e, n) {
  if (!n.size)
    return r.deleteRange(t, e);
  let i = r.doc.resolve(t), s = r.doc.resolve(e);
  if (Ve(i, s, n))
    return r.step(new k(t, e, n));
  let o = Ke(i, s);
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let u = i.depth, d = i.pos - 1; u > 0; u--, d--) {
    let m = i.node(u).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    o.indexOf(u) > -1 ? l = u : i.before(u) == d && o.splice(1, 0, -u);
  }
  let a = o.indexOf(l), h = [], c = n.openStart;
  for (let u = n.content, d = 0; ; d++) {
    let m = u.firstChild;
    if (h.push(m), d == n.openStart)
      break;
    u = m.content;
  }
  for (let u = c - 1; u >= 0; u--) {
    let d = h[u], m = yi(d.type);
    if (m && !d.sameMarkup(i.node(Math.abs(l) - 1)))
      c = u;
    else if (m || !d.type.isTextblock)
      break;
  }
  for (let u = n.openStart; u >= 0; u--) {
    let d = (u + c + 1) % (n.openStart + 1), m = h[d];
    if (m)
      for (let y = 0; y < o.length; y++) {
        let b = o[(y + a) % o.length], O = !0;
        b < 0 && (O = !1, b = -b);
        let ft = i.node(b - 1), G = i.index(b - 1);
        if (ft.canReplaceWith(G, G, m.type, m.marks))
          return r.replace(i.before(b), O ? s.after(b) : e, new g(je(n.content, 0, n.openStart, d), d, n.openEnd));
      }
  }
  let p = r.steps.length;
  for (let u = o.length - 1; u >= 0 && (r.replace(t, e, n), !(r.steps.length > p)); u--) {
    let d = o[u];
    d < 0 || (t = i.before(d), e = s.after(d));
  }
}
function je(r, t, e, n, i) {
  if (t < e) {
    let s = r.firstChild;
    r = r.replaceChild(0, s.copy(je(s.content, t + 1, e, n, s)));
  }
  if (t > n) {
    let s = i.contentMatchAt(0), o = s.fillBefore(r).append(r);
    r = o.append(s.matchFragment(o).fillBefore(f.empty, !0));
  }
  return r;
}
function xi(r, t, e, n) {
  if (!n.isInline && t == e && r.doc.resolve(t).parent.content.size) {
    let i = di(r.doc, t, n.type);
    i != null && (t = e = i);
  }
  r.replaceRange(t, e, new g(f.from(n), 0, 0));
}
function vi(r, t, e) {
  let n = r.doc.resolve(t), i = r.doc.resolve(e);
  if (n.parent.isTextblock && i.parent.isTextblock && n.start() != i.start() && n.parentOffset == 0 && i.parentOffset == 0) {
    let o = n.sharedDepth(e), l = !1;
    for (let a = n.depth; a > o; a--)
      n.node(a).type.spec.isolating && (l = !0);
    for (let a = i.depth; a > o; a--)
      i.node(a).type.spec.isolating && (l = !0);
    if (!l) {
      for (let a = n.depth; a > 0 && t == n.start(a); a--)
        t = n.before(a);
      for (let a = i.depth; a > 0 && e == i.start(a); a--)
        e = i.before(a);
      n = r.doc.resolve(t), i = r.doc.resolve(e);
    }
  }
  let s = Ke(n, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || n.node(l).type.contentMatch.validEnd)
      return r.delete(n.start(l), i.end(l));
    if (l > 0 && (a || n.node(l - 1).canReplace(n.index(l - 1), i.indexAfter(l - 1))))
      return r.delete(n.before(l), i.after(l));
  }
  for (let o = 1; o <= n.depth && o <= i.depth; o++)
    if (t - n.start(o) == n.depth - o && e > n.end(o) && i.end(o) - e != i.depth - o && n.start(o - 1) == i.start(o - 1) && n.node(o - 1).canReplace(n.index(o - 1), i.index(o - 1)))
      return r.delete(n.before(o), e);
  r.delete(t, e);
}
function Ke(r, t) {
  let e = [], n = Math.min(r.depth, t.depth);
  for (let i = n; i >= 0; i--) {
    let s = r.start(i);
    if (s < r.pos - (r.depth - i) || t.end(i) > t.pos + (t.depth - i) || r.node(i).type.spec.isolating || t.node(i).type.spec.isolating)
      break;
    (s == t.start(i) || i == r.depth && i == t.depth && r.parent.inlineContent && t.parent.inlineContent && i && t.start(i - 1) == s - 1) && e.push(i);
  }
  return e;
}
class K extends C {
  /**
  Construct an attribute step.
  */
  constructor(t, e, n) {
    super(), this.pos = t, this.attr = e, this.value = n;
  }
  apply(t) {
    let e = t.nodeAt(this.pos);
    if (!e)
      return v.fail("No node at attribute step's position");
    let n = /* @__PURE__ */ Object.create(null);
    for (let s in e.attrs)
      n[s] = e.attrs[s];
    n[this.attr] = this.value;
    let i = e.type.create(n, null, e.marks);
    return v.fromReplace(t, this.pos, this.pos + 1, new g(f.from(i), 0, e.isLeaf ? 0 : 1));
  }
  getMap() {
    return T.empty;
  }
  invert(t) {
    return new K(this.pos, this.attr, t.nodeAt(this.pos).attrs[this.attr]);
  }
  map(t) {
    let e = t.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new K(e.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(t, e) {
    if (typeof e.pos != "number" || typeof e.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new K(e.pos, e.attr, e.value);
  }
}
C.jsonID("attr", K);
class ut extends C {
  /**
  Construct an attribute step.
  */
  constructor(t, e) {
    super(), this.attr = t, this.value = e;
  }
  apply(t) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let i in t.attrs)
      e[i] = t.attrs[i];
    e[this.attr] = this.value;
    let n = t.type.create(e, t.content, t.marks);
    return v.ok(n);
  }
  getMap() {
    return T.empty;
  }
  invert(t) {
    return new ut(this.attr, t.attrs[this.attr]);
  }
  map(t) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(t, e) {
    if (typeof e.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new ut(e.attr, e.value);
  }
}
C.jsonID("docAttr", ut);
let X = class extends Error {
};
X = function r(t) {
  let e = Error.call(this, t);
  return e.__proto__ = r.prototype, e;
};
X.prototype = Object.create(Error.prototype);
X.prototype.constructor = X;
X.prototype.name = "TransformError";
class ki {
  /**
  Create a transform that starts with the given document.
  */
  constructor(t) {
    this.doc = t, this.steps = [], this.docs = [], this.mapping = new Et();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(t) {
    let e = this.maybeStep(t);
    if (e.failed)
      throw new X(e.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(t) {
    let e = t.apply(this.doc);
    return e.failed || this.addStep(t, e.doc), e;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  Return a single range, in post-transform document positions,
  that covers all content changed by this transform. Returns null
  if no replacements are made. Note that this will ignore changes
  that add/remove marks without replacing the underlying content.
  */
  changedRange() {
    let t = 1e9, e = -1e9;
    for (let n = 0; n < this.mapping.maps.length; n++) {
      let i = this.mapping.maps[n];
      n && (t = i.map(t, 1), e = i.map(e, -1)), i.forEach((s, o, l, a) => {
        t = Math.min(t, l), e = Math.max(e, a);
      });
    }
    return t == 1e9 ? null : { from: t, to: e };
  }
  /**
  @internal
  */
  addStep(t, e) {
    this.docs.push(this.doc), this.steps.push(t), this.mapping.appendMap(t.getMap()), this.doc = e;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(t, e = t, n = g.empty) {
    let i = fi(this.doc, t, e, n);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(t, e, n) {
    return this.replace(t, e, new g(f.from(n), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(t, e) {
    return this.replace(t, e, g.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(t, e) {
    return this.replaceWith(t, t, e);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(t, e, n) {
    return wi(this, t, e, n), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(t, e, n) {
    return xi(this, t, e, n), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(t, e) {
    return vi(this, t, e), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(t, e) {
    return ii(this, t, e), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(t, e = 1) {
    return ui(this, t, e), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(t, e) {
    return oi(this, t, e), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(t, e = t, n, i = null) {
    return li(this, t, e, n, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(t, e, n = null, i) {
    return hi(this, t, e, n, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(t, e, n) {
    return this.step(new K(t, e, n)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(t, e) {
    return this.step(new ut(t, e)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(t, e) {
    return this.step(new $(t, e)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(t, e) {
    let n = this.doc.nodeAt(t);
    if (!n)
      throw new RangeError("No node at position " + t);
    if (e instanceof w)
      e.isInSet(n.marks) && this.step(new H(t, e));
    else {
      let i = n.marks, s, o = [];
      for (; s = e.isInSet(i); )
        o.push(new H(t, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(t, e = 1, n) {
    return ci(this, t, e, n), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(t, e, n) {
    return ti(this, t, e, n), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(t, e, n) {
    return ei(this, t, e, n), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(t, e, n) {
    return Vt(this, t, e, n), this;
  }
}
const Rt = /* @__PURE__ */ Object.create(null);
class x {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(t, e, n) {
    this.$anchor = t, this.$head = e, this.ranges = n || [new bi(t.min(e), t.max(e))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let t = this.ranges;
    for (let e = 0; e < t.length; e++)
      if (t[e].$from.pos != t[e].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(t, e = g.empty) {
    let n = e.content.lastChild, i = null;
    for (let l = 0; l < e.openEnd; l++)
      i = n, n = n.lastChild;
    let s = t.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: h } = o[l], c = t.mapping.slice(s);
      t.replaceRange(c.map(a.pos), c.map(h.pos), l ? g.empty : e), l == 0 && de(t, s, (n ? n.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(t, e) {
    let n = t.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = t.mapping.slice(n), h = a.map(o.pos), c = a.map(l.pos);
      s ? t.deleteRange(h, c) : (t.replaceRangeWith(h, c, e), de(t, n, e.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(t, e, n = !1) {
    let i = t.parent.inlineContent ? new M(t) : j(t.node(0), t.parent, t.pos, t.index(), e, n);
    if (i)
      return i;
    for (let s = t.depth - 1; s >= 0; s--) {
      let o = e < 0 ? j(t.node(0), t.node(s), t.before(s + 1), t.index(s), e, n) : j(t.node(0), t.node(s), t.after(s + 1), t.index(s) + 1, e, n);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(t, e = 1) {
    return this.findFrom(t, e) || this.findFrom(t, -e) || new R(t.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(t) {
    return j(t, t, 0, 0, 1) || new R(t);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(t) {
    return j(t, t, t.content.size, t.childCount, -1) || new R(t);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(t, e) {
    if (!e || !e.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let n = Rt[e.type];
    if (!n)
      throw new RangeError(`No selection type ${e.type} defined`);
    return n.fromJSON(t, e);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(t, e) {
    if (t in Rt)
      throw new RangeError("Duplicate use of selection JSON ID " + t);
    return Rt[t] = e, e.prototype.jsonID = t, e;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return M.between(this.$anchor, this.$head).getBookmark();
  }
}
x.prototype.visible = !0;
class bi {
  /**
  Create a range.
  */
  constructor(t, e) {
    this.$from = t, this.$to = e;
  }
}
let pe = !1;
function ue(r) {
  !pe && !r.parent.inlineContent && (pe = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + r.parent.type.name + ")"));
}
class M extends x {
  /**
  Construct a text selection between the given points.
  */
  constructor(t, e = t) {
    ue(t), ue(e), super(t, e);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(t, e) {
    let n = t.resolve(e.map(this.head));
    if (!n.parent.inlineContent)
      return x.near(n);
    let i = t.resolve(e.map(this.anchor));
    return new M(i.parent.inlineContent ? i : n, n);
  }
  replace(t, e = g.empty) {
    if (super.replace(t, e), e == g.empty) {
      let n = this.$from.marksAcross(this.$to);
      n && t.ensureMarks(n);
    }
  }
  eq(t) {
    return t instanceof M && t.anchor == this.anchor && t.head == this.head;
  }
  getBookmark() {
    return new Nt(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new M(t.resolve(e.anchor), t.resolve(e.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(t, e, n = e) {
    let i = t.resolve(e);
    return new this(i, n == e ? i : t.resolve(n));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(t, e, n) {
    let i = t.pos - e.pos;
    if ((!n || i) && (n = i >= 0 ? 1 : -1), !e.parent.inlineContent) {
      let s = x.findFrom(e, n, !0) || x.findFrom(e, -n, !0);
      if (s)
        e = s.$head;
      else
        return x.near(e, n);
    }
    return t.parent.inlineContent || (i == 0 ? t = e : (t = (x.findFrom(t, -n, !0) || x.findFrom(t, n, !0)).$anchor, t.pos < e.pos != i < 0 && (t = e))), new M(t, e);
  }
}
x.jsonID("text", M);
class Nt {
  constructor(t, e) {
    this.anchor = t, this.head = e;
  }
  map(t) {
    return new Nt(t.map(this.anchor), t.map(this.head));
  }
  resolve(t) {
    return M.between(t.resolve(this.anchor), t.resolve(this.head));
  }
}
class _ extends x {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(t) {
    let e = t.nodeAfter, n = t.node(0).resolve(t.pos + e.nodeSize);
    super(t, n), this.node = e;
  }
  map(t, e) {
    let { deleted: n, pos: i } = e.mapResult(this.anchor), s = t.resolve(i);
    return n ? x.near(s) : new _(s);
  }
  content() {
    return new g(f.from(this.node), 0, 0);
  }
  eq(t) {
    return t instanceof _ && t.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Gt(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(t, e) {
    if (typeof e.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new _(t.resolve(e.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(t, e) {
    return new _(t.resolve(e));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(t) {
    return !t.isText && t.type.spec.selectable !== !1;
  }
}
_.prototype.visible = !1;
x.jsonID("node", _);
class Gt {
  constructor(t) {
    this.anchor = t;
  }
  map(t) {
    let { deleted: e, pos: n } = t.mapResult(this.anchor);
    return e ? new Nt(n, n) : new Gt(n);
  }
  resolve(t) {
    let e = t.resolve(this.anchor), n = e.nodeAfter;
    return n && _.isSelectable(n) ? new _(e) : x.near(e);
  }
}
class R extends x {
  /**
  Create an all-selection over the given document.
  */
  constructor(t) {
    super(t.resolve(0), t.resolve(t.content.size));
  }
  replace(t, e = g.empty) {
    if (e == g.empty) {
      t.delete(0, t.doc.content.size);
      let n = x.atStart(t.doc);
      n.eq(t.selection) || t.setSelection(n);
    } else
      super.replace(t, e);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(t) {
    return new R(t);
  }
  map(t) {
    return new R(t);
  }
  eq(t) {
    return t instanceof R;
  }
  getBookmark() {
    return Si;
  }
}
x.jsonID("all", R);
const Si = {
  map() {
    return this;
  },
  resolve(r) {
    return new R(r);
  }
};
function j(r, t, e, n, i, s = !1) {
  if (t.inlineContent)
    return M.create(r, e);
  for (let o = n - (i > 0 ? 0 : 1); i > 0 ? o < t.childCount : o >= 0; o += i) {
    let l = t.child(o);
    if (l.isAtom) {
      if (!s && _.isSelectable(l))
        return _.create(r, e - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = j(r, l, e + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    e += l.nodeSize * i;
  }
  return null;
}
function de(r, t, e) {
  let n = r.steps.length - 1;
  if (n < t)
    return;
  let i = r.steps[n];
  if (!(i instanceof k || i instanceof A))
    return;
  let s = r.mapping.maps[n], o;
  s.forEach((l, a, h, c) => {
    o == null && (o = c);
  }), r.setSelection(x.near(r.doc.resolve(o), e));
}
const fe = 1, wt = 2, me = 4;
class Ci extends ki {
  /**
  @internal
  */
  constructor(t) {
    super(t.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = t.selection, this.storedMarks = t.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(t) {
    if (t.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = t, this.curSelectionFor = this.steps.length, this.updated = (this.updated | fe) & ~wt, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & fe) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(t) {
    return this.storedMarks = t, this.updated |= wt, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(t) {
    return w.sameSet(this.storedMarks || this.selection.$from.marks(), t) || this.setStoredMarks(t), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(t) {
    return this.ensureMarks(t.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(t) {
    return this.ensureMarks(t.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & wt) > 0;
  }
  /**
  @internal
  */
  addStep(t, e) {
    super.addStep(t, e), this.updated = this.updated & ~wt, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(t) {
    return this.time = t, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(t) {
    return this.selection.replace(this, t), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(t, e = !0) {
    let n = this.selection;
    return e && (t = t.mark(this.storedMarks || (n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || w.none))), n.replaceWith(this, t), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(t, e, n) {
    let i = this.doc.type.schema;
    if (e == null)
      return t ? this.replaceSelectionWith(i.text(t), !0) : this.deleteSelection();
    {
      if (n == null && (n = e), !t)
        return this.deleteRange(e, n);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(e);
        s = n == e ? o.marks() : o.marksAcross(this.doc.resolve(n));
      }
      return this.replaceRangeWith(e, n, i.text(t, s)), !this.selection.empty && this.selection.to == e + t.length && this.setSelection(x.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(t, e) {
    return this.meta[typeof t == "string" ? t : t.key] = e, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(t) {
    return this.meta[typeof t == "string" ? t : t.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let t in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= me, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & me) > 0;
  }
}
function ge(r, t) {
  return !t || !r ? r : r.bind(t);
}
class rt {
  constructor(t, e, n) {
    this.name = t, this.init = ge(e.init, n), this.apply = ge(e.apply, n);
  }
}
const Ei = [
  new rt("doc", {
    init(r) {
      return r.doc || r.schema.topNodeType.createAndFill();
    },
    apply(r) {
      return r.doc;
    }
  }),
  new rt("selection", {
    init(r, t) {
      return r.selection || x.atStart(t.doc);
    },
    apply(r) {
      return r.selection;
    }
  }),
  new rt("storedMarks", {
    init(r) {
      return r.storedMarks || null;
    },
    apply(r, t, e, n) {
      return n.selection.$cursor ? r.storedMarks : null;
    }
  }),
  new rt("scrollToSelection", {
    init() {
      return 0;
    },
    apply(r, t) {
      return r.scrolledIntoView ? t + 1 : t;
    }
  })
];
class zt {
  constructor(t, e) {
    this.schema = t, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Ei.slice(), e && e.forEach((n) => {
      if (this.pluginsByKey[n.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + n.key + ")");
      this.plugins.push(n), this.pluginsByKey[n.key] = n, n.spec.state && this.fields.push(new rt(n.key, n.spec.state, n));
    });
  }
}
class st {
  /**
  @internal
  */
  constructor(t) {
    this.config = t;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(t) {
    return this.applyTransaction(t).state;
  }
  /**
  @internal
  */
  filterTransaction(t, e = -1) {
    for (let n = 0; n < this.config.plugins.length; n++)
      if (n != e) {
        let i = this.config.plugins[n];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, t, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(t) {
    if (!this.filterTransaction(t))
      return { state: this, transactions: [] };
    let e = [t], n = this.applyInner(t), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, h = i ? i[o].state : this, c = a < e.length && l.spec.appendTransaction.call(l, a ? e.slice(a) : e, h, n);
          if (c && n.filterTransaction(c, o)) {
            if (c.setMeta("appendedTransaction", t), !i) {
              i = [];
              for (let p = 0; p < this.config.plugins.length; p++)
                i.push(p < o ? { state: n, n: e.length } : { state: this, n: 0 });
            }
            e.push(c), n = n.applyInner(c), s = !0;
          }
          i && (i[o] = { state: n, n: e.length });
        }
      }
      if (!s)
        return { state: n, transactions: e };
    }
  }
  /**
  @internal
  */
  applyInner(t) {
    if (!t.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let e = new st(this.config), n = this.config.fields;
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      e[s.name] = s.apply(t, this[s.name], this, e);
    }
    return e;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Ci(this);
  }
  /**
  Create a new state.
  */
  static create(t) {
    let e = new zt(t.doc ? t.doc.type.schema : t.schema, t.plugins), n = new st(e);
    for (let i = 0; i < e.fields.length; i++)
      n[e.fields[i].name] = e.fields[i].init(t, n);
    return n;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(t) {
    let e = new zt(this.schema, t.plugins), n = e.fields, i = new st(e);
    for (let s = 0; s < n.length; s++) {
      let o = n[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : n[s].init(t, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(t) {
    let e = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (e.storedMarks = this.storedMarks.map((n) => n.toJSON())), t && typeof t == "object")
      for (let n in t) {
        if (n == "doc" || n == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = t[n], s = i.spec.state;
        s && s.toJSON && (e[n] = s.toJSON.call(i, this[i.key]));
      }
    return e;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(t, e, n) {
    if (!e)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!t.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new zt(t.schema, t.plugins), s = new st(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = W.fromJSON(t.schema, e.doc);
      else if (o.name == "selection")
        s.selection = x.fromJSON(s.doc, e.selection);
      else if (o.name == "storedMarks")
        e.storedMarks && (s.storedMarks = e.storedMarks.map(t.schema.markFromJSON));
      else {
        if (n)
          for (let l in n) {
            let a = n[l], h = a.spec.state;
            if (a.key == o.name && h && h.fromJSON && Object.prototype.hasOwnProperty.call(e, l)) {
              s[o.name] = h.fromJSON.call(a, t, e[l], s);
              return;
            }
          }
        s[o.name] = o.init(t, s);
      }
    }), s;
  }
}
function Ye(r, t, e) {
  for (let n in r) {
    let i = r[n];
    i instanceof Function ? i = i.bind(t) : n == "handleDOMEvents" && (i = Ye(i, t, {})), e[n] = i;
  }
  return e;
}
class qi {
  /**
  Create a plugin.
  */
  constructor(t) {
    this.spec = t, this.props = {}, t.props && Ye(t.props, this, this.props), this.key = t.key ? t.key.key : Xe("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(t) {
    return t[this.key];
  }
}
const Dt = /* @__PURE__ */ Object.create(null);
function Xe(r) {
  return r in Dt ? r + "$" + ++Dt[r] : (Dt[r] = 0, r + "$");
}
class Hi {
  /**
  Create a plugin key.
  */
  constructor(t = "key") {
    this.key = Xe(t);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(t) {
    return t.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(t) {
    return t[this.key];
  }
}
async function Ti() {
  const [{ Editor: r }, { StarterKit: t }, { TaskList: e }, { TaskItem: n }, { Link: i }, { Highlight: s }, { ListItem: o }] = await Promise.all([
    import("./index-83TcH1XJ.js").then((l) => l.C),
    import("./index-BKF-fqB2.js"),
    import("./index-Cy5ib30R.js"),
    import("./index-2FRnEwM_.js"),
    import("./index-CrOtPYpL.js"),
    import("./index-B2HysJK3.js"),
    import("./index-COanOeZn.js")
  ]);
  return {
    Editor: r,
    extensions: [
      // listItem: false — replaced below with a ListItem that also allows a
      // heading as its first child. The default ListItem content model is
      // 'paragraph block*' (first child must specifically be a paragraph),
      // so toggling a list item to a heading is invalid at that level and
      // ProseMirror climbs up through every ancestor list to find a place
      // it IS valid, collapsing all nested indentation in the process.
      t.configure({ heading: { levels: [1, 2, 3] }, link: !1, listItem: !1, hardBreak: !1 }),
      o.extend({
        content: "(paragraph|heading) block*",
        priority: 1e3,
        addKeyboardShortcuts() {
          return {
            ...this.parent?.(),
            // Backspace in an empty item that has a sibling after it deletes the
            // item outright. The default lifts it out of the list, which splits
            // the list in two and restarts the numbering of the second half at 1.
            // The last item keeps the default so Backspace can still leave a list.
            Backspace: ({ editor: l }) => {
              const { selection: a } = l.state, { $from: h } = a;
              if (!a.empty || h.parentOffset !== 0 || h.parent.content.size !== 0) return !1;
              const c = h.depth - 1;
              if (c < 1 || h.node(c).type.name !== this.name) return !1;
              const p = h.node(c), u = h.node(c - 1);
              if (p.childCount !== 1 || h.index(c - 1) >= u.childCount - 1) return !1;
              const d = h.before(c);
              return l.chain().deleteRange({ from: d, to: d + p.nodeSize }).command(({ tr: m }) => (m.setSelection(x.near(m.doc.resolve(d), -1)), !0)).run();
            }
          };
        }
      }),
      e,
      n.configure({ nested: !0 }),
      i.configure({ openOnClick: !0 }),
      s
    ]
  };
}
var _i = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, jt = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ni(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && _i(t, e, i), i;
};
let dt = class extends Z {
  constructor() {
    super(...arguments), this.content = "", this._editor = null, this._fallback = !1, this._lastEmitted = "";
  }
  async connectedCallback() {
    super.connectedCallback(), await this.updateComplete, this._init();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._editor?.destroy(), this._editor = null;
  }
  updated(r) {
    r.has("content") && this._editor && this.content !== this._lastEmitted && (this._lastEmitted = this.content, this._editor.commands.setContent(this.content, { emitUpdate: !1 }), this._editor.commands.focus("end"));
  }
  // Re-scrolls the caret into view if the editor has focus. Needed after the
  // on-screen keyboard finishes opening: the autofocus scroll runs before the
  // viewport has shrunk, so the caret (at the end of the note) ends up hidden.
  scrollCaretIntoView() {
    this._editor?.isFocused && this._editor.commands.scrollIntoView();
  }
  async _init() {
    let r;
    try {
      r = await Ti();
    } catch (n) {
      console.warn("Home Assistant Notes: Tiptap failed to load, falling back to textarea", n), r = null;
    }
    if (!r || !this._mount) {
      this._fallback = !0, this.requestUpdate();
      return;
    }
    const { Editor: t, extensions: e } = r;
    this._editor = new t({
      element: this._mount,
      extensions: e,
      content: this.content,
      autofocus: "end",
      onUpdate: () => this._emitChanged()
    }), this._lastEmitted = this._editor.getHTML(), this._mount?.addEventListener("change", (n) => {
      const i = n.target;
      i instanceof HTMLInputElement && i.type === "checkbox" && i.closest('ul[data-type="taskList"]') && (n.stopPropagation(), this._toggleTaskItem(i));
    }, !0);
  }
  // Applies a checkbox toggle and keeps the checklist tidy: unchecked items on
  // top, checked items below, each group sorted alphabetically. Only runs on
  // checkbox toggle (not on every keystroke) so typing a new item doesn't
  // jump around the list while the user is still writing it.
  _toggleTaskItem(r) {
    const t = this._editor?.view, e = r.closest("li");
    if (!t || !e) return;
    const n = r.checked;
    r.checked = !n;
    const i = t.state.doc.resolve(t.posAtDOM(e, 0));
    let s = i.depth;
    for (; s > 0 && i.node(s).type.name !== "taskList"; ) s--;
    if (i.node(s).type.name !== "taskList") return;
    const o = i.before(s) + 1;
    let l = -1;
    if (i.node(s).forEach((u, d) => {
      t.nodeDOM(o + d) === e && (l = o + d);
    }), l < 0) return;
    const a = t.state.tr;
    a.setNodeMarkup(l, void 0, { ...a.doc.nodeAt(l).attrs, checked: n });
    const h = a.doc.nodeAt(o - 1), c = [];
    h.forEach((u) => c.push(u));
    const p = [...c].sort((u, d) => {
      const m = !!u.attrs.checked, y = !!d.attrs.checked;
      return m !== y ? m ? 1 : -1 : (u.textContent || "").trim().localeCompare((d.textContent || "").trim());
    });
    if (p.some((u, d) => u !== c[d])) {
      const u = o + h.content.size, d = a.selection, { from: m, to: y } = d;
      if (a.replaceWith(o, u, p), m >= o && y <= u) {
        let b = o;
        for (const O of c) {
          const ft = b + O.nodeSize;
          if (m < ft) {
            let G = o;
            for (const Xt of p) {
              if (Xt === O) break;
              G += Xt.nodeSize;
            }
            const Kt = G - b, Yt = m + Kt, Qe = Math.min(y + Kt, G + O.nodeSize);
            a.setSelection(d instanceof _ ? _.create(a.doc, Yt) : M.between(a.doc.resolve(Yt), a.doc.resolve(Qe)));
            break;
          }
          b = ft;
        }
      }
    }
    t.dispatch(a);
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
  runAction(r, t) {
    const e = this._editor?.chain().focus();
    if (e)
      switch (r) {
        case "paragraph":
          e.setParagraph().run();
          break;
        case "h1":
          e.toggleHeading({ level: 1 }).run();
          break;
        case "h2":
          e.toggleHeading({ level: 2 }).run();
          break;
        case "h3":
          e.toggleHeading({ level: 3 }).run();
          break;
        case "bold":
          e.toggleBold().run();
          break;
        case "italic":
          e.toggleItalic().run();
          break;
        case "strike":
          e.toggleStrike().run();
          break;
        case "highlight":
          e.toggleHighlight().run();
          break;
        case "code":
          e.toggleCode().run();
          break;
        case "codeBlock":
          e.toggleCodeBlock().run();
          break;
        case "blockquote":
          e.toggleBlockquote().run();
          break;
        case "bulletList":
          e.toggleBulletList().run();
          break;
        case "orderedList":
          e.toggleOrderedList().run();
          break;
        case "taskList":
          e.toggleTaskList().run();
          break;
        case "indent":
          e.sinkListItem("listItem").run();
          break;
        case "outdent":
          e.liftListItem("listItem").run();
          break;
        case "setLink":
          t?.href && e.setLink({ href: t.href }).run();
          break;
        case "unsetLink":
          e.unsetLink().run();
          break;
      }
  }
  render() {
    return this._fallback ? E`<textarea
        id="fallback"
        class="fallback"
        placeholder="Start typing..."
        .value=${this.content}
        @input=${() => this._emitChanged()}
        @keydown=${(r) => r.stopPropagation()}
      ></textarea>` : E`<div id="mount" @keydown=${(r) => r.stopPropagation()}></div>`;
  }
};
dt.styles = Q`
    :host { display: flex; flex-direction: column; flex: 1 0 auto; }
    .fallback {
      width: 100%; min-height: 300px; font-size: 15px; line-height: 1.6;
      border: none; outline: none; resize: none; color: var(--primary-text-color);
      background: transparent; font-family: inherit;
    }
    #mount { flex: 1 0 auto; display: flex; flex-direction: column; }
    .ProseMirror,
    .ProseMirror:focus,
    .ProseMirror:focus-visible {
      outline: none;
    }
    .ProseMirror {
      flex: 1 0 auto; min-height: 100%; cursor: text; overflow-wrap: anywhere;
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
jt([
  N({ attribute: !1 })
], dt.prototype, "content", 2);
jt([
  qt("#mount")
], dt.prototype, "_mount", 2);
dt = jt([
  tt("home-assistant-notes-tiptap-editor")
], dt);
var Oi = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, U = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Mi(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Oi(t, e, i), i;
};
function ye(r) {
  if (!/data-type=["']taskList["']/.test(r)) return r;
  const t = new DOMParser().parseFromString(r, "text/html");
  return t.body.querySelectorAll('ul[data-type="taskList"]').forEach((e) => {
    [...Array.from(e.children).filter((s) => s.tagName === "LI")].sort((s, o) => {
      const l = s.getAttribute("data-checked") === "true", a = o.getAttribute("data-checked") === "true";
      return l !== a ? l ? 1 : -1 : (s.textContent || "").trim().localeCompare((o.textContent || "").trim());
    }).forEach((s) => e.appendChild(s));
  }), t.body.innerHTML;
}
let z = class extends Z {
  constructor() {
    super(...arguments), this.note = null, this._pendingDelete = !1, this._justSaved = !1, this._displayContent = "", this._onViewportResize = () => {
      const r = window.visualViewport;
      if (!r) return;
      this.style.setProperty("--home-assistant-notes-visible-height", `${r.height}px`);
      const t = window.innerHeight - r.height > 100;
      this.toggleAttribute("keyboard-open", t), this.toggleAttribute("browser-bar", !t && r.offsetTop + r.height < window.screen.height - 20), this.style.setProperty("--home-assistant-notes-offset-top", t ? `${r.offsetTop}px` : "0px"), !t && (window.scrollY || r.offsetTop) && window.scrollTo(0, 0), t && requestAnimationFrame(() => this._tiptap?.scrollCaretIntoView());
    }, this._onTitleKeydown = (r) => {
      r.stopPropagation(), r.key === "Enter" && r.preventDefault();
    }, this._onTitleInput = () => {
      const r = this._titleInput;
      r && r.value.includes(`
`) && (r.value = r.value.replace(/\s*\n\s*/g, " ")), this._fitTitle(), this._scheduleSave();
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.visualViewport?.addEventListener("resize", this._onViewportResize), window.visualViewport?.addEventListener("scroll", this._onViewportResize), this._onViewportResize();
  }
  // Flushes a sorted save for the note we're navigating away from — using
  // willUpdate (before render) rather than updated() means `this._tiptap`
  // still holds the departing note's (possibly unsaved) content, since the
  // child's `.content` binding hasn't re-rendered to the new note yet.
  willUpdate(r) {
    if (!r.has("note")) return;
    const t = r.get("note");
    t?.note_id !== this.note?.note_id && (t && this._flushSorted(t), this._displayContent = this.note ? ye(this.note.content || "") : "");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._saveTimeout), clearTimeout(this._deleteTimeout), clearTimeout(this._toastTimeout), window.visualViewport?.removeEventListener("resize", this._onViewportResize), window.visualViewport?.removeEventListener("scroll", this._onViewportResize);
  }
  _fitTitle() {
    const r = this._titleInput;
    r && (r.style.height = "auto", r.style.height = `${r.scrollHeight}px`);
  }
  updated() {
    this._fitTitle();
  }
  _scheduleSave() {
    clearTimeout(this._saveTimeout), this._saveTimeout = setTimeout(() => this._save(), 1e3);
  }
  _save(r = {}) {
    if (!this.note) return;
    const t = {
      note_id: this.note.note_id,
      title: r.title ?? this._titleInput?.value ?? this.note.title,
      content: r.content ?? this._tiptap?.getHTML() ?? this.note.content,
      color: r.color ?? this.note.color,
      pinned: r.pinned ?? this.note.pinned
    };
    this.dispatchEvent(new CustomEvent("note-save", { detail: t, bubbles: !0, composed: !0 })), this._justSaved = !0, clearTimeout(this._toastTimeout), this._toastTimeout = setTimeout(() => {
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
  _flushSorted(r) {
    clearTimeout(this._saveTimeout);
    const t = ye(this._tiptap?.getHTML() ?? r.content), e = this._titleInput?.value ?? r.title;
    this._displayContent = t, !(t === r.content && e === r.title) && this.dispatchEvent(new CustomEvent("note-save", {
      detail: { note_id: r.note_id, title: e, content: t, color: r.color, pinned: r.pinned },
      bubbles: !0,
      composed: !0
    }));
  }
  _onToolbarAction(r) {
    this._tiptap?.runAction(r.detail.action, r.detail.payload);
  }
  _onColorSelect(r) {
    clearTimeout(this._saveTimeout), this._save({ color: r.detail.color });
  }
  _onPinToggle() {
    this.note && (clearTimeout(this._saveTimeout), this._save({ pinned: !this.note.pinned }));
  }
  _onLinkOpenRequested(r) {
    const t = r.target;
    t.linkHref = this._tiptap?.getLinkHref() ?? "";
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
    return this.note ? E`
      <div class="header">
        <ha-icon-button class="back-btn" .path=${ln} @click=${() => {
      this.note && this._flushSorted(this.note), this.dispatchEvent(new CustomEvent("editor-back", { bubbles: !0, composed: !0 }));
    }}></ha-icon-button>
        <div class="actions">
          <ha-button size="s" appearance="plain" variant="neutral" @click=${() => {
      clearTimeout(this._saveTimeout), this._save();
    }}>
            ${this._justSaved ? E`<ha-svg-icon .path=${an}></ha-svg-icon>` : "Save"}
          </ha-button>
          <ha-button size="s" appearance="plain" variant="danger" @click=${() => this._onDelete()}>${this._pendingDelete ? "Confirm?" : "Delete"}</ha-button>
        </div>
      </div>
      <div class="body">
        <textarea
          class="title-input"
          rows="1"
          placeholder="Note Title"
          .value=${this.note.title || ""}
          @input=${this._onTitleInput}
          @keydown=${this._onTitleKeydown}
        ></textarea>
        <home-assistant-notes-tiptap-editor
          .content=${this._displayContent}
          @content-changed=${() => this._scheduleSave()}
        ></home-assistant-notes-tiptap-editor>
      </div>
      <home-assistant-notes-toolbar
        .pinned=${this.note.pinned}
        .color=${this.note.color}
        @toolbar-action=${this._onToolbarAction}
        @color-select=${this._onColorSelect}
        @pin-toggle=${this._onPinToggle}
        @link-open-requested=${this._onLinkOpenRequested}
      ></home-assistant-notes-toolbar>
    ` : E`<div class="empty">Select a note or create one</div>`;
  }
};
z.styles = Q`
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
U([
  N({ attribute: !1 })
], z.prototype, "note", 2);
U([
  L()
], z.prototype, "_pendingDelete", 2);
U([
  L()
], z.prototype, "_justSaved", 2);
U([
  qt("home-assistant-notes-tiptap-editor")
], z.prototype, "_tiptap", 2);
U([
  qt(".title-input")
], z.prototype, "_titleInput", 2);
U([
  L()
], z.prototype, "_displayContent", 2);
z = U([
  tt("home-assistant-notes-editor")
], z);
var Ai = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, V = (r, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ii(t, e) : t, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (n ? o(t, e, i) : o(i)) || i);
  return n && i && Ai(t, e, i), i;
};
function Ri(r) {
  return [...r].sort((t, e) => t.pinned !== e.pinned ? t.pinned ? -1 : 1 : new Date(e.modified).getTime() - new Date(t.modified).getTime());
}
let D = class extends Z {
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
  _enterEditor(r) {
    this._selectedId = r, this.narrow && this._view !== "editor" && (history.pushState({ homeAssistantNotesEditor: !0 }, "", location.href), this._pushedEditorState = !0), this._view = "editor";
  }
  _leaveEditor() {
    this._pushedEditorState ? (this._pushedEditorState = !1, this._view = "list", history.back()) : this._view = "list";
  }
  updated(r) {
    r.has("hass") && this.hass && !this._unsubscribe && this._init(), r.has("_view") && this.setAttribute("data-view", this._view);
  }
  async _init() {
    await this._loadNotes(), this._unsubscribe = await hn(this.hass, () => this._loadNotes());
  }
  async _loadNotes() {
    this._notes = Ri(await cn(this.hass));
  }
  get _selectedNote() {
    return this._notes.find((r) => r.note_id === this._selectedId) ?? null;
  }
  async _onNoteNew() {
    if (!this._creatingNote) {
      this._creatingNote = !0;
      try {
        const r = await pn(this.hass, { title: "New Note", content: "", color: un, pinned: !1 });
        await this._loadNotes(), r && this._enterEditor(r);
      } finally {
        this._creatingNote = !1;
      }
    }
  }
  _onNoteSelect(r) {
    this._enterEditor(r.detail.noteId);
  }
  _onSearchChanged(r) {
    this._searchTerm = r.detail.value;
  }
  async _onNoteSave(r) {
    await dn(this.hass, r.detail), await this._loadNotes();
  }
  async _onNoteDelete(r) {
    await fn(this.hass, r.detail.noteId), this._selectedId = null, this._leaveEditor(), await this._loadNotes();
  }
  _onEditorBack() {
    this._leaveEditor();
  }
  render() {
    return E`
      <div class="layout">
        <div class="list-pane">
          <home-assistant-notes-list
            .notes=${this._notes}
            .selectedNoteId=${this._selectedId}
            .searchTerm=${this._searchTerm}
            @note-select=${this._onNoteSelect}
            @note-new=${this._onNoteNew}
            @search-changed=${this._onSearchChanged}
          ></home-assistant-notes-list>
        </div>
        <div class="editor-pane">
          <home-assistant-notes-editor
            .note=${this._selectedNote}
            @editor-back=${this._onEditorBack}
            @note-save=${this._onNoteSave}
            @note-delete=${this._onNoteDelete}
          ></home-assistant-notes-editor>
        </div>
      </div>
    `;
  }
};
D.styles = Q`
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
V([
  N({ attribute: !1 })
], D.prototype, "hass", 2);
V([
  N({ type: Boolean })
], D.prototype, "narrow", 2);
V([
  L()
], D.prototype, "_notes", 2);
V([
  L()
], D.prototype, "_selectedId", 2);
V([
  L()
], D.prototype, "_searchTerm", 2);
V([
  L()
], D.prototype, "_view", 2);
D = V([
  tt("home-assistant-notes-panel")
], D);
export {
  R as A,
  Pe as D,
  st as E,
  f as F,
  D as H,
  Et as M,
  _ as N,
  qi as P,
  k as R,
  g as S,
  M as T,
  Hi as a,
  x as b,
  Bi as c,
  Wi as d,
  Fi as e,
  $i as f,
  A as g,
  In as h,
  Li as i,
  Ji as j,
  w as k,
  Pi as l,
  ki as m,
  Di as n,
  W as o,
  I as p,
  fi as r
};
