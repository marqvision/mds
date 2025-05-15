import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { TBodyProps } from './@types';

const Wrapper = styled.tbody`
  margin-top: -1px;
`;

export const TableBody = forwardRef<HTMLTableSectionElement, TBodyProps>((props, ref) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps} ref={ref}>{children}</Wrapper>;
});
TableBody.displayName = 'MDSTable.Body';
