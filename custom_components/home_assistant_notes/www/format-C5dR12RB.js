const M = globalThis, R = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = /* @__PURE__ */ Symbol(), B = /* @__PURE__ */ new WeakMap();
let Y = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (R && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = B.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && B.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const nt = (i) => new Y(typeof i == "string" ? i : i + "", void 0, V), xt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, n, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + i[r + 1], i[0]);
  return new Y(e, i, V);
}, rt = (i, t) => {
  if (R) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = M.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, i.appendChild(s);
  }
}, I = R ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return nt(e);
})(i) : i;
const { is: ot, defineProperty: at, getOwnPropertyDescriptor: ht, getOwnPropertyNames: lt, getOwnPropertySymbols: ct, getPrototypeOf: dt } = Object, x = globalThis, q = x.trustedTypes, ut = q ? q.emptyScript : "", pt = x.reactiveElementPolyfillSupport, b = (i, t) => i, U = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? ut : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, D = (i, t) => !ot(i, t), W = { attribute: !0, type: String, converter: U, reflect: !1, useDefault: !1, hasChanged: D };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), x.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let g = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && at(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: r } = ht(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const h = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? W;
  }
  static _$Ei() {
    if (this.hasOwnProperty(b("elementProperties"))) return;
    const t = dt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(b("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(b("properties"))) {
      const e = this.properties, s = [...lt(e), ...ct(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(I(n));
    } else t !== void 0 && e.push(I(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return rt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : U).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = s.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : U;
      this._$Em = n;
      const h = o.fromAttribute(e, r.type);
      this[n] = h ?? this._$Ej?.get(n) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? D)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, r] of s) {
        const { wrapped: o } = r, h = this[n];
        o !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, r, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[b("elementProperties")] = /* @__PURE__ */ new Map(), g[b("finalized")] = /* @__PURE__ */ new Map(), pt?.({ ReactiveElement: g }), (x.reactiveElementVersions ??= []).push("2.1.2");
const k = globalThis, Z = (i) => i, N = k.trustedTypes, F = N ? N.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, tt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, et = "?" + _, $t = `<${et}>`, A = document, S = () => A.createComment(""), w = (i) => i === null || typeof i != "object" && typeof i != "function", j = Array.isArray, _t = (i) => j(i) || typeof i?.[Symbol.iterator] == "function", L = `[ 	
\f\r]`, E = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, J = /-->/g, K = />/g, f = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), G = /'/g, Q = /"/g, st = /^(?:script|style|textarea|title)$/i, ft = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), Lt = ft(1), y = /* @__PURE__ */ Symbol.for("lit-noChange"), d = /* @__PURE__ */ Symbol.for("lit-nothing"), X = /* @__PURE__ */ new WeakMap(), m = A.createTreeWalker(A, 129);
function it(i, t) {
  if (!j(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return F !== void 0 ? F.createHTML(t) : t;
}
const mt = (i, t) => {
  const e = i.length - 1, s = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = E;
  for (let h = 0; h < e; h++) {
    const a = i[h];
    let c, u, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === E ? u[1] === "!--" ? o = J : u[1] !== void 0 ? o = K : u[2] !== void 0 ? (st.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = f) : u[3] !== void 0 && (o = f) : o === f ? u[0] === ">" ? (o = n ?? E, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? f : u[3] === '"' ? Q : G) : o === Q || o === G ? o = f : o === J || o === K ? o = E : (o = f, n = void 0);
    const $ = o === f && i[h + 1].startsWith("/>") ? " " : "";
    r += o === E ? a + $t : l >= 0 ? (s.push(c), a.slice(0, l) + tt + a.slice(l) + _ + $) : a + _ + (l === -2 ? h : $);
  }
  return [it(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class C {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = mt(t, e);
    if (this.el = C.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (n = m.nextNode()) !== null && a.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const l of n.getAttributeNames()) if (l.endsWith(tt)) {
          const p = u[o++], $ = n.getAttribute(l).split(_), H = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: H[2], strings: $, ctor: H[1] === "." ? gt : H[1] === "?" ? yt : H[1] === "@" ? vt : T }), n.removeAttribute(l);
        } else l.startsWith(_) && (a.push({ type: 6, index: r }), n.removeAttribute(l));
        if (st.test(n.tagName)) {
          const l = n.textContent.split(_), p = l.length - 1;
          if (p > 0) {
            n.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < p; $++) n.append(l[$], S()), m.nextNode(), a.push({ type: 2, index: ++r });
            n.append(l[p], S());
          }
        }
      } else if (n.nodeType === 8) if (n.data === et) a.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = n.data.indexOf(_, l + 1)) !== -1; ) a.push({ type: 7, index: r }), l += _.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(i, t, e = i, s) {
  if (t === y) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = w(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(i), n._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = v(i, n._$AS(i, t.values), n, s)), t;
}
class At {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? A).importNode(e, !0);
    m.currentNode = n;
    let r = m.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new P(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new Et(r, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== a?.index && (r = m.nextNode(), o++);
    }
    return m.currentNode = A, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class P {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = v(this, t, e), w(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : _t(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && w(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(it(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const r = new At(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = X.get(t.strings);
    return e === void 0 && X.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    j(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const r of t) n === e.length ? e.push(s = new P(this.O(S()), this.O(S()), this, this.options)) : s = e[n], s._$AI(r), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Z(t).nextSibling;
      Z(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class T {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = v(this, t, e, 0), o = !w(t) || t !== this._$AH && t !== y, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = v(this, h[s + a], e, a), c === y && (c = this._$AH[a]), o ||= !w(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gt extends T {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class yt extends T {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class vt extends T {
  constructor(t, e, s, n, r) {
    super(t, e, s, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? d) === y) return;
    const s = this._$AH, n = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || n);
    n && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Et {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const bt = k.litHtmlPolyfillSupport;
bt?.(C, P), (k.litHtmlVersions ??= []).push("3.3.3");
const St = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = n = new P(t.insertBefore(S(), r), r, void 0, e ?? {});
  }
  return n._$AI(i), n;
};
const z = globalThis;
class O extends g {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = St(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return y;
  }
}
O._$litElement$ = !0, O.finalized = !0, z.litElementHydrateSupport?.({ LitElement: O });
const wt = z.litElementPolyfillSupport;
wt?.({ LitElement: O });
(z.litElementVersions ??= []).push("4.2.2");
const Rt = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Ct = { attribute: !0, type: String, converter: U, reflect: !1, hasChanged: D }, Pt = (i = Ct, t, e) => {
  const { kind: s, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, i, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, i, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, i, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ht(i) {
  return (t, e) => typeof e == "object" ? Pt(i, t, e) : ((s, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(i, t, e);
}
function Vt(i) {
  return Ht({ ...i, state: !0, attribute: !1 });
}
var Dt = "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z", kt = "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z", jt = "M3,6V22H21V24H3A2,2 0 0,1 1,22V6H3M16,9H21.5L16,3.5V9M7,2H17L23,8V18A2,2 0 0,1 21,20H7C5.89,20 5,19.1 5,18V4A2,2 0 0,1 7,2M7,4V18H21V11H14V4H7Z", zt = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z";
async function Bt(i) {
  return (await i.connection.sendMessagePromise({
    type: "call_service",
    domain: "home_assistant_notes",
    service: "get_notes",
    service_data: {},
    return_response: !0
  })).response?.notes ?? [];
}
async function It(i, t) {
  return (await i.connection.sendMessagePromise({
    type: "call_service",
    domain: "home_assistant_notes",
    service: "create_note",
    service_data: t,
    return_response: !0
  })).response?.note_id;
}
async function qt(i, t) {
  await i.callService("home_assistant_notes", "update_note", t);
}
async function Wt(i, t) {
  await i.callService("home_assistant_notes", "delete_note", { note_id: t });
}
function Zt(i, t) {
  const e = ["home_assistant_notes_note_created", "home_assistant_notes_note_updated", "home_assistant_notes_note_deleted"];
  return Promise.all(e.map((s) => i.connection.subscribeEvents(t, s))).then(
    (s) => () => s.forEach((n) => n())
  );
}
const Ft = [
  "#C9B356",
  // muted yellow
  "#E09455",
  // amber
  "#C96060",
  // muted red
  "#C4607A",
  // dusty rose
  "#9068A8",
  // muted purple
  "#5868A0",
  // slate indigo
  "#4A85B8",
  // sky blue
  "#3C9AAA",
  // teal-cyan
  "#3A9080",
  // teal
  "#52A068"
  // sage green
], Mt = "#3A9080";
function Ot(i) {
  return i && /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/.test(i) ? i : Mt;
}
function Ut(i) {
  const t = i.length === 4 ? `#${i[1]}${i[1]}${i[2]}${i[2]}${i[3]}${i[3]}` : i, e = parseInt(t.slice(1), 16);
  return [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function Jt(i) {
  const [t, e, s] = Ut(Ot(i));
  return (0.299 * t + 0.587 * e + 0.114 * s) / 255 > 0.55 ? { title: "rgba(0, 0, 0, 0.87)", muted: "rgba(0, 0, 0, 0.6)" } : { title: "rgba(255, 255, 255, 0.92)", muted: "rgba(255, 255, 255, 0.68)" };
}
function Kt(i) {
  const t = i.replace(/<\/(li|p|div|h[1-6]|tr)>/gi, `</$1>
`).replace(/<br\s*\/?>/gi, `
`);
  return new DOMParser().parseFromString(t, "text/html").body.textContent || "";
}
function Gt(i) {
  const t = new Date(i), e = Date.now() - t.getTime(), s = Math.floor(e / 6e4), n = Math.floor(e / 36e5), r = Math.floor(e / 864e5);
  return s < 1 ? "Just now" : s < 60 ? `${s} min ago` : n < 24 ? `${n} hour${n > 1 ? "s" : ""} ago` : r < 7 ? `${r} day${r > 1 ? "s" : ""} ago` : t.toLocaleDateString();
}
export {
  d as A,
  Mt as D,
  y as E,
  Ft as N,
  O as a,
  Lt as b,
  Ot as c,
  Kt as d,
  jt as e,
  Gt as f,
  Bt as g,
  Jt as h,
  xt as i,
  Dt as j,
  kt as k,
  It as l,
  zt as m,
  Ht as n,
  Wt as o,
  Vt as r,
  Zt as s,
  Rt as t,
  qt as u
};
