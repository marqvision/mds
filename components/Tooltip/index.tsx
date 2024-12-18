import { isValidElement, JSXElementConstructor, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { MDSPopover } from '../Popover';
import { MDSThemeValue } from '../../foundation';
import { MDSTypography } from '../Typography';
import { MDSIcon } from '../Icon';
import { MDSTooltipProps } from './@types';
import { Theme } from './@constants';

const getStyledTail = (positionStyle: string) => `
  &:after {
    opacity: 0;
    transition: opacity 300ms ease-out;
    width: 8px;
    height: 6px;
    content: '';
    position: absolute;
    background-image: url("data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%226%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%2C0%20L3.5%2C5%20Q4%2C5.5%204.5%2C5%20L8%2C0%20Z%22%20fill%3D%22${MDSThemeValue.color.bg.surface.inverse.light.replace(
      '#',
      '%23'
    )}%22%20/%3E%3C/svg%3E");
    ${positionStyle}
  }
  &.active:after {
    opacity: 1;
  }
`;

const StyledIcon = styled(MDSIcon.Info)`
  align-self: center;
`;

export const MDSTooltip = (props: MDSTooltipProps) => {
  const { children: _children, title, size = 'medium', position = 'top-center', width, style } = props;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const children = useMemo(() => _children || <StyledIcon variant="border" size={16} />, [_children]);

  const StyledChildren = useMemo(
    () => styled(children.type as JSXElementConstructor<HTMLElement>)`
      position: relative;
      ${getStyledTail(Theme.position[position.split('-')[0] as keyof typeof Theme.position])}
    `,
    [children, position]
  );

  return (
    <MDSPopover
      position={position}
      hasDim={false}
      trigger="hover"
      anchor={
        <StyledChildren
          className={clsx({
            active: isPopoverOpen,
          })}
          {...children.props}
        />
      }
      onVisibleChange={size === 'medium' ? setIsPopoverOpen : undefined}
      width="auto"
      margin={Theme.size[size].margin}
      style={{
        backgroundColor: MDSThemeValue.color.bg.surface.inverse.light,
        borderRadius: '4px',
        maxWidth: width || Theme.size[size].maxWidth,
        width,
        padding: Theme.size[size].padding,
        maxHeight: 'unset',
        ...style,
      }}
    >
      {isValidElement(title) ? (
        title
      ) : (
        <MDSTypography variant={Theme.size[size].fontSize} color="color/content/on_default_color">
          {title}
        </MDSTypography>
      )}
    </MDSPopover>
  );
};
