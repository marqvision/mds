import styled from '@emotion/styled';
import { Divider } from './@components/Divider';
import { Group } from './@components/Gourp';
import { StubLink } from './@components/StubLink';
import { LNBItem, LNBProps } from './@types';
import { checkIsNested } from './@utils';

const Wrapper = styled.div<LNBProps>`
  ${({ theme, ...props }) => {
    const width = props.isOpen ? '223px' : '54px';
    const paddingRight = props.isOpen ? '11px' : '7px';
    const paddingLeft = props.isOpen ? '12px' : '8px';

    return `
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: 0.3s;
      border-right: 1px solid ${theme.comp.lnb.color.divider.default};
      background-color: ${theme.comp.lnb.color.bg.normal};
      
      width: ${width};
      padding: 16px ${paddingRight} 16px ${paddingLeft};
    `;
  }}
`;

export const MDSLNB = (props: LNBProps) => {
  const { list: _list, LinkComponent = StubLink, ...restProps } = props;

  const list: LNBItem[][] = checkIsNested(_list) ? _list : [_list];

  return (
    <Wrapper {...props}>
      {list.flatMap((group, index) => [
        index > 0 && <Divider key={`divider-${index}`} isOpen={props.isOpen} />,
        ...group.map(({ key, ...item }) => <Group key={key} LinkComponent={LinkComponent} {...restProps} {...item} />),
      ])}
    </Wrapper>
  );
};
