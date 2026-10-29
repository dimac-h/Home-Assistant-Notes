import { Selection } from '@tiptap/pm/state';
import type { Editor } from '@tiptap/core';

// Backspace in an empty paragraph right after a list. The list keymap would
// pull that paragraph into the list's last item, and when it is the last block
// StarterKit's TrailingNode re-adds it as soon as it is deleted (the caret then
// flipped between the list and a new paragraph on soft keyboards). So: delete
// it when more blocks follow, otherwise keep it and just move the caret to the
// end of the list. Returns whether it handled the key.
export function backspaceEmptyParagraphAfterList(editor: Editor): boolean {
  const { selection, doc } = editor.state;
  const { $from } = selection;
  if (!selection.empty || $from.depth !== 1) return false;
  const index = $from.index(0);
  if ($from.parent.type.name !== 'paragraph' || $from.parent.content.size !== 0 || index === 0) return false;
  if (doc.child(index - 1).type.name === 'paragraph') return false;
  const before = $from.before();
  if (index === doc.childCount - 1) {
    return editor.commands.setTextSelection(Selection.near(doc.resolve(before), -1).from);
  }
  return editor.chain().deleteRange({ from: before, to: $from.after() })
    .command(({ tr }) => { tr.setSelection(Selection.near(tr.doc.resolve(before), -1)); return true; }).run();
}

// Adding a new Tiptap extension: `npm install @tiptap/extension-X` in
// frontend/, then add it to the Promise.all below and to the returned
// extensions array. That's the whole surface area — tiptap-editor.ts
// never needs to change for a new extension.
export async function loadTiptapExtensions() {
  const [{ Editor, Extension }, { StarterKit }, { TaskList }, { TaskItem }, { Link }, { Highlight }, { ListItem }] = await Promise.all([
    import('@tiptap/core'),
    import('@tiptap/starter-kit'),
    import('@tiptap/extension-task-list'),
    import('@tiptap/extension-task-item'),
    import('@tiptap/extension-link'),
    import('@tiptap/extension-highlight'),
    import('@tiptap/extension-list-item'),
  ]);
  const EmptyParagraphAfterListBackspace = Extension.create({
    name: 'emptyParagraphAfterListBackspace',
    priority: 1000,
    addKeyboardShortcuts() {
      return { Backspace: ({ editor }) => backspaceEmptyParagraphAfterList(editor) };
    },
  });
  return {
    Editor,
    extensions: [
      EmptyParagraphAfterListBackspace,
      // listItem: false — replaced below with a ListItem that also allows a
      // heading as its first child. The default ListItem content model is
      // 'paragraph block*' (first child must specifically be a paragraph),
      // so toggling a list item to a heading is invalid at that level and
      // ProseMirror climbs up through every ancestor list to find a place
      // it IS valid, collapsing all nested indentation in the process.
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false, listItem: false, hardBreak: false }),
      ListItem.extend({
        content: '(paragraph|heading) block*',
        priority: 1000,
        addKeyboardShortcuts() {
          return {
            ...this.parent?.(),
            // Backspace in an empty item that has a sibling after it deletes the
            // item outright. The default lifts it out of the list, which splits
            // the list in two and restarts the numbering of the second half at 1.
            // The last item keeps the default so Backspace can still leave a list.
            Backspace: ({ editor }) => {
              const { selection } = editor.state;
              const { $from } = selection;
              if (!selection.empty || $from.parentOffset !== 0 || $from.parent.content.size !== 0) return false;
              const itemDepth = $from.depth - 1;
              if (itemDepth < 1 || $from.node(itemDepth).type.name !== this.name) return false;
              const item = $from.node(itemDepth);
              const list = $from.node(itemDepth - 1);
              if (item.childCount !== 1 || $from.index(itemDepth - 1) >= list.childCount - 1) return false;
              const start = $from.before(itemDepth);
              return editor.chain().deleteRange({ from: start, to: start + item.nodeSize }).command(({ tr }) => {
                tr.setSelection(Selection.near(tr.doc.resolve(start), -1));
                return true;
              }).run();
            },
          };
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({ openOnClick: true }),
      Highlight,
    ],
  };
}
