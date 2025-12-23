import { useRef, MouseEvent, useState, useEffect, useCallback, cloneElement, MutableRefObject, useMemo } from 'react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { Props, StyleProps, Coordinates, PopoverPosition } from './@type';
import { Theme } from './@constants';
import { findScrollOffset } from './@utils';

const MIN_PADDING = 4;
const TRANSITION = '300ms ease-out';

const Dialog = styled.dialog<{ margin?: number; arrowPosition?: string; bgColor: 'white' | 'black' }>`
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
  opacity: 0;
  &[open] {
    ${({ as }) =>
      as === 'div'
        ? {
            display: 'block',
          }
        : undefined}
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
  ::backdrop {
    background-color: transparent;
  }
  &.withArrow:after {
    width: 8px;
    height: 6px;
    content: '';
    position: absolute;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%226%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%2C0%20L3.5%2C5%20Q4%2C5.5%204.5%2C5%20L8%2C0%20Z%22%20fill%3D%22${({
      theme,
      bgColor,
    }) => {
      const bg =
        bgColor === 'white' ? theme.color.bg.surface.neutral.default.normal : theme.color.bg.surface.inverse.light;
      return bg.replace('#', '%23');
    }}%22%20/%3E%3C/svg%3E');
    ${({ arrowPosition }) => arrowPosition}
  }
  &.dismissOnLeave {
    pointer-events: none;
  }
`;

const DialogContent = styled.div<StyleProps>`
  position: relative;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16), 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background-color: ${({ theme, bgColor }) =>
    bgColor === 'white' ? theme.color.bg.surface.neutral.default.normal : theme.color.bg.surface.inverse.light};
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
      onMouseEnter?: (e: MouseEvent) => void;
      onMouseLeave?: (e: MouseEvent) => void;
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
    bgColor = 'white',
    padding = '16px 20px',
    children: _children,
    isOpen,
    anchorRef,
    dialogRef,
    focusRef,
    style,
    interactive = true,
    margin: _margin,
    withArrow,
    onMouseEnter,
    onMouseLeave,
    onClosePopover,
  } = props;

  const margin = _margin === undefined ? MIN_PADDING : _margin;

  const maxHeight = typeof _maxHeight === 'number' ? _maxHeight : Number(_maxHeight.replace(/\D/g, ''));

  const [coordinates, setCoordinates] = useState<Coordinates>();

  const positionRef = useRef(position);
  const closeRef = useRef(onClosePopover);
  const invertedRef = useRef(false);
  const blockInvertRef = useRef(false);
  const scrollOffsetRef = useRef<HTMLElement | Window>();
  const debounceRef = useRef<number>();

  const dialogWidth = dialogRef.current?.clientWidth || 0;

  const updateArrowPosition = useCallback(() => {
    if (!withArrow) {
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      const tooltip = dialogRef.current;
      const anchor = anchorRef.current;
      if (tooltip && anchor) {
        const tooltipRect = tooltip.getBoundingClientRect();
        const anchorRect = anchor.getBoundingClientRect();

        const leftOffset = anchorRect.left + anchorRect.width / 2 - tooltipRect.left;
        const topOffset = anchorRect.top + anchorRect.height / 2 - tooltipRect.top;

        tooltip.style.setProperty('--arrow-left', `${leftOffset}px`);
        tooltip.style.setProperty('--arrow-top', `${topOffset}px`);
      }
    }, 0);
  }, [anchorRef, dialogRef, withArrow]);

  const updateCoordinates = useCallback(() => {
    const anchor = anchorRef.current;

    if (!anchor) {
      return;
    }

    const rect = anchor.getBoundingClientRect();

    const dialogHeight = dialogRef.current?.clientHeight || 0;
    const contentWidth = dialogRef.current?.children[0]?.clientWidth || 0;

    const [direction, sort] = positionRef.current.split('-');

    const checkIsInverted = (value: Coordinates) => {
      const { innerWidth, innerHeight } = window;

      return (
        (direction === 'top' && value.y < 0) ||
        (direction === 'bottom' && value.y > innerHeight - dialogHeight) ||
        (direction === 'left' && value.x < 0) ||
        (direction === 'right' && value.x > innerWidth - dialogWidth)
      );
    };

    const getCurrentCoordinates = () => {
      let coords;

      const verticalX =
        sort === 'left'
          ? rect.left + rect.width - contentWidth - margin
          : sort === 'center'
          ? rect.left + (rect.width - contentWidth) / 2 - margin
          : rect.left - margin;

      const horizontalY =
        sort === 'top'
          ? rect.top + rect.height - dialogHeight + margin
          : sort === 'center'
          ? rect.top - dialogHeight / 2 + rect.height / 2
          : rect.top - margin;

      switch (direction) {
        case 'bottom': {
          coords = {
            x: verticalX,
            y: rect.top + rect.height,
          };
          break;
        }
        case 'top': {
          coords = {
            x: verticalX,
            y: rect.top - dialogHeight,
          };
          break;
        }
        case 'left': {
          coords = {
            x: rect.x - dialogWidth,
            y: horizontalY,
          };
          break;
        }
        case 'right': {
          coords = {
            x: rect.x + rect.width,
            y: horizontalY,
          };
          break;
        }
      }

      return coords;
    };

    const currentCoordinates = getCurrentCoordinates();

    const reposition = (value: { x: number; y: number }) => {
      const { innerWidth, innerHeight } = window;

      const x = Math.min(Math.max(value.x, 0), innerWidth - dialogWidth);
      const y = Math.min(Math.max(value.y, 0), innerHeight - dialogHeight);

      return {
        x,
        y,
      };
    };

    if (currentCoordinates) {
      if (!blockInvertRef.current) {
        if (!invertedRef.current && checkIsInverted(currentCoordinates)) {
          if (direction === 'top') {
            positionRef.current = `bottom-${sort}` as PopoverPosition;
          } else if (direction === 'bottom') {
            positionRef.current = `top-${sort}` as PopoverPosition;
          } else if (direction === 'left') {
            positionRef.current = `right-${sort}` as PopoverPosition;
          } else if (direction === 'right') {
            positionRef.current = `left-${sort}` as PopoverPosition;
          }
          invertedRef.current = true;

          updateCoordinates();
          return;
        } else if (invertedRef.current && checkIsInverted(currentCoordinates)) {
          blockInvertRef.current = true;
          positionRef.current = position;
          invertedRef.current = false;
        }
      }
      setCoordinates(reposition(currentCoordinates));
      updateArrowPosition();
    }
  }, [anchorRef, dialogRef, dialogWidth, margin, updateArrowPosition, position]);

  const children = useMemo(() => {
    return isLoading ? (
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0', minWidth: '100%' }}
      >
        <MDSLoadingIndicator size={24} strokeWidth={2} />
      </div>
    ) : typeof _children === 'function' ? (
      _children({
        close: onClosePopover,
        isOpen: isOpen,
      })
    ) : (
      _children
    );
  }, [isLoading, _children, isOpen, onClosePopover]);

  const getPositionKey = () => positionRef.current?.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';

  const dialog = (
    <Dialog
      className={clsx('mds-popover', { withArrow, dismissOnLeave: !interactive })}
      as={!hasDim ? 'div' : undefined}
      ref={dialogRef}
      margin={margin}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClosePopover}
      style={{
        transform: `translate(${Math.round(Math.max(coordinates?.x || 0, 0))}px, ${Math.round(
          Math.max(coordinates?.y || 0, 0)
        )}px)`,
        zIndex,
        visibility: coordinates ? 'visible' : 'hidden',
      }}
      bgColor={bgColor}
      arrowPosition={Theme.position[getPositionKey()]}
    >
      <DialogContent
        width={typeof width === 'string' ? width : `${width}px`}
        maxHeight={`${maxHeight}px`}
        padding={padding}
        bgColor={bgColor}
        style={{ ...style }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </DialogContent>
    </Dialog>
  );

  useEffect(() => {
    if (isOpen) {
      focusRef.current = true;
      if (hasDim) {
        dialogRef.current?.showModal();
      } else if (anchorRef.current) {
        dialogRef.current?.setAttribute('open', 'true');
        scrollOffsetRef.current?.addEventListener('scroll', updateCoordinates);
      }
    }
    return () => {
      scrollOffsetRef.current?.removeEventListener('scroll', updateCoordinates);
    };
  }, [isOpen, hasDim, anchorRef, dialogRef, focusRef, updateCoordinates]);

  useEffect(() => {
    closeRef.current = onClosePopover;
  }, [onClosePopover]);

  useEffect(() => {
    positionRef.current = position;
  }, [position, isOpen]);

  useEffect(() => {
    if (isOpen) {
      invertedRef.current = false;
      updateCoordinates();
    }
  }, [isOpen, updateCoordinates]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateCoordinates();
    });
    observer.observe(document.body);
    if (dialogRef.current) {
      observer.observe(dialogRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [updateCoordinates, dialogRef]);

  useEffect(() => {
    blockInvertRef.current = false;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeRef.current();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.at(-1)?.isIntersecting) {
          closeRef.current();
        }
      },
      {
        threshold: 0,
      }
    );

    if (anchorRef.current) {
      observer.observe(anchorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [anchorRef, isOpen]);

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      scrollOffsetRef.current = findScrollOffset(anchorRef.current);
    }
  }, [anchorRef, isOpen]);

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
 * @param {boolean} props.interactive mouse leave 기준에 children 영역 포함 여부 (default: true)
 */
export const MDSPopover = (props: Props & StyleProps) => {
  const {
    anchor: _anchor,
    forwardRef,
    hasDim = false,
    trigger = 'click',
    interactive = true,
    delay = 300,
    blockAutoClose,
    onClose,
    onVisibleChange,
  } = props;

  const anchorRef = useRef<(EventTarget & Element) | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const focusRef = useRef(false);
  const delayCloseRef = useRef<number>();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopover = (e: MouseEvent) => {
    anchorRef.current = e.currentTarget;
    if (forwardRef) {
      forwardRef.current = e.currentTarget;
    }
    onVisibleChange?.(true);

    if (delayCloseRef.current) {
      window.clearTimeout(delayCloseRef.current);
      delayCloseRef.current = undefined;

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

    if (delayCloseRef.current) {
      window.clearTimeout(delayCloseRef.current);
    }

    delayCloseRef.current = window.setTimeout(() => {
      setIsOpen(false);
      delayCloseRef.current = undefined;
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
    ...(isAnchorFunction || (trigger !== 'click' && !anchor.props.onClick)
      ? undefined
      : {
          onClick: (e: MouseEvent) => {
            if (trigger === 'click') {
              if (isOpen && !delayCloseRef.current) {
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
      anchor.props.onMouseEnter?.(e);
    },
    onMouseLeave: handleMouseLeave,
  });

  useEffect(() => {
    if (!hasDim && trigger === 'click' && !blockAutoClose) {
      const dimmed = anchorRef.current?.closest('.mds-dimmed');

      const handleBodyClick = (e: Event) => {
        const target = e.target as HTMLElement;
        const isIn = dialogRef.current?.contains(target) || anchorRef.current?.contains(target);
        const isDimmed = target.closest?.('.mds-dimmed') && target.closest?.('.mds-dimmed') !== dimmed;
        const currentPopover = target.closest?.('.mds-popover');
        const isNotDelete = !!target.closest?.('.mds-delete-icon');

        if (((!isIn && !isDimmed && !currentPopover) || (isIn && isNotDelete)) && !delayCloseRef.current) {
          handleClosePopover();
          return;
        }

        // for multiple popovers, any popup opened after the current one will be closed.
        const allPopovers = document.querySelectorAll('.mds-popover');
        let targetPopoverIndex = -1;
        allPopovers.forEach((el, index) => {
          if (targetPopoverIndex > -1) {
            if (currentPopover !== dialogRef.current) {
              handleClosePopover();
            }
          }
          if (el === currentPopover) {
            targetPopoverIndex = index;
          }
        });
      };
      if (isOpen) {
        document.body.addEventListener('click', handleBodyClick, { capture: true });
      }
      return () => {
        document.body.removeEventListener('click', handleBodyClick, { capture: true });
      };
    }
  }, [hasDim, trigger, isOpen, handleClosePopover, blockAutoClose]);

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
        onMouseEnter={interactive ? handleMouseEnter : undefined}
        onMouseLeave={interactive ? handleMouseLeave : undefined}
      >
        {props.children}
      </Popover>
    </>
  );
};
