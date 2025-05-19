import styled from '@emotion/styled';
import { TBodyProps } from './@types';

const Wrapper = styled.tbody`
  margin-top: -1px;
`;

export const TableBody = (props: TBodyProps) => {
  const { children, ...restProps } = props;

  return <Wrapper {...restProps}>{children}</Wrapper>;
};
