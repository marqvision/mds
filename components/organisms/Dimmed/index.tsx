import React, { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';
import { composeRef } from '../../../utils/composeRef';
import { Props, StyledProps } from './@types';
import { theme } from './@constants';

const transition = 300; //TODO-@morgan: 디자인 팀 확인 필요

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

const Wrapper = styled.div<StyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300; //Mui Popper 의 z-index 1300 으로 맞춤 (MuiPopper > Modal > MuiPopper 사용 가능)
  align-items: center;
  justify-content: center;
  width: 100vw; // fallback
  height: 100vh; // fallback
  width: 100dvw;
  height: 100dvh;
  padding: ${({ padding }) => padding};
  background-color: ${({ intensity }) => theme.color[intensity].backgroundColor};
  overflow: hidden;
  display: none;
  transition: display ${transition}ms allow-discrete, overlay ${transition}ms allow-discrete;
  animation: ${fadeOut} ${transition}ms ease-out forwards;
  &.isOpen {
    display: flex;
    animation: ${fadeIn} ${transition}ms ease-out forwards;
    @starting-style {
      opacity: 0;
    }
  }
`;

const clearBodyStyle = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

export const MDSDimmed = forwardRef<HTMLDivElement, Props>((props, forwardedRef) => {
  const { isOpen: _isOpen, padding = '20px', intensity = 'default', style, onClose, children } = props;

  const eleRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const timeoutRef = useRef<number>();
  const mouseTriggerRef = useRef<boolean>(false);

  const ref = composeRef(forwardedRef, eleRef);

  //@morgan: mui portal 의 createPortal 타이밍에 맞추기 위해 동일하게 mountNode state 추가함
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget && mouseTriggerRef.current) {
      onClose?.();
    }
    mouseTriggerRef.current = false;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    // 이벤트의 시작 지점이 dimmed 인 경우만 onClick 의 close 이벤트를 발생시킴
    mouseTriggerRef.current = event.target === event.currentTarget;
    stopPropagation(event);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (_isOpen) {
      if (!isOpen) {
        setMountNode(document.body);
        setIsOpen(true);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    } else if (isOpen) {
      setIsOpen(false);
      timeoutRef.current = window.setTimeout(() => {
        setMountNode(null);
      }, transition);
    }
  }, [_isOpen, isOpen]);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - window.document.body.offsetWidth;

    const panelLength = document.querySelectorAll('.mds-dimmed').length;

    if (_isOpen && panelLength === 0) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else if (!_isOpen && panelLength === 1) {
      clearBodyStyle();
    }
  }, [_isOpen]);

  useEffect(() => {
    return () => {
      clearBodyStyle();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const dimmed = document.querySelectorAll('.mds-dimmed');
      const lastDimmed = dimmed.length ? dimmed[dimmed.length - 1] : null;

      if (e.key === 'Escape' && eleRef.current === lastDimmed) {
        closeRef.current?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown, { capture: true });

      return () => {
        document.removeEventListener('keydown', handleKeyDown, { capture: true });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  return mountNode
    ? createPortal(
        <Wrapper
          ref={ref}
          className={clsx({ isOpen }, 'mds-dimmed')}
          onMouseMove={stopPropagation}
          onMouseDown={handleMouseDown}
          onMouseUp={stopPropagation}
          onClick={handleClose}
          padding={padding}
          intensity={intensity}
          style={style}
        >
          {(_isOpen || mountNode) && children}
        </Wrapper>,
        mountNode
      )
    : mountNode;
});
MDSDimmed.displayName = 'MDSDimmed';
