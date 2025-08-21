import { MDSTheme } from '../../../types';
import { Color, ColorSet, Status } from './@types';

export const getColorSet = (
  theme: MDSTheme
): Record<Color, Record<Status, ColorSet>> => {
  return {
    blue: {
      checked: {
        normalBorder: theme.color.bg.fill.primary.default.normal,
        disabledBorder: theme.color.bg.fill.primary.default.disabled,
      },
      default: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
    white: {
      checked: {
        normalBorder: theme.color.bg.fill.inverse.default.normal,
        disabledBorder: theme.color.bg.fill.inverse.default.disabled,
      },
      default: {
        normalBorder: theme.color.bg.fill.inverse.default.normal,
        disabledBorder: theme.color.bg.fill.inverse.default.normal,
        disabledFill: theme.color.content.inverse.default.disabled,
      },
    },
    bluegray: {
      checked: {
        normalBorder: theme.color.content.neutral.default.normal,
        disabledBorder: theme.color.content.neutral.default.disabled,
      },
      default: {
        normalBorder: theme.color.bg.fill.neutral.weak.normal,
        disabledBorder: theme.color.bg.fill.neutral.weak.disabled,
        disabledFill: theme.color.bg.surface.neutral.secondary.disabled,
      },
    },
  };
};