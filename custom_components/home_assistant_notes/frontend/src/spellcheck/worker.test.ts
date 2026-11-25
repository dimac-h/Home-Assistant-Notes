import { describe, expect, it } from 'vitest';
import { createWorkerState, handleRequest } from './worker';
import type { WorkerRequest } from './types';

const en = {
  code: 'en',
  tinyld: 'en',
  aff: 'SET UTF-8\n',
  dic: '6\nhello\nworld\nhelp\nhold\nsee\nand\n',
};

describe('handleRequest', () => {
  it('errors for requests before init', () => {
    const state = createWorkerState();
    expect(handleRequest(state, { id: 1, type: 'check', blocks: [] })).toEqual({
      id: 1,
      error: expect.any(String),
    });
  });

  it('errors for an unknown type', () => {
    const state = createWorkerState();
    const res = handleRequest(state, { id: 2, type: 'nope' } as unknown as WorkerRequest);
    expect(res).toEqual({ id: 2, error: expect.stringContaining('nope') });
  });

  it('supports init, check, suggest, add, remove and setIgnored', () => {
    const state = createWorkerState();
    expect(handleRequest(state, { id: 1, type: 'init', languages: [en], fallback: 'en' })).toEqual({
      id: 1,
      type: 'init',
      result: undefined,
    });
    const check = (): unknown =>
      (handleRequest(state, { id: 9, type: 'check', blocks: [{ key: 'a', text: 'hello wrold' }] }) as {
        result: { misspelled: unknown[] }[];
      }).result[0].misspelled;
    expect(check()).toHaveLength(1);

    const suggest = handleRequest(state, { id: 3, type: 'suggest', word: 'wrold', lang: 'en' });
    expect(suggest).toMatchObject({ id: 3, type: 'suggest' });
    expect((suggest as { result: string[] }).result).toContain('world');

    handleRequest(state, { id: 4, type: 'addDictionaryWord', lang: 'en', word: 'wrold' });
    expect(check()).toEqual([]);
    handleRequest(state, { id: 5, type: 'removeDictionaryWord', lang: 'en', word: 'wrold' });
    expect(check()).toHaveLength(1);
    handleRequest(state, { id: 6, type: 'setIgnored', words: ['wrold'] });
    expect(check()).toEqual([]);
  });
});
