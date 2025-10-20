import { mergeConfig, defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import baseConfig from '../../vitest.config.base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [viteTsconfigPaths()],
    test: {
      include: ['**/*.test.{ts,tsx}'],
    },
  })
);

