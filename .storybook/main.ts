import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import checker from 'vite-plugin-checker';

const config: StorybookConfig = {
  stories: ['../@stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [getAbsolutePath("@storybook/addon-docs"), getAbsolutePath("@storybook/addon-links")],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
