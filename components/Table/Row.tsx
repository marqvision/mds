import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { StyledTableRowProps, TableRowProps } from './@types';

const Wrapper = styled.tr<StyledTableRowProps>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  & td, & th {
    background-color: ${({ variant = 'default', isSelected, theme }) =>
      theme.color.comp.table.color.bg[isSelected ? 'viewing' : variant].normal};
  }

  tbody:has(td[rowspan]:hover) & td,
  tbody:has(td:not([rowspan]):hover) &:hover td,
  tbody:has(td:not([rowspan]):hover) & td[rowspan] {
    background-color: ${({ variant = 'default', isSelected, theme }) =>
      theme.color.comp.table.color.bg[isSelected ? 'viewing' : variant].hover};
  }
`;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <Wrapper ref={ref} {...restProps}>
      {children}
    </Wrapper>
  );
});

TableRow.displayName = 'TableRow';
