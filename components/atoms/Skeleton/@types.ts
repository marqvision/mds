import { MDSTypographyProps } from '../Typography';
import { MDSTheme } from '../../../types';

type TypographyType = keyof MDSTheme['comp']['typography'];
export type Variant = TypographyType | 'circle' | 'rect';

export type CommonProps = {
  /**
   * Skeleton 의 display 스타일을 결정합니다.
   * @default 'block'
   **/
  display?: 'block' | 'inline-block' | 'none';
};

export type TextProps<V extends Extract<Variant, TypographyType> = 'body'> = CommonProps & {
  /**
   * MDSTypography 의 variant
   * 전달된 variant + size 값에 따라서 MDSTypography 와 동일한 height 로 결정됩니다.
   * @default 'body'
   **/
  variant?: V;
  /**
   * MDSTypography 의 size
   * 전달된 variant + size 값에 따라서 MDSTypography 와 동일한 height 로 결정됩니다.
   * @default 'm'
   **/
  size?: MDSTypographyProps['size'];
  /**
   * Skeleton 의 가로 사이즈
   * @default '100%'
   **/
  width?: string | number;
};

export type CircleProps<V extends Extract<Variant, 'circle'> = 'circle'> = CommonProps & {
  /**
   * Skeleton 의 variant 'circle'
   */
  variant: V;
  /**
   * Circle 타입 Skeleton 의 지름 (가로, 세로)
   * @default '40px'
   **/
  size: string | number;
};

export type RectProps<V extends Extract<Variant, 'rect'> = 'rect'> = CommonProps & {
  /**
   * Skeleton 의 variant 'rect'
   */
  variant: V;
  /**
   * Rect 타입 Skeleton 의 가로 사이즈
   * @default '100%'
   **/
  width?: string | number;
  /**
   * Rect 타입 Skeleton 의 세로 사이즈
   * @default '100%'
   **/
  height?: string | number;
  /**
   * Rect 타입 Skeleton 의 border-radius
   * @default '4px'
   **/
  borderRadius?: string | number;
};

export type Props<V extends Variant> =
  V extends Extract<Variant, TypographyType>
    ? TextProps<V>
    : V extends Extract<Variant, 'circle'>
      ? CircleProps<V>
      : V extends Extract<Variant, 'rect'>
        ? RectProps<V>
        : never;
