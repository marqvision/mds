import React, { cloneElement } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { MDSTypography } from '../Typography';
import { theme as TagTheme } from './@constants';
import { IconProps, StyledTagProps, TagProps } from './@types';

const Tag = styled.button<StyledTagProps>`
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-style: solid;
  user-select: none;
  display: inline-flex;

  & p,
  & h2 {
    color: inherit;
  }

  ${({ size }) => {
    return `
      gap: ${TagTheme.size[size].gap};
      padding: ${TagTheme.size[size].padding};
      border-width: ${TagTheme.size[size].borderWidth};
      border-radius: ${TagTheme.size[size].radius};
      min-height: ${TagTheme.size[size].minHeight};
      
      ${
        size === 'x-small'
          ? `
        height: ${TagTheme.size[size].minHeight}; 
        aspect-ratio: 1; 
        overflow: hidden;
      `
          : ''
      }
    `;
  }}

  ${({ variant, color, isDisabled, isClickable }) => {
    if (isDisabled) {
      const backgroundColor = TagTheme.color[color][variant].disabled.backgroundColor;

      return `
        color: ${resolveColor(TagTheme.color[color][variant].disabled.color)};
        ${backgroundColor ? `background-color: ${resolveColor(backgroundColor)};` : ''};
        border-color: ${resolveColor(TagTheme.color[color][variant].disabled.borderColor)};
      `;
    }

    const backgroundColor = TagTheme.color[color][variant].normal.backgroundColor;
    const hoverBackgroundColor = TagTheme.color[color][variant].hover.backgroundColor;

    return `
        color: ${resolveColor(TagTheme.color[color][variant].normal.color)};
        ${backgroundColor ? `background-color: ${resolveColor(backgroundColor)};` : ''}
        border-color: ${resolveColor(TagTheme.color[color][variant].normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
            &:hover {
              color: ${resolveColor(TagTheme.color[color][variant].hover.color)};
              ${hoverBackgroundColor ? `background-color: ${resolveColor(hoverBackgroundColor)};` : ''}
              border-color: ${resolveColor(TagTheme.color[color][variant].hover.borderColor)};
            }
          `
          : ''
      }
    `;
  }}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Icon = (props: IconProps) => {
  const { size, icon } = props;

  if (size === 'x-small') {
    return (
      <IconWrapper>
        {cloneElement(icon, { size: TagTheme.size[size].icon, color: icon.props.color || 'currentColor' })}
      </IconWrapper>
    );
  }

  return cloneElement(icon, { size: TagTheme.size[size].icon, color: icon.props.color || 'currentColor' });
};

export const MDSTag = (props: React.PropsWithChildren<TagProps>) => {
  const { children: label, size, icon, color, variant, startIcon, endIcon, isDisabled, onClick, ...restProps } = props;

  const displayLabel = size === 'x-small' && typeof label === 'string' ? label[0] : label;

  return (
    <Tag
      size={size}
      variant={variant}
      color={color}
      as={onClick ? 'button' : 'div'}
      isClickable={!!onClick}
      onClick={onClick}
      disabled={isDisabled}
      isDisabled={isDisabled}
      {...restProps}
    >
      {startIcon && <Icon size={size} icon={startIcon} />}

      <MDSTypography variant={TagTheme.size[size].label} weight="medium">
        {displayLabel}
      </MDSTypography>

      {icon && <Icon size={size} icon={icon} />}

      {endIcon && <Icon size={size} icon={endIcon} />}
    </Tag>
  );
};
