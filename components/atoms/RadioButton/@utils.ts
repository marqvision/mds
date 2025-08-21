import { MDSTheme } from '../../../types';
import { Color, ColorSet, Status } from './@types';

export const getColorSet = (
  theme: MDSTheme
): Record<Color, Record<Status, ColorSet>> => {
  return {
    blue: {
      selected: {
        normalBorder: theme.color.bg.fill.primary.default.normal,
        disabledBorder: theme.color.bg.fill.primary.default.disabled,
        normalFill: theme.color.bg.fill.inverse.default.normal,
        disabledFill: theme.color.bg.fill.inverse.default.normal,
      },
      unSelected: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
    bluegray: {
      selected: {
        normalBorder: theme.color.content.neutral.default.normal,
        disabledBorder: theme.color.content.neutral.default.disabled,
        normalFill: theme.color.bg.fill.inverse.default.normal,
        disabledFill: theme.color.bg.fill.inverse.default.normal,
      },
      unSelected: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
  };
};