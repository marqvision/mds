import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';
// React 컴포넌트 테스트 설정 (디자인 시스템 컴포넌트용)
import { createVitestReactConfig } from '@marqvision/vitest-config/react';

export default defineConfig(
  createVitestReactConfig({
    plugins: [viteTsconfigPaths()],
    test: {
      include: ['**/*.test.{ts,tsx}'],
      setupFiles: ['./bootstrap.ts'],
    },
  })
);

