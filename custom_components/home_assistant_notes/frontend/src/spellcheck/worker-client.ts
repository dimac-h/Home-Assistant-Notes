import type {
  BlockRequest,
  BlockResult,
  ConfigLanguage,
  LanguageConfig,
  WorkerRequest,
  WorkerResponse,
} from './types';

interface Pending {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}

function defaultWorker(): Worker {
  return new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
}

type Distribute<T> = T extends unknown ? Omit<T, 'id'> : never;

export class SpellWorkerClient {
  private readonly worker: Worker;
  private nextId = 1;
  private readonly pending = new Map<number, Pending>();
  private destroyed = false;

  constructor(createWorker: () => Worker = defaultWorker) {
    this.worker = createWorker();
    this.worker.addEventListener('message', (event) =>
      this.onMessage((event as MessageEvent<WorkerResponse>).data),
    );
    this.worker.addEventListener('error', () => this.rejectAll(new Error('Spellcheck worker failed')));
    this.worker.addEventListener('messageerror', () =>
      this.rejectAll(new Error('Spellcheck worker sent an unreadable message')),
    );
  }

  /** Fetches the dictionaries of ready languages; languages that fail to load are dropped. */
  static async loadConfigs(languages: ConfigLanguage[]): Promise<LanguageConfig[]> {
    const loaded = await Promise.all(
      languages
        .filter((l) => l.status === 'ready')
        .map(async (l): Promise<LanguageConfig | undefined> => {
          try {
            const [aff, dic] = await Promise.all([fetchText(l.aff_url), fetchText(l.dic_url)]);
            return { code: l.code, tinyld: l.tinyld, aff, dic };
          } catch {
            return undefined;
          }
        }),
    );
    return loaded.filter((l): l is LanguageConfig => l !== undefined);
  }

  async init(configs: LanguageConfig[], fallback: string): Promise<void> {
    await this.request({ type: 'init', languages: configs, fallback });
  }

  check(blocks: BlockRequest[]): Promise<BlockResult[]> {
    return this.request({ type: 'check', blocks }) as Promise<BlockResult[]>;
  }

  suggest(word: string, lang: string): Promise<string[]> {
    return this.request({ type: 'suggest', word, lang }) as Promise<string[]>;
  }

  async addDictionaryWord(lang: string, word: string): Promise<void> {
    await this.request({ type: 'addDictionaryWord', lang, word });
  }

  async removeDictionaryWord(lang: string, word: string): Promise<void> {
    await this.request({ type: 'removeDictionaryWord', lang, word });
  }

  async setIgnored(words: string[]): Promise<void> {
    await this.request({ type: 'setIgnored', words });
  }

  destroy(): void {
    this.destroyed = true;
    this.worker.terminate();
    this.rejectAll(new Error('Spellcheck worker was destroyed'));
  }

  private request(message: Distribute<WorkerRequest>): Promise<unknown> {
    if (this.destroyed) return Promise.reject(new Error('Spellcheck worker was destroyed'));
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ ...message, id });
    });
  }

  private onMessage(response: WorkerResponse): void {
    const entry = this.pending.get(response.id);
    if (!entry) return;
    this.pending.delete(response.id);
    if ('error' in response) entry.reject(new Error(response.error));
    else entry.resolve(response.result);
  }

  private rejectAll(error: Error): void {
    const entries = [...this.pending.values()];
    this.pending.clear();
    for (const entry of entries) entry.reject(error);
  }
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}
