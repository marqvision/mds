import React from 'react';
import { MDSThemeColorPath } from '../../../types';
import { MDSTypographyProps } from '../../atoms/Typography';
import { token } from './@constants';

export type ChipVariant = 'fill' | 'tint' | 'border';
export type ChipColor = 'bluegray' | 'blue' | 'red' | 'yellow' | 'green' | 'teal' | 'purple' | 'white';
export type ChipSize = 'small' | 'medium' | 'large' | 'extra-large';
export type ChipStatus = 'normal' | 'hover' | 'disabled';
export type Flat = 'left' | 'right' | 'both';
type ChipWidth = 'fill' | 'hug' | string;
type LoadingStatus = 'hideLabel' | boolean;

type Token = typeof token;
type ColorTheme = {
  color: MDSThemeColorPath;
  backgroundColor?: MDSThemeColorPath;
  borderColor: MDSThemeColorPath;
};
export type ChipTheme = {
  color: Record<ChipColor, Record<ChipVariant, Record<ChipStatus, ColorTheme> & Partial<{ completed: ColorTheme }>>>;
  size: Record<
    ChipSize,
    {
      label: MDSTypographyProps['variant'];
      size: MDSTypographyProps['size'];
      weight: MDSTypographyProps['weight'];
      icon: number;
      padding: `${Token['pddng']['v'][keyof Token['pddng']['v']]} ${Token['pddng']['h'][keyof Token['pddng']['v']]}`; //h key type 고의로 v 로 지정함 (v 와 한 쌍으로 된 h 값 사용)
      gap: Token['gap'][keyof Token['gap']];
      flatPadding: Token['gap'][keyof Token['gap']];
      radius: Token['radius'][keyof Token['radius']];
      minHeight: Token['minSize'][keyof Token['minSize']];
      spinnerSize: number;
    }
  >;
};

export type StyledChipProps = {
  variant: ChipVariant;
  size: ChipSize;
  color: ChipColor;
  width: ChipWidth;
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
  size: ChipSize;
  icon: React.ReactElement;
};

export type DividerProps = {
  variant: ChipVariant;
  size: ChipSize;
  color: ChipColor;
};

export type ChipProps = {
  /**
   * Chip 의 종류.
   **/
  variant: ChipVariant;
  /**
   * Chip 의 사이즈.
   **/
  size: ChipSize;
  /**
   * Chip 의 색상.
   **/
  color: ChipColor;
  /**
   * Chip 의 가로 사이즈.
   * @hug 내용에 맞춤 `default`
   * @fill 부모의 전체 영역을 차지
   * @string 자유로운 사이즈 지정
   **/
  width?: ChipWidth;
  /**
   * 로딩 스피너 출력 및 클릭 이벤트 방지.
   * @true startIcon 영역에 아이콘 대신 스피너 출력 `default`
   * @false 스피너 출력 안 함
   * @hiddLabel label 및 icon 을 숨기고 Chip 중앙에 스피너 출력
   **/
  isLoading?: LoadingStatus;
  /**
   * Chip 버튼에 disabled 상태 부여.
   **/
  isDisabled?: boolean;
  /**
   * Chip 에 completed 상태 부여
   * bluegray + tint, bluegray + border 에서만 사용
   **/
  isCompleted?: boolean;
  /**
   * Chip 의 label 좌측에 아이콘 출력.
   * 사이즈는 Chip 의 size 에 의해 결정되며,
   * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Chip 의 color 에 의해 결정됩니다.
   **/
  startIcon?: React.ReactElement;
  /**
   * Chip 의 label 우측에 아이콘 출력.
   * 사이즈는 Chip 의 size 에 의해 결정되며,
   * 색상은 아이콘에 부여된 color 속성을 우선 적용 후 속성을 부여하지 않았다면 Chip 의 color 에 의해 결정됩니다.
   **/
  endIcon?: React.ReactElement;
  /**
   * Chip 에 부여 할 클릭 이벤트.
   * 이 속성 존재 시 Chip 은 div 가 아닌 button 으로 출력되며,
   * hover 및 cursor: pointer 효과가 적용됩니다.
   **/
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Chip 내부에 추가할 태그 개별 요소 또는 요소의 배열.
   * label 과 endIcon 사이에 위치되며,
   * Chip 에서 설정한 gap 사이즈가 Tag 사이의 gap 으로 적용됩니다.
   * Tag 의 size, color 등의 스타일은 전적으로 사용처에서 결정하며,
   * Chip 에서는 어떠한 값도 전달하지 않습니다.
   **/
  tags?: React.ReactElement | React.ReactElement[];
  /**
   * Chip 의 좌측, 우측 또는 양측의 borderRadius 제거.
   * Chip 을 여러 개 연결되어 보이도록 나열할 때 사용하며,
   * Chip 끼리의 구분을 위해 플랫하게 변경된 우측에는 항상 divider 를 출력합니다.
   **/
  flat?: Flat;
};
