import { Path } from '../../@system/types';
import type { MDSTheme } from '../../foundation';




export type Features<IconName = ''> = {
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
  variant: IconName extends 'ChartCirclePie'
    ? 'outline3_1' | 'outline2_1_1' | 'fill_2_1_1'
    : IconName extends 'EyesVisibility'
    ? 'on' | 'off'
    : IconName extends 'DragHandle'
    ? 'vertical' | 'horizontal'
    : IconName extends 'CommentAdd'
    ? 'left' | 'right'
    : IconName extends 'Circle'
    ? 'outline' | 'outline_small' | 'fill' | 'fill_small'
    : IconName extends 'FormulaComponent'
    ? 'Ci' | 'Li' | 'Pi' | 'Si'
    : 'outline' | 'border' | 'fill';
};
