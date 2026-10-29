import { afterEach, describe, expect, it } from 'vitest';
import { backspaceEmptyParagraphAfterList, loadTiptapExtensions } from './tiptap-extensions';

const editors: Array<{ destroy(): void }> = [];

async function createEditor(content: string) {
  const { Editor, extensions } = await loadTiptapExtensions();
  const element = document.createElement('div');
  document.body.appendChild(element);
  const editor = new Editor({ element, extensions, content });
  editors.push(editor);
  return editor;
}

// Marks empty paragraphs as <P/> so expected markup stays readable.
const html = (editor: { getHTML(): string }) => editor.getHTML().replace(/<p><\/p>/g, '<P/>');

// Dispatches a real Backspace keydown through ProseMirror's keymap handling.
const pressBackspace = (editor: { view: { dom: HTMLElement } }) =>
  editor.view.dom.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', keyCode: 8, bubbles: true, cancelable: true }));

afterEach(() => {
  editors.splice(0).forEach((editor) => editor.destroy());
  document.body.innerHTML = '';
});

describe('list item content model', () => {
  it('allows a heading as the first child of a list item', async () => {
    const editor = await createEditor('<ul><li><h2>Title</h2></li></ul>');
    expect(editor.getHTML()).toBe('<ul><li><h2>Title</h2></li></ul>');
  });
});

describe('Backspace in an empty list item', () => {
  it('deletes the item outright when another item follows, instead of lifting it out and splitting the list', async () => {
    const editor = await createEditor('<ol><li><p>a</p></li><li><p></p></li><li><p>c</p></li></ol>');
    // Caret in the empty second item.
    const emptyItemStart = 1 + editor.state.doc.firstChild!.firstChild!.nodeSize + 2;
    editor.commands.setTextSelection(emptyItemStart);
    pressBackspace(editor);
    // (the trailing <P/> is StarterKit's TrailingNode reacting to the edit)
    expect(html(editor)).toBe('<ol><li><p>a</p></li><li><p>c</p></li></ol><P/>');
    expect(editor.state.doc.firstChild!.childCount).toBe(2); // still a single list, numbering not restarted
  });
});

describe('backspaceEmptyParagraphAfterList', () => {
  const caretInParagraph = (editor: Awaited<ReturnType<typeof createEditor>>, index: number) => {
    let pos = 0;
    for (let i = 0; i < index; i++) pos += editor.state.doc.child(i).nodeSize;
    editor.commands.setTextSelection(pos + 1);
  };

  it('deletes the empty paragraph and moves the caret into the list when more blocks follow', async () => {
    const editor = await createEditor('<ul><li><p>a</p></li></ul><p></p><p>x</p>');
    caretInParagraph(editor, 1);
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(true);
    expect(html(editor)).toBe('<ul><li><p>a</p></li></ul><p>x</p>');
    expect(editor.state.selection.$from.parent.textContent).toBe('a');
  });

  it('keeps the paragraph when it is the last block and only moves the caret (TrailingNode would re-add it)', async () => {
    const editor = await createEditor('<ul><li><p>a</p></li></ul><p></p>');
    caretInParagraph(editor, 1);
    // The document must not be edited at all: a delete followed by TrailingNode
    // re-adding the paragraph ends in the same markup but is the flip we avoid.
    let edits = 0;
    editor.on('transaction', ({ transaction }) => { if (transaction.docChanged) edits++; });
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(true);
    expect(edits).toBe(0);
    expect(html(editor)).toBe('<ul><li><p>a</p></li></ul><P/>');
    expect(editor.state.selection.$from.parent.textContent).toBe('a');
    // Repeated presses must not flip the document or caret.
    const before = editor.state.doc.content.size;
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(false); // caret is in the list now
    expect(editor.state.doc.content.size).toBe(before);
  });

  it('does not handle a non-empty paragraph, a paragraph after a paragraph, or a non-empty selection', async () => {
    const editor = await createEditor('<ul><li><p>a</p></li></ul><p>text</p><p></p>');
    caretInParagraph(editor, 1);
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(false); // has text
    caretInParagraph(editor, 2);
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(false); // previous block is a paragraph
    editor.commands.setTextSelection({ from: 3, to: 4 });
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(false); // range selection
  });

  it('does not handle the very first block', async () => {
    const editor = await createEditor('<p></p><ul><li><p>a</p></li></ul>');
    editor.commands.setTextSelection(1);
    expect(backspaceEmptyParagraphAfterList(editor)).toBe(false);
  });

  it('is what the Backspace key does', async () => {
    const editor = await createEditor('<ul><li><p>a</p></li></ul><p></p><p>x</p>');
    caretInParagraph(editor, 1);
    pressBackspace(editor);
    expect(html(editor)).toBe('<ul><li><p>a</p></li></ul><p>x</p>');
  });
});

describe('extensions', () => {
  it('parses task lists with checked state', async () => {
    const editor = await createEditor('<ul data-type="taskList"><li data-type="taskItem" data-checked="true"><p>done</p></li></ul>');
    expect(editor.getHTML()).toContain('data-checked="true"');
  });
});
