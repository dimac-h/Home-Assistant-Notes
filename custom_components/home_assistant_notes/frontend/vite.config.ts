import { defineConfig } from 'vite';

// HA serves the built output from /home_assistant_notes_panel/ (see __init__.py's
// static path registration) — base must match so any future chunk/asset
// imports resolve correctly.
export default defineConfig({
  base: '/home_assistant_notes_panel/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: {
        'home-assistant-notes-panel': 'src/panel.ts',
        'home-assistant-notes-card': 'src/card.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
