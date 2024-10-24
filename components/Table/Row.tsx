import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { theme } from './@constants';
import { StyledTableRowProps, TableRowProps } from './@types';

const Wrapper = styled.tr<StyledTableRowProps>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  ${({ isContainer }) =>
    isContainer
      ? `
        tbody > & {
          & > td, & > th {
            &:not([rowspan]) {
              &:first-of-type, &:last-of-type {
                padding-left: 0;
                padding-right: 0;
              }
              & > div {
                padding: 0;
              }
          } 
        }
      `
      : ''}
  & > td, & > th {
    background-color: ${({ variant }) => theme.row.color[variant].backgroundColor.normal};
  }

  tbody:has(td[rowspan]:hover) & > td,
  tbody:has(td:not([rowspan]):hover) &:hover > td,
  tbody:has(td:not([rowspan]):hover) & > td[rowspan] {
    background-color: ${({ variant, isContainer }) =>
      isContainer ? '' : theme.row.color[variant].backgroundColor.hover};
  }
`;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  const { children, isContainer, variant = 'default', isSelected, ...restProps } = props;

  const rowVariant: StyledTableRowProps['variant'] = isSelected ? 'viewing' : variant;

  return (
    <Wrapper ref={ref} data-container={isContainer} variant={rowVariant} isContainer={isContainer} {...restProps}>
      {children}
    </Wrapper>
  );
});

TableRow.displayName = 'MDSTableRow';
