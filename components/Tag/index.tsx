import React, { cloneElement } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../Typography';
import { theme as TagTheme } from './@constants';
import { IconProps, StyledTagProps, TagProps } from './@types';
import { getColor, getNodeText } from './@utils';

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

  ${({ variant, color, isClickable }) => {
    const themeColor = variant === 'ai' || !color ? TagTheme.color.ai : TagTheme.color[color][variant];

    const normalBackgroundColor = themeColor.normal.backgroundColor;
    const disabledBackgroundColor = themeColor.disabled.backgroundColor;
    const hoverBackgroundColor = themeColor.hover.backgroundColor;

    return `
      color: ${getColor(themeColor.normal.color)};
      background: ${getColor(normalBackgroundColor)};
      border-color: ${getColor(themeColor.normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
            &:hover {
              color: ${getColor(themeColor.hover.color)};
              background: ${getColor(hoverBackgroundColor)};
              border-color: ${getColor(themeColor.hover.borderColor)};
            }
          `
          : ''
      }
      
      &[disabled] {
        color: ${getColor(themeColor.disabled.color)};
        background: ${getColor(disabledBackgroundColor)};
        border-color: ${getColor(themeColor.disabled.borderColor)};
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

  const displayLabel =
    size === 'x-small'
      ? getNodeText(label)[0] // x-small 사이즈 일때는 첫번째 한글자만 출력
      : label;

  return (
    <Tag
      size={size}
      variant={variant}
      color={color}
      as={onClick ? 'button' : 'div'}
      isClickable={!!onClick && !isDisabled}
      onClick={onClick}
      disabled={isDisabled}
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
