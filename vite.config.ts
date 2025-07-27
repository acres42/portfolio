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
    coverage: {
      reporter: ['text', 'html'],
        exclude: ['vite.config.ts', 'dist/**'],
    },
  },
})
