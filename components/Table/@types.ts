import React, { HTMLAttributes, TdHTMLAttributes } from 'react';
import { MDSThemeColorPath } from '../../foundation';

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

type TableRowVariant = 'default' | 'secondary' | 'viewing';

export type StyledTableRowProps = {
  // 설정 시 viewing details background color 가 적용됩니다
  variant: TableRowVariant;
  // 설정 시 cell 내 테이블 등 다른 복잡한 요소를 넣을 수 있도록 padding, hover style 이 초기화되고 내부 그림자가 추가됩니다.
  isContainer?: boolean;
};

// Table row
export type TableRowProps = {
  children: React.ReactElement | React.ReactElement[];
  variant?: Extract<TableRowVariant, 'default' | 'secondary'>;
  isSelected?: boolean;
} & Omit<StyledTableRowProps, 'variant'> &
  HTMLAttributes<HTMLTableRowElement>;

// Table cell
export type BorderProps =
  | boolean
  | {
      width?: number;
      style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'hidden' | 'inset' | 'none' | 'outset' | 'ridge' | 'solid';
      color?: MDSThemeColorPath;
    };

type CellSize = 'small' | 'medium';

export type StyledTableCellProps = {
  // 직접 사용하지 않습니다.
  // head 내에서 cell 을 th 으로 출력하기 위해 사용합니다.
  as?: React.ElementType;
  // cell 내용의 세로 정렬 위치를 지정합니다.
  valign?: 'bottom' | 'top' | 'middle' | 'baseline';
  // cell 의 max-width 를 지정합니다.
  maxWidth?: string | number;
  // cell 의 min-width 를 지정합니다.
  minWidth?: string | number;
  // cell 의 border-right 를 지정합니다.
  borderRight?: BorderProps;
};

export type TableCellInnerProps = {
  // cell 에 text-align 스타일을 부여합니다.
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent' | 'justify-all';
  size: CellSize;
};

export type TableCellProps = React.PropsWithChildren<
  {
    /**
     * cell 의 padding 스타일을 지정합니다.
     * @default 'medium'
     */
    size?: CellSize;
  } & StyledTableCellProps &
    Omit<TableCellInnerProps, 'size'>
> &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>;

export type TableTheme = {
  row: {
    color: Record<
      TableRowVariant,
      {
        backgroundColor: {
          normal: string;
          hover: string;
        };
      }
    >;
  };
  cell: {
    color: {
      horizontal: Record<'head' | 'body', { borderColor: string; }>;
      vertical: { borderColor: string; };
    };
    size: Record<CellSize, { padding: string }>;
  };
};
