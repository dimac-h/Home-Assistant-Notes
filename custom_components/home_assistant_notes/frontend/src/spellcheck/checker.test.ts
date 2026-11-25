import { describe, expect, it } from 'vitest';
import { SpellChecker } from './checker';
import type { LanguageConfig } from './types';

const en: LanguageConfig = {
  code: 'en',
  tinyld: 'en',
  aff: 'SET UTF-8\n',
  dic: '12\nwe\ndiscuss\nthe\nplan\nmeeting\nhello\nworld\nhelp\nhold\nsee\nand\n',
};
const nl: LanguageConfig = {
  code: 'nl',
  tinyld: 'nl',
  aff: 'SET UTF-8\n',
  dic: '8\nik\nheb\neen\nmeeting\nplan\nhet\nteam\nvandaag\n',
};

function make(languages = [en, nl], fallback = 'en') {
  return new SpellChecker(languages, fallback);
}

describe('SpellChecker', () => {
  it('reports exact offsets and lengths of misspellings', () => {
    const [result] = make([en]).checkBlocks([{ key: 'a', text: 'hello wrold and plan' }]);
    expect(result.misspelled).toEqual([{ offset: 6, length: 5, word: 'wrold' }]);
  });

  it('resolves mixed Dutch and English blocks', () => {
    const results = make().checkBlocks([
      { key: 'a', text: 'Ik heb een meeting' },
      { key: 'b', text: 'We discuss the plan' },
    ]);
    expect(results.map((r) => r.lang)).toEqual(['nl', 'en']);
  });

  it('lets a one-word block inherit the previous language', () => {
    const results = make().checkBlocks([
      { key: 'a', text: 'Ik heb een meeting vandaag' },
      { key: 'b', text: 'vandaag' },
    ]);
    expect(results[1].lang).toBe('nl');
    expect(results[1].misspelled).toEqual([]);
  });

  it('uses inheritLang then fallback for the first uncertain block', () => {
    expect(make().checkBlocks([{ key: 'a', text: 'hi', inheritLang: 'nl' }])[0].lang).toBe('nl');
    expect(make().checkBlocks([{ key: 'a', text: 'hi' }])[0].lang).toBe('en');
    expect(make().checkBlocks([{ key: 'a', text: 'hi', inheritLang: 'xx' }])[0].lang).toBe('en');
    expect(make(undefined, 'xx').checkBlocks([{ key: 'a', text: 'hi' }])[0].lang).toBe('en');
  });

  it('honours langOverride in the pair and ignores others', () => {
    const [over, bad] = make().checkBlocks([
      { key: 'a', text: 'Ik heb een meeting', langOverride: 'en' },
      { key: 'b', text: 'Ik heb een meeting', langOverride: 'xx' },
    ]);
    expect(over.lang).toBe('en');
    expect(over.misspelled.map((m) => m.word)).toEqual(['Ik', 'heb', 'een']);
    expect(bad.lang).toBe('nl');
  });

  it('does not flag dictionary-added words and suggests them', () => {
    const checker = make([en]);
    checker.addDictionaryWords('en', ['Zigbee']);
    expect(checker.checkBlocks([{ key: 'a', text: 'hello Zigbee' }])[0].misspelled).toEqual([]);
    expect(checker.suggest('Zigbe', 'en')).toContain('Zigbee');
  });

  it('does not flag ignored words and never suggests them', () => {
    const checker = make([en]);
    checker.setIgnored(['WROLD', 'helo']);
    expect(checker.checkBlocks([{ key: 'a', text: 'hello wrold' }])[0].misspelled).toEqual([]);
  });

  it('filters ignored words out of suggestions', () => {
    const checker = make([en]);
    expect(checker.suggest('wold', 'en')).toContain('world');
    checker.setIgnored(['world']);
    expect(checker.suggest('wold', 'en')).not.toContain('world');
  });

  it('caps suggestions at 5 without duplicates', () => {
    const many = { ...en, dic: '8\nhelp\nhelm\nhelo\nhelt\nheld\nhelx\nhely\nhelz\n' };
    const out = make([many]).suggest('hel', 'en');
    expect(out.length).toBeLessThanOrEqual(5);
    expect(new Set(out).size).toBe(out.length);
  });

  it('returns no misspellings for a language without a loaded dictionary', () => {
    const empty: LanguageConfig = { code: 'tr', tinyld: 'tr', aff: '', dic: '' };
    const checker = make([en, empty]);
    const [r] = checker.checkBlocks([{ key: 'a', text: 'zzzz qqqq', langOverride: 'tr' }]);
    expect(r).toEqual({ key: 'a', lang: 'tr', misspelled: [] });
    expect(checker.suggest('zzzz', 'tr')).toEqual([]);
    expect(checker.languages()).toEqual(['en']);
  });

  it('does not inherit a previous language that has no dictionary', () => {
    const empty: LanguageConfig = { code: 'tr', tinyld: 'tr', aff: '', dic: '' };
    const results = make([en, empty]).checkBlocks([
      { key: 'a', text: 'hello', langOverride: 'tr' },
      { key: 'b', text: 'wrold' },
    ]);
    expect(results.map((r) => r.lang)).toEqual(['tr', 'en']);
    expect(results[1].misspelled.length).toBe(1);
  });

  it('prefers inheritLang over the previous block in the same batch', () => {
    const results = make().checkBlocks([
      { key: 'a', text: 'Ik heb een meeting vandaag' },
      { key: 'b', text: 'hi', inheritLang: 'en' },
    ]);
    expect(results.map((r) => r.lang)).toEqual(['nl', 'en']);
  });

  it('lists loaded languages', () => {
    expect(make().languages()).toEqual(['en', 'nl']);
  });
});
