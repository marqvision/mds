import styled from '@emotion/styled';
import { StyledTableProps, TableProps } from './@types';
import { TableHead } from './Head';
import { TableBody } from './Body';
import { TableRow } from './Row';
import { TableCell } from './Cell';

const Wrapper = styled.table<StyledTableProps>`
  min-width: 100%;
  position: relative;
  border-collapse: unset;
  border-spacing: 0;
  height: fit-content;

  ${({ isStickyLeft }) =>
    isStickyLeft &&
    `
    & th, & tbody:has(td[rowspan]) td[rowspan], & tbody:not(:has(td[rowspan])) td {
      &:first-child {
        position: sticky;
        left: 0;
        z-index: 1;
        box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.06);
        padding-right: 4px;
                
        & + td, & + th {
          padding-left: 4px;
        }
      }
    }
    & tbody:has(td[rowspan]) td:not([rowspan]):first-child {
      padding-left: 4px;
    }
  `}

  ${({ isStickyRight }) =>
    isStickyRight &&
    `
    & th, & td {
      &:last-child {
        position: sticky;
        right: 0;
        z-index: 1;
        box-shadow: -5px 0px 5px -2px rgba(0, 0, 0, 0.06);
        padding-right: 0;
      }
      &:nth-last-child(2) {
        padding-right: 4px;
      }
    }
  `}
`;

const Table = (props: TableProps) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
export const MDSTable = Table;
