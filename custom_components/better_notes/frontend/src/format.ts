export function stripHtml(html: string): string {
  // textContent ignores block-level layout, so adjacent <li>/<p>/etc. run
  // together with no separator — insert a line break before parsing so
  // each block (e.g. each list item) lands on its own line.
  const spaced = html
    .replace(/<\/(li|p|div|h[1-6]|tr)>/gi, '</$1>\n')
    .replace(/<br\s*\/?>/gi, '\n');
  return new DOMParser().parseFromString(spaced, 'text/html').body.textContent || '';
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}
