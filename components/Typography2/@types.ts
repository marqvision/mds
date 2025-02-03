import { CSSProperties, ElementType } from 'react';
import type { MDSThemeColorPath } from '../../foundation';

type Variant = 'title' | 'body';
type Size = '2xl' | 'xl' | 'l' | 'm' | 's' | 'xs';
type Weight = 'semibold' | 'medium' | 'regular';
type Char = 'letter' | 'number';

type BaseFeatures<T extends ElementType = 'p'> = {
  /**
   * 말줄일 라인 수.
   * 기본값은 말줄임 없음(=0)입니다.
   */
  lineClamp?: number;
  /**
   * 타이포그래피의 색상.
   * 기본값은 content.neutral.default(=bluegray900)입니다.
   */
  color?: MDSThemeColorPath | 'inherit';

  /**
   * 타이포그래피의 태그. 기본값은 variant에 따라 자동으로 결정됩니다.
   *
   *  - title (2xl): h1
   *  - title (xl): h2
   *  - 나머지: p
   */
  as?: T;

  /**
   * 타이포그래피의 work-break 속성.
   * 기본값은 브라우저 기본값을 따릅니다.
   *
   * break-word를 사용하고 싶다면 다음 문서를 참고하세요
   * https://developer.mozilla.org/docs/Web/CSS/word-break#break-word
   */
  wordBreak?: CSSProperties['wordBreak'];

  /**
   * 타이포그래피의 white-space 속성.
   * 기본값은 브라우저 기본값을 따릅니다.
   */
  whiteSpace?: CSSProperties['whiteSpace'];

  /**
   * 타이포그래피의 text-decoration 속성.
   * 기본값은 없음(=none)입니다.
   */
  textDecoration?: CSSProperties['textDecoration'];

  // PROD-12587 에서 새로운 font를 적용하는 케이스를 위한 속성
  __useNewFont?: boolean;
};

type NewTypographyStyle =
  | {
      variant?: Extract<Variant, 'title'>;
      char?: Extract<Char, 'letter'>;
      size?: Extract<Size, '2xl' | 'xl' | 'l'>;
      /**
       * 타이포그래피의 굵기. - variant와 size에 따라 사용 가능한 값이 다릅니다
       * - title+2xl, title+xl, title+l: semibold, medium
       * - body의 모든 size: medium, regular
       */
      weight?: Extract<Weight, 'semibold' | 'medium'>;
    }
  | {
      variant?: Extract<Variant, 'title'>;
      char?: Extract<Char, 'letter'>;
      size?: Extract<Size, 'm' | 's'>;
      weight?: Extract<Weight, 'semibold'>;
    }
  | {
      variant?: Extract<Variant, 'title'>;
      char?: Extract<Char, 'number'>;
      size?: Extract<Size, 'xl' | 'l'>;
      weight?: Extract<Weight, 'semibold' | 'medium'>;
    }
  | {
      variant?: Extract<Variant, 'title'>;
      char?: Extract<Char, 'number'>;
      size?: Extract<Size, 'm' | 's'>;
      weight?: Extract<Weight, 'semibold'>;
    }
  | {
      variant?: Extract<Variant, 'body'>;
      char?: Char;
      size?: Extract<Size, 'l' | 'm' | 's' | 'xs'>;
      weight?: Extract<Weight, 'medium' | 'regular'>;
    };

// 내부적으로 사용되는 타이포그래피 스타일 속성
export type InnerTypographyStyleProps<T extends ElementType = 'p'> = {
  variant: Variant;
  char: Char;
  size: Size;
  weight?: Weight | 'bold' | 'light'; // todo-@jamie: [PROD-12758] bold, light: 예전 폰트 하위 호환성을 위해 유지 - 완료되면 반드시 삭제!!!
} & BaseFeatures<T>;

// 최종 + 외부 노출을 위한 Props 타입
export type MDSTypographyProps2<T extends ElementType = 'p'> = BaseFeatures<T> &
  NewTypographyStyle &
  React.ComponentPropsWithoutRef<T>;
