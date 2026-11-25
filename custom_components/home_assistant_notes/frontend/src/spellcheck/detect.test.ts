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

  it('keeps short clear mixed nl/en sentences confident', () => {
    expect(detectLanguage('Ik heb een meeting', pair)).toEqual({ lang: 'nl', confident: true });
    expect(detectLanguage('We discuss the plan', pair)).toEqual({ lang: 'en', confident: true });
  });

  it('is not confident for a 3-word loan-word block with no guess', () => {
    expect(detectLanguage('plan meeting team', pair).confident).toBe(false);
  });

  it('is not confident for a single low-accuracy guess', () => {
    expect(detectLanguage('Zigbee Sonoff Hue', pair)).toEqual({ lang: 'en', confident: false });
  });

  it('stays confident for clear Turkish/English samples', () => {
    const tr = [
      { code: 'tr', tinyld: 'tr' },
      { code: 'en', tinyld: 'en' },
    ];
    expect(detectLanguage('Yarın market alışverişi yapacağım', tr).confident).toBe(true);
    expect(detectLanguage('We discuss the plan', tr)).toEqual({ lang: 'en', confident: true });
  });
});
