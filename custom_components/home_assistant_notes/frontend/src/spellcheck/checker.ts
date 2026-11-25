import NSpell from 'nspell';
import { detectLanguage } from './detect';
import { tokenize } from './tokenize';
import type { BlockRequest, BlockResult, LanguageConfig } from './types';

const MAX_SUGGESTIONS = 5;

export class SpellChecker {
  private readonly pair: LanguageConfig[];
  private readonly dictionaries = new Map<string, NSpell>();
  private ignored = new Set<string>();
  private readonly fallback: string;

  constructor(languages: LanguageConfig[], fallback: string) {
    this.pair = languages;
    for (const lang of languages) {
      if (lang.aff && lang.dic) {
        this.dictionaries.set(lang.code, new NSpell({ aff: lang.aff, dic: lang.dic }));
      }
    }
    this.fallback = this.inPair(fallback) ? fallback : (languages[0]?.code ?? fallback);
  }

  languages(): string[] {
    return [...this.dictionaries.keys()];
  }

  addDictionaryWords(lang: string, words: string[]): void {
    const dict = this.dictionaries.get(lang);
    if (!dict) return;
    for (const word of words) dict.add(word);
  }

  setIgnored(words: string[]): void {
    this.ignored = new Set(words.map((w) => w.toLowerCase()));
  }

  checkBlocks(blocks: BlockRequest[]): BlockResult[] {
    const results: BlockResult[] = [];
    let previous: string | undefined;
    for (const block of blocks) {
      const lang = this.resolveLanguage(block, previous);
      previous = lang;
      const dict = this.dictionaries.get(lang);
      const misspelled = dict
        ? tokenize(block.text).filter(
            (t) => !dict.correct(t.word) && !this.ignored.has(t.word.toLowerCase()),
          )
        : [];
      results.push({ key: block.key, lang, misspelled });
    }
    return results;
  }

  suggest(word: string, lang: string): string[] {
    const dict = this.dictionaries.get(lang);
    if (!dict) return [];
    const out: string[] = [];
    for (const s of dict.suggest(word)) {
      if (this.ignored.has(s.toLowerCase()) || out.includes(s)) continue;
      out.push(s);
      if (out.length === MAX_SUGGESTIONS) break;
    }
    return out;
  }

  private inPair(code: string | undefined): code is string {
    return !!code && this.pair.some((l) => l.code === code);
  }

  private resolveLanguage(block: BlockRequest, previous: string | undefined): string {
    if (this.inPair(block.langOverride)) return block.langOverride;
    const detected = detectLanguage(block.text, this.pair);
    if (detected.confident) return detected.lang;
    if (previous) return previous;
    if (this.inPair(block.inheritLang)) return block.inheritLang;
    return this.fallback;
  }
}
