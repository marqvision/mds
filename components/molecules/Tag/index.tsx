import React, { cloneElement, forwardRef } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { theme as TagTheme } from './@constants';
import { IconProps, StyledTagProps, TagProps } from './@types';
import { getColor } from './@utils';

export type MDSTagProps = TagProps;

const Tag = styled.button<StyledTagProps>`
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-style: solid;
  user-select: none;
  display: inline-flex;
  transition: 0.3s;

  ${({ size }) => {
    return `
      gap: ${TagTheme.size[size].gap};
      padding: ${TagTheme.size[size].padding};
      border-width: ${TagTheme.size[size].borderWidth}px;
      border-radius: ${TagTheme.size[size].radius};
      min-height: ${TagTheme.size[size].minHeight};
      
      ${
        size === 'x-small'
          ? `
        height: ${TagTheme.size[size].minHeight}; 
        min-width: ${TagTheme.size[size].minHeight};
        overflow: hidden;
      `
          : ''
      }
    `;
  }}

  ${({ variant, color, isClickable, size }) => {
    const themeColor = variant === 'ai' || !color ? TagTheme.color.ai : TagTheme.color[color][variant];

    const normalBackgroundColor = themeColor.normal.backgroundColor;
    const disabledBackgroundColor = themeColor.disabled.backgroundColor;
    const hoverBackgroundColor = themeColor.hover.backgroundColor;
    const clickAreaSize = `calc(100% + ${TagTheme.size[size].borderWidth * 2}px + ${
      TagTheme.size[size].clickAreaPadding * 2
    }px)`;

    return `
      color: ${getColor(themeColor.normal.color)};
      background: ${getColor(normalBackgroundColor)};
      border-color: ${getColor(themeColor.normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
              
            &:after {
              content: '';
              position: absolute;
              width: ${clickAreaSize};
              height: ${clickAreaSize};
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 8px;
              transition: 0.3s;
              border: ${TagTheme.size[size].clickAreaPadding}px solid transparent;
            }
            
            &:hover {
              color: ${getColor(themeColor.hover.color)};
              background: ${getColor(hoverBackgroundColor)};
              border-color: ${getColor(themeColor.hover.borderColor)};
              
              &:after {
                border-color: ${getColor(themeColor.hover.clickAreaColor)};
              }
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

  const ResolvedIcon = cloneElement(icon, {
    size: icon.props.size || TagTheme.size[size].icon,
    color: icon.props.color || 'currentColor',
  });

  if (size === 'x-small') {
    return <IconWrapper>{ResolvedIcon}</IconWrapper>;
  }

  return ResolvedIcon;
};

export const MDSTag = forwardRef<HTMLButtonElement, React.PropsWithChildren<TagProps>>((props, ref) => {
  const {
    children: label,
    size,
    icon,
    color,
    variant,
    startIcon,
    endIcon,
    isDisabled,
    onClick,
    lineClamp,
    ...restProps
  } = props;

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
      ref={ref}
    >
      {startIcon && <Icon size={size} icon={startIcon} />}

      <MDSTypography
        variant="body"
        weight="medium"
        size={TagTheme.size[size].size}
        color="inherit"
        overflowWrap="normal"
        style={{
          lineHeight: TagTheme.size[size].lineHeight,
        }}
        lineClamp={lineClamp}
      >
        {label}
      </MDSTypography>

      {icon && <Icon size={size} icon={icon} />}

      {endIcon && <Icon size={size} icon={endIcon} />}
    </Tag>
  );
});
MDSTag.displayName = 'MDSTag';
