import { Theme } from '@emotion/react';

export const resolveToggleTrackColor = (theme: Theme, value: boolean, isDisabled: boolean): string => {
  if (value) {
    return isDisabled ? theme.color.bg.fill.primary.default.disabled : theme.color.bg.fill.primary.default.normal;
  }
  return isDisabled ? theme.color.bg.fill.neutral.weak.disabled : theme.color.bg.fill.neutral.weak.normal;
};

export const resolveToggleTrackHoverColor = (theme: Theme, value: boolean, isDisabled: boolean): string => {
  if (isDisabled) {
    return resolveToggleTrackColor(theme, value, isDisabled);
  }

  return value ? theme.color.bg.fill.primary.default.hover : theme.color.bg.fill.neutral.weak.hover;
};
