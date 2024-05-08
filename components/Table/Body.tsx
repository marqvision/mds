import styled from '@emotion/styled';
import { TBodyProps } from './@types';

const Wrapper = styled.tbody`
  margin-top: -1px;

  &:last-child tr:last-child td {
    border-bottom: 0;
  }
`;

export const TableBody = (props: TBodyProps) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps}>{children}</Wrapper>;
};
