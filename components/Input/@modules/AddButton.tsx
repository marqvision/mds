import styled from '@emotion/styled';
import { Size } from '../@types';
import { theme } from '../@constants';

const StyledAddButton = styled.button<{ size: Size; isError?: boolean }>`
  border: none;
  color: white;
  font-weight: 500;
  transition: background-color ${theme.transitionTiming} ease;
  ${({ size }) => ({
    padding: `0 ${theme.size[size].buttonPadding}`,
    'font-size': theme.size[size].buttonFontSize,
  })}
  background-color: ${({ disabled, isError }) =>
    disabled
      ? theme.color.button[isError ? 'error-disabled' : 'disabled']
      : theme.color.button[isError ? 'error' : 'normal']};
  border-radius: 0 8px 8px 0;
  &:not(:disabled) {
    cursor: pointer;
  }
`;

type Props = {
  label?: string;
  size: Size;
  onClick: () => void;
  isDisabled?: boolean;
  isError?: boolean;
};

export const AddButton = ({ label, size, isDisabled, isError, onClick }: Props) => {
  return (
    <StyledAddButton size={size} disabled={isDisabled} isError={isError} onClick={onClick}>
      {label || 'Add'}
    </StyledAddButton>
  );
};
