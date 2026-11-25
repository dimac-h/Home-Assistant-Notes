import { afterEach, describe, expect, it, vi } from 'vitest';
import './note-toolbar';
import type { HomeAssistantNotesToolbar } from './note-toolbar';

async function mount(props: Partial<HomeAssistantNotesToolbar> = {}) {
  const el = document.createElement('home-assistant-notes-toolbar') as HomeAssistantNotesToolbar;
  Object.assign(el, props);
  document.body.appendChild(el);
  await el.updateComplete;
  const group = () => el.shadowRoot!.querySelector('.group.language') as HTMLElement | null;
  const chip = () => group()?.querySelector('ha-button') as HTMLElement;
  const items = () => Array.from(group()!.querySelectorAll('.item')).map((b) => b.textContent!.trim());
  const open = async () => { chip().click(); await el.updateComplete; };
  const pick = async (label: string) => {
    const b = Array.from(group()!.querySelectorAll('.item')).find((i) => i.textContent!.trim() === label) as HTMLElement;
    b.click();
    await el.updateComplete;
  };
  return { el, group, chip, items, open, pick };
}

afterEach(() => { document.body.innerHTML = ''; });

describe('toolbar language chip', () => {
  it('is hidden when the language name is empty', async () => {
    const t = await mount({ languageName: '', spellcheckOn: true });
    expect(t.group()).toBeNull();
  });

  it('is the first item of the toolbar', async () => {
    const t = await mount({ languageName: 'English', spellcheckOn: true });
    expect(t.el.shadowRoot!.firstElementChild).toBe(t.group());
    expect(t.chip().textContent).toContain('English');
  });

  it('auto-detected block offers the other language and Don\'t check', async () => {
    const t = await mount({ languageName: 'English', otherLanguageName: 'Nederlands', spellcheckOn: true });
    expect(t.items()).toEqual(['Nederlands', "Don't check"]);
  });

  it('manual override also offers Auto-detect', async () => {
    const t = await mount({ languageName: 'English', otherLanguageName: 'Nederlands', languageManual: true, spellcheckOn: true });
    expect(t.items()).toEqual(['Nederlands', 'Auto-detect', "Don't check"]);
  });

  it('spellcheck off shows Off and only Check spelling', async () => {
    const t = await mount({ languageName: 'English', otherLanguageName: 'Nederlands', spellcheckOn: false });
    expect(t.chip().textContent).toContain('Off');
    expect(t.items()).toEqual(['Check spelling']);
  });

  it('omits the other-language item when there is no other language', async () => {
    const t = await mount({ languageName: 'English', otherLanguageName: '', spellcheckOn: true });
    expect(t.items()).toEqual(["Don't check"]);
  });

  it('fires language-select with the mode and closes the dropdown', async () => {
    const t = await mount({ languageName: 'English', otherLanguageName: 'Nederlands', languageManual: true, spellcheckOn: true });
    const seen = vi.fn();
    t.el.addEventListener('language-select', (e) => seen((e as CustomEvent).detail));
    await t.open();
    expect(t.group()!.classList.contains('open')).toBe(true);
    await t.pick('Nederlands');
    await t.open();
    await t.pick('Auto-detect');
    expect(seen.mock.calls).toEqual([[{ mode: 'other' }], [{ mode: 'auto' }]]);
    expect(t.group()!.classList.contains('open')).toBe(false);
  });

  it("fires spellcheck-toggle for Don't check and Check spelling", async () => {
    const t = await mount({ languageName: 'English', spellcheckOn: true });
    const seen = vi.fn();
    t.el.addEventListener('spellcheck-toggle', seen);
    await t.open();
    await t.pick("Don't check");
    expect(seen).toHaveBeenCalledTimes(1);
    expect(t.group()!.classList.contains('open')).toBe(false);
    t.el.spellcheckOn = false;
    await t.el.updateComplete;
    await t.open();
    await t.pick('Check spelling');
    expect(seen).toHaveBeenCalledTimes(2);
  });

  it('keeps editor focus on mousedown and closes other dropdowns', async () => {
    const t = await mount({ languageName: 'English', spellcheckOn: true });
    const ev = new MouseEvent('mousedown', { cancelable: true, bubbles: true });
    t.chip().dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    await t.open();
    const heading = t.el.shadowRoot!.querySelectorAll('.group')[1].querySelector('ha-button') as HTMLElement;
    heading.click();
    await t.el.updateComplete;
    expect(t.group()!.classList.contains('open')).toBe(false);
  });
});
