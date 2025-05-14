import React from 'react';

export type Color = 'bluegray' | 'blue' | 'red' | 'yellow' | 'green' | 'white';
export type Size = 'small' | 'medium' | 'large';
export type Status = 'normal' | 'hover' | 'disabled';

export type ColorTheme = {
  color: string;
};

export type StyledPlainButtonProps = {
  size: Size;
  color: Color;
  isDisabled?: boolean;
  isCompleted?: boolean;
  isClickable: boolean;
  isIconButton?: boolean;
};

export type IconProps = {
  type: 'single' | 'couple';
  size: Size;
  icon: React.ReactElement;
};

type CommonProps = {
  /**
   * Button 의 사이즈.
   * @default 'medium'
   **/
  size?: Size;
  /**
   * Button 의 색상.
   * @default 'blue'
   **/
  color?: Color;
  /**
   * Button 버튼에 disabled 상태 부여.
   **/
  isDisabled?: boolean;
  /**
   * Button 에 completed 상태 부여
   * bluegray + tint, bluegray + border 에서만 사용
   **/
  isCompleted?: boolean;
  /**
   * Button 에 부여 할 클릭 이벤트.
   * 이 속성 존재 시 Button 은 div 가 아닌 button 으로 출력되며,
   * hover 및 cursor: pointer 효과가 적용됩니다.
   **/
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type CompositeButtonProps = {
  /**
   * Button 의 label 좌측에 아이콘 출력.
   * 사이즈는 Button 의 size 에 의해 결정되며,
   * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Button 의 color 에 의해 결정됩니다.
   **/
  startIcon?: React.ReactElement;
  /**
   * Button 의 label 우측에 아이콘 출력.
   * 사이즈는 Button 의 size 에 의해 결정되며,
   * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Button 의 color 에 의해 결정됩니다.
   **/
  endIcon?: React.ReactElement;
  /**
   * Button 의 label.
   * ReactNode 형태로 전달되며, string, number, JSX.Element 모두 가능.
   **/
  children: React.ReactNode;

  icon?: never;
};

type IconButtonProps = {
  /**
   * Button 의 아이콘.
   * 사이즈는 Button 의 size 에 의해 결정되며,
   * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Button 의 color 에 의해 결정됩니다.
   **/
  icon: React.ReactElement;

  startIcon?: never;
  endIcon?: never;
  children?: never;
};

export type PlainButtonProps = CommonProps & (CompositeButtonProps | IconButtonProps);