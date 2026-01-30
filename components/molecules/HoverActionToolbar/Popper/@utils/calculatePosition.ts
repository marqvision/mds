import type { PopperPosition, Coordinates, AnchorRect, PopperSize } from '../@types';

type CalculatePositionParams = {
  anchorRect: AnchorRect;
  popperSize: PopperSize;
  position: PopperPosition;
  offset: number;
};

/**
 * position 문자열을 direction과 alignment로 파싱합니다.
 *
 * @param position - 예: 'bottom-left', 'top-center'
 * @returns { direction, alignment }
 */
export function parsePosition(position: PopperPosition): {
  direction: 'top' | 'bottom' | 'left' | 'right';
  alignment: 'left' | 'center' | 'right' | 'top' | 'bottom';
} {
  const [direction, alignment] = position.split('-') as [
    'top' | 'bottom' | 'left' | 'right',
    'left' | 'center' | 'right' | 'top' | 'bottom'
  ];
  return { direction, alignment };
}

/**
 * 수직 방향(top/bottom)일 때 X 좌표를 계산합니다.
 */
export function calculateAlignmentX(
  anchorRect: AnchorRect,
  popperWidth: number,
  alignment: 'left' | 'center' | 'right'
): number {
  switch (alignment) {
    case 'left':
      return anchorRect.left;
    case 'center':
      return anchorRect.left + (anchorRect.width - popperWidth) / 2;
    case 'right':
      return anchorRect.right - popperWidth;
  }
}

/**
 * 수평 방향(left/right)일 때 Y 좌표를 계산합니다.
 */
export function calculateAlignmentY(
  anchorRect: AnchorRect,
  popperHeight: number,
  alignment: 'top' | 'center' | 'bottom'
): number {
  switch (alignment) {
    case 'top':
      return anchorRect.top;
    case 'center':
      return anchorRect.top + (anchorRect.height - popperHeight) / 2;
    case 'bottom':
      return anchorRect.bottom - popperHeight;
  }
}

/**
 * anchor 기준으로 popper의 좌표를 계산합니다.
 *
 * @param params.anchorRect - anchor 요소의 DOMRect
 * @param params.popperSize - popper 요소의 크기
 * @param params.position - 원하는 위치 (예: 'bottom-left', 'top-center')
 * @param params.offset - anchor와 popper 사이 간격
 * @returns { x, y } 좌표
 */
export function calculatePosition(params: CalculatePositionParams): Coordinates {
  const { anchorRect, popperSize, position, offset } = params;
  const { direction, alignment } = parsePosition(position);

  let x: number;
  let y: number;

  switch (direction) {
    case 'bottom':
      y = anchorRect.bottom + offset;
      x = calculateAlignmentX(anchorRect, popperSize.width, alignment as 'left' | 'center' | 'right');
      break;
    case 'top':
      y = anchorRect.top - popperSize.height - offset;
      x = calculateAlignmentX(anchorRect, popperSize.width, alignment as 'left' | 'center' | 'right');
      break;
    case 'left':
      x = anchorRect.left - popperSize.width - offset;
      y = calculateAlignmentY(anchorRect, popperSize.height, alignment as 'top' | 'center' | 'bottom');
      break;
    case 'right':
      x = anchorRect.right + offset;
      y = calculateAlignmentY(anchorRect, popperSize.height, alignment as 'top' | 'center' | 'bottom');
      break;
  }

  return { x, y };
}
