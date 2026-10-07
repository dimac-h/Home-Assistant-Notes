import { f as xn, N as C, c as le, l as Ue, e as ke, j as Pt, r as Cn, S as B, b as L, A as Rt, T as E, R as Dn, F as T, g as Ae, h as sn, D as ct, i as je, k as ri, d as oi, P as G, a as ce, E as tr, m as si, n as qr, o as Ur, p as ii } from "./panel-DF9aJwg8.js";
var nr = Object.defineProperty, Tn = (t, e) => {
  let n = {};
  for (var r in t) nr(n, r, {
    get: t[r],
    enumerable: !0
  });
  return nr(n, Symbol.toStringTag, { value: "Module" }), n;
};
const Jr = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Yr(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const Gr = (t, e, n) => {
  let r = Yr(t, n);
  if (!r)
    return !1;
  let o = Nn(r);
  if (!o) {
    let i = r.blockRange(), l = i && Ue(i);
    return l == null ? !1 : (e && e(t.tr.lift(i, l).scrollIntoView()), !0);
  }
  let s = o.nodeBefore;
  if (so(t, o, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Ke(s, "end") || C.isSelectable(s)))
    for (let i = r.depth; ; i--) {
      let l = Cn(t.doc, r.before(i), r.after(i), B.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = t.tr.step(l);
          a.setSelection(Ke(s, "end") ? L.findFrom(a.doc.resolve(a.mapping.map(o.pos, -1)), -1) : C.create(a.doc, o.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (i == 1 || r.node(i - 1).childCount > 1)
        break;
    }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(t.tr.delete(o.pos - s.nodeSize, o.pos).scrollIntoView()), !0) : !1;
}, li = (t, e, n) => {
  let r = Yr(t, n);
  if (!r)
    return !1;
  let o = Nn(r);
  return o ? Xr(t, o, e) : !1;
}, ai = (t, e, n) => {
  let r = Zr(t, n);
  if (!r)
    return !1;
  let o = En(r);
  return o ? Xr(t, o, e) : !1;
};
function Xr(t, e, n) {
  let r = e.nodeBefore, o = r, s = e.pos - 1;
  for (; !o.isTextblock; s--) {
    if (o.type.spec.isolating)
      return !1;
    let c = o.lastChild;
    if (!c)
      return !1;
    o = c;
  }
  let i = e.nodeAfter, l = i, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let c = l.firstChild;
    if (!c)
      return !1;
    l = c;
  }
  let d = Cn(t.doc, s, a, B.empty);
  if (!d || d.from != s || d instanceof Dn && d.slice.size >= a - s)
    return !1;
  if (n) {
    let c = t.tr.step(d);
    c.setSelection(E.create(c.doc, s)), n(c.scrollIntoView());
  }
  return !0;
}
function Ke(t, e, n = !1) {
  for (let r = t; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (n && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Qr = (t, e, n) => {
  let { $head: r, empty: o } = t.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    s = Nn(r);
  }
  let i = s && s.nodeBefore;
  return !i || !C.isSelectable(i) ? !1 : (e && e(t.tr.setSelection(C.create(t.doc, s.pos - i.nodeSize)).scrollIntoView()), !0);
};
function Nn(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      if (t.index(e) > 0)
        return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Zr(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const eo = (t, e, n) => {
  let r = Zr(t, n);
  if (!r)
    return !1;
  let o = En(r);
  if (!o)
    return !1;
  let s = o.nodeAfter;
  if (so(t, o, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Ke(s, "start") || C.isSelectable(s))) {
    let i = Cn(t.doc, r.before(), r.after(), B.empty);
    if (i && i.slice.size < i.to - i.from) {
      if (e) {
        let l = t.tr.step(i);
        l.setSelection(Ke(s, "start") ? L.findFrom(l.doc.resolve(l.mapping.map(o.pos)), 1) : C.create(l.doc, l.mapping.map(o.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && o.depth == r.depth - 1 ? (e && e(t.tr.delete(o.pos, o.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, to = (t, e, n) => {
  let { $head: r, empty: o } = t.selection, s = r;
  if (!o)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    s = En(r);
  }
  let i = s && s.nodeAfter;
  return !i || !C.isSelectable(i) ? !1 : (e && e(t.tr.setSelection(C.create(t.doc, s.pos)).scrollIntoView()), !0);
};
function En(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; e >= 0; e--) {
      let n = t.node(e);
      if (t.index(e) + 1 < n.childCount)
        return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating)
        break;
    }
  return null;
}
const ci = (t, e) => {
  let n = t.selection, r = n instanceof C, o;
  if (r) {
    if (n.node.isTextblock || !ke(t.doc, n.from))
      return !1;
    o = n.from;
  } else if (o = Pt(t.doc, n.from, -1), o == null)
    return !1;
  if (e) {
    let s = t.tr.join(o);
    r && s.setSelection(C.create(s.doc, o - t.doc.resolve(o).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, di = (t, e) => {
  let n = t.selection, r;
  if (n instanceof C) {
    if (n.node.isTextblock || !ke(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = Pt(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, ui = (t, e) => {
  let { $from: n, $to: r } = t.selection, o = n.blockRange(r), s = o && Ue(o);
  return s == null ? !1 : (e && e(t.tr.lift(o, s).scrollIntoView()), !0);
}, no = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  return !n.parent.type.spec.code || !n.sameParent(r) ? !1 : (e && e(t.tr.insertText(`
`).scrollIntoView()), !0);
};
function On(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    let { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs())
      return n;
  }
  return null;
}
const fi = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let o = n.node(-1), s = n.indexAfter(-1), i = On(o.contentMatchAt(s));
  if (!i || !o.canReplaceWith(s, s, i))
    return !1;
  if (e) {
    let l = n.after(), a = t.tr.replaceWith(l, l, i.createAndFill());
    a.setSelection(L.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, ro = (t, e) => {
  let n = t.selection, { $from: r, $to: o } = n;
  if (n instanceof Rt || r.parent.inlineContent || o.parent.inlineContent)
    return !1;
  let s = On(o.parent.contentMatchAt(o.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let i = (!r.parentOffset && o.index() < o.parent.childCount ? r : o).pos, l = t.tr.insert(i, s.createAndFill());
    l.setSelection(E.create(l.doc, i + 1)), e(l.scrollIntoView());
  }
  return !0;
}, oo = (t, e) => {
  let { $cursor: n } = t.selection;
  if (!n || n.parent.content.size)
    return !1;
  if (n.depth > 1 && n.after() != n.end(-1)) {
    let s = n.before();
    if (le(t.doc, s))
      return e && e(t.tr.split(s).scrollIntoView()), !0;
  }
  let r = n.blockRange(), o = r && Ue(r);
  return o == null ? !1 : (e && e(t.tr.lift(r, o).scrollIntoView()), !0);
};
function hi(t) {
  return (e, n) => {
    if (e.selection instanceof C && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !le(e.doc, h.pos) ? !1 : (n && n(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof E || e.selection instanceof Rt) && r.deleteSelection();
    let { $from: o } = r.selection, s = r.steps.length, i = [], l, a, d = !1, c = !1;
    for (let h = o.depth; ; h--)
      if (o.node(h).isBlock) {
        d = o.end(h) == o.pos + (o.depth - h), c = o.start(h) == o.pos - (o.depth - h), a = On(o.node(h - 1).contentMatchAt(o.indexAfter(h - 1))), i.unshift(d && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        i.unshift(null);
      }
    let u = o.pos, f = le(r.doc, u, i.length, i);
    if (f || (i[0] = a ? { type: a } : null, f = le(r.doc, u, i.length, i)), !f)
      return !1;
    if (r.split(u, i.length, i), !d && c && o.node(l).type != a) {
      let h = r.mapping.slice(s), p = h.map(o.before(l)), m = r.doc.resolve(p);
      a && o.node(l - 1).canReplaceWith(m.index(), m.index() + 1, a) && r.setNodeMarkup(h.map(o.before(l)), a);
    }
    return n && n(r.scrollIntoView()), !0;
  };
}
const pi = hi(), mi = (t, e) => {
  let { $from: n, to: r } = t.selection, o, s = n.sharedDepth(r);
  return s == 0 ? !1 : (o = n.before(s), e && e(t.tr.setSelection(C.create(t.doc, o))), !0);
};
function gi(t, e, n) {
  let r = e.nodeBefore, o = e.nodeAfter, s = e.index();
  return !r || !o || !r.type.compatibleContent(o.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(o.isTextblock || ke(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function so(t, e, n, r) {
  let o = e.nodeBefore, s = e.nodeAfter, i, l, a = o.type.spec.isolating || s.type.spec.isolating;
  if (!a && gi(t, e, n))
    return !0;
  let d = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (d && (i = (l = o.contentMatchAt(o.childCount)).findWrapping(s.type)) && l.matchType(i[0] || s.type).validEnd) {
    if (n) {
      let h = e.pos + s.nodeSize, p = T.empty;
      for (let y = i.length - 1; y >= 0; y--)
        p = T.from(i[y].create(null, p));
      p = T.from(o.copy(p));
      let m = t.tr.step(new Ae(e.pos - 1, h, e.pos, h, new B(p, 1, 0), i.length, !0)), g = m.doc.resolve(h + 2 * i.length);
      g.nodeAfter && g.nodeAfter.type == o.type && ke(m.doc, g.pos) && m.join(g.pos), n(m.scrollIntoView());
    }
    return !0;
  }
  let c = s.type.spec.isolating || r > 0 && a ? null : L.findFrom(e, 1), u = c && c.$from.blockRange(c.$to), f = u && Ue(u);
  if (f != null && f >= e.depth)
    return n && n(t.tr.lift(u, f).scrollIntoView()), !0;
  if (d && Ke(s, "start", !0) && Ke(o, "end")) {
    let h = o, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (n) {
        let y = T.empty;
        for (let b = p.length - 1; b >= 0; b--)
          y = T.from(p[b].copy(y));
        let S = t.tr.step(new Ae(e.pos - p.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new B(y, p.length, 0), 0, !0));
        n(S.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function io(t) {
  return function(e, n) {
    let r = e.selection, o = t < 0 ? r.$from : r.$to, s = o.depth;
    for (; o.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return o.node(s).isTextblock ? (n && n(e.tr.setSelection(E.create(e.doc, t < 0 ? o.start(s) : o.end(s)))), !0) : !1;
  };
}
const yi = io(-1), bi = io(1);
function Si(t, e = null) {
  return function(n, r) {
    let { $from: o, $to: s } = n.selection, i = o.blockRange(s), l = i && xn(i, t, e);
    return l ? (r && r(n.tr.wrap(i, l).scrollIntoView()), !0) : !1;
  };
}
function rr(t, e = null) {
  return function(n, r) {
    let o = !1;
    for (let s = 0; s < n.selection.ranges.length && !o; s++) {
      let { $from: { pos: i }, $to: { pos: l } } = n.selection.ranges[s];
      n.doc.nodesBetween(i, l, (a, d) => {
        if (o)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(t, e)))
          if (a.type == t)
            o = !0;
          else {
            let c = n.doc.resolve(d), u = c.index();
            o = c.parent.canReplaceWith(u, u + 1, t);
          }
      });
    }
    if (!o)
      return !1;
    if (r) {
      let s = n.tr;
      for (let i = 0; i < n.selection.ranges.length; i++) {
        let { $from: { pos: l }, $to: { pos: a } } = n.selection.ranges[i];
        s.setBlockType(l, a, t, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function wn(...t) {
  return function(e, n, r) {
    for (let o = 0; o < t.length; o++)
      if (t[o](e, n, r))
        return !0;
    return !1;
  };
}
wn(Jr, Gr, Qr);
wn(Jr, eo, to);
wn(no, ro, oo, pi);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function ki(t, e = null) {
  return function(n, r) {
    let { $from: o, $to: s } = n.selection, i = o.blockRange(s);
    if (!i)
      return !1;
    let l = r ? n.tr : null;
    return Mi(l, i, t, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Mi(t, e, n, r = null) {
  let o = !1, s = e, i = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = i.resolve(e.start - 2);
    s = new sn(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new sn(e.$from, i.resolve(e.$to.end(e.depth)), e.depth)), o = !0;
  }
  let l = xn(s, n, r, e);
  return l ? (t && xi(t, e, l, o, n), !0) : !1;
}
function xi(t, e, n, r, o) {
  let s = T.empty;
  for (let c = n.length - 1; c >= 0; c--)
    s = T.from(n[c].type.create(n[c].attrs, s));
  t.step(new Ae(e.start - (r ? 2 : 0), e.end, e.start, e.end, new B(s, 0, 0), n.length, !0));
  let i = 0;
  for (let c = 0; c < n.length; c++)
    n[c].type == o && (i = c + 1);
  let l = n.length - i, a = e.start + n.length - (r ? 2 : 0), d = e.parent;
  for (let c = e.startIndex, u = e.endIndex, f = !0; c < u; c++, f = !1)
    !f && le(t.doc, a, l) && (t.split(a, l), a += 2 * l), a += d.child(c).nodeSize;
  return t;
}
function Ci(t) {
  return function(e, n) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (i) => i.childCount > 0 && i.firstChild.type == t);
    return s ? n ? r.node(s.depth - 1).type == t ? Di(e, n, t, s) : Ti(e, n, s) : !0 : !1;
  };
}
function Di(t, e, n, r) {
  let o = t.tr, s = r.end, i = r.$to.end(r.depth);
  s < i && (o.step(new Ae(s - 1, i, s, i, new B(T.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new sn(o.doc.resolve(r.$from.pos), o.doc.resolve(i), r.depth));
  const l = Ue(r);
  if (l == null)
    return !1;
  o.lift(r, l);
  let a = o.doc.resolve(o.mapping.map(s, -1) - 1);
  return ke(o.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && o.join(a.pos), e(o.scrollIntoView()), !0;
}
function Ti(t, e, n) {
  let r = t.tr, o = n.parent;
  for (let h = n.end, p = n.endIndex - 1, m = n.startIndex; p > m; p--)
    h -= o.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(n.start), i = s.nodeAfter;
  if (r.mapping.map(n.end) != n.start + s.nodeAfter.nodeSize)
    return !1;
  let l = n.startIndex == 0, a = n.endIndex == o.childCount, d = s.node(-1), c = s.index(-1);
  if (!d.canReplace(c + (l ? 0 : 1), c + 1, i.content.append(a ? T.empty : T.from(o))))
    return !1;
  let u = s.pos, f = u + i.nodeSize;
  return r.step(new Ae(u - (l ? 1 : 0), f + (a ? 1 : 0), u + 1, f - 1, new B((l ? T.empty : T.from(o.copy(T.empty))).append(a ? T.empty : T.from(o.copy(T.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Ni(t) {
  return function(e, n) {
    let { $from: r, $to: o } = e.selection, s = r.blockRange(o, (d) => d.childCount > 0 && d.firstChild.type == t);
    if (!s)
      return !1;
    let i = s.startIndex;
    if (i == 0)
      return !1;
    let l = s.parent, a = l.child(i - 1);
    if (a.type != t)
      return !1;
    if (n) {
      let d = a.lastChild && a.lastChild.type == l.type, c = T.from(d ? t.create() : null), u = new B(T.from(t.create(null, T.from(l.type.create(null, c)))), d ? 3 : 1, 0), f = s.start, h = s.end;
      n(e.tr.step(new Ae(f - (d ? 3 : 1), h, f, h, u, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const R = function(t) {
  for (var e = 0; ; e++)
    if (t = t.previousSibling, !t)
      return e;
}, We = function(t) {
  let e = t.assignedSlot || t.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let ln = null;
const oe = function(t, e, n) {
  let r = ln || (ln = document.createRange());
  return r.setEnd(t, n ?? t.nodeValue.length), r.setStart(t, e || 0), r;
}, Ei = function() {
  ln = null;
}, Pe = function(t, e, n, r) {
  return n && (or(t, e, n, r, -1) || or(t, e, n, r, 1));
}, Oi = /^(img|br|input|textarea|hr)$/i;
function or(t, e, n, r, o) {
  for (var s; ; ) {
    if (t == n && e == r)
      return !0;
    if (e == (o < 0 ? 0 : U(t))) {
      let i = t.parentNode;
      if (!i || i.nodeType != 1 || dt(t) || Oi.test(t.nodeName) || t.contentEditable == "false")
        return !1;
      e = R(t) + (o < 0 ? 0 : 1), t = i;
    } else if (t.nodeType == 1) {
      let i = t.childNodes[e + (o < 0 ? -1 : 0)];
      if (i.nodeType == 1 && i.contentEditable == "false")
        if (!((s = i.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += o;
        else
          return !1;
      else
        t = i, e = o < 0 ? U(t) : 0;
    } else
      return !1;
  }
}
function U(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function wi(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e)
      return t;
    if (t.nodeType == 1 && e > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e - 1], e = U(t);
    } else if (t.parentNode && !dt(t))
      e = R(t), t = t.parentNode;
    else
      return null;
  }
}
function vi(t, e) {
  for (; ; ) {
    if (t.nodeType == 3 && e < t.nodeValue.length)
      return t;
    if (t.nodeType == 1 && e < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[e], e = 0;
    } else if (t.parentNode && !dt(t))
      e = R(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
function Ai(t, e, n) {
  for (let r = e == 0, o = e == U(t); r || o; ) {
    if (t == n)
      return !0;
    let s = R(t);
    if (t = t.parentNode, !t)
      return !1;
    r = r && s == 0, o = o && s == U(t);
  }
}
function dt(t) {
  let e;
  for (let n = t; n && !(e = n.pmViewDesc); n = n.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == t || e.contentDOM == t);
}
const It = function(t) {
  return t.focusNode && Pe(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset);
};
function De(t, e) {
  let n = document.createEvent("Event");
  return n.initEvent("keydown", !0, !0), n.keyCode = t, n.key = n.code = e, n;
}
function Pi(t) {
  let e = t.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function Ri(t, e, n) {
  if (t.caretPositionFromPoint)
    try {
      let r = t.caretPositionFromPoint(e, n);
      if (r)
        return { node: r.offsetNode, offset: Math.min(U(r.offsetNode), r.offset) };
    } catch {
    }
  if (t.caretRangeFromPoint) {
    let r = t.caretRangeFromPoint(e, n);
    if (r)
      return { node: r.startContainer, offset: Math.min(U(r.startContainer), r.startOffset) };
  }
}
const ee = typeof navigator < "u" ? navigator : null, sr = typeof document < "u" ? document : null, Me = ee && ee.userAgent || "", an = /Edge\/(\d+)/.exec(Me), lo = /MSIE \d/.exec(Me), cn = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Me), K = !!(lo || cn || an), me = lo ? document.documentMode : cn ? +cn[1] : an ? +an[1] : 0, J = !K && /gecko\/(\d+)/i.test(Me);
J && +(/Firefox\/(\d+)/.exec(Me) || [0, 0])[1];
const dn = !K && /Chrome\/(\d+)/.exec(Me), $ = !!dn, ao = dn ? +dn[1] : 0, z = !K && !!ee && /Apple Computer/.test(ee.vendor), _e = z && (/Mobile\/\w+/.test(Me) || !!ee && ee.maxTouchPoints > 2), q = _e || (ee ? /Mac/.test(ee.platform) : !1), co = ee ? /Win/.test(ee.platform) : !1, se = /Android \d/.test(Me), ut = !!sr && "webkitFontSmoothing" in sr.documentElement.style, Ii = ut ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function $i(t) {
  let e = t.defaultView && t.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: t.documentElement.clientWidth,
    top: 0,
    bottom: t.documentElement.clientHeight
  };
}
function re(t, e) {
  return typeof t == "number" ? t : t[e];
}
function Bi(t) {
  let e = t.getBoundingClientRect(), n = e.width / t.offsetWidth || 1, r = e.height / t.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + t.clientWidth * n,
    top: e.top,
    bottom: e.top + t.clientHeight * r
  };
}
function ir(t, e, n) {
  if (!un(e) && e.left == 0)
    return;
  let r = t.someProp("scrollThreshold") || 0, o = t.someProp("scrollMargin") || 5, s = t.dom.ownerDocument;
  for (let i = n || t.dom; i; ) {
    if (i.nodeType != 1) {
      i = We(i);
      continue;
    }
    let l = i, a = l == s.body, d = a ? $i(s) : Bi(l), c = 0, u = 0;
    if (e.top < d.top + re(r, "top") ? u = -(d.top - e.top + re(o, "top")) : e.bottom > d.bottom - re(r, "bottom") && (u = e.bottom - e.top > d.bottom - d.top ? e.top + re(o, "top") - d.top : e.bottom - d.bottom + re(o, "bottom")), e.left < d.left + re(r, "left") ? c = -(d.left - e.left + re(o, "left")) : e.right > d.right - re(r, "right") && (c = e.right - d.right + re(o, "right")), c || u)
      if (a)
        s.defaultView.scrollBy(c, u);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        u && (l.scrollTop += u), c && (l.scrollLeft += c);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(i).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    i = f == "absolute" ? i.offsetParent : We(i);
  }
}
function Vi(t) {
  let e = t.dom.getBoundingClientRect(), n = Math.max(0, e.top), r, o;
  for (let s = (e.left + e.right) / 2, i = n + 1; i < Math.min(innerHeight, e.bottom); i += 5) {
    let l = t.root.elementFromPoint(s, i);
    if (!l || l == t.dom || !t.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= n - 20) {
      r = l, o = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: o, stack: uo(t.dom) };
}
function uo(t) {
  let e = [], n = t.ownerDocument;
  for (let r = t; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), t != n); r = We(r))
    ;
  return e;
}
function zi({ refDOM: t, refTop: e, stack: n }) {
  let r = t ? t.getBoundingClientRect().top : 0;
  fo(n, r == 0 ? 0 : r - e);
}
function fo(t, e) {
  for (let n = 0; n < t.length; n++) {
    let { dom: r, top: o, left: s } = t[n];
    r.scrollTop != o + e && (r.scrollTop = o + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let Be = null;
function Li(t) {
  if (t.setActive)
    return t.setActive();
  if (Be)
    return t.focus(Be);
  let e = uo(t);
  t.focus(Be == null ? {
    get preventScroll() {
      return Be = { preventScroll: !0 }, !0;
    }
  } : void 0), Be || (Be = !1, fo(e, 0));
}
function ho(t, e) {
  let n, r = 2e8, o, s = 0, i = e.top, l = e.top, a, d;
  for (let c = t.firstChild, u = 0; c; c = c.nextSibling, u++) {
    let f;
    if (c.nodeType == 1)
      f = c.getClientRects();
    else if (c.nodeType == 3)
      f = oe(c).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= i && p.bottom >= l) {
        i = Math.max(p.bottom, i), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          n = c, r = m, o = m && n.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, c.nodeType == 1 && m && (s = u + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = c, d = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !n && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = u + 1);
    }
  }
  return !n && a && (n = a, o = d, r = 0), n && n.nodeType == 3 ? Fi(n, o) : !n || r && n.nodeType == 1 ? { node: t, offset: s } : ho(n, o);
}
function Fi(t, e) {
  let n = t.nodeValue.length, r = document.createRange(), o;
  for (let s = 0; s < n; s++) {
    r.setEnd(t, s + 1), r.setStart(t, s);
    let i = fe(r, 1);
    if (i.top != i.bottom && vn(e, i)) {
      o = { node: t, offset: s + (e.left >= (i.left + i.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return r.detach(), o || { node: t, offset: 0 };
}
function vn(t, e) {
  return t.left >= e.left - 1 && t.left <= e.right + 1 && t.top >= e.top - 1 && t.top <= e.bottom + 1;
}
function ji(t, e) {
  let n = t.parentNode;
  return n && /^li$/i.test(n.nodeName) && e.left < t.getBoundingClientRect().left ? n : t;
}
function Hi(t, e, n) {
  let { node: r, offset: o } = ho(e, n), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let i = r.getBoundingClientRect();
    s = i.left != i.right && n.left > (i.left + i.right) / 2 ? 1 : -1;
  }
  return t.docView.posFromDOM(r, o, s);
}
function Ki(t, e, n, r) {
  let o = -1;
  for (let s = e, i = !1; s != t.dom; ) {
    let l = t.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!i && a.left > r.left || a.top > r.top ? o = l.posBefore : (!i && a.right < r.left || a.bottom < r.top) && (o = l.posAfter), i = !0), !l.contentDOM && o < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return o > -1 ? o : t.docView.posFromDOM(e, n, -1);
}
function po(t, e, n) {
  let r = t.childNodes.length;
  if (r && n.top < n.bottom)
    for (let o = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - n.top) / (n.bottom - n.top)) - 2)), s = o; ; ) {
      let i = t.childNodes[s];
      if (i.nodeType == 1) {
        let l = i.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let d = l[a];
          if (vn(e, d))
            return po(i, e, d);
        }
      }
      if ((s = (s + 1) % r) == o)
        break;
    }
  return t;
}
function Wi(t, e) {
  let n = t.dom.ownerDocument, r, o = 0, s = Ri(n, e.left, e.top);
  s && ({ node: r, offset: o } = s);
  let i = (t.root.elementFromPoint ? t.root : n).elementFromPoint(e.left, e.top), l;
  if (!i || !t.dom.contains(i.nodeType != 1 ? i.parentNode : i)) {
    let d = t.dom.getBoundingClientRect();
    if (!vn(e, d) || (i = po(t.dom, e, d), !i))
      return null;
  }
  if (z)
    for (let d = i; r && d; d = We(d))
      d.draggable && (r = void 0);
  if (i = ji(i, e), r) {
    if (J && r.nodeType == 1 && (o = Math.min(o, r.childNodes.length), o < r.childNodes.length)) {
      let c = r.childNodes[o], u;
      c.nodeName == "IMG" && (u = c.getBoundingClientRect()).right <= e.left && u.bottom > e.top && o++;
    }
    let d;
    ut && o && r.nodeType == 1 && (d = r.childNodes[o - 1]).nodeType == 1 && d.contentEditable == "false" && d.getBoundingClientRect().top >= e.top && o--, r == t.dom && o == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = t.state.doc.content.size : (o == 0 || r.nodeType != 1 || r.childNodes[o - 1].nodeName != "BR") && (l = Ki(t, r, o, e));
  }
  l == null && (l = Hi(t, i, e));
  let a = t.docView.nearestDesc(i, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function un(t) {
  return t.top < t.bottom || t.left < t.right;
}
function fe(t, e) {
  let n = t.getClientRects();
  if (n.length) {
    let r = n[e < 0 ? 0 : n.length - 1];
    if (un(r))
      return r;
  }
  return Array.prototype.find.call(n, un) || t.getBoundingClientRect();
}
const _i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function mo(t, e, n) {
  let { node: r, offset: o, atom: s } = t.docView.domFromPos(e, n < 0 ? -1 : 1), i = ut || J;
  if (r.nodeType == 3)
    if (i && (_i.test(r.nodeValue) || (n < 0 ? !o : o == r.nodeValue.length))) {
      let a = fe(oe(r, o, o), n);
      if (J && o && /\s/.test(r.nodeValue[o - 1]) && o < r.nodeValue.length) {
        let d = fe(oe(r, o - 1, o - 1), -1);
        if (d.top == a.top) {
          let c = fe(oe(r, o, o + 1), -1);
          if (c.top != a.top)
            return Ge(c, c.left < d.left);
        }
      }
      return a;
    } else {
      let a = o, d = o, c = n < 0 ? 1 : -1;
      return n < 0 && !o ? (d++, c = -1) : n >= 0 && o == r.nodeValue.length ? (a--, c = 1) : n < 0 ? a-- : d++, Ge(fe(oe(r, a, d), c), c < 0);
    }
  if (!t.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && o && (n < 0 || o == U(r))) {
      let a = r.childNodes[o - 1];
      if (a.nodeType == 1)
        return Gt(a.getBoundingClientRect(), !1);
    }
    if (s == null && o < U(r)) {
      let a = r.childNodes[o];
      if (a.nodeType == 1)
        return Gt(a.getBoundingClientRect(), !0);
    }
    return Gt(r.getBoundingClientRect(), n >= 0);
  }
  if (s == null && o && (n < 0 || o == U(r))) {
    let a = r.childNodes[o - 1], d = a.nodeType == 3 ? oe(a, U(a) - (i ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (d)
      return Ge(fe(d, 1), !1);
  }
  if (s == null && o < U(r)) {
    let a = r.childNodes[o];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let d = a ? a.nodeType == 3 ? oe(a, 0, i ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (d)
      return Ge(fe(d, -1), !0);
  }
  return Ge(fe(r.nodeType == 3 ? oe(r) : r, -n), n >= 0);
}
function Ge(t, e) {
  if (t.width == 0)
    return t;
  let n = e ? t.left : t.right;
  return { top: t.top, bottom: t.bottom, left: n, right: n };
}
function Gt(t, e) {
  if (t.height == 0)
    return t;
  let n = e ? t.top : t.bottom;
  return { top: n, bottom: n, left: t.left, right: t.right };
}
function go(t, e, n) {
  let r = t.state, o = t.root.activeElement;
  r != e && t.updateState(e), o != t.dom && t.focus();
  try {
    return n();
  } finally {
    r != e && t.updateState(r), o != t.dom && o && o.focus();
  }
}
function qi(t, e, n) {
  let r = e.selection, o = n == "up" ? r.$from : r.$to;
  return go(t, e, () => {
    let { node: s } = t.docView.domFromPos(o.pos, n == "up" ? -1 : 1);
    for (; ; ) {
      let l = t.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let i = mo(t, o.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = oe(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let d = 0; d < a.length; d++) {
        let c = a[d];
        if (c.bottom > c.top + 1 && (n == "up" ? i.top - c.top > (c.bottom - i.top) * 2 : c.bottom - i.bottom > (i.bottom - c.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Ui = /[\u0590-\u08ac]/;
function Ji(t, e, n) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let o = r.parentOffset, s = !o, i = o == r.parent.content.size, l = t.domSelection();
  return l ? !Ui.test(r.parent.textContent) || !l.modify ? n == "left" || n == "backward" ? s : i : go(t, e, () => {
    let { focusNode: a, focusOffset: d, anchorNode: c, anchorOffset: u } = t.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", n, "character");
    let h = r.depth ? t.docView.domAfterPos(r.before()) : t.dom, { focusNode: p, focusOffset: m } = t.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && d == m;
    try {
      l.collapse(c, u), a && (a != c || d != u) && l.extend && l.extend(a, d);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let lr = null, ar = null, cr = !1;
function Yi(t, e, n) {
  return lr == e && ar == n ? cr : (lr = e, ar = n, cr = n == "up" || n == "down" ? qi(t, e, n) : Ji(t, e, n));
}
const Y = 0, dr = 1, Ne = 2, X = 3;
class ft {
  constructor(e, n, r, o) {
    this.parent = e, this.children = n, this.dom = r, this.contentDOM = o, this.dirty = Y, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, n, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule(e) {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let n = 0; n < this.children.length; n++)
      e += this.children[n].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let n = 0, r = this.posAtStart; ; n++) {
      let o = this.children[n];
      if (o == e)
        return r;
      r += o.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, n, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[n - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(i) + i.size : this.posAtStart;
      } else {
        let s, i;
        if (e == this.contentDOM)
          s = e.childNodes[n];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((i = s.pmViewDesc) && i.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(i) : this.posAtEnd;
      }
    let o;
    if (e == this.dom && this.contentDOM)
      o = n > R(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      o = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (n == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (o == null && n == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            o = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return o ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, n = !1) {
    for (let r = !0, o = e; o; o = o.parentNode) {
      let s = this.getDesc(o), i;
      if (s && (!n || s.node))
        if (r && (i = s.nodeDOM) && !(i.nodeType == 1 ? i.contains(e.nodeType == 1 ? e : e.parentNode) : i == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let n = e.pmViewDesc;
    for (let r = n; r; r = r.parent)
      if (r == this)
        return n;
  }
  posFromDOM(e, n, r) {
    for (let o = e; o; o = o.parentNode) {
      let s = this.getDesc(o);
      if (s)
        return s.localPosFromDOM(e, n, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let n = 0, r = 0; n < this.children.length; n++) {
      let o = this.children[n], s = r + o.size;
      if (r == e && s != r) {
        for (; !o.border && o.children.length; )
          for (let i = 0; i < o.children.length; i++) {
            let l = o.children[i];
            if (l.size) {
              o = l;
              break;
            }
          }
        return o;
      }
      if (e < s)
        return o.descAt(e - r - o.border);
      r = s;
    }
  }
  domFromPos(e, n) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, o = 0;
    for (let s = 0; r < this.children.length; r++) {
      let i = this.children[r], l = s + i.size;
      if (l > e || i instanceof bo) {
        o = e - s;
        break;
      }
      s = l;
    }
    if (o)
      return this.children[r].domFromPos(o - this.children[r].border, n);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof yo && s.side >= 0; r--)
      ;
    if (n <= 0) {
      let s, i = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, i = !1)
        ;
      return s && n && i && !s.border && !s.domAtom ? s.domFromPos(s.size, n) : { node: this.contentDOM, offset: s ? R(s.dom) + 1 : 0 };
    } else {
      let s, i = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, i = !1)
        ;
      return s && i && !s.border && !s.domAtom ? s.domFromPos(0, n) : { node: this.contentDOM, offset: s ? R(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, n, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: n, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let o = -1, s = -1;
    for (let i = r, l = 0; ; l++) {
      let a = this.children[l], d = i + a.size;
      if (o == -1 && e <= d) {
        let c = i + a.border;
        if (e >= c && n <= d - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, n, c);
        e = i;
        for (let u = l; u > 0; u--) {
          let f = this.children[u - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            o = R(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        o == -1 && (o = 0);
      }
      if (o > -1 && (d > n || l == this.children.length - 1)) {
        n = d;
        for (let c = l + 1; c < this.children.length; c++) {
          let u = this.children[c];
          if (u.size && u.dom.parentNode == this.contentDOM && !u.emptyChildAt(-1)) {
            s = R(u.dom);
            break;
          }
          n += u.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      i = d;
    }
    return { node: this.contentDOM, from: e, to: n, fromOffset: o, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let n = this.children[e < 0 ? 0 : this.children.length - 1];
    return n.size == 0 || n.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: n, offset: r } = this.domFromPos(e, 0);
    if (n.nodeType != 1 || r == n.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return n.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, n, r, o = !1) {
    let s = Math.min(e, n), i = Math.max(e, n);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (s > p && i < g)
        return m.setSelection(e - p - m.border, n - p - m.border, r, o);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = n == e ? l : this.domFromPos(n, n ? -1 : 1), d = r.root.getSelection(), c = r.domSelectionRange(), u = !1;
    if ((J || z) && e == n) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (u = !!(p && h.nodeValue[p - 1] == `
`), u && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: R(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        u = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (J && c.focusNode && c.focusNode != a.node && c.focusNode.nodeType == 1) {
      let h = c.focusNode.childNodes[c.focusOffset];
      h && h.contentEditable == "false" && (o = !0);
    }
    if (!(o || u && z) && Pe(l.node, l.offset, c.anchorNode, c.anchorOffset) && Pe(a.node, a.offset, c.focusNode, c.focusOffset))
      return;
    let f = !1;
    if ((d.extend || e == n) && !(u && J)) {
      d.collapse(l.node, l.offset);
      try {
        e != n && d.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > n) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), d.removeAllRanges(), d.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, n) {
    for (let r = 0, o = 0; o < this.children.length; o++) {
      let s = this.children[o], i = r + s.size;
      if (r == i ? e <= i && n >= r : e < i && n > r) {
        let l = r + s.border, a = i - s.border;
        if (e >= l && n <= a) {
          this.dirty = e == r || n == i ? Ne : dr, e == l && n == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = X : s.markDirty(e - l, n - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? Ne : X;
      }
      r = i;
    }
    this.dirty = Ne;
  }
  markParentsDirty() {
    let e = 1;
    for (let n = this.parent; n; n = n.parent, e++) {
      let r = e == 1 ? Ne : dr;
      n.dirty < r && (n.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class yo extends ft {
  constructor(e, n, r, o) {
    let s, i = n.type.toDOM;
    if (typeof i == "function" && (i = i(r, () => {
      if (!s)
        return o;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !n.type.spec.raw) {
      if (i.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(i), i = l;
      }
      i.contentEditable = "false", i.classList.add("ProseMirror-widget");
    }
    super(e, [], i, null), this.widget = n, this.widget = n, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Y && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let n = this.widget.spec.stopEvent;
    return n ? n(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Gi extends ft {
  constructor(e, n, r, o) {
    super(e, [], n, null), this.textDOM = r, this.text = o;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, n) {
    return e != this.textDOM ? this.posAtStart + (n ? this.size : 0) : this.posAtStart + n;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class ge extends ft {
  constructor(e, n, r, o, s) {
    super(e, [], r, o), this.mark = n, this.spec = s;
  }
  static create(e, n, r, o) {
    let s = o.nodeViews[n.type.name], i = s && s(n, o, r);
    return (!i || !i.dom) && (i = ct.renderSpec(document, n.type.spec.toDOM(n, r), null, n.attrs)), new ge(e, n, i.dom, i.contentDOM || i.dom, i);
  }
  parseRule() {
    return this.dirty & X || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != X && this.mark.eq(e);
  }
  markDirty(e, n) {
    if (super.markDirty(e, n), this.dirty != Y) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Y;
    }
  }
  slice(e, n, r) {
    let o = ge.create(this.parent, this.mark, !0, r), s = this.children, i = this.size;
    n < i && (s = hn(s, n, i, r)), e > 0 && (s = hn(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = o;
    return o.children = s, o;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class ye extends ft {
  constructor(e, n, r, o, s, i, l) {
    super(e, [], s, i), this.node = n, this.outerDeco = r, this.innerDeco = o, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, n, r, o, s, i) {
    let l = s.nodeViews[n.type.name], a, d = l && l(n, s, () => {
      if (!a)
        return i;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, o), c = d && d.dom, u = d && d.contentDOM;
    if (n.isText) {
      if (!c)
        c = document.createTextNode(n.text);
      else if (c.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else c || ({ dom: c, contentDOM: u } = ct.renderSpec(document, n.type.spec.toDOM(n), null, n.attrs));
    !u && !n.isText && c.nodeName != "BR" && (c.hasAttribute("contenteditable") || (c.contentEditable = "false"), n.type.spec.draggable && (c.draggable = !0));
    let f = c;
    return c = Mo(c, r, n), d ? a = new Xi(e, n, r, o, c, u || null, f, d) : n.isText ? new $t(e, n, r, o, c, f) : new ye(e, n, r, o, c, u || null, f);
  }
  parseRule(e) {
    if (this.node.type.spec.reparseInView)
      return null;
    let n = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (n.preserveWhitespace = "full"), !this.contentDOM)
      n.getContent = () => this.node.content;
    else if (!this.contentLost)
      n.contentElement = this.contentDOM;
    else {
      for (let r = this.children.length - 1; r >= 0; r--) {
        let o = this.children[r];
        if (this.dom.contains(o.dom.parentNode)) {
          n.contentElement = o.dom.parentNode;
          break;
        }
      }
      if (!n.contentElement) {
        let r = e && e.find((o) => o.nodeType == 1 && e.indexOf(o.parentNode) < 0 && this.dom.contains(o));
        r ? n.contentElement = r : n.getContent = () => T.empty;
      }
    }
    return n;
  }
  matchesNode(e, n, r) {
    return this.dirty == Y && e.eq(this.node) && Ct(n, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, n) {
    let r = this.node.inlineContent, o = n, s = e.composing ? this.localCompositionInfo(e, n) : null, i = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new Zi(this, i && i.node, e);
    nl(this.node, this.innerDeco, (d, c, u) => {
      d.spec.marks ? a.syncToMarks(d.spec.marks, r, e, c) : d.type.side >= 0 && !u && a.syncToMarks(c == this.node.childCount ? ri.none : this.node.child(c).marks, r, e, c), a.placeWidget(d, e, o);
    }, (d, c, u, f) => {
      a.syncToMarks(d.marks, r, e, f);
      let h;
      a.findNodeMatch(d, c, u, f) || l && e.state.selection.from > o && e.state.selection.to < o + d.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(d, c, u, h, e) || a.updateNextNode(d, c, u, e, f, o) || a.addNode(d, c, u, e, o), o += d.nodeSize;
    }), a.syncToMarks([], r, e, 0), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == Ne) && (i && this.protectLocalComposition(e, i), So(this.contentDOM, this.children, e), _e && rl(this.dom));
  }
  localCompositionInfo(e, n) {
    let { from: r, to: o } = e.state.selection;
    if (!(e.state.selection instanceof E) || r < n || o > n + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let i = s.nodeValue, l = ol(this.node.content, i, r - n, o - n);
      return l < 0 ? null : { node: s, pos: l, text: i };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: n, pos: r, text: o }) {
    if (this.getDesc(n))
      return;
    let s = n;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let i = new Gi(this, s, n, o);
    e.input.compositionNodes.push(i), this.children = hn(this.children, r, r + o.length, e, i);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, n, r, o) {
    return this.dirty == X || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, n, r, o), !0);
  }
  updateInner(e, n, r, o) {
    this.updateOuterDeco(n), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(o, this.posAtStart), this.dirty = Y;
  }
  updateOuterDeco(e) {
    if (Ct(e, this.outerDeco))
      return;
    let n = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = ko(this.dom, this.nodeDOM, fn(this.outerDeco, this.node, n), fn(e, this.node, n)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function ur(t, e, n, r, o) {
  Mo(r, e, t);
  let s = new ye(void 0, t, e, n, r, r, r);
  return s.contentDOM && s.updateChildren(o, 0), s;
}
class $t extends ye {
  constructor(e, n, r, o, s, i) {
    super(e, n, r, o, s, null, i);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, n, r, o) {
    return this.dirty == X || this.dirty != Y && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(n), (this.dirty != Y || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, o.trackWrites == this.nodeDOM && (o.trackWrites = null)), this.node = e, this.dirty = Y, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let n = this.nodeDOM; n; n = n.parentNode)
      if (n == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, n, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(n, this.node.text.length) : super.localPosFromDOM(e, n, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, n, r) {
    let o = this.node.cut(e, n), s = document.createTextNode(o.text);
    return new $t(this.parent, o, this.outerDeco, this.innerDeco, s, s);
  }
  markDirty(e, n) {
    super.markDirty(e, n), this.dom != this.nodeDOM && (e == 0 || n == this.nodeDOM.nodeValue.length) && (this.dirty = X);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class bo extends ft {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Y && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Xi extends ye {
  constructor(e, n, r, o, s, i, l, a) {
    super(e, n, r, o, s, i, l), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, n, r, o) {
    if (this.dirty == X)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, n, r);
      return s && this.updateInner(e, n, r, o), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, n, r, o);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, n, r, o) {
    this.spec.setSelection ? this.spec.setSelection(e, n, r.root) : super.setSelection(e, n, r, o);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function So(t, e, n) {
  let r = t.firstChild, o = !1;
  for (let s = 0; s < e.length; s++) {
    let i = e[s], l = i.dom;
    if (l.parentNode == t) {
      for (; l != r; )
        r = fr(r), o = !0;
      r = r.nextSibling;
    } else
      o = !0, t.insertBefore(l, r);
    if (i instanceof ge) {
      let a = r ? r.previousSibling : t.lastChild;
      So(i.contentDOM, i.children, n), r = a ? a.nextSibling : t.firstChild;
    }
  }
  for (; r; )
    r = fr(r), o = !0;
  o && n.trackWrites == t && (n.trackWrites = null);
}
const et = function(t) {
  t && (this.nodeName = t);
};
et.prototype = /* @__PURE__ */ Object.create(null);
const Ee = [new et()];
function fn(t, e, n) {
  if (t.length == 0)
    return Ee;
  let r = n ? Ee[0] : new et(), o = [r];
  for (let s = 0; s < t.length; s++) {
    let i = t[s].type.attrs;
    if (i) {
      i.nodeName && o.push(r = new et(i.nodeName));
      for (let l in i) {
        let a = i[l];
        a != null && (n && o.length == 1 && o.push(r = new et(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return o;
}
function ko(t, e, n, r) {
  if (n == Ee && r == Ee)
    return e;
  let o = e;
  for (let s = 0; s < r.length; s++) {
    let i = r[s], l = n[s];
    if (s) {
      let a;
      l && l.nodeName == i.nodeName && o != t && (a = o.parentNode) && a.nodeName.toLowerCase() == i.nodeName || (a = document.createElement(i.nodeName), a.pmIsDeco = !0, a.appendChild(o), l = Ee[0]), o = a;
    }
    Qi(o, l || Ee[0], i);
  }
  return o;
}
function Qi(t, e, n) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in n) && t.removeAttribute(r);
  for (let r in n)
    r != "class" && r != "style" && r != "nodeName" && n[r] != e[r] && t.setAttribute(r, n[r]);
  if (e.class != n.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], o = n.class ? n.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      o.indexOf(r[s]) == -1 && t.classList.remove(r[s]);
    for (let s = 0; s < o.length; s++)
      r.indexOf(o[s]) == -1 && t.classList.add(o[s]);
    t.classList.length == 0 && t.removeAttribute("class");
  }
  if (e.style != n.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, o;
      for (; o = r.exec(e.style); )
        t.style.removeProperty(o[1]);
    }
    n.style && (t.style.cssText += n.style);
  }
}
function Mo(t, e, n) {
  return ko(t, t, Ee, fn(e, n, t.nodeType != 1));
}
function Ct(t, e) {
  if (t.length != e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (!t[n].type.eq(e[n].type))
      return !1;
  return !0;
}
function fr(t) {
  let e = t.nextSibling;
  return t.parentNode.removeChild(t), e;
}
class Zi {
  constructor(e, n, r) {
    this.lock = n, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = el(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, n) {
    if (e != n) {
      for (let r = e; r < n; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, n - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, n, r, o) {
    let s = 0, i = this.stack.length >> 1, l = Math.min(i, e.length);
    for (; s < l && (s == i - 1 ? this.top : this.stack[s + 1 << 1]).matchesMark(e[s]) && e[s].type.spec.spanning !== !1; )
      s++;
    for (; s < i; )
      this.destroyRest(), this.top.dirty = Y, this.index = this.stack.pop(), this.top = this.stack.pop(), i--;
    for (; i < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1, d = this.top.children.length;
      o < this.preMatch.index && (d = Math.min(this.index + 3, d));
      for (let c = this.index; c < d; c++) {
        let u = this.top.children[c];
        if (u.matchesMark(e[i]) && !this.isLocked(u.dom)) {
          a = c;
          break;
        }
      }
      if (a < 0 && this.index < this.top.children.length) {
        let c = this.top.children[this.index];
        c instanceof ge && c.dirty != X && c.mark.type == e[i].type && c.spec.update && !this.isLocked(c.dom) && c.spec.update(e[i]) && (c.mark = e[i], a = this.index, this.changed = !0);
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let c = ge.create(this.top, e[i], n, r);
        this.top.children.splice(this.index, 0, c), this.top = c, this.changed = !0;
      }
      this.index = 0, i++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, n, r, o) {
    let s = -1, i;
    if (o >= this.preMatch.index && (i = this.preMatch.matches[o - this.preMatch.index]).parent == this.top && i.matchesNode(e, n, r))
      s = this.top.children.indexOf(i, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let d = this.top.children[l];
        if (d.matchesNode(e, n, r) && !this.preMatch.matched.has(d)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, n, r, o, s) {
    let i = this.top.children[o];
    return i.dirty == X && i.dom == i.contentDOM && (i.dirty = Ne), i.update(e, n, r, s) ? (this.destroyBetween(this.index, o), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let n = e.parentNode;
      if (!n)
        return -1;
      if (n == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let o = this.index; o < this.top.children.length; o++)
            if (this.top.children[o] == r)
              return o;
        }
        return -1;
      }
      e = n;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, n, r, o, s, i) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof ye) {
        let d = this.preMatch.matched.get(a);
        if (d != null && d != s)
          return !1;
        let c = a.dom, u, f = this.isLocked(c) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != X && Ct(n, a.outerDeco));
        if (!f && a.update(e, n, r, o))
          return this.destroyBetween(this.index, l), a.dom != c && (this.changed = !0), this.index++, !0;
        if (!f && (u = this.recreateWrapper(a, e, n, r, o, i)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = u, u.contentDOM && (u.dirty = Ne, u.updateChildren(o, i + 1), u.dirty = Y), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, n, r, o, s, i) {
    if (e.dirty || n.isAtom || !e.children.length || !e.node.content.eq(n.content) || !Ct(r, e.outerDeco) || !o.eq(e.innerDeco))
      return null;
    let l = ye.create(this.top, n, r, o, s, i);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, n, r, o, s) {
    let i = ye.create(this.top, e, n, r, o, s);
    i.contentDOM && i.updateChildren(o, s + 1), this.top.children.splice(this.index++, 0, i), this.changed = !0;
  }
  placeWidget(e, n, r) {
    let o = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (o && o.matchesWidget(e) && (e == o.widget || !o.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new yo(this.top, e, n, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], n = this.top;
    for (; e instanceof ge; )
      n = e, e = n.children[n.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof $t) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((z || $) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", n), this.addHackNode("BR", this.top));
  }
  addHackNode(e, n) {
    if (n == this.top && this.index < n.children.length && n.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let o = new bo(this.top, [], r, null);
      n != this.top ? n.children.push(o) : n.children.splice(this.index++, 0, o), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function el(t, e) {
  let n = e, r = n.children.length, o = t.childCount, s = /* @__PURE__ */ new Map(), i = [];
  e: for (; o > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let d = n.children[r - 1];
        if (d instanceof ge)
          n = d, r = d.children.length;
        else {
          l = d, r--;
          break;
        }
      } else {
        if (n == e)
          break e;
        r = n.parent.children.indexOf(n), n = n.parent;
      }
    let a = l.node;
    if (a) {
      if (a != t.child(o - 1))
        break;
      --o, s.set(l, o), i.push(l);
    }
  }
  return { index: o, matched: s, matches: i.reverse() };
}
function tl(t, e) {
  return t.type.side - e.type.side;
}
function nl(t, e, n, r) {
  let o = e.locals(t), s = 0;
  if (o.length == 0) {
    for (let d = 0; d < t.childCount; d++) {
      let c = t.child(d);
      r(c, o, e.forChild(s, c), d), s += c.nodeSize;
    }
    return;
  }
  let i = 0, l = [], a = null;
  for (let d = 0; ; ) {
    let c, u;
    for (; i < o.length && o[i].to == s; ) {
      let g = o[i++];
      g.widget && (c ? (u || (u = [c])).push(g) : c = g);
    }
    if (c)
      if (u) {
        u.sort(tl);
        for (let g = 0; g < u.length; g++)
          n(u[g], d, !!a);
      } else
        n(c, d, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (d < t.childCount)
      h = d, f = t.child(d++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; i < o.length && o[i].from <= s && o[i].to > s; )
      l.push(o[i++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let g = p;
      i < o.length && o[i].from < g && (g = o[i].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < p && (a = f.cut(g - s), f = f.cut(0, g - s), p = g, h = -1);
    } else
      for (; i < o.length && o[i].to < p; )
        i++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function rl(t) {
  if (t.nodeName == "UL" || t.nodeName == "OL") {
    let e = t.style.cssText;
    t.style.cssText = e + "; list-style: square !important", window.getComputedStyle(t).listStyle, t.style.cssText = e;
  }
}
function ol(t, e, n, r) {
  for (let o = 0, s = 0; o < t.childCount && s <= r; ) {
    let i = t.child(o++), l = s;
    if (s += i.nodeSize, !i.isText)
      continue;
    let a = i.text;
    for (; o < t.childCount; ) {
      let d = t.child(o++);
      if (s += d.nodeSize, !d.isText)
        break;
      a += d.text;
    }
    if (s >= n) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let d = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (d >= 0 && d + e.length + l >= n)
        return l + d;
      if (n == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function hn(t, e, n, r, o) {
  let s = [];
  for (let i = 0, l = 0; i < t.length; i++) {
    let a = t[i], d = l, c = l += a.size;
    d >= n || c <= e ? s.push(a) : (d < e && s.push(a.slice(0, e - d, r)), o && (s.push(o), o = void 0), c > n && s.push(a.slice(n - d, a.size, r)));
  }
  return s;
}
function An(t, e = null) {
  let n = t.domSelectionRange(), r = t.state.doc;
  if (!n.focusNode)
    return null;
  let o = t.docView.nearestDesc(n.focusNode), s = o && o.size == 0, i = t.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (i < 0)
    return null;
  let l = r.resolve(i), a, d;
  if (It(n)) {
    for (a = i; o && !o.node; )
      o = o.parent;
    let u = o.node;
    if (o && u.isAtom && C.isSelectable(u) && o.parent && !(u.isInline && Ai(n.focusNode, n.focusOffset, o.dom))) {
      let f = o.posBefore;
      d = new C(i == f ? l : r.resolve(f));
    }
  } else {
    if (n instanceof t.dom.ownerDocument.defaultView.Selection && n.rangeCount > 1) {
      let u = i, f = i;
      for (let h = 0; h < n.rangeCount; h++) {
        let p = n.getRangeAt(h);
        u = Math.min(u, t.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, t.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (u < 0)
        return null;
      [a, i] = f == t.state.selection.anchor ? [f, u] : [u, f], l = r.resolve(i);
    } else
      a = t.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let c = r.resolve(a);
  if (!d) {
    let u = e == "pointer" || t.state.selection.head < l.pos && !s ? 1 : -1;
    d = Pn(t, c, l, u);
  }
  return d;
}
function xo(t) {
  return t.editable ? t.hasFocus() : Do(t) && document.activeElement && document.activeElement.contains(t.dom);
}
function ae(t, e = !1) {
  let n = t.state.selection;
  if (Co(t, n), !xo(t))
    return;
  let r = t.input.mouseDown;
  if (!e && $ && r) {
    let o = t.domSelectionRange(), s = t.domObserver.currentSelection;
    if (o.anchorNode && s.anchorNode && Pe(o.anchorNode, o.anchorOffset, s.anchorNode, s.anchorOffset) && r.delaySelUpdate()) {
      t.domObserver.setCurSelection();
      return;
    }
  }
  if (t.domObserver.disconnectSelection(), t.cursorWrapper)
    il(t);
  else {
    let { anchor: o, head: s } = n, i, l;
    hr && !(n instanceof E) && (n.$from.parent.inlineContent || (i = pr(t, n.from)), !n.empty && !n.$from.parent.inlineContent && (l = pr(t, n.to))), t.docView.setSelection(o, s, t, e), hr && (i && mr(i), l && mr(l)), n.visible ? t.dom.classList.remove("ProseMirror-hideselection") : (t.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && sl(t));
  }
  t.domObserver.setCurSelection(), t.domObserver.connectSelection();
}
const hr = z || $ && ao < 63;
function pr(t, e) {
  let { node: n, offset: r } = t.docView.domFromPos(e, 0), o = r < n.childNodes.length ? n.childNodes[r] : null, s = r ? n.childNodes[r - 1] : null;
  if (z && o && o.contentEditable == "false")
    return Xt(o);
  if ((!o || o.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (o)
      return Xt(o);
    if (s)
      return Xt(s);
  }
}
function Xt(t) {
  return t.contentEditable = "true", z && t.draggable && (t.draggable = !1, t.wasDraggable = !0), t;
}
function mr(t) {
  t.contentEditable = "false", t.wasDraggable && (t.draggable = !0, t.wasDraggable = null);
}
function sl(t) {
  let e = t.dom.ownerDocument;
  e.removeEventListener("selectionchange", t.input.hideSelectionGuard);
  let n = t.domSelectionRange(), r = n.anchorNode, o = n.anchorOffset;
  e.addEventListener("selectionchange", t.input.hideSelectionGuard = () => {
    (n.anchorNode != r || n.anchorOffset != o) && (e.removeEventListener("selectionchange", t.input.hideSelectionGuard), setTimeout(() => {
      (!xo(t) || t.state.selection.visible) && t.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function il(t) {
  let e = t.domSelection();
  if (!e)
    return;
  let n = t.cursorWrapper.dom, r = n.nodeName == "IMG";
  r ? e.collapse(n.parentNode, R(n) + 1) : e.collapse(n, 0), !r && !t.state.selection.visible && K && me <= 11 && (n.disabled = !0, n.disabled = !1);
}
function Co(t, e) {
  if (e instanceof C) {
    let n = t.docView.descAt(e.from);
    n != t.lastSelectedViewDesc && (gr(t), n && n.selectNode(), t.lastSelectedViewDesc = n);
  } else
    gr(t);
}
function gr(t) {
  t.lastSelectedViewDesc && (t.lastSelectedViewDesc.parent && t.lastSelectedViewDesc.deselectNode(), t.lastSelectedViewDesc = void 0);
}
function Pn(t, e, n, r) {
  return t.someProp("createSelectionBetween", (o) => o(t, e, n)) || E.between(e, n, r);
}
function yr(t) {
  return t.editable && !t.hasFocus() ? !1 : Do(t);
}
function Do(t) {
  let e = t.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return t.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (t.editable || t.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function ll(t) {
  let e = t.docView.domFromPos(t.state.selection.anchor, 0), n = t.domSelectionRange();
  return Pe(e.node, e.offset, n.anchorNode, n.anchorOffset);
}
function pn(t, e) {
  let { $anchor: n, $head: r } = t.selection, o = e > 0 ? n.max(r) : n.min(r), s = o.parent.inlineContent ? o.depth ? t.doc.resolve(e > 0 ? o.after() : o.before()) : null : o;
  return s && L.findFrom(s, e);
}
function he(t, e) {
  return t.dispatch(t.state.tr.setSelection(e).scrollIntoView()), !0;
}
function br(t, e, n) {
  let r = t.state.selection;
  if (r instanceof E)
    if (n.indexOf("s") > -1) {
      let { $head: o } = r, s = o.textOffset ? null : e < 0 ? o.nodeBefore : o.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let i = t.state.doc.resolve(o.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return he(t, new E(r.$anchor, i));
    } else if (r.empty) {
      if (t.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let o = pn(t.state, e);
        return o && o instanceof C ? he(t, o) : !1;
      } else if (!(q && n.indexOf("m") > -1)) {
        let o = r.$head, s = o.textOffset ? null : e < 0 ? o.nodeBefore : o.nodeAfter, i;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? o.pos - s.nodeSize : o.pos;
        return s.isAtom || (i = t.docView.descAt(l)) && !i.contentDOM ? C.isSelectable(s) ? he(t, new C(e < 0 ? t.state.doc.resolve(o.pos - s.nodeSize) : o)) : ut ? he(t, new E(t.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof C && r.node.isInline)
      return he(t, new E(e > 0 ? r.$to : r.$from));
    {
      let o = pn(t.state, e);
      return o ? he(t, o) : !1;
    }
  }
}
function Dt(t) {
  return t.nodeType == 3 ? t.nodeValue.length : t.childNodes.length;
}
function tt(t, e) {
  let n = t.pmViewDesc;
  return n && n.size == 0 && (e < 0 || t.nextSibling || t.nodeName != "BR");
}
function Ve(t, e) {
  return e < 0 ? al(t) : cl(t);
}
function al(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let o, s, i = !1;
  for (J && n.nodeType == 1 && r < Dt(n) && tt(n.childNodes[r], -1) && (i = !0); ; )
    if (r > 0) {
      if (n.nodeType != 1)
        break;
      {
        let l = n.childNodes[r - 1];
        if (tt(l, -1))
          o = n, s = --r;
        else if (l.nodeType == 3)
          n = l, r = n.nodeValue.length;
        else
          break;
      }
    } else {
      if (To(n))
        break;
      {
        let l = n.previousSibling;
        for (; l && tt(l, -1); )
          o = n.parentNode, s = R(l), l = l.previousSibling;
        if (l)
          n = l, r = Dt(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = 0;
        }
      }
    }
  i ? mn(t, n, r) : o && mn(t, o, s);
}
function cl(t) {
  let e = t.domSelectionRange(), n = e.focusNode, r = e.focusOffset;
  if (!n)
    return;
  let o = Dt(n), s, i;
  for (; ; )
    if (r < o) {
      if (n.nodeType != 1)
        break;
      let l = n.childNodes[r];
      if (tt(l, 1))
        s = n, i = ++r;
      else
        break;
    } else {
      if (To(n))
        break;
      {
        let l = n.nextSibling;
        for (; l && tt(l, 1); )
          s = l.parentNode, i = R(l) + 1, l = l.nextSibling;
        if (l)
          n = l, r = 0, o = Dt(n);
        else {
          if (n = n.parentNode, n == t.dom)
            break;
          r = o = 0;
        }
      }
    }
  s && mn(t, s, i);
}
function To(t) {
  let e = t.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function dl(t, e) {
  for (; t && e == t.childNodes.length && !dt(t); )
    e = R(t) + 1, t = t.parentNode;
  for (; t && e < t.childNodes.length; ) {
    let n = t.childNodes[e];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = 0;
  }
}
function ul(t, e) {
  for (; t && !e && !dt(t); )
    e = R(t), t = t.parentNode;
  for (; t && e; ) {
    let n = t.childNodes[e - 1];
    if (n.nodeType == 3)
      return n;
    if (n.nodeType == 1 && n.contentEditable == "false")
      break;
    t = n, e = t.childNodes.length;
  }
}
function mn(t, e, n) {
  if (e.nodeType != 3) {
    let s, i;
    (i = dl(e, n)) ? (e = i, n = 0) : (s = ul(e, n)) && (e = s, n = s.nodeValue.length);
  }
  let r = t.domSelection();
  if (!r)
    return;
  if (It(r)) {
    let s = document.createRange();
    s.setEnd(e, n), s.setStart(e, n), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, n);
  t.domObserver.setCurSelection();
  let { state: o } = t;
  setTimeout(() => {
    t.state == o && ae(t);
  }, 50);
}
function Sr(t, e) {
  let n = t.state.doc.resolve(e);
  if (!($ || co) && n.parent.inlineContent) {
    let o = t.coordsAtPos(e);
    if (e > n.start()) {
      let s = t.coordsAtPos(e - 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left < o.left ? "ltr" : "rtl";
    }
    if (e < n.end()) {
      let s = t.coordsAtPos(e + 1), i = (s.top + s.bottom) / 2;
      if (i > o.top && i < o.bottom && Math.abs(s.left - o.left) > 1)
        return s.left > o.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(t.dom).direction == "rtl" ? "rtl" : "ltr";
}
function kr(t, e, n) {
  let r = t.state.selection;
  if (r instanceof E && !r.empty || n.indexOf("s") > -1 || q && n.indexOf("m") > -1)
    return !1;
  let { $from: o, $to: s } = r;
  if (!o.parent.inlineContent || t.endOfTextblock(e < 0 ? "up" : "down")) {
    let i = pn(t.state, e);
    if (i && i instanceof C)
      return he(t, i);
  }
  if (!o.parent.inlineContent) {
    let i = e < 0 ? o : s, l = r instanceof Rt ? L.near(i, e) : L.findFrom(i, e);
    return l ? he(t, l) : !1;
  }
  return !1;
}
function Mr(t, e) {
  if (!(t.state.selection instanceof E))
    return !0;
  let { $head: n, $anchor: r, empty: o } = t.state.selection;
  if (!n.sameParent(r))
    return !0;
  if (!o)
    return !1;
  if (t.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !n.textOffset && (e < 0 ? n.nodeBefore : n.nodeAfter);
  if (s && !s.isText) {
    let i = t.state.tr;
    return e < 0 ? i.delete(n.pos - s.nodeSize, n.pos) : i.delete(n.pos, n.pos + s.nodeSize), t.dispatch(i), !0;
  }
  return !1;
}
function xr(t, e, n) {
  t.domObserver.stop(), e.contentEditable = n, t.domObserver.start();
}
function fl(t) {
  if (!z || t.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: n } = t.domSelectionRange();
  if (e && e.nodeType == 1 && n == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    xr(t, r, "true"), setTimeout(() => xr(t, r, "false"), 20);
  }
  return !1;
}
function hl(t) {
  let e = "";
  return t.ctrlKey && (e += "c"), t.metaKey && (e += "m"), t.altKey && (e += "a"), t.shiftKey && (e += "s"), e;
}
function pl(t, e) {
  let n = e.keyCode, r = hl(e);
  if (n == 8 || q && n == 72 && r == "c")
    return Mr(t, -1) || Ve(t, -1);
  if (n == 46 && !e.shiftKey || q && n == 68 && r == "c")
    return Mr(t, 1) || Ve(t, 1);
  if (n == 13 || n == 27)
    return !0;
  if (n == 37 || q && n == 66 && r == "c") {
    let o = n == 37 ? Sr(t, t.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return br(t, o, r) || Ve(t, o);
  } else if (n == 39 || q && n == 70 && r == "c") {
    let o = n == 39 ? Sr(t, t.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return br(t, o, r) || Ve(t, o);
  } else {
    if (n == 38 || q && n == 80 && r == "c")
      return kr(t, -1, r) || Ve(t, -1);
    if (n == 40 || q && n == 78 && r == "c")
      return fl(t) || kr(t, 1, r) || Ve(t, 1);
    if (r == (q ? "m" : "c") && (n == 66 || n == 73 || n == 89 || n == 90))
      return !0;
  }
  return !1;
}
function Rn(t, e) {
  t.someProp("transformCopied", (h) => {
    e = h(e, t);
  });
  let n = [], { content: r, openStart: o, openEnd: s } = e;
  for (; o > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    o--, s--;
    let h = r.firstChild;
    n.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let i = t.someProp("clipboardSerializer") || ct.fromSchema(t.state.schema), l = Ao(), a = l.createElement("div");
  a.appendChild(i.serializeFragment(r, { document: l }));
  let d = a.firstChild, c, u = 0;
  for (; d && d.nodeType == 1 && (c = vo[d.nodeName.toLowerCase()]); ) {
    for (let h = c.length - 1; h >= 0; h--) {
      let p = l.createElement(c[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), u++;
    }
    d = a.firstChild;
  }
  d && d.nodeType == 1 && d.setAttribute("data-pm-slice", `${o} ${s}${u ? ` -${u}` : ""} ${JSON.stringify(n)}`);
  let f = t.someProp("clipboardTextSerializer", (h) => h(e, t)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function No(t, e, n, r, o) {
  let s = o.parent.type.spec.code, i, l;
  if (!n && !e)
    return null;
  let a = !!e && (r || s || !n);
  if (a) {
    if (t.someProp("transformPastedText", (f) => {
      e = f(e, s || r, t);
    }), s)
      return l = new B(T.from(t.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), t.someProp("transformPasted", (f) => {
        l = f(l, t, !0);
      }), l;
    let u = t.someProp("clipboardTextParser", (f) => f(e, o, r, t));
    if (u)
      l = u;
    else {
      let f = o.marks(), { schema: h } = t.state, p = ct.fromSchema(h);
      i = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = i.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    t.someProp("transformPastedHTML", (u) => {
      n = u(n, t);
    }), i = bl(n), ut && Sl(i);
  let d = i && i.querySelector("[data-pm-slice]"), c = d && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(d.getAttribute("data-pm-slice") || "");
  if (c && c[3])
    for (let u = +c[3]; u > 0; u--) {
      let f = i.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      i = f;
    }
  if (l || (l = (t.someProp("clipboardParser") || t.someProp("domParser") || je.fromSchema(t.state.schema)).parseSlice(i, {
    preserveWhitespace: !!(a || c),
    context: o,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !ml.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), c)
    l = kl(Cr(l, +c[1], +c[2]), c[4]);
  else if (l = B.maxOpen(gl(l.content, o), !0), l.openStart || l.openEnd) {
    let u = 0, f = 0;
    for (let h = l.content.firstChild; u < l.openStart && !h.type.spec.isolating; u++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = Cr(l, u, f);
  }
  return t.someProp("transformPasted", (u) => {
    l = u(l, t, a);
  }), l;
}
const ml = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function gl(t, e) {
  if (t.childCount < 2)
    return t;
  for (let n = e.depth; n >= 0; n--) {
    let o = e.node(n).contentMatchAt(e.index(n)), s, i = [];
    if (t.forEach((l) => {
      if (!i)
        return;
      let a = o.findWrapping(l.type), d;
      if (!a)
        return i = null;
      if (d = i.length && s.length && Oo(a, s, l, i[i.length - 1], 0))
        i[i.length - 1] = d;
      else {
        i.length && (i[i.length - 1] = wo(i[i.length - 1], s.length));
        let c = Eo(l, a);
        i.push(c), o = o.matchType(c.type), s = a;
      }
    }), i)
      return T.from(i);
  }
  return t;
}
function Eo(t, e, n = 0) {
  for (let r = e.length - 1; r >= n; r--)
    t = e[r].create(null, T.from(t));
  return t;
}
function Oo(t, e, n, r, o) {
  if (o < t.length && o < e.length && t[o] == e[o]) {
    let s = Oo(t, e, n, r.lastChild, o + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(o == t.length - 1 ? n.type : t[o + 1]))
      return r.copy(r.content.append(T.from(Eo(n, t, o + 1))));
  }
}
function wo(t, e) {
  if (e == 0)
    return t;
  let n = t.content.replaceChild(t.childCount - 1, wo(t.lastChild, e - 1)), r = t.contentMatchAt(t.childCount).fillBefore(T.empty, !0);
  return t.copy(n.append(r));
}
function gn(t, e, n, r, o, s) {
  let i = e < 0 ? t.firstChild : t.lastChild, l = i.content;
  return t.childCount > 1 && (s = 0), o < r - 1 && (l = gn(l, e, n, r, o + 1, s)), o >= n && (l = e < 0 ? i.contentMatchAt(0).fillBefore(l, s <= o).append(l) : l.append(i.contentMatchAt(i.childCount).fillBefore(T.empty, !0))), t.replaceChild(e < 0 ? 0 : t.childCount - 1, i.copy(l));
}
function Cr(t, e, n) {
  return e < t.openStart && (t = new B(gn(t.content, -1, e, t.openStart, 0, t.openEnd), e, t.openEnd)), n < t.openEnd && (t = new B(gn(t.content, 1, n, t.openEnd, 0, 0), t.openStart, n)), t;
}
const vo = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
function Ao() {
  return document.implementation.createHTMLDocument("title");
}
let Qt = null;
function yl(t) {
  let e = window.trustedTypes;
  return e ? (Qt || (Qt = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (n) => n })), Qt.createHTML(t)) : t;
}
function bl(t) {
  let e = /^(\s*<meta [^>]*>)*/.exec(t);
  e && (t = t.slice(e[0].length));
  let n = Ao(), r = n.body, o = /<([a-z][^>\s]+)/i.exec(t), s;
  if ((s = o && vo[o[1].toLowerCase()]) && (t = s.map((i) => "<" + i + ">").join("") + t + s.map((i) => "</" + i + ">").reverse().join("")), r.innerHTML = yl(t), s)
    for (let i = 0; i < s.length; i++)
      r = r.querySelector(s[i]) || r;
  for (let i = 0; i < n.styleSheets.length; i++) {
    let l = n.styleSheets[i];
    for (let a = 0; a < l.rules.length; a++) {
      let d = l.rules[a];
      if (d instanceof CSSStyleRule) {
        let c = r.querySelectorAll(d.selectorText);
        for (let u = 0; u < c.length; u++)
          c[u].style.cssText += d.style.cssText;
      }
    }
  }
  return r;
}
function Sl(t) {
  let e = t.querySelectorAll($ ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(t.ownerDocument.createTextNode(" "), r);
  }
}
function kl(t, e) {
  if (!t.size)
    return t;
  let n = t.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return t;
  }
  let { content: o, openStart: s, openEnd: i } = t;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = n.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    o = T.from(a.create(r[l + 1], o)), s++, i++;
  }
  return new B(o, s, i);
}
const F = {}, j = {}, Ml = { touchstart: !0, touchmove: !0 };
class xl {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function Cl(t) {
  for (let e in F) {
    let n = F[e];
    t.dom.addEventListener(e, t.input.eventHandlers[e] = (r) => {
      Tl(t, r) && !In(t, r) && (t.editable || !(r.type in j)) && n(t, r);
    }, Ml[e] ? { passive: !0 } : void 0);
  }
  z && t.dom.addEventListener("input", () => null), yn(t);
}
function ie(t, e) {
  t.input.lastSelectionOrigin = e, t.input.lastSelectionTime = Date.now();
}
function Dl(t) {
  t.input.mouseDown && t.input.mouseDown.done(), t.domObserver.stop();
  for (let e in t.input.eventHandlers)
    t.dom.removeEventListener(e, t.input.eventHandlers[e]);
  clearTimeout(t.input.composingTimeout), clearTimeout(t.input.lastIOSEnterFallbackTimeout);
}
function yn(t) {
  t.someProp("handleDOMEvents", (e) => {
    for (let n in e)
      t.input.eventHandlers[n] || t.dom.addEventListener(n, t.input.eventHandlers[n] = (r) => In(t, r));
  });
}
function In(t, e) {
  return t.someProp("handleDOMEvents", (n) => {
    let r = n[e.type];
    return r ? r(t, e) || e.defaultPrevented : !1;
  });
}
function Tl(t, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let n = e.target; n != t.dom; n = n.parentNode)
    if (!n || n.nodeType == 11 || n.pmViewDesc && n.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function Nl(t, e) {
  !In(t, e) && F[e.type] && (t.editable || !(e.type in j)) && F[e.type](t, e);
}
j.keydown = (t, e) => {
  let n = e;
  if (t.input.shiftKey = n.keyCode == 16 || n.shiftKey, !$o(t) && (t.input.lastKeyCode = n.keyCode, t.input.lastKeyCodeTime = Date.now(), !(se && $ && n.keyCode == 13)))
    if (n.keyCode != 229 && t.domObserver.forceFlush(), _e && n.keyCode == 13 && !n.ctrlKey && !n.altKey && !n.metaKey) {
      let r = Date.now();
      t.input.lastIOSEnter = r, t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        t.input.lastIOSEnter == r && (t.someProp("handleKeyDown", (o) => o(t, De(13, "Enter"))), t.input.lastIOSEnter = 0);
      }, 200);
    } else t.someProp("handleKeyDown", (r) => r(t, n)) || pl(t, n) ? n.preventDefault() : ie(t, "key");
};
j.keyup = (t, e) => {
  e.keyCode == 16 && (t.input.shiftKey = !1);
};
j.keypress = (t, e) => {
  let n = e;
  if ($o(t) || !n.charCode || n.ctrlKey && !n.altKey || q && n.metaKey)
    return;
  if (t.someProp("handleKeyPress", (o) => o(t, n))) {
    n.preventDefault();
    return;
  }
  let r = t.state.selection;
  if (!(r instanceof E) || !r.$from.sameParent(r.$to)) {
    let o = String.fromCharCode(n.charCode), s = () => t.state.tr.insertText(o).scrollIntoView();
    !/[\r\n]/.test(o) && !t.someProp("handleTextInput", (i) => i(t, r.$from.pos, r.$to.pos, o, s)) && t.dispatch(s()), n.preventDefault();
  }
};
function ht(t) {
  return { left: t.clientX, top: t.clientY };
}
function El(t, e) {
  let n = e.x - t.clientX, r = e.y - t.clientY;
  return n * n + r * r < 100;
}
function $n(t, e, n, r, o) {
  if (r == -1)
    return !1;
  let s = t.state.doc.resolve(r);
  for (let i = s.depth + 1; i > 0; i--)
    if (t.someProp(e, (l) => i > s.depth ? l(t, n, s.nodeAfter, s.before(i), o, !0) : l(t, n, s.node(i), s.before(i), o, !1)))
      return !0;
  return !1;
}
function pt(t, e, n) {
  if (t.focused || t.focus(), t.state.selection.eq(e))
    return;
  let r = t.state.tr.setSelection(e);
  r.setMeta("pointer", !0), t.dispatch(r);
}
function Ol(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.doc.resolve(e), r = n.nodeAfter;
  return r && r.isAtom && C.isSelectable(r) ? (pt(t, new C(n)), !0) : !1;
}
function wl(t, e) {
  if (e == -1)
    return !1;
  let n = t.state.selection, r, o;
  n instanceof C && (r = n.node);
  let s = t.state.doc.resolve(e);
  for (let i = s.depth + 1; i > 0; i--) {
    let l = i > s.depth ? s.nodeAfter : s.node(i);
    if (C.isSelectable(l)) {
      r && n.$from.depth > 0 && i >= n.$from.depth && s.before(n.$from.depth + 1) == n.$from.pos ? o = s.before(n.$from.depth) : o = s.before(i);
      break;
    }
  }
  return o != null ? (pt(t, C.create(t.state.doc, o)), !0) : !1;
}
function vl(t, e, n, r, o) {
  return $n(t, "handleClickOn", e, n, r) || t.someProp("handleClick", (s) => s(t, e, r)) || (o ? wl(t, n) : Ol(t, n));
}
function Al(t, e, n, r) {
  return $n(t, "handleDoubleClickOn", e, n, r) || t.someProp("handleDoubleClick", (o) => o(t, e, r));
}
function Pl(t, e, n, r) {
  return $n(t, "handleTripleClickOn", e, n, r) || t.someProp("handleTripleClick", (o) => o(t, e, r)) || Rl(t, n, r);
}
function Rl(t, e, n) {
  if (n.button != 0)
    return !1;
  let r = Po(t, e, !0), o = t.state.doc;
  return r ? (pt(t, r), r instanceof E && o.eq(t.state.doc) && (t.input.mouseDown = new $l(t, r)), !0) : !1;
}
function Po(t, e, n) {
  let r = t.state.doc;
  if (e == -1)
    return r.inlineContent ? E.create(r, 0, r.content.size) : null;
  let o = r.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let i = s > o.depth ? o.nodeAfter : o.node(s), l = o.before(s);
    if (i.inlineContent)
      return E.create(r, l + 1, l + 1 + i.content.size);
    if (n && C.isSelectable(i))
      return C.create(r, l);
  }
  return null;
}
function Bn(t) {
  return Tt(t);
}
const Ro = q ? "metaKey" : "ctrlKey";
F.mousedown = (t, e) => {
  let n = e;
  t.input.shiftKey = n.shiftKey;
  let r = Bn(t), o = Date.now(), s = "singleClick";
  o - t.input.lastClick.time < 500 && El(n, t.input.lastClick) && !n[Ro] && t.input.lastClick.button == n.button && (t.input.lastClick.type == "singleClick" ? s = "doubleClick" : t.input.lastClick.type == "doubleClick" && (s = "tripleClick")), t.input.lastClick = { time: o, x: n.clientX, y: n.clientY, type: s, button: n.button }, t.input.mouseDown && t.input.mouseDown.done();
  let i = t.posAtCoords(ht(n));
  i && (s == "singleClick" ? t.input.mouseDown = new Il(t, i, n, !!r) : (s == "doubleClick" ? Al : Pl)(t, i.pos, i.inside, n) ? n.preventDefault() : ie(t, "pointer"));
};
class Io {
  constructor(e) {
    this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
  }
  up(e) {
    this.done();
  }
  move(e) {
    e.buttons == 0 && this.done();
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
  }
  delaySelUpdate() {
    return !1;
  }
}
class Il extends Io {
  constructor(e, n, r, o) {
    super(e), this.pos = n, this.event = r, this.flushed = o, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!r[Ro], this.allowDefault = r.shiftKey;
    let s, i;
    if (n.inside > -1)
      s = e.state.doc.nodeAt(n.inside), i = n.inside;
    else {
      let c = e.state.doc.resolve(n.pos);
      s = c.parent, i = c.depth ? c.before() : 0;
    }
    const l = o ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: d } = e.state;
    r.button == 0 && (s.type.spec.draggable && s.type.spec.selectable !== !1 || d instanceof C && d.from <= i && d.to > i) && (this.mightDrag = {
      node: s,
      pos: i,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && J && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), ie(e, "pointer");
  }
  done() {
    super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
      this.view.isDestroyed || ae(this.view);
    });
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let n = this.pos;
    this.view.state.doc != this.startDoc && (n = this.view.posAtCoords(ht(e))), this.updateAllowDefault(e), this.allowDefault || !n ? ie(this.view, "pointer") : vl(this.view, n.pos, n.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    z && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    $ && !this.view.state.selection.visible && Math.min(Math.abs(n.pos - this.view.state.selection.from), Math.abs(n.pos - this.view.state.selection.to)) <= 2) ? (pt(this.view, L.near(this.view.state.doc.resolve(n.pos))), e.preventDefault()) : ie(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), ie(this.view, "pointer"), super.move(e);
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
  delaySelUpdate() {
    return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
  }
}
class $l extends Io {
  constructor(e, n) {
    super(e), this.startSelection = n, this.startDoc = e.state.doc;
  }
  move(e) {
    if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
      this.done();
      return;
    }
    e.preventDefault(), ie(this.view, "pointer");
    let n = this.view.posAtCoords(ht(e)), r = n && Po(this.view, n.inside, !1);
    if (!r)
      return;
    let { doc: o } = this.view.state, s = this.startSelection, [i, l] = r.from < s.from ? [s.to, r.from] : [s.from, r.to];
    pt(this.view, E.create(o, i, l));
  }
}
F.touchstart = (t) => {
  t.input.lastTouch = Date.now(), Bn(t), ie(t, "pointer");
};
F.touchmove = (t) => {
  t.input.lastTouch = Date.now(), ie(t, "pointer");
};
F.contextmenu = (t) => Bn(t);
function $o(t, e) {
  return t.composing ? !0 : z && Math.abs(Date.now() - t.input.compositionEndedAt) < 500 ? (t.input.compositionEndedAt = -2e8, !0) : !1;
}
const Bl = se ? 5e3 : -1;
j.compositionstart = j.compositionupdate = (t) => {
  if (!t.composing) {
    t.domObserver.flush();
    let { state: e } = t, n = e.selection.$to;
    if (e.selection instanceof E && (e.storedMarks || !n.textOffset && n.parentOffset && n.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1) || $ && co && Vl(t)))
      t.markCursor = t.state.storedMarks || n.marks(), Tt(t, !0), t.markCursor = null;
    else if (Tt(t, !e.selection.empty), J && e.selection.empty && n.parentOffset && !n.textOffset && n.nodeBefore.marks.length) {
      let r = t.domSelectionRange();
      for (let o = r.focusNode, s = r.focusOffset; o && o.nodeType == 1 && s != 0; ) {
        let i = s < 0 ? o.lastChild : o.childNodes[s - 1];
        if (!i)
          break;
        if (i.nodeType == 3) {
          let l = t.domSelection();
          l && l.collapse(i, i.nodeValue.length);
          break;
        } else
          o = i, s = -1;
      }
    }
    t.input.composing = !0;
  }
  Bo(t, Bl);
};
function Vl(t) {
  let { focusNode: e, focusOffset: n } = t.domSelectionRange();
  if (!e || e.nodeType != 1 || n >= e.childNodes.length)
    return !1;
  let r = e.childNodes[n];
  return r.nodeType == 1 && r.contentEditable == "false";
}
j.compositionend = (t, e) => {
  t.composing && (t.input.composing = !1, t.input.compositionEndedAt = Date.now(), t.input.compositionPendingChanges = t.domObserver.pendingRecords().length ? t.input.compositionID : 0, t.input.compositionNode = null, t.input.badSafariComposition ? t.domObserver.forceFlush() : t.input.compositionPendingChanges && Promise.resolve().then(() => t.domObserver.flush()), t.input.compositionID++, Bo(t, 20));
};
function Bo(t, e) {
  clearTimeout(t.input.composingTimeout), e > -1 && (t.input.composingTimeout = setTimeout(() => Tt(t), e));
}
function Vo(t) {
  for (t.composing && (t.input.composing = !1, t.input.compositionEndedAt = Date.now()); t.input.compositionNodes.length > 0; )
    t.input.compositionNodes.pop().markParentsDirty();
}
function zl(t) {
  let e = t.domSelectionRange();
  if (!e.focusNode)
    return null;
  let n = wi(e.focusNode, e.focusOffset), r = vi(e.focusNode, e.focusOffset);
  if (n && r && n != r) {
    let o = r.pmViewDesc, s = t.domObserver.lastChangedTextNode;
    if (n == s || r == s)
      return s;
    if (!o || !o.isText(r.nodeValue))
      return r;
    if (t.input.compositionNode == r) {
      let i = n.pmViewDesc;
      if (!(!i || !i.isText(n.nodeValue)))
        return r;
    }
  }
  return n || r;
}
function Tt(t, e = !1) {
  if (!(se && t.domObserver.flushingSoon >= 0)) {
    if (t.domObserver.forceFlush(), Vo(t), e || t.docView && t.docView.dirty) {
      let n = An(t), r = t.state.selection;
      return n && !n.eq(r) ? t.dispatch(t.state.tr.setSelection(n)) : (t.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? t.dispatch(t.state.tr.deleteSelection()) : t.updateState(t.state), !0;
    }
    return !1;
  }
}
function Ll(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.dom.parentNode.appendChild(document.createElement("div"));
  n.appendChild(e), n.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), o = document.createRange();
  o.selectNodeContents(e), t.dom.blur(), r.removeAllRanges(), r.addRange(o), setTimeout(() => {
    n.parentNode && n.parentNode.removeChild(n), t.focus();
  }, 50);
}
const rt = K && me < 15 || _e && Ii < 604;
F.copy = j.cut = (t, e) => {
  let n = e, r = t.state.selection, o = n.type == "cut";
  if (r.empty)
    return;
  let s = rt ? null : n.clipboardData, i = r.content(), { dom: l, text: a } = Rn(t, i);
  s ? (n.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Ll(t, l), o && t.dispatch(t.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function Fl(t) {
  return t.openStart == 0 && t.openEnd == 0 && t.content.childCount == 1 ? t.content.firstChild : null;
}
function jl(t, e) {
  if (!t.dom.parentNode)
    return;
  let n = t.input.shiftKey || t.state.selection.$from.parent.type.spec.code, r = t.dom.parentNode.appendChild(document.createElement(n ? "textarea" : "div"));
  n || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let o = t.input.shiftKey && t.input.lastKeyCode != 45;
  setTimeout(() => {
    t.focus(), r.parentNode && r.parentNode.removeChild(r), n ? ot(t, r.value, null, o, e) : ot(t, r.textContent, r.innerHTML, o, e);
  }, 50);
}
function ot(t, e, n, r, o) {
  let s = No(t, e, n, r, t.state.selection.$from);
  if (t.someProp("handlePaste", (a) => a(t, o, s || B.empty)))
    return !0;
  if (!s)
    return !1;
  let i = Fl(s), l = i ? t.state.tr.replaceSelectionWith(i, r) : t.state.tr.replaceSelection(s);
  return t.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function zo(t) {
  let e = t.getData("text/plain") || t.getData("Text");
  if (e)
    return e;
  let n = t.getData("text/uri-list");
  return n ? n.replace(/\r?\n/g, " ") : "";
}
j.paste = (t, e) => {
  let n = e;
  if (t.composing && !se)
    return;
  let r = rt ? null : n.clipboardData, o = t.input.shiftKey && t.input.lastKeyCode != 45;
  r && ot(t, zo(r), r.getData("text/html"), o, n) ? n.preventDefault() : jl(t, n);
};
class Lo {
  constructor(e, n, r) {
    this.slice = e, this.move = n, this.node = r;
  }
}
const Hl = q ? "altKey" : "ctrlKey";
function Fo(t, e) {
  let n;
  return t.someProp("dragCopies", (r) => {
    n = n || r(e);
  }), n != null ? !n : !e[Hl];
}
F.dragstart = (t, e) => {
  let n = e, r = t.input.mouseDown;
  if (r && r.done(), !n.dataTransfer)
    return;
  let o = t.state.selection, s = o.empty ? null : t.posAtCoords(ht(n)), i;
  if (!(s && s.pos >= o.from && s.pos <= (o instanceof C ? o.to - 1 : o.to))) {
    if (r && r.mightDrag)
      i = C.create(t.state.doc, r.mightDrag.pos);
    else if (n.target && n.target.nodeType == 1) {
      let u = t.docView.nearestDesc(n.target, !0);
      u && u.node.type.spec.draggable && u != t.docView && (i = C.create(t.state.doc, u.posBefore));
    }
  }
  let l = (i || t.state.selection).content(), { dom: a, text: d, slice: c } = Rn(t, l);
  (!n.dataTransfer.files.length || !$ || ao > 120) && n.dataTransfer.clearData(), n.dataTransfer.setData(rt ? "Text" : "text/html", a.innerHTML), n.dataTransfer.effectAllowed = "copyMove", rt || n.dataTransfer.setData("text/plain", d), t.dragging = new Lo(c, Fo(t, n), i);
};
F.dragend = (t) => {
  let e = t.dragging;
  window.setTimeout(() => {
    t.dragging == e && (t.dragging = null);
  }, 50);
};
j.dragover = j.dragenter = (t, e) => e.preventDefault();
j.drop = (t, e) => {
  try {
    Kl(t, e, t.dragging);
  } finally {
    t.dragging = null;
  }
};
function Kl(t, e, n) {
  if (!e.dataTransfer)
    return;
  let r = t.posAtCoords(ht(e));
  if (!r)
    return;
  let o = t.state.doc.resolve(r.pos), s = n && n.slice;
  s ? t.someProp("transformPasted", (h) => {
    s = h(s, t, !1);
  }) : s = No(t, zo(e.dataTransfer), rt ? null : e.dataTransfer.getData("text/html"), !1, o);
  let i = !!(n && Fo(t, e));
  if (t.someProp("handleDrop", (h) => h(t, e, s || B.empty, i))) {
    e.preventDefault();
    return;
  }
  if (!s)
    return;
  e.preventDefault();
  let l = s ? oi(t.state.doc, o.pos, s) : o.pos;
  l == null && (l = o.pos);
  let a = t.state.tr;
  if (i) {
    let { node: h } = n;
    h ? h.replace(a) : a.deleteSelection();
  }
  let d = a.mapping.map(l), c = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, u = a.doc;
  if (c ? a.replaceRangeWith(d, d, s.content.firstChild) : a.replaceRange(d, d, s), a.doc.eq(u))
    return;
  let f = a.doc.resolve(d);
  if (c && C.isSelectable(s.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(s.content.firstChild))
    a.setSelection(new C(f));
  else {
    let h = a.mapping.map(l);
    a.mapping.maps[a.mapping.maps.length - 1].forEach((p, m, g, y) => h = y), a.setSelection(Pn(t, f, a.doc.resolve(h)));
  }
  t.focus(), t.dispatch(a.setMeta("uiEvent", "drop"));
}
F.focus = (t) => {
  t.input.lastFocus = Date.now(), t.focused || (t.domObserver.stop(), t.dom.classList.add("ProseMirror-focused"), t.domObserver.start(), t.focused = !0, setTimeout(() => {
    t.docView && t.hasFocus() && !t.domObserver.currentSelection.eq(t.domSelectionRange()) && ae(t);
  }, 20));
};
F.blur = (t, e) => {
  let n = e;
  t.focused && (t.domObserver.stop(), t.dom.classList.remove("ProseMirror-focused"), t.domObserver.start(), n.relatedTarget && t.dom.contains(n.relatedTarget) && t.domObserver.currentSelection.clear(), t.focused = !1);
};
F.beforeinput = (t, e) => {
  if (se && e.inputType == "deleteContentBackward") {
    t.domObserver.flushSoon();
    let { domChangeCount: r } = t.input;
    setTimeout(() => {
      if (t.input.domChangeCount != r || (t.dom.blur(), t.focus(), t.someProp("handleKeyDown", (s) => s(t, De(8, "Backspace")))))
        return;
      let { $cursor: o } = t.state.selection;
      o && o.pos > 0 && t.dispatch(t.state.tr.delete(o.pos - 1, o.pos).scrollIntoView());
    }, 50);
  }
};
for (let t in j)
  F[t] = j[t];
function st(t, e) {
  if (t == e)
    return !0;
  for (let n in t)
    if (t[n] !== e[n])
      return !1;
  for (let n in e)
    if (!(n in t))
      return !1;
  return !0;
}
class Nt {
  constructor(e, n) {
    this.toDOM = e, this.spec = n || Oe, this.side = this.spec.side || 0;
  }
  map(e, n, r, o) {
    let { pos: s, deleted: i } = e.mapResult(n.from + o, this.side < 0 ? -1 : 1);
    return i ? null : new de(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Nt && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && st(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class be {
  constructor(e, n) {
    this.attrs = e, this.spec = n || Oe;
  }
  map(e, n, r, o) {
    let s = e.map(n.from + o, this.spec.inclusiveStart ? -1 : 1) - r, i = e.map(n.to + o, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= i ? null : new de(s, i, this);
  }
  valid(e, n) {
    return n.from < n.to;
  }
  eq(e) {
    return this == e || e instanceof be && st(this.attrs, e.attrs) && st(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof be;
  }
  destroy() {
  }
}
class Vn {
  constructor(e, n) {
    this.attrs = e, this.spec = n || Oe;
  }
  map(e, n, r, o) {
    let s = e.mapResult(n.from + o, 1);
    if (s.deleted)
      return null;
    let i = e.mapResult(n.to + o, -1);
    return i.deleted || i.pos <= s.pos ? null : new de(s.pos - r, i.pos - r, this);
  }
  valid(e, n) {
    let { index: r, offset: o } = e.content.findIndex(n.from), s;
    return o == n.from && !(s = e.child(r)).isText && o + s.nodeSize == n.to;
  }
  eq(e) {
    return this == e || e instanceof Vn && st(this.attrs, e.attrs) && st(this.spec, e.spec);
  }
  destroy() {
  }
}
let de = class Xe {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.from = e, this.to = n, this.type = r;
  }
  /**
  @internal
  */
  copy(e, n) {
    return new Xe(e, n, this.type);
  }
  /**
  @internal
  */
  eq(e, n = 0) {
    return this.type.eq(e.type) && this.from + n == e.from && this.to + n == e.to;
  }
  /**
  @internal
  */
  map(e, n, r) {
    return this.type.map(e, this, n, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, n, r) {
    return new Xe(e, e, new Nt(n, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, n, r, o) {
    return new Xe(e, n, new be(r, o));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, n, r, o) {
    return new Xe(e, n, new Vn(r, o));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof be;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Nt;
  }
};
const ze = [], Oe = {};
class v {
  /**
  @internal
  */
  constructor(e, n) {
    this.local = e.length ? e : ze, this.children = n.length ? n : ze;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, n) {
    return n.length ? Et(n, e, 0, Oe) : V;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, n, r) {
    let o = [];
    return this.findInner(e ?? 0, n ?? 1e9, o, 0, r), o;
  }
  findInner(e, n, r, o, s) {
    for (let i = 0; i < this.local.length; i++) {
      let l = this.local[i];
      l.from <= n && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + o, l.to + o));
    }
    for (let i = 0; i < this.children.length; i += 3)
      if (this.children[i] < n && this.children[i + 1] > e) {
        let l = this.children[i] + 1;
        this.children[i + 2].findInner(e - l, n - l, r, o + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, n, r) {
    return this == V || e.maps.length == 0 ? this : this.mapInner(e, n, 0, 0, r || Oe);
  }
  /**
  @internal
  */
  mapInner(e, n, r, o, s) {
    let i;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, o);
      a && a.type.valid(n, a) ? (i || (i = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? Wl(this.children, i || [], e, n, r, o, s) : i ? new v(i.sort(we), ze) : V;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, n) {
    return n.length ? this == V ? v.create(e, n) : this.addInner(e, n, 0) : this;
  }
  addInner(e, n, r) {
    let o, s = 0;
    e.forEach((l, a) => {
      let d = a + r, c;
      if (c = Ho(n, l, d)) {
        for (o || (o = this.children.slice()); s < o.length && o[s] < a; )
          s += 3;
        o[s] == a ? o[s + 2] = o[s + 2].addInner(l, c, d + 1) : o.splice(s, 0, a, a + l.nodeSize, Et(c, l, d + 1, Oe)), s += 3;
      }
    });
    let i = jo(s ? Ko(n) : n, -r);
    for (let l = 0; l < i.length; l++)
      i[l].type.valid(e, i[l]) || i.splice(l--, 1);
    return new v(i.length ? this.local.concat(i).sort(we) : this.local, o || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == V ? this : this.removeInner(e, 0);
  }
  removeInner(e, n) {
    let r = this.children, o = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let i, l = r[s] + n, a = r[s + 1] + n;
      for (let c = 0, u; c < e.length; c++)
        (u = e[c]) && u.from > l && u.to < a && (e[c] = null, (i || (i = [])).push(u));
      if (!i)
        continue;
      r == this.children && (r = this.children.slice());
      let d = r[s + 2].removeInner(i, l + 1);
      d != V ? r[s + 2] = d : (r.splice(s, 3), s -= 3);
    }
    if (o.length) {
      for (let s = 0, i; s < e.length; s++)
        if (i = e[s])
          for (let l = 0; l < o.length; l++)
            o[l].eq(i, n) && (o == this.local && (o = this.local.slice()), o.splice(l--, 1));
    }
    return r == this.children && o == this.local ? this : o.length || r.length ? new v(o, r) : V;
  }
  forChild(e, n) {
    if (this == V)
      return this;
    if (n.isLeaf)
      return v.empty;
    let r, o;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, i = s + n.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < i && a.to > s && a.type instanceof be) {
        let d = Math.max(s, a.from) - s, c = Math.min(i, a.to) - s;
        d < c && (o || (o = [])).push(a.copy(d, c));
      }
    }
    if (o) {
      let l = new v(o.sort(we), ze);
      return r ? new pe([l, r]) : l;
    }
    return r || V;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof v) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let n = 0; n < this.local.length; n++)
      if (!this.local[n].eq(e.local[n]))
        return !1;
    for (let n = 0; n < this.children.length; n += 3)
      if (this.children[n] != e.children[n] || this.children[n + 1] != e.children[n + 1] || !this.children[n + 2].eq(e.children[n + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return zn(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == V)
      return ze;
    if (e.inlineContent || !this.local.some(be.is))
      return this.local;
    let n = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof be || n.push(this.local[r]);
    return n;
  }
  forEachSet(e) {
    e(this);
  }
}
v.empty = new v([], []);
v.removeOverlap = zn;
const V = v.empty;
class pe {
  constructor(e) {
    this.members = e;
  }
  map(e, n) {
    const r = this.members.map((o) => o.map(e, n, Oe));
    return pe.from(r);
  }
  forChild(e, n) {
    if (n.isLeaf)
      return v.empty;
    let r = [];
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].forChild(e, n);
      s != V && (s instanceof pe ? r = r.concat(s.members) : r.push(s));
    }
    return pe.from(r);
  }
  eq(e) {
    if (!(e instanceof pe) || e.members.length != this.members.length)
      return !1;
    for (let n = 0; n < this.members.length; n++)
      if (!this.members[n].eq(e.members[n]))
        return !1;
    return !0;
  }
  locals(e) {
    let n, r = !0;
    for (let o = 0; o < this.members.length; o++) {
      let s = this.members[o].localsInner(e);
      if (s.length)
        if (!n)
          n = s;
        else {
          r && (n = n.slice(), r = !1);
          for (let i = 0; i < s.length; i++)
            n.push(s[i]);
        }
    }
    return n ? zn(r ? n : n.sort(we)) : ze;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return V;
      case 1:
        return e[0];
      default:
        return new pe(e.every((n) => n instanceof v) ? e : e.reduce((n, r) => n.concat(r instanceof v ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let n = 0; n < this.members.length; n++)
      this.members[n].forEachSet(e);
  }
}
function Wl(t, e, n, r, o, s, i) {
  let l = t.slice();
  for (let d = 0, c = s; d < n.maps.length; d++) {
    let u = 0;
    n.maps[d].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let y = 0; y < l.length; y += 3) {
        let S = l[y + 1];
        if (S < 0 || f > S + c - u)
          continue;
        let b = l[y] + c - u;
        h >= b ? l[y + 1] = f <= b ? -2 : -1 : f >= c && g && (l[y] += g, l[y + 1] += g);
      }
      u += g;
    }), c = n.maps[d].map(c, -1);
  }
  let a = !1;
  for (let d = 0; d < l.length; d += 3)
    if (l[d + 1] < 0) {
      if (l[d + 1] == -2) {
        a = !0, l[d + 1] = -1;
        continue;
      }
      let c = n.map(t[d] + s), u = c - o;
      if (u < 0 || u >= r.content.size) {
        a = !0;
        continue;
      }
      let f = n.map(t[d + 1] + s, -1), h = f - o, { index: p, offset: m } = r.content.findIndex(u), g = r.maybeChild(p);
      if (g && m == u && m + g.nodeSize == h) {
        let y = l[d + 2].mapInner(n, g, c + 1, t[d] + s + 1, i);
        y != V ? (l[d] = u, l[d + 1] = h, l[d + 2] = y) : (l[d + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let d = _l(l, t, e, n, o, s, i), c = Et(d, r, 0, i);
    e = c.local;
    for (let u = 0; u < l.length; u += 3)
      l[u + 1] < 0 && (l.splice(u, 3), u -= 3);
    for (let u = 0, f = 0; u < c.children.length; u += 3) {
      let h = c.children[u];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, c.children[u], c.children[u + 1], c.children[u + 2]);
    }
  }
  return new v(e.sort(we), l);
}
function jo(t, e) {
  if (!e || !t.length)
    return t;
  let n = [];
  for (let r = 0; r < t.length; r++) {
    let o = t[r];
    n.push(new de(o.from + e, o.to + e, o.type));
  }
  return n;
}
function _l(t, e, n, r, o, s, i) {
  function l(a, d) {
    for (let c = 0; c < a.local.length; c++) {
      let u = a.local[c].map(r, o, d);
      u ? n.push(u) : i.onRemove && i.onRemove(a.local[c].spec);
    }
    for (let c = 0; c < a.children.length; c += 3)
      l(a.children[c + 2], a.children[c] + d + 1);
  }
  for (let a = 0; a < t.length; a += 3)
    t[a + 1] == -1 && l(t[a + 2], e[a] + s + 1);
  return n;
}
function Ho(t, e, n) {
  if (e.isLeaf)
    return null;
  let r = n + e.nodeSize, o = null;
  for (let s = 0, i; s < t.length; s++)
    (i = t[s]) && i.from > n && i.to < r && ((o || (o = [])).push(i), t[s] = null);
  return o;
}
function Ko(t) {
  let e = [];
  for (let n = 0; n < t.length; n++)
    t[n] != null && e.push(t[n]);
  return e;
}
function Et(t, e, n, r) {
  let o = [], s = !1;
  e.forEach((l, a) => {
    let d = Ho(t, l, a + n);
    if (d) {
      s = !0;
      let c = Et(d, l, n + a + 1, r);
      c != V && o.push(a, a + l.nodeSize, c);
    }
  });
  let i = jo(s ? Ko(t) : t, -n).sort(we);
  for (let l = 0; l < i.length; l++)
    i[l].type.valid(e, i[l]) || (r.onRemove && r.onRemove(i[l].spec), i.splice(l--, 1));
  return i.length || o.length ? new v(i, o) : V;
}
function we(t, e) {
  return t.from - e.from || t.to - e.to;
}
function zn(t) {
  let e = t;
  for (let n = 0; n < e.length - 1; n++) {
    let r = e[n];
    if (r.from != r.to)
      for (let o = n + 1; o < e.length; o++) {
        let s = e[o];
        if (s.from == r.from) {
          s.to != r.to && (e == t && (e = t.slice()), e[o] = s.copy(s.from, r.to), Dr(e, o + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == t && (e = t.slice()), e[n] = r.copy(r.from, s.from), Dr(e, o, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Dr(t, e, n) {
  for (; e < t.length && we(n, t[e]) > 0; )
    e++;
  t.splice(e, 0, n);
}
function Zt(t) {
  let e = [];
  return t.someProp("decorations", (n) => {
    let r = n(t.state);
    r && r != V && e.push(r);
  }), t.cursorWrapper && e.push(v.create(t.state.doc, [t.cursorWrapper.deco])), pe.from(e);
}
const ql = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Ul = K && me <= 11;
class Jl {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Yl {
  constructor(e, n) {
    this.view = e, this.handleDOMChange = n, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Jl(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let o = 0; o < r.length; o++)
        this.queue.push(r[o]);
      K && me <= 11 && r.some((o) => o.type == "childList" && o.removedNodes.length || o.type == "characterData" && o.oldValue.length > o.target.nodeValue.length) ? this.flushSoon() : z && e.composing && r.some((o) => o.type == "childList" && o.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
    }), Ul && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, ql)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let n = 0; n < e.length; n++)
          this.queue.push(e[n]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (yr(this.view)) {
      if (this.suppressingSelectionUpdates)
        return ae(this.view);
      if (K && me <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Pe(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let n = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = We(s))
      n.add(s);
    for (let s = e.anchorNode; s; s = We(s))
      if (n.has(s)) {
        r = s;
        break;
      }
    let o = r && this.view.docView.nearestDesc(r);
    if (o && o.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let n = this.pendingRecords();
    n.length && (this.queue = []);
    let r = e.domSelectionRange(), o = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && yr(e) && !this.ignoreSelectionChange(r), s = -1, i = -1, l = !1, a = [];
    if (e.editable)
      for (let c = 0; c < n.length; c++) {
        let u = this.registerMutation(n[c], a);
        u && (s = s < 0 ? u.from : Math.min(u.from, s), i = i < 0 ? u.to : Math.max(u.to, i), u.typeOver && (l = !0));
      }
    if (a.some((c) => c.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || $ && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && n.some((c) => c.type == "childList" && c.removedNodes.length))) {
      for (let c of a)
        if (c.nodeName == "BR" && c.parentNode) {
          let u = c.nextSibling;
          for (; u && u.nodeType == 1; ) {
            if (u.contentEditable == "false") {
              c.parentNode.removeChild(c);
              break;
            }
            u = u.firstChild;
          }
        }
    } else if (J && a.length) {
      let c = a.filter((u) => u.nodeName == "BR");
      if (c.length == 2) {
        let [u, f] = c;
        u.parentNode && u.parentNode.parentNode == f.parentNode ? f.remove() : u.remove();
      } else {
        let { focusNode: u } = this.currentSelection;
        for (let f of c) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!u || Ql(e, u) != h) && f.remove();
        }
      }
    }
    let d = null;
    s < 0 && o && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && It(r) && (d = An(e)) && d.eq(L.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, ae(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || o) && (s > -1 && (e.docView.markDirty(s, i), Gl(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, Zl(e, a)), this.handleDOMChange(s, i, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || ae(e), this.currentSelection.set(r));
  }
  registerMutation(e, n) {
    if (n.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let c = 0; c < e.addedNodes.length; c++) {
        let u = e.addedNodes[c];
        n.push(u), u.nodeType == 3 && (this.lastChangedTextNode = u);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let o = e.previousSibling, s = e.nextSibling;
      if (K && me <= 11 && e.addedNodes.length)
        for (let c = 0; c < e.addedNodes.length; c++) {
          let { previousSibling: u, nextSibling: f } = e.addedNodes[c];
          (!u || Array.prototype.indexOf.call(e.addedNodes, u) < 0) && (o = u), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let i = o && o.parentNode == e.target ? R(o) + 1 : 0, l = r.localPosFromDOM(e.target, i, -1), a = s && s.parentNode == e.target ? R(s) : e.target.childNodes.length, d = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: d };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let Tr = /* @__PURE__ */ new WeakMap(), Nr = !1;
function Gl(t) {
  if (!Tr.has(t) && (Tr.set(t, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(t.dom).whiteSpace) !== -1)) {
    if (t.requiresGeckoHackNode = J, Nr)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), Nr = !0;
  }
}
function Er(t, e) {
  let n = e.startContainer, r = e.startOffset, o = e.endContainer, s = e.endOffset, i = t.domAtPos(t.state.selection.anchor);
  return Pe(i.node, i.offset, o, s) && ([n, r, o, s] = [o, s, n, r]), { anchorNode: n, anchorOffset: r, focusNode: o, focusOffset: s };
}
function Xl(t, e) {
  if (e.getComposedRanges) {
    let o = e.getComposedRanges(t.root)[0];
    if (o)
      return Er(t, o);
  }
  let n;
  function r(o) {
    o.preventDefault(), o.stopImmediatePropagation(), n = o.getTargetRanges()[0];
  }
  return t.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), t.dom.removeEventListener("beforeinput", r, !0), n ? Er(t, n) : null;
}
function Ql(t, e) {
  for (let n = e.parentNode; n && n != t.dom; n = n.parentNode) {
    let r = t.docView.nearestDesc(n, !0);
    if (r && r.node.isBlock)
      return n;
  }
  return null;
}
function Zl(t, e) {
  var n;
  let { focusNode: r, focusOffset: o } = t.domSelectionRange();
  for (let s of e)
    if (((n = s.parentNode) === null || n === void 0 ? void 0 : n.nodeName) == "TR") {
      let i = s.nextSibling;
      for (; i && i.nodeName != "TD" && i.nodeName != "TH"; )
        i = i.nextSibling;
      if (i) {
        let l = i;
        for (; ; ) {
          let a = l.firstChild;
          if (!a || a.nodeType != 1 || a.contentEditable == "false" || /^(BR|IMG)$/.test(a.nodeName))
            break;
          l = a;
        }
        l.insertBefore(s, l.firstChild), r == s && t.domSelection().collapse(s, o);
      } else
        s.parentNode.removeChild(s);
    }
}
function ea(t, e, n, r) {
  let { node: o, fromOffset: s, toOffset: i, from: l, to: a } = t.docView.parseRange(e, n), d = t.domSelectionRange(), c, u = d.anchorNode;
  if (u && t.dom.contains(u.nodeType == 1 ? u : u.parentNode) && (c = [{ node: u, offset: d.anchorOffset }], It(d) || c.push({ node: d.focusNode, offset: d.focusOffset })), $ && t.input.lastKeyCode === 8)
    for (let y = i; y > s; y--) {
      let S = o.childNodes[y - 1], b = S.pmViewDesc;
      if (S.nodeName == "BR" && !b) {
        i = y;
        break;
      }
      if (!b || b.size)
        break;
    }
  let f = t.state.doc, h = t.someProp("domParser") || je.fromSchema(t.state.schema), p = f.resolve(l), m = null, g = h.parse(o, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: s,
    to: i,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: c,
    ruleFromNode: ta(r),
    context: p
  });
  if (c && c[0].pos != null) {
    let y = c[0].pos, S = c[1] && c[1].pos;
    S == null && (S = y), m = { anchor: y + l, head: S + l };
  }
  return { doc: g, sel: m, from: l, to: a };
}
const ta = (t) => (e) => {
  let n = e.pmViewDesc;
  if (n)
    return n.parseRule(t);
  if (e.nodeName == "BR" && e.parentNode) {
    if (z && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
      let r = document.createElement("div");
      return r.appendChild(document.createElement("li")), { skip: r };
    } else if (e.parentNode.lastChild == e || z && /^(tr|table)$/i.test(e.parentNode.nodeName))
      return { ignore: !0 };
  } else if (e.nodeName == "IMG" && e.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}, na = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function ra(t, e, n, r, o) {
  let s = t.input.compositionPendingChanges || (t.composing ? t.input.compositionID : 0);
  if (t.input.compositionPendingChanges = 0, e < 0) {
    let x = t.input.lastSelectionTime > Date.now() - 50 ? t.input.lastSelectionOrigin : null, N = An(t, x);
    if (N && !t.state.selection.eq(N)) {
      if ($ && se && t.input.lastKeyCode === 13 && Date.now() - 100 < t.input.lastKeyCodeTime && t.someProp("handleKeyDown", (_) => _(t, De(13, "Enter"))))
        return;
      let w = t.state.tr.setSelection(N);
      x == "pointer" ? w.setMeta("pointer", !0) : x == "key" && w.scrollIntoView(), s && w.setMeta("composition", s), t.dispatch(w);
    }
    return;
  }
  let i = t.state.doc.resolve(e), l = i.sharedDepth(n);
  e = i.before(l + 1), n = t.state.doc.resolve(n).after(l + 1);
  let a = t.state.selection, d = ea(t, e, n, o), c = t.state.doc, u = c.slice(d.from, d.to), f, h;
  t.input.lastKeyCode === 8 && Date.now() - 100 < t.input.lastKeyCodeTime ? (f = t.state.selection.to, h = "end") : (f = t.state.selection.from, h = "start"), t.input.lastKeyCode = null;
  let p = ia(u.content, d.doc.content, d.from, f, h);
  if (p && t.input.domChangeCount++, (_e && t.input.lastIOSEnter > Date.now() - 225 || se) && o.some((x) => x.nodeType == 1 && !na.test(x.nodeName)) && (!p || p.endA >= p.endB) && t.someProp("handleKeyDown", (x) => x(t, De(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof E && !a.empty && a.$head.sameParent(a.$anchor) && !t.composing && !(d.sel && d.sel.anchor != d.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (d.sel) {
        let x = Or(t, t.state.doc, d.sel);
        if (x && !x.eq(t.state.selection)) {
          let N = t.state.tr.setSelection(x);
          s && N.setMeta("composition", s), t.dispatch(N);
        }
      }
      return;
    }
  t.state.selection.from < t.state.selection.to && p.start == p.endB && t.state.selection instanceof E && (p.start > t.state.selection.from && p.start <= t.state.selection.from + 2 && t.state.selection.from >= d.from ? p.start = t.state.selection.from : p.endA < t.state.selection.to && p.endA >= t.state.selection.to - 2 && t.state.selection.to <= d.to && (p.endB += t.state.selection.to - p.endA, p.endA = t.state.selection.to)), K && me <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > d.from && d.doc.textBetween(p.start - d.from - 1, p.start - d.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = d.doc.resolveNoCache(p.start - d.from), g = d.doc.resolveNoCache(p.endB - d.from), y = c.resolve(p.start), S = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA;
  if ((_e && t.input.lastIOSEnter > Date.now() - 225 && (!S || o.some((x) => x.nodeName == "DIV" || x.nodeName == "P")) || !S && m.pos < d.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(d.doc.textBetween(m.pos, g.pos, "", ""))) && t.someProp("handleKeyDown", (x) => x(t, De(13, "Enter")))) {
    t.input.lastIOSEnter = 0;
    return;
  }
  if (t.state.selection.anchor > p.start && sa(c, p.start, p.endA, m, g) && t.someProp("handleKeyDown", (x) => x(t, De(8, "Backspace")))) {
    se && $ && t.domObserver.suppressSelectionUpdates();
    return;
  }
  $ && p.endB == p.start && (t.input.lastChromeDelete = Date.now()), se && !S && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && d.sel && d.sel.anchor == d.sel.head && d.sel.head == p.endA && (p.endB -= 2, g = d.doc.resolveNoCache(p.endB - d.from), setTimeout(() => {
    t.someProp("handleKeyDown", function(x) {
      return x(t, De(13, "Enter"));
    });
  }, 20));
  let b = p.start, M = p.endA, D = (x) => {
    let N = x || t.state.tr.replace(b, M, d.doc.slice(p.start - d.from, p.endB - d.from));
    if (d.sel) {
      let w = Or(t, N.doc, d.sel);
      w && !($ && t.composing && w.empty && (p.start != p.endB || t.input.lastChromeDelete < Date.now() - 100) && (w.head == b || w.head == N.mapping.map(M) - 1) || K && w.empty && w.head == b) && N.setSelection(w);
    }
    return s && N.setMeta("composition", s), N.scrollIntoView();
  }, A;
  if (S)
    if (m.pos == g.pos) {
      K && me <= 11 && m.parentOffset == 0 && (t.domObserver.suppressSelectionUpdates(), setTimeout(() => ae(t), 20));
      let x = D(t.state.tr.delete(b, M)), N = c.resolve(p.start).marksAcross(c.resolve(p.endA));
      N && x.ensureMarks(N), t.dispatch(x);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (A = oa(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let x = D(t.state.tr);
      A.type == "add" ? x.addMark(b, M, A.mark) : x.removeMark(b, M, A.mark), t.dispatch(x);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let x = m.parent.textBetween(m.parentOffset, g.parentOffset), N = () => D(t.state.tr.insertText(x, b, M));
      t.someProp("handleTextInput", (w) => w(t, b, M, x, N)) || t.dispatch(N());
    } else
      t.dispatch(D());
  else
    t.dispatch(D());
}
function Or(t, e, n) {
  return Math.max(n.anchor, n.head) > e.content.size ? null : Pn(t, e.resolve(n.anchor), e.resolve(n.head));
}
function oa(t, e) {
  let n = t.firstChild.marks, r = e.firstChild.marks, o = n, s = r, i, l, a;
  for (let c = 0; c < r.length; c++)
    o = r[c].removeFromSet(o);
  for (let c = 0; c < n.length; c++)
    s = n[c].removeFromSet(s);
  if (o.length == 1 && s.length == 0)
    l = o[0], i = "add", a = (c) => c.mark(l.addToSet(c.marks));
  else if (o.length == 0 && s.length == 1)
    l = s[0], i = "remove", a = (c) => c.mark(l.removeFromSet(c.marks));
  else
    return null;
  let d = [];
  for (let c = 0; c < e.childCount; c++)
    d.push(a(e.child(c)));
  if (T.from(d).eq(t))
    return { mark: l, type: i };
}
function sa(t, e, n, r, o) {
  if (
    // The content must have shrunk
    n - e <= o.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    en(r, !0, !1) < o.pos
  )
    return !1;
  let s = t.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && n == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let i = t.resolve(en(s, !0, !0));
  return !i.parent.isTextblock || i.pos > n || en(i, !0, !1) < n ? !1 : r.parent.content.cut(r.parentOffset).eq(i.parent.content);
}
function en(t, e, n) {
  let r = t.depth, o = e ? t.end() : t.pos;
  for (; r > 0 && (e || t.indexAfter(r) == t.node(r).childCount); )
    r--, o++, e = !1;
  if (n) {
    let s = t.node(r).maybeChild(t.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, o++;
  }
  return o;
}
function ia(t, e, n, r, o) {
  let s = t.findDiffStart(e, n), i = n + t.size, l = n + e.size;
  if (s == null)
    return null;
  let { a, b: d } = t.findDiffEnd(e, i, l);
  if (o == "end") {
    let c = Math.max(0, s - Math.min(a, d));
    r -= a + c - s;
  }
  if (a < s && i < l) {
    let c = r <= s && r >= a ? s - r : 0;
    s -= c, d = s + (d - a), a = s;
  } else if (d < s) {
    let c = r <= s && r >= d ? s - r : 0;
    s -= c, a = s + (a - d), d = s;
  }
  return { start: s, endA: a, endB: d };
}
class Wo {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, n) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new xl(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = n, this.state = n.state, this.directPlugins = n.plugins || [], this.directPlugins.forEach(Rr), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = Ar(this), vr(this), this.nodeViews = Pr(this), this.docView = ur(this.state.doc, wr(this), Zt(this), this.dom, this), this.domObserver = new Yl(this, (r, o, s, i) => ra(this, r, o, s, i)), this.domObserver.start(), Cl(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let n in e)
        this._props[n] = e[n];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && yn(this);
    let n = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(Rr), this.directPlugins = e.plugins), this.updateStateInner(e.state, n);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let n = {};
    for (let r in this._props)
      n[r] = this._props[r];
    n.state = this.state;
    for (let r in e)
      n[r] = e[r];
    this.update(n);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, n) {
    var r;
    let o = this.state, s = !1, i = !1;
    e.storedMarks && this.composing && (Vo(this), i = !0), this.state = e;
    let l = o.plugins != e.plugins || this._props.plugins != n.plugins;
    if (l || this._props.plugins != n.plugins || this._props.nodeViews != n.nodeViews) {
      let h = Pr(this);
      aa(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || n.handleDOMEvents != this._props.handleDOMEvents) && yn(this), this.editable = Ar(this), vr(this);
    let a = Zt(this), d = wr(this), c = o.plugins != e.plugins && !o.doc.eq(e.doc) ? "reset" : e.scrollToSelection > o.scrollToSelection ? "to selection" : "preserve", u = s || !this.docView.matchesNode(e.doc, d, a);
    (u || !e.selection.eq(o.selection)) && (i = !0);
    let f = c == "preserve" && i && this.dom.style.overflowAnchor == null && Vi(this);
    if (i) {
      this.domObserver.stop();
      let h = u && (K || $) && !this.composing && !o.selection.empty && !e.selection.empty && la(o.selection, e.selection);
      if (u) {
        let m = $ ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = zl(this)), (s || !this.docView.update(e.doc, d, a, this)) && (this.docView.updateOuterDeco(d), this.docView.destroy(), this.docView = ur(e.doc, d, a, this.dom, this)), m && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (h = !0);
      }
      let p = this.input.mouseDown;
      h || !(p && this.domObserver.currentSelection.eq(this.domSelectionRange()) && ll(this) && p.delaySelUpdate()) ? ae(this, h) : (Co(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(o), !((r = this.dragging) === null || r === void 0) && r.node && !o.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, o), c == "reset" ? this.dom.scrollTop = 0 : c == "to selection" ? this.scrollToSelection() : f && zi(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (n) => n(this))) if (this.state.selection instanceof C) {
        let n = this.docView.domAfterPos(this.state.selection.from);
        n.nodeType == 1 && ir(this, n.getBoundingClientRect(), e);
      } else
        ir(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let n = 0; n < this.directPlugins.length; n++) {
        let r = this.directPlugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let n = 0; n < this.state.plugins.length; n++) {
        let r = this.state.plugins[n];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let n = 0; n < this.pluginViews.length; n++) {
        let r = this.pluginViews[n];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, n) {
    let r = e.node, o = -1;
    if (r.from < this.state.doc.content.size && this.state.doc.nodeAt(r.from) == r.node)
      o = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - n.doc.content.size);
      (s > 0 && s < this.state.doc.content.size && this.state.doc.nodeAt(s)) == r.node && (o = s);
    }
    this.dragging = new Lo(e.slice, e.move, o < 0 ? void 0 : C.create(this.state.doc, o));
  }
  someProp(e, n) {
    let r = this._props && this._props[e], o;
    if (r != null && (o = n ? n(r) : r))
      return o;
    for (let i = 0; i < this.directPlugins.length; i++) {
      let l = this.directPlugins[i].props[e];
      if (l != null && (o = n ? n(l) : l))
        return o;
    }
    let s = this.state.plugins;
    if (s)
      for (let i = 0; i < s.length; i++) {
        let l = s[i].props[e];
        if (l != null && (o = n ? n(l) : l))
          return o;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (K) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Li(this.dom), ae(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let n = this.dom.parentNode; n; n = n.parentNode)
        if (n.nodeType == 9 || n.nodeType == 11 && n.host)
          return n.getSelection || (Object.getPrototypeOf(n).getSelection = () => n.ownerDocument.getSelection()), this._root = n;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return Wi(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, n = 1) {
    return mo(this, e, n);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, n = 0) {
    return this.docView.domFromPos(e, n);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let n = this.docView.descAt(e);
    return n ? n.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, n, r = -1) {
    let o = this.docView.posFromDOM(e, n, r);
    if (o == null)
      throw new RangeError("DOM position not inside the editor");
    return o;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, n) {
    return Yi(this, n || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, n) {
    return ot(this, "", e, !1, n || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, n) {
    return ot(this, e, null, !0, n || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Rn(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (Dl(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Zt(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, Ei());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return Nl(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? z && this.root.nodeType === 11 && Pi(this.dom.ownerDocument) == this.dom && Xl(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
Wo.prototype.dispatch = function(t) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, t) : this.updateState(this.state.apply(t));
};
function wr(t) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(t.editable), t.someProp("attributes", (n) => {
    if (typeof n == "function" && (n = n(t.state)), n)
      for (let r in n)
        r == "class" ? e.class += " " + n[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + n[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(n[r]));
  }), e.translate || (e.translate = "no"), [de.node(0, t.state.doc.content.size, e)];
}
function vr(t) {
  if (t.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), t.cursorWrapper = { dom: e, deco: de.widget(t.state.selection.from, e, { raw: !0, marks: t.markCursor }) };
  } else
    t.cursorWrapper = null;
}
function Ar(t) {
  return !t.someProp("editable", (e) => e(t.state) === !1);
}
function la(t, e) {
  let n = Math.min(t.$anchor.sharedDepth(t.head), e.$anchor.sharedDepth(e.head));
  return t.$anchor.start(n) != e.$anchor.start(n);
}
function Pr(t) {
  let e = /* @__PURE__ */ Object.create(null);
  function n(r) {
    for (let o in r)
      Object.prototype.hasOwnProperty.call(e, o) || (e[o] = r[o]);
  }
  return t.someProp("nodeViews", n), t.someProp("markViews", n), e;
}
function aa(t, e) {
  let n = 0, r = 0;
  for (let o in t) {
    if (t[o] != e[o])
      return !0;
    n++;
  }
  for (let o in e)
    r++;
  return n != r;
}
function Rr(t) {
  if (t.spec.state || t.spec.filterTransaction || t.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var Se = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Ot = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, ca = typeof navigator < "u" && /Mac/.test(navigator.platform), da = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var I = 0; I < 10; I++) Se[48 + I] = Se[96 + I] = String(I);
for (var I = 1; I <= 24; I++) Se[I + 111] = "F" + I;
for (var I = 65; I <= 90; I++)
  Se[I] = String.fromCharCode(I + 32), Ot[I] = String.fromCharCode(I);
for (var tn in Se) Ot.hasOwnProperty(tn) || (Ot[tn] = Se[tn]);
function ua(t) {
  var e = ca && t.metaKey && t.shiftKey && !t.ctrlKey && !t.altKey || da && t.shiftKey && t.key && t.key.length == 1 || t.key == "Unidentified", n = !e && t.key || (t.shiftKey ? Ot : Se)[t.keyCode] || t.key || "Unidentified";
  return n == "Esc" && (n = "Escape"), n == "Del" && (n = "Delete"), n == "Left" && (n = "ArrowLeft"), n == "Up" && (n = "ArrowUp"), n == "Right" && (n = "ArrowRight"), n == "Down" && (n = "ArrowDown"), n;
}
const fa = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), ha = typeof navigator < "u" && /Win/.test(navigator.platform);
function pa(t) {
  let e = t.split(/-(?!$)/), n = e[e.length - 1];
  n == "Space" && (n = " ");
  let r, o, s, i;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      i = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      o = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      fa ? i = !0 : o = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (n = "Alt-" + n), o && (n = "Ctrl-" + n), i && (n = "Meta-" + n), s && (n = "Shift-" + n), n;
}
function ma(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t)
    e[pa(n)] = t[n];
  return e;
}
function nn(t, e, n = !0) {
  return e.altKey && (t = "Alt-" + t), e.ctrlKey && (t = "Ctrl-" + t), e.metaKey && (t = "Meta-" + t), n && e.shiftKey && (t = "Shift-" + t), t;
}
function ga(t) {
  return new G({ props: { handleKeyDown: ya(t) } });
}
function ya(t) {
  let e = ma(t);
  return function(n, r) {
    let o = ua(r), s, i = e[nn(o, r)];
    if (i && i(n.state, n.dispatch, n))
      return !0;
    if (o.length == 1 && o != " ") {
      if (r.shiftKey) {
        let l = e[nn(o, r, !1)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(ha && r.ctrlKey && r.altKey) && (s = Se[r.keyCode]) && s != o) {
        let l = e[nn(s, r)];
        if (l && l(n.state, n.dispatch, n))
          return !0;
      }
    }
    return !1;
  };
}
function mt(t) {
  const { state: e, transaction: n } = t;
  let { selection: r } = n, { doc: o } = n, { storedMarks: s } = n;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return o;
    },
    get tr() {
      return r = n.selection, o = n.doc, s = n.storedMarks, n;
    }
  };
}
var ve = class _o {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: n, state: r } = this, { view: o } = n, { tr: s } = r, i = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...c) => {
      const u = a(...c)(i);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(s), u;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, n = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, l = [], a = !!e, d = e || s.tr, c = () => (!a && n && !d.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(d), l.every((f) => f === !0)), u = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...m) => {
        const g = this.buildProps(d, n), y = h(...m)(g);
        return l.push(y), u;
      }])),
      run: c
    };
    return u;
  }
  /**
  * Creates a chain that safely returns `false` when run.
  * @returns A non-dispatching command chain.
  * @example
  * const chain = CommandManager.createFakeChain()
  * chain.focus().run() // false
  */
  static createFakeChain() {
    const e = new Proxy({}, { get: (n, r) => {
      if (r !== "then")
        return r === "run" ? () => !1 : () => e;
    } });
    return e;
  }
  createCan(e) {
    const { rawCommands: n, state: r } = this, o = !1, s = e || r.tr, i = this.buildProps(s, o);
    return {
      ...Object.fromEntries(Object.entries(n).map(([l, a]) => [l, (...d) => a(...d)({
        ...i,
        dispatch: void 0
      })])),
      chain: () => this.createChain(s, o)
    };
  }
  /**
  * Creates capability checks that safely return `false`.
  * @returns A non-dispatching capability checker.
  * @example
  * const can = CommandManager.createFallbackCan()
  * can.focus() // false
  */
  static createFallbackCan() {
    const e = _o.createFakeChain();
    return new Proxy({ chain: () => e }, { get: (n, r) => {
      if (r !== "then")
        return r === "chain" ? n.chain : () => !1;
    } });
  }
  buildProps(e, n = !0) {
    const { rawCommands: r, editor: o, state: s } = this, { view: i } = o, l = {
      tr: e,
      editor: o,
      view: i,
      state: mt({
        state: s,
        transaction: e
      }),
      dispatch: n ? () => {
      } : void 0,
      chain: () => this.createChain(e, n),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, d]) => [a, (...c) => d(...c)(l)]));
      }
    };
    return l;
  }
};
const ba = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  if (!t.isDestroyed) {
    var n;
    e.dom.blur(), (n = window) === null || n === void 0 || (n = n.getSelection()) === null || n === void 0 || n.removeAllRanges();
  }
}), !0), Sa = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), ka = () => ({ state: t, tr: e, dispatch: n }) => {
  const { selection: r } = e, { ranges: o } = r;
  return n && o.forEach(({ $from: s, $to: i }) => {
    t.doc.nodesBetween(s.pos, i.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: d, mapping: c } = e, u = d.resolve(c.map(a)), f = d.resolve(c.map(a + l.nodeSize)), h = u.blockRange(f);
      if (!h) return;
      const p = Ue(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = u.parent.contentMatchAt(u.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, Ma = (t) => (e) => t(e), xa = () => ({ state: t, dispatch: e }) => ro(t, e), Ca = (t, e) => ({ editor: n, tr: r }) => {
  const { state: o } = n, s = o.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const i = r.mapping.map(e);
  return r.insert(i, s.content), r.setSelection(new E(r.doc.resolve(Math.max(i - 1, 0)))), !0;
}, Da = () => ({ tr: t, dispatch: e }) => {
  const { selection: n } = t, r = n.$anchor.node();
  if (r.content.size > 0) return !1;
  const o = t.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === r.type) {
    if (e) {
      const i = o.before(s), l = o.after(s);
      t.delete(i, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
};
function P(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t]) throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
const Ta = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const o = P(t, n.schema), s = e.selection.$anchor;
  for (let i = s.depth; i > 0; i -= 1) if (s.node(i).type === o) {
    if (r) {
      const l = s.before(i), a = s.after(i);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Na = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: o } = t;
  return n && e.delete(r, o), !0;
}, Ea = (t) => t.content ? /^text(\*|\+)/.test(t.content) : !1, Ir = (t, e, n) => {
  if (!t.parent.isInline || n === "left" && t.pos > t.start() || n === "right" && t.pos < t.end()) return t.pos;
  const r = e.nodes[t.parent.type.name].spec;
  return Ea(r) ? n === "left" ? t.start() - 1 : t.end() + 1 : t.pos;
}, Oa = (t, e, n) => ({
  from: Ir(t, n, "left"),
  to: Ir(e, n, "right")
}), wa = () => ({ state: t, dispatch: e }) => {
  if (t.selection.empty) return !1;
  if (e) {
    const n = t.tr, { ranges: r } = t.selection, o = n.steps.length;
    r.forEach((s) => {
      const i = n.mapping.slice(o), l = n.doc.resolve(i.map(s.$from.pos)), a = n.doc.resolve(i.map(s.$to.pos)), { from: d, to: c } = Oa(l, a, t.schema);
      n.deleteRange(d, c);
    }), n.selection.empty || n.setSelection(E.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), e(n);
  }
  return !0;
}, va = () => ({ commands: t }) => t.keyboardShortcut("Enter"), Aa = () => ({ state: t, dispatch: e }) => fi(t, e);
function Bt(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function it(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((o) => n.strict ? e[o] === t[o] : Bt(e[o]) ? e[o].test(t[o]) : e[o] === t[o]) : !0;
}
function qo(t, e, n = {}) {
  return t.find((r) => r.type === e && it(Object.fromEntries(Object.keys(n).map((o) => [o, r.attrs[o]])), n));
}
function $r(t, e, n = {}) {
  return !!qo(t, e, n);
}
function Vt(t, e, n) {
  if (!t || !e) return;
  let r = t.parent.childAfter(t.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = t.parent.childBefore(t.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!n) {
    const a = r.node.marks.find((d) => d.type === e);
    a && (n = a.attrs);
  }
  if (!qo([...r.node.marks], e, n)) return;
  let o = r.index, s = t.start() + r.offset, i = o + 1, l = s + r.node.nodeSize;
  for (; o > 0 && $r([...t.parent.child(o - 1).marks], e, n); )
    o -= 1, s -= t.parent.child(o).nodeSize;
  for (; i < t.parent.childCount && $r([...t.parent.child(i).marks], e, n); )
    l += t.parent.child(i).nodeSize, i += 1;
  return {
    from: s,
    to: l
  };
}
function te(t, e) {
  if (typeof t == "string") {
    if (!e.marks[t]) throw Error(`There is no mark type named '${t}'. Maybe you forgot to add the extension?`);
    return e.marks[t];
  }
  return t;
}
const Pa = (t, e) => ({ tr: n, state: r, dispatch: o }) => {
  const s = te(t, r.schema), { doc: i, selection: l } = n, { $from: a, from: d, to: c } = l;
  if (o) {
    const u = Vt(a, s, e);
    if (u && u.from <= d && u.to >= c) {
      const f = E.create(i, u.from, u.to);
      n.setSelection(f);
    }
  }
  return !0;
}, Ra = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1) if (n[r](e)) return !0;
  return !1;
};
function zt(t) {
  return t instanceof E;
}
function Z(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function wt(t, e = null) {
  if (!e) return null;
  const n = L.atStart(t), r = L.atEnd(t);
  if (e === "start" || e === !0) return n;
  if (e === "end") return r;
  const o = n.from, s = r.to;
  return e === "all" ? E.create(t, Z(0, o, s), Z(t.content.size, o, s)) : E.create(t, Z(e, o, s), Z(e, o, s));
}
function lt() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Re() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Uo() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Ia = (t = null, e = {}) => ({ editor: n, view: r, tr: o, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const i = () => {
    (Re() || lt()) && r.dom.focus(), Uo() && !Re() && !lt() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e?.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && t === null || t === !1) return !0;
  } catch {
    return !1;
  }
  if (s && t === null && !zt(n.state.selection))
    return i(), !0;
  const l = wt(o.doc, t) || n.state.selection, a = n.state.selection.eq(l);
  return s && (a || o.setSelection(l), a && o.storedMarks && o.setStoredMarks(o.storedMarks), i()), !0;
}, $a = (t, e) => (n) => t.every((r, o) => e(r, {
  ...n,
  index: o
})), Ba = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({
  from: n.selection.from,
  to: n.selection.to
}, t, e), Jo = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && Jo(r);
  }
  return t;
};
function Fe(t) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return Jo(n);
}
function Yo(t) {
  return typeof t?.nodesBetween == "function";
}
function Ie(t, e, n) {
  if (Yo(t)) return t;
  const r = typeof t == "object" && t !== null;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const o = typeof t == "string";
  if (r) try {
    if (Array.isArray(t) && t.length > 0) return T.fromArray(t.map((i) => e.nodeFromJSON(i)));
    const s = e.nodeFromJSON(t);
    return n.errorOnInvalidContent && s.check(), s;
  } catch (s) {
    if (n.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", s), Ie("", e, n);
  }
  if (o) {
    if (n.errorOnInvalidContent) {
      let i = !1, l = "";
      const a = new qr({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (d) => (i = !0, l = typeof d == "string" ? d : d.outerHTML, null)
          }]
        } })
      });
      if (n.slice ? je.fromSchema(a).parseSlice(Fe(t), n.parseOptions) : je.fromSchema(a).parse(Fe(t), n.parseOptions), n.errorOnInvalidContent && i) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const s = je.fromSchema(e);
    return n.slice ? s.parseSlice(Fe(t), n.parseOptions).content : s.parse(Fe(t), n.parseOptions);
  }
  return Ie("", e, n);
}
function Go(t) {
  return !("type" in t);
}
function Ln(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e) return;
  const o = t.steps[r];
  if (!(o instanceof Dn || o instanceof Ae)) return;
  const s = t.mapping.maps[r];
  let i = 0;
  s.forEach((l, a, d, c) => {
    i === 0 && (i = c);
  }), t.setSelection(L.near(t.doc.resolve(i), n));
}
const Va = (t, e, n) => ({ tr: r, dispatch: o, editor: s }) => {
  if (o) {
    n = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...n
    };
    let l;
    const a = (g) => {
      s.emit("contentError", {
        editor: s,
        error: g,
        disableCollaboration: () => {
          "collaboration" in s.storage && typeof s.storage.collaboration == "object" && s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, d = {
      preserveWhitespace: "full",
      ...n.parseOptions
    };
    if (!n.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError) try {
      Ie(e, s.schema, {
        parseOptions: d,
        errorOnInvalidContent: !0
      });
    } catch (g) {
      a(g);
    }
    try {
      var i;
      l = Ie(e, s.schema, {
        parseOptions: d,
        errorOnInvalidContent: (i = n.errorOnInvalidContent) !== null && i !== void 0 ? i : s.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: c, to: u } = typeof t == "number" ? {
      from: t,
      to: t
    } : {
      from: t.from,
      to: t.to
    }, f = !0, h = !0;
    const p = Go(l) ? l.content : [l];
    if (p.forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), c === u && h) {
      const { parent: g } = r.doc.resolve(c);
      g.isTextblock && !g.type.spec.code && !g.childCount && (c -= 1, u += 1);
    }
    let m;
    if (f)
      Array.isArray(e) ? m = e.map((g) => g.text || "").join("") : Yo(e) ? m = p.map((g) => {
        var y;
        return (y = g.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? m = e.text : m = e, r.insertText(m, c, u);
    else {
      m = T.from(p);
      const g = r.doc.resolve(c), y = g.node(), S = g.parentOffset === 0, b = y.isText || y.isTextblock, M = y.content.size > 0;
      S && b && M && h && (c = Math.max(0, c - 1)), r.replaceWith(c, u, p);
    }
    n.updateSelection && Ln(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
      from: c,
      text: m
    }), n.applyPasteRules && r.setMeta("applyPasteRules", {
      from: c,
      text: m
    });
  }
  return !0;
};
function Fn(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const za = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { pos: o, attrs: s, content: i, updateSelection: l = !0 } = t;
  let a;
  typeof o == "number" ? a = e.doc.resolve(o) : o ? a = o : a = e.selection.$from;
  const d = Fn(a.parent.contentMatchAt(a.index()));
  if (!d) return !1;
  const c = Object.keys(d.spec.attrs || {}), u = s ? Object.fromEntries(Object.entries(s).filter(([h]) => c.includes(h))) : {};
  let f;
  if (i) {
    const h = Ie(i, r.schema);
    f = d.createAndFill(u, h);
  } else f = d.createAndFill(u);
  return f ? (n && (e.insert(a.pos, f), l && Ln(e, e.steps.length - 1, -1)), !0) : !1;
}, La = () => ({ state: t, dispatch: e }) => ci(t, e), Fa = () => ({ state: t, dispatch: e }) => di(t, e), ja = () => ({ state: t, dispatch: e }) => Gr(t, e), Ha = () => ({ state: t, dispatch: e }) => eo(t, e), Ka = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Pt(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, Wa = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = Pt(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, _a = () => ({ state: t, dispatch: e }) => li(t, e), qa = () => ({ state: t, dispatch: e }) => ai(t, e);
function jn() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Ua(t) {
  const e = t.split(/-(?!$)/);
  let n = e[e.length - 1];
  n === "Space" && (n = " ");
  let r, o, s, i;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) i = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) o = !0;
    else if (/^s(hift)?$/i.test(a)) s = !0;
    else if (/^mod$/i.test(a)) Re() || jn() ? i = !0 : o = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (n = `Alt-${n}`), o && (n = `Ctrl-${n}`), i && (n = `Meta-${n}`), s && (n = `Shift-${n}`), n;
}
const Ja = (t) => ({ editor: e, view: n, tr: r, dispatch: o }) => {
  const s = Ua(t).split(/-(?!$)/), i = s.find((d) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(d)), l = new KeyboardEvent("keydown", {
    key: i === "Space" ? " " : i,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    n.someProp("handleKeyDown", (d) => d(n, l));
  });
  return a?.steps.forEach((d) => {
    const c = d.map(r.mapping);
    c && o && r.maybeStep(c);
  }), !0;
};
function qe(t, e, n = {}) {
  const { from: r, to: o, empty: s } = t.selection, i = e ? P(e, t.schema) : null, l = [];
  t.doc.nodesBetween(r, o, (c, u) => {
    if (c.isText) return;
    const f = Math.max(r, u), h = Math.min(o, u + c.nodeSize);
    l.push({
      node: c,
      from: f,
      to: h
    });
  });
  const a = o - r, d = l.filter((c) => i ? i.name === c.node.type.name : !0).filter((c) => it(c.node.attrs, n, { strict: !1 }));
  return s ? !!d.length : d.reduce((c, u) => c + u.to - u.from, 0) >= a;
}
const Ya = (t, e = {}) => ({ state: n, dispatch: r }) => qe(n, P(t, n.schema), e) ? ui(n, r) : !1, Ga = () => ({ state: t, dispatch: e }) => oo(t, e), Xa = (t) => ({ state: e, dispatch: n }) => Ci(P(t, e.schema))(e, n), Qa = () => ({ state: t, dispatch: e }) => no(t, e);
function gt(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function bn(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, o) => (n.includes(o) || (r[o] = t[o]), r), {});
}
const Za = (t, e) => ({ tr: n, state: r, dispatch: o }) => {
  let s = null, i = null;
  const l = gt(typeof t == "string" ? t : t.name, r.schema);
  if (!l) return !1;
  l === "node" && (s = P(t, r.schema)), l === "mark" && (i = te(t, r.schema));
  let a = !1;
  return n.selection.ranges.forEach((d) => {
    r.doc.nodesBetween(d.$from.pos, d.$to.pos, (c, u) => {
      s && s === c.type && (a = !0, o && n.setNodeMarkup(u, void 0, bn(c.attrs, e))), i && c.marks.length && c.marks.forEach((f) => {
        i === f.type && (a = !0, o && n.addMark(u, u + c.nodeSize, i.create(bn(f.attrs, e))));
      });
    });
  }), a;
}, ec = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), tc = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new Rt(t.doc);
    t.setSelection(n);
  }
  return !0;
}, nc = () => ({ state: t, dispatch: e }) => Qr(t, e), rc = () => ({ state: t, dispatch: e }) => to(t, e), oc = () => ({ state: t, dispatch: e }) => mi(t, e), sc = () => ({ state: t, dispatch: e }) => bi(t, e), ic = () => ({ state: t, dispatch: e }) => yi(t, e);
function vt(t, e, n = {}, r = {}) {
  return Ie(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const lc = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: o, tr: s, dispatch: i, commands: l }) => {
  const { doc: a } = s;
  if (r.preserveWhitespace !== "full") {
    const d = vt(t, o.schema, r, { errorOnInvalidContent: e ?? o.options.enableContentCheck });
    if (i) {
      const c = Go(d) ? d.content : [d];
      s.replaceWith(0, a.content.size, c).setMeta("preventUpdate", !n);
    }
    return !0;
  }
  return i && s.setMeta("preventUpdate", !n), l.insertContentAt({
    from: 0,
    to: a.content.size
  }, t, {
    parseOptions: r,
    errorOnInvalidContent: e ?? o.options.enableContentCheck
  });
};
function Hn(t, e) {
  const n = te(e, t.schema), { from: r, to: o, empty: s } = t.selection, i = [];
  s ? (t.storedMarks && i.push(...t.storedMarks), i.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, o, (a) => {
    i.push(...a.marks);
  });
  const l = i.find((a) => a.type.name === n.name);
  return l ? { ...l.attrs } : {};
}
function Xo(t, e) {
  const n = new si(t);
  return e.forEach((r) => {
    r.steps.forEach((o) => {
      n.step(o);
    });
  }), n;
}
function ac(t, e) {
  const n = [];
  return t.descendants((r, o) => {
    e(r) && n.push({
      node: r,
      pos: o
    });
  }), n;
}
function cc(t, e, n) {
  const r = [];
  return t.nodesBetween(e.from, e.to, (o, s) => {
    n(o) && r.push({
      node: o,
      pos: s
    });
  }), r;
}
function Qo(t, e) {
  for (let n = t.depth; n > 0; n -= 1) {
    const r = t.node(n);
    if (e(r)) return {
      pos: n > 0 ? t.before(n) : 0,
      start: t.start(n),
      depth: n,
      node: r
    };
  }
}
function yt(t) {
  return (e) => Qo(e.$from, t);
}
function k(t, e, n) {
  return t.config[e] === void 0 && t.parent ? k(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? k(t.parent, e, n) : null
  }) : t.config[e];
}
function Lt(t) {
  return t.map((e) => {
    const n = k(e, "addExtensions", {
      name: e.name,
      options: e.options,
      storage: e.storage
    });
    return n ? [e, ...Lt(n())] : e;
  }).flat(10);
}
function bt(t, e) {
  const n = ct.fromSchema(e).serializeFragment(t), r = document.implementation.createHTMLDocument().createElement("div");
  return r.appendChild(n), r.innerHTML;
}
function Kn(t) {
  return typeof t == "function";
}
function O(t, e = void 0, ...n) {
  return Kn(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function Zo(t = {}) {
  return Object.keys(t).length === 0 && t.constructor === Object;
}
function $e(t) {
  return {
    baseExtensions: t.filter((e) => e.type === "extension"),
    nodeExtensions: t.filter((e) => e.type === "node"),
    markExtensions: t.filter((e) => e.type === "mark")
  };
}
function Wn(t) {
  const e = [], { nodeExtensions: n, markExtensions: r } = $e(t), o = [...n, ...r], s = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  }, i = n.filter((d) => d.name !== "text").map((d) => d.name), l = r.map((d) => d.name), a = [...i, ...l];
  return t.forEach((d) => {
    const c = k(d, "addGlobalAttributes", {
      name: d.name,
      options: d.options,
      storage: d.storage,
      extensions: o
    });
    c && c().forEach((u) => {
      let f;
      Array.isArray(u.types) ? f = u.types : u.types === "*" ? f = a : u.types === "nodes" ? f = i : u.types === "marks" ? f = l : f = [], f.forEach((h) => {
        Object.entries(u.attributes).forEach(([p, m]) => {
          e.push({
            type: h,
            name: p,
            attribute: {
              ...s,
              ...m
            }
          });
        });
      });
    });
  }), o.forEach((d) => {
    const c = k(d, "addAttributes", {
      name: d.name,
      options: d.options,
      storage: d.storage
    });
    if (!c) return;
    const u = c();
    Object.entries(u).forEach(([f, h]) => {
      const p = {
        ...s,
        ...h
      };
      typeof p?.default == "function" && (p.default = p.default()), p?.isRequired && p?.default === void 0 && delete p.default, e.push({
        type: d.name,
        name: f,
        attribute: p
      });
    });
  }), e;
}
function dc(t) {
  const e = [];
  let n = "", r = !1, o = !1, s = 0;
  const i = t.length;
  for (let l = 0; l < i; l += 1) {
    const a = t[l];
    if (a === "'" && !o) {
      r = !r, n += a;
      continue;
    }
    if (a === '"' && !r) {
      o = !o, n += a;
      continue;
    }
    if (!r && !o) {
      if (a === "(") {
        s += 1, n += a;
        continue;
      }
      if (a === ")" && s > 0) {
        s -= 1, n += a;
        continue;
      }
      if (a === ";" && s === 0) {
        e.push(n), n = "";
        continue;
      }
    }
    n += a;
  }
  return n && e.push(n), e;
}
function Br(t) {
  const e = [], n = dc(t || ""), r = n.length;
  for (let o = 0; o < r; o += 1) {
    const s = n[o], i = s.indexOf(":");
    if (i === -1) continue;
    const l = s.slice(0, i).trim(), a = s.slice(i + 1).trim();
    l && a && e.push([l, a]);
  }
  return e;
}
function es(...t) {
  return t.filter((e) => !!e).reduce((e, n) => {
    const r = { ...e };
    return Object.entries(n).forEach(([o, s]) => {
      if (!r[o]) {
        r[o] = s;
        return;
      }
      if (o === "class") {
        const i = s ? String(s).split(" ") : [], l = r[o] ? r[o].split(" ") : [], a = i.filter((d) => !l.includes(d));
        r[o] = [...l, ...a].join(" ");
      } else if (o === "style") {
        const i = new Map([...Br(r[o]), ...Br(s)]);
        r[o] = Array.from(i.entries()).map(([l, a]) => `${l}: ${a}`).join("; ");
      } else r[o] = s;
    }), r;
  }, {});
}
function at(t, e) {
  return e.filter((n) => n.type === t.type.name).filter((n) => n.attribute.rendered).map((n) => n.attribute.renderHTML ? n.attribute.renderHTML(t.attrs) || {} : { [n.name]: t.attrs[n.name] }).reduce((n, r) => es(n, r), {});
}
function ts(t) {
  return typeof t != "string" ? t : t.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(t) : t === "true" ? !0 : t === "false" ? !1 : t;
}
function Sn(t, e) {
  return "style" in t ? t : {
    ...t,
    getAttrs: (n) => {
      const r = t.getAttrs ? t.getAttrs(n) : t.attrs;
      if (r === !1) return !1;
      const o = e.reduce((s, i) => {
        const l = i.attribute.parseHTML ? i.attribute.parseHTML(n) : ts(n.getAttribute(i.name));
        return l == null ? s : {
          ...s,
          [i.name]: l
        };
      }, {});
      return {
        ...r,
        ...o
      };
    }
  };
}
function Vr(t) {
  return Object.fromEntries(Object.entries(t).filter(([e, n]) => e === "attrs" && Zo(n) ? !1 : n != null));
}
function zr(t) {
  var e, n;
  const r = {};
  return !(!(t == null || (e = t.attribute) === null || e === void 0) && e.isRequired) && "default" in (t?.attribute || {}) && (r.default = t.attribute.default), (t == null || (n = t.attribute) === null || n === void 0 ? void 0 : n.validate) !== void 0 && (r.validate = t.attribute.validate), [t.name, r];
}
function _n(t, e) {
  var n;
  const r = Wn(t), { nodeExtensions: o, markExtensions: s } = $e(t);
  return new qr({
    topNode: (n = o.find((i) => k(i, "topNode"))) === null || n === void 0 ? void 0 : n.name,
    nodes: Object.fromEntries(o.map((i) => {
      const l = r.filter((h) => h.type === i.name), a = {
        name: i.name,
        options: i.options,
        storage: i.storage,
        editor: e
      }, d = Vr({
        ...t.reduce((h, p) => {
          const m = k(p, "extendNodeSchema", a);
          return {
            ...h,
            ...m ? m(i) : {}
          };
        }, {}),
        content: O(k(i, "content", a)),
        marks: O(k(i, "marks", a)),
        group: O(k(i, "group", a)),
        inline: O(k(i, "inline", a)),
        atom: O(k(i, "atom", a)),
        selectable: O(k(i, "selectable", a)),
        draggable: O(k(i, "draggable", a)),
        code: O(k(i, "code", a)),
        whitespace: O(k(i, "whitespace", a)),
        linebreakReplacement: O(k(i, "linebreakReplacement", a)),
        defining: O(k(i, "defining", a)),
        isolating: O(k(i, "isolating", a)),
        attrs: Object.fromEntries(l.map(zr))
      }), c = O(k(i, "parseHTML", a));
      c && (d.parseDOM = c.map((h) => Sn(h, l)));
      const u = k(i, "renderHTML", a);
      u && (d.toDOM = (h) => u({
        node: h,
        HTMLAttributes: at(h, l)
      }));
      const f = k(i, "renderText", a);
      return f && (d.toText = f), [i.name, d];
    })),
    marks: Object.fromEntries(s.map((i) => {
      const l = r.filter((f) => f.type === i.name), a = {
        name: i.name,
        options: i.options,
        storage: i.storage,
        editor: e
      }, d = Vr({
        ...t.reduce((f, h) => {
          const p = k(h, "extendMarkSchema", a);
          return {
            ...f,
            ...p ? p(i) : {}
          };
        }, {}),
        inclusive: O(k(i, "inclusive", a)),
        excludes: O(k(i, "excludes", a)),
        group: O(k(i, "group", a)),
        spanning: O(k(i, "spanning", a)),
        code: O(k(i, "code", a)),
        attrs: Object.fromEntries(l.map(zr))
      }), c = O(k(i, "parseHTML", a));
      c && (d.parseDOM = c.map((f) => Sn(f, l)));
      const u = k(i, "renderHTML", a);
      return u && (d.toDOM = (f) => u({
        mark: f,
        HTMLAttributes: at(f, l)
      })), [i.name, d];
    }))
  });
}
function ns(t) {
  const e = t.filter((n, r) => t.indexOf(n) !== r);
  return Array.from(new Set(e));
}
function He(t) {
  return t.sort((n, r) => {
    const o = k(n, "priority") || 100, s = k(r, "priority") || 100;
    return o > s ? -1 : o < s ? 1 : 0;
  });
}
function Ft(t) {
  const e = He(Lt(t)), n = ns(e.map((r) => r.name));
  return n.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((r) => `'${r}'`).join(", ")}]. This can lead to issues.`), e;
}
function jt(t, e) {
  return _n(Ft(t), e);
}
function uc(t, e) {
  const n = jt(e);
  return bt(Ur.fromJSON(n, t).content, n);
}
function fc(t, e) {
  const n = jt(e), r = Fe(t);
  return je.fromSchema(n).parse(r).toJSON();
}
function qn(t, e, n) {
  const { from: r, to: o } = e, { blockSeparator: s = `

`, textSerializers: i = {} } = n || {};
  let l = "";
  return t.nodesBetween(r, o, (a, d, c, u) => {
    a.isBlock && d > r && (l += s);
    const f = i?.[a.type.name];
    if (f)
      return c && (l += f({
        node: a,
        pos: d,
        parent: c,
        index: u,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, d) - d, o - d);
    }
  }), l;
}
function Un(t, e) {
  return qn(t, {
    from: 0,
    to: t.content.size
  }, e);
}
function Ht(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
function hc(t, e, n) {
  const { blockSeparator: r = `

`, textSerializers: o = {} } = n || {}, s = jt(e);
  return Un(Ur.fromJSON(s, t), {
    blockSeparator: r,
    textSerializers: {
      ...Ht(s),
      ...o
    }
  });
}
function rs(t, e) {
  const n = P(e, t.schema), { from: r, to: o } = t.selection, s = [];
  t.doc.nodesBetween(r, o, (l) => {
    s.push(l);
  });
  const i = s.reverse().find((l) => l.type.name === n.name);
  return i ? { ...i.attrs } : {};
}
function ss(t, e) {
  const n = gt(typeof e == "string" ? e : e.name, t.schema);
  return n === "node" ? rs(t, e) : n === "mark" ? Hn(t, e) : {};
}
function is(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const o = e(r);
    return Object.prototype.hasOwnProperty.call(n, o) ? !1 : n[o] = !0;
  });
}
function pc(t) {
  const e = is(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((o, s) => s !== r).some((o) => n.oldRange.from >= o.oldRange.from && n.oldRange.to <= o.oldRange.to && n.newRange.from >= o.newRange.from && n.newRange.to <= o.newRange.to));
}
function Jn(t) {
  const { mapping: e, steps: n } = t, r = [];
  return e.maps.forEach((o, s) => {
    const i = [];
    if (o.ranges.length)
      o.forEach((l, a) => {
        i.push({
          from: l,
          to: a
        });
      });
    else {
      const { from: l, to: a } = n[s];
      if (l === void 0 || a === void 0) return;
      i.push({
        from: l,
        to: a
      });
    }
    i.forEach(({ from: l, to: a }) => {
      const d = e.slice(s).map(l, -1), c = e.slice(s).map(a), u = e.invert().map(d, -1), f = e.invert().map(c);
      r.push({
        oldRange: {
          from: u,
          to: f
        },
        newRange: {
          from: d,
          to: c
        }
      });
    });
  }), pc(r);
}
function ls(t, e = 0) {
  const n = t.type === t.type.schema.topNodeType ? 0 : 1, r = e, o = r + t.nodeSize, s = t.marks.map((a) => {
    const d = { type: a.type.name };
    return Object.keys(a.attrs).length && (d.attrs = { ...a.attrs }), d;
  }), i = { ...t.attrs }, l = {
    type: t.type.name,
    from: r,
    to: o
  };
  return Object.keys(i).length && (l.attrs = i), s.length && (l.marks = s), t.content.childCount && (l.content = [], t.forEach((a, d) => {
    var c;
    (c = l.content) === null || c === void 0 || c.push(ls(a, e + d + n));
  })), t.text && (l.text = t.text), l;
}
function Yn(t, e, n) {
  const r = [];
  return t === e ? n.resolve(t).marks().forEach((o) => {
    const s = Vt(n.resolve(t), o.type);
    s && r.push({
      mark: o,
      ...s
    });
  }) : n.nodesBetween(t, e, (o, s) => {
    !o || o?.nodeSize === void 0 || r.push(...o.marks.map((i) => ({
      from: s,
      to: s + o.nodeSize,
      mark: i
    })));
  }), r;
}
const mc = (t, e, n, r = 20) => {
  const o = t.doc.resolve(n);
  let s = r, i = null;
  for (; s > 0 && i === null; ) {
    const l = o.node(s);
    l?.type.name === e ? i = l : s -= 1;
  }
  return [i, s];
}, gc = (t) => {
  const e = t.depth - 1;
  if (e < 0) return null;
  const n = t.index(e);
  return n === 0 ? null : t.node(e).child(n - 1);
};
function Ce(t, e) {
  return e.nodes[t] || e.marks[t] || null;
}
function nt(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const o = t.find((s) => s.type === e && s.name === r);
    return o ? o.attribute.keepOnSplit : !1;
  }));
}
const as = (t, e = 500) => {
  let n = "";
  const r = t.parentOffset;
  return t.parent.nodesBetween(Math.max(0, r - e), r, (o, s, i, l) => {
    var a, d;
    const c = ((a = (d = o.type.spec).toText) === null || a === void 0 ? void 0 : a.call(d, {
      node: o,
      pos: s,
      parent: i,
      index: l
    })) || o.textContent || "%leaf%";
    n += o.isAtom && !o.isText ? c : c.slice(0, Math.max(0, r - s));
  }), n;
};
function At(t, e, n = {}) {
  const { empty: r, ranges: o } = t.selection, s = e ? te(e, t.schema) : null;
  if (r) return !!(t.storedMarks || t.selection.$from.marks()).filter((c) => s ? s.name === c.type.name : !0).find((c) => it(c.attrs, n, { strict: !1 }));
  let i = 0;
  const l = [];
  if (o.forEach(({ $from: c, $to: u }) => {
    const f = c.pos, h = u.pos;
    t.doc.nodesBetween(f, h, (p, m) => {
      if (s && p.inlineContent && !p.type.allowsMarkType(s)) return !1;
      if (!p.isText && !p.marks.length) return;
      const g = Math.max(f, m), y = Math.min(h, m + p.nodeSize), S = y - g;
      i += S, l.push(...p.marks.map((b) => ({
        mark: b,
        from: g,
        to: y
      })));
    });
  }), i === 0) return !1;
  const a = l.filter((c) => s ? s.name === c.mark.type.name : !0).filter((c) => it(c.mark.attrs, n, { strict: !1 })).reduce((c, u) => c + u.to - u.from, 0), d = l.filter((c) => s ? c.mark.type !== s && c.mark.type.excludes(s) : !0).reduce((c, u) => c + u.to - u.from, 0);
  return (a > 0 ? a + d : a) >= i;
}
function cs(t, e, n = {}) {
  if (!e) return qe(t, null, n) || At(t, null, n);
  const r = gt(e, t.schema);
  return r === "node" ? qe(t, e, n) : r === "mark" ? At(t, e, n) : !1;
}
const yc = (t, e) => {
  const { $from: n, $to: r, $anchor: o } = t.selection;
  if (e) {
    const s = yt((l) => l.type.name === e)(t.selection);
    if (!s) return !1;
    const i = t.doc.resolve(s.pos + 1);
    return o.pos + 1 === i.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || n.pos !== r.pos);
}, bc = (t) => {
  const { $from: e, $to: n } = t.selection;
  return !(e.parentOffset > 0 || e.pos !== n.pos);
};
function kn(t, e) {
  return Array.isArray(e) ? e.some((n) => (typeof n == "string" ? n : n.name) === t.name) : e;
}
function xt(t, e) {
  const { nodeExtensions: n } = $e(e), r = n.find((s) => s.name === t);
  if (!r) return !1;
  const o = O(k(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Kt(t, { checkChildren: e = !0, ignoreWhitespace: n = !1 } = {}) {
  if (n) {
    if (t.type.name === "hardBreak") return !0;
    if (t.isText) {
      var r;
      return !/\S/.test((r = t.text) !== null && r !== void 0 ? r : "");
    }
  }
  if (t.isText) return !t.text;
  if (t.isAtom || t.isLeaf) return !1;
  if (t.content.childCount === 0) return !0;
  if (e) {
    let o = !0;
    return t.content.forEach((s) => {
      o !== !1 && (Kt(s, {
        ignoreWhitespace: n,
        checkChildren: e
      }) || (o = !1));
    }), o;
  }
  return !1;
}
function Sc(t) {
  return t instanceof C;
}
function kc({ selection: t, pos: e, nodeSize: n, selectedOnTextSelection: r = !1 }) {
  const { from: o, to: s } = t;
  return !!(o <= e && s >= e + n || r && zt(t) && o > e && s < e + n);
}
function ue(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  return !(typeof e.apply != "function" || typeof e.getMap != "function" || typeof e.invert != "function" || typeof e.map != "function" || typeof e.merge != "function" || typeof e.toJSON != "function");
}
function Mc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "addMark");
}
function xc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "addNodeMark");
}
function Cc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "attr");
}
function Dc(t) {
  return t === null || typeof t != "object" ? !1 : "forEachCell" in t && typeof t.forEachCell == "function";
}
function Tc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "docAttr");
}
function ds(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  return !(!Array.isArray(e.content) || typeof e.size != "number" || typeof e.nodesBetween != "function" || typeof e.descendants != "function" || typeof e.textBetween != "function" || typeof e.append != "function" || typeof e.cut != "function" || typeof e.eq != "function" || typeof e.child != "function" || typeof e.forEach != "function");
}
function Nc(t) {
  return t === null || typeof t != "object" ? !1 : "node" in t && t.node != null;
}
function Ec(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "removeMark");
}
function Oc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "removeNodeMark");
}
function wc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "replaceAround");
}
function vc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t;
  if (!ue(e)) return !1;
  const n = e.toJSON();
  return !(n === null || typeof n != "object" || n.stepType !== "replace");
}
function Ac(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t, n = Number.isInteger(e.openStart) && e.openStart >= 0, r = Number.isInteger(e.openEnd) && e.openEnd >= 0, o = typeof e.size == "number" && typeof e.eq == "function" && typeof e.toJSON == "function";
  if (!n || !r || !o) return !1;
  const s = e.content;
  return !(s === null || typeof s != "object" || !ds(s));
}
function Pc(t) {
  if (t === null || typeof t != "object") return !1;
  const e = t, n = e.doc !== null && typeof e.doc == "object" && e.failed === null, r = typeof e.failed == "string" && e.doc === null;
  return !(!n && !r);
}
var Gn = class us {
  constructor(e) {
    this.position = e;
  }
  /**
  * Creates a MappablePosition from a JSON object.
  */
  static fromJSON(e) {
    return new us(e.position);
  }
  /**
  * Converts the MappablePosition to a JSON object.
  */
  toJSON() {
    return { position: this.position };
  }
};
function fs(t, e) {
  const n = e.mapping.mapResult(t.position);
  return {
    position: new Gn(n.pos),
    mapResult: n
  };
}
function hs(t) {
  return new Gn(t);
}
function Rc(t, e, n) {
  const o = t.state.doc.content.size, s = Z(e, 0, o), i = Z(n, 0, o), l = t.coordsAtPos(s), a = t.coordsAtPos(i, -1), d = Math.min(l.top, a.top), c = Math.max(l.bottom, a.bottom), u = Math.min(l.left, a.left), f = Math.max(l.right, a.right), h = {
    top: d,
    bottom: c,
    left: u,
    right: f,
    width: f - u,
    height: c - d,
    x: u,
    y: d
  };
  return {
    ...h,
    toJSON: () => h
  };
}
function ps({ json: t, validMarks: e, validNodes: n, options: r, rewrittenContent: o = [] }) {
  return t.marks && Array.isArray(t.marks) && (t.marks = t.marks.filter((s) => {
    if (s == null) return !1;
    const i = typeof s == "string" ? s : s.type;
    return e.has(i) ? !0 : (o.push({
      original: JSON.parse(JSON.stringify(s)),
      unsupported: i
    }), !1);
  })), t.content && Array.isArray(t.content) && (t.content = t.content.map((s) => s == null ? null : ps({
    json: s,
    validMarks: e,
    validNodes: n,
    options: r,
    rewrittenContent: o
  }).json).filter((s) => s != null)), t.type && !n.has(t.type) ? (o.push({
    original: JSON.parse(JSON.stringify(t)),
    unsupported: t.type
  }), t.content && Array.isArray(t.content) && r?.fallbackToParagraph !== !1 ? (t.type = "paragraph", {
    json: t,
    rewrittenContent: o
  }) : {
    json: null,
    rewrittenContent: o
  }) : {
    json: t,
    rewrittenContent: o
  };
}
function Ic(t, e, n) {
  return ps({
    json: t,
    validNodes: new Set(Object.keys(e.nodes)),
    validMarks: new Set(Object.keys(e.marks)),
    options: n
  });
}
function $c(t, e, n) {
  const { selection: r } = e;
  let o = null;
  if (zt(r) && (o = r.$cursor), o) {
    var s;
    const l = (s = t.storedMarks) !== null && s !== void 0 ? s : o.marks();
    return o.parent.type.allowsMarkType(n) && (!!n.isInSet(l) || !l.some((a) => a.type.excludes(n)));
  }
  const { ranges: i } = r;
  return i.some(({ $from: l, $to: a }) => {
    let d = l.depth === 0 ? t.doc.inlineContent && t.doc.type.allowsMarkType(n) : !1;
    return t.doc.nodesBetween(l.pos, a.pos, (c, u, f) => {
      if (d) return !1;
      if (c.isInline) {
        const h = !f || f.type.allowsMarkType(n), p = !!n.isInSet(c.marks) || !c.marks.some((m) => m.type.excludes(n));
        d = h && p;
      }
      return !d;
    }), d;
  });
}
const Bc = (t, e = {}) => ({ tr: n, state: r, dispatch: o }) => {
  const { selection: s } = n, { empty: i, ranges: l } = s, a = te(t, r.schema);
  if (o) if (i) {
    const d = Hn(r, a);
    n.addStoredMark(a.create({
      ...d,
      ...e
    }));
  } else l.forEach((d) => {
    const c = d.$from.pos, u = d.$to.pos;
    r.doc.nodesBetween(c, u, (f, h) => {
      const p = Math.max(h, c), m = Math.min(h + f.nodeSize, u);
      f.marks.find((g) => g.type === a) ? f.marks.forEach((g) => {
        a === g.type && n.addMark(p, m, a.create({
          ...g.attrs,
          ...e
        }));
      }) : n.addMark(p, m, a.create(e));
    });
  });
  return $c(r, n, a);
}, Vc = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), zc = (t, e = {}) => ({ state: n, dispatch: r, chain: o }) => {
  const s = P(t, n.schema);
  let i;
  return n.selection.$anchor.sameParent(n.selection.$head) && (i = n.selection.$anchor.parent.attrs), s.isTextblock ? o().command(({ commands: l }) => rr(s, {
    ...i,
    ...e
  })(n) ? !0 : l.clearNodes()).command(({ state: l }) => rr(s, {
    ...i,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Lc = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, o = Z(t, 0, r.content.size), s = C.create(r, o);
    e.setSelection(s);
  }
  return !0;
}, Fc = (t, e) => ({ tr: n, state: r, dispatch: o }) => {
  const { selection: s } = r;
  let i, l;
  return typeof e == "number" ? (i = e, l = e) : e && "from" in e && "to" in e ? (i = e.from, l = e.to) : (i = s.from, l = s.to), o && n.doc.nodesBetween(i, l, (a, d) => {
    a.isText || n.setNodeMarkup(d, void 0, {
      ...a.attrs,
      dir: t
    });
  }), !0;
}, jc = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: o, to: s } = typeof t == "number" ? {
      from: t,
      to: t
    } : t, i = E.atStart(r).from, l = E.atEnd(r).to, a = Z(o, i, l), d = Z(s, i, l), c = E.create(r, a, d);
    e.setSelection(c);
  }
  return !0;
}, Hc = (t) => ({ state: e, dispatch: n }) => Ni(P(t, e.schema))(e, n);
function Lr(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((o) => e?.includes(o.type.name));
    t.tr.ensureMarks(r);
  }
}
const Kc = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: o }) => {
  const { selection: s, doc: i } = e, { $from: l, $to: a } = s, d = o.extensionManager.attributes, c = nt(d, l.node().type.name, l.node().attrs);
  if (s instanceof C && s.node.isBlock)
    return !l.parentOffset || !le(i, l.pos) ? !1 : (r && (t && Lr(n, o.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const u = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Fn(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = u && f ? [{
    type: f,
    attrs: c
  }] : void 0, p = le(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && le(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [{
    type: f,
    attrs: c
  }] : void 0), r) {
    if (p && (s instanceof E && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !u && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    t && Lr(n, o.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Wc = (t, e = {}) => ({ tr: n, state: r, dispatch: o, editor: s }) => {
  const i = P(t, r.schema), { $from: l, $to: a } = r.selection, d = r.selection.node;
  if (d && d.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const c = l.node(-1);
  if (c.type !== i) return !1;
  const u = s.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== i || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (o) {
      var f;
      let y = T.empty;
      const S = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let N = l.depth - S; N >= l.depth - 3; N -= 1) y = T.from(l.node(N).copy(y));
      const b = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, M = {
        ...nt(u, l.node().type.name, l.node().attrs),
        ...e
      }, D = ((f = i.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(M)) || void 0;
      y = y.append(T.from(i.createAndFill(null, D) || void 0));
      const A = l.before(l.depth - (S - 1));
      n.replace(A, l.after(-b), new B(y, 4 - S, 0));
      let x = -1;
      n.doc.nodesBetween(A, n.doc.content.size, (N, w) => {
        if (x > -1) return !1;
        N.isTextblock && N.content.size === 0 && (x = w + 1);
      }), x > -1 && n.setSelection(E.near(n.doc.resolve(x))), n.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? c.contentMatchAt(0).defaultType : null, p = {
    ...nt(u, c.type.name, c.attrs),
    ...e
  }, m = {
    ...nt(u, l.node().type.name, l.node().attrs),
    ...e
  };
  n.delete(l.pos, a.pos);
  const g = h ? [{
    type: i,
    attrs: p
  }, {
    type: h,
    attrs: m
  }] : [{
    type: i,
    attrs: p
  }];
  if (!le(n.doc, l.pos, 2)) return !1;
  if (o) {
    const { selection: y, storedMarks: S } = r, { splittableMarks: b } = s.extensionManager, M = S || y.$to.parentOffset && y.$from.marks();
    if (n.split(l.pos, 2, g).scrollIntoView(), !M || !o) return !0;
    const D = M.filter((A) => b.includes(A.type.name));
    n.ensureMarks(D);
  }
  return !0;
};
function Fr(t) {
  return !t || t === "1" ? null : t;
}
function ms(t, e) {
  return Fr(t) === Fr(e);
}
const rn = (t, e) => {
  const n = yt((s) => s.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0) return !0;
  const o = t.doc.nodeAt(r);
  return !(n.node.type === o?.type && ke(t.doc, n.pos)) || !ms(n.node.attrs.type, o?.attrs.type) || t.join(n.pos), !0;
}, on = (t, e) => {
  const n = yt((s) => s.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0) return !0;
  const o = t.doc.nodeAt(r);
  return !(n.node.type === o?.type && ke(t.doc, r)) || !ms(n.node.attrs.type, o?.attrs.type) || t.join(r), !0;
};
function _c(t) {
  const e = t.doc, n = e.firstChild;
  if (!n) return null;
  const r = e.resolve(1), o = e.resolve(n.nodeSize - 1);
  return E.between(r, o);
}
const qc = (t, e, n, r = {}) => ({ editor: o, tr: s, state: i, dispatch: l, chain: a, commands: d, can: c }) => {
  const { extensions: u, splittableMarks: f } = o.extensionManager, h = P(t, i.schema), p = P(e, i.schema), { selection: m, storedMarks: g } = i, { $from: y, $to: S } = m, b = y.blockRange(S), M = g || m.$to.parentOffset && m.$from.marks();
  if (!b) return !1;
  const D = yt((ne) => xt(ne.type.name, u))(m), A = m.from === 0 && m.to === i.doc.content.size, x = i.doc.content.content, N = x.length === 1 ? x[0] : null, w = A && N && xt(N.type.name, u) ? {
    node: N,
    pos: 0
  } : null, _ = D ?? w, Yt = !!D && b.depth >= 1 && b.depth - D.depth <= 1, Ye = !!w;
  if ((Yt || Ye) && _) {
    if (_.node.type === h)
      return A && Ye ? a().command(({ tr: ne, dispatch: W }) => {
        const H = _c(ne);
        return H ? (ne.setSelection(H), W && W(ne), !0) : !1;
      }).liftListItem(p).run() : d.liftListItem(p);
    if (xt(_.node.type.name, u) && h.validContent(_.node.content)) return a().command(() => (s.setNodeMarkup(_.pos, h), !0)).command(() => rn(s, h)).command(() => on(s, h)).run();
  }
  return !n || !M || !l ? a().command(() => c().wrapInList(h, r) ? !0 : d.clearNodes()).wrapInList(h, r).command(() => rn(s, h)).command(() => on(s, h)).run() : a().command(() => {
    const ne = c().wrapInList(h, r), W = M.filter((H) => f.includes(H.type.name));
    return s.ensureMarks(W), ne ? !0 : d.clearNodes();
  }).wrapInList(h, r).command(() => rn(s, h)).command(() => on(s, h)).run();
}, Uc = (t, e = {}, n = {}) => ({ state: r, commands: o }) => {
  const { extendEmptyMarkRange: s = !1 } = n, i = te(t, r.schema);
  return At(r, i, e) ? o.unsetMark(i, { extendEmptyMarkRange: s }) : o.setMark(i, e);
}, Jc = (t, e, n = {}) => ({ state: r, commands: o }) => {
  const s = P(t, r.schema), i = P(e, r.schema), l = qe(r, s, n);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? o.setNode(i, a) : o.setNode(s, {
    ...a,
    ...n
  });
}, Yc = (t, e = {}) => ({ state: n, commands: r }) => {
  const o = P(t, n.schema);
  return qe(n, o, e) ? r.lift(o) : r.wrapIn(o, e);
}, Gc = () => ({ state: t, dispatch: e }) => {
  const n = t.plugins;
  for (let r = 0; r < n.length; r += 1) {
    const o = n[r];
    let s;
    if (o.spec.isInputRules && (s = o.getState(t))) {
      if (e) {
        const i = t.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1) i.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = i.doc.resolve(s.from).marks();
          i.replaceWith(s.from, s.to, t.schema.text(s.text, a));
        } else i.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, Xc = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { ignoreClearable: o = !1 } = t, { selection: s } = e, { empty: i, ranges: l } = s;
  if (i) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (n) {
    const d = Object.values(r.schema.marks).filter((c) => o || !a.includes(c.name));
    l.forEach((c) => {
      for (const u of d) e.removeMark(c.$from.pos, c.$to.pos, u);
    });
  }
  return !0;
}, Qc = (t, e = {}) => ({ tr: n, state: r, dispatch: o }) => {
  const { extendEmptyMarkRange: s = !1 } = e, { selection: i } = n, l = te(t, r.schema), { $from: a, empty: d, ranges: c } = i;
  if (!o) return !0;
  if (d && s) {
    var u;
    let { from: f, to: h } = i;
    const p = Vt(a, l, (u = a.marks().find((m) => m.type === l)) === null || u === void 0 ? void 0 : u.attrs);
    p && (f = p.from, h = p.to), n.removeMark(f, h, l);
  } else c.forEach((f) => {
    n.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return n.removeStoredMark(l), !0;
}, Zc = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const { selection: o } = n;
  let s, i;
  return typeof t == "number" ? (s = t, i = t) : t && "from" in t && "to" in t ? (s = t.from, i = t.to) : (s = o.from, i = o.to), r && e.doc.nodesBetween(s, i, (l, a) => {
    if (l.isText) return;
    const d = { ...l.attrs };
    delete d.dir, e.setNodeMarkup(a, void 0, d);
  }), !0;
}, ed = (t, e = {}) => ({ tr: n, state: r, dispatch: o }) => {
  let s = null, i = null;
  const l = gt(typeof t == "string" ? t : t.name, r.schema);
  if (!l) return !1;
  l === "node" && (s = P(t, r.schema)), l === "mark" && (i = te(t, r.schema));
  let a = !1;
  return n.selection.ranges.forEach((d) => {
    const c = d.$from.pos, u = d.$to.pos;
    let f, h, p, m;
    n.selection.empty ? r.doc.nodesBetween(c, u, (g, y) => {
      s && s === g.type && (a = !0, p = Math.max(y, c), m = Math.min(y + g.nodeSize, u), f = y, h = g);
    }) : r.doc.nodesBetween(c, u, (g, y) => {
      y < c && s && s === g.type && (a = !0, p = Math.max(y, c), m = Math.min(y + g.nodeSize, u), f = y, h = g), y >= c && y <= u && (s && s === g.type && (a = !0, o && n.setNodeMarkup(y, void 0, {
        ...g.attrs,
        ...e
      })), i && g.marks.length && g.marks.forEach((S) => {
        if (i === S.type && (a = !0, o)) {
          const b = Math.max(y, c), M = Math.min(y + g.nodeSize, u);
          n.addMark(b, M, i.create({
            ...S.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && o && n.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), i && h.marks.length && h.marks.forEach((g) => {
      i === g.type && o && n.addMark(p, m, i.create({
        ...g.attrs,
        ...e
      }));
    }));
  }), a;
}, Te = new ce("__tiptap_decorations__"), td = (t) => ({ tr: e, dispatch: n }) => (n && e.setMeta(Te, {
  type: "force",
  name: t
}), !0), nd = (t, e = {}) => ({ state: n, dispatch: r }) => Si(P(t, n.schema), e)(n, r), rd = (t, e = {}) => ({ state: n, dispatch: r }) => ki(P(t, n.schema), e)(n, r);
var gs = /* @__PURE__ */ Tn({
  blur: () => ba,
  clearContent: () => Sa,
  clearNodes: () => ka,
  command: () => Ma,
  createParagraphNear: () => xa,
  cut: () => Ca,
  deleteCurrentNode: () => Da,
  deleteNode: () => Ta,
  deleteRange: () => Na,
  deleteSelection: () => wa,
  enter: () => va,
  exitCode: () => Aa,
  extendMarkRange: () => Pa,
  first: () => Ra,
  focus: () => Ia,
  forEach: () => $a,
  insertContent: () => Ba,
  insertContentAt: () => Va,
  insertDefaultBlock: () => za,
  joinBackward: () => ja,
  joinDown: () => Fa,
  joinForward: () => Ha,
  joinItemBackward: () => Ka,
  joinItemForward: () => Wa,
  joinTextblockBackward: () => _a,
  joinTextblockForward: () => qa,
  joinUp: () => La,
  keyboardShortcut: () => Ja,
  lift: () => Ya,
  liftEmptyBlock: () => Ga,
  liftListItem: () => Xa,
  newlineInCode: () => Qa,
  resetAttributes: () => Za,
  scrollIntoView: () => ec,
  selectAll: () => tc,
  selectNodeBackward: () => nc,
  selectNodeForward: () => rc,
  selectParentNode: () => oc,
  selectTextblockEnd: () => sc,
  selectTextblockStart: () => ic,
  setContent: () => lc,
  setMark: () => Bc,
  setMeta: () => Vc,
  setNode: () => zc,
  setNodeSelection: () => Lc,
  setTextDirection: () => Fc,
  setTextSelection: () => jc,
  sinkListItem: () => Hc,
  splitBlock: () => Kc,
  splitListItem: () => Wc,
  toggleList: () => qc,
  toggleMark: () => Uc,
  toggleNode: () => Jc,
  toggleWrap: () => Yc,
  undoInputRule: () => Gc,
  unsetAllMarks: () => Xc,
  unsetMark: () => Qc,
  unsetTextDirection: () => Zc,
  updateAttributes: () => ed,
  updateDecorations: () => td,
  wrapIn: () => nd,
  wrapInList: () => rd
});
const Le = /* @__PURE__ */ new WeakMap();
function od(t, e) {
  var n;
  Le.set(t, ((n = Le.get(t)) !== null && n !== void 0 ? n : 0) + 1);
  try {
    return e();
  } finally {
    var r;
    const o = ((r = Le.get(t)) !== null && r !== void 0 ? r : 1) - 1;
    o > 0 ? Le.set(t, o) : Le.delete(t);
  }
}
function sd(t) {
  return Le.has(t);
}
var id = class {
  constructor() {
    this.callbacks = {};
  }
  on(t, e) {
    return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(e), this;
  }
  emit(t, ...e) {
    const n = this.callbacks[t];
    return n && n.forEach((r) => r.apply(this, e)), this;
  }
  off(t, e) {
    const n = this.callbacks[t];
    return n && (e ? this.callbacks[t] = n.filter((r) => r !== e) : delete this.callbacks[t]), this;
  }
  once(t, e) {
    const n = (...r) => {
      this.off(t, n), e.apply(this, r);
    };
    return this.on(t, n);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
};
const ys = typeof process < "u" && process.env.NODE_ENV !== "production";
function ld(t) {
  return t.kind === "widget";
}
function bs(t, e) {
  const n = [], r = /* @__PURE__ */ new Set();
  for (const o of t)
    o.kind === "widget" && ld(o) && r.add(o.key), n.push(o.toPMDecoration(e));
  return {
    decorations: n,
    widgetKeys: r
  };
}
function ad(t, e, n) {
  const { decorations: r, widgetKeys: o } = bs(e, n);
  return {
    set: v.create(t, r),
    widgetKeys: o
  };
}
function Ss({ position: t, from: e, to: n, docSize: r }) {
  return t < e ? !1 : t < n ? !0 : t === n && n === r;
}
function cd({ decorations: t, from: e, to: n, docSize: r, extensionName: o, warnedExtensions: s }) {
  return t.filter((i) => Ss({
    position: i.anchor,
    from: e,
    to: n,
    docSize: r
  }) ? !0 : (i.anchor === n || s.has(o) || (s.add(o), console.warn(`[tiptap warn]: Extension "${o}" returned a decoration outside the requested range [${e}, ${n}). It was ignored.`)), !1));
}
function ks(t) {
  var e;
  const n = (e = t.spec) === null || e === void 0 ? void 0 : e.key;
  return typeof n == "string" ? n : void 0;
}
function dd(t) {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const i of t.find()) {
    var r, o, s;
    const l = ks(i);
    if (!l) continue;
    const a = (r = i.spec.extensionName) !== null && r !== void 0 ? r : "unknown", d = (o = e.get(l)) !== null && o !== void 0 ? o : /* @__PURE__ */ new Set();
    d.add(a), e.set(l, d), n.set(l, ((s = n.get(l)) !== null && s !== void 0 ? s : 0) + 1);
  }
  return Array.from(e, ([i, l]) => ({
    key: i,
    extensions: l
  })).filter(({ key: i }) => {
    var l;
    return ((l = n.get(i)) !== null && l !== void 0 ? l : 0) > 1;
  });
}
function Ms(t) {
  return t.jsonID === "attr";
}
function ud(t) {
  let e = !1;
  if (t.getMap().forEach(() => {
    e = !0;
  }), e || Ms(t)) return !0;
  const n = t;
  return typeof n.from == "number" && typeof n.to == "number";
}
function fd(t, e) {
  let n = null, r = 0, o = 0;
  for (let s = 0; s < t.childCount && !(o > e.to); s += 1) {
    const i = o + t.child(s).nodeSize;
    i >= e.from && (n === null && (n = o), r = i), o = i;
  }
  return n === null ? null : {
    from: n,
    to: r
  };
}
function hd(t, e) {
  if (t.steps.some((s) => !ud(s))) return { type: "full" };
  const n = Jn(t).map(({ newRange: s }) => s);
  t.steps.forEach((s, i) => {
    if (!Ms(s)) return;
    const l = t.mapping.slice(i);
    n.push({
      from: l.map(s.pos, -1),
      to: l.map(s.pos + 1)
    });
  });
  const r = [];
  for (const s of n) {
    const i = fd(e, s);
    i && r.push(i);
  }
  r.sort((s, i) => s.from - i.from);
  const o = [];
  for (const s of r) {
    const i = o[o.length - 1];
    i && s.from <= i.to ? i.to = Math.max(i.to, s.to) : o.push({ ...s });
  }
  return {
    type: "ranges",
    ranges: o
  };
}
function xs(t, e, n, r) {
  return t.map(e, n, { onRemove: (o) => {
    const s = o?.key;
    typeof s == "string" && r.delete(s);
  } });
}
function pd(t, e, n) {
  var r, o;
  const s = (r = e.decorationSetsByExtension[t]) !== null && r !== void 0 ? r : v.empty, i = new Set((o = e.widgetKeysByExtension[t]) !== null && o !== void 0 ? o : []);
  return {
    set: xs(s, n.mapping, n.doc, i),
    widgetKeys: i
  };
}
function jr(t, e) {
  const n = Object.values(e).flatMap((r) => r.find());
  return v.create(t, n);
}
function Hr(t) {
  const e = /* @__PURE__ */ new Set();
  for (const n of Object.values(t)) for (const r of n) e.add(r);
  return e;
}
function md(t, e) {
  var n;
  switch ((n = e.update) !== null && n !== void 0 ? n : "document") {
    case "document":
      if (e.createInRange) throw new Error(`[tiptap error]: Extension "${t}" provides createInRange() but does not use the "changedRanges" decoration update strategy.`);
      return;
    case "changedRanges":
      if (!e.createInRange) throw new Error(`[tiptap error]: Extension "${t}" uses the "changedRanges" decoration update strategy but does not provide createInRange().`);
      return;
    case "manual":
      if (e.createInRange) throw new Error(`[tiptap error]: Extension "${t}" uses the "manual" decoration update strategy, which is not compatible with createInRange(). createInRange() requires the "changedRanges" strategy.`);
      if (e.shouldUpdate) throw new Error(`[tiptap error]: Extension "${t}" cannot combine the "manual" decoration update strategy with shouldUpdate().`);
      return;
    default:
      throw new Error(`[tiptap error]: Extension "${t}" uses an unknown decoration update strategy. Expected "document", "changedRanges", or "manual".`);
  }
}
function gd(t, e, n) {
  return n ? !0 : t.update === "manual" ? !1 : t.shouldUpdate ? t.shouldUpdate(e) : e.tr.docChanged;
}
const Cs = /* @__PURE__ */ new Set();
function Ds(t) {
  var e, n;
  return (e = (n = t.extensionManager) === null || n === void 0 || (n = n.decorationManager) === null || n === void 0 ? void 0 : n.liveWidgetKeys()) !== null && e !== void 0 ? e : Cs;
}
var Ts = class {
  constructor(t) {
    this.warnedWidgetKeys = /* @__PURE__ */ new Set(), this.warnedOutOfRangeExtensions = /* @__PURE__ */ new Set(), this.handleBeforeTransaction = ({ nextState: e }) => {
      const n = Te.getState(e);
      n && this.warnDuplicateWidgetKeys(n);
    }, this.editor = t.editor, this.entries = this.resolveEntries(t.entries), this.entries.forEach(({ name: e, spec: n }) => md(e, n)), this.plugin = this.entries.length > 0 ? this.createPlugin() : null, this.editor.on("beforeTransaction", this.handleBeforeTransaction);
  }
  destroy() {
    this.editor.off("beforeTransaction", this.handleBeforeTransaction);
  }
  /**
  * Returns the set of live widget keys from all decoration extensions.
  * @returns A readonly set of widget keys
  */
  liveWidgetKeys() {
    var t, e;
    return (t = (e = Te.getState(this.editor.state)) === null || e === void 0 ? void 0 : e.widgetKeys) !== null && t !== void 0 ? t : Cs;
  }
  /**
  * The mounted editor view, or `null` when destroyed. Decoration callbacks
  * must never receive the placeholder view `editor.view` falls back to.
  * @returns The mounted editor view, or `null`
  */
  get mountedView() {
    return this.editor.isDestroyed ? null : this.editor.view;
  }
  /**
  * Resolves decoration entries by calling the addDecorations function for each extension entry.
  * @param entries The decoration manager entries to resolve
  * @returns An array of resolved decoration entries
  */
  resolveEntries(t) {
    const e = [];
    for (const { name: n, addDecorations: r } of t) {
      const o = r();
      o && e.push({
        name: n,
        spec: o
      });
    }
    return e;
  }
  /**
  * Creates the ProseMirror plugin for managing decorations.
  * @returns A ProseMirror plugin with state management
  */
  createPlugin() {
    const { editor: t, entries: e } = this;
    return new G({
      key: Te,
      state: {
        init: (n, r) => {
          const o = {}, s = {};
          for (const { name: l, spec: a } of e) {
            const { set: d, widgetKeys: c } = this.buildFullSet(l, a, r);
            o[l] = d, s[l] = c;
          }
          const i = {
            decorationSetsByExtension: o,
            widgetKeysByExtension: s,
            mergedDecorationSet: this.buildMergedSet(r.doc, o),
            widgetKeys: Hr(s)
          };
          return this.warnDuplicateWidgetKeys(i), i;
        },
        apply: (n, r, o, s) => {
          const i = n.getMeta(Te), l = i?.type === "force" && !i.name, a = i?.type === "force" ? i.name : void 0, d = {}, c = {}, u = /* @__PURE__ */ new Set();
          return od(t, () => {
            for (const { name: f, spec: h } of e) {
              const p = l || a === f;
              if (gd(h, {
                editor: t,
                tr: n,
                oldState: o,
                newState: s
              }, p))
                if (h.update === "changedRanges" && n.docChanged && !p) {
                  const m = this.applyChangedRangesRecompute(f, h, r, n, s);
                  d[f] = m.set, c[f] = m.widgetKeys, u.add(f);
                } else {
                  const { set: m, widgetKeys: g } = this.buildFullSet(f, h, s);
                  d[f] = m, c[f] = g, u.add(f);
                }
              else {
                const m = pd(f, r, n);
                d[f] = m.set, c[f] = m.widgetKeys;
              }
            }
          }), u.size === 0 && !n.docChanged ? r : {
            decorationSetsByExtension: d,
            widgetKeysByExtension: c,
            mergedDecorationSet: this.mergeAfterApply({
              entries: e,
              previous: r,
              tr: n,
              decorationSetsByExtension: d,
              recomputedNames: u
            }),
            widgetKeys: Hr(c)
          };
        }
      },
      props: { decorations(n) {
        var r, o;
        return (r = (o = Te.getState(n)) === null || o === void 0 ? void 0 : o.mergedDecorationSet) !== null && r !== void 0 ? r : v.empty;
      } }
    });
  }
  /**
  * Applies changed ranges recomputation to a decoration set, dropping stale decorations and rebuilding only the touched blocks.
  * @param name The name of the decoration extension
  * @param spec The decoration spec
  * @param previous The previous decoration manager state
  * @param tr The transaction to apply
  * @param newState The new editor state
  * @returns The updated decoration set and widget keys
  */
  applyChangedRangesRecompute(t, e, n, r, o) {
    const s = hd(r, o.doc);
    return s.type === "full" ? this.buildFullSet(t, e, o) : this.rebuildRanges(t, e, n, r, o, s.ranges);
  }
  /**
  * Rebuilds decorations for the changed block ranges: maps the previous set
  * forward, then for each range removes stale decorations, calls
  * `createInRange`, and adds the new ones while syncing widget keys.
  * @param name The extension name.
  * @param spec The decoration spec.
  * @param previous The previous decoration manager state.
  * @param tr The transaction to apply.
  * @param newState The new editor state.
  * @param ranges The block ranges to rebuild.
  * @returns The updated decoration set and widget keys.
  */
  rebuildRanges(t, e, n, r, o, s) {
    var i, l;
    const a = (i = n.decorationSetsByExtension[t]) !== null && i !== void 0 ? i : v.empty, d = new Set((l = n.widgetKeysByExtension[t]) !== null && l !== void 0 ? l : []);
    let c = xs(a, r.mapping, r.doc, d);
    const u = o.doc.content.size;
    for (const { from: f, to: h } of s) {
      const p = c.find(f, h).filter((y) => Ss({
        position: y.from,
        from: f,
        to: h,
        docSize: u
      }));
      for (const y of p) {
        const S = ks(y);
        S && d.delete(S);
      }
      c = c.remove(p);
      const { decorations: m, widgetKeys: g } = bs(cd({
        decorations: this.runCreate(t, "createInRange", () => e.createInRange({
          editor: this.editor,
          state: o,
          view: this.mountedView,
          from: f,
          to: h
        })),
        from: f,
        to: h,
        docSize: u,
        extensionName: t,
        warnedExtensions: this.warnedOutOfRangeExtensions
      }), t);
      c = c.add(o.doc, m);
      for (const y of g) d.add(y);
    }
    return {
      set: c,
      widgetKeys: d
    };
  }
  /**
  * Builds a full decoration set for the entire document.
  * @param name The name of the decoration extension
  * @param spec The decoration spec
  * @param state The editor state
  * @returns The decoration set and widget keys
  */
  buildFullSet(t, e, n) {
    const r = this.runCreate(t, "create", () => e.create({
      editor: this.editor,
      state: n,
      view: this.mountedView
    }));
    return ad(n.doc, r, t);
  }
  /**
  * Runs a decoration callback and swallows anything it throws. These run inside
  * `state.apply`, where an uncaught error would abort the whole transaction.
  * @param name The extension name.
  * @param method The callback name, used in the error message.
  * @param create The callback to run.
  * @returns The decorations, or an empty array if the callback threw.
  */
  runCreate(t, e, n) {
    try {
      return n();
    } catch (r) {
      return console.error(`[tiptap error]: Extension "${t}" threw in \`addDecorations().${e}()\`. Its decorations were dropped for this update.`, r), [];
    }
  }
  warnDuplicateWidgetKeys(t) {
    if (!ys) return;
    if (t.widgetKeys.size === 0) {
      this.warnedWidgetKeys.clear();
      return;
    }
    const e = dd(t.mergedDecorationSet), n = new Set(e.map(({ key: r }) => r));
    for (const { key: r, extensions: o } of e) {
      if (this.warnedWidgetKeys.has(r)) continue;
      const s = Array.from(o).map((i) => `"${i}"`).join(", ");
      console.warn(`[tiptap warn]: Duplicate widget decoration key "${r}" in extension${o.size === 1 ? "" : "s"} ${s}. Widget decoration keys must be globally unique, otherwise ProseMirror misplaces the widget DOM. Use a stable, unique key (e.g. \`comment-\${id}\`).`);
    }
    this.warnedWidgetKeys = n;
  }
  /**
  * Builds the merged DecorationSet during init. Skips the merge for a
  * single extension since its per-extension set is already correct.
  * @param doc The document to build the merged set for.
  * @param decorationSetsByExtension The per-extension decoration sets.
  * @returns The merged decoration set.
  */
  buildMergedSet(t, e) {
    const n = Object.keys(e);
    return n.length === 1 ? e[n[0]] : jr(t, e);
  }
  /**
  * Computes the merged DecorationSet after apply. Single extension skips the
  * merge; nothing recomputed maps the previous merged set forward; otherwise
  * the merge is rebuilt from the per-extension sets.
  */
  mergeAfterApply({ entries: t, previous: e, tr: n, decorationSetsByExtension: r, recomputedNames: o }) {
    return t.length === 1 ? r[t[0].name] : o.size === 0 ? e.mergedDecorationSet.map(n.mapping, n.doc) : jr(n.doc, r);
  }
};
function Xn(t, e) {
  if (t === e) return !0;
  if (!t || !e) return !1;
  const n = Object.keys(t), r = Object.keys(e);
  return n.length !== r.length ? !1 : n.every((o) => Object.prototype.hasOwnProperty.call(e, o) && Object.is(t[o], e[o]));
}
function yd(t, e) {
  const { selection: n } = t, { $from: r } = n;
  if (n instanceof C) {
    const s = r.index();
    return r.parent.canReplaceWith(s, s + 1, e);
  }
  let o = r.depth;
  for (; o >= 0; ) {
    const s = r.index(o);
    if (r.node(o).contentMatchAt(s).matchType(e)) return !0;
    o -= 1;
  }
  return !1;
}
function Ns(t, e, n) {
  const r = document.querySelector(`style[data-tiptap-style${n ? `-${n}` : ""}]`);
  if (r !== null) return r;
  const o = document.createElement("style");
  return e && o.setAttribute("nonce", e), o.setAttribute(`data-tiptap-style${n ? `-${n}` : ""}`, ""), o.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(o), o;
}
function bd(t) {
  return t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function Sd(t, e) {
  const n = t.getAttribute("style");
  if (!n) return null;
  const r = n.split(";").map((s) => s.trim()).filter(Boolean), o = e.toLowerCase();
  for (let s = r.length - 1; s >= 0; s -= 1) {
    const i = r[s], l = i.indexOf(":");
    if (l !== -1 && i.slice(0, l).trim().toLowerCase() === o)
      return i.slice(l + 1).trim();
  }
  return null;
}
function kd(t) {
  return t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}
function Md(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function xd() {
  return typeof navigator < "u" ? /Firefox/.test(navigator.userAgent) : !1;
}
function Es(t) {
  return typeof t == "number";
}
function Cd(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function Qe(t) {
  return Cd(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Dd(t) {
  return typeof t == "string";
}
function Wt(t) {
  if (!t?.trim()) return {};
  const e = {}, n = [], r = t.replace(/["']([^"']*)["']/g, (l) => (n.push(l), `__QUOTED_${n.length - 1}__`)), o = r.match(/(?:^|\s)\.([\w-]+)/g);
  o && (e.class = o.map((l) => l.trim().slice(1)).join(" "));
  const s = r.match(/(?:^|\s)#([\w-]+)/);
  s && (e.id = s[1]), Array.from(r.matchAll(/([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g)).forEach(([, l, a]) => {
    var d;
    const c = parseInt(((d = a.match(/__QUOTED_(\d+)__/)) === null || d === void 0 ? void 0 : d[1]) || "0", 10), u = n[c];
    u && (e[l] = u.slice(1, -1));
  });
  const i = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return i && i.split(/\s+/).filter(Boolean).forEach((l) => {
    l.match(/^[a-zA-Z][\w-]*$/) && (e[l] = !0);
  }), e;
}
function _t(t) {
  if (!t || Object.keys(t).length === 0) return "";
  const e = [];
  return t.class && String(t.class).split(/\s+/).filter(Boolean).forEach((n) => e.push(`.${n}`)), t.id && e.push(`#${t.id}`), Object.entries(t).forEach(([n, r]) => {
    n === "class" || n === "id" || (r === !0 ? e.push(n) : r !== !1 && r != null && e.push(`${n}="${String(r)}"`));
  }), e.join(" ");
}
function Os(t) {
  const { nodeName: e, name: n, parseAttributes: r = Wt, serializeAttributes: o = _t, defaultAttributes: s = {}, requiredAttributes: i = [], allowedAttributes: l } = t, a = n || e, d = (c) => {
    if (!l) return c;
    const u = {};
    return l.forEach((f) => {
      f in c && (u[f] = c[f]);
    }), u;
  };
  return {
    parseMarkdown: (c, u) => {
      const f = {
        ...s,
        ...c.attributes
      };
      return u.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(c) {
        var u;
        const f = new RegExp(`^:::${a}(?:\\s|$)`, "m"), h = (u = c.match(f)) === null || u === void 0 ? void 0 : u.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(c, u, f) {
        const h = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = c.match(h);
        if (!p) return;
        const m = p[1] || "", g = r(m);
        if (!i.find((y) => !(y in g)))
          return {
            type: e,
            raw: p[0],
            attributes: g
          };
      }
    },
    renderMarkdown: (c) => {
      const u = d(c.attrs || {}), f = o(u), h = f ? ` {${f}}` : "";
      return `:::${a}${h} :::`;
    }
  };
}
function ws(t) {
  const { nodeName: e, name: n, getContent: r, parseAttributes: o = Wt, serializeAttributes: s = _t, defaultAttributes: i = {}, content: l = "block", allowedAttributes: a } = t, d = n || e, c = (u) => {
    if (!a) return u;
    const f = {};
    return a.forEach((h) => {
      h in u && (f[h] = u[h]);
    }), f;
  };
  return {
    parseMarkdown: (u, f) => {
      let h;
      if (r) {
        const m = r(u);
        h = typeof m == "string" ? [{
          type: "text",
          text: m
        }] : m;
      } else l === "block" ? h = f.parseChildren(u.tokens || []) : h = f.parseInline(u.tokens || []);
      const p = {
        ...i,
        ...u.attributes
      };
      return f.createNode(e, p, h);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var f;
        const h = new RegExp(`^:::${d}`, "m"), p = (f = u.match(h)) === null || f === void 0 ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(u, f, h) {
        const p = new RegExp(`^:::${d}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), m = u.match(p);
        if (!m) return;
        const [g, y = ""] = m, S = o(y);
        let b = 1;
        const M = g.length;
        let D = "";
        const A = /^:::([\w-]*)(\s.*)?/gm, x = u.slice(M);
        for (A.lastIndex = 0; ; ) {
          var N;
          const w = A.exec(x);
          if (w === null) break;
          const _ = w.index, Yt = w[1];
          if (!(!((N = w[2]) === null || N === void 0) && N.endsWith(":::"))) {
            if (Yt) b += 1;
            else if (b -= 1, b === 0) {
              const Ye = x.slice(0, _);
              D = Ye.trim();
              const ne = u.slice(0, M + _ + w[0].length);
              let W = [];
              if (D) if (l === "block")
                for (W = h.blockTokens(Ye), W.forEach((H) => {
                  H.text && (!H.tokens || H.tokens.length === 0) && (H.tokens = h.inlineTokens(H.text));
                }); W.length > 0; ) {
                  const H = W[W.length - 1];
                  if (H.type === "paragraph" && (!H.text || H.text.trim() === "")) W.pop();
                  else break;
                }
              else W = h.inlineTokens(D);
              return {
                type: e,
                raw: ne,
                attributes: S,
                content: D,
                tokens: W
              };
            }
          }
        }
      }
    },
    renderMarkdown: (u, f) => {
      const h = c(u.attrs || {}), p = s(h), m = p ? ` {${p}}` : "", g = f.renderChildren(u.content || [], `

`);
      return `:::${d}${m}

${g}

:::`;
    }
  };
}
function Td(t) {
  if (!t.trim()) return {};
  const e = {}, n = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = n.exec(t);
  for (; r !== null; ) {
    const [, o, s, i] = r;
    e[o] = s || i, r = n.exec(t);
  }
  return e;
}
function Nd(t) {
  return Object.entries(t).filter(([, e]) => e != null).map(([e, n]) => `${e}="${n}"`).join(" ");
}
function vs(t) {
  const { nodeName: e, name: n, getContent: r, parseAttributes: o = Td, serializeAttributes: s = Nd, defaultAttributes: i = {}, selfClosing: l = !1, allowedAttributes: a } = t, d = n || e, c = (f) => {
    if (!a) return f;
    const h = {};
    return a.forEach((p) => {
      const m = typeof p == "string" ? p : p.name, g = typeof p == "string" ? void 0 : p.skipIfDefault;
      if (m in f) {
        const y = f[m];
        if (g !== void 0 && y === g) return;
        h[m] = y;
      }
    }), h;
  }, u = d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, h) => {
      const p = {
        ...i,
        ...f.attributes
      };
      if (l) return h.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? h.createNode(e, p, [h.createTextNode(m)]) : h.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const h = l ? new RegExp(`\\[${u}\\s*[^\\]]*\\]`) : new RegExp(`\\[${u}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${u}\\]`), p = f.match(h), m = p?.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, h, p) {
        const m = l ? new RegExp(`^\\[${u}\\s*([^\\]]*)\\]`) : new RegExp(`^\\[${u}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${u}\\]`), g = f.match(m);
        if (!g) return;
        let y = "", S = "";
        if (l) {
          const [, M] = g;
          S = M;
        } else {
          const [, M, D] = g;
          S = M, y = D || "";
        }
        const b = o(S.trim());
        return {
          type: e,
          raw: g[0],
          content: y.trim(),
          attributes: b
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((y) => y.type === "text").map((y) => y.text).join(""));
      const p = c(f.attrs || {}), m = s(p), g = m ? ` ${m}` : "";
      return l ? `[${d}${g}]` : `[${d}${g}]${h}[/${d}]`;
    }
  };
}
function As(t, e, n) {
  const r = t.split(`
`), o = [];
  let s = "", i = 0;
  const l = e.baseIndentSize || 2;
  for (; i < r.length; ) {
    const c = r[i], u = c.match(e.itemPattern);
    if (!u) {
      if (o.length > 0) break;
      if (c.trim() === "") {
        i += 1, s = `${s}${c}
`;
        continue;
      } else return;
    }
    const f = e.extractItemData(u), { indentLevel: h, mainContent: p } = f;
    s = `${s}${c}
`;
    const m = [p];
    for (i += 1; i < r.length; ) {
      var a;
      const b = r[i];
      if (b.trim() === "") {
        var d;
        const M = r.slice(i + 1).findIndex((D) => D.trim() !== "");
        if (M === -1) break;
        if ((((d = r[i + 1 + M].match(/^(\s*)/)) === null || d === void 0 || (d = d[1]) === null || d === void 0 ? void 0 : d.length) || 0) > h) {
          m.push(b), s = `${s}${b}
`, i += 1;
          continue;
        } else break;
      }
      if ((((a = b.match(/^(\s*)/)) === null || a === void 0 || (a = a[1]) === null || a === void 0 ? void 0 : a.length) || 0) > h)
        m.push(b), s = `${s}${b}
`, i += 1;
      else break;
    }
    let g;
    const y = m.slice(1);
    if (y.length > 0) {
      const b = y.map((M) => M.slice(h + l)).join(`
`);
      b.trim() && (e.customNestedParser ? g = e.customNestedParser(b) : g = n.blockTokens(b));
    }
    const S = e.createToken(f, g);
    o.push(S);
  }
  if (o.length !== 0)
    return {
      items: o,
      raw: s
    };
}
function Ps(t, e, n, r) {
  if (!t || !Array.isArray(t.content)) return "";
  const o = typeof n == "function" ? n(r) : n, [s, ...i] = t.content;
  let l = `${o}${e.renderChildren([s])}`;
  return i && i.length > 0 && i.forEach((a, d) => {
    var c, u;
    const f = (c = (u = e.renderChild) === null || u === void 0 ? void 0 : u.call(e, a, d + 1)) !== null && c !== void 0 ? c : e.renderChildren([a]);
    if (f != null) {
      const h = f.split(`
`).map((p) => p ? e.indent(p) : e.indent("")).join(`
`);
      l += a.type === "paragraph" ? `

${h}` : `
${h}`;
    }
  }), l;
}
var Ed = /* @__PURE__ */ Tn({
  createAtomBlockMarkdownSpec: () => Os,
  createBlockMarkdownSpec: () => ws,
  createInlineMarkdownSpec: () => vs,
  parseAttributes: () => Wt,
  parseIndentedBlocks: () => As,
  renderNestedMarkdownContent: () => Ps,
  serializeAttributes: () => _t
});
function Kr(t) {
  return typeof t.type == "string" ? t.type : t.type.name;
}
function Od(t, e) {
  if (t.length !== e.length) return !1;
  const n = Array.from({ length: e.length }, () => !1);
  return t.every((r) => {
    const o = Kr(r), s = e.findIndex((i, l) => !n[l] && o === Kr(i) && Xn(r.attrs, i.attrs));
    return s === -1 ? !1 : (n[s] = !0, !0);
  });
}
function Qn(t, e) {
  const n = { ...t };
  return Qe(t) && Qe(e) && Object.keys(e).forEach((r) => {
    Qe(e[r]) && Qe(t[r]) ? n[r] = Qn(t[r], e[r]) : n[r] = e[r];
  }), n;
}
function Zn(t, e, n = {}) {
  const { state: r } = e, { doc: o, tr: s } = r, i = t;
  o.descendants((l, a) => {
    const d = s.mapping.map(a), c = s.mapping.map(a) + l.nodeSize;
    let u = null;
    if (l.marks.forEach((h) => {
      if (h !== i) return !1;
      u = h;
    }), !u) return;
    let f = !1;
    if (Object.keys(n).forEach((h) => {
      n[h] !== u.attrs[h] && (f = !0);
    }), f) {
      const h = t.type.create({
        ...t.attrs,
        ...n
      });
      s.removeMark(d, c, t.type), s.addMark(d, c, h);
    }
  }), s.docChanged && e.view.dispatch(s);
}
var wd = class {
  constructor(t, e, n) {
    this.component = t, this.editor = e.editor, this.options = { ...n }, this.mark = e.mark, this.HTMLAttributes = e.HTMLAttributes;
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  /**
  * Update the attributes of the mark in the document.
  * @param attrs The attributes to update.
  */
  updateAttributes(t, e) {
    Zn(e || this.mark, this.editor, t);
  }
  ignoreMutation(t) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: t }) : t.type === "selection" || this.dom.contains(t.target) && t.type === "childList" && (Re() || lt()) && this.editor.isFocused && [...Array.from(t.addedNodes), ...Array.from(t.removedNodes)].every((e) => e.isContentEditable) ? !1 : this.contentDOM === t.target && t.type === "attributes" ? !0 : !this.contentDOM.contains(t.target);
  }
}, Je = class {
  constructor(t) {
    var e;
    this.find = t.find, this.handler = t.handler, this.undoable = (e = t.undoable) !== null && e !== void 0 ? e : !0;
  }
};
const vd = (t, e) => {
  if (Bt(e)) return e.exec(t);
  const n = e(t);
  if (!n) return null;
  const r = [n.text];
  return r.index = n.index, r.input = t, r.data = n.data, n.replaceWith && (n.text.includes(n.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(n.replaceWith)), r;
};
function kt(t) {
  var e;
  const { editor: n, from: r, to: o, text: s, rules: i, plugin: l } = t, { view: a } = n;
  if (a.composing) return !1;
  const d = a.state.doc.resolve(r);
  if (d.parent.type.spec.code || !((e = d.nodeBefore || d.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)) return !1;
  let c = !1;
  const u = as(d) + s;
  return i.forEach((f) => {
    if (c) return;
    const h = vd(u, f.find);
    if (!h) return;
    const p = h[0].length - s.length;
    if (p > 0) {
      const D = d.parentOffset - p;
      if (D < 0 || d.parent.textBetween(D, d.parentOffset) !== h[0].slice(0, p)) return;
    }
    const m = a.state.tr, g = mt({
      state: a.state,
      transaction: m
    }), y = {
      from: r - (h[0].length - s.length),
      to: o
    }, { commands: S, chain: b, can: M } = new ve({
      editor: n,
      state: g
    });
    f.handler({
      state: g,
      range: y,
      match: h,
      commands: S,
      chain: b,
      can: M
    }) === null || !m.steps.length || (f.undoable && m.setMeta(l, {
      transform: m,
      from: r,
      to: o,
      text: s
    }), a.dispatch(m), c = !0);
  }), c;
}
function Rs(t) {
  const { editor: e, rules: n } = t, r = new G({
    state: {
      init() {
        return null;
      },
      apply(o, s, i) {
        const l = o.getMeta(r);
        if (l) return l;
        const a = o.getMeta("applyInputRules");
        return a && setTimeout(() => {
          let { text: d } = a;
          typeof d == "string" ? d = d : d = bt(T.from(d), i.schema);
          const { from: c } = a, u = c + d.length;
          kt({
            editor: e,
            from: c,
            to: u,
            text: d,
            rules: n,
            plugin: r
          });
        }), o.selectionSet || o.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(o, s, i, l) {
        return kt({
          editor: e,
          from: s,
          to: i,
          text: l,
          rules: n,
          plugin: r
        });
      },
      handleDOMEvents: { compositionend: (o) => (setTimeout(() => {
        const { $cursor: s } = o.state.selection;
        s && kt({
          editor: e,
          from: s.pos,
          to: s.pos,
          text: "",
          rules: n,
          plugin: r
        });
      }), !1) },
      handleKeyDown(o, s) {
        if (s.key !== "Enter") return !1;
        const { $cursor: i } = o.state.selection;
        return i ? kt({
          editor: e,
          from: i.pos,
          to: i.pos,
          text: `
`,
          rules: n,
          plugin: r
        }) : !1;
      }
    },
    isInputRules: !0
  });
  return r;
}
var qt = class {
  constructor(t = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...t
    }, this.name = this.config.name;
  }
  get options() {
    return { ...O(k(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...O(k(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(t = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Qn(this.options, t)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(t = {}) {
    const e = new this.constructor({
      ...this.config,
      ...t
    });
    return e.parent = this, this.child = e, e.name = "name" in t ? t.name : e.parent.name, e;
  }
}, Is = class $s extends qt {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new $s(n);
  }
  static handleExit({ editor: e, mark: n }) {
    const { tr: r } = e.state, o = e.state.selection.$from;
    if (o.pos === o.end()) {
      const s = o.marks();
      if (!s.find((l) => l?.type.name === n.name)) return !1;
      const i = s.find((l) => l?.type.name === n.name);
      return i && r.removeStoredMark(i), r.insertText(" ", o.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
}, Ut = class {
  constructor(t) {
    this.find = t.find, this.handler = t.handler;
  }
};
const Ad = (t, e, n) => {
  if (Bt(e)) return [...t.matchAll(e)];
  const r = e(t, n);
  return r ? r.map((o) => {
    const s = [o.text];
    return s.index = o.index, s.input = t, s.data = o.data, o.replaceWith && (o.text.includes(o.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(o.replaceWith)), s;
  }) : [];
};
function Pd(t) {
  const { editor: e, state: n, from: r, to: o, rule: s, pasteEvent: i, dropEvent: l } = t, { commands: a, chain: d, can: c } = new ve({
    editor: e,
    state: n
  }), u = [];
  return n.doc.nodesBetween(r, o, (f, h) => {
    var p, m, g, y;
    if (!((p = f.type) === null || p === void 0 || (p = p.spec) === null || p === void 0) && p.code || !(f.isText || f.isTextblock || f.isInline)) return;
    const S = (m = (g = (y = f.content) === null || y === void 0 ? void 0 : y.size) !== null && g !== void 0 ? g : f.nodeSize) !== null && m !== void 0 ? m : 0, b = Math.max(r, h), M = Math.min(o, h + S);
    if (b >= M) return;
    const D = f.isText ? f.text || "" : f.textBetween(b - h, M - h, void 0, "￼");
    Ad(D, s.find, i).forEach((A) => {
      if (A.index === void 0) return;
      const x = b + A.index + 1, N = x + A[0].length, w = {
        from: n.tr.mapping.map(x),
        to: n.tr.mapping.map(N)
      }, _ = s.handler({
        state: n,
        range: w,
        match: A,
        commands: a,
        chain: d,
        can: c,
        pasteEvent: i,
        dropEvent: l
      });
      u.push(_);
    });
  }), u.every((f) => f !== null);
}
let Mt = null;
const Rd = (t) => {
  var e;
  const n = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
  return (e = n.clipboardData) === null || e === void 0 || e.setData("text/html", t), n;
};
function Bs(t) {
  const { editor: e, rules: n } = t;
  let r = null, o = !1, s = !1, i = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({ state: d, from: c, to: u, rule: f, pasteEvt: h }) => {
    const p = d.tr, m = mt({
      state: d,
      transaction: p
    });
    if (!(!Pd({
      editor: e,
      state: m,
      from: Math.max(c - 1, 0),
      to: u.b - 1,
      rule: f,
      pasteEvent: h,
      dropEvent: l
    }) || !p.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return i = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, p;
    }
  };
  return n.map((d) => new G({
    view(c) {
      const u = (h) => {
        var p;
        r = !((p = c.dom.parentElement) === null || p === void 0) && p.contains(h.target) ? c.dom.parentElement : null, r && (Mt = e);
      }, f = () => {
        Mt && (Mt = null);
      };
      return window.addEventListener("dragstart", u), window.addEventListener("dragend", f), { destroy() {
        window.removeEventListener("dragstart", u), window.removeEventListener("dragend", f);
      } };
    },
    props: { handleDOMEvents: {
      drop: (c, u) => {
        if (s = r === c.dom.parentElement, l = u, !s) {
          const f = Mt;
          f?.isEditable && setTimeout(() => {
            const h = f.state.selection;
            h && f.commands.deleteRange({
              from: h.from,
              to: h.to
            });
          }, 10);
        }
        return !1;
      },
      paste: (c, u) => {
        var f;
        const h = (f = u.clipboardData) === null || f === void 0 ? void 0 : f.getData("text/html");
        return i = u, o = !!h?.includes("data-pm-slice"), !1;
      }
    } },
    appendTransaction: (c, u, f) => {
      const h = c[0], p = h.getMeta("uiEvent") === "paste" && !o, m = h.getMeta("uiEvent") === "drop" && !s, g = h.getMeta("applyPasteRules"), y = !!g;
      if (!p && !m && !y) return;
      if (y) {
        let { text: M } = g;
        typeof M == "string" ? M = M : M = bt(T.from(M), f.schema);
        const { from: D } = g, A = D + M.length, x = Rd(M);
        return a({
          rule: d,
          state: f,
          from: D,
          to: { b: A },
          pasteEvt: x
        });
      }
      const S = u.doc.content.findDiffStart(f.doc.content), b = u.doc.content.findDiffEnd(f.doc.content);
      if (!(!Es(S) || !b || S === b.b))
        return a({
          rule: d,
          state: f,
          from: S,
          to: b,
          pasteEvt: i
        });
    }
  }));
}
var Jt = class {
  constructor(t, e) {
    this.splittableMarks = [], this.nonClearableMarks = [], this.decorationManager = null, this.editor = e, this.baseExtensions = t, this.extensions = Ft(t), this.schema = _n(this.extensions, e), this.setupExtensions();
  }
  /**
  * Get all commands from the extensions.
  * @returns An object with all commands where the key is the command name and the value is the command function
  */
  get commands() {
    return this.extensions.reduce((t, e) => {
      const n = k(e, "addCommands", {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: Ce(e.name, this.schema)
      });
      return n ? {
        ...t,
        ...n()
      } : t;
    }, {});
  }
  /**
  * Get all registered Prosemirror plugins from the extensions.
  * @returns An array of Prosemirror plugins
  */
  get plugins() {
    const { editor: t } = this, e = He([...this.extensions].reverse()).flatMap((r) => {
      const o = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: t,
        type: Ce(r.name, this.schema)
      }, s = [], i = k(r, "addKeyboardShortcuts", o);
      let l = {};
      if (r.type === "mark" && k(r, "exitable", o) && (l.ArrowRight = () => Is.handleExit({
        editor: t,
        mark: r
      })), i) {
        const f = Object.fromEntries(Object.entries(i()).map(([h, p]) => [h, () => p({ editor: t })]));
        l = {
          ...l,
          ...f
        };
      }
      const a = ga(l);
      s.push(a);
      const d = k(r, "addInputRules", o);
      if (kn(r, t.options.enableInputRules) && d) {
        const f = d();
        if (f && f.length) {
          const h = Rs({
            editor: t,
            rules: f
          }), p = Array.isArray(h) ? h : [h];
          s.push(...p);
        }
      }
      const c = k(r, "addPasteRules", o);
      if (kn(r, t.options.enablePasteRules) && c) {
        const f = c();
        if (f && f.length) {
          const h = Bs({
            editor: t,
            rules: f
          });
          s.push(...h);
        }
      }
      const u = k(r, "addProseMirrorPlugins", o);
      if (u) {
        const f = u();
        s.push(...f);
      }
      return s;
    }), n = this.createDecorationPlugin();
    return n && e.push(n), e;
  }
  /**
  * Aggregates decorations from extensions into a single plugin, or returns null
  * if none exist. Destroys the previous manager to avoid orphaned listeners.
  * @returns A ProseMirror plugin or `null`
  * @example
  * const plugin = editor.extensionManager.createDecorationPlugin()
  */
  createDecorationPlugin() {
    var t;
    const { editor: e } = this;
    (t = this.decorationManager) === null || t === void 0 || t.destroy();
    const n = [];
    return this.extensions.forEach((r) => {
      const o = k(r, "addDecorations", {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ce(r.name, this.schema)
      });
      o && n.push({
        name: r.name,
        addDecorations: o
      });
    }), this.decorationManager = new Ts({
      editor: e,
      entries: n
    }), this.decorationManager.plugin;
  }
  /**
  * Get all attributes from the extensions.
  * @returns An array of attributes
  */
  get attributes() {
    return Wn(this.extensions);
  }
  /**
  * Get all node views from the extensions.
  * @returns An object with all node views where the key is the node name and the value is the node view function
  */
  get nodeViews() {
    const { editor: t } = this, { nodeExtensions: e } = $e(this.extensions);
    return Object.fromEntries(e.filter((n) => !!k(n, "addNodeView")).map((n) => {
      const r = this.attributes.filter((l) => l.type === n.name), o = k(n, "addNodeView", {
        name: n.name,
        options: n.options,
        storage: this.editor.extensionStorage[n.name],
        editor: t,
        type: P(n.name, this.schema)
      });
      if (!o) return [];
      const s = o();
      if (!s) return [];
      const i = (l, a, d, c, u) => {
        const f = at(l, r);
        return s({
          node: l,
          view: a,
          getPos: d,
          decorations: c,
          innerDecorations: u,
          editor: t,
          extension: n,
          HTMLAttributes: f
        });
      };
      return [n.name, i];
    }));
  }
  /**
  * Get the composed dispatchTransaction function from all extensions.
  * @param baseDispatch The base dispatch function (e.g. from the editor or user props)
  * @returns A composed dispatch function
  */
  dispatchTransaction(t) {
    const { editor: e } = this;
    return He([...this.extensions].reverse()).reduceRight((n, r) => {
      const o = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ce(r.name, this.schema)
      }, s = k(r, "dispatchTransaction", o);
      return s ? (i) => {
        s.call(o, {
          transaction: i,
          next: n
        });
      } : n;
    }, t);
  }
  /**
  * Get the composed transformPastedHTML function from all extensions.
  * @param baseTransform The base transform function (e.g. from the editor props)
  * @returns A composed transform function that chains all extension transforms
  */
  transformPastedHTML(t) {
    const { editor: e } = this;
    return He([...this.extensions]).reduce((n, r) => {
      const o = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ce(r.name, this.schema)
      }, s = k(r, "transformPastedHTML", o);
      return s ? (i, l) => {
        const a = n(i, l);
        return s.call(o, a);
      } : n;
    }, t || ((n) => n));
  }
  get markViews() {
    const { editor: t } = this, { markExtensions: e } = $e(this.extensions);
    return Object.fromEntries(e.filter((n) => !!k(n, "addMarkView")).map((n) => {
      const r = this.attributes.filter((i) => i.type === n.name), o = k(n, "addMarkView", {
        name: n.name,
        options: n.options,
        storage: this.editor.extensionStorage[n.name],
        editor: t,
        type: te(n.name, this.schema)
      });
      if (!o) return [];
      const s = (i, l, a) => {
        const d = at(i, r);
        return o()({
          mark: i,
          view: l,
          inline: a,
          editor: t,
          extension: n,
          HTMLAttributes: d,
          updateAttributes: (c) => {
            Zn(i, t, c);
          }
        });
      };
      return [n.name, s];
    }));
  }
  /**
  * Destroy the extension manager and clean up all extension references
  * to prevent memory leaks through parent/child extension chains.
  *
  * Walks each extension's full parent chain and nulls every forward
  * `parent.child → current` link where the parent still points to the
  * current node. This breaks the retention path from module-scope
  * singleton roots through deep extend() chains.
  *
  * Only ancestor `.child` links matching the current chain are cleared.
  * The `.parent` pointer on ancestors is never touched — extensions
  * may be shared across live editors, so their own backward references
  * and non-matching forward links must remain intact.
  */
  destroy() {
    var t;
    (t = this.decorationManager) === null || t === void 0 || t.destroy(), this.extensions.forEach((e) => {
      let n = e;
      for (; n.parent; ) {
        const r = n.parent;
        r.child === n && (r.child = null), n = r;
      }
    }), this.extensions = [], this.baseExtensions = [], this.decorationManager = null, this.schema = null, this.editor = null;
  }
  /**
  * Go through all extensions, create extension storages & setup marks
  * & bind editor event listener.
  */
  setupExtensions() {
    const t = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(t.map((e) => [e.name, e.storage])), t.forEach((e) => {
      const n = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: Ce(e.name, this.schema)
      };
      if (e.type === "mark") {
        var r, o;
        (!((r = O(k(e, "keepOnSplit", n))) !== null && r !== void 0) || r) && this.splittableMarks.push(e.name), !((o = O(k(e, "clearable", n))) !== null && o !== void 0) || o || this.nonClearableMarks.push(e.name);
      }
      const s = k(e, "onBeforeCreate", n), i = k(e, "onCreate", n), l = k(e, "onUpdate", n), a = k(e, "onSelectionUpdate", n), d = k(e, "onTransaction", n), c = k(e, "onFocus", n), u = k(e, "onBlur", n), f = k(e, "onDestroy", n);
      s && this.editor.on("beforeCreate", s), i && this.editor.on("create", i), l && this.editor.on("update", l), a && this.editor.on("selectionUpdate", a), d && this.editor.on("transaction", d), c && this.editor.on("focus", c), u && this.editor.on("blur", u), f && this.editor.on("destroy", f);
    });
  }
};
Jt.resolve = Ft;
Jt.sort = He;
Jt.flatten = Lt;
var Q = class Vs extends qt {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Vs(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
};
const zs = Q.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: o } = e, s = Ht(n), { blockSeparator: i } = this.options, l = {
          ...i !== void 0 ? { blockSeparator: i } : {},
          textSerializers: s
        };
        return [...o.ranges].sort((a, d) => a.$from.pos - d.$from.pos).map(({ $from: a, $to: d }) => qn(r, {
          from: a.pos,
          to: d.pos
        }, l)).join(i ?? `

`);
      } }
    })];
  }
}), Ls = Q.create({
  name: "commands",
  addCommands() {
    return { ...gs };
  }
}), Fs = Q.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r;
    const o = () => {
      var s, i, l;
      if ((s = (i = this.editor.options.coreExtensionOptions) === null || i === void 0 || (i = i.delete) === null || i === void 0 || (l = i.filterTransaction) === null || l === void 0 ? void 0 : l.call(i, t)) !== null && s !== void 0 ? s : t.getMeta("y-sync$")) return;
      const a = Xo(t.before, [t, ...e]);
      Jn(a).forEach((c) => {
        a.mapping.mapResult(c.oldRange.from).deletedAfter && a.mapping.mapResult(c.oldRange.to).deletedBefore && a.before.nodesBetween(c.oldRange.from, c.oldRange.to, (u, f) => {
          const h = f + u.nodeSize - 2, p = c.oldRange.from <= f && h <= c.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: u,
            from: f,
            to: h,
            newFrom: a.mapping.map(f),
            newTo: a.mapping.map(h),
            deletedRange: c.oldRange,
            newRange: c.newRange,
            partial: !p,
            editor: this.editor,
            transaction: t,
            combinedTransform: a
          });
        });
      });
      const d = a.mapping;
      a.steps.forEach((c, u) => {
        if (c instanceof ii) {
          var f, h;
          const p = d.slice(u).map(c.from, -1), m = d.slice(u).map(c.to), g = d.invert().map(p, -1), y = d.invert().map(m), S = p > 0 ? (f = a.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((M) => M.eq(c.mark)) : !1, b = (h = a.doc.nodeAt(m)) === null || h === void 0 ? void 0 : h.marks.some((M) => M.eq(c.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: c.mark,
            from: c.from,
            to: c.to,
            deletedRange: {
              from: g,
              to: y
            },
            newRange: {
              from: p,
              to: m
            },
            partial: !!(b || S),
            editor: this.editor,
            transaction: t,
            combinedTransform: a
          });
        }
      });
    };
    !((n = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && n !== void 0) || n ? setTimeout(o, 0) : o();
  }
}), js = Q.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("tiptapDrop"),
      props: { handleDrop: (t, e, n, r) => {
        this.editor.emit("drop", {
          editor: this.editor,
          event: e,
          slice: n,
          moved: r
        });
      } }
    })];
  }
}), Hs = Q.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
}), Ks = new ce("focusEvents"), Ws = Q.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [new G({
      key: Ks,
      props: { handleDOMEvents: {
        focus: (e, n) => {
          t.isFocused = !0;
          const r = t.state.tr.setMeta("focus", { event: n }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        },
        blur: (e, n) => {
          t.isFocused = !1;
          const r = t.state.tr.setMeta("blur", { event: n }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        }
      } }
    })];
  }
}), _s = Q.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const t = () => this.editor.commands.first(({ commands: i }) => [
      () => i.undoInputRule(),
      () => i.command(({ tr: l }) => {
        const { selection: a, doc: d } = l, { empty: c, $anchor: u } = a, { pos: f, parent: h } = u, p = u.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : u, m = p.parent.type.spec.isolating, g = u.pos - u.parentOffset, y = m && p.parent.childCount === 1 ? g === u.pos : L.atStart(d).from === f;
        return !c || !h.type.isTextblock || h.textContent.length || !y || y && u.parent.type.name === "paragraph" ? !1 : i.clearNodes();
      }),
      () => i.deleteSelection(),
      () => i.joinBackward(),
      () => i.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: i }) => [
      () => i.deleteSelection(),
      () => i.deleteCurrentNode(),
      () => i.joinForward(),
      () => i.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: i }) => [
        () => i.newlineInCode(),
        () => i.createParagraphNear(),
        () => i.liftEmptyBlock(),
        () => i.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: t,
      "Mod-Backspace": t,
      "Shift-Backspace": t,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, o = { ...r }, s = {
      ...r,
      "Ctrl-h": t,
      "Alt-Backspace": t,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Re() || jn() ? s : o;
  },
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("clearDocument"),
      appendTransaction: (t, e, n) => {
        if (t.some((h) => h.getMeta("composition"))) return;
        const r = t.some((h) => h.docChanged) && !e.doc.eq(n.doc), o = t.some((h) => h.getMeta("preventClearDocument"));
        if (!r || o) return;
        const { empty: s, from: i, to: l } = e.selection, a = L.atStart(e.doc).from, d = L.atEnd(e.doc).to;
        if (s || !(i === a && l === d) || !Kt(n.doc)) return;
        const c = n.tr, u = mt({
          state: n,
          transaction: c
        }), { commands: f } = new ve({
          editor: this.editor,
          state: u
        });
        if (f.clearNodes(), !!c.steps.length)
          return c;
      }
    })];
  }
}), qs = Q.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("tiptapPaste"),
      props: { handlePaste: (t, e, n) => {
        this.editor.emit("paste", {
          editor: this.editor,
          event: e,
          slice: n
        });
      } }
    })];
  }
}), Us = Q.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("tabindex"),
      props: { attributes: () => {
        var t;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (t = this.options.value) !== null && t !== void 0 ? t : "0" };
      } }
    })];
  }
}), Js = Q.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: t } = $e(this.extensions);
    return [{
      types: t.filter((e) => e.name !== "text").map((e) => e.name),
      attributes: { dir: {
        default: this.options.direction,
        parseHTML: (e) => {
          const n = e.getAttribute("dir");
          return n && (n === "ltr" || n === "rtl" || n === "auto") ? n : this.options.direction;
        },
        renderHTML: (e) => e.dir ? { dir: e.dir } : {}
      } }
    }];
  },
  addProseMirrorPlugins() {
    return [new G({
      key: new ce("textDirection"),
      props: { attributes: () => {
        const t = this.options.direction;
        return t ? { dir: t } : {};
      } }
    })];
  }
});
var Id = /* @__PURE__ */ Tn({
  ClipboardTextSerializer: () => zs,
  Commands: () => Ls,
  Delete: () => Fs,
  Drop: () => js,
  Editable: () => Hs,
  FocusEvents: () => Ws,
  Keymap: () => _s,
  Paste: () => qs,
  Tabindex: () => Us,
  TextDirection: () => Js,
  focusEventsPluginKey: () => Ks
});
let Wr = !1;
function $d(t) {
  if (Wr) return;
  Wr = !0;
  let e;
  try {
    e = Dn.fromJSON(t, {
      from: 0,
      to: 0
    }).slice.content;
  } catch {
    return;
  }
  e instanceof T || console.warn("[tiptap warn]: prosemirror-model is loaded more than once. Wrapping and splitting nodes will fail. Deduplicate it in your lock file, or alias it to a single copy in your bundler.");
}
var Ys = class Ze {
  get name() {
    return this.node.type.name;
  }
  constructor(e, n, r = !1, o = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = n, this.currentNode = o;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let n = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      n = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({
      from: n,
      to: r
    }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0) return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), n = this.resolvedPos.doc.resolve(e);
    return new Ze(n, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new Ze(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new Ze(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((n, r) => {
      const o = n.isBlock && !n.isTextblock, s = n.isAtom && !n.isText, i = n.isInline, l = this.pos + r + (s ? 0 : 1);
      if (l < 0 || l > this.resolvedPos.doc.nodeSize - 2) return;
      const a = this.resolvedPos.doc.resolve(l);
      if (!o && !i && a.depth <= this.depth) return;
      const d = new Ze(a, this.editor, o, o || i ? n : null);
      o && (d.actualDepth = this.depth + 1), e.push(d);
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, n = {}) {
    let r = null, o = this.parent;
    for (; o && !r; ) {
      if (o.node.type.name === e) if (Object.keys(n).length > 0) {
        const s = o.node.attrs, i = Object.keys(n);
        for (let l = 0; l < i.length; l += 1) {
          const a = i[l];
          if (s[a] !== n[a]) break;
        }
      } else r = o;
      o = o.parent;
    }
    return r;
  }
  querySelector(e, n = {}) {
    return this.querySelectorAll(e, n, !0)[0] || null;
  }
  querySelectorAll(e, n = {}, r = !1) {
    let o = [];
    if (!this.children || this.children.length === 0) return o;
    const s = Object.keys(n);
    return this.children.forEach((i) => {
      r && o.length > 0 || (i.node.type.name === e && s.every((l) => n[l] === i.node.attrs[l]) && o.push(i), !(r && o.length > 0) && (o = o.concat(i.querySelectorAll(e, n, r))));
    }), o;
  }
  setAttribute(e) {
    const { tr: n } = this.editor.state;
    n.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(n);
  }
};
const Bd = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
var Vd = class extends id {
  constructor(t = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.hasWarnedStaleDecorationRead = !1, this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      textDirection: void 0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: n }) => {
        throw n;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null,
      enableExtensionDispatchTransaction: !0
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
      getUpdatedPosition: fs,
      createMappablePosition: hs
    }, this.setOptions(t), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: n, slice: r, moved: o }) => this.options.onDrop(n, r, o)), this.on("paste", ({ event: n, slice: r }) => this.options.onPaste(n, r)), this.on("delete", this.options.onDelete);
    const e = this.createDoc();
    if (!this.editorState) {
      const n = wt(e, this.options.autofocus);
      this.editorState = tr.create({
        doc: e,
        schema: this.schema,
        selection: n || void 0
      });
    }
    $d(this.schema), this.options.element && this.mount(this.options.element);
  }
  /**
  * Attach the editor to the DOM, creating a new editor view.
  */
  mount(t) {
    if (typeof document > "u") throw new Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
    this.createView(t), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
  * Remove the editor from the DOM, but still allow remounting at a different point in time
  */
  unmount() {
    if (this.editorView) {
      this.editorState = this.editorView.state;
      const t = this.editorView.dom;
      t?.editor && delete t.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
      typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
    } catch (t) {
      console.warn("Failed to remove CSS element:", t);
    }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
  * Returns the editor storage.
  */
  get storage() {
    return this.extensionStorage;
  }
  /**
  * An object of all registered commands.
  */
  get commands() {
    return this.commandManager.commands;
  }
  /**
  * Create a command chain to call multiple commands at once.
  */
  chain() {
    return this.commandManager ? this.commandManager.chain() : ve.createFakeChain();
  }
  /**
  * Check if a command or a command chain can be executed. Without executing it.
  */
  can() {
    return this.commandManager ? this.commandManager.can() : ve.createFallbackCan();
  }
  /**
  * Inject CSS styles.
  */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = Ns(Bd, this.options.injectNonce));
  }
  /**
  * Update editor options.
  *
  * @param options A list of options
  */
  setOptions(t = {}) {
    this.options = {
      ...this.options,
      ...t
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
  * Update editable state of the editor.
  */
  setEditable(t, e = !0) {
    this.setOptions({ editable: t }), e && this.emit("update", {
      editor: this,
      transaction: this.state.tr,
      appendedTransactions: []
    });
  }
  /**
  * Returns whether the editor is editable.
  */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
  * Returns the editor view.
  */
  get view() {
    return this.editorView ? this.editorView : new Proxy({
      state: this.editorState,
      updateState: (t) => {
        this.editorState = t;
      },
      dispatch: (t) => {
        this.dispatchTransaction(t);
      },
      composing: !1,
      dragging: null,
      editable: !0,
      isDestroyed: !1
    }, { get: (t, e) => {
      if (this.editorView) return this.editorView[e];
      if (e === "state") return this.editorState;
      if (e in t) return Reflect.get(t, e);
      throw new Error(`[tiptap error]: The editor view is not available. Cannot access view['${e}']. The editor may not be mounted yet.`);
    } });
  }
  /**
  * Returns the editor state.
  */
  get state() {
    return ys && !this.hasWarnedStaleDecorationRead && sd(this) && (this.hasWarnedStaleDecorationRead = !0, console.warn("[tiptap warn]: `editor.state` was read while decoration `create()` was running. It returns the pre-transaction document. Use the `state` argument passed to `create()` instead. Helpers like `editor.isActive()` read `editor.state` too, so pass `state` to their standalone versions instead of calling them on the editor.")), this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
  * Register a ProseMirror plugin.
  *
  * @param plugin A ProseMirror plugin
  * @param handlePlugins Control how to merge the plugin into the existing plugins.
  * @returns The new editor state
  */
  registerPlugin(t, e) {
    const n = Kn(e) ? e(t, [...this.state.plugins]) : [...this.state.plugins, t], r = this.state.reconfigure({ plugins: n });
    return this.view.updateState(r), r;
  }
  /**
  * Unregister a ProseMirror plugin.
  *
  * @param nameOrPluginKeyToRemove The plugins name
  * @returns The new editor state or undefined if the editor is destroyed
  */
  unregisterPlugin(t) {
    if (this.isDestroyed) return;
    const e = this.state.plugins;
    let n = e;
    if ([].concat(t).forEach((o) => {
      const s = typeof o == "string" ? `${o}$` : o.key;
      n = n.filter((i) => !i.key.startsWith(s));
    }), e.length === n.length) return;
    const r = this.state.reconfigure({ plugins: n });
    return this.view.updateState(r), r;
  }
  /**
  * Creates an extension manager.
  */
  createExtensionManager() {
    var t, e;
    const n = [...this.options.enableCoreExtensions ? [
      Hs,
      zs.configure({ blockSeparator: (t = this.options.coreExtensionOptions) === null || t === void 0 || (t = t.clipboardTextSerializer) === null || t === void 0 ? void 0 : t.blockSeparator }),
      Ls,
      Ws,
      _s,
      Us.configure({ value: (e = this.options.coreExtensionOptions) === null || e === void 0 || (e = e.tabindex) === null || e === void 0 ? void 0 : e.value }),
      js,
      qs,
      Fs,
      Js.configure({ direction: this.options.textDirection })
    ].filter((r) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[r.name] !== !1 : !0) : [], ...this.options.extensions].filter((r) => [
      "extension",
      "node",
      "mark"
    ].includes(r?.type));
    this.extensionManager = new Jt(n, this);
  }
  /**
  * Creates an command manager.
  */
  createCommandManager() {
    this.commandManager = new ve({ editor: this });
  }
  /**
  * Creates a ProseMirror schema.
  */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
  * Creates the initial document.
  */
  createDoc() {
    let t;
    try {
      t = vt(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (e) {
      if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) throw e;
      const n = vt(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
      return this.editorState = tr.create({
        doc: n,
        schema: this.schema,
        selection: wt(n, this.options.autofocus) || void 0
      }), this.emit("contentError", {
        editor: this,
        error: e,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((r) => r.name !== "collaboration"), this.createExtensionManager();
        }
      }), this.editorState.doc;
    }
    return t;
  }
  /**
  * Creates a ProseMirror view.
  */
  createView(t) {
    const { editorProps: e, enableExtensionDispatchTransaction: n } = this.options, r = e.dispatchTransaction || this.dispatchTransaction.bind(this), o = n ? this.extensionManager.dispatchTransaction(r) : r, s = e.transformPastedHTML, i = this.extensionManager.transformPastedHTML(s);
    this.editorView = new Wo(t, {
      ...e,
      attributes: {
        role: "textbox",
        ...e?.attributes
      },
      dispatchTransaction: o,
      transformPastedHTML: i,
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const l = this.state.reconfigure({ plugins: this.extensionManager.plugins });
    this.view.updateState(l), this.prependClass(), this.injectCSS();
    const a = this.view.dom;
    a.editor = this;
  }
  /**
  * Creates all node and mark views.
  */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
  * Prepend class name to element.
  */
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(t) {
    this.isCapturingTransaction = !0, t(), this.isCapturingTransaction = !1;
    const e = this.capturedTransaction;
    return this.capturedTransaction = null, e;
  }
  /**
  * The callback over which to send transactions (state updates) produced by the view.
  *
  * @param transaction An editor state transaction
  */
  dispatchTransaction(t) {
    if (this.view.isDestroyed) return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = t;
        return;
      }
      t.steps.forEach((d) => {
        var c;
        return (c = this.capturedTransaction) === null || c === void 0 ? void 0 : c.step(d);
      });
      return;
    }
    const { state: e, transactions: n } = this.state.applyTransaction(t), r = !this.state.selection.eq(e.selection), o = n.includes(t), s = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: t,
      nextState: e
    }), !o) return;
    this.view.updateState(e), this.emit("transaction", {
      editor: this,
      transaction: t,
      appendedTransactions: n.slice(1)
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: t
    });
    const i = n.findLast((d) => d.getMeta("focus") || d.getMeta("blur")), l = i?.getMeta("focus"), a = i?.getMeta("blur");
    l && this.emit("focus", {
      editor: this,
      event: l.event,
      transaction: i
    }), a && this.emit("blur", {
      editor: this,
      event: a.event,
      transaction: i
    }), !(t.getMeta("preventUpdate") || !n.some((d) => d.docChanged) || s.doc.eq(e.doc)) && this.emit("update", {
      editor: this,
      transaction: t,
      appendedTransactions: n.slice(1)
    });
  }
  /**
  * Get attributes of the currently selected node or mark.
  */
  getAttributes(t) {
    return ss(this.state, t);
  }
  isActive(t, e) {
    const n = typeof t == "string" ? t : null, r = typeof t == "string" ? e : t;
    return cs(this.state, n, r);
  }
  /**
  * Get the document as JSON.
  */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
  * Get the document as HTML.
  */
  getHTML() {
    return bt(this.state.doc.content, this.schema);
  }
  /**
  * Get the document as text.
  */
  getText(t) {
    const { blockSeparator: e = `

`, textSerializers: n = {} } = t || {};
    return Un(this.state.doc, {
      blockSeparator: e,
      textSerializers: {
        ...Ht(this.schema),
        ...n
      }
    });
  }
  /**
  * Check if there is no content.
  */
  get isEmpty() {
    return Kt(this.state.doc);
  }
  /**
  * Destroy the editor.
  */
  destroy() {
    this.destroyed || (this.destroyed = !0, this.emit("destroy"), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {});
  }
  /**
  * Check if the editor is already destroyed.
  */
  get isDestroyed() {
    var t, e;
    return (t = (e = this.editorView) === null || e === void 0 ? void 0 : e.isDestroyed) !== null && t !== void 0 ? t : !0;
  }
  $node(t, e) {
    var n;
    return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelector(t, e)) || null;
  }
  $nodes(t, e) {
    var n;
    return ((n = this.$doc) === null || n === void 0 ? void 0 : n.querySelectorAll(t, e)) || null;
  }
  $pos(t) {
    const e = this.state.doc.resolve(t), n = t > 0 && e.nodeAfter && !e.nodeAfter.isText && e.nodeAfter.isAtom ? e.nodeAfter : null;
    return new Ys(e, this, !1, n);
  }
  get $doc() {
    return this.$pos(0);
  }
}, St = class {
  static Inline(t, e, n = {}, r) {
    return new Gs(t, e, n, r);
  }
  static Node(t, e, n = {}, r) {
    return new Xs(t, e, n, r);
  }
  /**
  * Creates a widget decoration: a DOM node drawn at a document position.
  *
  * The `key` is the widget's identity. While it stays the same, ProseMirror
  * keeps the widget mounted and only its position tracks the document.
  * `render`, `side`, `destroy` and other options are fixed on first mount.
  * Change the key to remount with new options.
  *
  * @param pos The document position where the widget is drawn.
  * @param render Called once on first mount. Returns the DOM node.
  * @param options Must include a unique `key`. See `WidgetDecorationOptions`.
  * @returns The widget decoration.
  */
  static Widget(t, e, n) {
    const { key: r, ...o } = n;
    return new Qs(t, e, r, o);
  }
}, Gs = class extends St {
  constructor(t, e, n = {}, r) {
    super(), this.kind = "inline", this.from = t, this.to = e, this.attrs = n, this.spec = r;
  }
  get anchor() {
    return this.from;
  }
  toPMDecoration(t) {
    const e = t ? {
      ...this.spec,
      extensionName: t
    } : this.spec;
    return de.inline(this.from, this.to, this.attrs, e);
  }
}, Xs = class extends St {
  constructor(t, e, n = {}, r) {
    super(), this.kind = "node", this.from = t, this.to = e, this.attrs = n, this.spec = r;
  }
  get anchor() {
    return this.from;
  }
  toPMDecoration(t) {
    const e = t ? {
      ...this.spec,
      extensionName: t
    } : this.spec;
    return de.node(this.from, this.to, this.attrs, e);
  }
}, Qs = class extends St {
  constructor(t, e, n, r) {
    super(), this.kind = "widget", this.pos = t, this.render = e, this.key = n, this.spec = r;
  }
  get anchor() {
    return this.pos;
  }
  toPMDecoration(t) {
    const e = t ? {
      ...this.spec,
      key: this.key,
      extensionName: t
    } : {
      ...this.spec,
      key: this.key
    };
    return de.widget(this.pos, this.render, e);
  }
};
function zd(t, e) {
  const n = t;
  let r = n[e];
  if (!r) {
    r = {
      renderers: /* @__PURE__ */ new Map(),
      props: /* @__PURE__ */ new Map(),
      pendingProps: /* @__PURE__ */ new Map(),
      flushScheduled: !1
    }, n[e] = r;
    const o = r;
    t.on("destroy", () => {
      o.pendingProps.clear(), o.renderers.forEach((s) => s.destroy()), o.renderers.clear(), o.props.clear();
    });
  }
  return r;
}
function Ld(t) {
  t.flushScheduled = !1;
  for (const [e, n] of t.pendingProps) {
    const r = t.renderers.get(e);
    r && (r.updateProps(n), t.props.set(e, { ...n }));
  }
  t.pendingProps.clear();
}
function Fd(t) {
  const { editor: e, pos: n, key: r, props: o, cacheKey: s, context: i, create: l, materialize: a, side: d, relaxedSide: c, marks: u, stopEvent: f, ignoreSelection: h, destroy: p } = t, m = zd(e, s);
  if (m.renderers.has(r)) {
    var g;
    const S = (g = m.pendingProps.get(r)) !== null && g !== void 0 ? g : m.props.get(r);
    (!S || !Xn(S, o)) && (m.pendingProps.set(r, o), m.flushScheduled || (m.flushScheduled = !0, queueMicrotask(() => Ld(m))));
  }
  const y = (S, b) => {
    const M = {
      ...o,
      ...i(b)
    };
    let D = m.renderers.get(r);
    return D ? D.updateProps(M) : (D = l(M), m.renderers.set(r, D), m.props.set(r, { ...o })), a(D);
  };
  return St.Widget(n, y, {
    key: r,
    side: d,
    relaxedSide: c,
    marks: u,
    stopEvent: f,
    ignoreSelection: h,
    destroy: (S) => {
      if (!Ds(e).has(r))
        try {
          var b;
          (b = m.renderers.get(r)) === null || b === void 0 || b.destroy(), m.renderers.delete(r), m.props.delete(r), m.pendingProps.delete(r);
        } finally {
          p?.(S);
        }
    }
  });
}
function jd(t) {
  return new Je({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const o = O(t.getAttributes, void 0, r);
      if (o === !1 || o === null) return null;
      const { tr: s } = e, i = r[r.length - 1], l = r[0];
      if (i) {
        const a = l.search(/\S/), d = n.from + l.indexOf(i), c = d + i.length;
        if (Yn(n.from, n.to, e.doc).filter((f) => f.mark.type.excluded.find((h) => h === t.type && h !== f.mark.type)).filter((f) => f.to > d).length) return null;
        c < n.to && s.delete(c, n.to), d > n.from && s.delete(n.from + a, d);
        const u = n.from + a + i.length;
        s.addMark(n.from + a, u, t.type.create(o || {})), s.removeStoredMark(t.type);
      }
    },
    undoable: t.undoable
  });
}
function Hd(t) {
  return new Je({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const o = O(t.getAttributes, void 0, r) || {}, { tr: s } = e, i = n.from;
      let l = n.to;
      const a = t.type.create(o);
      if (r[1]) {
        let d = i + r[0].lastIndexOf(r[1]);
        d > l ? d = l : l = d + r[1].length;
        const c = r[0][r[0].length - 1];
        s.insertText(c, i + r[0].length - 1), s.replaceWith(d, l, a);
      } else if (r[0]) {
        const d = t.type.isInline ? i : i - 1;
        s.insert(d, t.type.create(o)).delete(s.mapping.map(i), s.mapping.map(l));
      }
      s.scrollIntoView();
    },
    undoable: t.undoable
  });
}
function Kd(t) {
  return new Je({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      const o = e.doc.resolve(n.from), s = O(t.getAttributes, void 0, r) || {};
      if (!o.node(-1).canReplaceWith(o.index(-1), o.indexAfter(-1), t.type)) return null;
      e.tr.delete(n.from, n.to).setBlockType(n.from, n.from, t.type, s);
    },
    undoable: t.undoable
  });
}
function Wd(t) {
  return new Je({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      let o = t.replace, s = n.from;
      const i = n.to;
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        o += r[0].slice(l + r[1].length), s += l;
        const a = s - i;
        a > 0 && (o = r[0].slice(l - a, l) + o, s = i);
      }
      e.tr.insertText(o, s, i);
    },
    undoable: t.undoable
  });
}
function _d(t) {
  return new Je({
    find: t.find,
    handler: ({ state: e, range: n, match: r, chain: o }) => {
      const s = O(t.getAttributes, void 0, r) || {}, i = e.tr.delete(n.from, n.to), l = i.doc.resolve(n.from).blockRange(), a = l && xn(l, t.type, s);
      if (!a) return null;
      if (i.wrap(l, a), t.keepMarks && t.editor) {
        const { selection: c, storedMarks: u } = e, { splittableMarks: f } = t.editor.extensionManager, h = u || c.$to.parentOffset && c.$from.marks();
        if (h) {
          const p = h.filter((m) => f.includes(m.type.name));
          i.ensureMarks(p);
        }
      }
      if (t.keepAttributes) {
        const c = t.type.name === "bulletList" || t.type.name === "orderedList" ? "listItem" : "taskList";
        o().updateAttributes(c, s).run();
      }
      const d = i.doc.resolve(n.from - 1).nodeBefore;
      d && d.type === t.type && ke(i.doc, n.from - 1) && (!t.joinPredicate || t.joinPredicate(r, d)) && i.join(n.from - 1);
    },
    undoable: t.undoable
  });
}
const Zs = /* @__PURE__ */ new WeakSet(), er = /* @__PURE__ */ new WeakSet();
function xe(t) {
  const e = t;
  return Zs.add(e), e;
}
function Mn(t) {
  return Array.isArray(t) && Zs.has(t);
}
function ei(t) {
  return t.flatMap((e) => e == null ? [] : Array.isArray(e) && er.has(e) && !Mn(e) ? ei(e) : [e]);
}
function qd(t) {
  return er.add(t.children), t.children;
}
function Ud(t, e) {
  if (t === "slot") return 0;
  if (t instanceof Function) {
    const o = t(e);
    return Array.isArray(o) && !Mn(o) && !er.has(o) ? xe(o) : o;
  }
  const { children: n, ...r } = e ?? {};
  if (t === "svg") throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  if (Array.isArray(n)) {
    if (Mn(n)) return xe([
      t,
      r,
      n
    ]);
    if (n.length === 0) return xe([t, r]);
    const o = ei(n);
    return o.length === 0 ? xe([t, r]) : xe([
      t,
      r,
      ...o
    ]);
  }
  return n != null ? xe([
    t,
    r,
    n
  ]) : xe([t, r]);
}
const _r = (t, e) => Ud(t, e), Jd = (t) => "touches" in t;
var ti = class {
  /**
  * Creates a new ResizableNodeView instance.
  *
  * The constructor sets up the resize handles, applies initial sizing from
  * node attributes, and configures all resize behavior options.
  *
  * @param options - Configuration options for the resizable node view
  */
  constructor(t) {
    var e, n, r, o, s, i;
    this.directions = [
      "bottom-left",
      "bottom-right",
      "top-left",
      "top-right"
    ], this.minSize = {
      height: 8,
      width: 8
    }, this.preserveAspectRatio = !1, this.classNames = {
      container: "",
      wrapper: "",
      handle: "",
      resizing: ""
    }, this.initialWidth = 0, this.initialHeight = 0, this.aspectRatio = 1, this.isResizing = !1, this.activeHandle = null, this.startX = 0, this.startY = 0, this.startWidth = 0, this.startHeight = 0, this.isShiftKeyPressed = !1, this.lastEditableState = void 0, this.handleMap = /* @__PURE__ */ new Map(), this.handleMouseMove = (l) => {
      if (!this.isResizing || !this.activeHandle) return;
      const a = l.clientX - this.startX, d = l.clientY - this.startY;
      this.handleResize(a, d);
    }, this.handleTouchMove = (l) => {
      if (!this.isResizing || !this.activeHandle) return;
      const a = l.touches[0];
      if (!a) return;
      const d = a.clientX - this.startX, c = a.clientY - this.startY;
      this.handleResize(d, c);
    }, this.handleMouseUp = () => {
      if (!this.isResizing) return;
      const l = this.element.offsetWidth, a = this.element.offsetHeight;
      this.onCommit(l, a), this.isResizing = !1, this.activeHandle = null, this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp);
    }, this.handleKeyDown = (l) => {
      l.key === "Shift" && (this.isShiftKeyPressed = !0);
    }, this.handleKeyUp = (l) => {
      l.key === "Shift" && (this.isShiftKeyPressed = !1);
    }, this.node = t.node, this.editor = t.editor, this.element = t.element, this.element.draggable = !1, this.contentElement = t.contentElement, this.getPos = t.getPos, this.onResize = t.onResize, this.onCommit = t.onCommit, this.onUpdate = t.onUpdate, !((e = t.options) === null || e === void 0) && e.min && (this.minSize = {
      ...this.minSize,
      ...t.options.min
    }), !((n = t.options) === null || n === void 0) && n.max && (this.maxSize = t.options.max), !(t == null || (r = t.options) === null || r === void 0) && r.directions && (this.directions = t.options.directions), !((o = t.options) === null || o === void 0) && o.preserveAspectRatio && (this.preserveAspectRatio = t.options.preserveAspectRatio), !((s = t.options) === null || s === void 0) && s.className && (this.classNames = {
      container: t.options.className.container || "",
      wrapper: t.options.className.wrapper || "",
      handle: t.options.className.handle || "",
      resizing: t.options.className.resizing || ""
    }), !((i = t.options) === null || i === void 0) && i.createCustomHandle && (this.createCustomHandle = t.options.createCustomHandle), this.wrapper = this.createWrapper(), this.container = this.createContainer(), this.applyInitialSize(), this.attachHandles(), this.editor.on("update", this.handleEditorUpdate.bind(this));
  }
  /**
  * Returns the top-level DOM node that should be placed in the editor.
  *
  * This is required by the ProseMirror NodeView interface. The container
  * includes the wrapper, handles, and the actual content element.
  *
  * @returns The container element to be inserted into the editor
  */
  get dom() {
    return this.container;
  }
  get contentDOM() {
    var t;
    return (t = this.contentElement) !== null && t !== void 0 ? t : null;
  }
  handleEditorUpdate() {
    const t = this.editor.isEditable;
    t !== this.lastEditableState && (this.lastEditableState = t, t ? t && this.handleMap.size === 0 && this.attachHandles() : this.removeHandles());
  }
  /**
  * Called when the node's content or attributes change.
  *
  * Updates the internal node reference. If a custom `onUpdate` callback
  * was provided, it will be called to handle additional update logic.
  *
  * @param node - The new/updated node
  * @param decorations - Node decorations
  * @param innerDecorations - Inner decorations
  * @returns `false` if the node type has changed (requires full rebuild), otherwise the result of `onUpdate` or `true`
  */
  update(t, e, n) {
    return t.type !== this.node.type ? !1 : (this.node = t, this.onUpdate ? this.onUpdate(t, e, n) : !0);
  }
  /**
  * Cleanup method called when the node view is being removed.
  *
  * Removes all event listeners to prevent memory leaks. This is required
  * by the ProseMirror NodeView interface. If a resize is active when
  * destroy is called, it will be properly cancelled.
  */
  destroy() {
    this.isResizing && (this.container.dataset.resizeState = "false", this.classNames.resizing && this.container.classList.remove(this.classNames.resizing), document.removeEventListener("mousemove", this.handleMouseMove), document.removeEventListener("mouseup", this.handleMouseUp), document.removeEventListener("keydown", this.handleKeyDown), document.removeEventListener("keyup", this.handleKeyUp), this.isResizing = !1, this.activeHandle = null), this.editor.off("update", this.handleEditorUpdate.bind(this)), this.container.remove();
  }
  /**
  * Creates the outer container element.
  *
  * The container is the top-level element returned by the NodeView and
  * wraps the entire resizable node. It's set up with flexbox to handle
  * alignment and includes data attributes for styling and identification.
  *
  * @returns The container element
  */
  createContainer() {
    const t = document.createElement("div");
    return t.dataset.resizeContainer = "", t.dataset.node = this.node.type.name, t.style.display = this.node.type.isInline ? "inline-flex" : "flex", this.classNames.container && (t.className = this.classNames.container), t.appendChild(this.wrapper), t;
  }
  /**
  * Creates the wrapper element that contains the content and handles.
  *
  * The wrapper uses relative positioning so that resize handles can be
  * positioned absolutely within it. This is the direct parent of the
  * content element being made resizable.
  *
  * @returns The wrapper element
  */
  createWrapper() {
    const t = document.createElement("div");
    return t.style.position = "relative", t.style.display = "block", t.dataset.resizeWrapper = "", this.classNames.wrapper && (t.className = this.classNames.wrapper), t.appendChild(this.element), t;
  }
  /**
  * Creates a resize handle element for a specific direction.
  *
  * Each handle is absolutely positioned and includes a data attribute
  * identifying its direction for styling purposes.
  *
  * @param direction - The resize direction for this handle
  * @returns The handle element
  */
  createHandle(t) {
    const e = document.createElement("div");
    return e.dataset.resizeHandle = t, e.style.position = "absolute", this.classNames.handle && (e.className = this.classNames.handle), e;
  }
  /**
  * Positions a handle element according to its direction.
  *
  * Corner handles (e.g., 'top-left') are positioned at the intersection
  * of two edges. Edge handles (e.g., 'top') span the full width or height.
  *
  * @param handle - The handle element to position
  * @param direction - The direction determining the position
  */
  positionHandle(t, e) {
    const n = e.includes("top"), r = e.includes("bottom"), o = e.includes("left"), s = e.includes("right");
    n && (t.style.top = "0"), r && (t.style.bottom = "0"), o && (t.style.left = "0"), s && (t.style.right = "0"), (e === "top" || e === "bottom") && (t.style.left = "0", t.style.right = "0"), (e === "left" || e === "right") && (t.style.top = "0", t.style.bottom = "0");
  }
  /**
  * Creates and attaches all resize handles to the wrapper.
  *
  * Iterates through the configured directions, creates a handle for each,
  * positions it, attaches the mousedown listener, and appends it to the DOM.
  */
  attachHandles() {
    this.directions.forEach((t) => {
      let e;
      this.createCustomHandle ? e = this.createCustomHandle(t) : e = this.createHandle(t), e instanceof HTMLElement || (console.warn(`[ResizableNodeView] createCustomHandle("${t}") did not return an HTMLElement. Falling back to default handle.`), e = this.createHandle(t)), this.createCustomHandle || this.positionHandle(e, t), e.addEventListener("mousedown", (n) => this.handleResizeStart(n, t)), e.addEventListener("touchstart", (n) => this.handleResizeStart(n, t)), this.handleMap.set(t, e), this.wrapper.appendChild(e);
    });
  }
  /**
  * Removes all resize handles from the wrapper.
  *
  * Cleans up the handle map and removes each handle element from the DOM.
  */
  removeHandles() {
    this.handleMap.forEach((t) => t.remove()), this.handleMap.clear();
  }
  /**
  * Applies initial sizing from node attributes to the element.
  *
  * If width/height attributes exist on the node, they're applied to the element.
  * Otherwise, the element's natural/current dimensions are measured. The aspect
  * ratio is calculated for later use in aspect-ratio-preserving resizes.
  */
  applyInitialSize() {
    const t = this.node.attrs.width, e = this.node.attrs.height;
    t ? (this.element.style.width = `${t}px`, this.initialWidth = t) : this.initialWidth = this.element.offsetWidth, e ? (this.element.style.height = `${e}px`, this.initialHeight = e) : this.initialHeight = this.element.offsetHeight, this.initialWidth > 0 && this.initialHeight > 0 && (this.aspectRatio = this.initialWidth / this.initialHeight);
  }
  /**
  * Initiates a resize operation when a handle is clicked.
  *
  * Captures the starting mouse position and element dimensions, sets up
  * the resize state, adds the resizing class and state attribute, and
  * attaches document-level listeners for mouse movement and keyboard input.
  *
  * @param event - The mouse down event
  * @param direction - The direction of the handle being dragged
  */
  handleResizeStart(t, e) {
    t.preventDefault(), t.stopPropagation(), this.isResizing = !0, this.activeHandle = e, Jd(t) ? (this.startX = t.touches[0].clientX, this.startY = t.touches[0].clientY) : (this.startX = t.clientX, this.startY = t.clientY), this.startWidth = this.element.offsetWidth, this.startHeight = this.element.offsetHeight, this.startWidth > 0 && this.startHeight > 0 && (this.aspectRatio = this.startWidth / this.startHeight), this.getPos(), this.container.dataset.resizeState = "true", this.classNames.resizing && this.container.classList.add(this.classNames.resizing), document.addEventListener("mousemove", this.handleMouseMove), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("mouseup", this.handleMouseUp), document.addEventListener("keydown", this.handleKeyDown), document.addEventListener("keyup", this.handleKeyUp);
  }
  handleResize(t, e) {
    if (!this.activeHandle) return;
    const n = this.preserveAspectRatio || this.isShiftKeyPressed, { width: r, height: o } = this.calculateNewDimensions(this.activeHandle, t, e), s = this.applyConstraints(r, o, n);
    this.element.style.width = `${s.width}px`, this.element.style.height = `${s.height}px`, this.onResize && this.onResize(s.width, s.height);
  }
  /**
  * Calculates new dimensions based on mouse delta and resize direction.
  *
  * Takes the starting dimensions and applies the mouse movement delta
  * according to the handle direction. For corner handles, both dimensions
  * are affected. For edge handles, only one dimension changes. If aspect
  * ratio should be preserved, delegates to applyAspectRatio.
  *
  * @param direction - The active resize handle direction
  * @param deltaX - Horizontal mouse movement since resize start
  * @param deltaY - Vertical mouse movement since resize start
  * @returns The calculated width and height
  */
  calculateNewDimensions(t, e, n) {
    let r = this.startWidth, o = this.startHeight;
    const s = t.includes("right"), i = t.includes("left"), l = t.includes("bottom"), a = t.includes("top");
    return s ? r = this.startWidth + e : i && (r = this.startWidth - e), l ? o = this.startHeight + n : a && (o = this.startHeight - n), (t === "right" || t === "left") && (r = this.startWidth + (s ? e : -e)), (t === "top" || t === "bottom") && (o = this.startHeight + (l ? n : -n)), this.preserveAspectRatio || this.isShiftKeyPressed ? this.applyAspectRatio(r, o, t) : {
      width: r,
      height: o
    };
  }
  /**
  * Applies min/max constraints to dimensions.
  *
  * When aspect ratio is NOT preserved, constraints are applied independently
  * to width and height. When aspect ratio IS preserved, constraints are
  * applied while maintaining the aspect ratio—if one dimension hits a limit,
  * the other is recalculated proportionally.
  *
  * This ensures that aspect ratio is never broken when constrained.
  *
  * @param width - The unconstrained width
  * @param height - The unconstrained height
  * @param preserveAspectRatio - Whether to maintain aspect ratio while constraining
  * @returns The constrained dimensions
  */
  applyConstraints(t, e, n) {
    var r, o;
    if (!n) {
      var s, i;
      let d = Math.max(this.minSize.width, t), c = Math.max(this.minSize.height, e);
      return !((s = this.maxSize) === null || s === void 0) && s.width && (d = Math.min(this.maxSize.width, d)), !((i = this.maxSize) === null || i === void 0) && i.height && (c = Math.min(this.maxSize.height, c)), {
        width: d,
        height: c
      };
    }
    let l = t, a = e;
    return l < this.minSize.width && (l = this.minSize.width, a = l / this.aspectRatio), a < this.minSize.height && (a = this.minSize.height, l = a * this.aspectRatio), !((r = this.maxSize) === null || r === void 0) && r.width && l > this.maxSize.width && (l = this.maxSize.width, a = l / this.aspectRatio), !((o = this.maxSize) === null || o === void 0) && o.height && a > this.maxSize.height && (a = this.maxSize.height, l = a * this.aspectRatio), {
      width: l,
      height: a
    };
  }
  /**
  * Adjusts dimensions to maintain the original aspect ratio.
  *
  * For horizontal handles (left/right), uses width as the primary dimension
  * and calculates height from it. For vertical handles (top/bottom), uses
  * height as primary and calculates width. For corner handles, uses width
  * as the primary dimension.
  *
  * @param width - The new width
  * @param height - The new height
  * @param direction - The active resize direction
  * @returns Dimensions adjusted to preserve aspect ratio
  */
  applyAspectRatio(t, e, n) {
    const r = n === "left" || n === "right", o = n === "top" || n === "bottom";
    return r ? {
      width: t,
      height: t / this.aspectRatio
    } : o ? {
      width: e * this.aspectRatio,
      height: e
    } : {
      width: t,
      height: t / this.aspectRatio
    };
  }
};
const Yd = ti;
var Gd = class ni extends qt {
  constructor(...e) {
    super(...e), this.type = "node";
  }
  /**
  * Create a new Node instance
  * @param config - Node configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new ni(n);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const n = typeof e == "function" ? e() : e;
    return super.extend(n);
  }
}, Xd = class {
  constructor(t, e, n) {
    this.isDragging = !1, this.component = t, this.editor = e.editor, this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...n
    }, this.extension = e.extension, this.node = e.node, this.decorations = e.decorations, this.innerDecorations = e.innerDecorations, this.view = e.view, this.HTMLAttributes = e.HTMLAttributes, this.getPos = () => {
      try {
        return e.getPos();
      } catch {
        return;
      }
    }, this.mount();
  }
  mount() {
  }
  get dom() {
    return this.editor.view.dom;
  }
  get contentDOM() {
    return null;
  }
  onDragStart(t) {
    var e, n;
    const { view: r } = this.editor, o = t.target, s = o.nodeType === 3 ? (e = o.parentElement) === null || e === void 0 ? void 0 : e.closest("[data-drag-handle]") : o.closest("[data-drag-handle]");
    if (!this.dom || !((n = this.contentDOM) === null || n === void 0) && n.contains(o) || !s) return;
    let i = 0, l = 0;
    if (this.dom !== s) {
      var a, d, c, u;
      const S = this.dom.getBoundingClientRect(), b = s.getBoundingClientRect(), M = (a = t.offsetX) !== null && a !== void 0 ? a : (d = t.nativeEvent) === null || d === void 0 ? void 0 : d.offsetX, D = (c = t.offsetY) !== null && c !== void 0 ? c : (u = t.nativeEvent) === null || u === void 0 ? void 0 : u.offsetY;
      i = b.x - S.x + M, l = b.y - S.y + D;
    }
    const f = this.dom.cloneNode(!0);
    try {
      const S = this.dom.getBoundingClientRect();
      f.style.width = `${Math.round(S.width)}px`, f.style.height = `${Math.round(S.height)}px`, f.style.boxSizing = "border-box", f.style.pointerEvents = "none";
    } catch {
    }
    let h = null;
    try {
      var p;
      h = document.createElement("div"), h.style.position = "absolute", h.style.top = "-9999px", h.style.left = "-9999px", h.style.pointerEvents = "none", h.appendChild(f), document.body.appendChild(h), (p = t.dataTransfer) === null || p === void 0 || p.setDragImage(f, i, l);
    } finally {
      h && setTimeout(() => {
        try {
          h?.remove();
        } catch {
        }
      }, 0);
    }
    const m = this.getPos();
    if (typeof m != "number") return;
    const g = C.create(r.state.doc, m), y = r.state.tr.setSelection(g);
    r.dispatch(y);
  }
  stopEvent(t) {
    var e;
    if (!this.dom) return !1;
    if (typeof this.options.stopEvent == "function") return this.options.stopEvent({ event: t });
    const n = t.target;
    if (!(this.dom.contains(n) && !(!((e = this.contentDOM) === null || e === void 0) && e.contains(n)))) return !1;
    const r = t.type.startsWith("drag"), o = t.type === "dragover" || t.type === "dragenter", s = t.type === "drop";
    if (([
      "INPUT",
      "BUTTON",
      "SELECT",
      "TEXTAREA"
    ].includes(n.tagName) || n.isContentEditable) && !s && !r) return !0;
    const { isEditable: i } = this.editor, { isDragging: l } = this, a = !!this.node.type.spec.draggable, d = C.isSelectable(this.node), c = t.type === "copy", u = t.type === "paste", f = t.type === "cut", h = t.type === "mousedown";
    if (!a && d && r && t.target === this.dom && t.preventDefault(), a && r && !l && t.target === this.dom)
      return t.preventDefault(), !1;
    if (a && i && !l && h) {
      const p = n.closest("[data-drag-handle]");
      p && (this.dom === p || this.dom.contains(p)) && (this.isDragging = !0, document.addEventListener("dragend", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("drop", () => {
        this.isDragging = !1;
      }, { once: !0 }), document.addEventListener("mouseup", () => {
        this.isDragging = !1;
      }, { once: !0 }));
    }
    return !(l || o || s || c || u || f || h && d);
  }
  /**
  * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
  * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
  * @return `true` if it can safely be ignored.
  */
  ignoreMutation(t) {
    return !this.dom || !this.contentDOM ? !0 : typeof this.options.ignoreMutation == "function" ? this.options.ignoreMutation({ mutation: t }) : this.node.isLeaf || this.node.isAtom ? !0 : t.type === "selection" || this.dom.contains(t.target) && t.type === "childList" && (Re() || lt()) && this.editor.isFocused && [...Array.from(t.addedNodes), ...Array.from(t.removedNodes)].every((e) => e.isContentEditable) ? !1 : this.contentDOM === t.target && t.type === "attributes" ? !0 : !this.contentDOM.contains(t.target);
  }
  /**
  * Update the attributes of the prosemirror node.
  */
  updateAttributes(t) {
    this.editor.commands.command(({ tr: e }) => {
      const n = this.getPos();
      return typeof n != "number" ? !1 : (e.setNodeMarkup(n, void 0, {
        ...this.node.attrs,
        ...t
      }), !0);
    });
  }
  /**
  * Delete the node.
  */
  deleteNode() {
    const t = this.getPos();
    if (typeof t != "number") return;
    const e = t + this.node.nodeSize;
    this.editor.commands.deleteRange({
      from: t,
      to: e
    });
  }
};
function Qd(t) {
  return new Ut({
    find: t.find,
    handler: ({ state: e, range: n, match: r, pasteEvent: o }) => {
      const s = O(t.getAttributes, void 0, r, o);
      if (s === !1 || s === null) return null;
      const { tr: i } = e, l = r[r.length - 1], a = r[0];
      let d = n.to;
      if (l) {
        const c = a.search(/\S/), u = n.from + a.indexOf(l), f = u + l.length;
        if (Yn(n.from, n.to, e.doc).filter((h) => h.mark.type.excluded.find((p) => p === t.type && p !== h.mark.type)).filter((h) => h.to > u).length) return null;
        f < n.to && i.delete(f, n.to), u > n.from && i.delete(n.from + c, u), d = n.from + c + l.length, i.addMark(n.from + c, d, t.type.create(s || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || i.removeStoredMark(t.type);
      }
    }
  });
}
function Zd(t) {
  return new Ut({
    find: t.find,
    handler({ match: e, chain: n, range: r, pasteEvent: o }) {
      const s = O(t.getAttributes, void 0, e, o), i = O(t.getContent, void 0, s);
      if (s === !1 || s === null) return null;
      const l = {
        type: t.type.name,
        attrs: s
      };
      i && (l.content = i), e.input && n().deleteRange(r).insertContentAt(r.from, l);
    }
  });
}
function eu(t) {
  return new Ut({
    find: t.find,
    handler: ({ state: e, range: n, match: r }) => {
      let o = t.replace, s = n.from;
      const i = n.to;
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        o += r[0].slice(l + r[1].length), s += l;
        const a = s - i;
        a > 0 && (o = r[0].slice(l - a, l) + o, s = i);
      }
      e.tr.insertText(o, s, i);
    }
  });
}
var tu = class {
  constructor(t) {
    this.transaction = t, this.currentStep = this.transaction.steps.length;
  }
  map(t) {
    let e = !1;
    return {
      position: this.transaction.steps.slice(this.currentStep).reduce((n, r) => {
        const o = r.getMap().mapResult(n);
        return o.deleted && (e = !0), o.pos;
      }, t),
      deleted: e
    };
  }
};
const ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CommandManager: ve,
  DECORATION_MANAGER_PLUGIN_KEY: Te,
  Decoration: St,
  DecorationManager: Ts,
  Editor: Vd,
  Extendable: qt,
  Extension: Q,
  Fragment: qd,
  InlineDecoration: Gs,
  InputRule: Je,
  MappablePosition: Gn,
  Mark: Is,
  MarkView: wd,
  Node: Gd,
  NodeDecoration: Xs,
  NodePos: Ys,
  NodeView: Xd,
  PasteRule: Ut,
  ResizableNodeView: ti,
  ResizableNodeview: Yd,
  Tracker: tu,
  WidgetDecoration: Qs,
  attrsEqual: Xn,
  callOrReturn: O,
  canInsertNode: yd,
  combineTransactionSteps: Xo,
  commands: gs,
  createAtomBlockMarkdownSpec: Os,
  createBlockMarkdownSpec: ws,
  createChainableState: mt,
  createDocument: vt,
  createElement: _r,
  createInlineMarkdownSpec: vs,
  createMappablePosition: hs,
  createNodeFromContent: Ie,
  createStyleTag: Ns,
  createWidgetDecoration: Fd,
  decodeHtmlEntities: kd,
  defaultBlockAt: Fn,
  deleteProps: bn,
  elementFromString: Fe,
  encodeHtmlEntities: Md,
  escapeForRegEx: bd,
  extensions: Id,
  findChildren: ac,
  findChildrenInRange: cc,
  findDuplicates: ns,
  findParentNode: yt,
  findParentNodeClosestToPos: Qo,
  flattenExtensions: Lt,
  fromString: ts,
  generateHTML: uc,
  generateJSON: fc,
  generateText: hc,
  getAttributes: ss,
  getAttributesFromExtensions: Wn,
  getChangedRanges: Jn,
  getDebugJSON: ls,
  getExtensionField: k,
  getHTMLFromFragment: bt,
  getMarkAttributes: Hn,
  getMarkRange: Vt,
  getMarkType: te,
  getMarksBetween: Yn,
  getNodeAtPosition: mc,
  getNodeAttributes: rs,
  getNodeType: P,
  getPreviousBlockSibling: gc,
  getRenderedAttributes: at,
  getSchema: jt,
  getSchemaByResolvedExtensions: _n,
  getSchemaTypeByName: Ce,
  getSchemaTypeNameByName: gt,
  getSplittedAttributes: nt,
  getStyleProperty: Sd,
  getText: Un,
  getTextBetween: qn,
  getTextContentFromNodes: as,
  getTextSerializersFromSchema: Ht,
  getUpdatedPosition: fs,
  h: _r,
  injectExtensionAttributesToParseRule: Sn,
  inputRulesPlugin: Rs,
  isActive: cs,
  isAndroid: lt,
  isAtEndOfNode: yc,
  isAtStartOfNode: bc,
  isEmptyObject: Zo,
  isExtensionRulesEnabled: kn,
  isFirefox: xd,
  isFunction: Kn,
  isList: xt,
  isMacOS: jn,
  isMarkActive: At,
  isNodeActive: qe,
  isNodeEmpty: Kt,
  isNodeSelection: Sc,
  isNodeViewSelected: kc,
  isNumber: Es,
  isPlainObject: Qe,
  isProseMirrorAddMarkStep: Mc,
  isProseMirrorAddNodeMarkStep: xc,
  isProseMirrorAttrStep: Cc,
  isProseMirrorCellSelection: Dc,
  isProseMirrorDocAttrStep: Tc,
  isProseMirrorFragment: ds,
  isProseMirrorNodeSelection: Nc,
  isProseMirrorRemoveMarkStep: Ec,
  isProseMirrorRemoveNodeMarkStep: Oc,
  isProseMirrorReplaceAroundStep: wc,
  isProseMirrorReplaceStep: vc,
  isProseMirrorSlice: Ac,
  isProseMirrorStep: ue,
  isProseMirrorStepResult: Pc,
  isRegExp: Bt,
  isSafari: Uo,
  isString: Dd,
  isTextSelection: zt,
  isiOS: Re,
  liveWidgetKeys: Ds,
  markInputRule: jd,
  markPasteRule: Qd,
  markdown: Ed,
  marksEqual: Od,
  mergeAttributes: es,
  mergeDeep: Qn,
  minMax: Z,
  nodeInputRule: Hd,
  nodePasteRule: Zd,
  objectIncludes: it,
  parseAttributes: Wt,
  parseIndentedBlocks: As,
  pasteRulesPlugin: Bs,
  posToDOMRect: Rc,
  removeDuplicates: is,
  renderNestedMarkdownContent: Ps,
  resolveExtensions: Ft,
  resolveFocusPosition: wt,
  rewriteUnknownContent: Ic,
  selectionToInsertionEnd: Ln,
  serializeAttributes: _t,
  sortExtensions: He,
  splitExtensions: $e,
  textInputRule: Wd,
  textPasteRule: eu,
  textblockTypeInputRule: Kd,
  updateMarkViewAttributes: Zn,
  wrappingInputRule: _d
}, Symbol.toStringTag, { value: "Module" }));
export {
  mc as A,
  P as B,
  ru as C,
  v as D,
  Q as E,
  Je as I,
  Is as M,
  Gd as N,
  Ut as P,
  Qd as a,
  jd as b,
  yd as c,
  de as d,
  O as e,
  Kt as f,
  k as g,
  Jn as h,
  Sc as i,
  Xo as j,
  ya as k,
  cc as l,
  es as m,
  Hd as n,
  Yn as o,
  ss as p,
  Sd as q,
  As as r,
  at as s,
  Kd as t,
  Ps as u,
  qe as v,
  _d as w,
  gc as x,
  bc as y,
  yc as z
};
