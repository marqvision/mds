import React from 'react';

export type Variant = 'fill' | 'tint' | 'border';
export type Color = 'bluegray' | 'blue' | 'red' | 'yellow' | 'green' | 'teal' | 'purple' | 'white';
export type Size = 'small' | 'medium' | 'large' | 'extra-large';
export type Status = 'normal' | 'hover' | 'disabled';
export type Flat = 'left' | 'right' | 'both';
type Width = 'fill' | 'hug' | string;
type LoadingStatus = 'hideLabel' | boolean;

export type ColorTheme = {
  color: string;
  backgroundColor?: string;
  borderColor: string;
};

export type StyledButtonProps = {
  variant: Variant;
  size: Size;
  color: Color;
  width: Width;
  isLoading?: LoadingStatus;
  isDisabled?: boolean;
  isCompleted?: boolean;
  isClickable: boolean;
  flat?: Flat;
};

export type LoadingSpinnerProps = {
  isCenter?: boolean;
};

export type IconProps = {
  size: Size;
  icon: React.ReactElement;
};

export type DividerProps = {
  variant: Variant;
  size: Size;
  color: Color;
};

export type ButtonProps = {
  /**
   * Button 의 종류.
   **/
  variant: Variant;
  /**
   * Button 의 사이즈.
   **/
  size: Size;
  /**
   * Button 의 색상.
   **/
  color: Color;
  /**
   * Button 의 가로 사이즈.
   * @hug 내용에 맞춤 `default`
   * @fill 부모의 전체 영역을 차지
   * @string 자유로운 사이즈 지정
   **/
  width?: Width;
  /**
   * 로딩 스피너 출력 및 클릭 이벤트 방지.
   * @true startIcon 영역에 아이콘 대신 스피너 출력 `default`
   * @false 스피너 출력 안 함
   * @hiddLabel label 및 icon 을 숨기고 Button 중앙에 스피너 출력
   **/
  isLoading?: LoadingStatus;
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
   * Button 에 부여 할 클릭 이벤트.
   * 이 속성 존재 시 Button 은 div 가 아닌 button 으로 출력되며,
   * hover 및 cursor: pointer 효과가 적용됩니다.
   **/
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button 내부에 추가할 태그 개별 요소 또는 요소의 배열.
   * label 과 endIcon 사이에 위치되며,
   * Button 에서 설정한 gap 사이즈가 Tag 사이의 gap 으로 적용됩니다.
   * Tag 의 size, color 등의 스타일은 전적으로 사용처에서 결정하며,
   * Button 에서는 어떠한 값도 전달하지 않습니다.
   **/
  tags?: React.ReactElement | React.ReactElement[];
  /**
   * Button 의 좌측, 우측 또는 양측의 borderRadius 제거.
   * Button 을 여러 개 연결되어 보이도록 나열할 때 사용하며,
   * Button 끼리의 구분을 위해 플랫하게 변경된 우측에는 항상 divider 를 출력합니다.
   **/
  flat?: Flat;
};
