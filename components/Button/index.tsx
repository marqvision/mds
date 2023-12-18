import { ReactNode } from 'react';
import styled from '@emotion/styled';

// temp styles
const ButtonStyles = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 4px;
  color: #000;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const MDSButton = ({ children }: { children: ReactNode }) => {
  return <ButtonStyles>{children}</ButtonStyles>;
};
