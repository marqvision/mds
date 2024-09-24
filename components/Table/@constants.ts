import { RAW_COLORS } from '../../foundation/colors';
import { TableTheme } from './@types';

const token = {
  color: {
    bg: {
      default: {
        normal: RAW_COLORS.white,
        hover: RAW_COLORS.bluegray50,
      },
      secondary: {
        normal: RAW_COLORS.bluegray50,
        hover: RAW_COLORS.bluegray100,
      },
      viewing: {
        normal: RAW_COLORS.blue50,
        hover: RAW_COLORS.blue100,
      },
    },
    border: {
      horizontal: {
        header: RAW_COLORS.bluegray200,
        body: RAW_COLORS.bluegray100,
      },
      vertical: {
        default: RAW_COLORS.bluegray150,
      },
    },
  },
} as const;

export const theme: TableTheme = {
  row: {
    color: {
      default: {
        backgroundColor: {
          normal: token.color.bg.default.normal,
          hover: token.color.bg.default.hover,
        },
      },
      secondary: {
        backgroundColor: {
          normal: token.color.bg.secondary.normal,
          hover: token.color.bg.secondary.hover,
        },
      },
      viewing: {
        backgroundColor: {
          normal: token.color.bg.viewing.normal,
          hover: token.color.bg.viewing.hover,
        },
      },
    },
  },
  cell: {
    color: {
      horizontal: {
        head: {
          borderColor: token.color.border.horizontal.header,
        },
        body: {
          borderColor: token.color.border.horizontal.body,
        },
      },
      vertical: {
        borderColor: token.color.border.horizontal.body,
      },
    },
    size: {
      small: {
        padding: '6.5px 8px',
      },
      medium: {
        padding: '12px',
      },
    },
  },
};