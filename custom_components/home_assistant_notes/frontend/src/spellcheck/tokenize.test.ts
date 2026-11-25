import { describe, expect, it } from 'vitest';
import { tokenize } from './tokenize';

describe('tokenize', () => {
  it('returns words with UTF-16 offsets and lengths', () => {
    expect(tokenize('Hello wörld')).toEqual([
      { offset: 0, length: 5, word: 'Hello' },
      { offset: 6, length: 5, word: 'wörld' },
    ]);
  });

  it.each([
    ['inner apostrophes and hyphens', "don't well-known it’s", ["don't", 'well-known', 'it’s']],
    ['no leading or trailing punctuation', "'hi' -well- ", ['hi', 'well']],
    ['tokens containing digits', 'abc123 4x room5 ok', ['ok']],
    ['URLs and e-mail addresses', 'see https://x.y/zed and www.foo.com or a@b.nl now', ['see', 'and', 'or', 'now']],
  ])('%s', (_name, input, words) => {
    expect(tokenize(input).map((t) => t.word)).toEqual(words);
  });

  it('offsets stay correct after astral characters', () => {
    const [second] = tokenize('😀 word');
    expect(second).toEqual({ offset: 3, length: 4, word: 'word' });
  });
});
