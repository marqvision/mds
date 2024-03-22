import { Path } from '../../@system/types';
import type { MDSTheme } from '../../foundation';

export type Features = {
  /**
   * 아이콘의 크기.
   * 아이콘은 정사각형이므로 width와 height가 동일합니다.
   */
  size?: number;
  color?: Path<Pick<MDSTheme, 'color'>>;
  /**
   * 아이콘의 스타일 종류.
   * 일부 아이콘은 해당 속성을 지원하지 않습니다.
   */
  variant?: 'outline' | 'border' | 'fill';
};
