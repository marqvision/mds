import { cloneElement } from 'react';
import { useTheme } from '@emotion/react';
import { IconProps } from '../@types';
import { getSize } from '../@utils/styles';

export const Icon = (props: IconProps) => {
  const { size, icon } = props;
  const theme = useTheme();
  const iconSize = getSize(theme)[size].icon;
  
  return cloneElement(icon, { size: icon.props.size || iconSize, color: icon.props.color || 'currentColor' });
};