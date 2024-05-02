import React, { createContext, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Header } from './Header';
import { Content } from './Content';
import { Action } from './Action';
import { ModalContext, ModalWrapperProps, StyledModalOverlayProps, StyledModalWrapperProps } from './@types';

const transition = '0.3s'; //TODO-@morgan: 디자인 팀 확인 필요

const Overlay = styled.div<StyledModalOverlayProps>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300; //Mui Popper 의 z-index 1300 으로 맞춤 (MuiPopper > Modal > MuiPopper 사용 가능)
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme._raw_color.blackAlpha50};
  overflow: hidden;
  transition: opacity ${transition}, visibility ${transition};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

const Modal = styled.div<StyledModalWrapperProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16), 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  ${({ width = '420px' }) => `width: ${width}`};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  ${({ maxWidth = '100%' }) => maxWidth && `max-width: ${maxWidth}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ maxHeight = '100%' }) => maxHeight && `max-height: ${maxHeight}`};
`;

export const Context = createContext<ModalContext>({ isScrollTop: true, onScrollContent: () => null });

const Wrapper = (props: ModalWrapperProps) => {
  const { isOpen, onClose, children, ...restProps } = props;

  const [isScrollTop, setIsScrollTop] = useState<boolean>(true);

  const handleScrollContent = (event: React.UIEvent<HTMLElement>) => {
    setIsScrollTop(!event.currentTarget.scrollTop);
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    onClose?.();
  };

  useLayoutEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return createPortal(
    <Context.Provider value={{ isScrollTop, onScrollContent: handleScrollContent }}>
      <Overlay isOpen={isOpen} onClick={handleClose}>
        <Modal {...restProps}>{isOpen && children}</Modal>
      </Overlay>
    </Context.Provider>,
    document.body
  );
};

export const MDSModal = {
  Wrapper,
  Header,
  Content,
  Action,
};
