import { Theme } from './@types';

export const THEME: Theme = {
  size: {
    small: {
      boxSize: 20,
      fontSize: 's',
      padding: 6,
      borderRadius: 8,
      fontColor: {
        default: 'color/content/neutral/default/normal',
        disabled: 'color/content/neutral/default/disabled',
      },
    },
    medium: {
      boxSize: 24,
      fontSize: 'm',
      padding: 4,
      borderRadius: 8,
      fontColor: {
        default: 'color/content/neutral/default/normal',
        disabled: 'color/content/neutral/default/disabled',
      },
    },
  },
};
