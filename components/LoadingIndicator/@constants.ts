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
    backgroundColor: token.circle.unfilled,
  },
};

export const DEFAULT_SIZE = {
  DETERMINATE: {
    SIZE: 46,
    STROKEWIDTH: 4,
  },
  INDETERMINATE: {
    SIZE: 16,
    STROKEWIDTH: 3,
  },
};