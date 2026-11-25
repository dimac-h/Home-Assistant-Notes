import { describe, expect, it, vi } from 'vitest';
import { getSpellcheckConfig, subscribeSpellcheckEvents } from './api';

describe('getSpellcheckConfig', () => {
  it('returns the config from the websocket command', async () => {
    const config = { languages: [], dictionary: {}, ignored: [] };
    const sendMessagePromise = vi.fn().mockResolvedValue(config);
    const hass: any = { connection: { sendMessagePromise } };
    expect(await getSpellcheckConfig(hass)).toBe(config);
    expect(sendMessagePromise).toHaveBeenCalledWith({ type: 'home_assistant_notes/spellcheck_config' });
  });

  it('returns null instead of throwing on error', async () => {
    const hass: any = { connection: { sendMessagePromise: vi.fn().mockRejectedValue(new Error('unknown command')) } };
    expect(await getSpellcheckConfig(hass)).toBeNull();
  });
});

describe('subscribeSpellcheckEvents', () => {
  it('subscribes to both events and tolerates failing unsubscribes', async () => {
    const unsub = vi.fn().mockRejectedValue(new Error('Subscription not found'));
    const subscribeEvents = vi.fn().mockResolvedValue(unsub);
    const stop = await subscribeSpellcheckEvents({ connection: { subscribeEvents } } as any, () => {});
    expect(subscribeEvents.mock.calls.map((c) => c[1])).toEqual([
      'home_assistant_notes_spellcheck_changed',
      'home_assistant_notes_words_changed',
    ]);
    expect(() => stop()).not.toThrow();
    expect(unsub).toHaveBeenCalledTimes(2);
  });
});
