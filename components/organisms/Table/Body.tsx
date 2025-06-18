import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { TableBodyProps } from './@types';

const Wrapper = styled.tbody`
  margin-top: -1px;
`;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps} ref={ref}>{children}</Wrapper>;
});
TableBody.displayName = 'TableBody';