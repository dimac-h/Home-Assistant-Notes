import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import './tiptap-editor';
import type { HomeAssistantNotesTiptapEditor } from './tiptap-editor';
import { DEBUG_EVENT } from '../debug-log';

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
