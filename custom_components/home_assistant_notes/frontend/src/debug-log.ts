import type { HomeAssistant } from './ha-types';
import { scrollableAncestors } from './scroll-utils';

// Opt-in caret/scroll diagnostics for chasing editor bugs on real devices
// (e.g. the caret jumping on a phone, where there is no dev console).
//
//   localStorage.setItem('home-assistant-notes-debug', '1')   then reload the panel
//   localStorage.removeItem('home-assistant-notes-debug')     to switch it off
//
// While on, every editor transaction that touches the selection/doc/scroll, DOM
// selection change, input/focus event and container scroll is logged to the
// browser console and forwarded to Home Assistant's log (logger
// `home_assistant_notes.debug`), so it can be read with
// `docker compose -f dev/docker-compose.yml logs | grep home_assistant_notes.debug`.
// Entries start with "[caret]". Off by default and costs nothing when off.

const FLAG = 'home-assistant-notes-debug';
export const DEBUG_EVENT = 'home-assistant-notes-debug';

export function isDebugEnabled(): boolean {
  try { return !!localStorage.getItem(FLAG); } catch { return false; }
}

// Minimal view of the Tiptap editor used here, so this file stays decoupled.
interface DebugEditor {
  isFocused: boolean;
  state: { selection: any; doc: any };
  on(event: 'transaction', cb: (props: { transaction: any }) => void): unknown;
}

// Starts logging for `editor`, emitting DEBUG_EVENT (bubbling, composed) from
// `host` for the panel to forward. Returns a function that stops logging.
export function attachCaretLogger(host: HTMLElement, editor: DebugEditor): () => void {
  const t0 = performance.now();
  const cleanups: Array<() => void> = [];
  const log = (label: string, extra: Record<string, unknown> = {}) => {
    const { selection, doc } = editor.state;
    const last = (i: number) => doc.child(doc.childCount - i);
    const tail = [3, 2, 1].filter((i) => doc.childCount >= i).map((i) => {
      const n = last(i);
      const inner = n.childCount && n.type.name !== 'paragraph' ? `[${n.lastChild.type.name}:${n.lastChild.nodeSize}${n.lastChild.textContent === '' ? ' empty' : ''}]` : '';
      return `${n.type.name}:${n.nodeSize}${inner}`;
    }).join(' ');
    const data = {
      caret: `${selection.from}-${selection.to}`, doc: doc.content.size, focused: editor.isFocused,
      ae: ((host.shadowRoot?.activeElement ?? document.activeElement) as HTMLElement | null)?.tagName,
      scroll: scrollableAncestors(host).map((el) => Math.round(el.scrollTop)),
      tail, path: Array.from({ length: selection.$from.depth + 1 }, (_, d) => selection.$from.node(d).type.name).join('>'),
      ...extra,
    };
    const message = `[caret] +${Math.round(performance.now() - t0)}ms ${label} ${JSON.stringify(data)}`;
    console.debug(message);
    host.dispatchEvent(new CustomEvent(DEBUG_EVENT, { detail: message, bubbles: true, composed: true }));
  };

  editor.on('transaction', ({ transaction: tr }) => {
    if (!tr.selectionSet && !tr.docChanged && !tr.scrolledIntoView) return;
    log('tr', {
      docChanged: tr.docChanged, selSet: tr.selectionSet, scrollIntoView: tr.scrolledIntoView,
      uiEvent: tr.getMeta('uiEvent'), pointer: tr.getMeta('pointer'), steps: tr.steps.length,
      stack: (new Error().stack || '').split('\n').slice(3, 6).map((l) => l.trim().replace(/^at /, '')).join(' < '),
    });
  });

  const onSelectionChange = () => log('dom-selectionchange');
  document.addEventListener('selectionchange', onSelectionChange);
  cleanups.push(() => document.removeEventListener('selectionchange', onSelectionChange));

  const onInput = (e: Event) => log(`event:${e.type}`, {
    target: (e.target as HTMLElement)?.tagName, key: (e as KeyboardEvent).key,
    inputType: (e as InputEvent).inputType, data: (e as InputEvent).data, cancelled: e.defaultPrevented,
  });
  for (const type of ['beforeinput', 'compositionstart', 'compositionend', 'pointerdown', 'pointerup', 'keydown', 'focusin', 'focusout', 'touchstart']) {
    host.addEventListener(type, onInput, true);
    cleanups.push(() => host.removeEventListener(type, onInput, true));
  }

  let lastScrollLog = 0;
  const onScroll = () => {
    const now = performance.now();
    if (now - lastScrollLog > 100) { lastScrollLog = now; log('scroll'); }
  };
  scrollableAncestors(host).forEach((el) => {
    el.addEventListener('scroll', onScroll);
    cleanups.push(() => el.removeEventListener('scroll', onScroll));
  });

  return () => cleanups.splice(0).forEach((fn) => fn());
}

// Forwards DEBUG_EVENTs bubbling up to `host` into HA's log. Call from the
// panel; does nothing unless debugging is enabled.
export function forwardDebugEventsToHa(host: HTMLElement, getHass: () => HomeAssistant | undefined): void {
  if (!isDebugEnabled()) return;
  host.addEventListener(DEBUG_EVENT, (e) => {
    getHass()?.callService('system_log', 'write', {
      message: (e as CustomEvent<string>).detail, level: 'warning', logger: 'home_assistant_notes.debug',
    });
  });
}
