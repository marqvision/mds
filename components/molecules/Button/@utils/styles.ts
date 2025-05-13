import { MDSTheme } from '../../../../types';
import { BodySize } from '../../../atoms/Typography';
import { Color, ColorTheme, Size, Status, Variant } from '../@types';

export const getColor = (theme: MDSTheme): Record<Color, Record<Variant, Record<Status, ColorTheme> & Partial<{ completed: ColorTheme }>>> => {
  return {
    bluegray: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.neutral.strong.normal,
          borderColor: theme.color.bg.fill.neutral.strong.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.neutral.strong.hover,
          borderColor: theme.color.bg.fill.neutral.strong.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.neutral.strong.disabled,
          borderColor: theme.color.bg.fill.neutral.strong.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.neutral.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.tint.normal,
          borderColor: theme.color.bg.fill.neutral.tint.normal,
        },
        hover: {
          color: theme.color.content.neutral.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.tint.hover,
          borderColor: theme.color.bg.fill.neutral.tint.hover,
        },
        disabled: {
          color: theme.color.content.neutral.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.tint.disabled,
          borderColor: theme.color.bg.fill.neutral.tint.disabled,
        },
        completed: {
          color: theme.color.content.neutral.default.completed,
          backgroundColor: theme.color.bg.fill.neutral.strong.completed,
          borderColor: theme.color.bg.fill.neutral.strong.completed,
        },
      },
      border: {
        normal: {
          color: theme.color.content.neutral.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.neutral.default.normal,
        },
        hover: {
          color: theme.color.content.neutral.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.neutral.default.hover,
        },
        disabled: {
          color: theme.color.content.neutral.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.neutral.default.disabled,
        },
        completed: {
          color: theme.color.content.neutral.default.completed,
          backgroundColor: theme.color.bg.fill.neutral.default.completed,
          borderColor: theme.color.border.neutral.default.completed,
        },
      },
    },
    blue: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.primary.default.normal,
          borderColor: theme.color.bg.fill.primary.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.primary.default.hover,
          borderColor: theme.color.bg.fill.primary.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.primary.default.disabled,
          borderColor: theme.color.bg.fill.primary.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.primary.default.normal,
          backgroundColor: theme.color.bg.fill.primary.tint.normal,
          borderColor: theme.color.bg.fill.primary.tint.normal,
        },
        hover: {
          color: theme.color.content.primary.default.hover,
          backgroundColor: theme.color.bg.fill.primary.tint.hover,
          borderColor: theme.color.bg.fill.primary.tint.hover,
        },
        disabled: {
          color: theme.color.content.primary.default.disabled,
          backgroundColor: theme.color.bg.fill.primary.tint.disabled,
          borderColor: theme.color.bg.fill.primary.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.primary.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.primary.weak.normal,
        },
        hover: {
          color: theme.color.content.primary.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.primary.weak.hover,
        },
        disabled: {
          color: theme.color.content.primary.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.primary.weak.disabled,
        },
      },
    },
    red: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.critical.default.normal,
          borderColor: theme.color.bg.fill.critical.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.critical.default.hover,
          borderColor: theme.color.bg.fill.critical.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.critical.default.disabled,
          borderColor: theme.color.bg.fill.critical.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.critical.default.normal,
          backgroundColor: theme.color.bg.fill.critical.tint.normal,
          borderColor: theme.color.bg.fill.critical.tint.normal,
        },
        hover: {
          color: theme.color.content.critical.default.hover,
          backgroundColor: theme.color.bg.fill.critical.tint.hover,
          borderColor: theme.color.bg.fill.critical.tint.hover,
        },
        disabled: {
          color: theme.color.content.critical.default.disabled,
          backgroundColor: theme.color.bg.fill.critical.tint.disabled,
          borderColor: theme.color.bg.fill.critical.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.critical.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.critical.weak.normal,
        },
        hover: {
          color: theme.color.content.critical.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.critical.weak.hover,
        },
        disabled: {
          color: theme.color.content.critical.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.critical.weak.disabled,
        },
      },
    },
    yellow: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.warning.default.normal,
          borderColor: theme.color.bg.fill.warning.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.warning.default.hover,
          borderColor: theme.color.bg.fill.warning.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.warning.default.disabled,
          borderColor: theme.color.bg.fill.warning.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.warning.default.normal,
          backgroundColor: theme.color.bg.fill.warning.tint.normal,
          borderColor: theme.color.bg.fill.warning.tint.normal,
        },
        hover: {
          color: theme.color.content.warning.default.hover,
          backgroundColor: theme.color.bg.fill.warning.tint.hover,
          borderColor: theme.color.bg.fill.warning.tint.hover,
        },
        disabled: {
          color: theme.color.content.warning.default.disabled,
          backgroundColor: theme.color.bg.fill.warning.tint.disabled,
          borderColor: theme.color.bg.fill.warning.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.warning.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.warning.weak.normal,
        },
        hover: {
          color: theme.color.content.warning.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.warning.weak.hover,
        },
        disabled: {
          color: theme.color.content.warning.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.warning.weak.disabled,
        },
      },
    },
    green: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.success.default.normal,
          borderColor: theme.color.bg.fill.success.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.success.default.hover,
          borderColor: theme.color.bg.fill.success.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.success.default.disabled,
          borderColor: theme.color.bg.fill.success.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.success.default.normal,
          backgroundColor: theme.color.bg.fill.success.tint.normal,
          borderColor: theme.color.bg.fill.success.tint.normal,
        },
        hover: {
          color: theme.color.content.success.default.hover,
          backgroundColor: theme.color.bg.fill.success.tint.hover,
          borderColor: theme.color.bg.fill.success.tint.hover,
        },
        disabled: {
          color: theme.color.content.success.default.disabled,
          backgroundColor: theme.color.bg.fill.success.tint.disabled,
          borderColor: theme.color.bg.fill.success.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.success.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.success.weak.normal,
        },
        hover: {
          color: theme.color.content.success.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.success.weak.hover,
        },
        disabled: {
          color: theme.color.content.success.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.success.weak.disabled,
        },
      },
    },
    teal: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.teal.default.normal,
          borderColor: theme.color.bg.fill.teal.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.teal.default.hover,
          borderColor: theme.color.bg.fill.teal.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.teal.default.disabled,
          borderColor: theme.color.bg.fill.teal.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.teal.default.normal,
          backgroundColor: theme.color.bg.fill.teal.tint.normal,
          borderColor: theme.color.bg.fill.teal.tint.normal,
        },
        hover: {
          color: theme.color.content.teal.default.hover,
          backgroundColor: theme.color.bg.fill.teal.tint.hover,
          borderColor: theme.color.bg.fill.teal.tint.hover,
        },
        disabled: {
          color: theme.color.content.teal.default.disabled,
          backgroundColor: theme.color.bg.fill.teal.tint.disabled,
          borderColor: theme.color.bg.fill.teal.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.teal.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.teal.weak.normal,
        },
        hover: {
          color: theme.color.content.teal.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.teal.weak.hover,
        },
        disabled: {
          color: theme.color.content.teal.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.teal.weak.disabled,
        },
      },
    },
    purple: {
      fill: {
        normal: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.purple.default.normal,
          borderColor: theme.color.bg.fill.purple.default.normal,
        },
        hover: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.purple.default.hover,
          borderColor: theme.color.bg.fill.purple.default.hover,
        },
        disabled: {
          color: theme.color.content.on_default_color,
          backgroundColor: theme.color.bg.fill.purple.default.disabled,
          borderColor: theme.color.bg.fill.purple.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.purple.default.normal,
          backgroundColor: theme.color.bg.fill.purple.tint.normal,
          borderColor: theme.color.bg.fill.purple.tint.normal,
        },
        hover: {
          color: theme.color.content.purple.default.hover,
          backgroundColor: theme.color.bg.fill.purple.tint.hover,
          borderColor: theme.color.bg.fill.purple.tint.hover,
        },
        disabled: {
          color: theme.color.content.purple.default.disabled,
          backgroundColor: theme.color.bg.fill.purple.tint.disabled,
          borderColor: theme.color.bg.fill.purple.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.purple.default.normal,
          backgroundColor: theme.color.bg.fill.neutral.default.normal,
          borderColor: theme.color.border.purple.weak.normal,
        },
        hover: {
          color: theme.color.content.purple.default.hover,
          backgroundColor: theme.color.bg.fill.neutral.default.hover,
          borderColor: theme.color.border.purple.weak.hover,
        },
        disabled: {
          color: theme.color.content.purple.default.disabled,
          backgroundColor: theme.color.bg.fill.neutral.default.disabled,
          borderColor: theme.color.border.purple.weak.disabled,
        },
      },
    },
    white: {
      fill: {
        normal: {
          color: theme.color.content.neutral.default.normal,
          backgroundColor: theme.color.bg.fill.inverse.default.normal,
          borderColor: theme.color.bg.fill.inverse.default.normal,
        },
        hover: {
          color: theme.color.content.neutral.default.normal,
          backgroundColor: theme.color.bg.fill.inverse.default.hover,
          borderColor: theme.color.bg.fill.inverse.default.hover,
        },
        disabled: {
          color: theme.color.content.neutral.default.normal,
          backgroundColor: theme.color.bg.fill.inverse.default.disabled,
          borderColor: theme.color.bg.fill.inverse.default.disabled,
        },
      },
      tint: {
        normal: {
          color: theme.color.content.inverse.default.normal,
          backgroundColor: theme.color.bg.fill.inverse.tint.normal,
          borderColor: theme.color.bg.fill.inverse.tint.normal,
        },
        hover: {
          color: theme.color.content.inverse.default.hover,
          backgroundColor: theme.color.bg.fill.inverse.tint.hover,
          borderColor: theme.color.bg.fill.inverse.tint.hover,
        },
        disabled: {
          color: theme.color.content.inverse.default.disabled,
          backgroundColor: theme.color.bg.fill.inverse.tint.disabled,
          borderColor: theme.color.bg.fill.inverse.tint.disabled,
        },
      },
      border: {
        normal: {
          color: theme.color.content.inverse.default.normal,
          borderColor: theme.color.border.inverse.default.normal,
        },
        hover: {
          color: theme.color.content.inverse.default.hover,
          backgroundColor: theme.color.bg.fill.inverse.borderbutton.hover,
          borderColor: theme.color.border.inverse.default.hover,
        },
        disabled: {
          color: theme.color.content.inverse.default.disabled,
          borderColor: theme.color.border.inverse.default.disabled,
        },
      },
    },
  };
};

export const getSize = (theme: MDSTheme): Record<
  Size,
  {
    size?: BodySize;
    icon: number;
    padding?: string;
    iconPadding: string;
    gap?: string;
    flatPadding?: string;
    radius: string;
    minHeight: string;
    spinnerSize: number;
  }
> => {
  return {
    small: {
      size: 's',
      icon: theme.comp.button.iconSize.sm,
      padding: `${theme.comp.button.pddng.v.sm} ${theme.comp.button.pddng.h.sm}`,
      iconPadding: `${theme.comp.button.pddng.v.sm} ${theme.comp.button.pddng.h.icon.s}`,
      gap: theme.comp.button.gap.sm,
      flatPadding: theme.comp.button.gap['sm-both'],
      radius: theme.comp.button.radius.sm,
      minHeight: theme.comp.button.minSize.sm,
      spinnerSize: 16,
    },
    medium: {
      size: 'm',
      icon: theme.comp.button.iconSize.md,
      padding: `${theme.comp.button.pddng.v.md} ${theme.comp.button.pddng.h.md}`,
      iconPadding: `${theme.comp.button.pddng.v.sm} ${theme.comp.button.pddng.h.icon.m}`,
      gap: theme.comp.button.gap.md,
      flatPadding: theme.comp.button.gap['md-both'],
      radius: theme.comp.button.radius.md,
      minHeight: theme.comp.button.minSize.md,
      spinnerSize: 16,
    },
    large: {
      size: 'l',
      icon: theme.comp.button.iconSize.lg,
      padding: `${theme.comp.button.pddng.v.lg} ${theme.comp.button.pddng.h.lg}`,
      iconPadding: `${theme.comp.button.pddng.v.sm} ${theme.comp.button.pddng.h.icon.l}`,
      gap: theme.comp.button.gap.lg,
      flatPadding: theme.comp.button.gap['lg-both'],
      radius: theme.comp.button.radius.lg,
      minHeight: theme.comp.button.minSize.lg,
      spinnerSize: 20,
    },
    'x-large': {
      icon: theme.comp.button.iconSize.xl,
      iconPadding: `${theme.comp.button.pddng.v.sm} ${theme.comp.button.pddng.h.icon.xl}`,
      radius: theme.comp.button.radius.xl,
      minHeight: theme.comp.button.minSize.xl,
      spinnerSize: 24,
    },
  };
};
