import { COLOR_TOKENS, RAW_COLORS } from '../colors';

export const CHART_THEME = {
  heatmap: {
    color: {
      bg: {
        header: COLOR_TOKENS.bg.surface.neutral.secondary.normal,
        body: {
          level: {
            1: RAW_COLORS.orange400,
            2: RAW_COLORS.yellow300,
            3: RAW_COLORS.yellow200,
            4: RAW_COLORS.green200,
            5: RAW_COLORS.green300,
            6: RAW_COLORS.green400,
          },
          neutral: {
            default: COLOR_TOKENS.bg.surface.neutral.default.normal,
            hover: RAW_COLORS.blackAlpha10,
          },
        },
      },
      border: {
        vertical: {
          default: RAW_COLORS.bluegray150,
        },
        horizontal: {
          header: RAW_COLORS.bluegray150,
          body: RAW_COLORS.bluegray100,
        },
      },
      content: {
        header: COLOR_TOKENS.content.neutral.secondary.normal,
        body: COLOR_TOKENS.content.neutral.default.normal,
      },
    },
  },
};