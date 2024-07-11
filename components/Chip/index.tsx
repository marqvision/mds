import React, { cloneElement } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MDSTypography } from '../Typography';
import { resolveColor } from '../../@system';
import { ChipProps, IconProps, LoadingSpinnerProps, StyledChipProps } from './@types';
import { theme } from './@constants';

const Chip = styled.button<StyledChipProps>`
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-width: 1px;
  border-style: solid;
  user-select: none;

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
      gap: ${theme.size[size].gap};
      padding: ${theme.size[size].padding};
      border-radius: ${theme.size[size].radius};
      min-height: ${theme.size[size].minHeight};
    `;
  }}

  ${({ variant, color, isDisabled, isCompleted, isClickable }) => {
    if (isDisabled) {
      return `
        color: ${resolveColor(theme.color[color][variant].disabled.color)};
        background-color: ${resolveColor(theme.color[color][variant].disabled.backgroundColor)};
        border-color: ${resolveColor(theme.color[color][variant].disabled.borderColor)};
      `;
    }

    if (isCompleted) {
      return `
        color: ${resolveColor(theme.color[color][variant].completed?.color)};
        background-color: ${resolveColor(theme.color[color][variant].completed?.backgroundColor)};
        border-color: ${resolveColor(theme.color[color][variant].completed?.borderColor)};
      `;
    }

    return `
        color: ${resolveColor(theme.color[color][variant].normal.color)};
        background-color: ${resolveColor(theme.color[color][variant].normal.backgroundColor)};
        border-color: ${resolveColor(theme.color[color][variant].normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
            &:hover {
              color: ${resolveColor(theme.color[color][variant].hover.color)};
              background-color: ${resolveColor(theme.color[color][variant].hover.backgroundColor)};
              border-color: ${resolveColor(theme.color[color][variant].hover.borderColor)};
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
    width: ${theme.size[size].icon}px;
    height: ${theme.size[size].icon}px;
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
      border: ${theme.size[size].spinnerWidth} solid transparent;
      border-top-color: inherit;
      border-right-color: inherit;
    `}
  }
`;

const Icon = (props: IconProps) => {
  const { size, icon } = props;
  return cloneElement(icon, { size: theme.size[size].icon, color: icon.props.color || 'currentColor' });
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
    ...restProps
  } = props;

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

      <MDSTypography variant={theme.size[size].label} weight="medium">
        {label}
      </MDSTypography>

      {endIcon && <Icon size={size} icon={endIcon} />}
    </Chip>
  );
};
