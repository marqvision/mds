import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';

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

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300; //Mui Popper 의 z-index 1300 으로 맞춤 (MuiPopper > Modal > MuiPopper 사용 가능)
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.comp.dimmed.color.default};
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

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
}>;

export const MDSDimmed = (props: Props) => {
  const { isOpen: _isOpen, onClose, children } = props;

  //@morgan: mui portal 의 createPortal 타이밍에 맞추기 위해 동일하게 mountNode state 추가함
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<number>();
  const close = useRef(onClose);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;
    if (onClose) {
      setIsOpen(false);
    }
  };

  const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (_isOpen) {
      setMountNode(document.body);
      if (ref.current) {
        clearTimeout(ref.current);
        ref.current = undefined;
      }
    } else if (isOpen) {
      setIsOpen(false);
    }
  }, [_isOpen, isOpen]);

  useEffect(() => {
    if (!isOpen && !ref.current) {
      ref.current = window.setTimeout(() => {
        ref.current = undefined;
        setMountNode(null);
        close.current?.();
      }, transition);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mountNode) {
      setIsOpen(true);
    }
  }, [mountNode]);

  return mountNode
    ? createPortal(
        <Wrapper
          className={clsx({ isOpen: isOpen }, 'mds-dimmed')}
          onMouseMove={stopPropagation}
          onMouseDown={stopPropagation}
          onMouseUp={stopPropagation}
          onClick={handleClose}
        >
          {_isOpen && children}
        </Wrapper>,
        mountNode
      )
    : mountNode;
};
