import { writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// Builds straight into ../www, which HA serves from /home_assistant_notes_panel/ (see __init__.py's
// static path registration) — base must match so any future chunk/asset
// imports resolve correctly.
export default defineConfig({
  plugins: [
    {
      // emptyOutDir wipes www/.gitkeep, which keeps the (otherwise git-ignored)
      // directory in the repo so the integration still loads without a build.
      name: 'restore-www-gitkeep',
      closeBundle: () => writeFileSync('../www/.gitkeep', ''),
    },
  ],
  base: '/home_assistant_notes_panel/',
  build: {
    outDir: '../www',
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
