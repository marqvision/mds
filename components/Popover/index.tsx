import { useRef, MouseEvent, useState, useEffect, useCallback, cloneElement, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { createPortal } from 'react-dom';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { findScrollOffset } from './@utils';
import { Props, StyleProps, Coordinates } from './@type';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const MIN_PADDING = 4;
const TRANSITION = '300ms ease-out';

const Dialog = styled.dialog<{ margin?: number }>`
  animation: ${fadeOut} ${TRANSITION} forwards;
  border: none;
  padding: ${({ margin }) => (margin === undefined ? MIN_PADDING : margin)}px;
  margin: 0;
  overflow: visible;
  background-color: transparent;
  ${({ as }) =>
    as === 'div'
      ? {
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1300,
        }
      : undefined}
  transition: display 0.3s allow-discrete, opacity ${TRANSITION};
  &[open] {
    ${({ as }) =>
      as === 'div'
        ? {
            display: 'block',
          }
        : undefined}
    animation: ${fadeIn} ${TRANSITION} forwards;
    @starting-style {
      opacity: 0;
    }
  }
  ::backdrop {
    background-color: transparent;
  }
`;

const DialogContent = styled.div<StyleProps>`
  position: relative;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16), 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  width: ${({ width }) => width};
  max-height: ${({ maxHeight }) => maxHeight};
  padding: ${({ padding }) => padding};
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
`;

const Popover = (
  props: Props &
    StyleProps & {
      isOpen: boolean;
      anchorRef: MutableRefObject<(EventTarget & Element) | null>;
      dialogRef: MutableRefObject<HTMLDialogElement | null>;
      focusRef: MutableRefObject<boolean>;
      onMouseEnter: (e: MouseEvent) => void;
      onMouseLeave: ((e: MouseEvent) => void) | undefined;
      onClosePopover: () => void;
    }
) => {
  const {
    hasDim = false,
    zIndex,
    position = 'bottom-right',
    isLoading,
    width = '280px',
    maxHeight: _maxHeight = '480px',
    padding = '16px 20px',
    children: _children,
    isOpen,
    anchorRef,
    dialogRef,
    focusRef,
    style,
    margin: _margin,
    onMouseEnter,
    onMouseLeave,
    onClosePopover,
  } = props;

  const margin = _margin === undefined ? MIN_PADDING : _margin;

  const maxHeight = typeof _maxHeight === 'number' ? _maxHeight : Number(_maxHeight.replace(/\D/g, ''));

  const [init, setInit] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const scrollOffsetRef = useRef<HTMLElement | Window>();
  const coordinatesRef = useRef<Coordinates>();
  const closeRef = useRef(onClosePopover);

  const setPosition = useCallback(() => {
    if (!init) {
      setInit(true);
      return;
    }
    const target = anchorRef.current;

    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();

    const dialogWidth = dialogRef.current?.clientWidth || 0;
    const dialogHeight = dialogRef.current?.clientHeight || 0;

    const contentWidth = dialogRef.current?.children[0]?.clientWidth || 0;

    const reposition = (value: Coordinates) => {
      const { innerWidth, innerHeight } = window;

      const x = Math.min(Math.max(value.x, 0), innerWidth - dialogWidth);
      const y = Math.min(Math.max(value.y, 0), innerHeight - dialogHeight);

      return {
        x: x > 0 ? x : value.x,
        y: y > 0 ? y : value.y,
      };
    };

    const [anchor, direction] = position.split('-');

    if (!coordinatesRef.current) {
      setTimeout(() => {
        setPosition();
      }, 0);
    }

    const verticalX =
      direction === 'left'
        ? rect.left + rect.width - contentWidth - margin
        : direction === 'center'
        ? rect.left + (rect.width - contentWidth) / 2 - margin
        : rect.left - margin;

    const horizontalY =
      direction === 'top'
        ? rect.top + rect.height - dialogHeight + margin
        : direction === 'center'
        ? rect.top - dialogHeight / 2 + rect.height / 2
        : rect.top - margin;

    switch (anchor) {
      case 'bottom': {
        coordinatesRef.current = reposition({
          x: verticalX,
          y: rect.top + rect.height,
        });
        break;
      }
      case 'top': {
        coordinatesRef.current = reposition({
          x: verticalX,
          y: rect.top - dialogHeight,
        });
        break;
      }
      case 'left': {
        coordinatesRef.current = reposition({
          x: rect.x - dialogWidth,
          y: horizontalY,
        });
        break;
      }
      case 'right': {
        coordinatesRef.current = reposition({
          x: rect.x + rect.width,
          y: horizontalY,
        });
        break;
      }
    }
    setCoordinates(coordinatesRef.current);
  }, [init, position, anchorRef, dialogRef, margin]);

  const handleScroll = useCallback(() => {
    setPosition();

    if (anchorRef.current) {
      const top = anchorRef.current.getBoundingClientRect().top;
      const anchorHeight = anchorRef.current.clientHeight;

      if (top < anchorHeight * -1) {
        closeRef.current();
      } else if (top > window.innerHeight) {
        closeRef.current();
      }
    }
  }, [setPosition, anchorRef]);

  const children = isLoading ? (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0', minWidth: '100%' }}
    >
      <MDSLoadingIndicator size={24} strokeWidth={2} />
    </div>
  ) : typeof _children === 'function' ? (
    _children({
      close: onClosePopover,
    })
  ) : (
    _children
  );

  const dialog = (
    <Dialog
      className="mds-popover"
      as={!hasDim ? 'div' : undefined}
      ref={dialogRef}
      margin={margin}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClosePopover}
      style={{
        transform: `translate(${Math.max(coordinates?.x || 0, 0)}px, ${Math.max(coordinates?.y || 0, 0)}px)`,
        zIndex,
      }}
    >
      {coordinates && (
        <DialogContent
          width={typeof width === 'string' ? width : `${width}px`}
          maxHeight={`${maxHeight}px`}
          padding={padding}
          style={{ display: init ? 'block' : 'none', ...style }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </DialogContent>
      )}
    </Dialog>
  );

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setPosition();
    });
    if (dialogRef.current) {
      observer.observe(dialogRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isOpen, dialogRef, setPosition]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setPosition();
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, [setPosition]);

  if (anchorRef.current) {
    scrollOffsetRef.current = findScrollOffset(anchorRef.current);
  }

  useEffect(() => {
    if (isOpen) {
      focusRef.current = true;
      if (hasDim) {
        dialogRef.current?.showModal();
      } else if (anchorRef.current) {
        scrollOffsetRef.current?.addEventListener('scroll', handleScroll);
        dialogRef.current?.toggleAttribute('open');
      }
      setPosition();
    } else {
      scrollOffsetRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isOpen, setPosition, hasDim, anchorRef, dialogRef, focusRef, scrollOffsetRef]);

  useEffect(() => {
    return () => {
      scrollOffsetRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    closeRef.current = onClosePopover;
  }, [onClosePopover]);

  return isOpen ? (hasDim ? dialog : createPortal(dialog, document.body)) : undefined;
};

/**
 * @description 특정 Element 의 위치를 기준으로 생성되는 Popover
 * @param {ReactElement} [props.anchor] 모달의 기준이 되는 element
 * @param {PopoverTrigger} [props.trigger] 모달 열리는 액션
 * @param {PopoverPosition} [props.posiiton] 모달의 anchor에 대한 상대적 위치
 * @param {boolean} [props.hasDim] 배경 dim 의 유/무
 * @param {number} [props.zIndex] <code>hasDim: false</code> 인 경우 zIndex 추가 가능
 * @param props.children ReactElement | (onClose) => ReactElement
 */
export const MDSPopover = (props: Props & StyleProps) => {
  const {
    anchor: _anchor,
    forwardRef,
    hasDim = false,
    trigger = 'click',
    delay = 300,
    onClose,
    onVisibleChange,
  } = props;

  const anchorRef = useRef<(EventTarget & Element) | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const focusRef = useRef(false);
  const timeoutRef = useRef<number>();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopover = (e: MouseEvent) => {
    anchorRef.current = e.currentTarget;
    if (forwardRef) {
      forwardRef.current = e.currentTarget;
    }
    onVisibleChange?.(true);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
      setIsOpen(false);
      window.setTimeout(() => {
        setIsOpen(true);
      }, 0);
    } else {
      setIsOpen(true);
    }
  };

  const handleClosePopover = useCallback(() => {
    if (hasDim) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.removeAttribute('open');
    }
    onClose?.();
    onVisibleChange?.(false);
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = undefined;
    }, delay);
  }, [delay, hasDim, onClose, onVisibleChange]);

  const handleMouseEnter = () => {
    focusRef.current = true;
  };

  const handleMouseLeave =
    !hasDim && trigger === 'hover'
      ? () => {
          focusRef.current = false;
          setTimeout(() => {
            if (!focusRef.current) {
              handleClosePopover();
            }
          }, 0);
        }
      : undefined;

  const isAnchorFunction = typeof _anchor === 'function';
  const anchor = isAnchorFunction ? _anchor({ open: handleOpenPopover, close: handleClosePopover }) : _anchor;

  const anchorEle = cloneElement(anchor, {
    ...(isAnchorFunction
      ? undefined
      : {
          onClick: (e: MouseEvent) => {
            if (trigger === 'click') {
              if (isOpen) {
                handleClosePopover();
              } else {
                handleOpenPopover(e);
              }
            }
            anchor.props.onClick?.(e);
          },
        }),
    onMouseEnter: (e: MouseEvent) => {
      if (trigger === 'hover') {
        handleOpenPopover(e);
      }
      handleMouseEnter();
    },
    onMouseLeave: handleMouseLeave,
  });

  useEffect(() => {
    if (!hasDim && trigger === 'click') {
      const dimmed = anchorRef.current?.closest('.mds-dimmed');

      const handleBodyClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const isIn = dialogRef.current?.contains(target) || anchorRef.current?.contains(target);
        const isDimmed = target.closest?.('.mds-dimmed') && target.closest?.('.mds-dimmed') !== dimmed;
        const isPopover = target.closest?.('.mds-popover');
        const isNotDelete = target.closest?.('.mds-delete-icon');

        if ((!isIn && !isDimmed && !isPopover) || (isIn && !!isNotDelete)) {
          handleClosePopover();
        }
      };
      if (isOpen) {
        document.body.addEventListener('click', handleBodyClick, { capture: true });
      }
      return () => {
        document.body.removeEventListener('click', handleBodyClick, { capture: true });
      };
    }
  }, [hasDim, trigger, isOpen, handleClosePopover]);

  return (
    <>
      {anchorEle}
      <Popover
        {...props}
        isOpen={isOpen}
        anchorRef={anchorRef}
        dialogRef={dialogRef}
        focusRef={focusRef}
        onClosePopover={handleClosePopover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.children}
      </Popover>
    </>
  );
};
