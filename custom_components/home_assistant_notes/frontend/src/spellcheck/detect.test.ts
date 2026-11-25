import { describe, expect, it } from 'vitest';
import { detectLanguage } from './detect';

const tr = [
  { code: 'tr', tinyld: 'tr' },
  { code: 'en', tinyld: 'en' },
];

const pair = [
  { code: 'nl', tinyld: 'nl' },
  { code: 'en', tinyld: 'en' },
];

describe('detectLanguage', () => {
  it.each([
    ['Dutch confidently', 'Ik heb een meeting vandaag met het team', pair, { lang: 'nl', confident: true }],
    ['English confidently', 'We discuss the plan for the next week', pair, { lang: 'en', confident: true }],
    ['not confident for fewer than 3 words', 'Hello there', pair, { lang: 'en', confident: false }],
    ['first pair code when nothing is detected', '', pair, { lang: 'nl', confident: false }],
    ['short clear Dutch stays confident', 'Ik heb een meeting', pair, { lang: 'nl', confident: true }],
    ['short clear English stays confident', 'We discuss the plan', pair, { lang: 'en', confident: true }],
    ['3-word loan-word block with no guess', 'plan meeting team', pair, { lang: 'nl', confident: false }],
    ['single low-accuracy guess', 'Zigbee Sonoff Hue', pair, { lang: 'en', confident: false }],
    ['clear Turkish', 'Yarın market alışverişi yapacağım', tr, { lang: 'tr', confident: true }],
    ['clear English with a Turkish pair', 'We discuss the plan', tr, { lang: 'en', confident: true }],
  ])('%s', (_name, text, langs, expected) => {
    expect(detectLanguage(text, langs)).toEqual(expected);
  });

  it('maps tinyld codes back to dictionary codes', () => {
    const result = detectLanguage('Dette er en lang nok setning for deteksjon', [
      { code: 'nb', tinyld: 'no' },
      { code: 'en', tinyld: 'en' },
    ]);
    expect(result.lang).toBe('nb');
  });
});
