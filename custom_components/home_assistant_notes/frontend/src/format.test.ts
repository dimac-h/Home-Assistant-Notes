import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatRelativeDate, stripHtml } from './format';

afterEach(() => vi.useRealTimers());

describe('stripHtml', () => {
  it('puts each block on its own line', () => {
    expect(stripHtml('<ul><li>one</li><li>two</li></ul><p>three</p>')).toBe('one\ntwo\nthree\n');
  });
  it('turns <br> into a newline and drops tags', () => {
    expect(stripHtml('a<br>b <strong>c</strong>')).toBe('a\nb c');
  });
});

describe('formatRelativeDate', () => {
  const now = new Date('2026-10-29T12:00:00Z');
  const ago = (ms: number) => new Date(now.getTime() - ms).toISOString();
  const check = (ms: number) => { vi.useFakeTimers(); vi.setSystemTime(now); return formatRelativeDate(ago(ms)); };

  it('formats minutes, hours and days', () => {
    expect(check(10_000)).toBe('Just now');
    expect(check(5 * 60_000)).toBe('5 min ago');
    expect(check(60 * 60_000)).toBe('1 hour ago');
    expect(check(3 * 3_600_000)).toBe('3 hours ago');
    expect(check(86_400_000)).toBe('1 day ago');
    expect(check(3 * 86_400_000)).toBe('3 days ago');
  });
  it('falls back to a locale date after a week', () => {
    expect(check(10 * 86_400_000)).toBe(new Date(now.getTime() - 10 * 86_400_000).toLocaleDateString());
  });
});
