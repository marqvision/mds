import { cloneElement } from 'react';
import { useTheme } from '@emotion/react';
import { IconProps } from '../@types';
import { resolveSize } from '../@utils';

export const Icon = (props: IconProps) => {
  const { icon, type } = props;
  const theme = useTheme();
  const isIconButton = type === 'standalone';
  const size = resolveSize(theme, { ...props, isIconButton });

  return cloneElement(icon, { size: icon.props.size || size.icon, color: icon.props.color || 'currentColor' });
};
