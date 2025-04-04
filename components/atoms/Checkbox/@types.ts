import React from 'react';
import { MDSThemeColorPath } from '../../../foundation';

type Color = 'blue' | 'white' | 'bluegray';
type Size = 'small' | 'medium';

export type Icon = Record<Size, React.ReactElement>;

export type Theme = {
  color: Record<
    Color,
    {
      default: {
        normal: MDSThemeColorPath;
        disabled: MDSThemeColorPath;
      };
      unChecked: {
        border: {
          normal: MDSThemeColorPath;
          disabled: MDSThemeColorPath;
        };
        fill: {
          normal?: MDSThemeColorPath;
          disabled: MDSThemeColorPath;
        };
      };
    }
  >;
  size: Record<
    Size,
    {
      boxSize: number;
      padding: number;
      borderRadius: number;
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
};
