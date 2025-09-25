import { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { theme } from './@constants';
import { BorderProps, StyledTableCellProps, TableCellInnerProps, TableCellProps } from './@types';

const Wrapper = styled.td<StyledTableCellProps>`
  padding: 0;
  box-sizing: content-box;
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ maxWidth }) => maxWidth && `width: ${maxWidth};`}
  ${({ borderRight }) => resolveBorderStyles(borderRight)}
  vertical-align: ${({ valign }) => valign};

  tr:has(+ :not([data-container])) > td&,
  tr:last-of-type > td& {
    border-bottom: 1px solid ${theme.cell.color.horizontal.body.borderColor};
  }

  tr:has(+ [data-container]) > td& {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      display: unset;
      top: 100%;
      left: 0;
      width: 100%;
      height: 8px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) -10%, rgba(0, 0, 0, 0.04) 25%, rgba(0, 0, 0, 0) 100%);
    }
  }

  th& {
    border-top-color: ${theme.cell.color.horizontal.head.borderColor};
    border-bottom-color: ${theme.cell.color.horizontal.head.borderColor};
    border-bottom-width: 1px;
  }

  th&:first-of-type,
  tbody:not(:has(td[rowspan])) &:first-of-type,
  tbody:has(td[rowspan]) &[rowspan] {
    padding-left: 4px;
  }

  &:last-of-type {
    padding-right: 4px;
  }
`;

const CellBox = styled.div<TableCellInnerProps>`
  padding: ${({ cellSize }) => theme.cell.size[cellSize].padding};
  text-align: ${({ align }) => align};

  & > div {
    height: 100%;
  }
`;

export const TableCell = forwardRef((props: TableCellProps, ref: Ref<HTMLTableCellElement>) => {
  const {
    children,
    isNewHeader,
    align = 'left',
    valign = 'middle',
    cellSize = 'medium',
    wordBreak = 'break-word',
    ...restProps
  } = props;

  const color = props.as === 'th' ? 'color/content/neutral/secondary/normal' : undefined;
  const weight = isNewHeader ? 'medium' : undefined;
  return (
    <Wrapper ref={ref} valign={valign} {...restProps}>
      <CellBox cellSize={cellSize} align={align}>
        <MDSTypography
          as={typeof children !== 'string' && typeof children !== 'number' ? 'div' : undefined}
          variant="body"
          size="s"
          data-typography-new-font
          color={color}
          weight={weight}
          wordBreak={wordBreak}
        >
          {children}
        </MDSTypography>
      </CellBox>
    </Wrapper>
  );
});
TableCell.displayName = 'MDSTableCell';

const resolveBorderStyles = (props?: BorderProps) => {
  if (!props) return '';

  const borderStyles = {
    width: (props !== true && props.width) || 1,
    style: (props !== true && props.style) || 'solid',
    color: (props !== true && props.color && props.color) || theme.cell.color.vertical.borderColor,
  };

  return `
    padding-right: 4px;
    border-right: ${borderStyles.width}px ${borderStyles.style} ${borderStyles.color};
    & + td, & + th {
      padding-left: 4px;
    }
  `;
};
