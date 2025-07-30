import { CSSProperties, ReactElement, ReactNode } from 'react';
import { PopoverPosition } from '../Popover/@type';

export type TooltipProps = {
  position?: MDSTooltipPosition;
  children?: ReactElement;
  title: ReactNode;
  size?: 'small' | 'medium';
  width?: number | string;
  style?: CSSProperties;
  anchorStyle?: CSSProperties;
  popoverDelay?: number;
};

export type MDSTooltipPosition = PopoverPosition;
