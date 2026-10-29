import { describe, expect, it } from 'vitest';
import { DEFAULT_NOTE_COLOR, getNoteTextColor, safeColor } from './colors';

describe('safeColor', () => {
  it('accepts 3 and 6 digit hex colors', () => {
    expect(safeColor('#FFEB3B')).toBe('#FFEB3B');
    expect(safeColor('#abc')).toBe('#abc');
  });
  it('falls back to the default for anything else (user data goes into inline styles)', () => {
    for (const bad of ['red', 'url(javascript:1)', '#12345', '#GGGGGG', '#fff;background:red', '', null, undefined]) {
      expect(safeColor(bad as string | null | undefined)).toBe(DEFAULT_NOTE_COLOR);
    }
  });
});

describe('getNoteTextColor', () => {
  it('uses dark text on light notes and light text on dark notes', () => {
    expect(getNoteTextColor('#FFEB3B').title).toContain('0, 0, 0');
    expect(getNoteTextColor('#101820').title).toContain('255, 255, 255');
  });
  it('handles shorthand hex and invalid input', () => {
    expect(getNoteTextColor('#fff')).toEqual(getNoteTextColor('#ffffff'));
    expect(getNoteTextColor('nonsense')).toEqual(getNoteTextColor(DEFAULT_NOTE_COLOR));
  });
});
