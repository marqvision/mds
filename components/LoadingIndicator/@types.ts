import React from 'react';

export type Color = 'default' | 'indicator' | 'inherit';

export type Theme = { color: Record<Color | 'backgroundColor', string> };

/**
 * 확정된 진행률 모드 (Determinate).
 */
type Determinate = {
  /**
   * 진행률 모드
   * - `true`: 진행 상황을 `stroke`로 표시. (progress 필수 전달)
   * - `false`: 진행 상황이 비확정적(Indeterminate)으로, 로딩 서클 무한 회전.
   * @default `false`
   */
  isDeterminate: true;

  /**
   * 진행률 퍼센트 값 (0~100 사이).
   * - isDeterminate `true`시: 로딩 서클 `stroke` 길이 결정
   * - isDeterminate `false`시: 중앙에 `[progress]%` 출력
   */
  progress: number;
};

/**
 * 미확정된 진행률 모드 (Indeterminate).
 */
type Indeterminate = {
  isDeterminate?: false;
  progress?: number;
};

/**
 * 인디케이터 컴포넌트의 속성.
 */
export type LoadingIndicatorProps = Omit<React.SVGAttributes<SVGElement>, 'strokeWidth'> &
  (Determinate | Indeterminate) & {
    /**
     * 인디케이터의 색상.
     * @remarks
     * - `default`: blackAlpha80.
     * - `indicator`: blue700.
     * - `inherit`: 상위 요소에 의해 결정.
     * @default "default"
     */
    color?: Color;

    /**
     * 배경색.
     * @remarks
     * - `true`: 전용 배경색 blackAlpha10 사용.
     * - `false`: 배경색 없음 (투명).
     * @default false
     */
    backgroundColor?: boolean;

    /**
     * 선의 두께 (strokeWidth).
     * @default Indeterminate 모드 `2`, Determinate 모드 `4`
     */
    strokeWidth?: number;

    /**
     * 인디케이터의 크기.
     * @default Indeterminate 모드 `13`, Determinate 모드 `46`
     */
    size?: number;
  };
