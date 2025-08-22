import { Theme } from '@emotion/react';
import { ImageData, ImageProps, MessageColorType } from '../@types';

export const resolveMessageBoxBackgroundColor = (theme: Theme, type: MessageColorType) => {
  const typeToColorMap: Record<MessageColorType, string> = {
    white: theme.color.bg.surface.neutral.default.normal,
    bluegray: theme.color.bg.surface.neutral.tertiary.normal,
    blue: theme.color.bg.surface.primary.default.normal,
    green: theme.color.bg.surface.success.default.normal,
    yellow: theme.color.bg.surface.warning.default.normal,
    red: theme.color.bg.surface.critical.default.normal,
    purple: theme.color.bg.surface.purple.default.normal,
    teal: theme.color.bg.surface.teal.default.normal,
  };

  return typeToColorMap[type];
};

export const normalizeImageData = (image: string | ImageData, width: string): ImageProps => {
  if (typeof image === 'string') {
    return { src: image, width };
  }

  return {
    width,
    ...image,
  };
};
