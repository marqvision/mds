import React, { createContext, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { MDSDimmed } from '../Dimmed';
import { Header } from './Header';
import { Content } from './Content';
import { Action } from './Action';
import { ModalContext, ModalWrapperProps, StyledModalWrapperProps } from './@types';

const Modal = styled.div<StyledModalWrapperProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  border-radius: 8px;
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.16),
    0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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

  useLayoutEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return createPortal(
    <MDSDimmed isOpen={isOpen} onClose={onClose}>
      <Context.Provider value={{ isScrollTop, onScrollContent: handleScrollContent }}>
        <Modal {...restProps}>{isOpen && children}</Modal>
      </Context.Provider>
    </MDSDimmed>,
    document.body
  );
};

export const MDSModal = {
  Wrapper,
  Header,
  Content,
  Action,
};

export * from './@types';
