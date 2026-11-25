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

describe('note editor language chip', () => {
  const CONFIG: any = { languages: [{ code: 'en', name: 'English' }, { code: 'nl', name: 'Nederlands' }], dictionary: {}, ignored: [] };

  async function mountChip(note = NOTE, config: any = CONFIG) {
    const t = await mount(note);
    t.tiptap.blockLanguage = vi.fn(() => ({ code: 'en', manual: false }));
    t.tiptap.setBlockLanguage = vi.fn();
    Object.defineProperty(t.tiptap, 'spellcheckLanguages', { configurable: true, get: () => (config ? CONFIG.languages : []) });
    t.el.spellcheckConfig = config;
    await t.el.updateComplete;
    const toolbar = () => t.el.shadowRoot!.querySelector('home-assistant-notes-toolbar') as any;
    const saves: any[] = [];
    t.el.addEventListener('note-save', (e) => saves.push((e as CustomEvent).detail));
    return { ...t, toolbar, saves };
  }

  it('passes the block language, the other language and the manual flag to the toolbar', async () => {
    const t = await mountChip();
    await t.fire();
    expect(t.toolbar().languageName).toBe('English');
    expect(t.toolbar().otherLanguageName).toBe('Nederlands');
    expect(t.toolbar().languageManual).toBe(false);
    expect(t.toolbar().spellcheckOn).toBe(true);
    t.tiptap.blockLanguage = vi.fn(() => ({ code: 'nl', manual: true }));
    await t.fire();
    expect(t.toolbar().languageName).toBe('Nederlands');
    expect(t.toolbar().otherLanguageName).toBe('English');
    expect(t.toolbar().languageManual).toBe(true);
  });

  it('hides the chip while the block language is unknown, and without a config', async () => {
    const t = await mountChip();
    t.tiptap.blockLanguage = vi.fn(() => null);
    await t.fire();
    expect(t.toolbar().languageName).toBe('');
    const none = await mountChip(NOTE, { ...CONFIG, languages: [] });
    await none.fire();
    expect(none.toolbar().languageName).toBe('');
  });

  it('applies language-select through setBlockLanguage', async () => {
    const t = await mountChip();
    await t.fire();
    t.toolbar().dispatchEvent(new CustomEvent('language-select', { detail: { mode: 'other' }, bubbles: true, composed: true }));
    expect(t.tiptap.setBlockLanguage).toHaveBeenLastCalledWith('nl');
    t.toolbar().dispatchEvent(new CustomEvent('language-select', { detail: { mode: 'auto' }, bubbles: true, composed: true }));
    expect(t.tiptap.setBlockLanguage).toHaveBeenLastCalledWith(null);
  });

  it('saves the flipped spellcheck value and reacts immediately', async () => {
    const t = await mountChip();
    await t.fire();
    t.toolbar().dispatchEvent(new CustomEvent('spellcheck-toggle', { bubbles: true, composed: true }));
    await t.el.updateComplete;
    expect(t.saves.at(-1)).toMatchObject({ note_id: 'n1', spellcheck: false });
    expect(t.toolbar().languageName).toBe('Off');
    // the saved note arrives, then it is toggled back on
    t.el.note = { ...NOTE, spellcheck: false };
    await t.el.updateComplete;
    t.toolbar().dispatchEvent(new CustomEvent('spellcheck-toggle', { bubbles: true, composed: true }));
    await t.el.updateComplete;
    expect(t.saves.at(-1)).toMatchObject({ spellcheck: true });
    expect(t.toolbar().spellcheckOn).toBe(true);
  });

  it('sends the toggled value from every save path before the note echoes back', async () => {
    const t = await mountChip();
    await t.fire();
    const fire = (name: string, detail?: unknown) => t.toolbar().dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
    fire('spellcheck-toggle');
    await t.el.updateComplete;
    fire('pin-toggle');
    fire('color-select', { color: '#000000' });
    (t.el as any)._tiptap.getHTML = () => '<p>typed</p>';
    t.el.shadowRoot!.querySelector('home-assistant-notes-tiptap-editor')!.dispatchEvent(new CustomEvent('content-changed'));
    await new Promise((r) => setTimeout(r, 1100));
    (t.el as any)._flushSorted(NOTE);
    expect(t.saves.length).toBeGreaterThanOrEqual(4);
    expect(t.saves.map((s) => s.spellcheck)).toEqual(t.saves.map(() => false));
  });

  it('flushes the departing note with the toggled value when another note opens', async () => {
    const t = await mountChip();
    await t.fire();
    t.toolbar().dispatchEvent(new CustomEvent('spellcheck-toggle', { bubbles: true, composed: true }));
    await t.el.updateComplete;
    t.tiptap.getHTML = () => '<p>changed</p>';
    t.saves.length = 0;
    t.el.note = { ...NOTE, note_id: 'n2' };
    await t.el.updateComplete;
    expect(t.saves).toHaveLength(1);
    expect(t.saves[0]).toMatchObject({ note_id: 'n1', spellcheck: false });
  });

  it('keeps the toggle when an older echo of the note arrives', async () => {
    const t = await mountChip();
    await t.fire();
    t.toolbar().dispatchEvent(new CustomEvent('spellcheck-toggle', { bubbles: true, composed: true }));
    await t.el.updateComplete;
    t.el.note = { ...NOTE, title: 'older', spellcheck: true };
    await t.el.updateComplete;
    expect(t.toolbar().spellcheckOn).toBe(false);
    expect(t.toolbar().languageName).toBe('Off');
  });

  it('renders the Off chip on the very first render without any event', async () => {
    const el = document.createElement('home-assistant-notes-editor') as HomeAssistantNotesEditor;
    el.note = { ...NOTE, spellcheck: false };
    el.spellcheckConfig = { languages: [{ code: 'en', name: 'English', status: 'ready' }], dictionary: {}, ignored: [] } as any;
    document.body.appendChild(el);
    await el.updateComplete;
    const toolbar = el.shadowRoot!.querySelector('home-assistant-notes-toolbar') as any;
    await toolbar.updateComplete;
    expect(toolbar.languageName).toBe('Off');
    expect(toolbar.spellcheckOn).toBe(false);
    const items = Array.from(toolbar.shadowRoot.querySelectorAll('.group.language .item')).map((b: any) => b.textContent.trim());
    expect(items).toEqual(['Check spelling']);
  });

  it.each([[false, true], [true, false]])('flushes a departing spellcheck:%s note with its own value when %s note opens', async (a, b) => {
    const t = await mountChip({ ...NOTE, spellcheck: a });
    t.tiptap.getHTML = () => '<p>changed</p>';
    t.el.note = { ...NOTE, note_id: 'n2', spellcheck: b };
    await t.el.updateComplete;
    expect(t.saves).toHaveLength(1);
    expect(t.saves[0]).toMatchObject({ note_id: 'n1', spellcheck: a });
  });
});
