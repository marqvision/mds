import { useCallback, useRef, useEffect, RefObject } from 'react';
import { getSafePolygon, isInSafeZone } from '../@utils/safePolygon';
import type { PopperPosition } from '../@types';

type Point = [x: number, y: number];
type Polygon = Point[];

type UseSafePolygonParams = {
  anchorRef: RefObject<Element | null>;
  popperRef: RefObject<HTMLElement | null>;
  position: PopperPosition;
  isOpen: boolean;
  enabled: boolean;
  onClose: () => void;
  buffer?: number;
};

/**
 * Safe Triangle/Polygon 패턴을 구현하는 훅
 *
 * anchor에서 popper로 마우스를 이동할 때, 그 사이 공백 영역에서
 * popper가 닫히는 것을 방지합니다.
 *
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */
export function useSafePolygon(params: UseSafePolygonParams) {
  const { anchorRef, popperRef, position, isOpen, enabled, onClose, buffer = 2 } = params;

  const polygonRef = useRef<Polygon | null>(null);
  const isTrackingRef = useRef(false);

  /**
   * anchor에서 mouseLeave 시 호출
   * 커서 위치를 기준으로 safe polygon 생성 및 추적 시작
   */
  const handleAnchorLeave = useCallback(
    (event: MouseEvent) => {
      if (!enabled || !isOpen) return;

      const popper = popperRef.current;
      if (!popper) return;

      const popperRect = popper.getBoundingClientRect();
      const cursorPoint: Point = [event.clientX, event.clientY];

      // popper 위에 이미 있으면 추적 불필요
      if (
        cursorPoint[0] >= popperRect.x &&
        cursorPoint[0] <= popperRect.x + popperRect.width &&
        cursorPoint[1] >= popperRect.y &&
        cursorPoint[1] <= popperRect.y + popperRect.height
      ) {
        return;
      }

      // safe polygon 생성
      polygonRef.current = getSafePolygon({
        cursorPoint,
        anchorRect: anchorRef.current?.getBoundingClientRect() ?? {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        popperRect,
        position,
        buffer,
      });

      isTrackingRef.current = true;
    },
    [enabled, isOpen, popperRef, anchorRef, position, buffer]
  );

  /**
   * popper에 mouseEnter 시 추적 중지
   */
  const handlePopperEnter = useCallback(() => {
    isTrackingRef.current = false;
    polygonRef.current = null;
  }, []);

  /**
   * popper에서 mouseLeave 시 닫기
   */
  const handlePopperLeave = useCallback(() => {
    if (!enabled) return;
    isTrackingRef.current = false;
    polygonRef.current = null;
    onClose();
  }, [enabled, onClose]);

  useEffect(() => {
    if (!enabled || !isOpen) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isTrackingRef.current || !polygonRef.current) return;

      const popper = popperRef.current;
      if (!popper) return;

      const popperRect = popper.getBoundingClientRect();
      const mousePoint: Point = [event.clientX, event.clientY];

      const inSafeZone = isInSafeZone(mousePoint, polygonRef.current, popperRect);

      if (!inSafeZone) {
        isTrackingRef.current = false;
        polygonRef.current = null;
        onClose();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled, isOpen, popperRef, onClose, buffer]);

  useEffect(() => {
    if (!isOpen) {
      isTrackingRef.current = false;
      polygonRef.current = null;
    }
  }, [isOpen]);

  return {
    handleAnchorLeave,
    handlePopperEnter,
    handlePopperLeave,
  };
}
