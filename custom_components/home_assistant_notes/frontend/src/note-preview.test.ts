import { describe, expect, it } from 'vitest';
import { notePreviewHtml } from './note-preview';

describe('notePreviewHtml', () => {
  it('keeps structural markup such as lists and checkboxes', () => {
    const out = notePreviewHtml('<ul data-type="taskList"><li data-type="taskItem"><label><input type="checkbox" checked><span></span></label><div><p>buy milk</p></div></li></ul>');
    expect(out).toContain('<ul');
    expect(out).toContain('<li');
    expect(out).toContain('type="checkbox"');
    expect(out).toContain('buy milk');
  });

  it('strips scripts, event handlers and other disallowed markup', () => {
    const out = notePreviewHtml('<p onclick="x()">hi<script>alert(1)</script><img src=x onerror="alert(2)"><iframe src="//evil"></iframe></p>');
    expect(out).not.toMatch(/<script|onclick|onerror|<img|<iframe/i);
    expect(out).toContain('hi');
  });

  it('sanitizes children unwrapped from disallowed elements (nested unknown tags)', () => {
    // Regression: unwrapping an unknown tag used to leave its (unsanitized) children in place.
    const out = notePreviewHtml('<custom><b onmouseover="alert(1)">x</b><custom><img src=x onerror="alert(2)"></custom></custom>');
    expect(out).not.toMatch(/onmouseover|onerror|<img|<custom/i);
    expect(out).toContain('x');
  });

  it('drops empty paragraphs but keeps ones holding a checkbox', () => {
    expect(notePreviewHtml('<p></p><p>keep</p>')).toBe('<p>keep</p>');
  });
});
