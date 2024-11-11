import { cloneElement } from 'react';
import { theme as ChipTheme } from '../@constants';
import { IconProps } from '../@types';

export const Icon = (props: IconProps) => {
  const { size, icon } = props;
  return cloneElement(icon, { size: ChipTheme.size[size].icon, color: icon.props.color || 'currentColor' });
};