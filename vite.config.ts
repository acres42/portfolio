import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  test: {
    environment: 'jsdom',
    exclude: ['tests/e2e/**', 'node_modules'],
    include: ['tests/**/*.test.{ts,js}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['dist/js/**/*.js'],
      exclude: ['vite.config.ts', 'playwright.config.ts', 'test-results'],
    },
  },
})
