import { MDSTheme } from '../../../../types';
import { StyledButtonProps } from '../@types';
import { getSize } from './styles';

export const getBorderRadius = (theme: MDSTheme, { size, flat }: StyledButtonProps) => {
  const radius = getSize(theme)[size].radius;

  const isFlatLeft = flat === 'left' || flat === 'both';
  const isFlatRight = flat === 'right' || flat === 'both';

  const left = isFlatLeft ? '0' : radius;
  const right = isFlatRight ? '0' : radius;

  return `${left} ${right} ${right} ${left}`;
};

export const resolveFlatStyles = (theme: MDSTheme, { size, flat }: StyledButtonProps) => {
  const chipSpacing = getSize(theme)[size].flatPadding;
  const paddingLeft = flat === 'left' || flat === 'both' ? chipSpacing : undefined;
  const paddingRight = flat === 'right' || flat === 'both' ? chipSpacing : undefined;
  const borderLeft = flat === 'left' || flat === 'both' ? 'none' : undefined;
  const borderRight = flat === 'right' || flat === 'both' ? 'none' : undefined;
  const marginRight = flat === 'right' || flat === 'both' ? '1px' : undefined;

  return {
    paddingLeft,
    paddingRight,
    borderLeft,
    borderRight,
    marginRight,
  };
};
