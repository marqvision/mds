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
      header: RAW_COLORS.bluegray50,
    },
    border: {
      horizontal: {
        header: {
          default: RAW_COLORS.bluegray200,
          newHeader: RAW_COLORS.bluegray150,
        },
        body: RAW_COLORS.bluegray100,
      },
      vertical: {
        default: RAW_COLORS.bluegray150,
      },
    },
  },
} as const;

export const theme: TableTheme = {
  head: {
    color: {
      newHeader: {
        backgroundColor: token.color.bg.header,
        borderColor: token.color.border.horizontal.header.newHeader,
      },
    },
  },
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
          borderColor: token.color.border.horizontal.header.default,
        },
        body: {
          borderColor: token.color.border.horizontal.body,
        },
      },
      vertical: {
        borderColor: token.color.border.vertical.default,
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
