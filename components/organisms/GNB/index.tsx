import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSImage } from '../../atoms/Image';
import { MDSButton } from '../../molecules/Button';
import { MDSLogo } from '../../atoms/Logo';
import { GNBProps } from './@types';

const Wrapper = styled.header`
  ${({ theme }) => {
    return `
      width: 100%;
      padding: 12px 16px 12px 14px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid ${theme.color.comp.divider.color.strong};
    `;
  }}
`;

const UtilityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-inline-start: auto;
`;

const GNB = (props: GNBProps) => {
  const { isLNBOpen, onLNBToggle, logoUrl, children } = props;

  const MenuIcon = isLNBOpen ? MDSIcon.MenuClose : MDSIcon.MenuOpen;

  return (
    <Wrapper>
      <MDSButton variant="border" size="medium" color="bluegray" icon={<MenuIcon />} onClick={onLNBToggle} />
      {logoUrl ? (
        <MDSImage src={logoUrl} width="auto" height="20px" iconSize="x-small" />
        ) : (
        <MDSLogo logoType="ai" color="black" />
      )}
      <UtilityWrapper>
        {children}
      </UtilityWrapper>
    </Wrapper>
  );
};

export const MDSGNB = GNB;
export type { GNBProps as MDSGNBProps } from './@types';
