import { RAW_COLORS } from '../../../foundation/colors';
import { Theme } from './@types';

const token = {
  color: {
    default: RAW_COLORS.blackAlpha50,
    strong: RAW_COLORS.blackAlpha80,
  },
};

export const theme: Theme = {
  color: {
    default: {
      backgroundColor: token.color.default,
    },
    strong: {
      backgroundColor: token.color.strong,
    },
  },
};
