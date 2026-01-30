import { describe, it, expect } from 'vitest';
import { isPointInPolygon, isPointInRect, getSafePolygon, isInSafeZone } from './safePolygon';

describe('safePolygon', () => {
  describe('isPointInPolygon', () => {
    it('삼각형 내부의 점을 올바르게 감지한다', () => {
      const triangle: [number, number][] = [
        [0, 0],
        [10, 0],
        [5, 10],
      ];

      // 삼각형 내부
      expect(isPointInPolygon([5, 3], triangle)).toBe(true);

      // 삼각형 외부
      expect(isPointInPolygon([0, 10], triangle)).toBe(false);
      expect(isPointInPolygon([-1, 0], triangle)).toBe(false);
    });

    it('사각형 내부의 점을 올바르게 감지한다', () => {
      const rect: [number, number][] = [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10],
      ];

      expect(isPointInPolygon([5, 5], rect)).toBe(true);
      expect(isPointInPolygon([0, 0], rect)).toBe(false); // 경계는 외부
      expect(isPointInPolygon([15, 5], rect)).toBe(false);
    });
  });

  describe('isPointInRect', () => {
    const rect = { x: 0, y: 0, width: 100, height: 50 };

    it('사각형 내부의 점을 올바르게 감지한다', () => {
      expect(isPointInRect([50, 25], rect)).toBe(true);
      expect(isPointInRect([0, 0], rect)).toBe(true); // 경계 포함
      expect(isPointInRect([100, 50], rect)).toBe(true); // 경계 포함
    });

    it('사각형 외부의 점을 올바르게 감지한다', () => {
      expect(isPointInRect([-1, 25], rect)).toBe(false);
      expect(isPointInRect([101, 25], rect)).toBe(false);
      expect(isPointInRect([50, -1], rect)).toBe(false);
      expect(isPointInRect([50, 51], rect)).toBe(false);
    });
  });

  describe('getSafePolygon', () => {
    const anchorRect = { x: 100, y: 100, width: 50, height: 30 };
    const buffer = 2;
    const cursorBuffer = 10; // 내부적으로 사용되는 커서 확장 값

    it('bottom position일 때 커서에서 popper 상단으로 삼각형을 생성한다', () => {
      const popperRect = { x: 100, y: 140, width: 80, height: 60 };
      const cursorPoint: [number, number] = [125, 130];

      const polygon = getSafePolygon({
        cursorPoint,
        anchorRect,
        popperRect,
        position: 'bottom-center',
        buffer,
      });

      expect(polygon).toHaveLength(3);
      // 확장된 커서 위치 (bottom이므로 y - cursorBuffer)
      expect(polygon[0]).toEqual([cursorPoint[0], cursorPoint[1] - cursorBuffer]);
      // popper 상단 왼쪽 모서리 (buffer 적용)
      expect(polygon[1]).toEqual([popperRect.x - buffer, popperRect.y - buffer]);
      // popper 상단 오른쪽 모서리 (buffer 적용)
      expect(polygon[2]).toEqual([popperRect.x + popperRect.width + buffer, popperRect.y - buffer]);
    });

    it('top position일 때 커서에서 popper 하단으로 삼각형을 생성한다', () => {
      const popperRect = { x: 100, y: 40, width: 80, height: 50 };
      const cursorPoint: [number, number] = [125, 95];

      const polygon = getSafePolygon({
        cursorPoint,
        anchorRect,
        popperRect,
        position: 'top-center',
        buffer,
      });

      expect(polygon).toHaveLength(3);
      // 확장된 커서 위치 (top이므로 y + cursorBuffer)
      expect(polygon[0]).toEqual([cursorPoint[0], cursorPoint[1] + cursorBuffer]);
      // popper 하단 왼쪽 모서리
      expect(polygon[1]).toEqual([popperRect.x - buffer, popperRect.y + popperRect.height + buffer]);
      // popper 하단 오른쪽 모서리
      expect(polygon[2]).toEqual([
        popperRect.x + popperRect.width + buffer,
        popperRect.y + popperRect.height + buffer,
      ]);
    });

    it('left position일 때 커서에서 popper 오른쪽으로 삼각형을 생성한다', () => {
      const popperRect = { x: 20, y: 100, width: 70, height: 40 };
      const cursorPoint: [number, number] = [95, 115];

      const polygon = getSafePolygon({
        cursorPoint,
        anchorRect,
        popperRect,
        position: 'left-center',
        buffer,
      });

      expect(polygon).toHaveLength(3);
      // 확장된 커서 위치 (left이므로 x + cursorBuffer)
      expect(polygon[0]).toEqual([cursorPoint[0] + cursorBuffer, cursorPoint[1]]);
      // popper 오른쪽 상단 모서리
      expect(polygon[1]).toEqual([popperRect.x + popperRect.width + buffer, popperRect.y - buffer]);
      // popper 오른쪽 하단 모서리
      expect(polygon[2]).toEqual([
        popperRect.x + popperRect.width + buffer,
        popperRect.y + popperRect.height + buffer,
      ]);
    });

    it('right position일 때 커서에서 popper 왼쪽으로 삼각형을 생성한다', () => {
      const popperRect = { x: 160, y: 100, width: 70, height: 40 };
      const cursorPoint: [number, number] = [155, 115];

      const polygon = getSafePolygon({
        cursorPoint,
        anchorRect,
        popperRect,
        position: 'right-center',
        buffer,
      });

      expect(polygon).toHaveLength(3);
      // 확장된 커서 위치 (right이므로 x - cursorBuffer)
      expect(polygon[0]).toEqual([cursorPoint[0] - cursorBuffer, cursorPoint[1]]);
      // popper 왼쪽 상단 모서리
      expect(polygon[1]).toEqual([popperRect.x - buffer, popperRect.y - buffer]);
      // popper 왼쪽 하단 모서리
      expect(polygon[2]).toEqual([popperRect.x - buffer, popperRect.y + popperRect.height + buffer]);
    });
  });

  describe('isInSafeZone', () => {
    const popperRect = { x: 100, y: 150, width: 80, height: 60 };
    const cursorPoint: [number, number] = [140, 140];
    const polygon = getSafePolygon({
      cursorPoint,
      anchorRect: { x: 100, y: 100, width: 50, height: 30 },
      popperRect,
      position: 'bottom-center',
      buffer: 2,
    });

    it('popper 영역 내부는 safe zone이다', () => {
      expect(isInSafeZone([140, 180], polygon, popperRect)).toBe(true);
      expect(isInSafeZone([100, 150], polygon, popperRect)).toBe(true);
    });

    it('삼각형 영역 내부는 safe zone이다', () => {
      // 커서에서 popper 상단 사이의 점
      expect(isInSafeZone([140, 145], polygon, popperRect)).toBe(true);
    });

    it('삼각형과 popper 영역 외부는 safe zone이 아니다', () => {
      expect(isInSafeZone([50, 145], polygon, popperRect)).toBe(false);
      expect(isInSafeZone([200, 200], polygon, popperRect)).toBe(false);
    });
  });
});
