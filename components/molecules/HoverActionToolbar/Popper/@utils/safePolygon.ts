import type { PopperPosition } from '../@types';

type Point = [x: number, y: number];
type Polygon = Point[];
type Rect = { x: number; y: number; width: number; height: number };

/**
 * Ray casting algorithm을 사용하여 점이 다각형 내부에 있는지 확인
 * @see https://en.wikipedia.org/wiki/Point_in_polygon
 */
export function isPointInPolygon(point: Point, polygon: Polygon): boolean {
  const [x, y] = point;
  let isInside = false;
  const length = polygon.length;

  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}

/**
 * 점이 사각형 내부에 있는지 확인
 */
export function isPointInRect(point: Point, rect: Rect): boolean {
  return (
    point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height
  );
}

type GetSafePolygonParams = {
  cursorPoint: Point;
  anchorRect: Rect;
  popperRect: Rect;
  position: PopperPosition;
  buffer?: number;
};

/**
 * anchor에서 popper로 이동할 때 안전한 영역(삼각형/사각형)을 생성
 *
 * 커서 위치에서 popper의 두 모서리까지 삼각형을 만들어
 * 사용자가 대각선으로 이동해도 닫히지 않도록 함
 */
export function getSafePolygon(params: GetSafePolygonParams): Polygon {
  const { cursorPoint, popperRect, position, buffer = 2 } = params;

  const direction = position.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';

  // 커서 위치를 anchor 방향으로 확장 (꼭짓점이 삼각형 내부에 포함되도록)
  const cursorBuffer = 10;
  let expandedCursor: Point;

  switch (direction) {
    case 'top':
      expandedCursor = [cursorPoint[0], cursorPoint[1] + cursorBuffer];
      break;
    case 'bottom':
      expandedCursor = [cursorPoint[0], cursorPoint[1] - cursorBuffer];
      break;
    case 'left':
      expandedCursor = [cursorPoint[0] + cursorBuffer, cursorPoint[1]];
      break;
    case 'right':
      expandedCursor = [cursorPoint[0] - cursorBuffer, cursorPoint[1]];
      break;
  }

  const popperTopLeft: Point = [popperRect.x - buffer, popperRect.y - buffer];
  const popperTopRight: Point = [popperRect.x + popperRect.width + buffer, popperRect.y - buffer];
  const popperBottomLeft: Point = [popperRect.x - buffer, popperRect.y + popperRect.height + buffer];
  const popperBottomRight: Point = [
    popperRect.x + popperRect.width + buffer,
    popperRect.y + popperRect.height + buffer,
  ];

  switch (direction) {
    case 'top':
      return [expandedCursor, popperBottomLeft, popperBottomRight];
    case 'bottom':
      return [expandedCursor, popperTopLeft, popperTopRight];
    case 'left':
      return [expandedCursor, popperTopRight, popperBottomRight];
    case 'right':
      return [expandedCursor, popperTopLeft, popperBottomLeft];
  }
}

/**
 * 마우스 포인터가 safe zone(삼각형 또는 popper 영역) 안에 있는지 확인
 */
export function isInSafeZone(mousePoint: Point, polygon: Polygon, popperRect: Rect): boolean {
  return isPointInPolygon(mousePoint, polygon) || isPointInRect(mousePoint, popperRect);
}
