import React from 'react';
import { MDSThemeColorPath } from '../../foundation';

export type Color = 'default' | 'indicator';

export type Theme = { color: Record<Color | 'backgroundColor', string> };

/**
 * 확정된 진행률 모드 (Determinate).
 */
type Determinate = {
  /**
   * 진행률 퍼센트 값 (0~100 사이).
   */
  progress: number;

  /**
   * 진행률 라벨 표시 여부.
   * @default undefined
   * @remarks
   * - `true`: 퍼센트 값 표시.
   * - `false`: 숨김.
   */
  label?: boolean;
};

/**
 * 미확정된 진행률 모드 (Indeterminate).
 */
type Indeterminate = {
  /**
   * 진행률 값은 정의되지 않음 (미확정 상태).
   */
  progress?: never;

  /**
   * 사용자 정의 라벨을 숫자로 설정. (`%` 문자 출력됨)
   * @default undefined
   */
  label?: number;
};

/**
 * 인디케이터 컴포넌트의 속성.
 */
export type LoadingIndicatorProps = Omit<React.SVGAttributes<SVGElement>, 'strokeWidth'> &
  (Determinate | Indeterminate) & {
    /**
     * 인디케이터의 색상.
     * @remarks
     * - `Color`: Loading indicator 전용 색상(`default` 또는 `indicator`).
     * - `MDSThemeColorPath`: 사용자 정의 색상.
     * @default "default"
     */
    color?: Color | MDSThemeColorPath;

    /**
     * 배경색.
     * @remarks
     * - `boolean`: 전용 배경색 사용 여부 (`true`).
     * - `MDSThemeColorPath`: 사용자 정의 배경색.
     * @default false
     */
    backgroundColor?: boolean | MDSThemeColorPath;

    /**
     * 선의 두께 (strokeWidth).
     * @default Indeterminate 모드 `3`, Determinate 모드 `4`
     */
    strokeWidth?: number;

    /**
     * 인디케이터의 크기.
     * @default Indeterminate 모드 `16`, Determinate 모드 `46`
     */
    size?: number;
  };
