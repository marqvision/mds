import React, { isValidElement } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../../utils';
import { MDSTypography } from '../../atoms/Typography';
import { Divider } from './@components/Divider';
import { Icon } from './@components/Icon';
import { theme as ButtonTheme } from './@constants';
import { ButtonProps, StyledButtonProps } from './@types';
import { getBorderRadius } from './@utils';
import { LoadingSpinner } from './@components/LoadingSpinner';

export type MDSButtonProps = ButtonProps;

const Button = styled.button<StyledButtonProps>`
  position: relative;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-width: 1px;
  border-style: solid;
  user-select: none;
  background-clip: padding-box;

  & i,
  & svg {
    flex-shrink: 0;
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
      gap: ${ButtonTheme.size[size].gap};
      padding: ${ButtonTheme.size[size].padding};
      min-height: ${ButtonTheme.size[size].minHeight};
      border-radius: ${getBorderRadius(size, flat)};
    `;
  }}

  ${({ size, flat }) => {
    const chipSpacing = ButtonTheme.size[size].flatPadding;

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
      const backgroundColor = ButtonTheme.color[color][variant].disabled.backgroundColor;

      return `
        color: ${resolveColor(ButtonTheme.color[color][variant].disabled.color)};
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        border-color: ${resolveColor(ButtonTheme.color[color][variant].disabled.borderColor)};
      `;
    }

    if (isCompleted) {
      const labelColor = ButtonTheme.color[color][variant].completed?.color;
      const backgroundColor = ButtonTheme.color[color][variant].completed?.backgroundColor;
      const borderColor = ButtonTheme.color[color][variant].completed?.borderColor;

      return `
        ${labelColor ? `color: ${resolveColor(labelColor)};` : ''}
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        ${borderColor ? `border-color: ${resolveColor(borderColor)};` : ''}
      `;
    }

    const backgroundColor = ButtonTheme.color[color][variant].normal.backgroundColor;
    const hoverBackgroundColor = ButtonTheme.color[color][variant].hover.backgroundColor;

    return `
        color: ${resolveColor(ButtonTheme.color[color][variant].normal.color)};
        background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
        border-color: ${resolveColor(ButtonTheme.color[color][variant].normal.borderColor)};
      
      ${
        isClickable
          ? `
            cursor: pointer;
            &:hover {
              color: ${resolveColor(ButtonTheme.color[color][variant].hover.color)};
              ${hoverBackgroundColor ? `background-color: ${resolveColor(hoverBackgroundColor)};` : ''}
              border-color: ${resolveColor(ButtonTheme.color[color][variant].hover.borderColor)};
            }
          `
          : ''
      }
    `;
  }}
`;

export const MDSButton = (props: React.PropsWithChildren<ButtonProps>) => {
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
    <Button
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
      {isLoading === 'hideLabel' && <LoadingSpinner size={ButtonTheme.size[size].spinnerSize} color="inherit" isCenter />}

      {isLoading === true ? (
        <LoadingSpinner size={ButtonTheme.size[size].spinnerSize} color="inherit" />
      ) : (
        startIcon && <Icon size={size} icon={startIcon} />
      )}

      {isValidElement(label)
        ? label
        : label && (
            // @ts-expect-error - variant=title/body에 따라 사용 가능한 size가 상이해서 에러 발생함. 추후 수정 필요
            <MDSTypography
              variant={ButtonTheme.size[size].label}
              weight={ButtonTheme.size[size].weight}
              size={ButtonTheme.size[size].size}
              color="inherit"
              lineClamp={1}
              wordBreak="break-all"
            >
              {label}
            </MDSTypography>
          )}

      {Array.isArray(tags) ? tags.map((tag) => tag) : tags}

      {endIcon && <Icon size={size} icon={endIcon} />}

      {isDividerVisible && <Divider variant={variant} color={color} size={size} />}
    </Button>
  );
};

/**
 * @deprecated
 * MDSButton 을 사용하세요.
 */
export const MDSChip = MDSButton;

/**
 * @deprecated
 * MDSButtonProps 를 사용하세요.
 */
export type MDSChipProps = ButtonProps;
