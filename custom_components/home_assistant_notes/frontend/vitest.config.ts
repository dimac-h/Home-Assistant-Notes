import { defineConfig } from 'vitest/config';

// Separate from vite.config.ts, which is a library build into ../www.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test-setup.ts'],
  },
});
