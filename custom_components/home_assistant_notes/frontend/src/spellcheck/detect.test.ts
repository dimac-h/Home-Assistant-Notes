import { describe, expect, it } from 'vitest';
import { detectLanguage } from './detect';

const pair = [
  { code: 'nl', tinyld: 'nl' },
  { code: 'en', tinyld: 'en' },
];

describe('detectLanguage', () => {
  it('detects Dutch confidently', () => {
    expect(detectLanguage('Ik heb een meeting vandaag met het team', pair)).toEqual({
      lang: 'nl',
      confident: true,
    });
  });

  it('detects English confidently', () => {
    expect(detectLanguage('We discuss the plan for the next week', pair)).toEqual({
      lang: 'en',
      confident: true,
    });
  });

  it('is not confident for fewer than 3 words', () => {
    expect(detectLanguage('Hello there', pair).confident).toBe(false);
  });

  it('maps tinyld codes back to dictionary codes', () => {
    const result = detectLanguage('Dette er en lang nok setning for deteksjon', [
      { code: 'nb', tinyld: 'no' },
      { code: 'en', tinyld: 'en' },
    ]);
    expect(result.lang).toBe('nb');
  });

  it('returns the first pair code when nothing is detected', () => {
    expect(detectLanguage('', pair)).toEqual({ lang: 'nl', confident: false });
  });
});
