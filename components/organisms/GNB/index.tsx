import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSLogo } from '../../atoms/Logo';
import { MDSButton } from '../../molecules/Button';
import { GNBProps } from './@types';

const Wrapper = styled.header`
  ${({ theme }) => {
    return `
      width: 100%;
      padding: 10px 16px 9px;
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

const GNB = forwardRef<HTMLElement, GNBProps>((props, ref) => {
  const { isLNBOpen, onLNBToggle, LinkComponent, children } = props;

  const MenuIcon = isLNBOpen ? MDSIcon.MenuClose : MDSIcon.MenuOpen;

  return (
    <Wrapper ref={ref}>
      <MDSButton variant="border" size="medium" color="bluegray" icon={<MenuIcon />} onClick={onLNBToggle} />
      {LinkComponent ? (
        <LinkComponent to="/">
          <MDSLogo logoType="ai" color="black" />
        </LinkComponent>
      ) : (
        <MDSLogo logoType="ai" color="black" />
      )}
      {children}
    </Wrapper>
  );
});
GNB.displayName = 'MDSGNB';

export const MDSGNB = GNB;
export type { GNBProps as MDSGNBProps } from './@types';
