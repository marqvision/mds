import { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { resolveFontSize, resolveFontWeight as resolveFontWeightStyles } from '../Typography/@utils';
import { resolveColor } from '../../@system';
import { BorderProps, StyledTableCellProps, TableCellInnerProps, TableCellProps } from './@types';

const Wrapper = styled.td<StyledTableCellProps>`
  padding: 0;
  box-sizing: content-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.comp.table.color.border.horizontal.body};
  ${() => {
    const fontSize = resolveFontSize('T14');
    const fontWeightStyles = resolveFontWeightStyles('regular');

    return `
      font-size: ${fontSize};
      ${fontWeightStyles};
    `;
  }}
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ borderRight }) => resolveBorderStyles(borderRight)}
  vertical-align: ${({ valign }) => valign};

  th& {
    ${({ theme }) => `
      border-bottom: 1px solid ${theme.color.comp.table.color.border.horizontal.header};
      color: ${theme.color.content.neutral.secondary.normal};
    `}
  }

  th&:first-child,
  tbody:not(:has(td[rowspan])) &:first-child,
  tbody:has(td[rowspan]) &[rowspan] {
    padding-left: 4px;
  }

  &:last-child {
    padding-right: 4px;
  }
`;

const CellBox = styled.div<TableCellInnerProps>`
  padding: 12px;
  text-align: ${({ align }) => align};
`;

export const TableCell = forwardRef((props: TableCellProps, ref: Ref<HTMLTableCellElement>) => {
  const { children, align = 'left', valign = 'middle', ...restProps } = props;

  return (
    <Wrapper ref={ref} valign={valign} {...restProps}>
      <CellBox align={align}>{children}</CellBox>
    </Wrapper>
  );
});
TableCell.displayName = 'MDSTableCell';

const resolveBorderStyles = (props?: BorderProps) => {
  if (!props) return '';

  const borderStyles = {
    width: (props !== true && props.width) || 1,
    style: (props !== true && props.style) || 'solid',
    color: resolveColor('color/comp/table/color/border/vertical/default'),
  };

  return `
    padding-right: 4px;
    border-right: ${borderStyles.width}px ${borderStyles.style} ${borderStyles.color};
    & + td, & + th {
      padding-left: 4px;
    }
  `;
};
