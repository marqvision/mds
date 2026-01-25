type ClampValueParams = {
  value: number;
  min: number;
  max: number;
};

type RoundToStepParams = {
  value: number;
  step: number;
  min: number;
};

type ValueToPercentageParams = {
  value: number;
  min: number;
  max: number;
};

type PercentageToValueParams = {
  percentage: number;
  min: number;
  max: number;
};

/**
 * 값을 min, max 범위 내로 클램핑
 */
export const clampValue = ({ value, min, max }: ClampValueParams): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * 값을 step 단위로 반올림
 * 소수점 step의 경우 부동소수점 정밀도 문제를 처리
 */
export const roundToStep = ({ value, step, min }: RoundToStepParams): number => {
  const steps = Math.round((value - min) / step);
  const result = min + steps * step;
  const decimals = (step.toString().split('.')[1] || '').length;
  return decimals > 0 ? Number(result.toFixed(decimals)) : result;
};

/**
 * 값을 백분율(0-100)로 변환
 */
export const valueToPercentage = ({ value, min, max }: ValueToPercentageParams): number => {
  if (max === min) return 0;
  return ((value - min) / (max - min)) * 100;
};

/**
 * 백분율(0-100)을 값으로 변환
 */
export const percentageToValue = ({ percentage, min, max }: PercentageToValueParams): number => {
  return min + (percentage / 100) * (max - min);
};

/**
 * 마우스/터치 이벤트에서 슬라이더 내 백분율 위치 계산
 */
export const getPercentageFromEvent = (clientX: number, trackElement: HTMLElement): number => {
  const rect = trackElement.getBoundingClientRect();
  const offsetX = clientX - rect.left;
  const percentage = (offsetX / rect.width) * 100;
  return clampValue({ value: percentage, min: 0, max: 100 });
};
