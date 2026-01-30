import { ReactNode, ReactElement, MouseEvent, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { BodyWeight } from '../../atoms/Typography/@types';

export type Size = 'x-small' | 'small' | 'medium' | 'large';
export type Color = 'bluegray' | 'bluegray-secondary' | 'blue' | 'white';

export type StyledInlineButtonProps = {
  size: Size;
  color: Color;
  isDisabled?: boolean;
  isClickable: boolean;
  isIconHoverable?: boolean;
};

export type MDSInlineButtonProps = {
  /**
   * 버튼의 사이즈
   * @default 'medium'
   */
  size?: Size;
  /**
   * 버튼의 색상
   * @default 'bluegray'
   */
  color?: Color;
  /**
   * 버튼의 라벨
   */
  children?: ReactNode;
  /**
   * 라벨 좌측 아이콘
   */
  startIcon?: ReactElement;
  /**
   * 라벨 우측 아이콘
   */
  endIcon?: ReactElement;
  /**
   * 호버 시에만 아이콘 표시 (시각적 노이즈 감소)
   */
  isIconHoverable?: boolean;
  /**
   * 비활성화 상태
   */
  isDisabled?: boolean;
  /**
   * 링크 URL (a 태그로 렌더링, :visited 자동 적용)
   */
  href?: string;
  /**
   * 클릭 이벤트
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * 폰트 굵기
   * @default 'regular'
   */
  fontWeight?: BodyWeight;
  /**
   * 말줄임 라인 수
   */
  lineClamp?: number;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'color' | 'disabled'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'color' | 'href'>;
