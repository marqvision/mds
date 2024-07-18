import { Theme } from './@types';

export const theme: Theme = {
  color: {
    blue: {
      default: {
        normal: 'color/bg/fill/primary/default/normal',
        disabled: 'color/bg/fill/primary/default/disabled',
      },
      unChecked: {
        border: {
          normal: 'color/bg/fill/neutral/weak/normal',
          disabled: 'color/bg/fill/neutral/weak/disabled',
        },
        fill: {
          disabled: 'color/bg/surface/neutral/secondary/disabled',
        },
      },
    },
    white: {
      default: {
        normal: 'color/bg/fill/inverse/default/normal',
        disabled: 'color/bg/fill/inverse/default/disabled',
      },
      unChecked: {
        border: {
          normal: 'color/bg/fill/inverse/default/normal',
          disabled: 'color/bg/fill/inverse/default/normal',
        },
        fill: {
          disabled: 'color/content/inverse/default/disabled',
        },
      },
    },
    bluegray: {
      default: {
        normal: 'color/content/neutral/default/normal',
        disabled: 'color/content/neutral/default/disabled',
      },
      unChecked: {
        border: {
          normal: 'color/bg/fill/neutral/weak/normal',
          disabled: 'color/bg/fill/neutral/weak/disabled',
        },
        fill: {
          disabled: 'color/bg/surface/neutral/secondary/disabled',
        },
      },
    },
  },
  size: {
    small: 20,
    medium: 24,
  },
};
