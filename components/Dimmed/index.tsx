import React from 'react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';

const transition = '0.3s'; //TODO-@morgan: 디자인 팀 확인 필요

const Wrapper = styled.div<Props>`
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
  background-color: ${({ theme }) => theme.color.comp.dimmed.color.default};
  overflow: hidden;
  transition: ${transition};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  onClose?: () => void;
}>;

export const MDSDimmed = (props: Props) => {
  const { isOpen, onClose, children } = props;

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    onClose?.();
  };

  return createPortal(
    <Wrapper isOpen={isOpen} onClick={handleClose}>
      {isOpen && children}
    </Wrapper>,
    document.body
  );
};
