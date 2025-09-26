import React, { HTMLAttributes, TdHTMLAttributes } from 'react';
import { MDSTypographyProps } from '../../atoms/Typography';

// Table
export type StyledTableProps = {
  isStickyLeft?:
    | {
        isShadowVisible: boolean;
      }
    | false;
  isStickyRight?:
    | {
        isShadowVisible: boolean;
      }
    | false;
};

export type TableProps = React.PropsWithChildren<{
  // 설정 시 첫번째 컬럼에 sticky 적용됩니다
  isStickyLeft?: boolean;
  // 설정 시 마지막 컬럼에 sticky 적용됩니다
  isStickyRight?: boolean;
}> &
  HTMLAttributes<HTMLTableElement>;

// Table head
export type StyledTableHeadProps = {
  // 설정 시 헤더가 sticky 적용됩니다
  isStickyHeader?: boolean;
  // 테이블 헤더 신규 디자인을 적용합니다. (TODO-@morgan: 전체 서비스 적용 완료 후 해당 prop 제거)
  isNewHeader?: boolean;
  // 설정 시 border bottom 과 동일한 색상이 border top 으로 추가됩니다.
  borderTop?: boolean;
};

export type TableHeadProps = {
  children: React.ReactElement | React.ReactElement[];
} & StyledTableHeadProps &
  HTMLAttributes<HTMLTableSectionElement>;

// Table body
export type TableBodyProps = React.PropsWithChildren & HTMLAttributes<HTMLTableSectionElement>;

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
  variant?: Exclude<TableRowVariant, 'viewing'>;
  isSelected?: boolean;
} & Omit<StyledTableRowProps, 'variant'> &
  HTMLAttributes<HTMLTableRowElement>;

// Table cell
export type BorderProps =
  | boolean
  | {
      width?: number;
      style?: 'dashed' | 'dotted' | 'double' | 'groove' | 'hidden' | 'inset' | 'none' | 'outset' | 'ridge' | 'solid';
      color?: string;
    };

type CellSize = 'small' | 'medium';

export type StyledTableCellProps = {
  // 가급적 직접 사용하지 않습니다.
  // head 내에서 cell 을 th 으로 출력하는 용도입니다.
  as?: React.ElementType;
  // 가급적 직접 사용하지 않습니다.
  // table header 의 isNewHeader 를 전달받아 MDSTypography 를 설정하는 용도입니다.
  isNewHeader?: boolean;

  // cell 내용의 세로 정렬 위치를 지정합니다.
  valign?: 'bottom' | 'top' | 'middle' | 'baseline';
  // cell 의 max-width 를 지정합니다.
  maxWidth?: string;
  // cell 의 min-width 를 지정합니다.
  minWidth?: string;
  // cell 의 width 를 지정합니다.
  width?: string;
  // cell 의 border-right 를 지정합니다.
  borderRight?: BorderProps;

  // cell 의 word-break 를 지정합니다.
  wordBreak?: MDSTypographyProps['wordBreak'];
};

export type TableCellInnerProps = {
  // cell 에 text-align 스타일을 부여합니다.
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent' | 'justify-all';
  cellSize: CellSize;
};

export type TableCellProps = React.PropsWithChildren<
  {
    /**
     * cell 의 padding 스타일을 지정합니다.
     * @default 'medium'
     */
    cellSize?: CellSize;
  } & StyledTableCellProps &
    Omit<TableCellInnerProps, 'cellSize'>
> &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>;

export type TableTheme = {
  head: {
    color: {
      newHeader: {
        backgroundColor: string;
        borderColor: string;
      };
    };
  };
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
      horizontal: Record<'head' | 'body', { borderColor: string }>;
      vertical: { borderColor: string };
    };
    size: Record<CellSize, { padding: string }>;
  };
};
