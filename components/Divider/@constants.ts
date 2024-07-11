import { RAW_COLORS } from '../../foundation/colors';
import { Theme } from './@types';

const token = {
  color: {
    default: RAW_COLORS.bluegray150,
    weak: RAW_COLORS.bluegray100,
    strong: RAW_COLORS.bluegray200,
    circle: RAW_COLORS.bluegray400,
  },
};

export const theme: Theme = {
  color: {
    line: {
      default: token.color.default,
      weak: token.color.weak,
      strong: token.color.strong,
    },
    dot: {
      default: token.color.circle,
    },
  },
};
