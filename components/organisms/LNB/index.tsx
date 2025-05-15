import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Divider } from './@components/Divider';
import { Group } from './@components/Group';
import { StubLink } from './@components/StubLink';
import { LNBItem, LNBProps } from './@types';
import { checkIsNested } from './@utils';

const Wrapper = styled.nav<LNBProps>`
  ${({ theme, ...props }) => {
    const width = props.isOpen ? '234px' : '60px';

    return `
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: 0.3s;
      border-right: 1px solid ${theme.comp.lnb.color.divider.default};
      background-color: ${theme.comp.lnb.color.bg.normal};
      
      width: ${width};
      padding: 12px 11px 12px 12px;
    `;
  }}
`;

export const MDSLNB = forwardRef<HTMLElement, LNBProps>((props, ref) => {
  const { list: _list, LinkComponent = StubLink, ...restProps } = props;

  const list: LNBItem[][] = checkIsNested(_list) ? _list : [_list];

  return (
    <Wrapper {...props} ref={ref}>
      {list.flatMap((group, index) => [
        index > 0 && <Divider key={`divider-${index}`} isOpen={props.isOpen} />,
        ...group.map(({ key, ...item }) => <Group key={key} LinkComponent={LinkComponent} {...restProps} {...item} />),
      ])}
    </Wrapper>
  );
});
MDSLNB.displayName = 'MDSLNB';

export type { LNBProps as MDSLNBProps, LNBItem as MDSLNBItem } from './@types';
