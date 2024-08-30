import React, { cloneElement, isValidElement } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MDSTypography } from '../Typography';
import { resolveColor } from '../../@system';
import { ChipProps, IconProps, LoadingSpinnerProps, StyledChipProps } from './@types';
import { theme as ChipTheme } from './@constants';

export type MDSChipProps = ChipProps;

const Chip = styled.button<StyledChipProps>`
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-width: 1px;
  border-style: solid;
  user-select: none;

  & i,
  & svg {
    flex-shrink: 0;
  }

  & p,
  & h2 {
    color: inherit;
  }

  ${({ isLoading }) => (isLoading === 'hideLabel' ? `& *:not(i) { opacity: 0; }` : '')}

  ${({ width }) => {
    return `
      display: ${width === 'fill' ? 'flex' : 'inline-flex'};
      ${width !== 'hug' ? `width: ${width !== 'fill' ? width : '100%'};` : ''}
    `;
  }}

  ${({ size }) => {
    return `
      gap: ${ChipTheme.size[size].gap};
      padding: ${ChipTheme.size[size].padding};
      border-radius: ${ChipTheme.size[size].radius};
      min-height: ${ChipTheme.size[size].minHeight};
    `;
  }}

  ${({ variant, color, isDisabled, isCompleted, isClickable }) => {
    if (isDisabled) {
      const backgroundColor = ChipTheme.color[color][variant].disabled.backgroundColor;

      return `
        color: ${resolveColor(ChipTheme.color[color][variant].disabled.color)};
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        border-color: ${resolveColor(ChipTheme.color[color][variant].disabled.borderColor)};
      `;
    }

    if (isCompleted) {
      const labelColor = ChipTheme.color[color][variant].completed?.color;
      const backgroundColor = ChipTheme.color[color][variant].completed?.backgroundColor;
      const borderColor = ChipTheme.color[color][variant].completed?.borderColor;

      return `
        ${labelColor ? `color: ${resolveColor(labelColor)};` : ''}
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        ${borderColor ? `border-color: ${resolveColor(borderColor)};` : ''}
      `;
    }

    const backgroundColor = ChipTheme.color[color][variant].normal.backgroundColor;
    const hoverBackgroundColor = ChipTheme.color[color][variant].hover.backgroundColor;

    return `
        color: ${resolveColor(ChipTheme.color[color][variant].normal.color)};
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        border-color: ${resolveColor(ChipTheme.color[color][variant].normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
            &:hover {
              color: ${resolveColor(ChipTheme.color[color][variant].hover.color)};
              ${hoverBackgroundColor ? `background-color: ${resolveColor(hoverBackgroundColor)};` : ''}
              border-color: ${resolveColor(ChipTheme.color[color][variant].hover.borderColor)};
            }
          `
          : ''
      }
    `;
  }}
`;

const spin = keyframes`
  100%
  {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.i<LoadingSpinnerProps>`
  display: block;
  padding: 2px;

  ${({ isCenter }) => `
    position: ${isCenter ? 'absolute' : 'relative'};
    ${
      isCenter
        ? `
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
        : ''
    }
  `}

  ${({ size }) => `
    width: ${ChipTheme.size[size].icon}px;
    height: ${ChipTheme.size[size].icon}px;
  `}

  &:after {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    content: '';
    display: block;
    border-radius: 50%;
    animation: ${spin} 1s ease-out infinite;

    ${({ size }) => `
      border: ${ChipTheme.size[size].spinnerWidth} solid transparent;
      border-top-color: inherit;
      border-right-color: inherit;
    `}
  }
`;

const Icon = (props: IconProps) => {
  const { size, icon } = props;
  return cloneElement(icon, { size: ChipTheme.size[size].icon, color: icon.props.color || 'currentColor' });
};

export const MDSChip = (props: React.PropsWithChildren<ChipProps>) => {
  const {
    children: label,
    size,
    color,
    variant,
    width = 'hug',
    startIcon,
    endIcon,
    isLoading,
    isDisabled,
    isCompleted,
    onClick,
    tags,
    ...restProps
  } = props;

  if (isCompleted && (color !== 'bluegray' || !(variant === 'tint' || variant === 'border'))) {
    console.warn('[WARN] MDSChip: isCompleted 는 bluegray + tint, bluegray + border 조합에서만 사용할 수 있습니다.');
    return <></>;
  }

  return (
    <Chip
      size={size}
      variant={variant}
      color={color}
      width={width}
      as={!isLoading && onClick ? 'button' : 'div'}
      isLoading={isLoading}
      isClickable={!isLoading && !!onClick}
      onClick={!isLoading ? onClick : undefined}
      disabled={isDisabled || isCompleted}
      isDisabled={isDisabled}
      isCompleted={isCompleted}
      {...restProps}
    >
      {isLoading === 'hideLabel' && (
        <LoadingSpinner size={size} variant={variant} color={color} isCenter={isLoading === 'hideLabel'} />
      )}

      {isLoading === true ? (
        <LoadingSpinner size={size} variant={variant} color={color} />
      ) : (
        startIcon && <Icon size={size} icon={startIcon} />
      )}

      {isValidElement(label) ? (
        label
      ) : (
        <MDSTypography variant={ChipTheme.size[size].label} weight="medium" lineClamp={1} wordBreak="break-all">
          {label}
        </MDSTypography>
      )}

      {Array.isArray(tags) ? tags.map((tag) => tag) : tags}

      {endIcon && <Icon size={size} icon={endIcon} />}
    </Chip>
  );
};
