import { ReactElement } from 'react';

export type DateRange = {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
};

/**
 * 프리셋 항목에서 사용할 수 있는 값 타입입니다.
 * 'custom'은 커스텀 입력을 위한 옵션입니다 -> 이 값의 동작은 다른 일반 텍스트 입력과 구분됩니다
 */
export type DateRangePresetValue<T extends string> = T | 'custom';

/**
 * 세그먼트 버튼에 표시될 단일 프리셋 항목을 정의합니다.
 * label은 사용자에게 보여지는 텍스트, value는 내부 식별자이며
 * resolveRange는 선택 시 동적으로 날짜 범위를 계산합니다.
 */
export type DateRangePresetItem<T extends string> = {
  label: string;
  value: DateRangePresetValue<T>;
  icon?: ReactElement;

  /**
   * 프리셋 선택 시 날짜 범위를 계산하기 위한 함수. return값이 undefined인 경우, 날짜 범위가 미정인 상태로 간주.
   */
  resolveRange?: () => DateRange | undefined;
};

/**
 * 공통 세그먼트 버튼 속성입니다.
 * variant와 size는 디자인 시스템의 세그먼트 버튼 컴포넌트와 동일하게 동작합니다.
 */
export type BaseSegmentedButtonProps<T extends string> = {
  list: DateRangePresetItem<T>[];
  value?: DateRangePresetValue<T>;
  onChange: (preset: DateRangePresetItem<T>, dateRange?: DateRange) => void;
  selectedIcon?: ReactElement;
  variant?: 'border' | 'fill';
  size?: 'small' | 'medium' | 'large';
};

/**
 * packages/mds-v2/components/molecules/SegmentedButton/@types.ts 의 WithoutWidth 타입.
 * 
 * type이 'hug' 또는 'fit'일 때 사용할 수 있는 속성 타입.
 * fixedWidth는 사용할 수 없음.
 */
export type HugOrFitSegmentedButtonProps<T extends string> = BaseSegmentedButtonProps<T> & {
  type?: 'hug' | 'fit';
  fixedWidth?: never;
};

/**
 * packages/mds-v2/components/molecules/SegmentedButton/@types.ts 의 WithWidth 타입.
 * 
 * type이 'fixed'일 때 필요한 속성 타입. 
 * 고정 너비를 지정하기 위한 fixedWidth를 필수로 요구.
 */
export type FixedSegmentedButtonProps<T extends string> = BaseSegmentedButtonProps<T> & {
  type: 'fixed';
  fixedWidth: string;
};

/**
 * MDSDateRangeSegmentedButton 컴포넌트의 전체 props 타입입니다.
 * type 속성 값에 따라 허용되는 프로퍼티가 달라집니다.
 */
export type MDSDateRangeSegmentedButtonProps<T extends string> =
  | HugOrFitSegmentedButtonProps<T>
  | FixedSegmentedButtonProps<T>;
