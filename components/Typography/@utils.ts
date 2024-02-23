import { MDSTheme, MDSThemeValue } from '../../foundation';
import { Features, MDSTypographyProps } from './@types';

export const resolveTagName = (variant: Features['variant'], as: MDSTypographyProps['as']) => {
  if (as) return as;
  switch (variant) {
    case 'T24':
      return 'h1';
    case 'T20':
      return 'h2';
    case 'T18':
    case 'T16':
    case 'T14':
    case 'T13':
    case 'T12':
    default:
      return 'p';
  }
};

export const resolveFontSize = (variant: Features['variant']) => {
  const size = parseInt(variant?.replace('T', '') || '14');
  return `${size}px`;
};
export const resolveFontWeight = (weight: Features['weight']) => {
  switch (weight) {
    case 'bold':
      return 'font-family: "Visuelt-Bold", "Pretendard Variable"; font-weight: 700;';
    case 'medium':
      return 'font-family: "Visuelt-Medium", "Pretendard Variable"; font-weight: 500;';
    case 'regular':
      return 'font-family: "Visuelt-Regular", "Pretendard Variable"; font-weight: 400;';
    case 'light':
      return 'font-family: "Visuelt-Light", "Pretendard Variable"; font-weight: 300;';
    default:
      return 'font-family: "Visuelt-Regular", "Pretendard Variable"; font-weight: 400;';
  }
};
export const resolveLineClamp = (lineClamp: Features['lineClamp']) => {
  if(lineClamp && lineClamp > 0) {
    return `
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
    `
  }
}