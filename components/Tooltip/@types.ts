import { CSSProperties, ReactElement, ReactNode } from 'react';
import { PopoverPosition } from '../Popover/@type';

export type MDSTooltipProps = {
  position?: MDSTooltipPosition;
  children?: ReactElement;
  title: ReactNode;
  size?: 'small' | 'medium';
  width?: number | string;
  style?: CSSProperties;
  anchorStyle?: CSSProperties;
};

export type MDSTooltipPosition = PopoverPosition;
