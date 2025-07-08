import { TagTheme } from './@types';

export const token = {
  pddng: {
    v: {
      xs: '0',
      sm: '0',
      md: '0px',
    },
    h: {
      xs: '3px',
      sm: '3px',
      md: '5px',
    },
  },
  gap: {
    xs: '0',
    sm: '2px',
    md: '4px',
  },
  radius: {
    xs: '8px',
    sm: '4px',
    md: '4px',
  },
  minSize: {
    xs: '16px',
    sm: '18px',
    md: '22px',
  },
  iconSize: {
    xs: 12,
    sm: 12,
    md: 16,
  },
} as const;

export const theme: TagTheme = {
  color: {
    bluegray: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/neutral/strong/normal',
          borderColor: 'color/bg/fill/neutral/strong/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/neutral/strong/hover',
          borderColor: 'color/bg/fill/neutral/strong/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/neutral/strong/disabled',
          borderColor: 'color/bg/fill/neutral/strong/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/neutral/default/normal',
          backgroundColor: 'color/bg/fill/neutral/tint/normal',
          borderColor: 'color/bg/fill/neutral/tint/normal',
        },
        hover: {
          color: 'color/content/neutral/default/hover',
          backgroundColor: 'color/bg/fill/neutral/tint/hover',
          borderColor: 'color/bg/fill/neutral/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/neutral/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/tint/disabled',
          borderColor: 'color/bg/fill/neutral/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/neutral/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/neutral/default/normal',
        },
        hover: {
          color: 'color/content/neutral/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/neutral/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/neutral/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/neutral/default/disabled',
        },
      },
    },
    blue: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/primary/default/normal',
          borderColor: 'color/bg/fill/primary/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/primary/default/hover',
          borderColor: 'color/bg/fill/primary/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/primary/default/disabled',
          borderColor: 'color/bg/fill/primary/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/primary/default/normal',
          backgroundColor: 'color/bg/fill/primary/tint/normal',
          borderColor: 'color/bg/fill/primary/tint/normal',
        },
        hover: {
          color: 'color/content/primary/default/hover',
          backgroundColor: 'color/bg/fill/primary/tint/hover',
          borderColor: 'color/bg/fill/primary/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/primary/default/disabled',
          backgroundColor: 'color/bg/fill/primary/tint/disabled',
          borderColor: 'color/bg/fill/primary/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/primary/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/primary/default/normal',
        },
        hover: {
          color: 'color/content/primary/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/primary/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/primary/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/primary/default/disabled',
        },
      },
    },
    red: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/critical/default/normal',
          borderColor: 'color/bg/fill/critical/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/critical/default/hover',
          borderColor: 'color/bg/fill/critical/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/critical/default/disabled',
          borderColor: 'color/bg/fill/critical/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/critical/default/normal',
          backgroundColor: 'color/bg/fill/critical/tint/normal',
          borderColor: 'color/bg/fill/critical/tint/normal',
        },
        hover: {
          color: 'color/content/critical/default/hover',
          backgroundColor: 'color/bg/fill/critical/tint/hover',
          borderColor: 'color/bg/fill/critical/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/critical/default/disabled',
          backgroundColor: 'color/bg/fill/critical/tint/disabled',
          borderColor: 'color/bg/fill/critical/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/critical/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/critical/default/normal',
        },
        hover: {
          color: 'color/content/critical/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/critical/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/critical/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/critical/default/disabled',
        },
      },
    },
    yellow: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/warning/default/normal',
          borderColor: 'color/bg/fill/warning/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/warning/default/hover',
          borderColor: 'color/bg/fill/warning/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/warning/default/disabled',
          borderColor: 'color/bg/fill/warning/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/warning/default/normal',
          backgroundColor: 'color/bg/fill/warning/tint/normal',
          borderColor: 'color/bg/fill/warning/tint/normal',
        },
        hover: {
          color: 'color/content/warning/default/hover',
          backgroundColor: 'color/bg/fill/warning/tint/hover',
          borderColor: 'color/bg/fill/warning/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/warning/default/disabled',
          backgroundColor: 'color/bg/fill/warning/tint/disabled',
          borderColor: 'color/bg/fill/warning/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/warning/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/warning/default/normal',
        },
        hover: {
          color: 'color/content/warning/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/warning/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/warning/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/warning/default/disabled',
        },
      },
    },
    green: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/success/default/normal',
          borderColor: 'color/bg/fill/success/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/success/default/hover',
          borderColor: 'color/bg/fill/success/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/success/default/disabled',
          borderColor: 'color/bg/fill/success/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/success/default/normal',
          backgroundColor: 'color/bg/fill/success/tint/normal',
          borderColor: 'color/bg/fill/success/tint/normal',
        },
        hover: {
          color: 'color/content/success/default/hover',
          backgroundColor: 'color/bg/fill/success/tint/hover',
          borderColor: 'color/bg/fill/success/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/success/default/disabled',
          backgroundColor: 'color/bg/fill/success/tint/disabled',
          borderColor: 'color/bg/fill/success/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/success/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/success/default/normal',
        },
        hover: {
          color: 'color/content/success/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/success/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/success/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/success/default/disabled',
        },
      },
    },
    teal: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/teal/default/normal',
          borderColor: 'color/bg/fill/teal/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/teal/default/hover',
          borderColor: 'color/bg/fill/teal/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/teal/default/disabled',
          borderColor: 'color/bg/fill/teal/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/teal/default/normal',
          backgroundColor: 'color/bg/fill/teal/tint/normal',
          borderColor: 'color/bg/fill/teal/tint/normal',
        },
        hover: {
          color: 'color/content/teal/default/hover',
          backgroundColor: 'color/bg/fill/teal/tint/hover',
          borderColor: 'color/bg/fill/teal/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/teal/default/disabled',
          backgroundColor: 'color/bg/fill/teal/tint/disabled',
          borderColor: 'color/bg/fill/teal/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/teal/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/border/teal/default/normal',
        },
        hover: {
          color: 'color/content/teal/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/teal/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/teal/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/teal/default/disabled',
        },
      },
    },
    purple: {
      fill: {
        normal: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/purple/default/normal',
          borderColor: 'color/bg/fill/purple/default/normal',
        },
        hover: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/purple/default/hover',
          borderColor: 'color/bg/fill/purple/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/on_default_color',
          backgroundColor: 'color/bg/fill/purple/default/disabled',
          borderColor: 'color/bg/fill/purple/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/purple/default/normal',
          backgroundColor: 'color/bg/fill/purple/tint/normal',
          borderColor: 'color/bg/fill/purple/tint/normal',
        },
        hover: {
          color: 'color/content/purple/default/hover',
          backgroundColor: 'color/bg/fill/purple/tint/hover',
          borderColor: 'color/bg/fill/purple/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/purple/default/disabled',
          backgroundColor: 'color/bg/fill/purple/tint/disabled',
          borderColor: 'color/bg/fill/purple/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/purple/default/normal',
          backgroundColor: 'color/bg/fill/neutral/default/normal',
          borderColor: 'color/content/purple/default/normal',
        },
        hover: {
          color: 'color/content/purple/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/purple/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/purple/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/purple/default/disabled',
        },
      },
    },
    white: {
      fill: {
        normal: {
          color: 'color/content/neutral/default/normal',
          backgroundColor: 'color/bg/fill/inverse/default/normal',
          borderColor: 'color/bg/fill/inverse/default/normal',
        },
        hover: {
          color: 'color/content/neutral/default/normal',
          backgroundColor: 'color/bg/fill/inverse/default/hover',
          borderColor: 'color/bg/fill/inverse/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/neutral/default/normal',
          backgroundColor: 'color/bg/fill/inverse/default/disabled',
          borderColor: 'color/bg/fill/inverse/default/disabled',
        },
      },
      tint: {
        normal: {
          color: 'color/content/inverse/default/normal',
          backgroundColor: 'color/bg/fill/inverse/tint/normal',
          borderColor: 'color/bg/fill/inverse/tint/normal',
        },
        hover: {
          color: 'color/content/inverse/default/hover',
          backgroundColor: 'color/bg/fill/inverse/tint/hover',
          borderColor: 'color/bg/fill/inverse/tint/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/inverse/default/disabled',
          backgroundColor: 'color/bg/fill/inverse/tint/disabled',
          borderColor: 'color/bg/fill/inverse/tint/disabled',
        },
      },
      border: {
        normal: {
          color: 'color/content/inverse/default/normal',
          borderColor: 'color/border/inverse/default/normal',
        },
        hover: {
          color: 'color/content/inverse/default/hover',
          backgroundColor: 'color/bg/fill/inverse/default/hover',
          borderColor: 'color/border/inverse/default/hover',
          clickAreaColor: 'color/border/target/default',
        },
        disabled: {
          color: 'color/content/inverse/default/disabled',
          borderColor: 'color/border/inverse/default/disabled',
        },
      },
    },
    ai: {
      normal: {
        color: 'color/content/inverse/default/normal',
        backgroundColor: 'linear-gradient(97deg, #4F79EC, #A829BD) border-box',
        borderColor: 'transparent',
      },
      hover: {
        color: 'color/content/inverse/default/normal',
        backgroundColor: 'linear-gradient(97deg, #2D5FE9, #9700B0) border-box',
        borderColor: 'transparent',
        clickAreaColor: 'color/border/target/ai',
      },
      disabled: {
        color: 'color/content/inverse/default/normal',
        backgroundColor: 'linear-gradient(97deg, #4F79EC, #A829BD) border-box',
        borderColor: 'transparent',
      },
    },
  },
  size: {
    'x-small': {
      size: 'xs',
      icon: token.iconSize.xs,
      padding: `${token.pddng.v.xs} ${token.pddng.h.xs}`,
      gap: token.gap.xs,
      radius: token.radius.xs,
      minHeight: token.minSize.xs,
      borderWidth: 1.5,
      clickAreaPadding: 0,
      lineHeight: '14px',
    },
    small: {
      size: 'xs',
      icon: token.iconSize.sm,
      padding: `${token.pddng.v.sm} ${token.pddng.h.sm}`,
      gap: token.gap.sm,
      radius: token.radius.sm,
      minHeight: token.minSize.sm,
      borderWidth: 1,
      clickAreaPadding: 4,
      lineHeight: '16px',
    },
    medium: {
      size: 's',
      icon: token.iconSize.md,
      padding: `${token.pddng.v.md} ${token.pddng.h.md}`,
      gap: token.gap.md,
      radius: token.radius.md,
      minHeight: token.minSize.md,
      borderWidth: 1,
      clickAreaPadding: 4,
      lineHeight: '20px',
    },
  },
};
