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

type ClickPropsDimmed = {
  /**
   * @default false
   * @true Popover 이외 영역 스크롤 제한, dim 클릭시 onClose 실행
   * @false Popover 이외 영역 스크롤 가능, Popover 영약 밖 클릭시 onClose 실행
   */
  hasDim: true;
  zIndex?: never;
  /**
   * @default click
   * @hover hasDim = false 인 경우만 trigger: hover 가능
   */
  trigger?: 'click';
};

type ClickPropsNoDimmed = {
  hasDim?: false;
  /**
   * @default z-index: 1300
   */
  zIndex?: number;
  trigger?: PopoverTrigger;
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
} & (ClickPropsDimmed | ClickPropsNoDimmed);

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
};
