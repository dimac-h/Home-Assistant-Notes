import type { AnyExtension, Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorState } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { EditorView } from '@tiptap/pm/view';
import type { Node as PMNode } from '@tiptap/pm/model';
import type { SpellWorkerClient } from './worker-client';
import type { BlockRequest, BlockResult } from './types';
import { cacheKey, collectBlocks } from './blocks';
import type { CheckedBlock } from './blocks';

export type SpellcheckClientLike = Pick<SpellWorkerClient, 'check'>;

export interface SpellcheckOptions {
  client: SpellcheckClientLike;
  pair: string[];
  fallback: string;
  enabled: () => boolean;
}

export interface WordAtCaret {
  word: string;
  from: number;
  to: number;
  lang: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spellcheck: {
      /** Sets (or with null removes) the manual language of the block at the caret. */
      setBlockLanguage: (lang: string | null) => ReturnType;
    };
  }
}

const DEBOUNCE_MS = 300;
const MAX_PASSES = 5;
export const SPELLCHECK_STATE_EVENT = 'spellcheck-state';

type CachedResult = Pick<BlockResult, 'lang' | 'misspelled'>;

/** Creates the extension; one instance serves exactly one editor. */
export function createSpellcheckExtension(ExtensionClass: typeof Extension, options: SpellcheckOptions): AnyExtension {
  const { client, pair, enabled } = options;
  const pluginKey = new PluginKey<DecorationSet>('spellcheck');
  const cache = new Map<string, CachedResult>();
  let view: EditorView | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let passes = 0;
  let warned = false;

  /** Cache keys and cached results per block, with each block inheriting its predecessor's language. */
  function resolve(blocks: CheckedBlock[]) {
    let inherit: string | undefined;
    return blocks.map((block) => {
      const key = cacheKey(block.override, inherit, block.text);
      const result = cache.get(key);
      const entry = { block, key, inherit, result };
      inherit = result?.lang;
      return entry;
    });
  }

  function build(doc: PMNode, carried: DecorationSet): DecorationSet {
    const decorations: Decoration[] = [];
    for (const { block, result } of resolve(collectBlocks(doc, pair))) {
      const start = block.pos + 1;
      if (result) {
        for (const m of result.misspelled) {
          decorations.push(
            Decoration.inline(start + m.offset, start + m.offset + m.length, { class: 'spell-error' }, { word: m.word }),
          );
        }
      } else {
        for (const d of carried.find(start, block.pos + block.node.nodeSize - 1)) {
          // Carried over only while the word underneath is unchanged.
          if (doc.textBetween(d.from, d.to) === d.spec.word) {
            decorations.push(Decoration.inline(d.from, d.to, { class: 'spell-error' }, d.spec));
          }
        }
      }
    }
    return DecorationSet.create(doc, decorations);
  }

  function notify() {
    view?.dom.dispatchEvent(new CustomEvent(SPELLCHECK_STATE_EVENT, { bubbles: true, composed: true }));
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(run, DEBOUNCE_MS);
  }

  async function run() {
    timer = undefined;
    const current = view;
    if (!current || !enabled()) return;
    const entries = resolve(collectBlocks(current.state.doc, pair));
    const seen = new Set<string>();
    const pending = entries.filter((e) => !e.result && !seen.has(e.key) && seen.add(e.key));
    if (!pending.length) return;
    passes++;
    const request: BlockRequest[] = pending.map((e) => ({
      key: e.key,
      text: e.block.text,
      langOverride: e.block.override,
      inheritLang: e.inherit,
    }));
    let results: BlockResult[];
    try {
      results = await client.check(request);
    } catch (error) {
      if (!warned) {
        warned = true;
        console.warn('Spellcheck failed; keeping the existing results', error);
      }
      return;
    }
    if (view !== current) return;
    for (const r of results) cache.set(r.key, { lang: r.lang, misspelled: r.misspelled });
    // A block that inherited from its in-batch predecessor is stored under that
    // predecessor's language too, so it is not re-checked in a second pass.
    let previous: string | undefined;
    for (const e of entries) {
      const own = cache.get(e.key);
      if (own && e.inherit === undefined && previous !== undefined) {
        const alias = cacheKey(e.block.override, previous, e.block.text);
        if (!cache.has(alias)) cache.set(alias, own);
      }
      previous = own?.lang;
    }
    current.dispatch(current.state.tr.setMeta(pluginKey, 'results').setMeta('addToHistory', false));
    notify();
    if (passes < MAX_PASSES && resolve(collectBlocks(current.state.doc, pair)).some((e) => !e.result)) schedule();
  }

  function blockAtCaret(state: EditorState) {
    const { $head } = state.selection;
    const node = $head.parent;
    if (!node.isTextblock || !['paragraph', 'heading'].includes(node.type.name)) return undefined;
    const doc = state.doc;
    const pos = $head.before();
    return resolve(collectBlocks(doc, pair)).find((e) => e.block.pos === pos);
  }

  const storage = {
    blockLanguage(): { code: string; manual: boolean } | null {
      if (!view || !enabled()) return null;
      const entry = blockAtCaret(view.state);
      if (!entry) return null;
      if (entry.block.override) return { code: entry.block.override, manual: true };
      return entry.result ? { code: entry.result.lang, manual: false } : null;
    },
    wordAtCaret(): WordAtCaret | null {
      if (!view || !enabled()) return null;
      const entry = blockAtCaret(view.state);
      if (!entry?.result) return null;
      const head = view.state.selection.head;
      const start = entry.block.pos + 1;
      for (const m of entry.result.misspelled) {
        const from = start + m.offset;
        const to = from + m.length;
        if (head >= from && head <= to) return { word: m.word, from, to, lang: entry.result.lang };
      }
      return null;
    },
    recheck(): void {
      cache.clear();
      passes = 0;
      if (!view) return;
      view.dispatch(view.state.tr.setMeta(pluginKey, 'recheck').setMeta('addToHistory', false));
      notify();
      schedule();
    },
  };

  return ExtensionClass.create({
    name: 'spellcheck',

    addStorage() {
      return storage;
    },

    addGlobalAttributes() {
      return [
        {
          types: ['paragraph', 'heading'],
          attributes: {
            lang: {
              default: null,
              parseHTML: (element: HTMLElement) => element.getAttribute('lang'),
              renderHTML: (attributes: Record<string, unknown>) => (attributes.lang ? { lang: attributes.lang } : {}),
            },
          },
        },
      ];
    },

    addCommands() {
      return {
        setBlockLanguage:
          (lang: string | null) =>
          ({ tr, state, dispatch }) => {
            const { $head } = state.selection;
            if (!$head.parent.isTextblock || !['paragraph', 'heading'].includes($head.parent.type.name)) return false;
            if (dispatch) tr.setNodeAttribute($head.before(), 'lang', lang || null);
            return true;
          },
      };
    },

    addProseMirrorPlugins() {
      return [
        new Plugin<DecorationSet>({
          key: pluginKey,
          state: {
            init: () => DecorationSet.empty,
            apply(tr, old, _oldState, newState) {
              if (!enabled()) return DecorationSet.empty;
              const meta = tr.getMeta(pluginKey);
              if (!tr.docChanged && !meta) return old;
              return build(newState.doc, tr.docChanged ? old.map(tr.mapping, tr.doc) : old);
            },
          },
          props: {
            decorations: (state) => pluginKey.getState(state),
          },
          view(editorView) {
            view = editorView;
            passes = 0;
            schedule();
            return {
              update(v, prevState) {
                if (!prevState.doc.eq(v.state.doc)) {
                  passes = 0;
                  schedule();
                }
                if (!prevState.selection.eq(v.state.selection)) notify();
              },
              destroy() {
                clearTimeout(timer);
                view = undefined;
              },
            };
          },
        }),
      ];
    },
  });
}
