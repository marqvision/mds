import { useContext } from 'react';
import styled from '@emotion/styled';
import { Context } from './index';
import { ModalContentProps } from './@types';

const Wrapper = styled.div`
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
`;

export const Content = (props: ModalContentProps) => {
  const { children, ...restProps } = props;
  const { onScrollContent } = useContext(Context);

  return (
    <Wrapper onScroll={onScrollContent} {...restProps}>
      {children}
    </Wrapper>
  );
};
