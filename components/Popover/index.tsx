import { useRef, MouseEvent, useState, useEffect, useCallback, cloneElement, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { createPortal } from 'react-dom';
import { MDSIcon } from '../Icon';
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

const Dialog = styled.dialog`
  animation: ${fadeOut} 0.3s ease-out forwards;
  border: none;
  padding: ${MIN_PADDING}px;
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
  transition: display 0.3s allow-discrete, overlay 0.3s allow-discrete, opacity 0.3s;
  &[open] {
    ${({ as }) =>
      as === 'div'
        ? {
            display: 'block',
          }
        : undefined}
    animation: ${fadeIn} 0.3s ease-out forwards;
    @starting-style {
      opacity: 0;
    }
  }
  ::backdrop {
    background-color: transparent;
  }
`;

const DialogContent = styled.div<StyleProps>`
  box-shadow:
    0 0 2px 0 rgba(0, 0, 0, 0.16),
    0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  width: ${({ width }) => width};
  max-height: ${({ maxHeight }) => maxHeight};
  padding: ${({ padding }) => padding};
  overflow: auto;
  height: 100%;
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
    onMouseEnter,
    onMouseLeave,
    onClosePopover,
  } = props;

  const maxHeight = typeof _maxHeight === 'number' ? _maxHeight : Number(_maxHeight.replace(/\D/g, ''));

  const [init, setInit] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates>();

  const scrollOffsetRef = useRef<HTMLElement | Window>();
  const coordinatesRef = useRef<Coordinates>({ x: 0, y: 0 });
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
      const { clientWidth, clientHeight } = window.document.body;

      const x = Math.min(Math.max(value.x, 0), clientWidth - dialogWidth);
      const y = Math.min(Math.max(value.y, 0), clientHeight - dialogHeight);

      return {
        x: x > 0 ? x : value.x,
        y: y > 0 ? y : value.y,
      };
    };

    const [anchor, direction] = position.split('-');

    const verticalX =
      direction === 'left'
        ? rect.left + rect.width - contentWidth - MIN_PADDING
        : direction === 'center'
          ? rect.left + (rect.width - contentWidth) / 2 - MIN_PADDING
          : rect.left - MIN_PADDING;

    const horizontalY =
      direction === 'top'
        ? rect.top + rect.height - dialogHeight + MIN_PADDING
        : direction === 'center'
          ? rect.top - dialogHeight / 2 + rect.height / 2
          : rect.top - MIN_PADDING;

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
  }, [init, position, anchorRef, dialogRef]);

  const handleScroll = useCallback(() => {
    setPosition();
    const { y } = coordinatesRef.current;

    const offsetTop = (scrollOffsetRef.current as HTMLElement)?.offsetTop || 0;

    if (y < offsetTop) {
      closeRef.current();
    } else {
      const bottom = y + (dialogRef.current?.clientHeight || 0);
      const max =
        offsetTop + ((scrollOffsetRef.current as HTMLElement)?.clientHeight || window.document.body.offsetHeight);
      if (bottom >= max) {
        closeRef.current();
      }
    }
  }, [setPosition, dialogRef]);

  const children = isLoading ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MDSIcon.IndicatorCircle size={24} />
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClosePopover}
      style={{ transform: `translate(${coordinates?.x || 0}px, ${coordinates?.y || 0}px)`, zIndex }}
    >
      <DialogContent
        width={typeof width === 'string' ? width : `${width}px`}
        maxHeight={`${maxHeight}px`}
        padding={padding}
        style={{ display: init ? 'block' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DialogContent>
    </Dialog>
  );

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
    return () => {
      scrollOffsetRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, isOpen, setPosition, hasDim, anchorRef, dialogRef, focusRef, scrollOffsetRef]);

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
  const { anchor: _anchor, hasDim = false, trigger = 'click', delay = 300, onClose } = props;

  const anchorRef = useRef<(EventTarget & Element) | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const focusRef = useRef(false);
  const timeoutRef = useRef<number>();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopover = (e: MouseEvent) => {
    anchorRef.current = e.currentTarget;
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
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = undefined;
    }, delay);
  }, [delay, hasDim, onClose]);

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

        if (!isIn && !isDimmed && !isPopover) {
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
