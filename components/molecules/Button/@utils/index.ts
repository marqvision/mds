import { MDSTheme } from '../../../../types';
import { ResolvedColor, StyledButtonProps } from '../@types';
import { getColorSet, getSize } from './styleSet';

export const resolveColor = (
  theme: MDSTheme,
  {
    color,
    variant,
    isDisabled,
    isClickable,
    isCompleted,
  }: Pick<StyledButtonProps, 'color' | 'variant' | 'isDisabled' | 'isClickable' | 'isCompleted'>
): {
  content: ResolvedColor;
  background: ResolvedColor;
  border: ResolvedColor;
} => {
  const colorSet = getColorSet(theme)[color][variant];

  const content: Partial<ResolvedColor> = {
    normal: colorSet.normal.color,
    hover: colorSet.normal.color,
  };
  const background: Partial<ResolvedColor> = {
    normal: colorSet.normal.backgroundColor,
    hover: colorSet.normal.backgroundColor,
  };
  const border: Partial<ResolvedColor> = {
    normal: colorSet.normal.borderColor,
    hover: colorSet.normal.borderColor,
  };

  if (isClickable) {
    content.hover = colorSet.hover.color;
    background.hover = colorSet.hover.backgroundColor;
    border.hover = colorSet.hover.borderColor;
  }
  if (isDisabled) {
    content.normal = colorSet.disabled.color;
    content.hover = colorSet.disabled.color;
    background.normal = colorSet.disabled.backgroundColor;
    background.hover = colorSet.disabled.backgroundColor;
    border.normal = colorSet.disabled.borderColor;
    border.hover = colorSet.disabled.borderColor;
  }
  if (isCompleted) {
    content.normal = colorSet.completed?.color;
    content.hover = colorSet.completed?.color;
    background.normal = colorSet.completed?.backgroundColor;
    background.hover = colorSet.completed?.backgroundColor;
    border.normal = colorSet.completed?.borderColor;
    border.hover = colorSet.completed?.borderColor;
  }

  return {
    content: {
      normal: content.normal || 'inherit',
      hover: content.hover || 'inherit',
    },
    background: {
      normal: background.normal || 'transparent',
      hover: background.hover || 'transparent',
    },
    border: {
      normal: border.normal || 'transparent',
      hover: border.hover || 'transparent',
    },
  };
};

export const resolveBorderRadius = (theme: MDSTheme, { size, flat }: StyledButtonProps) => {
  const radius = getSize(theme)[size].radius;

  const isFlatLeft = flat === 'left' || flat === 'both';
  const isFlatRight = flat === 'right' || flat === 'both';

  const left = isFlatLeft ? '0' : radius;
  const right = isFlatRight ? '0' : radius;

  return `${left} ${right} ${right} ${left}`;
};

export const resolveFlatStyles = (theme: MDSTheme, { size, flat }: StyledButtonProps) => {
  const buttonSpacing = getSize(theme)[size].flatPadding;
  const paddingLeft = flat === 'left' || flat === 'both' ? buttonSpacing : undefined;
  const paddingRight = flat === 'right' || flat === 'both' ? buttonSpacing : undefined;
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
