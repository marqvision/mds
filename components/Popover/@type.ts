import { MouseEvent, ReactElement } from 'react';

type PopoverTrigger = 'click' | 'hover';
type PopoverPosition =
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

type ClickProps = {
  /**
   * @default true
   * @true Popover 이외 영역 스크롤 제한, dim 클릭시 onClose 실행
   * @false Popover 이외 영역 스크롤 가능, Popover 영약 밖 클릭시 onClose 실행
   */
  hasDim?: true;
  /**
   * @default click
   * @hover hasDim = false 인 경우만 trigger: hover 가능
   */
  trigger?: 'click';
};

type HoverProps = {
  hasDim: false;
  trigger?: PopoverTrigger;
};

export type Props = {
  anchor: ((handler: { open: (e: MouseEvent) => void; close: () => void }) => ReactElement) | ReactElement;
  /**
   * @default bottom-right
   * @description [anchor로부터의 위치]-[펼쳐지는 방향]
   */
  position?: PopoverPosition;
  /**
   * (onClose) => ReactElement or ReactElement
   */ 
  isLoading?: boolean;
  /**
   * @default 300ms
   * @description 모달이 열리고 닫히는 시간
   */
  delay?: number;
  children: ((handler: { close: () => void }) => ReactElement | ReactElement[]) | ReactElement | ReactElement[];
  onClose?: () => void;
} & (ClickProps | HoverProps);

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
};
