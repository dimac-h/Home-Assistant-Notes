import { afterEach, describe, expect, it, vi } from 'vitest';
import './note-editor';
import type { HomeAssistantNotesEditor } from './note-editor';
import type { HomeAssistantNotesSpellStrip } from './note-spell-strip';

const NOTE: any = { note_id: 'n1', title: 'T', content: '<p>teh</p>', color: '#FFEB3B', pinned: false, spellcheck: true };
type Hit = { word: string; from: number; to: number; lang: string } | null;

async function mount(note = NOTE) {
  const el = document.createElement('home-assistant-notes-editor') as HomeAssistantNotesEditor;
  el.note = note;
  document.body.appendChild(el);
  await el.updateComplete;
  const tiptap: any = el.shadowRoot!.querySelector('home-assistant-notes-tiptap-editor');
  const state: { hit: Hit } = { hit: null };
  tiptap.wordAtCaret = vi.fn(() => state.hit);
  tiptap.suggest = vi.fn(async (word: string) => [`${word}-fix`]);
  tiptap.replaceRange = vi.fn();
  const strip = () => el.shadowRoot!.querySelector('home-assistant-notes-spell-strip') as HomeAssistantNotesSpellStrip;
  const fire = async () => {
    tiptap.dispatchEvent(new CustomEvent('spellcheck-state', { bubbles: true, composed: true }));
    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    await strip().updateComplete;
  };
  const labels = () => Array.from(strip().shadowRoot!.querySelectorAll('ha-button')).map((b) => b.textContent!.trim());
  return { el, tiptap, state, strip, fire, labels };
}

afterEach(() => { document.body.innerHTML = ''; });

describe('note editor spell strip', () => {
  it('shows the word and its suggestions after a spellcheck-state event', async () => {
    const t = await mount();
    expect(t.strip().hasAttribute('hidden')).toBe(true);
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    expect(t.strip().hasAttribute('hidden')).toBe(false);
    expect(t.strip().word).toBe('teh');
    expect(t.labels()).toEqual(['teh-fix', 'Add to dictionary', 'Ignore']);
    expect(t.tiptap.suggest).toHaveBeenCalledWith('teh', 'en');
  });

  it('hides when there is no word at the caret', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    t.state.hit = null;
    await t.fire();
    expect(t.strip().hasAttribute('hidden')).toBe(true);
  });

  it('stays hidden when the note has spellcheck turned off', async () => {
    const t = await mount({ ...NOTE, spellcheck: false });
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    expect(t.strip().hasAttribute('hidden')).toBe(true);
  });

  it('drops suggestions that arrive for a word the caret has left', async () => {
    const t = await mount();
    let release!: (s: string[]) => void;
    t.tiptap.suggest = vi.fn(() => new Promise<string[]>((r) => { release = r; }));
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    t.tiptap.dispatchEvent(new CustomEvent('spellcheck-state'));
    t.state.hit = null;
    release(['the']);
    await new Promise((r) => setTimeout(r, 0));
    await t.el.updateComplete;
    expect(t.strip().hasAttribute('hidden')).toBe(true);
    expect(t.strip().suggestions).toEqual([]);
  });

  it('does not blank or refetch for consecutive events on the same word', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    await t.fire();
    expect(t.tiptap.suggest).toHaveBeenCalledTimes(1);
    expect(t.strip().hasAttribute('hidden')).toBe(false);
    expect(t.labels()).toEqual(['teh-fix', 'Add to dictionary', 'Ignore']);
  });

  it('replaces the current range when a suggestion is clicked', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    t.state.hit = { word: 'teh', from: 5, to: 8, lang: 'en' };
    (t.strip().shadowRoot!.querySelector('.suggestion') as HTMLElement).click();
    expect(t.tiptap.replaceRange).toHaveBeenCalledWith(5, 8, 'teh-fix');
  });

  it('does not replace when the caret word changed meanwhile', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    t.state.hit = { word: 'adn', from: 10, to: 13, lang: 'en' };
    (t.strip().shadowRoot!.querySelector('.suggestion') as HTMLElement).click();
    t.state.hit = null;
    (t.strip().shadowRoot!.querySelector('.suggestion') as HTMLElement).click();
    expect(t.tiptap.replaceRange).not.toHaveBeenCalled();
  });

  it('emits dictionary and ignore events with the word and language', async () => {
    const t = await mount();
    const added = vi.fn(); const ignored = vi.fn();
    document.body.addEventListener('spell-add-dictionary-word', (e) => added((e as CustomEvent).detail));
    document.body.addEventListener('spell-add-ignored-word', (e) => ignored((e as CustomEvent).detail));
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'nl' };
    await t.fire();
    (t.strip().shadowRoot!.querySelector('.add') as HTMLElement).click();
    (t.strip().shadowRoot!.querySelector('.ignore') as HTMLElement).click();
    expect(added).toHaveBeenCalledWith({ lang: 'nl', word: 'teh' });
    expect(ignored).toHaveBeenCalledWith({ word: 'teh' });
  });

  it('clears the old word while suggestions for the new word are pending, and ignores clicks', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    let release!: (s: string[]) => void;
    t.tiptap.suggest = vi.fn(() => new Promise<string[]>((r) => { release = r; }));
    const strip = t.strip();
    t.state.hit = { word: 'adn', from: 10, to: 13, lang: 'en' };
    t.tiptap.dispatchEvent(new CustomEvent('spellcheck-state'));
    await t.el.updateComplete;
    expect(strip.hasAttribute('hidden')).toBe(true);
    expect(strip.word).toBeNull();
    strip.dispatchEvent(new CustomEvent('spell-suggestion', { detail: { suggestion: 'teh-fix' }, bubbles: true, composed: true }));
    expect(t.tiptap.replaceRange).not.toHaveBeenCalled();
    release(['and']);
    await new Promise((r) => setTimeout(r, 0));
    await t.el.updateComplete;
    await strip.updateComplete;
    expect(strip.word).toBe('adn');
    expect(t.labels()).toEqual(['and', 'Add to dictionary', 'Ignore']);
  });

  it('resets the strip when another note is opened', async () => {
    const t = await mount();
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    t.el.note = { ...NOTE, note_id: 'n2' };
    await t.el.updateComplete;
    expect(t.strip().word).toBeNull();
    expect(t.strip().hasAttribute('hidden')).toBe(true);
  });

  it('shows the strip without suggestions when suggest rejects', async () => {
    const t = await mount();
    t.tiptap.suggest = vi.fn(async () => { throw new Error('worker died'); });
    t.state.hit = { word: 'teh', from: 4, to: 7, lang: 'en' };
    await t.fire();
    expect(t.strip().word).toBe('teh');
    expect(t.strip().suggestions).toEqual([]);
    expect(t.labels()).toEqual(['Add to dictionary', 'Ignore']);
  });
});
