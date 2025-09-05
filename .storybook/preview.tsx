import React from 'react';
import { MDSThemeProvider } from '../foundation';
import { Global, css } from '@emotion/react';
import './preview.css';

const globalStyles = css`
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }
  *::-webkit-scrollbar-thumb {
    visibility: hidden;
    opacity: 0;
    background-color: #919eab;
    border-radius: 4px;
  }
  *:hover::-webkit-scrollbar-thumb {
    visibility: visible;
    opacity: 1;
  }
`;

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
    docs: {
      autodocs: 'tag',
      toc: true,
    },

    options: {
      // // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      // storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
  },
};

export const decorators = [
  (Story) => (
    <MDSThemeProvider>
      <Global styles={globalStyles} />
      <Story />
    </MDSThemeProvider>
  ),
];

export default preview;
