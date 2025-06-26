import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSButton } from '../../molecules/Button';
import { MDSLogo } from '../../atoms/Logo';
import { GNBProps } from './@types';

const Wrapper = styled.header`
  ${({ theme }) => {
    return `
      width: 100%;
      padding: 10px 16px 9px 14px;
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 1px solid ${theme.comp.divider.color.strong};
      & a {
        display: flex;
      }
    `;
  }}
`;

const GNB = (props: GNBProps) => {
  const { isLNBOpen, onLNBToggle, LinkComponent, children } = props;

  const MenuIcon = isLNBOpen ? MDSIcon.MenuClose : MDSIcon.MenuOpen;

  const Logo = <MDSLogo logoType="ai" color="black" />;

  return (
    <Wrapper>
      <MDSButton variant="border" size="medium" color="bluegray" icon={<MenuIcon />} onClick={onLNBToggle} />
      {LinkComponent ? <LinkComponent to="/">{Logo}</LinkComponent> : Logo}
      {children}
    </Wrapper>
  );
};

export const MDSGNB = GNB;
export type { GNBProps as MDSGNBProps } from './@types';
