import { useState, useCallback, useLayoutEffect, RefObject } from 'react';
import { calculatePosition } from '../@utils/calculatePosition';
import { detectOverflow, getFlippedPosition, clampToViewport } from '../@utils/detectBoundary';
import type { PopperPosition, Coordinates, AnchorRect, PopperSize, ViewportSize } from '../@types';

type UsePopperPositionParams = {
  anchorRef: RefObject<Element | null>;
  popperRef: RefObject<HTMLElement | null>;
  position?: PopperPosition;
  offset?: number;
  autoFlip?: boolean;
  isOpen: boolean;
};

type UsePopperPositionReturn = {
  coordinates: Coordinates | null;
  updatePosition: () => void;
};

const toAnchorRect = (rect: DOMRect): AnchorRect => ({
  top: rect.top,
  left: rect.left,
  right: rect.right,
  bottom: rect.bottom,
  width: rect.width,
  height: rect.height,
});

const resolveCoordinates = (params: {
  anchorRect: AnchorRect;
  popperSize: PopperSize;
  viewportSize: ViewportSize;
  position: PopperPosition;
  offset: number;
  autoFlip: boolean;
}): Coordinates => {
  const { anchorRect, popperSize, viewportSize, position, offset, autoFlip } = params;

  let coords = calculatePosition({ anchorRect, popperSize, position, offset });

  if (autoFlip) {
    const overflow = detectOverflow(coords, popperSize, viewportSize);
    const hasOverflow = overflow.top || overflow.bottom || overflow.left || overflow.right;

    if (hasOverflow) {
      const flippedPosition = getFlippedPosition(position, overflow);
      if (flippedPosition !== position) {
        coords = calculatePosition({ anchorRect, popperSize, position: flippedPosition, offset });
      }
    }
  }

  return clampToViewport(coords, popperSize, viewportSize);
};

export function usePopperPosition(params: UsePopperPositionParams): UsePopperPositionReturn {
  const { anchorRef, popperRef, position = 'bottom-left', offset = 4, autoFlip = true, isOpen } = params;

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const popper = popperRef.current;

    if (!anchor || !popper) return;

    const coords = resolveCoordinates({
      anchorRect: toAnchorRect(anchor.getBoundingClientRect()),
      popperSize: { width: popper.offsetWidth, height: popper.offsetHeight },
      viewportSize: { width: window.innerWidth, height: window.innerHeight },
      position,
      offset,
      autoFlip,
    });

    setCoordinates(coords);
  }, [anchorRef, popperRef, position, offset, autoFlip]);

  useLayoutEffect(() => {
    if (!isOpen) {
      setCoordinates(null);
      return;
    }

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    if (popperRef.current) {
      resizeObserver.observe(popperRef.current);
    }

    window.addEventListener('scroll', updatePosition, { capture: true, passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updatePosition, { capture: true });
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, popperRef, updatePosition]);

  return {
    coordinates,
    updatePosition,
  };
}
