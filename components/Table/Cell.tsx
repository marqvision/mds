import { forwardRef, Ref } from 'react';
import styled from '@emotion/styled';
import { resolveFontSize, resolveFontWeight as resolveFontWeightStyles } from '../Typography/@utils';
import { StyledTableCellProps, TableCellProps } from './@types';

const Wrapper = styled.td<StyledTableCellProps>`
  padding: 0;
  box-sizing: content-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.comp.table.color.border.body};
  ${() => {
    const fontSize = resolveFontSize('T14');
    const fontWeightStyles = resolveFontWeightStyles('regular');

    return `
      font-size: ${fontSize};
      ${fontWeightStyles};
    `;
  }}
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  
  ${({ as, theme }) =>
    as === 'th' &&
    `
    border-bottom: 1px solid ${theme.color.comp.table.color.border.header};
    color: ${theme.color.content.neutral.secondary.normal};
    `}

  &:first-child {
    padding-left: 4px;
  }

  &:last-child {
    padding-right: 4px;
  }
`;

const CellBox = styled.div<{ align: 'center' | 'left' | 'right' | 'justify' | 'char' }>`
  padding: 12px;
  text-align: ${({ align }) => align};
`;

export const TableCell = forwardRef((props: TableCellProps, ref: Ref<HTMLTableCellElement>) => {
  const { children, align = 'left', ...restProps } = props;

  return (
    <Wrapper ref={ref} {...restProps}>
      <CellBox align={align}>{children}</CellBox>
    </Wrapper>
  );
});
TableCell.displayName = 'MDSTableCell';
