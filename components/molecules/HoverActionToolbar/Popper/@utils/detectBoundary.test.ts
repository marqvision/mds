import { describe, it, expect } from 'vitest';
import { detectOverflow, getFlippedPosition, clampToViewport } from './detectBoundary';
import type { Coordinates, PopperSize, ViewportSize } from '../@types';

describe('detectBoundary 유틸 함수', () => {
  // 공통 테스트 데이터
  const viewportSize: ViewportSize = {
    width: 1024,
    height: 768,
  };

  const popperSize: PopperSize = {
    width: 120,
    height: 80,
  };

  describe('detectOverflow 함수', () => {
    it('viewport 내에 있으면 모든 방향이 false여야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: 100, y: 100 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result).toEqual({
        top: false,
        bottom: false,
        left: false,
        right: false,
      });
    });

    it('상단으로 벗어나면 top이 true여야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: 100, y: -10 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.top).toBe(true);
      expect(result.bottom).toBe(false);
    });

    it('하단으로 벗어나면 bottom이 true여야 합니다', () => {
      // Arrange
      // y + popperHeight > viewportHeight
      // y + 80 > 768 → y > 688
      const coordinates: Coordinates = { x: 100, y: 700 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.top).toBe(false);
      expect(result.bottom).toBe(true);
    });

    it('좌측으로 벗어나면 left가 true여야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: -10, y: 100 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.left).toBe(true);
      expect(result.right).toBe(false);
    });

    it('우측으로 벗어나면 right가 true여야 합니다', () => {
      // Arrange
      // x + popperWidth > viewportWidth
      // x + 120 > 1024 → x > 904
      const coordinates: Coordinates = { x: 950, y: 100 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.left).toBe(false);
      expect(result.right).toBe(true);
    });

    it('여러 방향으로 동시에 벗어날 수 있습니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: -10, y: -10 };

      // Act
      const result = detectOverflow(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.top).toBe(true);
      expect(result.left).toBe(true);
    });
  });

  describe('getFlippedPosition 함수', () => {
    describe('top → bottom 반전', () => {
      it('top-left가 bottom-left로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('top-left', { top: true, bottom: false, left: false, right: false });

        // Assert
        expect(result).toBe('bottom-left');
      });

      it('top-center가 bottom-center로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('top-center', { top: true, bottom: false, left: false, right: false });

        // Assert
        expect(result).toBe('bottom-center');
      });

      it('top-right가 bottom-right로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('top-right', { top: true, bottom: false, left: false, right: false });

        // Assert
        expect(result).toBe('bottom-right');
      });
    });

    describe('bottom → top 반전', () => {
      it('bottom-left가 top-left로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('bottom-left', { top: false, bottom: true, left: false, right: false });

        // Assert
        expect(result).toBe('top-left');
      });

      it('bottom-center가 top-center로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('bottom-center', { top: false, bottom: true, left: false, right: false });

        // Assert
        expect(result).toBe('top-center');
      });

      it('bottom-right가 top-right로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('bottom-right', { top: false, bottom: true, left: false, right: false });

        // Assert
        expect(result).toBe('top-right');
      });
    });

    describe('left → right 반전', () => {
      it('left-top이 right-top으로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('left-top', { top: false, bottom: false, left: true, right: false });

        // Assert
        expect(result).toBe('right-top');
      });

      it('left-center가 right-center로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('left-center', { top: false, bottom: false, left: true, right: false });

        // Assert
        expect(result).toBe('right-center');
      });

      it('left-bottom이 right-bottom으로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('left-bottom', { top: false, bottom: false, left: true, right: false });

        // Assert
        expect(result).toBe('right-bottom');
      });
    });

    describe('right → left 반전', () => {
      it('right-top이 left-top으로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('right-top', { top: false, bottom: false, left: false, right: true });

        // Assert
        expect(result).toBe('left-top');
      });

      it('right-center가 left-center로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('right-center', { top: false, bottom: false, left: false, right: true });

        // Assert
        expect(result).toBe('left-center');
      });

      it('right-bottom이 left-bottom으로 반전되어야 합니다', () => {
        // Act
        const result = getFlippedPosition('right-bottom', { top: false, bottom: false, left: false, right: true });

        // Assert
        expect(result).toBe('left-bottom');
      });
    });

    describe('overflow가 없는 경우', () => {
      it('overflow가 없으면 원래 position을 반환해야 합니다', () => {
        // Act
        const result = getFlippedPosition('top-center', { top: false, bottom: false, left: false, right: false });

        // Assert
        expect(result).toBe('top-center');
      });
    });
  });

  describe('clampToViewport 함수', () => {
    it('좌표가 viewport 내에 있으면 그대로 반환해야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: 100, y: 100 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      expect(result).toEqual({ x: 100, y: 100 });
    });

    it('x가 음수면 padding 값으로 조정해야 합니다 (기본 padding: 4)', () => {
      // Arrange
      const coordinates: Coordinates = { x: -10, y: 100 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.x).toBe(4);
      expect(result.y).toBe(100);
    });

    it('y가 음수면 padding 값으로 조정해야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: 100, y: -10 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      expect(result.x).toBe(100);
      expect(result.y).toBe(4);
    });

    it('x + popperWidth가 viewportWidth를 초과하면 조정해야 합니다', () => {
      // Arrange
      // x + 120 <= 1024 - 4 → x <= 900
      const coordinates: Coordinates = { x: 950, y: 100 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      // 1024 - 120 - 4 = 900
      expect(result.x).toBe(900);
    });

    it('y + popperHeight가 viewportHeight를 초과하면 조정해야 합니다', () => {
      // Arrange
      // y + 80 <= 768 - 4 → y <= 684
      const coordinates: Coordinates = { x: 100, y: 700 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      // 768 - 80 - 4 = 684
      expect(result.y).toBe(684);
    });

    it('커스텀 padding을 적용할 수 있어야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: -10, y: 100 };
      const customPadding = 10;

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize, customPadding);

      // Assert
      expect(result.x).toBe(10);
    });

    it('여러 방향으로 동시에 조정해야 합니다', () => {
      // Arrange
      const coordinates: Coordinates = { x: -10, y: -10 };

      // Act
      const result = clampToViewport(coordinates, popperSize, viewportSize);

      // Assert
      expect(result).toEqual({ x: 4, y: 4 });
    });
  });
});
