import React, { isValidElement } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { MDSTypography2 } from '../Typography2';
import { Divider } from './@components/Divider';
import { Icon } from './@components/Icon';
import { theme as ChipTheme } from './@constants';
import { ChipProps, StyledChipProps } from './@types';
import { getBorderRadius } from './@utils';
import { LoadingSpinner } from './@components/LoadingSpinner';

export type MDSChipProps = ChipProps;

const Chip = styled.button<StyledChipProps>`
  position: relative;
  vertical-align: middle;
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

  ${({ isLoading }) =>
    isLoading === 'hideLabel'
      ? `& *:not([role=loading-indicator], [role=loading-indicator] *, hr) { opacity: 0; }`
      : ''}

  ${({ width }) => {
    return `
      display: ${width === 'fill' ? 'flex' : 'inline-flex'};
      ${width !== 'hug' ? `width: ${width !== 'fill' ? width : '100%'};` : ''}
    `;
  }}

  ${({ size, flat }) => {
    return `
      gap: ${ChipTheme.size[size].gap};
      padding: ${ChipTheme.size[size].padding};
      min-height: ${ChipTheme.size[size].minHeight};
      border-radius: ${getBorderRadius(size, flat)};
    `;
  }}

  ${({ size, flat }) => {
    const chipSpacing = ChipTheme.size[size].flatPadding;

    return `
      ${
        flat === 'left' || flat === 'both'
          ? `
        padding-left: ${chipSpacing};
        border-left: none;
      `
          : ''
      }
      ${
        flat === 'right' || flat === 'both'
          ? `
        padding-right: ${chipSpacing};
        border-right: none;
        margin-right: 1px;
      `
          : ''
      }
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
    flat,
    ...restProps
  } = props;

  if (isCompleted && (color !== 'bluegray' || !(variant === 'tint' || variant === 'border'))) {
    console.warn('[WARN] MDSChip: isCompleted 는 bluegray + tint, bluegray + border 조합에서만 사용할 수 있습니다.');
    return <></>;
  }

  const isDividerVisible = flat === 'right' || flat === 'both';

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isLoading) return;
        onClick(event);
      }
    : undefined;

  return (
    <Chip
      size={size}
      variant={variant}
      color={color}
      width={width}
      as={onClick ? 'button' : 'div'}
      isLoading={isLoading}
      isClickable={!isLoading && !!onClick}
      onClick={handleClick}
      disabled={isDisabled || isCompleted}
      isDisabled={isDisabled}
      isCompleted={isCompleted}
      flat={flat}
      {...restProps}
    >
      {isLoading === 'hideLabel' && <LoadingSpinner size={ChipTheme.size[size].spinnerSize} color="inherit" isCenter />}

      {isLoading === true ? (
        <LoadingSpinner size={ChipTheme.size[size].spinnerSize} color="inherit" />
      ) : (
        startIcon && <Icon size={size} icon={startIcon} />
      )}

      {isValidElement(label)
        ? label
        : label && (
            // @ts-expect-error - variant=title/body에 따라 사용 가능한 size가 상이해서 에러 발생함. 추후 수정 필요
            <MDSTypography2
              variant={ChipTheme.size[size].label}
              weight={ChipTheme.size[size].weight}
              size={ChipTheme.size[size].size}
              lineClamp={1}
              wordBreak="break-all"
            >
              {label}
            </MDSTypography2>
          )}

      {Array.isArray(tags) ? tags.map((tag) => tag) : tags}

      {endIcon && <Icon size={size} icon={endIcon} />}

      {isDividerVisible && <Divider variant={variant} color={color} size={size} />}
    </Chip>
  );
};
