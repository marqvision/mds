import { MDSTheme } from '../../../types';
import { MDSTypographyProps } from '../../atoms/Typography';
import { Color, Size } from './@types';

export const TOKEN_NAME = {
  bluegray: 'neutral',
  blue: 'primary',
  red: 'critical',
  yellow: 'warning',
  green: 'success',
  white: 'inverse',
} satisfies Record<Color, keyof MDSTheme['color']['content']>;

// TODO-@morgan: 디자인팀과 상의해서 한 종류로 통일하면 좋겠음
export const SIZE_ABBREVIATIONS = {
  small: {
    oneLetter: 's',
    twoLetters: 'sm',
  },
  medium: {
    oneLetter: 'm',
    twoLetters: 'md',
  },
  large: {
    oneLetter: 'l',
    twoLetters: 'lg',
  },
} as const;

export const TYPOGRAPHY_SIZE = {
  small: 's',
  medium: 'm',
  large: 'l',
} satisfies Record<Size, MDSTypographyProps['size']>;