import { RAW_COLORS } from '../../foundation/colors';

export const theme = {
  color: {
    bg: {
      normal: RAW_COLORS.white,
      disabled: RAW_COLORS.bluegray100,
    },
    border: {
      normal: RAW_COLORS.bluegray200,
      active: RAW_COLORS.blue700,
      error: RAW_COLORS.red600,
      hover: RAW_COLORS.bluegray300,
      disabled: RAW_COLORS.bluegray200,
      'focus-effect': RAW_COLORS.blue200,
      'error-focus-effect': RAW_COLORS.red100,
    },
    button: {
      normal: RAW_COLORS.blue700,
      disabled: RAW_COLORS.blue300,
      error: RAW_COLORS.red600,
      'error-disabled': RAW_COLORS.red300,
    },
  },
  size: {
    small: {
      height: '26px',
      maxWidth: '200px',
      fontSize: '13px',
      buttonFontSize: '13px',
      padding: '7px',
      gap: '4px',
      buttonPadding: '8px',
    },
    medium: {
      height: '32px',
      maxWidth: '280px',
      fontSize: '14px',
      buttonFontSize: '14px',
      padding: '11px',
      gap: '4px',
      buttonPadding: '12px',
    },
    large: {
      height: '38px',
      maxWidth: '286px',
      fontSize: '16px',
      buttonFontSize: '16px',
      padding: '13px',
      gap: '8px',
      buttonPadding: '14px',
    },
    'extra-large': {
      height: '48px',
      maxWidth: '329px',
      fontSize: '20px',
      buttonFontSize: '16px',
      padding: '15px',
      gap: '8px',
      buttonPadding: '14px',
    },
  },
  transitionTiming: '225ms',
};
