import { ElementType } from 'react';
import type { MDSThemeColorPath } from '../../foundation';

export type Features<T extends ElementType = 'span'> = {
  /**
   * 타이포그래피의 종류.
   * 기본값은 T16입니다.
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
   * 기본값은 content.neutral.default(=bluegray900)입니다.
   */
  color?: MDSThemeColorPath;

  /**
   * 타이포그래피의 태그. 기본값은 variant에 따라 자동으로 결정됩니다.
   * T24, T20: h1, h2 / T18, T16, T14, T13, T12: p
   */
  as?: T;

  /**
   * 타이포그래피의 work-break 속성.
   * 기본값은 브라우저 기본값을 따릅니다.
   *
   * break-word를 사용하고 싶다면 다음 문서를 참고하세요
   * https://developer.mozilla.org/docs/Web/CSS/word-break#break-word
   */
  wordBreak?: 'normal' | 'keep-all' | 'break-all';

  /**
   * 타이포그래피의 white-space 속성.
   * 기본값은 브라우저 기본값을 따릅니다.
   */
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';
};

export type MDSTypographyProps<T extends ElementType = 'span'> = Features<T> & React.ComponentPropsWithoutRef<T>;
