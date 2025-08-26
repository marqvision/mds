import React from 'react';
import { MDSTypographyProps } from '../Typography';

export type Color = 'blue' | 'white' | 'bluegray';
type Size = 'small' | 'medium';

export type Icon = Record<Size, React.ReactElement>;

export type Status = 'checked' | 'default';
export type ColorSet = {
  normalBorder: string;
  disabledBorder: string;
  normalFill?: string;
  disabledFill?: string;
};
export type Theme = {
  size: Record<
    Size,
    {
      boxSize: number;
      fontSize: MDSTypographyProps['size'];
      padding: number;
      borderRadius: number;
      fontColor: {
        default: MDSTypographyProps['color'];
        disabled: MDSTypographyProps['color'];
      };
    }
  >;
};

export type StyledWrapperProps = {
  color: Color;
  size: Size;
  type: 'normal' | 'disabled';
  value: boolean | 'indeterminate';
  isTranslucent: boolean;
};

export type LabelProps = {
  isDisabled?: boolean;
  size: Size;
  label: Exclude<Props['label'], undefined | null>;
};

export type Props = {
  /**
   * 체크박스가 체크되었는지 여부를 나타냅니다.
   * true, false 또는 'indeterminate' 값으로 전달합니다.
   */
  value: boolean | 'indeterminate';
  /**
   * 체크박스 상태 변경을 처리하는 함수입니다.
   * 매개변수 'checked' 는 체크박스의 새로운 상태를 나타냅니다.
   */
  onChange: (value: boolean) => void;
  /**
   * 체크박스의 색상을 지정합니다.
   * @default 'blue'
   */
  color?: Color;
  /**
   * 체크박스의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 체크박스가 비활성화되었는지 여부를 나타냅니다.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * 체크박스의 우측에 나타날 레이블을 지정합니다.
   * 객체 형태로 전달할 경우 'main' 은 weight:medium, 'sub' 는 weight:regular 로 출력됩니다. (list total count 표시용)
   * disabled 상태에 color 가 변경되므로, MDSTypography 컴포넌트 전달 시 color="inherit" 으로 설정하는 것을 권장합니다.
   */
  label?: React.ReactNode | { main: string; sub: string };
  /**
   * 체크박스와 label 사이의 간격을 지정합니다.
   * @default 4
   */
  gap?: number;
};
