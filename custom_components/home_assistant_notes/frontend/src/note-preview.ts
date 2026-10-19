import { css } from 'lit';

// Shared by the panel's list item and the Lovelace card. Kept free of any
// customElements.define so the card (loaded early via add_extra_js_url,
// before HA installs its scoped-registry polyfill) can use it without
// defining elements natively.
const PREVIEW_ALLOWED_TAGS = new Set([
  'P', 'BR', 'UL', 'OL', 'LI', 'LABEL', 'SPAN', 'DIV',
  'STRONG', 'B', 'EM', 'I', 'S', 'U', 'MARK', 'INPUT',
]);

function cleanPreviewNode(node: Node): void {
  // Walk with an explicit next-sibling pointer captured before any mutation,
  // rather than a childNodes snapshot — a snapshot goes stale as soon as one
  // sibling is unwrapped/removed, and a later removeChild on another
  // already-detached sibling throws NotFoundError.
  let child = node.firstChild;
  while (child) {
    const next: ChildNode | null = child.nextSibling;
    if (child.nodeType === Node.TEXT_NODE) {
      child = next;
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) {
      node.removeChild(child);
      child = next;
      continue;
    }
    const el = child as HTMLElement;
    if (!PREVIEW_ALLOWED_TAGS.has(el.tagName)) {
      // Unwrap disallowed elements (e.g. <a>) instead of dropping their
      // text — script/style are the only ones dropped outright.
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') {
        el.remove();
        child = next;
        continue;
      }
      const firstMoved = el.firstChild;
      while (el.firstChild) node.insertBefore(el.firstChild, el);
      node.removeChild(el);
      // Re-visit the just-unwrapped content (it may itself contain disallowed
      // tags) before continuing on to `next`.
      child = firstMoved ?? next;
      continue;
    }
    Array.from(el.attributes).forEach((attr) => {
      const keep = (el.tagName === 'INPUT' && attr.name === 'checked')
        || (el.tagName === 'UL' && attr.name === 'data-type')
        || (el.tagName === 'LI' && attr.name === 'data-checked');
      if (!keep) el.removeAttribute(attr.name);
    });
    if (el.tagName === 'INPUT') {
      el.setAttribute('type', 'checkbox');
      el.setAttribute('disabled', '');
    }
    cleanPreviewNode(el);
    child = next;
  }
}

// Renders a trusted-but-structural preview of note content: real
// <ul>/<li>/checkbox markup (so the list preview shows bullets/checkboxes
// like the editor does) instead of flattened plain text, with everything
// but a small structural tag allowlist stripped to avoid injecting
// arbitrary markup/scripts from note content into the shadow DOM.
export function notePreviewHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  cleanPreviewNode(doc.body);
  Array.from(doc.body.querySelectorAll('p')).forEach((p) => {
    if (!p.textContent?.trim() && !p.querySelector('input')) p.remove();
  });
  return doc.body.innerHTML;
}

export const notePreviewStyles = css`
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
`;
