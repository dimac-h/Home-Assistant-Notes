// Scrollable ancestors of a node, crossing shadow-DOM boundaries.
export function scrollableAncestors(start: Node): HTMLElement[] {
  const result: HTMLElement[] = [];
  let node: Node | null = start;
  while (node) {
    if (node instanceof HTMLElement && node.scrollHeight > node.clientHeight &&
        /(auto|scroll)/.test(getComputedStyle(node).overflowY)) result.push(node);
    node = node.parentNode ?? (node as ShadowRoot).host ?? null;
  }
  return result;
}
