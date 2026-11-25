import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Editor, Extension } from '@tiptap/core';
import { StarterKit } from '@tiptap/starter-kit';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Link } from '@tiptap/extension-link';
import { createSpellcheckExtension, type SpellcheckClientLike } from './extension';
import type { BlockRequest, BlockResult } from './types';

// Fake checker: every word in BAD is misspelled; the language is the override or "en".
const BAD = new Set(['wrold', 'helo', 'speling']);
function fakeResult(b: BlockRequest, previous?: string): BlockResult {
  const misspelled = [...b.text.matchAll(/[A-Za-z]+/g)]
    .filter((m) => BAD.has(m[0]))
    .map((m) => ({ offset: m.index!, length: m[0].length, word: m[0] }));
  return { key: b.key, lang: b.langOverride ?? b.inheritLang ?? previous ?? 'en', misspelled };
}

function fakeBatch(blocks: BlockRequest[]): BlockResult[] {
  const out: BlockResult[] = [];
  for (const b of blocks) out.push(fakeResult(b, out[out.length - 1]?.lang));
  return out;
}

function fakeClient() {
  const check = vi.fn(async (blocks: BlockRequest[]) => fakeBatch(blocks));
  return { check };
}

interface Opts {
  client?: SpellcheckClientLike;
  enabled?: () => boolean;
  pair?: string[];
  cacheLimit?: number;
}

const editors: Editor[] = [];
function make(content: string, opts: Opts = {}) {
  const client = opts.client ?? fakeClient();
  const editor = new Editor({
    element: document.body.appendChild(document.createElement('div')),
    content,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      createSpellcheckExtension(Extension, {
        client,
        pair: opts.pair ?? ['en', 'nl'],
        fallback: 'en',
        enabled: opts.enabled ?? (() => true),
        cacheLimit: opts.cacheLimit,
      }),
    ],
  });
  editors.push(editor);
  return { editor, client: client as ReturnType<typeof fakeClient> };
}

const flush = () => vi.advanceTimersByTimeAsync(400);
const squiggles = (editor: Editor) =>
  Array.from(editor.view.dom.querySelectorAll('span.spell-error')).map((s) => s.textContent);
const storage = (editor: Editor) => (editor.storage as any).spellcheck;
const cmd = (editor: Editor) => editor.commands as any;

function posOf(editor: Editor, needle: string): number {
  let found = -1;
  editor.state.doc.descendants((node, pos) => {
    if (found < 0 && node.isText && node.text!.includes(needle)) found = pos + node.text!.indexOf(needle);
  });
  return found;
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  editors.splice(0).forEach((e) => e.destroy());
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('spellcheck extension', () => {
  it('turns results into spell-error decorations at the exact text', async () => {
    const { editor } = make('<p>hello wrold and helo</p><h2>speling here</h2>');
    expect(squiggles(editor)).toEqual([]);
    await flush();
    expect(squiggles(editor)).toEqual(['wrold', 'helo', 'speling']);
  });

  it.each([
    ['same length', 'wrold', 'world', 'helo'],
    ['growing', 'wrold', 'worldwide', 'helo'],
    ['shrinking', 'wrold', 'a', 'helo'],
    ['deleting the word', 'wrold', '', 'helo'],
  ])('keeps the other squiggle exactly on its word when a correction is %s (regression)', async (_n, bad, fix, other) => {
    const { editor } = make('<p>hello wrold and helo</p>');
    await flush();
    const from = posOf(editor, bad);
    editor.view.dispatch(editor.state.tr.insertText(fix, from, from + bad.length));
    expect(squiggles(editor)).toEqual([other]);
    await flush();
    expect(squiggles(editor)).toEqual([other]);
  });

  it('keeps the earlier squiggle when a later misspelled word is corrected', async () => {
    const { editor } = make('<p>helo and wrold</p>');
    await flush();
    const from = posOf(editor, 'wrold');
    editor.view.dispatch(editor.state.tr.insertText('worldwide', from, from + 5));
    expect(squiggles(editor)).toEqual(['helo']);
    await flush();
    expect(squiggles(editor)).toEqual(['helo']);
  });

  it('places squiggles exactly after a non-BMP character', async () => {
    const { editor } = make('<p>\u{1F600} hello wrold</p>');
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
    editor.view.dispatch(editor.state.tr.insertText('so ', 1));
    expect(squiggles(editor)).toEqual(['wrold']);
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
  });

  it('does not misplace squiggles when the text is edited while a check is in flight', async () => {
    let release!: (r: BlockResult[]) => void;
    const check = vi
      .fn()
      .mockImplementationOnce((blocks: BlockRequest[]) => new Promise<BlockResult[]>((res) => (release = () => res(fakeBatch(blocks)))))
      .mockImplementation(async (blocks: BlockRequest[]) => fakeBatch(blocks));
    const { editor } = make('<p>wrold here</p>', { client: { check } });
    await vi.advanceTimersByTimeAsync(300);
    expect(check).toHaveBeenCalledTimes(1);
    editor.view.dispatch(editor.state.tr.insertText('some more ', 1));
    release([]);
    await vi.advanceTimersByTimeAsync(0);
    expect(squiggles(editor)).toEqual([]);
    await flush();
    expect(editor.getText()).toBe('some more wrold here');
    expect(squiggles(editor)).toEqual(['wrold']);
  });

  it('ignores a late response for text that was replaced', async () => {
    let release!: () => void;
    const check = vi
      .fn()
      .mockImplementationOnce((blocks: BlockRequest[]) => new Promise<BlockResult[]>((res) => (release = () => res(fakeBatch(blocks)))))
      .mockImplementation(async (blocks: BlockRequest[]) => fakeBatch(blocks));
    const { editor } = make('<p>wrold</p>', { client: { check } });
    await vi.advanceTimersByTimeAsync(300);
    editor.commands.setContent('<p>abc def wrold</p>');
    release();
    await vi.advanceTimersByTimeAsync(0);
    expect(squiggles(editor)).toEqual([]);
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
  });

  it('skips code blocks, code marks and links, and sends spaces for them', async () => {
    const { editor, client } = make(
      '<p>helo <code>wrold</code> <a href="https://x.test">speling</a> end</p><pre><code>wrold</code></pre>',
    );
    await flush();
    expect(squiggles(editor)).toEqual(['helo']);
    const sent = client.check.mock.calls[0][0] as BlockRequest[];
    expect(sent).toHaveLength(1);
    expect(sent[0].text).toBe('helo' + ' '.repeat(' wrold '.length) + ' '.repeat('speling'.length) + ' end');
  });

  it('sends 300 paragraphs in one call and only the edited block afterwards', async () => {
    const html = Array.from({ length: 300 }, (_, i) => `<p>paragraph number ${'x'.repeat(i % 7)}${i} wrold</p>`).join('');
    const { editor, client } = make(html);
    await flush();
    expect(client.check).toHaveBeenCalledTimes(1);
    expect(client.check.mock.calls[0][0]).toHaveLength(300);
    editor.view.dispatch(editor.state.tr.insertText('Q', 2));
    await flush();
    expect(client.check).toHaveBeenCalledTimes(2);
    expect(client.check.mock.calls[1][0]).toHaveLength(1);
  });

  it('makes no calls and no decorations when disabled, and works after recheck once enabled', async () => {
    let on = false;
    const { editor, client } = make('<p>wrold</p>', { enabled: () => on });
    await flush();
    expect(client.check).not.toHaveBeenCalled();
    expect(squiggles(editor)).toEqual([]);
    on = true;
    storage(editor).recheck();
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
  });

  it('notices enabled() flipping without recheck()', async () => {
    let on = false;
    const { editor, client } = make('<p>wrold</p>', { enabled: () => on });
    await flush();
    on = true;
    editor.commands.setTextSelection(2);
    await flush();
    expect(client.check).toHaveBeenCalledTimes(1);
    expect(squiggles(editor)).toEqual(['wrold']);
    on = false;
    editor.commands.setTextSelection(3);
    expect(squiggles(editor)).toEqual([]);
    await flush();
    expect(client.check).toHaveBeenCalledTimes(1);
  });

  it('sets and removes the lang attribute on the block at the caret', () => {
    const { editor } = make('<p>one</p><p>two</p>');
    editor.commands.setTextSelection(posOf(editor, 'two') + 1);
    cmd(editor).setBlockLanguage('en');
    expect(editor.getHTML()).toBe('<p>one</p><p lang="en">two</p>');
    cmd(editor).setBlockLanguage(null);
    expect(editor.getHTML()).toBe('<p>one</p><p>two</p>');
  });

  it('parses lang from HTML, also on headings and in list items', () => {
    const { editor } = make('<h2 lang="nl">kop</h2><ul data-type="taskList"><li data-type="taskItem" data-checked="false"><div><p>item</p></div></li></ul>');
    expect(editor.getHTML()).toContain('<h2 lang="nl">kop</h2>');
    editor.commands.setTextSelection(posOf(editor, 'item') + 1);
    cmd(editor).setBlockLanguage('nl');
    expect(editor.getHTML()).toContain('<p lang="nl">item</p>');
  });

  it('reports manual and detected block languages and ignores overrides outside the pair', async () => {
    const { editor, client } = make('<p lang="nl">een zin</p><p lang="de">ein satz</p>');
    editor.commands.setTextSelection(2);
    expect(storage(editor).blockLanguage()).toEqual({ code: 'nl', manual: true });
    await flush();
    const sent = client.check.mock.calls[0][0] as BlockRequest[];
    expect(sent[0].langOverride).toBe('nl');
    expect(sent[1].langOverride).toBeUndefined();
    editor.commands.setTextSelection(posOf(editor, 'ein') + 1);
    expect(storage(editor).blockLanguage()).toEqual({ code: 'nl', manual: false });
  });

  it('returns null block language when unknown or disabled', async () => {
    const { editor } = make('<p>text</p>', { enabled: () => false });
    await flush();
    expect(storage(editor).blockLanguage()).toBeNull();
  });

  it('finds the misspelled word under the caret, boundaries included', async () => {
    const { editor } = make('<p>hello wrold ok</p>');
    await flush();
    const from = posOf(editor, 'wrold');
    for (const caret of [from, from + 2, from + 5]) {
      editor.commands.setTextSelection(caret);
      expect(storage(editor).wordAtCaret()).toEqual({ word: 'wrold', from, to: from + 5, lang: 'en' });
    }
    editor.commands.setTextSelection(from - 2);
    expect(storage(editor).wordAtCaret()).toBeNull();
    editor.commands.setTextSelection(from + 7);
    expect(storage(editor).wordAtCaret()).toBeNull();
  });

  it('fires spellcheck-state on selection changes and when results arrive', async () => {
    const { editor } = make('<p>hello wrold</p>');
    const handler = vi.fn();
    editor.view.dom.addEventListener('spellcheck-state', handler);
    editor.commands.setTextSelection(3);
    expect(handler).toHaveBeenCalledTimes(1);
    expect((handler.mock.calls[0][0] as CustomEvent).bubbles).toBe(true);
    expect((handler.mock.calls[0][0] as CustomEvent).composed).toBe(true);
    await flush();
    expect(handler.mock.calls.length).toBeGreaterThan(1);
  });

  it('keeps existing decorations and does not loop when check rejects', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const check = vi
      .fn()
      .mockImplementationOnce(async (blocks: BlockRequest[]) => fakeBatch(blocks))
      .mockRejectedValue(new Error('boom'));
    const { editor } = make('<p>wrold</p><p>other</p>', { client: { check } });
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
    editor.view.dispatch(editor.state.tr.insertText('z', editor.state.doc.content.size - 1));
    await flush();
    await vi.advanceTimersByTimeAsync(5000);
    expect(check).toHaveBeenCalledTimes(2);
    expect(squiggles(editor)).toEqual(['wrold']);
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  describe('IME composition', () => {
    function stubComposing(editor: Editor) {
      const state = { composing: true };
      Object.defineProperty(editor.view, 'composing', { get: () => state.composing, configurable: true });
      return state;
    }

    it('does not dispatch decorations while composing, applies them once composition ends', async () => {
      const { editor, client } = make('<p>hello wrold</p>');
      const state = stubComposing(editor);
      const dispatch = vi.spyOn(editor.view, 'dispatch');
      await flush();
      expect(client.check).toHaveBeenCalledTimes(1); // the cache is still filled
      expect(dispatch).not.toHaveBeenCalled();
      expect(squiggles(editor)).toEqual([]);
      state.composing = false;
      await flush();
      expect(squiggles(editor)).toEqual(['wrold']);
      expect(client.check).toHaveBeenCalledTimes(1); // no second request for cached text
    });

    it('gives up after a bounded number of deferrals and does no work after destroy', async () => {
      const { editor, client } = make('<p>hello wrold</p>');
      stubComposing(editor);
      const dispatch = vi.spyOn(editor.view, 'dispatch');
      await vi.advanceTimersByTimeAsync(60_000);
      expect(dispatch).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(0);
      expect(client.check).toHaveBeenCalledTimes(1);
      editor.destroy();
      await vi.advanceTimersByTimeAsync(5_000);
      expect(client.check).toHaveBeenCalledTimes(1);
    });
  });

  it('trims the cache to the current document past the limit and keeps decorations correct', async () => {
    const old = '<p>aaa wrold</p><p>bbb</p><p>ccc</p><p>ddd</p>';
    const next = '<p>eee</p><p>fff</p><p>ggg</p><p>hhh helo</p>';
    const { editor, client } = make(old, { cacheLimit: 4 });
    await flush();
    expect(squiggles(editor)).toEqual(['wrold']);
    editor.commands.setContent(next);
    await flush();
    expect(squiggles(editor)).toEqual(['helo']);
    const calls = client.check.mock.calls.length;
    editor.commands.setContent(old); // its entries were evicted when the cache outgrew the limit
    await flush();
    expect(client.check.mock.calls.length).toBe(calls + 1);
    expect(squiggles(editor)).toEqual(['wrold']);
  });
});
