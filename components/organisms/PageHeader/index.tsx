import { forwardRef } from 'react';
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
      max-height: ${isCompact ? '44px' : '48px'};
      padding: ${isCompact ? '12px 16px 8px' : '12px 16px'};
      ${isCompact ? '' : `border-bottom: 1px solid ${theme.color.border.neutral.weak.normal};`}
    `;
  }}
`;

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>((props, ref) => {
  const { backButton, pageTitle, isCompact = false, children } = props;

  return (
    <Wrapper ref={ref} isCompact={isCompact}>
      {backButton && <BackButton {...backButton} />}
      <MDSTypography variant="title" weight="semibold" size="l">
        {pageTitle}
      </MDSTypography>
      {children}
    </Wrapper>
  );
});
PageHeader.displayName = 'MDSPageHeader';

export const MDSPageHeader = PageHeader;
export type { PageHeaderProps as MDSPageHeaderProps } from './@types';
