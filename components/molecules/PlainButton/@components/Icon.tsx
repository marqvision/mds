import { cloneElement } from 'react';
import { useTheme } from '@emotion/react';
import { IconProps } from '../@types';
import { getSize } from '../@utils';

export const Icon = (props: IconProps) => {
  const { icon, type } = props;
  const theme = useTheme();
  const size = getSize(theme)[props.size];
  const iconSize = type === 'icon' ? size.singleIconSize : size.coupleIconSize;
  
  return cloneElement(icon, { size: icon.props.size || iconSize, color: icon.props.color || 'currentColor' });
};