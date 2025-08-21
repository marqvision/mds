import React from 'react';
import { MDSTypographyProps } from '../Typography';

export type Color = 'blue' | 'bluegray';
export type Status = 'selected' | 'unSelected';

export type ColorSet = {
  normalBorder: string;
  disabledBorder: string;
  normalFill?: string;
  disabledFill?: string;
};

export type Theme = {
  size: {
    boxSize: number;
    padding: number;
    borderRadius: number;
    fontSize: MDSTypographyProps['size'];
    fontColor: {
      default: MDSTypographyProps['color'];
      disabled: MDSTypographyProps['color'];
    };
  };
};

export type StyledWrapperProps = {
  color: Color;
  type: 'normal' | 'disabled';
  checked: boolean;
};

export type LabelProps = {
  isDisabled?: boolean;
  label: Exclude<Props<string>['label'], undefined | null>;
};

export type Props<Value extends string | number> = {
  /**
   * 해당 라디오 버튼을 선택했을 때 전달할 값을 지정합니다.
   */
  value: Value;
  /**
   * 라디오 버튼이 상태 변경을 처리하는 함수입니다.
   * 매개변수 'value' 는 클릭한 라디오 버튼에 전달한 value 값을 나타냅니다.
   */
  onChange: (value: Value) => void;
  /**
   * 라디오 버튼의 색상을 지정합니다.
   * @default 'blue'
   */
  color?: Color;
  /**
   * 라디오 버튼이 비활성화되었는지 여부를 나타냅니다.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * 여러 개의 라디오 버튼 중 선택된 버튼의 값입니다.
   * 동일한 selectedValue 값을 가진 라디오 버튼들은 하나의 그룹으로 취급됩니다.
   */
  selectedValue: Value;
  /**
   * 라디오 버튼 우측에 나타날 레이블을 지정합니다.
   * disabled 상태에 color 가 변경되므로, MDSTypography 컴포넌트를 전달한다면 color="inherit" 으로 설정하는 것을 권장합니다.
   */
  label?: React.ReactNode;
  /**
   * 라디오 버튼과 label 사이의 간격을 지정합니다.
   * @default 4
   */
  gap?: number;
};
