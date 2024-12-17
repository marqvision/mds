import { MDSThemeColorPath } from '../../foundation';
import { resolveColor } from '../../@system';

const isColorPath = (color: string): color is MDSThemeColorPath => {
  return color.startsWith('color/');
};

export const getColor = (color?: MDSThemeColorPath | string) => {
  if (!color) return '';
  if (isColorPath(color)) return resolveColor(color);
  return color;
};
