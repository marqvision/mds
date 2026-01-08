import React from 'react';
import { MDSThemeColorPath } from '../../../types';
import { MDSTypographyProps } from '../../atoms/Typography';
import { token } from './@constants';

export type Variant = 'fill' | 'tint' | 'border' | 'ai';
export type Color = 'bluegray' | 'blue' | 'red' | 'yellow' | 'green' | 'teal' | 'purple' | 'white';
export type Size = 'x-small' | 'small' | 'medium';
export type Status = 'normal' | 'hover' | 'disabled';

type Token = typeof token;
type ColorTheme = {
  color: MDSThemeColorPath;
  backgroundColor?: MDSThemeColorPath;
  borderColor: MDSThemeColorPath;
  clickAreaColor?: MDSThemeColorPath;
};
type AiTheme = {
  color: MDSThemeColorPath;
  backgroundColor: string;
  borderColor: string;
  clickAreaColor?: MDSThemeColorPath;
};
export type TagTheme = {
  color: Record<
    Color,
    Record<Exclude<Variant, 'ai'>, Record<Status, ColorTheme> & Partial<{ completed: ColorTheme }>>
  > &
    Record<Extract<Variant, 'ai'>, Record<Status, AiTheme>>;
  size: Record<
    Size,
    {
      size: Extract<MDSTypographyProps['size'], 'xs' | 's'>;
      icon: number;
      padding: `${Token['pddng']['v'][keyof Token['pddng']['v']]} ${Token['pddng']['h'][keyof Token['pddng']['v']]}`; //h key type 고의로 v 로 지정함 (v 와 한 쌍으로 된 h 값 사용)
      gap: Token['gap'][keyof Token['gap']];
      radius: Token['radius'][keyof Token['radius']];
      minHeight: Token['minSize'][keyof Token['minSize']];
      borderWidth: number;
      clickAreaPadding: number;
      lineHeight?: string;
    }
  >;
};

export type StyledTagProps = {
  variant: Variant;
  size: Size;
  color?: Color;
  isClickable: boolean;
};

export type IconProps = {
  size: Size;
  icon: React.ReactElement;
};

type BaseProps = {
  /**
   * Tag 버튼에 disabled 상태 부여.
   **/
  isDisabled?: boolean;
  /**
   * Tag 에 부여 할 클릭 이벤트.
   * 이 속성 존재 시 Tag 은 div 가 아닌 button 으로 출력되며,
   * hover 및 cursor: pointer 효과가 적용됩니다.
   **/
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type TagProps = (
  | {
      size: Extract<Size, 'x-small'>;
      icon?: React.ReactElement;
      startIcon?: never;
      endIcon?: never;
    }
  | {
      /**
       * Tag 의 사이즈.
       **/
      size: Exclude<Size, 'x-small'>;
      /**
       * x-small 사이즈의 Tag 내 단일 아이콘을 출력합니다.
       * 사이즈는 Tag 에 의해 결정되며,
       * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Tag 의 color 에 의해 결정됩니다.
       **/
      icon?: never;
      /**
       * Tag 의 label 좌측에 아이콘 출력.
       * 사이즈는 Tag 의 size 에 의해 결정되며,
       * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Tag 의 color 에 의해 결정됩니다.
       **/
      startIcon?: React.ReactElement;
      /**
       * Tag 의 label 우측에 아이콘 출력.
       * 사이즈는 Tag 의 size 에 의해 결정되며,
       * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Tag 의 color 에 의해 결정됩니다.
       **/
      endIcon?: React.ReactElement;
    }
) &
  (
    | {
        variant: Extract<Variant, 'ai'>;
        color?: never;
      }
    | {
        /**
         * Tag 의 종류.
         **/
        variant: Exclude<Variant, 'ai'>;
        /**
         * Tag 의 색상.
         **/
        color: Color;
      }
  ) &
  BaseProps;
