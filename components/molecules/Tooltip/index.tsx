import { isValidElement } from 'react';
import styled from '@emotion/styled';
import { MDSPopover } from '../Popover';
import { MDSTypography } from '../../atoms/Typography';
import { MDSIcon } from '../../atoms/Icon';
import { TooltipProps } from './@types';
import { Theme } from './@constants';

export type MDSTooltipProps = TooltipProps;

const StyledIcon = styled(MDSIcon.Help)`
  align-self: center;
`;

export const MDSTooltip = (props: TooltipProps) => {
  const {
    children,
    title,
    size = 'medium',
    position = 'top-center',
    width,
    interactive = true,
    bgColor = 'black',
    style,
  } = props;

  const contents = title ? (
    isValidElement(title) ? (
      title
    ) : (
      <MDSTypography
        variant={Theme.size[size].variant}
        size={Theme.size[size].size}
        weight={Theme.size[size].weight}
        color="color/content/on_default_color"
      >
        {title}
      </MDSTypography>
    )
  ) : undefined;

  return (
    <MDSPopover
      position={position}
      hasDim={false}
      trigger="hover"
      interactive={interactive}
      anchor={children || <StyledIcon variant="border" size={16} color="color/content/neutral/secondary/normal" />}
      width="auto"
      margin={Theme.size[size].margin}
      bgColor={bgColor}
      style={{
        borderRadius: '4px',
        maxWidth: width || Theme.size[size].maxWidth,
        width,
        padding: Theme.size[size].padding,
        maxHeight: 'unset',
        ...style,
      }}
      withArrow={size === 'medium'}
    >
      {contents}
    </MDSPopover>
  );
};
