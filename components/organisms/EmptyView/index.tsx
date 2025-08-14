import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { EmptyViewProps, StyledWrapperProps } from './@types';

const Wrapper = styled.div<StyledWrapperProps>`
  width: 100%;
  min-height: ${({ height }) => height};
  padding: 40px 0;
  display: grid;
  grid-template-rows: 1fr auto 2fr;
  &:before,
  &:after {
    content: '';
  }
`;

const Content = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
`;

const TextBox = styled.div`
  display: grid;
  justify-items: center;
  gap: 8px;
`;

export const MDSEmptyView = forwardRef<HTMLDivElement, EmptyViewProps>((props, ref) => {
  const { title, description, children, height = '100%', ...restProps } = props;

  return (
    <Wrapper ref={ref} height={height} {...restProps}>
      <Content>
        <TextBox>
          <MDSTypography variant="title" size="l" weight="medium">
            {title}
          </MDSTypography>
          {description && (
            <MDSTypography variant="body" size="m" weight="regular" color="color/content/neutral/secondary/normal">
              {description}
            </MDSTypography>
          )}
        </TextBox>
        {children}
      </Content>
    </Wrapper>
  );
});
MDSEmptyView.displayName = 'MDSEmptyView';
