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
          zIndex: 1301,
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
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16), 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  width: ${({ width }) => width};
  max-height: ${({ maxHeight }) => maxHeight};
  padding: ${({ padding }) => padding};
  overflow: hidden;
`;

const Popover = (
  props: Props &
    StyleProps & {
      isOpen: boolean;
      anchorRef: MutableRefObject<(EventTarget & Element) | null>;
      dialogRef: MutableRefObject<HTMLDialogElement | null>;
      scrollOffsetRef: MutableRefObject<Element | undefined>;
      coordinatesRef: MutableRefObject<Coordinates>;
      focusRef: MutableRefObject<boolean>;
      onMouseEnter: (e: MouseEvent) => void;
      onMouseLeave: (() => void) | undefined;
      onClosePopover: () => void;
    }
) => {
  const {
    hasDim = true,
    position = 'bottom-right',
    isLoading,
    width: _width = '280px',
    maxHeight: _maxHeight = '480px',
    padding = '16px 20px',
    children: _children,
    isOpen,
    anchorRef,
    dialogRef,
    scrollOffsetRef,
    coordinatesRef,
    focusRef,
    onMouseEnter,
    onMouseLeave,
    onClosePopover,
  } = props;

  const width = typeof _width === 'number' ? _width : Number(_width.replace(/\D/g, ''));
  const maxHeight = typeof _maxHeight === 'number' ? _maxHeight : Number(_maxHeight.replace(/\D/g, ''));

  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const setPosition = useCallback(() => {
    const target = anchorRef.current;

    if (!target) {
      return;
    }

    const rect = target.getBoundingClientRect();

    const dialogWidth = dialogRef.current?.clientWidth || 0;
    const dialogHeight = dialogRef.current?.clientHeight || 0;

    const reposition = (value: Coordinates) => {
      const { clientWidth, clientHeight } = window.document.body;

      return {
        x: Math.min(Math.max(value.x, 0), clientWidth - dialogWidth),
        y: Math.min(Math.max(value.y, 0), clientHeight - dialogHeight),
      };
    };

    const [anchor, direction] = position.split('-');

    const verticalX =
      direction === 'left'
        ? rect.left + rect.width - width - MIN_PADDING
        : direction === 'center'
        ? rect.left + (rect.width - width) / 2 - MIN_PADDING
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
  }, [position, width, anchorRef, coordinatesRef, dialogRef]);

  const handleScroll = useCallback(() => {
    setPosition();
    const { y } = coordinatesRef.current;

    const offsetTop = (scrollOffsetRef.current as HTMLElement)?.offsetTop || 0;

    if (y < offsetTop) {
      onClosePopover();
    } else {
      const bottom = y + (dialogRef.current?.clientHeight || 0);
      const max = offsetTop + (scrollOffsetRef.current?.clientHeight || 0);
      if (bottom >= max) {
        onClosePopover();
      }
    }
  }, [setPosition, coordinatesRef, dialogRef, scrollOffsetRef, onClosePopover]);

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
      as={!hasDim ? 'div' : undefined}
      ref={dialogRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClosePopover}
      style={{ transform: `translate(${coordinates.x}px, ${coordinates.y}px)` }}
    >
      <DialogContent
        width={`${width}px`}
        maxHeight={`${maxHeight}px`}
        padding={padding}
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

  useEffect(() => {
    if (isOpen) {
      focusRef.current = true;
      if (hasDim) {
        dialogRef.current?.showModal();
      } else if (anchorRef.current) {
        scrollOffsetRef.current = findScrollOffset(anchorRef.current);
        scrollOffsetRef.current?.addEventListener('scroll', handleScroll);
        dialogRef.current?.toggleAttribute('open');
      }
      setPosition();
    } else {
      scrollOffsetRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isOpen, setPosition, hasDim, anchorRef, dialogRef, focusRef, scrollOffsetRef]);

  return isOpen ? (hasDim ? dialog : createPortal(dialog, document.body)) : undefined;
};

/**
 * @description 특정 Element 의 위치를 기준으로 생성되는 Popover
 * @param {ReactElement} props.anchor 모달의 기준이 되는 element
 * @param {PopoverTrigger} [props.trigger] 모달 열리는 액션
 * @param {PopoverPosition} [props.posiiton] 모달의 anchor에 대한 상대적 위치
 * @param {boolean} [props.hasDim] 배경 dim 의 유/무
 * @param props.children ReactElement | (onClose) => ReactElement
 */
export const MDSPopover = (props: Props & StyleProps) => {
  const { anchor: _anchor, hasDim = true, trigger = 'click', onClose } = props;

  const anchorRef = useRef<(EventTarget & Element) | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const scrollOffsetRef = useRef<Element>();
  const coordinatesRef = useRef<Coordinates>({ x: 0, y: 0 });
  const focusRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const onCloseRef = useRef(onClose);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopover = (e: MouseEvent) => {
    anchorRef.current = e.currentTarget;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleClosePopover = useCallback(() => {
    onCloseRef.current?.();
    if (hasDim) {
      dialogRef.current?.close();
    } else {
      dialogRef.current?.toggleAttribute('open');
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  }, [hasDim]);

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
      const handleBodyClick = (e: Event) => {
        const target = e.target as Node;
        const isIn = dialogRef.current?.contains(target) || anchorRef.current?.contains(target);
        if (!isIn) {
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
        coordinatesRef={coordinatesRef}
        scrollOffsetRef={scrollOffsetRef}
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
