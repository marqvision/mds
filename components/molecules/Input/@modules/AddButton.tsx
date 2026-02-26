import { forwardRef, MouseEvent, Ref } from 'react';
import styled from '@emotion/styled';
import { Size } from '../@types';
import { theme } from '../@constants';

const StyledAddButton = styled.button<{ size: Size; isError?: boolean }>`
  border: none;
  color: white;
  font-family: inherit;
  font-weight: 560;
  transition: background-color ${theme.transitionTiming} ease;
  ${({ size }) => ({
    padding: `0 ${theme.size[size].buttonPadding}`,
    'font-size': theme.size[size].buttonFontSize,
  })}
  background-color: ${({ disabled, isError }) =>
    disabled
      ? theme.color.button[isError ? 'error-disabled' : 'disabled']
      : theme.color.button[isError ? 'error' : 'normal']};
  border-radius: ${({ theme }) => `0 ${theme.comp.input.radius} ${theme.comp.input.radius} 0`};
  &:not(:disabled) {
    cursor: pointer;
  }
`;

type Props = {
  label?: string;
  size: Size;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isError?: boolean;
};

export const AddButton = forwardRef(
  ({ label, size, isDisabled, isError, onClick }: Props, ref: Ref<HTMLButtonElement>) => {
    return (
      <StyledAddButton ref={ref} size={size} disabled={isDisabled} isError={isError} onClick={onClick}>
        {label || 'Add'}
      </StyledAddButton>
    );
  }
);

AddButton.displayName = 'MDSInput.AddButton';
