import React, { Children, cloneElement } from 'react';
import styled from '@emotion/styled';
import { StyledTableHeadProps, TableHeadProps } from './@types';

const Wrapper = styled.thead<StyledTableHeadProps>`
  width: 100%;

  ${({ isStickyHeader }) =>
    isStickyHeader &&
    `
    position: sticky;
    top: 0;
    z-index: 2;
  `}
`;

export const TableHead = (props: TableHeadProps) => {
  const { children, ...restProps } = props;

  const childClone = parseTdToTH(children);

  return <Wrapper {...restProps}>{childClone}</Wrapper>;
};

const parseTdToTH = (children: React.ReactElement | React.ReactElement[]) =>
  // 자식 요소가 Cell 일 경우 th 요소로 출력
  Children.map(children, (child: React.ReactElement): React.ReactNode => {
    if (typeof child.type !== 'string' && 'displayName' in child.type && child.type.displayName === 'MDSTableCell') {
      return cloneElement(child, { ...child.props, as: 'th' });
    }
    if (child.props.children.length) {
      return cloneElement(child, { ...child.props, children: parseTdToTH(child.props.children) });
    }
    return child;
  });
