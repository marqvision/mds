import { BodySize } from '../../atoms/Typography';
import { Size } from './@types';

export const TYPOGRAPHY_SIZE: Record<Size, BodySize> = {
  'x-small': 'xs',
  small: 's',
  medium: 'm',
  large: 'l',
};

export const GAP_SIZE: Record<Size, number> = {
  'x-small': 2,
  small: 2,
  medium: 4,
  large: 4,
};

export const ICON_SIZE: Record<Size, number> = {
  'x-small': 16,
  small: 16,
  medium: 16,
  large: 20,
};
