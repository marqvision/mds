import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/build/**', '**/dist/**'],
    setupFiles: ['./bootstrap.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/*.d.ts',
        '**/*.stories.{ts,tsx}',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/test/**',
        '**/__tests__/**',
        '**/*.config.{ts,js}',
      ],
    },
  },
});
