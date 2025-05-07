import { MDSTheme } from '../../../../types';
import { BodySize } from '../../../atoms/Typography';
import { Color, ColorTheme, Size, Status } from '../@types';

export const getColor = (theme: MDSTheme): Record<Color, Record<Status, ColorTheme> & Partial<{ completed: ColorTheme }>> => {
  return {
    bluegray: {
      normal: {
        color: theme.color.content.neutral.default.normal,
      },
      hover: {
        color: theme.color.content.neutral.default.hover,
      },
      disabled: {
        color: theme.color.content.neutral.default.disabled,
      },
      completed: {
        color: theme.color.content.neutral.default.completed,
      },
    },
    blue: {
      normal: {
        color: theme.color.content.primary.default.normal,
      },
      hover: {
        color: theme.color.content.primary.default.hover,
      },
      disabled: {
        color: theme.color.content.primary.default.disabled,
      },
    },
    red: {
      normal: {
        color: theme.color.content.critical.default.normal,
      },
      hover: {
        color: theme.color.content.critical.default.hover,
      },
      disabled: {
        color: theme.color.content.critical.default.disabled,
      },
    },
    yellow: {
      normal: {
        color: theme.color.content.warning.default.normal,
      },
      hover: {
        color: theme.color.content.warning.default.hover,
      },
      disabled: {
        color: theme.color.content.warning.default.disabled,
      },
    },
    green: {
      normal: {
        color: theme.color.content.success.default.normal,
      },
      hover: {
        color: theme.color.content.success.default.hover,
      },
      disabled: {
        color: theme.color.content.success.default.disabled,
      },
    },
    white: {
      normal: {
        color: theme.color.content.inverse.default.normal,
      },
      hover: {
        color: theme.color.content.inverse.default.hover,
      },
      disabled: {
        color: theme.color.content.inverse.default.disabled,
      },
    },
  };
};

export const getSize = (theme: MDSTheme): Record<
  Size,
  {
    size: BodySize;
    icon: number;
    verticalPadding: string;
    horizontalPadding: string;
    iconPadding: string;
    radius: string;
    gap: string;
  }
> => {
  return {
    small: {
      size: 's',
      icon: theme.comp.plainButton.iconSize.sm,
      verticalPadding: theme.comp.plainButton.pddng.v.s,
      horizontalPadding: theme.comp.plainButton.pddng.h.s,
      iconPadding: theme.comp.plainButton.pddng.icon.s,
      radius: theme.comp.plainButton.radius.sm,
      gap: theme.comp.plainButton.gap.sm,
    },
    medium: {
      size: 'm',
      icon: theme.comp.plainButton.iconSize.md,
      verticalPadding: theme.comp.plainButton.pddng.v.m,
      horizontalPadding: theme.comp.plainButton.pddng.h.m,
      iconPadding: theme.comp.plainButton.pddng.icon.m,
      radius: theme.comp.plainButton.radius.md,
      gap: theme.comp.plainButton.gap.md,
    },
    large: {
      size: 'l',
      icon: theme.comp.plainButton.iconSize.lg,
      verticalPadding: theme.comp.plainButton.pddng.v.l,
      horizontalPadding: theme.comp.plainButton.pddng.h.l,
      iconPadding: theme.comp.plainButton.pddng.icon.l,
      radius: theme.comp.plainButton.radius.lg,
      gap: theme.comp.plainButton.gap.lg,
    },
  };
};
