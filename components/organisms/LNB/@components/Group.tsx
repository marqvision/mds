import { useState } from 'react';
import styled from '@emotion/styled';
import { GroupProps } from '../@types';
import { checkIsMatched } from '../@utils';
import { GroupMainItem } from './GroupMainItem';
import { NavItem } from './NavItem';

const CollapseWrapper = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => {
    const gridTemplateRows = isOpen ? '1fr' : '0fr';

    return `
      display: grid;
      grid-template-rows: ${gridTemplateRows};
      overflow: hidden;
      transition: 0.25s;
    `;
  }}
`;
const CollapseInner = styled.div`
  overflow: hidden;
`;
const SubNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 8px 8px 36px;
`;

export const Group = (props: GroupProps) => {
  const { items, ...restProps } = props;

  const selected = checkIsMatched(props.path, props.value);
  const defaultSubOpen = selected || items?.some(({ path }) => checkIsMatched(path, props.value)) || false;

  const [isSubOpen, setIsSubOpen] = useState<boolean>(defaultSubOpen);

  // 하위 메뉴가 없을 경우
  if (!items || !items.length) {
    return (
      <GroupMainItem {...restProps}>
        <NavItem type="group" selected={selected} {...restProps} />
      </GroupMainItem>
    );
  }

  // 하위 메뉴가 있을 경우
  const isSubVisible = props.isOpen && isSubOpen;
  const mainItemPath = props.isOpen ? props.path : items[0].path;

  const toggleSubOpen = () => {
    setIsSubOpen((prev) => !prev);
  };

  const mainItemProps = {
    ...restProps,
    isSubOpen,
    selected: props.isOpen ? selected : defaultSubOpen,
    path: mainItemPath,
    onClick: toggleSubOpen,
  };

  const subItemProps = {
    isOpen: props.isOpen,
    value: props.value,
    LinkComponent: props.LinkComponent,
  };

  return (
    <div>
      <GroupMainItem {...mainItemProps} items={items}>
        <NavItem type="group" {...mainItemProps} />
      </GroupMainItem>

      <CollapseWrapper isOpen={isSubVisible}>
        <CollapseInner>
          <SubNavWrapper>
            {items.map(({ key, ...item }) => {
              const selected = checkIsMatched(item.path, props.value);
              return <NavItem key={key} type="sub" selected={selected} {...subItemProps} {...item} />;
            })}
          </SubNavWrapper>
        </CollapseInner>
      </CollapseWrapper>
    </div>
  );
};
