export const THEME = {
  colors: {
    light: {
      default: {
        text: 'color/content/neutral/default/normal',
        opacity: 1,
      },
      selected: {
        text: 'color/content/primary/default/normal',
        opacity: 1,
      },
      bg: 'color/bg/surface/neutral/default/normal',
      dimmed: '_raw_color/blackAlpha5',
    },
    dark: {
      default: {
        text: 'color/content/on_default_color',
        opacity: 0.5,
      },
      selected: {
        text: 'color/content/on_default_color',
        opacity: 1,
      },
      bg: 'color/bg/surface/inverse/light',
      dimmed: '_raw_color/whiteAlpha5',
    },
  },
  size: {
    small: {
      tabSize: {
        withTitle: { height: 34 },
        withoutTitle: { height: 44 },
      },
      typography: { variant: 'body', size: 's' },
    },
    medium: {
      tabSize: {
        withTitle: { height: 38 },
        withoutTitle: { height: 48 },
      },
      typography: { variant: 'body', size: 'm' },
    },
    large: {
      tabSize: {
        withTitle: { height: 44 },
        withoutTitle: { height: 54 },
      },
      typography: { variant: 'body', size: 'l' },
    },
    ['x-large']: {
      tabSize: {
        withTitle: { height: 50 },
        withoutTitle: { height: 61 },
      },
      typography: { variant: 'title', size: 'xl' },
    },
  },
  transitionTiming: '225ms',
} as const;
