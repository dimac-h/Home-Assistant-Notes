// jsdom reports navigator.vendor as "Apple Computer, Inc.", so prosemirror-view
// takes its Safari-only shadow-DOM selection path (which needs APIs jsdom lacks,
// incl. the deprecated document.execCommand) when the editor lives in a Lit
// shadow root. Report a non-Safari vendor so tests exercise the regular path.
// Safari-specific behaviour is not covered by these tests.
Object.defineProperty(navigator, 'vendor', { value: 'Google Inc.', configurable: true });
