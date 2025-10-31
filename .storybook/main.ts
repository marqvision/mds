import { join, dirname } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../@stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  staticDirs: ['../foundation'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-links'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  async viteFinal(config) {
    config.plugins.push(
      checker({
        typescript: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        }
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
