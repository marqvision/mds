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
`;

export const MDSTableButton = React.forwardRef<HTMLButtonElement, TableButtonProps>((props, ref) => {
  const { label, icon = 'Sort', isDisabled = false, onClick, isChangeable = true, color = 'color/content/neutral/default/normal' } = props;

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(event);
      }
    : undefined;

  const isClickable = !!onClick && !isDisabled;

  return (
    <StyledButton ref={ref} isClickable={isClickable} disabled={isDisabled} onClick={handleClick}>
      {renderSortIcon(icon, 20, isDisabled, color)}
      <MDSTypography variant="body" size="s" weight="medium" color={isDisabled ? 'color/content/neutral/default/disabled' : color} style={{ marginLeft: icon ? '2px' : '0' }}>
        {label}
      </MDSTypography>
      {isChangeable && <MDSIcon.ArrowDown size={20} variant="outline" color={isDisabled ? 'color/content/neutral/default/disabled' : color} />}
    </StyledButton>
  );
});

MDSTableButton.displayName = 'MDSTableButton';

export type { TableButtonProps as MDSTableButtonProps } from './@types';
