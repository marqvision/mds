import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme as ChipTheme } from '../@constants';
import { LoadingSpinnerProps } from '../@types';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.i<LoadingSpinnerProps>`
  display: block;
  padding: 2px;

  ${({ isCenter }) => `
    position: ${isCenter ? 'absolute' : 'relative'};
    ${
      isCenter
        ? `
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
        : ''
    }
  `}
  ${({ size }) => `
    width: ${ChipTheme.size[size].icon}px;
    height: ${ChipTheme.size[size].icon}px;
  `}
  &:after {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    content: '';
    display: block;
    border-radius: 50%;
    animation: ${spin} 1s ease-out infinite;

    ${({ size }) => `
      border: ${ChipTheme.size[size].spinnerWidth} solid transparent;
      border-top-color: inherit;
      border-right-color: inherit;
    `}
  }
`;