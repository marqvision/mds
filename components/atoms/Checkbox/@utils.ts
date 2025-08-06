import { MDSTheme } from '../../../types';
import { Color, ColorSet, Status } from './@types';

export const getColorSet = (
  theme: MDSTheme
): Record<Color, Record<Status, ColorSet>> => {
  return {
    blue: {
      default: {
        normalBorder: theme.color.bg.fill.primary.default.normal,
        disabledBorder: theme.color.bg.fill.primary.default.disabled,
      },
      unChecked: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
    white: {
      default: {
        normalBorder: theme.color.bg.fill.inverse.default.normal,
        disabledBorder: theme.color.bg.fill.inverse.default.disabled,
      },
      unChecked: {
        normalBorder: theme.color.bg.fill.inverse.default.normal,
        disabledBorder: theme.color.bg.fill.inverse.default.normal,
        disabledFill: theme.color.content.inverse.default.disabled,
      },
    },
    bluegray: {
      default: {
        normalBorder: theme.color.content.neutral.default.normal,
        disabledBorder: theme.color.content.neutral.default.disabled,
      },
      unChecked: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
  };
};