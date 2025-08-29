import { CSSProperties, ReactElement, ReactNode } from 'react';
import { PopoverPosition } from '../Popover/@type';

export type TooltipProps = {
  position?: MDSTooltipPosition;
  children?: ReactElement;
  title: ReactNode;
  size?: 'small' | 'medium';
  width?: number | string;
  style?: CSSProperties;
  /**
   * Whether to dismiss the tooltip when the user leaves the anchor element.
   * @default true
   */
  interactive?: boolean;
};

export type MDSTooltipPosition = PopoverPosition;
