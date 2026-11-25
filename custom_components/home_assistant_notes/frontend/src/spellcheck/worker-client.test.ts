import { afterEach, describe, expect, it, vi } from 'vitest';
import { SpellWorkerClient } from './worker-client';

class FakeWorker {
  posted: Array<{ id: number; type: string }> = [];
  terminated = false;
  private listeners = new Map<string, Array<(e: unknown) => void>>();
  postMessage(msg: { id: number; type: string }): void {
    this.posted.push(msg);
  }
  addEventListener(type: string, fn: (e: unknown) => void): void {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), fn]);
  }
  terminate(): void {
    this.terminated = true;
  }
  emit(type: string, event: unknown): void {
    for (const fn of this.listeners.get(type) ?? []) fn(event);
  }
}

function setup() {
  const worker = new FakeWorker();
  const client = new SpellWorkerClient(() => worker as unknown as Worker);
  return { worker, client };
}

describe('SpellWorkerClient', () => {
  it('uses increasing ids and resolves out-of-order responses', async () => {
    const { worker, client } = setup();
    const a = client.suggest('wrold', 'en');
    const b = client.check([{ key: 'k', text: 'x' }]);
    expect(worker.posted.map((m) => m.id)).toEqual([1, 2]);
    worker.emit('message', { data: { id: 2, type: 'check', result: [{ key: 'k', lang: 'en', misspelled: [] }] } });
    worker.emit('message', { data: { id: 1, type: 'suggest', result: ['world'] } });
    await expect(a).resolves.toEqual(['world']);
    await expect(b).resolves.toEqual([{ key: 'k', lang: 'en', misspelled: [] }]);
  });

  it('rejects when the worker answers with an error', async () => {
    const { worker, client } = setup();
    const p = client.setIgnored(['a']);
    worker.emit('message', { data: { id: 1, error: 'boom' } });
    await expect(p).rejects.toThrow('boom');
  });

  it('destroy terminates and rejects pending promises', async () => {
    const { worker, client } = setup();
    const p = client.suggest('a', 'en');
    client.destroy();
    await expect(p).rejects.toThrow();
    expect(worker.terminated).toBe(true);
  });

  it('rejects pending promises on worker error and messageerror', async () => {
    for (const type of ['error', 'messageerror']) {
      const { worker, client } = setup();
      const p = client.suggest('a', 'en');
      worker.emit(type, {});
      await expect(p).rejects.toThrow();
    }
  });
});

describe('SpellWorkerClient.loadConfigs', () => {
  afterEach(() => vi.unstubAllGlobals());

  const lang = (code: string, status = 'ready') => ({
    code,
    tinyld: code,
    status,
    aff_url: `/${code}.aff`,
    dic_url: `/${code}.dic`,
  });

  it('drops languages whose fetch fails and keeps the others', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (url.startsWith('/nl')) return { ok: false, status: 404, text: async () => '' };
        if (url.startsWith('/tr')) throw new Error('network');
        return { ok: true, status: 200, text: async () => `body ${url}` };
      }),
    );
    const out = await SpellWorkerClient.loadConfigs([lang('en'), lang('nl'), lang('tr')]);
    expect(out).toEqual([{ code: 'en', tinyld: 'en', aff: 'body /en.aff', dic: 'body /en.dic' }]);
  });

  it('skips languages that are not ready', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, text: async () => 'x' }));
    vi.stubGlobal('fetch', fetchMock);
    const out = await SpellWorkerClient.loadConfigs([lang('en', 'missing'), lang('nl')]);
    expect(out.map((l) => l.code)).toEqual(['nl']);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
