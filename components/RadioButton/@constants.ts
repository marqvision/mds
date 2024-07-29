import { Theme } from './@types';

export const theme: Theme = {
  color: {
    blue: {
      selected: {
        border: {
          normal: 'color/bg/fill/primary/default/normal',
          disabled: 'color/bg/fill/primary/default/disabled',
        },
        fill: {
          normal: 'color/bg/fill/inverse/default/normal',
          disabled: 'color/bg/fill/inverse/default/normal',
        },
      },
      unSelected: {
        border: {
          normal: 'color/bg/fill/neutral/weak/normal',
          disabled: 'color/bg/fill/neutral/weak/disabled',
        },
        fill: {
          disabled: 'color/bg/surface/neutral/secondary/disabled',
        },
      },
    },
    bluegray: {
      selected: {
        border: {
          normal: 'color/content/neutral/default/normal',
          disabled: 'color/content/neutral/default/disabled',
        },
        fill: {
          normal: 'color/bg/fill/inverse/default/normal',
          disabled: 'color/bg/fill/inverse/default/normal',
        },
      },
      unSelected: {
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
};
