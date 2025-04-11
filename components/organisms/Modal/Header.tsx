import { useContext } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography2 } from '../../atoms/Typography2';
import { Context } from './index';
import { ModalHeaderProps, StyledModalHeaderProps } from './@types';

const Wrapper = styled.div<StyledModalHeaderProps>`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  ${({ theme, isBorderBottom }) =>
    isBorderBottom && `border-bottom: 1px solid ${theme.color.border.neutral.default.normal}`};
  ${({ isScrollTop }) =>
    !isScrollTop && `box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04), 0px 1px 8px rgba(0, 0, 0, 0.12)`};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8;
`;

const Close = styled(MDSIcon.CloseDelete)`
  cursor: pointer;
`;

export const Header = (props: ModalHeaderProps) => {
  const { icon, children, isBorderBottom = true, rightSideElement, onClose } = props;
  const { isScrollTop } = useContext(Context);

  const titleTag = typeof children === 'string' ? undefined : 'div';

  return (
    <Wrapper isBorderBottom={isBorderBottom} isScrollTop={isScrollTop}>
      <Title>
        {icon}
        <MDSTypography2 variant="title" size="xl" weight="semibold" as={titleTag}>
          {children}
        </MDSTypography2>
      </Title>

      <RightSide>
        {rightSideElement}
        {!!onClose && <Close variant="outline" onClick={onClose} />}
      </RightSide>
    </Wrapper>
  );
};
