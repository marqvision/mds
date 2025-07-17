import { Theme } from '@emotion/react';
import { ImageData, ImageProps, MessageBoxType } from '../@types';

export const resolveMessageBoxBackgroundColor = (theme: Theme, type: MessageBoxType) => {
  const typeToColorMap: Record<MessageBoxType, string> = {
    neutral: theme.color.bg.surface.neutral.default.normal,
    default: theme.color.bg.surface.neutral.tertiary.normal,
    primary: theme.color.bg.surface.primary.default.normal,
    success: theme.color.bg.surface.success.default.normal,
    warning: theme.color.bg.surface.warning.default.normal,
    critical: theme.color.bg.surface.critical.default.normal,
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
