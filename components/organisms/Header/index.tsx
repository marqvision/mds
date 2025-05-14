import styled from '@emotion/styled';
import { MDSTypography } from '../..';
import { BackButton } from './@components/BackButton';
import { ButtonProps, HeaderProps } from './@types';

const Wrapper = styled.div`
  ${({ theme }) => {
    return `
      width: 100%;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid ${theme.color.border.neutral.weak.normal};
    `;
  }}
`;

const Header = (props: HeaderProps) => {
  const { onBack, LinkComponent, backTo, pageTitle, children } = props;

  const isBackButtonVisible = !!onBack || !!backTo;

  const backButtonProps = {
    onBack,
    LinkComponent,
    backTo,
  } as ButtonProps;

  return (
    <Wrapper>
      {isBackButtonVisible && <BackButton {...backButtonProps} />}
      <MDSTypography variant="title" weight="semibold" size="xl">
        {pageTitle}
      </MDSTypography>
      {children}
    </Wrapper>
  );
};

export const MDSHeader = Header;
export type { HeaderProps as MDSHeaderProps } from './@types';
