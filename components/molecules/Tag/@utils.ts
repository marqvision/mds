import { MDSThemeColorPath } from '../../../types';
import { resolveColor } from '../../../utils/resolvers';

const isColorPath = (color: string): color is MDSThemeColorPath => {
  return color.startsWith('color/');
};

export const getColor = (color?: MDSThemeColorPath | string) => {
  if (!color) return '';
  if (isColorPath(color)) return resolveColor(color);
  return color;
};
