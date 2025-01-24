import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { MDSTypography } from '../Typography';
import { EmptyViewProps, StyledWrapperProps } from './@types';

const Wrapper = styled.div<StyledWrapperProps>`
  width: 100%;
  min-height: ${({ height }) => height};
  display: grid;
  grid-template-rows: 1fr auto 2fr;
  background-color: ${({ backgroundColor }) => backgroundColor ? resolveColor(backgroundColor) : ''};
  &:before, &:after {
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

export const MDSEmptyView = (props: EmptyViewProps) => {
  const { title, description, children, height = '100%' } = props;

  return (
    <Wrapper height={height}>
      <Content>
        <TextBox>
          <MDSTypography variant="T18" weight="medium">
            {title}
          </MDSTypography>
          {description && (
            <MDSTypography variant="T14" color="color/content/neutral/secondary/normal">
              {description}
            </MDSTypography>
          )}
        </TextBox>
        {children}
      </Content>
    </Wrapper>
  );
};
