import { ReactNode, CSSProperties } from 'react';

export type MDSHoverActionToolbarProps = {
  /** 액션 목록 (MDSTooltip으로 감싼 아이콘 버튼) */
  actions: ReactNode[];
  /** 커스텀 className */
  className?: string;
  /** 커스텀 style */
  style?: CSSProperties;
};
