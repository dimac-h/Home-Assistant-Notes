import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { NodeSelection, TextSelection } from '@tiptap/pm/state';
import { loadTiptapExtensions } from '../tiptap-extensions';

export type ToolbarAction =
  | 'paragraph' | 'h1' | 'h2' | 'h3'
  | 'bold' | 'italic' | 'strike' | 'highlight' | 'code' | 'codeBlock' | 'blockquote'
  | 'bulletList' | 'orderedList' | 'taskList' | 'indent' | 'outdent'
  | 'setLink' | 'unsetLink';

@customElement('home-assistant-notes-tiptap-editor')
export class HomeAssistantNotesTiptapEditor extends LitElement {
  static styles = css`
    :host { display: flex; flex-direction: column; flex: 1 0 auto; }
    .fallback {
      width: 100%; min-height: 300px; font-size: 15px; line-height: 1.6;
      border: none; outline: none; resize: none; color: var(--primary-text-color);
      background: transparent; font-family: inherit;
    }
    #mount { flex: 1 0 auto; display: flex; flex-direction: column; }
    .ProseMirror,
    .ProseMirror:focus,
    .ProseMirror:focus-visible {
      outline: none;
    }
    .ProseMirror {
      flex: 1 0 auto; min-height: 100%; cursor: text; overflow-wrap: anywhere;
      white-space: pre-wrap;
    }
    .ProseMirror ul[data-type="taskList"] {
      list-style: none;
      padding-left: 0;
    }
    .ProseMirror ul[data-type="taskList"] li {
      display: flex;
      align-items: flex-start;
      margin: 1em 0;
    }
    .ProseMirror ul[data-type="taskList"] li > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }
    .ProseMirror ul[data-type="taskList"] li > div {
      flex: 1 1 auto;
    }
    .ProseMirror ul[data-type="taskList"] li > div > p {
      margin: 0;
    }
    .ProseMirror ul[data-type="taskList"] input[type="checkbox"] {
      cursor: pointer;
    }
    .ProseMirror pre {
      background-color: var(--primary-text-color);
      color: var(--card-background-color);
      border-radius: var(--ha-border-radius-sm, 8px);
      padding: var(--ha-space-4, 16px);
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--ha-font-family-code, monospace);
    }
    .ProseMirror pre code {
      background: none;
      color: inherit;
      padding: 0;
    }
    .ProseMirror blockquote {
      border-left: 4px solid var(--divider-color);
      margin-inline: 0;
      padding-inline: 1em;
    }
  `;

  @property({ attribute: false }) content = '';

  @query('#mount') private _mount?: HTMLDivElement;

  private _editor: any = null;
  private _fallback = false;
  private _lastEmitted = '';

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.updateComplete;
    this._init();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._editor?.destroy();
    this._editor = null;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('content') && this._editor && this.content !== this._lastEmitted) {
      this._lastEmitted = this.content;
      this._editor.commands.setContent(this.content, { emitUpdate: false });
      this._editor.commands.focus('end');
    }
  }

  // Re-scrolls the caret into view if the editor has focus. Needed after the
  // on-screen keyboard finishes opening: the autofocus scroll runs before the
  // viewport has shrunk, so the caret (at the end of the note) ends up hidden.
  scrollCaretIntoView(): void {
    if (this._editor?.isFocused) this._editor.commands.scrollIntoView();
  }

  private async _init(): Promise<void> {
    let loaded: Awaited<ReturnType<typeof loadTiptapExtensions>> | null;
    try {
      loaded = await loadTiptapExtensions();
    } catch (err) {
      console.warn('Home Assistant Notes: Tiptap failed to load, falling back to textarea', err);
      loaded = null;
    }
    if (!loaded || !this._mount) {
      this._fallback = true;
      this.requestUpdate();
      return;
    }
    const { Editor, extensions } = loaded;
    this._editor = new Editor({
      element: this._mount,
      extensions,
      content: this.content,
      autofocus: 'end',
      onUpdate: () => this._emitChanged(),
    });
    this._lastEmitted = this._editor.getHTML();
    // Capture-phase listener on the mount, ahead of TaskItem's own 'change'
    // handler on the <input>: that handler calls editor.focus(), which with the
    // keyboard closed focuses the editor, restores its stored caret (often the
    // end of the note), opens the keyboard and scrolls there. We stop it and do
    // the toggle ourselves, together with the reorder, in one transaction that
    // never touches focus or scroll.
    this._mount?.addEventListener('change', (e) => {
      const target = e.target as HTMLElement;
      if (target instanceof HTMLInputElement && target.type === 'checkbox' && target.closest('ul[data-type="taskList"]')) {
        e.stopPropagation();
        this._toggleTaskItem(target);
      }
    }, true);
  }

  // Applies a checkbox toggle and keeps the checklist tidy: unchecked items on
  // top, checked items below, each group sorted alphabetically. Only runs on
  // checkbox toggle (not on every keystroke) so typing a new item doesn't
  // jump around the list while the user is still writing it.
  private _toggleTaskItem(checkbox: HTMLInputElement): void {
    const view = this._editor?.view;
    const li = checkbox.closest('li');
    if (!view || !li) return;
    // The browser already flipped the checkbox. Undo that so the DOM still
    // matches the (not yet updated) document: ProseMirror reuses DOM rows for
    // identical sibling nodes (e.g. several "Kajaks" items) without calling the
    // node view's update(), so a row left natively toggled would keep showing
    // the wrong state after the reorder.
    const checked = checkbox.checked;
    checkbox.checked = !checked;
    const $pos = view.state.doc.resolve(view.posAtDOM(li, 0));
    let depth = $pos.depth;
    while (depth > 0 && $pos.node(depth).type.name !== 'taskList') depth--;
    if ($pos.node(depth).type.name !== 'taskList') return;
    const listStart = $pos.before(depth) + 1;
    let itemPos = -1;
    $pos.node(depth).forEach((child: any, offset: number) => {
      if (view.nodeDOM(listStart + offset) === li) itemPos = listStart + offset;
    });
    if (itemPos < 0) return;

    const tr = view.state.tr;
    tr.setNodeMarkup(itemPos, undefined, { ...tr.doc.nodeAt(itemPos)!.attrs, checked });
    const listNode = tr.doc.nodeAt(listStart - 1)!;
    const items: any[] = [];
    listNode.forEach((child: any) => items.push(child));
    const sorted = [...items].sort((a, b) => {
      const aChecked = !!a.attrs.checked;
      const bChecked = !!b.attrs.checked;
      if (aChecked !== bChecked) return aChecked ? 1 : -1;
      return (a.textContent || '').trim().localeCompare((b.textContent || '').trim());
    });
    if (sorted.some((item, i) => item !== items[i])) {
      const to = listStart + listNode.content.size;
      const selection = tr.selection;
      const { from: selFrom, to: selTo } = selection;
      tr.replaceWith(listStart, to, sorted);
      // replaceWith collapses a selection inside the list to its end, so re-anchor
      // it to the same spot inside the item it was in.
      if (selFrom >= listStart && selTo <= to) {
        let oldStart = listStart;
        for (const item of items) {
          const end = oldStart + item.nodeSize;
          if (selFrom < end) {
            let newStart = listStart;
            for (const s of sorted) { if (s === item) break; newStart += s.nodeSize; }
            const delta = newStart - oldStart;
            const a = selFrom + delta;
            const b = Math.min(selTo + delta, newStart + item.nodeSize);
            tr.setSelection(selection instanceof NodeSelection
              ? NodeSelection.create(tr.doc, a)
              : TextSelection.between(tr.doc.resolve(a), tr.doc.resolve(b)));
            break;
          }
          oldStart = end;
        }
      }
    }
    view.dispatch(tr);
  }

  private _emitChanged(): void {
    this._lastEmitted = this.getHTML();
    this.dispatchEvent(new CustomEvent('content-changed', {
      detail: { html: this._lastEmitted },
      bubbles: true,
      composed: true,
    }));
  }

  getHTML(): string {
    if (this._editor) return this._editor.getHTML();
    const textarea = this.renderRoot.querySelector('#fallback') as HTMLTextAreaElement | null;
    return textarea?.value ?? this.content;
  }

  getLinkHref(): string {
    return this._editor?.getAttributes('link').href ?? '';
  }

  runAction(action: ToolbarAction, payload?: { href?: string }): void {
    const chain = this._editor?.chain().focus();
    if (!chain) return;
    switch (action) {
      case 'paragraph': chain.setParagraph().run(); break;
      case 'h1': chain.toggleHeading({ level: 1 }).run(); break;
      case 'h2': chain.toggleHeading({ level: 2 }).run(); break;
      case 'h3': chain.toggleHeading({ level: 3 }).run(); break;
      case 'bold': chain.toggleBold().run(); break;
      case 'italic': chain.toggleItalic().run(); break;
      case 'strike': chain.toggleStrike().run(); break;
      case 'highlight': chain.toggleHighlight().run(); break;
      case 'code': chain.toggleCode().run(); break;
      case 'codeBlock': chain.toggleCodeBlock().run(); break;
      case 'blockquote': chain.toggleBlockquote().run(); break;
      case 'bulletList': chain.toggleBulletList().run(); break;
      case 'orderedList': chain.toggleOrderedList().run(); break;
      case 'taskList': chain.toggleTaskList().run(); break;
      case 'indent': chain.sinkListItem('listItem').run(); break;
      case 'outdent': chain.liftListItem('listItem').run(); break;
      case 'setLink': if (payload?.href) chain.setLink({ href: payload.href }).run(); break;
      case 'unsetLink': chain.unsetLink().run(); break;
    }
  }

  render() {
    if (this._fallback) {
      return html`<textarea
        id="fallback"
        class="fallback"
        placeholder="Start typing..."
        .value=${this.content}
        @input=${() => this._emitChanged()}
        @keydown=${(e: KeyboardEvent) => e.stopPropagation()}
      ></textarea>`;
    }
    return html`<div id="mount" @keydown=${(e: KeyboardEvent) => e.stopPropagation()}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'home-assistant-notes-tiptap-editor': HomeAssistantNotesTiptapEditor;
  }
}
