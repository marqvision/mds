import { theme as ChipTheme } from './@constants';
import { Size, Flat } from './@types';

export const getBorderRadius = (size: Size, flat?: Flat) => {
  const radius = ChipTheme.size[size].radius;

  const isFlatLeft = flat === 'left' || flat === 'both';
  const isFlatRight = flat === 'right' || flat === 'both';

  const left = isFlatLeft ? '0' : radius;
  const right = isFlatRight ? '0' : radius;

  return `${left} ${right} ${right} ${left}`;
};