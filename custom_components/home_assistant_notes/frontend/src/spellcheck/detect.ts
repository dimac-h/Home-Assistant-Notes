import { detectAll } from 'tinyld/light';
import { tokenize } from './tokenize';

const MIN_WORDS = 3;
const MIN_ACCURACY = 0.5;

export function detectLanguage(
  text: string,
  pair: Array<{ code: string; tinyld: string }>,
): { lang: string; confident: boolean } {
  const first = pair[0]?.code ?? '';
  if (!pair.length) return { lang: first, confident: false };
  const guesses = detectAll(text, { only: pair.map((p) => p.tinyld) });
  const top = guesses[0];
  const match = top && pair.find((p) => p.tinyld === top.lang);
  if (!top || !match) return { lang: first, confident: false };
  // tinyld's raw accuracy is low for short text even when the pair is
  // unambiguous (e.g. 0.17 vs 0.07), so judge the top guess by its share
  // among the pair's candidates.
  const total = guesses.reduce((sum, g) => sum + g.accuracy, 0);
  const share = total > 0 ? top.accuracy / total : 0;
  const enoughWords = tokenize(text).length >= MIN_WORDS;
  return { lang: match.code, confident: enoughWords && share >= MIN_ACCURACY };
}
