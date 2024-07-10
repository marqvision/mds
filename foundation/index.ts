import { Path } from '../@system';
import { RAW_COLORS, COLOR_TOKENS } from './colors';

export const MDSThemeValue = {
  color: COLOR_TOKENS,
  _raw_color: RAW_COLORS,
};

export type MDSTheme = typeof MDSThemeValue;
export type MDSThemeColorPath = Path<Pick<MDSTheme, 'color'>>;

export { MDSResetCSS } from './resetCSS';
