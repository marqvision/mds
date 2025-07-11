import styled from '@emotion/styled';
import { MDSTypography } from '../..';
import { BackButton } from './@components/BackButton';
import { PageHeaderProps } from './@types';

const Wrapper = styled.div<{ isCompact: boolean }>`
  ${({ theme, isCompact }) => {
    return `
      width: 100%;
      display: flex;
      align-items: center;
      gap: 16px;
      min-height: ${isCompact ? '44px' : '50px'};
      padding: ${isCompact ? '7px 16px 3px' : '9px 16px 8px'};
      ${isCompact ? '' : `border-bottom: 1px solid ${theme.color.border.neutral.weak.normal};`}
    `;
  }}
`;

const PageHeader = (props: PageHeaderProps) => {
  const { backButton, pageTitle, isCompact = false, children } = props;

  return (
    <Wrapper isCompact={isCompact}>
      {backButton && <BackButton {...backButton} />}
      <MDSTypography variant="title" weight="semibold" size="l">
        {pageTitle}
      </MDSTypography>
      {children}
    </Wrapper>
  );
};

export const MDSPageHeader = PageHeader;
export type { PageHeaderProps as MDSPageHeaderProps } from './@types';
