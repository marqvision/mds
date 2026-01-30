import { useRef, useCallback, useEffect, useLayoutEffect, useMemo, cloneElement, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { usePopperPosition } from './@hooks/usePopperPosition';
import { useControllableState } from './@hooks/useControllableState';
import { useOutsideClickEffect } from './@hooks/useOutsideClickEffect';
import { useSafePolygon } from './@hooks/useSafePolygon';
import {
  DEFAULT_POSITION,
  DEFAULT_TRIGGER,
  DEFAULT_INTERACTIVE,
  DEFAULT_OFFSET,
  DEFAULT_Z_INDEX,
  DEFAULT_CLOSE_DELAY,
  DEFAULT_AUTO_FLIP,
  DEFAULT_CLOSE_ON_ANCHOR_HIDDEN,
  DEFAULT_CLOSE_ON_CLICK_OUTSIDE,
  DEFAULT_CLOSE_ON_ESCAPE,
} from './@constants';
import type { MDSPopperProps } from './@types';

export type { MDSPopperProps, PopperPosition, PopperTrigger } from './@types';

export const MDSPopper = (props: MDSPopperProps) => {
  const {
    children,
    content,
    position = DEFAULT_POSITION,
    trigger = DEFAULT_TRIGGER,
    interactive = DEFAULT_INTERACTIVE,
    offset = DEFAULT_OFFSET,
    zIndex = DEFAULT_Z_INDEX,
    open: controlledOpen,
    onVisibleChange,
    onClose,
    closeDelay = DEFAULT_CLOSE_DELAY,
    autoFlip = DEFAULT_AUTO_FLIP,
    closeOnAnchorHidden = DEFAULT_CLOSE_ON_ANCHOR_HIDDEN,
    closeOnClickOutside = DEFAULT_CLOSE_ON_CLICK_OUTSIDE,
    closeOnEscape = DEFAULT_CLOSE_ON_ESCAPE,
    style,
    className,
  } = props;

  const anchorRef = useRef<Element | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);

  const delayCloseRef = useRef<number>();
  const hoverTimerRef = useRef<number>();
  const handleCloseRef = useRef<() => void>();

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: false,
    onChange: onVisibleChange,
  });

  const { coordinates } = usePopperPosition({
    anchorRef,
    popperRef,
    position,
    offset,
    autoFlip,
    isOpen,
  });

  const handleOpen = useCallback(
    (e: MouseEvent) => {
      anchorRef.current = e.currentTarget;

      if (delayCloseRef.current) {
        window.clearTimeout(delayCloseRef.current);
        delayCloseRef.current = undefined;
      }

      setOpen(true);
    },
    [setOpen]
  );

  const handleClose = useCallback(() => {
    onClose?.();

    if (delayCloseRef.current) {
      window.clearTimeout(delayCloseRef.current);
    }

    delayCloseRef.current = window.setTimeout(() => {
      setOpen(false);
      delayCloseRef.current = undefined;
    }, closeDelay);
  }, [closeDelay, onClose, setOpen]);

  useLayoutEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  const useSafePolygonEnabled = interactive && trigger === 'hover';

  const {
    handleAnchorLeave: safePolygonAnchorLeave,
    handlePopperEnter: safePolygonPopperEnter,
    handlePopperLeave: safePolygonPopperLeave,
  } = useSafePolygon({
    anchorRef,
    popperRef,
    position,
    isOpen,
    enabled: useSafePolygonEnabled,
    onClose: handleClose,
  });

  const handleToggle = useCallback(
    (e: MouseEvent) => {
      if (isOpen && !delayCloseRef.current) {
        handleClose();
      } else {
        handleOpen(e);
      }
    },
    [isOpen, handleClose, handleOpen]
  );

  const handleAnchorMouseEnter = useCallback(
    (e: MouseEvent) => {
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = undefined;
      }
      handleOpen(e);
    },
    [handleOpen]
  );

  const handleAnchorMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (useSafePolygonEnabled) {
        safePolygonAnchorLeave(e.nativeEvent);
      } else {
        if (hoverTimerRef.current) {
          window.clearTimeout(hoverTimerRef.current);
        }
        hoverTimerRef.current = window.setTimeout(() => {
          hoverTimerRef.current = undefined;
          handleClose();
        }, 0);
      }
    },
    [useSafePolygonEnabled, safePolygonAnchorLeave, handleClose]
  );

  const handlePopperMouseEnter = useCallback(() => {
    if (useSafePolygonEnabled) {
      safePolygonPopperEnter();
    }
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = undefined;
    }
  }, [useSafePolygonEnabled, safePolygonPopperEnter]);

  const handlePopperMouseLeave = useCallback(() => {
    if (useSafePolygonEnabled) {
      safePolygonPopperLeave();
      return;
    }

    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = window.setTimeout(() => {
      hoverTimerRef.current = undefined;
      handleClose();
    }, 0);
  }, [useSafePolygonEnabled, safePolygonPopperLeave, handleClose]);

  const handleOutsideClick = useCallback(() => {
    if (!delayCloseRef.current) {
      handleClose();
    }
  }, [handleClose]);

  useOutsideClickEffect([anchorRef, popperRef], handleOutsideClick, {
    enabled: isOpen && closeOnClickOutside && trigger === 'click',
  });

  useEffect(() => {
    return () => {
      if (delayCloseRef.current) {
        window.clearTimeout(delayCloseRef.current);
      }
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeOnEscape, handleClose]);

  useEffect(() => {
    if (!isOpen || !closeOnAnchorHidden) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          handleCloseRef.current?.();
        }
      },
      { threshold: 0 }
    );

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isOpen, closeOnAnchorHidden]);

  const transformStyle = useMemo(() => {
    if (!coordinates) return undefined;
    return `translate(${Math.round(coordinates.x)}px, ${Math.round(coordinates.y)}px)`;
  }, [coordinates]);

  const anchorElement = cloneElement(children, {
    ref: (node: Element | null) => {
      anchorRef.current = node;
      const originalRef = (children as { ref?: unknown }).ref;
      if (typeof originalRef === 'function') {
        originalRef(node);
      } else if (originalRef && typeof originalRef === 'object' && 'current' in originalRef) {
        (originalRef as { current: Element | null }).current = node;
      }
    },
    onClick: (e: MouseEvent) => {
      if (trigger === 'click') {
        handleToggle(e);
      }
      children.props.onClick?.(e);
    },
    onMouseEnter: (e: MouseEvent) => {
      if (trigger === 'hover') {
        handleAnchorMouseEnter(e);
      }
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: MouseEvent) => {
      if (trigger === 'hover') {
        handleAnchorMouseLeave(e);
      }
      children.props.onMouseLeave?.(e);
    },
  });

  const popperElement = isOpen ? (
    <div
      ref={popperRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: transformStyle,
        zIndex,
        visibility: coordinates ? 'visible' : 'hidden',
        ...style,
      }}
      onMouseEnter={interactive && trigger === 'hover' ? handlePopperMouseEnter : undefined}
      onMouseLeave={interactive && trigger === 'hover' ? handlePopperMouseLeave : undefined}
    >
      {content}
    </div>
  ) : null;

  return (
    <>
      {anchorElement}
      {popperElement && createPortal(popperElement, document.body)}
    </>
  );
};
