import { describe, it, expect } from 'vitest';
import { clampValue, roundToStep, valueToPercentage, percentageToValue, getPercentageFromEvent } from '../@utils';

describe('Slider 유틸 함수', () => {
  describe('clampValue', () => {
    it('값이 범위 내에 있으면 그대로 반환해야 합니다', () => {
      expect(clampValue({ value: 50, min: 0, max: 100 })).toBe(50);
      expect(clampValue({ value: 0, min: 0, max: 100 })).toBe(0);
      expect(clampValue({ value: 100, min: 0, max: 100 })).toBe(100);
    });

    it('값이 최소값보다 작으면 최소값을 반환해야 합니다', () => {
      expect(clampValue({ value: -10, min: 0, max: 100 })).toBe(0);
      expect(clampValue({ value: -100, min: 10, max: 50 })).toBe(10);
    });

    it('값이 최대값보다 크면 최대값을 반환해야 합니다', () => {
      expect(clampValue({ value: 150, min: 0, max: 100 })).toBe(100);
      expect(clampValue({ value: 60, min: 10, max: 50 })).toBe(50);
    });
  });

  describe('roundToStep', () => {
    it('step 단위로 값을 반올림해야 합니다', () => {
      expect(roundToStep({ value: 23, step: 10, min: 0 })).toBe(20);
      expect(roundToStep({ value: 27, step: 10, min: 0 })).toBe(30);
      expect(roundToStep({ value: 25, step: 10, min: 0 })).toBe(30);
    });

    it('min 값을 기준으로 step 단위로 반올림해야 합니다', () => {
      expect(roundToStep({ value: 18, step: 10, min: 5 })).toBe(15);
      expect(roundToStep({ value: 22, step: 10, min: 5 })).toBe(25);
    });

    it('step이 1일 때 정수로 반올림해야 합니다', () => {
      expect(roundToStep({ value: 23.4, step: 1, min: 0 })).toBe(23);
      expect(roundToStep({ value: 23.6, step: 1, min: 0 })).toBe(24);
    });

    it('소수점 step도 정확하게 처리해야 합니다', () => {
      expect(roundToStep({ value: 0.23, step: 0.1, min: 0 })).toBe(0.2);
      expect(roundToStep({ value: 0.27, step: 0.1, min: 0 })).toBe(0.3);
      expect(roundToStep({ value: 0.36, step: 0.1, min: 0 })).toBe(0.4);
    });
  });

  describe('valueToPercentage', () => {
    it('값을 백분율로 변환해야 합니다', () => {
      expect(valueToPercentage({ value: 50, min: 0, max: 100 })).toBe(50);
      expect(valueToPercentage({ value: 0, min: 0, max: 100 })).toBe(0);
      expect(valueToPercentage({ value: 100, min: 0, max: 100 })).toBe(100);
    });

    it('커스텀 min/max 범위를 처리해야 합니다', () => {
      expect(valueToPercentage({ value: 30, min: 20, max: 40 })).toBe(50);
      expect(valueToPercentage({ value: 20, min: 20, max: 40 })).toBe(0);
      expect(valueToPercentage({ value: 40, min: 20, max: 40 })).toBe(100);
    });

    it('min과 max가 같으면 0을 반환해야 합니다', () => {
      expect(valueToPercentage({ value: 50, min: 50, max: 50 })).toBe(0);
    });
  });

  describe('percentageToValue', () => {
    it('백분율을 값으로 변환해야 합니다', () => {
      expect(percentageToValue({ percentage: 50, min: 0, max: 100 })).toBe(50);
      expect(percentageToValue({ percentage: 0, min: 0, max: 100 })).toBe(0);
      expect(percentageToValue({ percentage: 100, min: 0, max: 100 })).toBe(100);
    });

    it('커스텀 min/max 범위를 처리해야 합니다', () => {
      expect(percentageToValue({ percentage: 50, min: 20, max: 40 })).toBe(30);
      expect(percentageToValue({ percentage: 0, min: 20, max: 40 })).toBe(20);
      expect(percentageToValue({ percentage: 100, min: 20, max: 40 })).toBe(40);
    });
  });

  describe('getPercentageFromEvent', () => {
    it('트랙 요소 내에서 정확한 백분율을 계산해야 합니다', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          left: 100,
          width: 200,
        }),
      } as HTMLElement;

      expect(getPercentageFromEvent(100, mockElement)).toBe(0);
      expect(getPercentageFromEvent(200, mockElement)).toBe(50);
      expect(getPercentageFromEvent(300, mockElement)).toBe(100);
    });

    it('트랙 범위를 벗어난 값은 0-100으로 클램핑해야 합니다', () => {
      const mockElement = {
        getBoundingClientRect: () => ({
          left: 100,
          width: 200,
        }),
      } as HTMLElement;

      expect(getPercentageFromEvent(50, mockElement)).toBe(0);
      expect(getPercentageFromEvent(350, mockElement)).toBe(100);
    });
  });
});
