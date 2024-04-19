import styled from '@emotion/styled';
import { ModalActionProps } from './@types';

const Wrapper = styled.div<ModalActionProps>`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ justifyContent = 'flex-end' }) => `justify-content: ${justifyContent};`}
`;

export const Action = (props: ModalActionProps) => {
  const { children, justifyContent } = props;
  return <Wrapper justifyContent={justifyContent}>{children}</Wrapper>;
};
