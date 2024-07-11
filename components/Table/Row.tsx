import styled from '@emotion/styled';
import { StyledTableRowProps, TableRowProps } from './@types';

const Wrapper = styled.tr<StyledTableRowProps>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}

  & td, & th {
    background-color: ${({ isSelected, isSecondary, theme }) => {
      if (isSecondary) {
        return theme.color.bg.surface.neutral.secondary.normal;
      }

      if (isSelected) {
        return theme.color.comp.table.color.bg.viewing.normal;
      }

      return theme.color.comp.table.color.bg.default.normal;
    }};
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
