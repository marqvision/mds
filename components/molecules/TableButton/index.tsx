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

  &:disabled {
    color: ${({ theme }) => theme.color.content.neutral.default.disabled};
    cursor: default;

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
      <MDSTypography variant="body" size="s" weight="medium" color="inherit" style={{ marginLeft: '2px' }}>
        {label}
      </MDSTypography>
      {isChangeable && <MDSIcon.ArrowDown size={24} variant="outline" />}
    </StyledButton>
  );
};

MDSTableButton.displayName = 'MDSTableButton';

export type { TableButtonProps } from './@types';
