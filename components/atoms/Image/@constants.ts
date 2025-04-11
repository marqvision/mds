import { Theme } from './@types';

export const BORDER_RADIUS = '4px';

export const THEME: Theme = {
  color: {
    border: {
      borderColor: 'color/border/neutral/default/normal',
      backgroundColor: 'color/bg/surface/neutral/default/normal',
      color: 'color/content/neutral/tertiary/disabled',
    },
    tint: {
      borderColor: 'color/bg/surface/neutral/secondary/normal',
      backgroundColor: 'color/bg/surface/neutral/secondary/normal',
      color: 'color/content/neutral/tertiary/disabled',
    },
  },
  size: {
    iconSize: {
      'x-small': 24,
      small: 24,
      medium: 32,
      large: 64,
    },
  },
};