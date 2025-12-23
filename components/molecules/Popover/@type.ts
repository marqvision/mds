import { MouseEvent, MutableRefObject, ReactElement, CSSProperties } from 'react';

type PopoverTrigger = 'click' | 'hover';
export type PopoverPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'left-top'
  | 'left-bottom'
  | 'left-center'
  | 'right-top'
  | 'right-bottom'
  | 'right-center';

export type Coordinates = {
  x: number;
  y: number;
};

type ClickWithDimmedProps = {
  /**
   * @default false
   * @true Popover 이외 영역 스크롤 제한, dim 클릭시 onClose 실행
   * @false Popover 이외 영역 스크롤 가능, Popover 영약 밖 클릭시 onClose 실행
   */
  hasDim: true;
  /**
   * @default z-index: 1300
   */
  zIndex?: never;
  /**
   * @default click
   * @hover hasDim = false 인 경우만 trigger: hover 가능
   */
  trigger?: 'click';
  /**
   * @default true
   * @description interactive 모드인 경우 anchor 영역을 벗어나면 팝업이 닫힘.
   */
  interactive?: never;
  /**
   * @default false
   * @description 팝오버에 화살표를 추가합니다. (현재는 Tooltip 전용)
   */
  withArrow?: never;
};

type NoDimmedProps = {
  hasDim?: false;
  zIndex?: number;
  trigger?: PopoverTrigger;
  interactive?: boolean;
  withArrow?: boolean;
};

export type Props = {
  forwardRef?: MutableRefObject<(EventTarget & Element) | null>;
  anchor: ((handler: { open: (e: MouseEvent) => void; close: () => void }) => ReactElement) | ReactElement;
  /**
   * @default bottom-right
   * @description [anchor로부터의 위치]-[펼쳐지는 방향]
   */
  position?: PopoverPosition;
  isLoading?: boolean;
  /**
   * @default 300ms
   * @description 모달이 열리고 닫히는 시간
   */
  delay?: number;
  /**
   * (onClose) => ReactElement or ReactElement
   */
  children:
    | ((handler: { close: () => void; isOpen: boolean }) => ReactElement | ReactElement[])
    | ReactElement
    | ReactElement[];
  onClose?: () => void;
  onVisibleChange?: (isOpen: boolean) => void;
  blockAutoClose?: boolean;
} & (ClickWithDimmedProps | NoDimmedProps);

export type StyleProps = {
  /**
   * default: 280px
   */
  width?: string | number;
  /**
   * default: 480px
   */
  maxHeight?: string | number;
  /**
   * default: 16px 20px
   */
  padding?: string | number;
  style?: CSSProperties;
  margin?: number;
  /**
   * default: white
   */
  bgColor?: 'white' | 'black';
};
