import { afterEach, describe, expect, it } from 'vitest';
import './note-spell-strip';
import type { HomeAssistantNotesSpellStrip } from './note-spell-strip';

async function mount(word: string | null, suggestions: string[]): Promise<HomeAssistantNotesSpellStrip> {
  const el = document.createElement('home-assistant-notes-spell-strip');
  el.word = word;
  el.suggestions = suggestions;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const buttons = (el: HomeAssistantNotesSpellStrip) => Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('ha-button'));
const labels = (el: HomeAssistantNotesSpellStrip) => buttons(el).map((b) => b.textContent!.trim());

afterEach(() => { document.body.innerHTML = ''; });

describe('spell strip', () => {
  it.each([
    [['the', 'tea'], ['the', 'tea', 'Add to dictionary', 'Ignore']],
    [['a', 'b', 'c', 'd', 'e', 'f', 'g'], ['a', 'b', 'c', 'd', 'e', 'Add to dictionary', 'Ignore']],
  ])('renders at most 5 suggestions followed by the two actions: %j', async (suggestions, expected) => {
    expect(labels(await mount('teh', suggestions))).toEqual(expected);
  });

  it('renders nothing without a word', async () => {
    expect((await mount(null, ['the'])).shadowRoot!.querySelector('.row')).toBeNull();
    expect((await mount('', [])).shadowRoot!.querySelector('.row')).toBeNull();
  });

  it('shows a label and both actions when there are no suggestions', async () => {
    const el = await mount('xyzzy', []);
    expect(el.shadowRoot!.textContent).toContain('No suggestions');
    expect(labels(el)).toEqual(['Add to dictionary', 'Ignore']);
  });

  it('fires events with the right detail, bubbling and composed', async () => {
    const el = await mount('teh', ['the', 'tea']);
    const seen: CustomEvent[] = [];
    for (const t of ['spell-suggestion', 'spell-add-dictionary', 'spell-ignore']) {
      document.body.addEventListener(t, (e) => seen.push(e as CustomEvent));
    }
    const [, tea, add, ignore] = buttons(el);
    tea.click(); add.click(); ignore.click();
    expect(seen.map((e) => e.type)).toEqual(['spell-suggestion', 'spell-add-dictionary', 'spell-ignore']);
    expect(seen[0].detail).toEqual({ suggestion: 'tea' });
    expect(seen.every((e) => e.composed && e.bubbles)).toBe(true);
  });

  it('keeps editor focus by cancelling mousedown on every button, like the toolbar', async () => {
    const el = await mount('teh', ['the']);
    for (const button of buttons(el)) {
      const e = new Event('mousedown', { bubbles: true, cancelable: true });
      button.dispatchEvent(e);
      expect(e.defaultPrevented).toBe(true);
    }
  });
});
