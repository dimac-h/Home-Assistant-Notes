import { detectAll } from 'tinyld/light';
import { tokenize } from './tokenize';

const MIN_WORDS = 3;
// Tuned on tinyld/light samples restricted to a pair: clear text scores 1.0,
// short clear English "We discuss the plan" scores 0.167 vs 0.066 (ratio 2.5),
// while single-guess loan-word blocks score ~0.06 ("Zigbee Sonoff Hue").
const MIN_ACCURACY = 0.1;
const MIN_RATIO = 2;

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
  const second = guesses[1];
  const clearMargin = !second || top.accuracy >= MIN_RATIO * second.accuracy;
  const enoughWords = tokenize(text).length >= MIN_WORDS;
  const confident = enoughWords && top.accuracy >= MIN_ACCURACY && clearMargin;
  return { lang: match.code, confident };
}
