import styled from '@emotion/styled';
import { LoadingSpinnerProps } from '../@types';
import { MDSLoadingIndicator } from '../../LoadingIndicator';

export const LoadingSpinner = styled(MDSLoadingIndicator)<LoadingSpinnerProps>`
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
`;
