import { forwardRef, useContext } from 'react';
import styled from '@emotion/styled';
import { Context } from './index';
import { ModalContentProps } from './@types';

const Wrapper = styled.div`
  flex: 1;
  padding: 16px 20px;
  overflow-y: auto;
`;

export const Content = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
  const { children, ...restProps } = props;
  const { onScrollContent } = useContext(Context);

  return (
    <Wrapper onScroll={onScrollContent} {...restProps} ref={ref}>
      {children}
    </Wrapper>
  );
});
Content.displayName = 'MDSModal.Content';
