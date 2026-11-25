import type { Node as PMNode } from '@tiptap/pm/model';

const CHECKED_TYPES = new Set(['paragraph', 'heading']);
const SKIPPED_MARKS = new Set(['code', 'link']);

export interface CheckedBlock {
  /** Document position directly before the block node. */
  pos: number;
  node: PMNode;
  /** Block text with code/link characters blanked out; offsets equal content offsets. */
  text: string;
  /** Manual language override, only when it is in the language pair. */
  override: string | undefined;
}

function blockText(node: PMNode): string {
  let text = '';
  node.forEach((child) => {
    if (child.isText) {
      const skipped = child.marks.some((m) => SKIPPED_MARKS.has(m.type.name));
      text += skipped ? ' '.repeat(child.nodeSize) : child.text!;
    } else {
      // Non-text inline nodes occupy one position; keep offsets aligned.
      text += ' ';
    }
  });
  return text;
}

export function validOverride(node: PMNode, pair: string[]): string | undefined {
  const lang = node.attrs.lang as string | null | undefined;
  return lang && pair.includes(lang) ? lang : undefined;
}

/** All paragraphs and headings of the document, in document order. */
export function collectBlocks(doc: PMNode, pair: string[]): CheckedBlock[] {
  const blocks: CheckedBlock[] = [];
  doc.descendants((node, pos) => {
    if (!node.isTextblock) return true;
    if (CHECKED_TYPES.has(node.type.name)) {
      blocks.push({ pos, node, text: blockText(node), override: validOverride(node, pair) });
    }
    return false;
  });
  return blocks;
}

export const cacheKey = (override: string | undefined, inherit: string | undefined, text: string): string =>
  `${override ?? ''}|${inherit ?? ''}|${text}`;
