import type { Coordinates, PopperSize, BoundaryOverflow, ViewportSize, PopperPosition } from '../@types';

const DEFAULT_PADDING = 4;

/**
 * 좌표가 viewport를 벗어나는지 확인합니다.
 *
 * @param coordinates - popper의 좌표
 * @param popperSize - popper 요소의 크기
 * @param viewportSize - viewport 크기
 * @returns 각 방향별 overflow 여부
 */
export function detectOverflow(
  coordinates: Coordinates,
  popperSize: PopperSize,
  viewportSize: ViewportSize
): BoundaryOverflow {
  return {
    top: coordinates.y < 0,
    bottom: coordinates.y + popperSize.height > viewportSize.height,
    left: coordinates.x < 0,
    right: coordinates.x + popperSize.width > viewportSize.width,
  };
}

/**
 * overflow 발생 시 반대 방향 position을 반환합니다.
 *
 * @param position - 현재 position
 * @param overflow - overflow 정보
 * @returns 반전된 position
 */
export function getFlippedPosition(position: PopperPosition, overflow: BoundaryOverflow): PopperPosition {
  const [direction, alignment] = position.split('-');

  let flippedDirection = direction;

  if (direction === 'top' && overflow.top) {
    flippedDirection = 'bottom';
  } else if (direction === 'bottom' && overflow.bottom) {
    flippedDirection = 'top';
  } else if (direction === 'left' && overflow.left) {
    flippedDirection = 'right';
  } else if (direction === 'right' && overflow.right) {
    flippedDirection = 'left';
  }

  return `${flippedDirection}-${alignment}` as PopperPosition;
}

/**
 * viewport 내에 들어오도록 좌표를 조정합니다 (clamp).
 *
 * @param coordinates - 원래 좌표
 * @param popperSize - popper 크기
 * @param viewportSize - viewport 크기
 * @param padding - viewport 가장자리 여백 (기본값: 4)
 * @returns 조정된 좌표
 */
export function clampToViewport(
  coordinates: Coordinates,
  popperSize: PopperSize,
  viewportSize: ViewportSize,
  padding: number = DEFAULT_PADDING
): Coordinates {
  const minX = padding;
  const minY = padding;
  const maxX = viewportSize.width - popperSize.width - padding;
  const maxY = viewportSize.height - popperSize.height - padding;

  return {
    x: Math.max(minX, Math.min(coordinates.x, maxX)),
    y: Math.max(minY, Math.min(coordinates.y, maxY)),
  };
}
