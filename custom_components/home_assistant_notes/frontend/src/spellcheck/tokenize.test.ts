import { describe, expect, it } from 'vitest';
import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('returns words with UTF-16 offsets and lengths', () => {
    expect(tokenize('Hello wörld')).toEqual([
      { offset: 0, length: 5, word: 'Hello' },
      { offset: 6, length: 5, word: 'wörld' },
    ]);
  });

  it('keeps inner apostrophes and hyphens', () => {
    expect(tokenize("don't well-known it’s").map((t) => t.word)).toEqual([
      "don't",
      'well-known',
      'it’s',
    ]);
  });

  it('does not include leading or trailing punctuation', () => {
    expect(tokenize("'hi' -well- ").map((t) => t.word)).toEqual(['hi', 'well']);
  });

  it('skips tokens containing digits', () => {
    expect(tokenize('abc123 4x room5 ok').map((t) => t.word)).toEqual(['ok']);
  });

  it('skips URLs and e-mail addresses entirely', () => {
    expect(tokenize('see https://x.y/zed and www.foo.com or a@b.nl now').map((t) => t.word)).toEqual([
      'see',
      'and',
      'or',
      'now',
    ]);
  });

  it('offsets stay correct after astral characters', () => {
    const [second] = tokenize('😀 word');
    expect(second).toEqual({ offset: 3, length: 4, word: 'word' });
  });
});
