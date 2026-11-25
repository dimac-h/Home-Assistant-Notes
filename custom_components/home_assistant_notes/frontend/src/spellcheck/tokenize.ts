import type { Token } from './types';

const SKIP = /\b(?:https?:\/\/|www\.)\S+|[^\s@]+@[^\s@]+\.[^\s@]+/giu;
const WORD = /[\p{L}\p{M}\p{N}]+(?:['’-][\p{L}\p{M}\p{N}]+)*/gu;
const HAS_DIGIT = /\p{N}/u;

/** Split text into checkable words; offsets are UTF-16 code units into `text`. */
export function tokenize(text: string): Token[] {
  const skipped: Array<[number, number]> = [];
  for (const m of text.matchAll(SKIP)) {
    skipped.push([m.index, m.index + m[0].length]);
  }
  const tokens: Token[] = [];
  for (const m of text.matchAll(WORD)) {
    const start = m.index;
    const end = start + m[0].length;
    if (HAS_DIGIT.test(m[0])) continue;
    if (skipped.some(([s, e]) => start < e && end > s)) continue;
    tokens.push({ offset: start, length: m[0].length, word: m[0] });
  }
  return tokens;
}
