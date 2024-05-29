import React, { HTMLAttributes, TdHTMLAttributes } from 'react';

// Table
export type StyledTableProps = {
  // 설정 시 첫번째 컬럼에 sticky 적용됩니다
  isStickyLeft?: boolean;
  // 설정 시 마지막 컬럼에 sticky 적용됩니다
  isStickyRight?: boolean;
};

export type TableProps = React.PropsWithChildren<StyledTableProps> & HTMLAttributes<HTMLTableElement>;

// Table head
export type StyledTableHeadProps = {
  // 설정 시 헤더가 sticky 적용됩니다
  isStickyHeader?: boolean;
};

export type TableHeadProps = {
  children: React.ReactElement | React.ReactElement[];
} & StyledTableHeadProps &
  HTMLAttributes<HTMLTableSectionElement>;

// Table body
export type TBodyProps = React.PropsWithChildren & HTMLAttributes<HTMLTableSectionElement>;

export type StyledTableRowProps = {
  // 설정 시 viewing details background color 가 적용됩니다
  isViewingDetails?: boolean;
};

// Table row
export type TableRowProps = {
  children: React.ReactElement | React.ReactElement[];
} & StyledTableRowProps &
  HTMLAttributes<HTMLTableRowElement>;

export type StyledTableCellProps = {
  // 직접 사용하지 않습니다.
  // head 내에서 cell 을 th 으로 출력하기 위해 사용합니다.
  as?: React.ElementType;
};

// Table cell
export type TableCellProps = React.PropsWithChildren<StyledTableCellProps> & TdHTMLAttributes<HTMLTableCellElement>;
