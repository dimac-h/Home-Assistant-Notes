import { SpellChecker } from './checker';
import type { WorkerRequest, WorkerResponse } from './types';

export interface WorkerState {
  checker?: SpellChecker;
}

export function createWorkerState(): WorkerState {
  return {};
}

const KNOWN_TYPES = new Set<string>([
  'check',
  'suggest',
  'addDictionaryWord',
  'removeDictionaryWord',
  'setIgnored',
]);

export function handleRequest(state: WorkerState, request: WorkerRequest): WorkerResponse {
  const { id, type } = request;
  try {
    if (type === 'init') {
      state.checker = new SpellChecker(request.languages, request.fallback);
      return { id, type, result: undefined };
    }
    if (!KNOWN_TYPES.has(type)) return { id, error: `Unknown request type: ${String(type)}` };
    const checker = state.checker;
    if (!checker) return { id, error: 'Spellchecker is not initialised' };
    switch (type) {
      case 'check':
        return { id, type, result: checker.checkBlocks(request.blocks) };
      case 'suggest':
        return { id, type, result: checker.suggest(request.word, request.lang) };
      case 'addDictionaryWord':
        checker.addDictionaryWords(request.lang, [request.word]);
        return { id, type, result: undefined };
      case 'removeDictionaryWord':
        checker.removeDictionaryWords(request.lang, [request.word]);
        return { id, type, result: undefined };
      case 'setIgnored':
        checker.setIgnored(request.words);
        return { id, type, result: undefined };
    }
  } catch (err) {
    return { id, error: err instanceof Error ? err.message : String(err) };
  }
}

declare const WorkerGlobalScope: unknown;

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof (WorkerGlobalScope as typeof Object)) {
  const state = createWorkerState();
  self.addEventListener('message', (event) => {
    (self as unknown as Worker).postMessage(handleRequest(state, (event as MessageEvent).data));
  });
}
