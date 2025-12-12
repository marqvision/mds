import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { fileURLToPath } from "node:url";

const config: StorybookConfig = {
  stories: ['../@stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  staticDirs: ['../foundation'],
  addons: ['@storybook/addon-docs', '@storybook/addon-links'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  async viteFinal(config) {
    config.plugins?.push(
      checker({
        typescript: {
          tsconfigPath: fileURLToPath(import.meta.resolve('../tsconfig.json')),
        },
      }),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      })
    );
    return config;
  },
};
export default config;
