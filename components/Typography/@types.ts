import { ElementType, HTMLAttributes } from 'react';
import type { MDSTheme } from '../../foundation/index';

export type Features = {
  /**
   * 타이포그래피의 종류.
   * 기본값은 T14입니다.
   */
  variant?: 'T24' | 'T20' | 'T18' | 'T16' | 'T14' | 'T13' | 'T12';
  /**
   * 타이포그래피의 굵기.
   * 기본값은 regular입니다.
   */
  weight?: 'bold' | 'medium' | 'regular' | 'light';
  /**
   * 말줄일 라인 수.
   * 기본값은 말줄임 없음(=0)입니다.
   */
  lineClamp?: number;
  /**
   * 타이포그래피의 색상.
   * 기본값은 content.neutral.default(=bluegrey900)입니다.
   */
  color?: Path<MDSTheme['color']>;

  /**
   * 타이포그래피의 태그. 기본값은 variant에 따라 자동으로 결정됩니다.
   * T24, T20: h1, h2 / T18, T16, T14, T13, T12: p
   */
  as?: ElementType;
};

export type MDSTypographyProps = Features & HTMLAttributes<HTMLSpanElement>;
