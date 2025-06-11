import { CSSProperties, ReactNode } from 'react';

/**
 * @prop width
 * - `isDimmed true` default: 540px
 * - `isDimmed false` default: 50%
 * */

export type PanelDirection = 'top' | 'left' | 'bottom' | 'right';

export type MDSPanelProps = {
  width?: number | string;
  isOpen: boolean;
  direction?: PanelDirection;
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
} & (DimmedPanelProps | UnDimmedPanelProps);

export type MDSPanelHeaderProps = {
  children: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
};

export type MDSPanelBodyProps = {
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
};

export type MDSPanelActionProps = {
  justifyContent?: 'space-between' | 'flex-end';
  /* body 스크롤에 따라 감춰지는 shadow를 항상 보이도록 */
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
};

type DimmedPanelProps = {
  isDimmed?: true;
  onClose?: () => void;
};

type UnDimmedPanelProps = {
  isDimmed: false;
  onClose?: never;
};
