import React from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { TableButtonProps } from './@types';
import { renderSortIcon } from './@utils';

const StyledButton = styled.button<{
  isClickable: boolean;
  disabled: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background: none;
  border: none;
  height: 24px;
  padding: 0;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:disabled {
    color: ${({ theme }) => theme.color.content.neutral.default.disabled};

    & svg path {
      fill: ${({ theme }) => theme.color.content.neutral.default.disabled};
    }
  }
`;

export const MDSTableButton = (props: TableButtonProps) => {
  const { label, icon = 'Sort', isDisabled = false, onClick, isChangeable = true } = props;

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(event);
      }
    : undefined;

  const isClickable = !!onClick && !isDisabled;

  return (
    <StyledButton isClickable={isClickable} disabled={isDisabled} onClick={handleClick}>
      {renderSortIcon(icon, 20)}
      <MDSTypography variant="body" size="s" weight="medium" color="inherit" style={{ marginLeft: icon ? '2px' : '0' }}>
        {label}
      </MDSTypography>
      {isChangeable && <MDSIcon.ArrowDown size={20} variant="outline" />}
    </StyledButton>
  );
};

MDSTableButton.displayName = 'MDSTableButton';

export type { TableButtonProps as MDSTableButtonProps } from './@types';
