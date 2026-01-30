import { ReactNode, ReactElement, CSSProperties, MouseEvent } from 'react';

export type PopperVerticalDirection = 'top' | 'bottom';
export type PopperHorizontalDirection = 'left' | 'right';
export type PopperHorizontalAlignment = 'left' | 'center' | 'right';
export type PopperVerticalAlignment = 'top' | 'center' | 'bottom';

export type PopperPosition =
  | `${PopperVerticalDirection}-${PopperHorizontalAlignment}`
  | `${PopperHorizontalDirection}-${PopperVerticalAlignment}`;

export type PopperTrigger = 'hover' | 'click';

export type Coordinates = {
  x: number;
  y: number;
};

export type AnchorRect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

export type PopperSize = {
  width: number;
  height: number;
};

export type BoundaryOverflow = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type ViewportSize = {
  width: number;
  height: number;
};

export type AnchorProps = {
  ref: (node: Element | null) => void;
  onClick: (e: MouseEvent) => void;
  onMouseEnter: (e: MouseEvent) => void;
  onMouseLeave: (e: MouseEvent) => void;
};

export type MDSPopperProps = {
  /**
   * 기준이 되는 anchor 요소
   * @example
   * <MDSPopper content={<Menu />}>
   *   <button>Click me</button>
   * </MDSPopper>
   */
  children: ReactElement;

  /** 팝업 내용 */
  content: ReactNode;

  /**
   * anchor 기준 위치
   * @default 'top-center'
   */
  position?: PopperPosition;

  /**
   * 열리는 트리거
   * @default 'click'
   */
  trigger?: PopperTrigger;

  /**
   * hover 시 content 영역 포함 여부
   * true: content 위에 마우스가 있어도 열림 유지
   * @default true
   */
  interactive?: boolean;

  /**
   * anchor와 content 사이 간격 (px)
   * @default 4
   */
  offset?: number;

  /**
   * Portal z-index
   * @default 999
   */
  zIndex?: number;

  /**
   * 외부에서 제어하는 open 상태 (controlled mode)
   * undefined면 내부 상태로 관리 (uncontrolled mode)
   */
  open?: boolean;

  /** 열림/닫힘 콜백 */
  onVisibleChange?: (visible: boolean) => void;

  /** 닫힐 때 콜백 */
  onClose?: () => void;

  /**
   * 닫힘 애니메이션 딜레이 (ms)
   * @default 300
   */
  closeDelay?: number;

  /**
   * 화면 경계를 벗어나면 자동으로 반대 방향으로 조정
   * @default true
   */
  autoFlip?: boolean;

  /**
   * anchor가 viewport를 벗어나면 자동 닫기
   * @default true
   */
  closeOnAnchorHidden?: boolean;

  /**
   * 외부 클릭 시 닫기 (trigger='click'일 때)
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * ESC 키 입력 시 닫기
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * content 컨테이너 스타일 (position: fixed 적용됨)
   */
  style?: CSSProperties;

  /**
   * content 컨테이너 className
   */
  className?: string;
};
