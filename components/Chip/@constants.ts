import { ChipTheme } from './@types';

export const token = {
  pddng: {
    v: {
      sm: '2px',
      md: '4.5px',
      lg: '6px',
      xl: '6px',
    },
    h: {
      sm: '7px',
      md: '11px',
      lg: '13px',
      xl: '15px',
    },
  },
  gap: {
    sm: '2px',
    md: '4px',
    lg: '4px',
    xl: '8px',
    'sm-both': '8px',
    'md-both': '12px',
    'lg-both': '14px',
    'xl-both': '16px',
  },
  radius: {
    sm: '8px',
    md: '8px',
    lg: '8px',
    xl: '8px',
  },
  minSize: {
    sm: '26px',
    md: '32px',
    lg: '38px',
    xl: '44px',
  },
  iconSize: {
    sm: 16,
    md: 16,
    lg: 20,
    xl: 24,
  },
} as const;

export const theme: ChipTheme = {
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
        },
        disabled: {
          color: 'color/content/neutral/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/tint/disabled',
          borderColor: 'color/bg/fill/neutral/tint/disabled',
        },
        completed: {
          color: 'color/content/neutral/default/completed',
          backgroundColor: 'color/bg/fill/neutral/strong/completed',
          borderColor: 'color/bg/fill/neutral/strong/completed',
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
        },
        disabled: {
          color: 'color/content/neutral/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/neutral/default/disabled',
        },
        completed: {
          color: 'color/content/neutral/default/completed',
          backgroundColor: 'color/bg/fill/neutral/default/completed',
          borderColor: 'color/border/neutral/default/completed',
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
          borderColor: 'color/border/primary/weak/normal',
        },
        hover: {
          color: 'color/content/primary/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/primary/weak/hover',
        },
        disabled: {
          color: 'color/content/primary/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/primary/weak/disabled',
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
          borderColor: 'color/border/critical/weak/normal',
        },
        hover: {
          color: 'color/content/critical/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/critical/weak/hover',
        },
        disabled: {
          color: 'color/content/critical/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/critical/weak/disabled',
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
          borderColor: 'color/border/warning/weak/normal',
        },
        hover: {
          color: 'color/content/warning/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/warning/weak/hover',
        },
        disabled: {
          color: 'color/content/warning/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/warning/weak/disabled',
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
          borderColor: 'color/border/success/weak/normal',
        },
        hover: {
          color: 'color/content/success/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/success/weak/hover',
        },
        disabled: {
          color: 'color/content/success/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/success/weak/disabled',
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
          borderColor: 'color/border/teal/weak/normal',
        },
        hover: {
          color: 'color/content/teal/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/teal/weak/hover',
        },
        disabled: {
          color: 'color/content/teal/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/teal/weak/disabled',
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
          borderColor: 'color/border/purple/weak/normal',
        },
        hover: {
          color: 'color/content/purple/default/hover',
          backgroundColor: 'color/bg/fill/neutral/default/hover',
          borderColor: 'color/border/purple/weak/hover',
        },
        disabled: {
          color: 'color/content/purple/default/disabled',
          backgroundColor: 'color/bg/fill/neutral/default/disabled',
          borderColor: 'color/border/purple/weak/disabled',
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
          backgroundColor: 'color/bg/fill/inverse/borderbutton/hover',
          borderColor: 'color/border/inverse/default/hover',
        },
        disabled: {
          color: 'color/content/inverse/default/disabled',
          borderColor: 'color/border/inverse/default/disabled',
        },
      },
    },
  },
  size: {
    small: {
      label: 'T13',
      icon: token.iconSize.sm,
      padding: `${token.pddng.v.sm} ${token.pddng.h.sm}`,
      gap: token.gap.sm,
      flatPadding: token.gap['sm-both'],
      radius: token.radius.sm,
      minHeight: token.minSize.sm,
      spinnerSize: 16,
    },
    medium: {
      label: 'T14',
      icon: token.iconSize.md,
      padding: `${token.pddng.v.md} ${token.pddng.h.md}`,
      gap: token.gap.md,
      flatPadding: token.gap['md-both'],
      radius: token.radius.md,
      minHeight: token.minSize.md,
      spinnerSize: 16,
    },
    large: {
      label: 'T16',
      icon: token.iconSize.lg,
      padding: `${token.pddng.v.lg} ${token.pddng.h.lg}`,
      gap: token.gap.lg,
      flatPadding: token.gap['lg-both'],
      radius: token.radius.lg,
      minHeight: token.minSize.lg,
      spinnerSize: 20,
    },
    'extra-large': {
      label: 'T20',
      icon: token.iconSize.xl,
      padding: `${token.pddng.v.xl} ${token.pddng.h.xl}`,
      gap: token.gap.xl,
      flatPadding: token.gap['xl-both'],
      radius: token.radius.xl,
      minHeight: token.minSize.xl,
      spinnerSize: 24,
    },
  },
};
