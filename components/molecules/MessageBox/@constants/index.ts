import { ImageSizesType, MessageBoxContentColorMap } from '../@types';

export const MessageBoxContentColor: MessageBoxContentColorMap = {
  white: {
    mainColor: 'color/content/neutral/default/normal',
  },
  bluegray: {
    mainColor: 'color/content/neutral/default/normal',
  },
  blue: {
    mainColor: 'color/content/neutral/default/normal',
  },
  green: {
    mainColor: 'color/content/success/default/normal',
  },
  yellow: {
    mainColor: 'color/content/warning/default/normal',
  },
  red: {
    mainColor: 'color/content/critical/default/normal',
  },
  purple: {
    mainColor: 'color/content/purple/default/normal',
  },
  teal: {
    mainColor: 'color/content/teal/default/normal',
  },
} as const;

export const IconSizes = {
  default: {
    info: 20,
    close: 20,
  },
  small: {
    info: 18,
    close: 16,
  },
} as const;

export const TypographySizes = {
  default: {
    title: {
      fontSize: 'l',
    },
    message: {
      fontSize: 'm',
    },
  },
  small: {
    title: {
      fontSize: 'm',
    },
    message: {
      fontSize: 's',
    },
  },
} as const;

export const ButtonSizes = {
  default: {
    titleCTA: 'medium',
    messageCTA: 'medium',
    action: 'large',
  },
  small: {
    titleCTA: 'small',
    messageCTA: 'small',
    action: 'medium',
  },
} as const;

export const ImageSizes: ImageSizesType = {
  default: {
    big: '66px',
    small: '32px',
  },
  small: {
    big: '58px',
    small: '28px',
  },
} as const;
