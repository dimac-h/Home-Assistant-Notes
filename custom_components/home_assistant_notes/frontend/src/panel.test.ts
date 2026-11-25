import { afterEach, describe, expect, it, vi } from 'vitest';
import './panel';

const CONFIG = { languages: [], dictionary: {}, ignored: [] };

function makeHass(opts: { gateNotes?: boolean; gateSpellSubscribe?: boolean; configs?: unknown[] } = {}) {
  let releaseNotes!: () => void;
  const notesGate = new Promise<void>((r) => { releaseNotes = r; });
  let releaseSubscribe!: () => void;
  const subscribeGate = new Promise<void>((r) => { releaseSubscribe = r; });
  const configs = [...(opts.configs ?? [CONFIG])];
  const unsubs: Array<ReturnType<typeof vi.fn>> = [];
  const sendMessagePromise = vi.fn(async (msg: any) => {
    if (msg.type === 'home_assistant_notes/spellcheck_config') {
      const next = configs.length > 1 ? configs.shift() : configs[0];
      if (next instanceof Error) throw next;
      return next;
    }
    if (opts.gateNotes) await notesGate;
    return { response: { notes: [] } };
  });
  const subscribeEvents = vi.fn(async (_cb: () => void, event: string) => {
    if (opts.gateSpellSubscribe && event.includes('spellcheck')) await subscribeGate;
    const unsub = vi.fn();
    unsubs.push(unsub);
    return unsub;
  });
  const hass: any = { language: 'en', connection: { sendMessagePromise, subscribeEvents }, callService: vi.fn() };
  return { hass, sendMessagePromise, subscribeEvents, unsubs, releaseNotes, releaseSubscribe };
}

const spellcheckFetches = (h: ReturnType<typeof makeHass>) =>
  h.sendMessagePromise.mock.calls.filter(([m]) => m.type === 'home_assistant_notes/spellcheck_config').length;
const spellcheckSubscriptions = (h: ReturnType<typeof makeHass>) =>
  h.subscribeEvents.mock.calls.filter(([, e]) => String(e).includes('spellcheck')).length;

afterEach(() => { document.body.innerHTML = ''; vi.useRealTimers(); });

describe('panel spellcheck config', () => {
  it('runs init once when hass updates during the first fetch', async () => {
    const h = makeHass({ gateNotes: true });
    const panel = document.createElement('home-assistant-notes-panel') as any;
    document.body.appendChild(panel);
    panel.hass = h.hass;
    await panel.updateComplete;
    panel.hass = { ...h.hass };
    await panel.updateComplete;
    panel.hass = { ...h.hass };
    await panel.updateComplete;
    h.releaseNotes();
    await vi.waitFor(() => expect(spellcheckSubscriptions(h)).toBeGreaterThan(0));
    await new Promise((r) => setTimeout(r, 20));
    expect(spellcheckSubscriptions(h)).toBe(1);
    expect(spellcheckFetches(h)).toBe(1);
    // three note events + two spellcheck events, subscribed exactly once
    expect(h.subscribeEvents).toHaveBeenCalledTimes(5);
  });

  it('unsubscribes when disconnected while subscribing', async () => {
    const h = makeHass({ gateSpellSubscribe: true });
    const panel = document.createElement('home-assistant-notes-panel') as any;
    panel.hass = h.hass;
    document.body.appendChild(panel);
    await vi.waitFor(() => expect(spellcheckSubscriptions(h)).toBe(1));
    panel.remove();
    h.releaseSubscribe();
    await vi.waitFor(() => expect(h.unsubs.length).toBeGreaterThan(0));
    await new Promise((r) => setTimeout(r, 20));
    expect(h.unsubs.every((u) => u.mock.calls.length === 1)).toBe(true);
  });

  it('keeps the previous config when a refetch fails', async () => {
    const good = { languages: [{ code: 'en' }], dictionary: {}, ignored: [] };
    const h = makeHass({ configs: [good, new Error('ws closed')] });
    const panel = document.createElement('home-assistant-notes-panel') as any;
    panel.hass = h.hass;
    document.body.appendChild(panel);
    await vi.waitFor(() => expect(panel._spellcheckConfig).toEqual(good));
    await panel._loadSpellcheckConfig();
    expect(spellcheckFetches(h)).toBe(2);
    expect(panel._spellcheckConfig).toEqual(good);
  });
});

describe('panel spell strip events', () => {
  it('forwards add-dictionary and ignore events to the services and swallows errors', async () => {
    const h = makeHass();
    h.hass.callService.mockRejectedValueOnce(new Error('boom'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const panel = document.createElement('home-assistant-notes-panel') as any;
    panel.hass = h.hass;
    document.body.appendChild(panel);
    await panel.updateComplete;
    const editor = panel.shadowRoot.querySelector('home-assistant-notes-editor');
    editor.dispatchEvent(new CustomEvent('spell-add-dictionary-word', { detail: { lang: 'nl', word: 'teh' }, bubbles: true, composed: true }));
    editor.dispatchEvent(new CustomEvent('spell-add-ignored-word', { detail: { word: 'adn' }, bubbles: true, composed: true }));
    expect(h.hass.callService).toHaveBeenCalledWith('home_assistant_notes', 'add_dictionary_word', { lang: 'nl', word: 'teh' });
    expect(h.hass.callService).toHaveBeenCalledWith('home_assistant_notes', 'add_ignored_word', { word: 'adn' });
    await vi.waitFor(() => expect(warn).toHaveBeenCalledTimes(1));
    warn.mockRestore();
  });
});
