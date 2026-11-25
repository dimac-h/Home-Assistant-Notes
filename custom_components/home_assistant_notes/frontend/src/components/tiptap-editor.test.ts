import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import './tiptap-editor';
import type { HomeAssistantNotesTiptapEditor } from './tiptap-editor';
import { DEBUG_EVENT } from '../debug-log';
import * as extensionModule from '../spellcheck/extension';

vi.mock('../spellcheck/extension', async (importOriginal) => {
  const original = await importOriginal<typeof import('../spellcheck/extension')>();
  return { ...original, createSpellcheckExtension: vi.fn(original.createSpellcheckExtension) };
});


const FLAG = 'home-assistant-notes-debug';

async function mount(content: string, parent: HTMLElement = document.body): Promise<HomeAssistantNotesTiptapEditor> {
  const el = document.createElement('home-assistant-notes-tiptap-editor');
  el.content = content;
  parent.appendChild(el);
  await vi.waitFor(() => expect((el as any)._editor).toBeTruthy());
  return el;
}

const editorOf = (el: HomeAssistantNotesTiptapEditor) => (el as any)._editor;
const P = (html: string) => html.replace(/<p><\/p>/g, '<P/>');

// Simulates a tap on a checkbox: the browser flips it, then fires `change`.
function toggle(el: HomeAssistantNotesTiptapEditor, index: number): HTMLInputElement {
  const box = el.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')[index];
  box.checked = !box.checked;
  box.dispatchEvent(new Event('change', { bubbles: true }));
  return box;
}

const taskList = (items: Array<[string, boolean]>) =>
  `<ul data-type="taskList">${items.map(([t, c]) => `<li data-type="taskItem" data-checked="${c}"><label><input type="checkbox"${c ? ' checked' : ''}><span></span></label><div><p>${t}</p></div></li>`).join('')}</ul>`;

const itemTexts = (el: HomeAssistantNotesTiptapEditor) =>
  Array.from(el.shadowRoot!.querySelectorAll('li')).map((li) => `${li.querySelector('div')!.textContent}:${(li.querySelector('input') as HTMLInputElement).checked ? 'x' : 'o'}`);

beforeEach(() => localStorage.removeItem(FLAG));
afterEach(() => { document.body.innerHTML = ''; localStorage.removeItem(FLAG); vi.useRealTimers(); });

const lang = (code: string, status: any = 'ready') => ({
  code, name: code.toUpperCase(), tinyld: code, status, aff_url: `/${code}.aff`, dic_url: `/${code}.dic`,
});
const config = (codes: string[], dictionary: Record<string, string[]> = {}, ignored: string[] = []) => ({
  languages: codes.map((c) => lang(c)), dictionary, ignored,
});

function fakeClient(overrides: Record<string, unknown> = {}) {
  const client: any = {
    loadConfigs: vi.fn(async (langs: any[]) => langs.map((l) => ({ code: l.code, tinyld: l.tinyld, aff: '', dic: '' }))),
    init: vi.fn(async () => {}),
    check: vi.fn(async () => []),
    suggest: vi.fn(async () => ['hello']),
    addDictionaryWord: vi.fn(async () => {}),
    removeDictionaryWord: vi.fn(async () => {}),
    setIgnored: vi.fn(async () => {}),
    destroy: vi.fn(),
    ...overrides,
  };
  return client;
}

async function mountSpell(opts: { config?: any; spellcheck?: boolean; clients?: any[]; factory?: () => any; content?: string } = {}) {
  const clients = opts.clients ?? [];
  const el = document.createElement('home-assistant-notes-tiptap-editor');
  el.content = opts.content ?? '<p>hallo</p>';
  el.spellcheckClientFactory = opts.factory ?? (() => { const c = fakeClient(); clients.push(c); return c; });
  if (opts.spellcheck !== undefined) el.spellcheck = opts.spellcheck;
  if (opts.config !== undefined) el.spellcheckConfig = opts.config;
  document.body.appendChild(el);
  await vi.waitFor(() => expect((el as any)._editor).toBeTruthy());
  return { el, clients, root: () => el.shadowRoot!.querySelector('.ProseMirror')! };
}

describe('spellcheck', () => {
  it('leaves the browser spellcheck alone without a config, and never sets spellcheck="true"', async () => {
    const { root, clients } = await mountSpell();
    expect(root().hasAttribute('spellcheck')).toBe(false);
    expect(root().getAttribute('lang')).toBeTruthy();
    expect(clients).toHaveLength(0);
  });

  it('turns the browser spellcheck off once the custom checker is active', async () => {
    const { root, clients } = await mountSpell({ config: config(['en', 'nl']) });
    await vi.waitFor(() => expect(root().getAttribute('spellcheck')).toBe('false'));
    expect(clients).toHaveLength(1);
    expect(clients[0].init).toHaveBeenCalledOnce();
  });

  it('turns the browser spellcheck off when the note opted out, without creating a client', async () => {
    const { root, clients } = await mountSpell({ config: config(['en']), spellcheck: false });
    expect(root().getAttribute('spellcheck')).toBe('false');
    expect(clients).toHaveLength(0);
  });

  it('never creates a client when no language is ready', async () => {
    const cfg = { languages: [lang('en', 'downloading'), lang('nl', 'failed')], dictionary: {}, ignored: [] };
    const { root, clients } = await mountSpell({ config: cfg });
    await new Promise((r) => setTimeout(r, 10));
    expect(clients).toHaveLength(0);
    expect(root().hasAttribute('spellcheck')).toBe(false);
  });

  it('pushes the dictionary and ignore list after init and lists the loaded languages', async () => {
    const { el, clients } = await mountSpell({ config: config(['en', 'nl'], { en: ['foo'], nl: ['bar'] }, ['xyz']) });
    await vi.waitFor(() => expect(clients[0].setIgnored).toHaveBeenCalledWith(['xyz']));
    expect(clients[0].addDictionaryWord).toHaveBeenCalledWith('en', 'foo');
    expect(clients[0].addDictionaryWord).toHaveBeenCalledWith('nl', 'bar');
    expect(el.spellcheckLanguages).toEqual([{ code: 'en', name: 'EN' }, { code: 'nl', name: 'NL' }]);
  });

  it('uses the lang property as fallback language when it is in the pair', async () => {
    const clients: any[] = [];
    const el = document.createElement('home-assistant-notes-tiptap-editor');
    el.lang = 'nl-NL';
    el.spellcheckConfig = config(['en', 'nl']);
    el.spellcheckClientFactory = () => { const c = fakeClient(); clients.push(c); return c; };
    document.body.appendChild(el);
    await vi.waitFor(() => expect(clients[0]?.init).toHaveBeenCalled());
    expect(clients[0].init.mock.calls[0][1]).toBe('nl');
  });

  it('pushes only the word diff and re-checks when the languages are unchanged', async () => {
    const { el, clients } = await mountSpell({ config: config(['en', 'nl'], { en: ['old', 'keep'] }, ['a']) });
    await vi.waitFor(() => expect(clients[0].setIgnored).toHaveBeenCalled());
    const recheck = vi.spyOn((el as any)._editor.storage.spellcheck, 'recheck');
    el.spellcheckConfig = config(['en', 'nl'], { en: ['keep', 'new'] }, ['a', 'b']);
    await vi.waitFor(() => expect(recheck).toHaveBeenCalled());
    expect(clients).toHaveLength(1);
    expect(clients[0].addDictionaryWord).toHaveBeenLastCalledWith('en', 'new');
    expect(clients[0].removeDictionaryWord).toHaveBeenCalledWith('en', 'old');
    expect(clients[0].removeDictionaryWord).toHaveBeenCalledTimes(1);
    expect(clients[0].setIgnored).toHaveBeenLastCalledWith(['a', 'b']);
    expect(clients[0].init).toHaveBeenCalledOnce();
  });

  it('re-initialises with a new client when the set of languages changes', async () => {
    const { el, clients } = await mountSpell({ config: config(['en', 'nl']) });
    await vi.waitFor(() => expect(clients[0].init).toHaveBeenCalled());
    el.spellcheckConfig = config(['en', 'tr']);
    await vi.waitFor(() => expect(clients).toHaveLength(2));
    await vi.waitFor(() => expect(clients[1].init).toHaveBeenCalled());
    expect(clients[0].destroy).toHaveBeenCalled();
    await vi.waitFor(() => expect(el.spellcheckLanguages.map((l) => l.code)).toEqual(['en', 'tr']));
  });

  it('destroys the client and clears squiggles when the note flag turns false', async () => {
    const { el, root, clients } = await mountSpell({ config: config(['en']), content: '<p>wrng</p>' });
    clients[0].check = vi.fn(async (blocks: any[]) =>
      blocks.map((b) => ({ key: b.key, lang: 'en', misspelled: [{ offset: 0, length: 4, word: 'wrng' }] })));
    (el as any)._editor.storage.spellcheck.recheck();
    await vi.waitFor(() => expect(root().querySelector('.spell-error')).toBeTruthy(), { timeout: 2000 });
    el.spellcheck = false;
    await vi.waitFor(() => expect(clients[0].destroy).toHaveBeenCalled());
    await vi.waitFor(() => expect(root().querySelector('.spell-error')).toBeNull());
    expect(root().getAttribute('spellcheck')).toBe('false');
    expect(el.spellcheckLanguages).toEqual([]);
  });

  it('shows the extension\'s spellcheck-state events on the host element', async () => {
    const { el, clients } = await mountSpell({ config: config(['en']), content: '<p>hello world</p>' });
    await vi.waitFor(() => expect(clients[0].init).toHaveBeenCalled());
    await vi.waitFor(() => expect(el.spellcheckLanguages).toHaveLength(1));
    const onState = vi.fn();
    el.addEventListener('spellcheck-state', onState);
    // A caret move makes the extension itself announce the state.
    (el as any)._editor.commands.setTextSelection(3);
    expect(onState).toHaveBeenCalled();
  });

  it('dispatches spellcheck-state on the host once init completes, and not before', async () => {
    let release!: () => void;
    const client = fakeClient({ init: vi.fn(() => new Promise<void>((r) => { release = r; })) });
    const el = document.createElement('home-assistant-notes-tiptap-editor');
    const dispatch = vi.spyOn(el, 'dispatchEvent');
    el.spellcheckConfig = config(['en']);
    el.spellcheckClientFactory = () => client;
    document.body.appendChild(el);
    await vi.waitFor(() => expect(client.init).toHaveBeenCalled());
    const stateEvents = () => dispatch.mock.calls.filter(([e]) => e.type === 'spellcheck-state').length;
    expect(stateEvents()).toBe(0);
    release();
    await vi.waitFor(() => expect(stateEvents()).toBe(1));
  });

  it('passes the extension a fallback that is the lang if in the pair, else the first code', async () => {
    const create = vi.mocked(extensionModule.createSpellcheckExtension);
    for (const [lang, expected] of [['nl-NL', 'nl'], ['de', 'en']] as const) {
      create.mockClear();
      const clients: any[] = [];
      const el = document.createElement('home-assistant-notes-tiptap-editor');
      el.lang = lang;
      el.spellcheckConfig = config(['en', 'nl']);
      el.spellcheckClientFactory = () => { const c = fakeClient(); clients.push(c); return c; };
      document.body.appendChild(el);
      await vi.waitFor(() => expect(clients[0]?.init).toHaveBeenCalled());
      await vi.waitFor(() => expect(el.spellcheckLanguages).toHaveLength(2));
      const options = create.mock.calls[0][1] as { fallback: string };
      expect(options.fallback).toBe(expected);
      expect(clients[0].init.mock.calls[0][1]).toBe(expected);
      el.remove();
    }
  });

  it('keeps the root attributes Tiptap set when the config changes', async () => {
    const { el, root } = await mountSpell();
    const snapshot = () => Object.fromEntries([...root().attributes].map((a) => [a.name, a.value]));
    const { spellcheck: _s, lang: _l, ...before } = snapshot();
    expect(before.role).toBe('textbox');
    el.spellcheckConfig = config(['en']);
    await vi.waitFor(() => expect(root().getAttribute('spellcheck')).toBe('false'));
    const { spellcheck: _s2, lang: _l2, ...after } = snapshot();
    expect(after).toEqual(before);
  });

  it('forwards suggest() to the client, and returns [] without one', async () => {
    const { el, clients } = await mountSpell({ config: config(['en']) });
    await vi.waitFor(() => expect(clients[0].init).toHaveBeenCalled());
    await vi.waitFor(() => expect(el.spellcheckLanguages).toHaveLength(1));
    expect(await el.suggest('helo', 'en')).toEqual(['hello']);
    expect(clients[0].suggest).toHaveBeenCalledWith('helo', 'en');
    const { el: plain } = await mountSpell();
    expect(await plain.suggest('helo', 'en')).toEqual([]);
  });

  it('replaces a range without touching focus, selection or scroll', async () => {
    const { el } = await mountSpell({ content: '<p>helo world</p>' });
    const editor = (el as any)._editor;
    editor.view.dom.blur();
    const selection = editor.state.selection;
    const focused = editor.view.hasFocus();
    const focus = vi.spyOn(editor.view, 'focus');
    const dispatch = vi.spyOn(editor.view, 'dispatch');
    el.replaceRange(1, 5, 'hola');
    expect(editor.getHTML()).toBe('<p>hola world</p>');
    expect(dispatch).toHaveBeenCalledOnce();
    expect((dispatch.mock.calls[0][0] as { scrolledIntoView: boolean }).scrolledIntoView).toBe(false);
    expect(focus).not.toHaveBeenCalled();
    expect(editor.view.hasFocus()).toBe(focused);
    expect(editor.state.selection.eq(selection)).toBe(true);
  });

  it('destroys the client when the element is disconnected', async () => {
    const { el, clients } = await mountSpell({ config: config(['en']) });
    await vi.waitFor(() => expect(el.spellcheckLanguages).toHaveLength(1));
    el.remove();
    expect(clients[0].destroy).toHaveBeenCalled();
  });

  it('creates no client when disconnected while the editor is still loading', async () => {
    const factory = vi.fn(() => fakeClient());
    const el = document.createElement('home-assistant-notes-tiptap-editor');
    el.spellcheckConfig = config(['en']);
    el.spellcheckClientFactory = factory;
    document.body.appendChild(el);
    el.remove();
    await new Promise((r) => setTimeout(r, 50));
    expect(factory).not.toHaveBeenCalled();
    expect((el as any)._editor).toBeNull();
  });

  it('discards a stale init that finishes after a newer config', async () => {
    let release!: () => void;
    const clients: any[] = [];
    const factory = () => {
      const c = fakeClient(clients.length === 0 ? { init: vi.fn(() => new Promise<void>((r) => { release = r; })) } : {});
      clients.push(c);
      return c;
    };
    const { el } = await mountSpell({ config: config(['en', 'nl']), factory });
    await vi.waitFor(() => expect(clients[0].init).toHaveBeenCalled());
    el.spellcheckConfig = config(['en', 'tr']);
    await el.updateComplete;
    release();
    await vi.waitFor(() => expect(clients).toHaveLength(2));
    await vi.waitFor(() => expect(clients[1].init).toHaveBeenCalled());
    expect(clients[0].destroy).toHaveBeenCalled();
    expect(clients[1].destroy).not.toHaveBeenCalled();
    await vi.waitFor(() => expect(el.spellcheckLanguages.map((l) => l.code)).toEqual(['en', 'tr']));
  });

  describe('when spellcheck cannot start', () => {
    it('edits normally when the factory throws', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { el, root } = await mountSpell({ config: config(['en']), factory: () => { throw new Error('no worker'); } });
      await vi.waitFor(() => expect(warn).toHaveBeenCalledOnce());
      expect(root().hasAttribute('spellcheck')).toBe(false);
      (el as any)._editor.commands.insertContent('x');
      expect((el as any)._editor.getHTML()).toContain('x');
      warn.mockRestore();
    });

    it('stays inactive when init rejects', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const client = fakeClient({ init: vi.fn(async () => { throw new Error('bad dictionary'); }) });
      const { root } = await mountSpell({ config: config(['en']), factory: () => client });
      await vi.waitFor(() => expect(client.destroy).toHaveBeenCalled());
      expect(warn).toHaveBeenCalledOnce();
      expect(root().hasAttribute('spellcheck')).toBe(false);
      warn.mockRestore();
    });

    it('gives up after 15 s when init never resolves', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const client = fakeClient({ init: vi.fn(() => new Promise(() => {})) });
      const { el, root } = await mountSpell({ factory: () => client });
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      el.spellcheckConfig = config(['en']);
      await el.updateComplete;
      await vi.advanceTimersByTimeAsync(14000);
      expect(client.destroy).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1500);
      expect(client.destroy).toHaveBeenCalled();
      expect(warn).toHaveBeenCalledOnce();
      expect(root().hasAttribute('spellcheck')).toBe(false);
      (el as any)._editor.commands.insertContent('x');
      expect((el as any)._editor.getHTML()).toContain('x');
      warn.mockRestore();
    });

    it('rejects a hanging check after 15 s and destroys the worker', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const client = fakeClient({ check: vi.fn(() => new Promise(() => {})) });
      const { el, root } = await mountSpell({ config: config(['en']), factory: () => client });
      await vi.waitFor(() => expect(el.spellcheckLanguages).toHaveLength(1));
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
      (el as any)._editor.storage.spellcheck.recheck();
      await vi.advanceTimersByTimeAsync(400);
      expect(client.check).toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(15500);
      expect(client.destroy).toHaveBeenCalled();
      expect(root().hasAttribute('spellcheck')).toBe(false);
      warn.mockRestore();
    });
  });

  it('uses the lang property when set', async () => {
    const el = document.createElement('home-assistant-notes-tiptap-editor');
    el.lang = 'nl';
    document.body.appendChild(el);
    await vi.waitFor(() => expect((el as any)._editor).toBeTruthy());
    expect(el.shadowRoot!.querySelector('.ProseMirror')!.getAttribute('lang')).toBe('nl');
  });
});

describe('spellcheck language updates', () => {
  it('follows later changes of the lang property', async () => {
    const el = await mount('<p>hallo</p>');
    el.lang = 'nl';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.ProseMirror')!.getAttribute('lang')).toBe('nl');
  });
});

describe('checklist toggle', () => {
  it('moves checked items below unchecked ones, each group sorted alphabetically', async () => {
    const el = await mount(taskList([['banana', false], ['apple', false], ['cherry', true]]));
    toggle(el, 0); // check "banana"
    expect(itemTexts(el)).toEqual(['apple:o', 'banana:x', 'cherry:x']);
  });

  it('shows the right checkbox state for identical sibling items', async () => {
    // ProseMirror reuses the DOM row for identical sibling nodes; a row left
    // natively toggled used to keep showing the wrong state after the reorder.
    const el = await mount(taskList([['Kajaks', false], ['Kajaks', false], ['Kajaks', false]]));
    toggle(el, 1);
    expect(itemTexts(el)).toEqual(['Kajaks:o', 'Kajaks:o', 'Kajaks:x']);
    expect(editorOf(el).getHTML().match(/data-checked="true"/g)).toHaveLength(1);
  });

  it('keeps the caret in the same item after the reorder', async () => {
    const el = await mount(taskList([['b', false], ['a', false]]));
    const editor = editorOf(el);
    editor.commands.setTextSelection(4); // inside "b" (first item)
    toggle(el, 0);
    const { $from } = editor.state.selection;
    expect($from.parent.textContent).toBe('b');
  });

  it('does not touch editor focus (no keyboard popping open)', async () => {
    const el = await mount(taskList([['a', false]]));
    const editor = editorOf(el);
    const focus = vi.spyOn(editor.view, 'focus');
    toggle(el, 0);
    expect(focus).not.toHaveBeenCalled();
  });
});

describe('indent / outdent', () => {
  const depth = (el: HomeAssistantNotesTiptapEditor) => el.shadowRoot!.querySelectorAll('li li').length;
  const caretIn = (el: HomeAssistantNotesTiptapEditor, text: string) => {
    const editor = editorOf(el);
    let pos = -1;
    editor.state.doc.descendants((node: any, p: number) => {
      if (node.isText && node.text === text) pos = p + 1;
    });
    editor.commands.setTextSelection(pos);
  };

  it('indents a checklist item under the previous one and outdents it again', async () => {
    const el = await mount(taskList([['a', false], ['b', false]]));
    caretIn(el, 'b');
    el.runAction('indent');
    expect(depth(el)).toBe(1);
    el.runAction('outdent');
    expect(depth(el)).toBe(0);
  });

  it('still indents a bullet list item', async () => {
    const el = await mount('<ul><li><p>a</p></li><li><p>b</p></li></ul>');
    caretIn(el, 'b');
    el.runAction('indent');
    expect(depth(el)).toBe(1);
  });
});

describe('scroll guard after a checklist toggle', () => {
  // jsdom has no layout, so mount the editor inside a fake scrollable ancestor.
  async function mountInScroller(content: string) {
    const scroller = document.createElement('div');
    scroller.style.overflowY = 'auto';
    let top = 500;
    Object.defineProperty(scroller, 'scrollHeight', { value: 2000 });
    Object.defineProperty(scroller, 'clientHeight', { value: 400 });
    Object.defineProperty(scroller, 'scrollTop', { get: () => top, set: (v: number) => { top = v; }, configurable: true });
    document.body.appendChild(scroller);
    const el = await mount(content, scroller);
    return { el, scroller, setTop: (v: number) => { top = v; } };
  }

  it('puts the scroll position back when the browser scrolls to the caret just after a toggle', async () => {
    const { el, scroller, setTop } = await mountInScroller(taskList([['b', false], ['a', false]]));
    toggle(el, 0);
    setTop(0); // Chromium jumps to the caret...
    scroller.dispatchEvent(new Event('scroll'));
    expect(scroller.scrollTop).toBe(500); // ...and we undo it
  });

  it('stops guarding once the user scrolls', async () => {
    const { el, scroller, setTop } = await mountInScroller(taskList([['b', false], ['a', false]]));
    toggle(el, 0);
    window.dispatchEvent(new Event('wheel'));
    setTop(120);
    scroller.dispatchEvent(new Event('scroll'));
    expect(scroller.scrollTop).toBe(120);
  });

  it('stops guarding after 300ms', async () => {
    const { el, scroller, setTop } = await mountInScroller(taskList([['b', false], ['a', false]]));
    vi.useFakeTimers();
    toggle(el, 0);
    vi.advanceTimersByTime(301);
    setTop(0);
    scroller.dispatchEvent(new Event('scroll'));
    expect(scroller.scrollTop).toBe(0);
  });

  it('is a no-op when nothing scrolls (Safari/Firefox)', async () => {
    const { el, scroller } = await mountInScroller(taskList([['b', false], ['a', false]]));
    toggle(el, 0);
    scroller.dispatchEvent(new Event('scroll'));
    expect(scroller.scrollTop).toBe(500);
  });
});

describe('soft-keyboard Backspace (Firefox for Android) after a list', () => {
  const beforeInput = (el: HomeAssistantNotesTiptapEditor, init: InputEventInit = {}) => {
    const event = new InputEvent('beforeinput', { inputType: 'deleteContentBackward', bubbles: true, cancelable: true, ...init });
    editorOf(el).view.dom.dispatchEvent(event);
    return event;
  };

  it('cancels the native delete and applies our own for an empty paragraph after a list', async () => {
    const el = await mount('<ul><li><p>a</p></li></ul><p></p><p>x</p>');
    editorOf(el).commands.setTextSelection(8); // in the empty paragraph
    const event = beforeInput(el);
    expect(event.defaultPrevented).toBe(true);
    expect(P(editorOf(el).getHTML())).toBe('<ul><li><p>a</p></li></ul><p>x</p>');
  });

  it('leaves ordinary deletions to the browser', async () => {
    const el = await mount('<p>hello</p>');
    editorOf(el).commands.setTextSelection(3);
    expect(beforeInput(el).defaultPrevented).toBe(false);
  });

  it('ignores other input types and non-cancelable events', async () => {
    const el = await mount('<ul><li><p>a</p></li></ul><p></p><p>x</p>');
    editorOf(el).commands.setTextSelection(8);
    expect(beforeInput(el, { inputType: 'insertText', data: 'q' }).defaultPrevented).toBe(false);
    expect(beforeInput(el, { cancelable: false }).defaultPrevented).toBe(false);
    expect(P(editorOf(el).getHTML())).toBe('<ul><li><p>a</p></li></ul><P/><p>x</p>');
  });
});

describe('content sync', () => {
  it('replaces the document when the content property changes from outside', async () => {
    const el = await mount('<p>one</p>');
    el.content = '<p>two</p>';
    await el.updateComplete;
    expect(editorOf(el).getHTML()).toBe('<p>two</p>');
  });

  it('does not reset the document for content it emitted itself', async () => {
    const el = await mount('<p>one</p>');
    editorOf(el).commands.insertContent('!');
    const emitted = el.getHTML();
    el.content = emitted;
    await el.updateComplete;
    expect(el.getHTML()).toBe(emitted);
  });
});

describe('opt-in caret logger', () => {
  it('emits nothing when the debug flag is off', async () => {
    const listener = vi.fn();
    document.addEventListener(DEBUG_EVENT, listener);
    const el = await mount('<p>hello</p>');
    editorOf(el).commands.insertContent('x');
    expect(listener).not.toHaveBeenCalled();
    document.removeEventListener(DEBUG_EVENT, listener);
  });

  it('emits [caret] entries for transactions and input events when the flag is on', async () => {
    localStorage.setItem(FLAG, '1');
    const messages: string[] = [];
    const listener = (e: Event) => messages.push((e as CustomEvent<string>).detail);
    document.addEventListener(DEBUG_EVENT, listener);
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    const el = await mount('<ul><li><p>a</p></li></ul><p></p>');
    editorOf(el).commands.insertContent('x');
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    document.removeEventListener(DEBUG_EVENT, listener);
    expect(messages.some((m) => m.startsWith('[caret]') && m.includes(' tr '))).toBe(true);
    expect(messages.some((m) => m.includes('event:keydown') && m.includes('"key":"Backspace"'))).toBe(true);
    expect(messages.find((m) => m.includes(' tr '))).toMatch(/"tail":"[^"]*bulletList/);
  });

  it('stops logging when the editor is removed', async () => {
    localStorage.setItem(FLAG, '1');
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    const el = await mount('<p>hello</p>');
    const ed = editorOf(el);
    el.remove();
    const listener = vi.fn();
    document.addEventListener(DEBUG_EVENT, listener);
    document.dispatchEvent(new Event('selectionchange'));
    document.removeEventListener(DEBUG_EVENT, listener);
    expect(listener).not.toHaveBeenCalled();
    expect(ed).toBeTruthy();
  });
});
