import type { SpellcheckConfig } from '../api';
import type { BlockRequest, BlockResult, LanguageConfig } from './types';
import { SpellWorkerClient } from './worker-client';

/** The subset of SpellWorkerClient the editor uses; `loadConfigs` is an optional test seam. */
export interface SpellWorkerClientLike {
  check(blocks: BlockRequest[]): Promise<BlockResult[]>;
  suggest(word: string, lang: string): Promise<string[]>;
  init(configs: LanguageConfig[], fallback: string): Promise<void>;
  addDictionaryWord(lang: string, word: string): Promise<void>;
  removeDictionaryWord(lang: string, word: string): Promise<void>;
  setIgnored(words: string[]): Promise<void>;
  destroy(): void;
  loadConfigs?(languages: SpellcheckConfig['languages']): Promise<LanguageConfig[]>;
}

export const SPELLCHECK_TIMEOUT_MS = 15000;

export interface SpellcheckControllerOptions {
  createClient: () => SpellWorkerClientLike;
  /** The editor's default language (`lang` property), possibly a region tag like `nl-NL`. */
  getLang: () => string;
  /** Called after every state change: the editor refreshes attributes, re-checks and notifies. */
  onChange: () => void;
}

function withTimeout<T>(promise: Promise<T>, message: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), SPELLCHECK_TIMEOUT_MS);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export const defaultClientFactory = (): SpellWorkerClientLike => new SpellWorkerClient();

/**
 * Owns the lifecycle of the spellcheck worker client for one editor. It never
 * waits on spellcheck for longer than SPELLCHECK_TIMEOUT_MS and never throws:
 * a failure logs one warning and leaves spellcheck inactive.
 */
export class SpellcheckController {
  /** Codes of the loaded languages; mutated in place because the extension holds this array. */
  readonly pair: string[] = [];
  active = false;
  readonly proxy = { check: (blocks: BlockRequest[]) => this.check(blocks) };

  private client: SpellWorkerClientLike | null = null;
  private readyKey = '';
  private dictionary = new Map<string, Set<string>>();
  private ignored = new Set<string>();
  private generation = 0;
  private queued: { config: SpellcheckConfig | null; enabled: boolean } | null = null;
  private loop?: Promise<void>;
  private warned = false;

  constructor(private readonly options: SpellcheckControllerOptions) {}

  update(config: SpellcheckConfig | null, enabled: boolean): Promise<void> {
    this.generation++;
    this.queued = { config, enabled };
    this.loop ??= this.drain().finally(() => { this.loop = undefined; });
    return this.loop;
  }

  destroy(): void {
    this.generation++;
    this.queued = null;
    this.teardown();
  }

  async suggest(word: string, lang: string): Promise<string[]> {
    if (!this.client) return [];
    try {
      return await this.client.suggest(word, lang);
    } catch {
      return [];
    }
  }

  private async drain(): Promise<void> {
    while (this.queued) {
      const { config, enabled } = this.queued;
      this.queued = null;
      const generation = this.generation;
      try {
        await this.apply(config, enabled, generation);
      } catch (error) {
        this.fail(error);
      }
    }
  }

  private async apply(config: SpellcheckConfig | null, enabled: boolean, generation: number): Promise<void> {
    const ready = enabled && config ? config.languages.filter((l) => l.status === 'ready') : [];
    if (!config || !ready.length) {
      this.teardown();
      this.options.onChange();
      return;
    }
    const key = ready.map((l) => l.code).sort().join(',');
    if (this.client && key === this.readyKey) {
      await withTimeout(this.syncWords(this.client, config), 'Spellcheck word update timed out');
      if (generation === this.generation) this.options.onChange();
      return;
    }
    this.teardown();
    const client = this.options.createClient();
    try {
      const loaded = await withTimeout(this.start(client, ready, config), 'Spellcheck did not start in time');
      if (generation !== this.generation) {
        client.destroy();
        return;
      }
      this.client = client;
      this.readyKey = key;
      this.pair.splice(0, this.pair.length, ...loaded);
      this.dictionary = new Map(loaded.map((code) => [code, new Set(config.dictionary[code] ?? [])]));
      this.ignored = new Set(config.ignored);
      this.active = true;
    } catch (error) {
      client.destroy();
      throw error;
    }
    this.options.onChange();
  }

  private async start(
    client: SpellWorkerClientLike,
    ready: SpellcheckConfig['languages'],
    config: SpellcheckConfig,
  ): Promise<string[]> {
    const configs = await (client.loadConfigs ? client.loadConfigs(ready) : SpellWorkerClient.loadConfigs(ready));
    if (!configs.length) throw new Error('No spellcheck dictionary could be loaded');
    const codes = configs.map((c) => c.code);
    const lang = this.options.getLang().split('-')[0].toLowerCase();
    await client.init(configs, codes.includes(lang) ? lang : codes[0]);
    await Promise.all([
      ...codes.flatMap((code) => (config.dictionary[code] ?? []).map((word) => client.addDictionaryWord(code, word))),
      client.setIgnored(config.ignored),
    ]);
    return codes;
  }

  private async syncWords(client: SpellWorkerClientLike, config: SpellcheckConfig): Promise<void> {
    const jobs: Promise<void>[] = [];
    for (const [code, current] of this.dictionary) {
      const next = new Set(config.dictionary[code] ?? []);
      for (const word of next) if (!current.has(word)) jobs.push(client.addDictionaryWord(code, word));
      for (const word of current) if (!next.has(word)) jobs.push(client.removeDictionaryWord(code, word));
      this.dictionary.set(code, next);
    }
    const ignored = new Set(config.ignored);
    if (ignored.size !== this.ignored.size || [...ignored].some((w) => !this.ignored.has(w))) {
      jobs.push(client.setIgnored(config.ignored));
      this.ignored = ignored;
    }
    await Promise.all(jobs);
  }

  private async check(blocks: BlockRequest[]): Promise<BlockResult[]> {
    const client = this.client;
    if (!client) throw new Error('Spellcheck is not running');
    try {
      return await withTimeout(client.check(blocks), 'Spellcheck request timed out');
    } catch (error) {
      if (this.client === client && /timed out/.test(String((error as Error)?.message))) {
        this.fail(error);
      }
      throw error;
    }
  }

  private fail(error: unknown): void {
    if (!this.warned) {
      this.warned = true;
      console.warn('Home Assistant Notes: spellcheck is unavailable', error);
    }
    this.teardown();
    this.options.onChange();
  }

  private teardown(): void {
    this.active = false;
    this.pair.length = 0;
    this.readyKey = '';
    this.dictionary.clear();
    this.ignored.clear();
    const client = this.client;
    this.client = null;
    try {
      client?.destroy();
    } catch {
      /* already gone */
    }
  }
}
