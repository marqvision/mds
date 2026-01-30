import { describe, it, expect } from 'vitest';
import { calculatePosition, parsePosition, calculateAlignmentX, calculateAlignmentY } from './calculatePosition';
import type { AnchorRect, PopperSize } from '../@types';

describe('calculatePosition 유틸 함수', () => {
  // 공통 테스트 데이터
  const anchorRect: AnchorRect = {
    top: 100,
    left: 200,
    right: 300,
    bottom: 150,
    width: 100,
    height: 50,
  };

  const popperSize: PopperSize = {
    width: 120,
    height: 80,
  };

  const offset = 4;

  describe('parsePosition 함수', () => {
    it('bottom-left를 direction: bottom, alignment: left로 파싱해야 합니다', () => {
      // Act
      const result = parsePosition('bottom-left');

      // Assert
      expect(result).toEqual({ direction: 'bottom', alignment: 'left' });
    });

    it('top-center를 direction: top, alignment: center로 파싱해야 합니다', () => {
      // Act
      const result = parsePosition('top-center');

      // Assert
      expect(result).toEqual({ direction: 'top', alignment: 'center' });
    });

    it('right-bottom을 direction: right, alignment: bottom으로 파싱해야 합니다', () => {
      // Act
      const result = parsePosition('right-bottom');

      // Assert
      expect(result).toEqual({ direction: 'right', alignment: 'bottom' });
    });

    it('left-top을 direction: left, alignment: top으로 파싱해야 합니다', () => {
      // Act
      const result = parsePosition('left-top');

      // Assert
      expect(result).toEqual({ direction: 'left', alignment: 'top' });
    });
  });

  describe('calculateAlignmentX 함수 (top/bottom 방향일 때)', () => {
    it('alignment가 left일 때 anchor의 left 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentX(anchorRect, popperSize.width, 'left');

      // Assert
      expect(result).toBe(200); // anchorRect.left
    });

    it('alignment가 center일 때 중앙 정렬된 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentX(anchorRect, popperSize.width, 'center');

      // Assert
      // anchorRect.left + (anchorRect.width - popperWidth) / 2
      // 200 + (100 - 120) / 2 = 200 - 10 = 190
      expect(result).toBe(190);
    });

    it('alignment가 right일 때 anchor의 right에 맞춰 정렬된 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentX(anchorRect, popperSize.width, 'right');

      // Assert
      // anchorRect.right - popperWidth = 300 - 120 = 180
      expect(result).toBe(180);
    });
  });

  describe('calculateAlignmentY 함수 (left/right 방향일 때)', () => {
    it('alignment가 top일 때 anchor의 top 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentY(anchorRect, popperSize.height, 'top');

      // Assert
      expect(result).toBe(100); // anchorRect.top
    });

    it('alignment가 center일 때 중앙 정렬된 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentY(anchorRect, popperSize.height, 'center');

      // Assert
      // anchorRect.top + (anchorRect.height - popperHeight) / 2
      // 100 + (50 - 80) / 2 = 100 - 15 = 85
      expect(result).toBe(85);
    });

    it('alignment가 bottom일 때 anchor의 bottom에 맞춰 정렬된 좌표를 반환해야 합니다', () => {
      // Act
      const result = calculateAlignmentY(anchorRect, popperSize.height, 'bottom');

      // Assert
      // anchorRect.bottom - popperHeight = 150 - 80 = 70
      expect(result).toBe(70);
    });
  });

  describe('calculatePosition 함수', () => {
    describe('bottom 방향', () => {
      it('bottom-left: anchor 아래, 왼쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'bottom-left',
          offset,
        });

        // Assert
        // y = anchorRect.bottom + offset = 150 + 4 = 154
        // x = anchorRect.left = 200
        expect(result).toEqual({ x: 200, y: 154 });
      });

      it('bottom-center: anchor 아래, 중앙 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'bottom-center',
          offset,
        });

        // Assert
        // y = anchorRect.bottom + offset = 150 + 4 = 154
        // x = 200 + (100 - 120) / 2 = 190
        expect(result).toEqual({ x: 190, y: 154 });
      });

      it('bottom-right: anchor 아래, 오른쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'bottom-right',
          offset,
        });

        // Assert
        // y = anchorRect.bottom + offset = 150 + 4 = 154
        // x = 300 - 120 = 180
        expect(result).toEqual({ x: 180, y: 154 });
      });
    });

    describe('top 방향', () => {
      it('top-left: anchor 위, 왼쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'top-left',
          offset,
        });

        // Assert
        // y = anchorRect.top - popperHeight - offset = 100 - 80 - 4 = 16
        // x = anchorRect.left = 200
        expect(result).toEqual({ x: 200, y: 16 });
      });

      it('top-center: anchor 위, 중앙 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'top-center',
          offset,
        });

        // Assert
        // y = 100 - 80 - 4 = 16
        // x = 200 + (100 - 120) / 2 = 190
        expect(result).toEqual({ x: 190, y: 16 });
      });

      it('top-right: anchor 위, 오른쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'top-right',
          offset,
        });

        // Assert
        // y = 100 - 80 - 4 = 16
        // x = 300 - 120 = 180
        expect(result).toEqual({ x: 180, y: 16 });
      });
    });

    describe('left 방향', () => {
      it('left-top: anchor 왼쪽, 위쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'left-top',
          offset,
        });

        // Assert
        // x = anchorRect.left - popperWidth - offset = 200 - 120 - 4 = 76
        // y = anchorRect.top = 100
        expect(result).toEqual({ x: 76, y: 100 });
      });

      it('left-center: anchor 왼쪽, 중앙 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'left-center',
          offset,
        });

        // Assert
        // x = 200 - 120 - 4 = 76
        // y = 100 + (50 - 80) / 2 = 85
        expect(result).toEqual({ x: 76, y: 85 });
      });

      it('left-bottom: anchor 왼쪽, 아래쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'left-bottom',
          offset,
        });

        // Assert
        // x = 200 - 120 - 4 = 76
        // y = 150 - 80 = 70
        expect(result).toEqual({ x: 76, y: 70 });
      });
    });

    describe('right 방향', () => {
      it('right-top: anchor 오른쪽, 위쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'right-top',
          offset,
        });

        // Assert
        // x = anchorRect.right + offset = 300 + 4 = 304
        // y = anchorRect.top = 100
        expect(result).toEqual({ x: 304, y: 100 });
      });

      it('right-center: anchor 오른쪽, 중앙 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'right-center',
          offset,
        });

        // Assert
        // x = 300 + 4 = 304
        // y = 100 + (50 - 80) / 2 = 85
        expect(result).toEqual({ x: 304, y: 85 });
      });

      it('right-bottom: anchor 오른쪽, 아래쪽 정렬 좌표를 반환해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'right-bottom',
          offset,
        });

        // Assert
        // x = 300 + 4 = 304
        // y = 150 - 80 = 70
        expect(result).toEqual({ x: 304, y: 70 });
      });
    });

    describe('offset이 0인 경우', () => {
      it('bottom-left: offset 없이 anchor 바로 아래에 위치해야 합니다', () => {
        // Act
        const result = calculatePosition({
          anchorRect,
          popperSize,
          position: 'bottom-left',
          offset: 0,
        });

        // Assert
        expect(result).toEqual({ x: 200, y: 150 });
      });
    });
  });
});
