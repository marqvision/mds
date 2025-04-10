import { isValidElement, useState } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { useTheme } from '@emotion/react';
import { MDSPopover } from '../Popover';
import { MDSTypography2 } from '../../atoms/Typography2';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTooltipProps } from './@types';
import { Theme } from './@constants';

const StyledChildren = styled.div<{ positionStyle: string }>`
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  align-self: center;
  width: fit-content;
  &:after {
    opacity: 0;
    transition: opacity 100ms ease-out;
    width: 8px;
    height: 6px;
    content: '';
    position: absolute;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%228%22%20height%3D%226%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M0%2C0%20L3.5%2C5%20Q4%2C5.5%204.5%2C5%20L8%2C0%20Z%22%20fill%3D%22${({
      theme,
    }) => theme.color.bg.surface.inverse.light.replace('#', '%23')}%22%20/%3E%3C/svg%3E');
    ${({ positionStyle }) => positionStyle}
  }
  &.active:after {
    opacity: 1;
    transition: opacity 300ms ease-out;
    transition-delay: 50ms;
  }
`;

const StyledIcon = styled(MDSIcon.Help)`
  align-self: center;
`;

export const MDSTooltip = (props: MDSTooltipProps) => {
  const { children, title, size = 'medium', position = 'top-center', width, style, anchorStyle } = props;
  const { color } = useTheme();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <MDSPopover
      position={position}
      hasDim={false}
      trigger="hover"
      anchor={
        <StyledChildren
          positionStyle={Theme.position[position.split('-')[0] as keyof typeof Theme.position]}
          className={clsx({
            active: isPopoverOpen,
          })}
          style={anchorStyle}
        >
          {children || <StyledIcon variant="border" size={16} color="color/content/neutral/secondary/normal" />}
        </StyledChildren>
      }
      onVisibleChange={size === 'medium' ? setIsPopoverOpen : undefined}
      width="auto"
      margin={Theme.size[size].margin}
      style={{
        backgroundColor: color.bg.surface.inverse.light,
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
        <MDSTypography2
          variant={Theme.size[size].variant}
          size={Theme.size[size].size}
          weight={Theme.size[size].weight}
          color="color/content/on_default_color"
        >
          {title}
        </MDSTypography2>
      )}
    </MDSPopover>
  );
};
