import type { HomeAssistant } from './ha-types';

export interface Note {
  note_id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
  spellcheck: boolean;
  created: string;
  modified: string;
  tags: string[];
}

export async function getNotes(hass: HomeAssistant): Promise<Note[]> {
  const result = await hass.connection.sendMessagePromise<{ response: { notes: Note[] } }>({
    type: 'call_service',
    domain: 'home_assistant_notes',
    service: 'get_notes',
    service_data: {},
    return_response: true,
  });
  return result.response?.notes ?? [];
}

export async function createNote(
  hass: HomeAssistant,
  params: { title: string; content: string; color: string; pinned: boolean },
): Promise<string | undefined> {
  const result = await hass.connection.sendMessagePromise<{ response: { note_id: string } }>({
    type: 'call_service',
    domain: 'home_assistant_notes',
    service: 'create_note',
    service_data: params,
    return_response: true,
  });
  return result.response?.note_id;
}

export async function updateNote(
  hass: HomeAssistant,
  params: { note_id: string; title?: string; content?: string; color?: string; pinned?: boolean; spellcheck?: boolean },
): Promise<void> {
  await hass.callService('home_assistant_notes', 'update_note', params);
}

export async function deleteNote(hass: HomeAssistant, noteId: string): Promise<void> {
  await hass.callService('home_assistant_notes', 'delete_note', { note_id: noteId });
}

export function subscribeNoteEvents(hass: HomeAssistant, onEvent: () => void): Promise<() => void> {
  const events = ['home_assistant_notes_note_created', 'home_assistant_notes_note_updated', 'home_assistant_notes_note_deleted'];
  return Promise.all(events.map(e => hass.connection.subscribeEvents(onEvent, e))).then(
    unsubs => () => unsubs.forEach(fn => {
      // HA rejects with "Subscription not found" if the socket reconnected (or the
      // subscription was already dropped) before we unsubscribe — nothing to clean up then.
      try { Promise.resolve(fn()).catch(() => {}); } catch { /* already gone */ }
    }),
  );
}

export interface SpellcheckConfig {
  languages: Array<{
    code: string;
    name: string;
    tinyld: string;
    status: 'missing' | 'downloading' | 'ready' | 'failed';
    aff_url: string;
    dic_url: string;
  }>;
  dictionary: Record<string, string[]>;
  ignored: string[];
}

export async function getSpellcheckConfig(hass: HomeAssistant): Promise<SpellcheckConfig | null> {
  try {
    return await hass.connection.sendMessagePromise<SpellcheckConfig>({ type: 'home_assistant_notes/spellcheck_config' });
  } catch {
    return null;
  }
}

export async function addDictionaryWord(hass: HomeAssistant, lang: string, word: string): Promise<void> {
  await hass.callService('home_assistant_notes', 'add_dictionary_word', { lang, word });
}

export async function addIgnoredWord(hass: HomeAssistant, word: string): Promise<void> {
  await hass.callService('home_assistant_notes', 'add_ignored_word', { word });
}

export function subscribeSpellcheckEvents(hass: HomeAssistant, onChange: () => void): Promise<() => void> {
  const events = ['home_assistant_notes_spellcheck_changed', 'home_assistant_notes_words_changed'];
  return Promise.all(events.map(e => hass.connection.subscribeEvents(onChange, e))).then(
    unsubs => () => unsubs.forEach(fn => {
      try { Promise.resolve(fn()).catch(() => {}); } catch { /* already gone */ }
    }),
  );
}
