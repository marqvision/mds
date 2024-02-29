import { Path } from '../../@system/types';
import type { MDSTheme } from '../../foundation';

export type MDSIconProps = {
  size: number;
  color?: Path<MDSTheme['color']>;
};
