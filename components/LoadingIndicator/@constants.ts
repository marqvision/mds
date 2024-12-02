import { RAW_COLORS } from '../../foundation/colors';
import { Theme } from './@types';

const token = {
  circle: {
    default: RAW_COLORS.blackAlpha80,
    indicator: RAW_COLORS.blue700,
    unfilled: RAW_COLORS.blackAlpha10,
  },
} as const;

export const theme: Theme = {
  color: {
    default: token.circle.default,
    indicator: token.circle.indicator,
    inherit: 'inherit',
    backgroundColor: token.circle.unfilled,
  },
};

export const DEFAULT_SIZE = {
  determinate: {
    size: 46,
    strokeWidth: 4,
    padding: 1,
  },
  indeterminate: {
    size: 16,
    strokeWidth: 2,
    padding: 1.5,
  },
};
