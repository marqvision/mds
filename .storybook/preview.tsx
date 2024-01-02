import { ThemeProvider } from '@emotion/react';
import { MDSThemeValue } from '../foundation';
import { MDSResetCSS } from '../foundation/resetCSS';
import React from 'react';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    options: {
      // // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      // storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={MDSThemeValue}>
      <MDSResetCSS />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
