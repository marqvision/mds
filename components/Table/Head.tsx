import React, { Children, cloneElement } from 'react';
import styled from '@emotion/styled';
import { StyledTableHeadProps, TableHeadProps } from './@types';
import { theme } from './@constants';

const Wrapper = styled.thead<StyledTableHeadProps>`
  width: 100%;
  & > tr > th {
    border-bottom-style: solid;
  }

  ${({ isStickyHeader }) =>
    isStickyHeader
      ? `
      position: sticky;
      top: 0;
      z-index: 2;
    `
      : ''}

  ${({ isNewHeader }) =>
    isNewHeader
      ? `
      & > tr > th {
        background-color: ${theme.head.color.newHeader.backgroundColor};
        border-top-color: ${theme.head.color.newHeader.borderColor};
        border-bottom-color: ${theme.head.color.newHeader.borderColor};
        border-bottom-width: 1px;
      }
      `
      : ''}
  
  ${({ borderTop }) =>
    borderTop
      ? `
      & > tr > th {
        border-top-style: solid;
        border-top-width: 1px;
      }
      `
      : ''}
`;

export const TableHead = (props: TableHeadProps) => {
  const { children, isNewHeader, ...restProps } = props;

  const childClone = parseTdToTH(children, { isNewHeader });

  return (
    <Wrapper isNewHeader={isNewHeader} {...restProps}>
      {childClone}
    </Wrapper>
  );
};

const parseTdToTH = <Props,>(children: React.ReactElement | React.ReactElement[], props?: Props) =>
  // 자식 요소가 Cell 일 경우 th 요소로 출력
  Children.map(children, (child: React.ReactElement): React.ReactNode => {
    if (typeof child.type !== 'string' && 'displayName' in child.type && child.type.displayName === 'MDSTableCell') {
      return cloneElement(child, { ...child.props, as: 'th', ...props });
    }
    if (child.props.children) {
      return cloneElement(child, { ...child.props, children: parseTdToTH(child.props.children, props) });
    }
    return child;
  });
