import styled from '@emotion/styled';
import { StyledTableRowProps, TableRowProps } from './@types';

const Wrapper = styled.tr<StyledTableRowProps>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}

  & td {
    background-color: ${({ isSelected, theme }) =>
      theme.color.comp.table.color.bg[isSelected ? 'viewing' : 'default'].normal};
  }

  tbody:has(td[rowspan]:hover) & td,
  tbody:has(td:not([rowspan]):hover) &:hover td,
  tbody:has(td:not([rowspan]):hover) & td[rowspan] {
    background-color: ${({ isSelected, theme }) =>
      theme.color.comp.table.color.bg[isSelected ? 'viewing' : 'default'].hover};
  }
`;

export const TableRow = (props: TableRowProps) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps}>{children}</Wrapper>;
};
