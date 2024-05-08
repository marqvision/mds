import styled from '@emotion/styled';
import { StyledTableRowProps, TableRowProps } from './@types';

const Wrapper = styled.tr<StyledTableRowProps>`
  ${({ onClick }) => onClick && 'cursor: pointer;'}

  & td {
    background-color: ${({ isViewingDetails, theme }) =>
      theme.color.comp.table.color.bg[isViewingDetails ? 'viewing' : 'default'].normal};
  }

  tbody:hover & td[rowspan],
  &:hover td {
    background-color: ${({ isViewingDetails, theme }) =>
      theme.color.comp.table.color.bg[isViewingDetails ? 'viewing' : 'default'].hover};
  }
`;

export const TableRow = (props: TableRowProps) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps}>{children}</Wrapper>;
};
