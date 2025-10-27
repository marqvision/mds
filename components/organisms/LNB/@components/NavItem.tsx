import { cloneElement, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { LinkComponentProps } from '../../../../types';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSTag } from '../../../molecules/Tag';
import { ItemProps, ItemType } from '../@types';
import { resolveNavItemColor, resolveNavItemPadding } from '../@utils';

const Wrapper = styled.div<{ isOpen: boolean; type: ItemType; selected?: boolean } & Partial<LinkComponentProps>>`
  ${({ theme, isOpen, type, selected }) => {
    const padding = resolveNavItemPadding({ isOpen, type });
    const { color, hoverColor, backgroundColor, hoverBackgroundColor } = resolveNavItemColor({ theme, selected });

    return `
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 8px;
      align-items: center;
      border-radius: 8px;
      text-decoration: none;
      cursor: pointer;
      overflow: hidden;
      transition: 0.2s;
      padding: ${padding};
      color: ${color};
      background-color: ${backgroundColor};
      
      &:active, &:visited {
        color: ${color};
        background-color: ${backgroundColor};
      }
      
      &:hover {
        color: ${hoverColor};
        background-color: ${hoverBackgroundColor};
      }
    `;
  }}
`;

const FlexRow = styled.div<{ isFolded: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  transition: 0.2s;
  flex-grow: 1;
  ${({ isFolded }) => {
    const opacity = isFolded ? 0 : 1;
    return `
      flex-wrap: ${isFolded ? 'nowrap' : 'normal'};
      opacity: ${opacity};
    `;
  }}
`;

export const NavItem = <Type extends ItemType>(props: ItemProps<Type>) => {
  const {
    LinkComponent,
    path,
    label,
    icon,
    isSubOpen,
    type,
    shouldCollapse,
    isNew,
    isBeta,
    onFold,
    onClick,
    onItemClick,
    parentLabel,
  } = props;

  const Icon = icon && cloneElement(icon, { size: 20, color: 'currentColor' });

  const isFoldVisible = typeof isSubOpen === 'boolean';
  const FoldIcon = isSubOpen ? MDSIcon.ArrowUp : MDSIcon.ArrowDown;
  const isLabelVisible = props.isOpen || type === 'popover';

  const handleClick = (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    if (isFoldVisible) {
      onClick?.();
    } else if (shouldCollapse) {
      onFold();
    }

    const currentItem = {
      icon,
      label,
      path,
      parentLabel,
      key: props.key,
      items: props.items,
    };
    onItemClick?.(currentItem, e);
  };

  return (
    <Wrapper as={path ? LinkComponent : undefined} to={path} {...props} onClick={handleClick}>
      {Icon}
      <FlexRow isFolded={!isLabelVisible}>
        <MDSTypography color="inherit" weight="medium" whiteSpace="nowrap">
          {label}
        </MDSTypography>
        {isNew && (
          <MDSTag variant="fill" size="small" color="red">
            New
          </MDSTag>
        )}
        {isBeta && (
          <MDSTag variant="fill" size="small" color="teal">
            Beta
          </MDSTag>
        )}
      </FlexRow>
      {isFoldVisible && <FoldIcon variant="outline" size={16} style={{ color: 'currentColor' }} />}
    </Wrapper>
  );
};
