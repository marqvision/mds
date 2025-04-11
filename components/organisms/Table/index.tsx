import styled from '@emotion/styled';
import { StyledTableProps, TableProps } from './@types';
import { TableHead } from './Head';
import { TableBody } from './Body';
import { TableRow } from './Row';
import { TableCell } from './Cell';
import { useStickyShadow } from './@hooks/useStickyShadow';

const Wrapper = styled.table<StyledTableProps>`
  min-width: 100%;
  position: relative;
  border-collapse: unset;
  border-spacing: 0;
  height: fit-content;

  ${({ isStickyLeft }) =>
    isStickyLeft
      ? `
    & th, & tbody:has(td[rowspan]) td[rowspan], & tbody:not(:has(td[rowspan])) td {
      &:first-of-type {
        position: sticky;
        left: 0;
        z-index: 1;
        padding-right: 4px;
        ${isStickyLeft.isShadowVisible ? 'box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.06);' : ''}
                
        & + td, & + th {
          padding-left: 4px;
        }
      }
    }
    & tbody:has(td[rowspan]) td:not([rowspan]):first-of-type {
      padding-left: 4px;
    }
  `
      : ''}

  ${({ isStickyRight }) =>
    isStickyRight
      ? `
    & th, & td {
      &:last-of-type {
        position: sticky;
        right: 0;
        z-index: 1;
        padding-left: 4px;
        ${isStickyRight.isShadowVisible ? 'box-shadow: -5px 0px 5px -2px rgba(0, 0, 0, 0.06);' : ''}

      }
      &:nth-last-of-type(2) {
        padding-right: 4px;
      }
    }
  `
      : ''}
`;

const Table = (props: TableProps) => {
  const { children, isStickyLeft, isStickyRight, ...restProps } = props;

  const { wrapperRef, stickyShadow } = useStickyShadow();

  return (
    <Wrapper
      ref={wrapperRef}
      isStickyLeft={isStickyLeft && { isShadowVisible: stickyShadow.left }}
      isStickyRight={isStickyRight && { isShadowVisible: stickyShadow.right }}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
export const MDSTable = Table;

export type { TableProps, TableHeadProps, TableRowProps, TableCellProps } from './@types';
