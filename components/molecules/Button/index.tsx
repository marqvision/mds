import React, { isValidElement } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { Divider } from './@components/Divider';
import { Icon } from './@components/Icon';
import { LoadingSpinner } from './@components/LoadingSpinner';
import { ButtonProps, StyledButtonProps } from './@types';
import { getBorderRadius, resolveFlatStyles } from './@utils';
import { getColor, getSize } from './@utils/styles';

export type MDSButtonProps = ButtonProps;

const Button = styled.button<StyledButtonProps>`
  ${({ theme, ...props }) => {
    const sizeStyle = getSize(theme)[props.size];
    const colorStyle = getColor(theme)[props.color][props.variant];

    const displayStyle = props.width === 'fill' ? 'flex' : 'inline-flex';
    const widthStyle = props.width === 'hug' ? 'auto' : props.width === 'fill' ? '100%' : props.width;
    const borderRadiusStyle = getBorderRadius(theme, props);
    const minHeightStyle = sizeStyle.minHeight;
    const gapStyle = sizeStyle.gap;
    const defaultPadding = props.isIconButton && !props.flat ? sizeStyle.iconPadding : sizeStyle.padding;
    const { paddingLeft, paddingRight, borderLeft, borderRight, marginRight } = resolveFlatStyles(theme, props);

    const color = props.isDisabled
      ? colorStyle.disabled.color
      : props.isCompleted
        ? colorStyle.completed?.color
        : colorStyle.normal.color;
    const backgroundColor = props.isDisabled
      ? colorStyle.disabled.backgroundColor
      : props.isCompleted
        ? colorStyle.completed?.backgroundColor
        : colorStyle.normal.backgroundColor;
    const borderColor = props.isDisabled
      ? colorStyle.disabled.borderColor
      : props.isCompleted
        ? colorStyle.completed?.borderColor
        : colorStyle.normal.borderColor;

    return `
      position: relative;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      border-width: 1px;
      border-style: solid;
      user-select: none;
      background-clip: padding-box;

      & i,
      & svg {
        flex-shrink: 0;
      }
      
      display: ${displayStyle};
      width: ${widthStyle};
      border-radius: ${borderRadiusStyle};
      min-height: ${minHeightStyle};
      gap: ${gapStyle};
      padding: ${defaultPadding};
      color: ${color || 'inherit'};
      background-color: ${backgroundColor || 'transparent'};
      border-color: ${borderColor || 'transparent'};
      
      /* flat 적용 시 스타일 */
      padding-left: ${paddingLeft || ''};
      padding-right: ${paddingRight || ''};
      border-left: ${borderLeft || ''};
      border-right: ${borderRight || ''};
      margin-right: ${marginRight || ''};
      
      /* clickable 상태 시 스타일 */
      cursor: ${props.isClickable ? 'pointer' : ''};
      &:hover {
        color: ${props.isClickable ? colorStyle.hover.color : ''};
        background-color: ${props.isClickable ? colorStyle.hover.backgroundColor : ''};
        border-color: ${props.isClickable ? colorStyle.hover.borderColor : ''};
      }
      
      /* isLoading === hideLabel 시 */
      ${
        props.isLoading === 'hideLabel'
          ? `& *:not([role=loading-indicator], [role=loading-indicator] *, hr) { opacity: 0; }`
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
    icon,
    ...restProps
  } = props;

  const theme = useTheme();
  const sizeStyle = getSize(theme)[props.size];

  if (isCompleted && (color !== 'bluegray' || !(variant === 'tint' || variant === 'border'))) {
    console.warn('[WARN] MDSButton: isCompleted 는 bluegray + tint, bluegray + border 조합에서만 사용할 수 있습니다.');
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

  const commonProps: StyledButtonProps & React.ComponentProps<'button'> & { as: React.ElementType } = {
    size,
    variant,
    color,
    width,
    as: onClick ? 'button' : 'div',
    isLoading: isLoading ? 'hideLabel' : undefined,
    isClickable: !isLoading && !!onClick,
    onClick: handleClick,
    disabled: isDisabled || isCompleted,
    isDisabled,
    isCompleted,
    flat,
    ...restProps,
  };

  if (icon) {
    return (
      <Button isIconButton {...commonProps}>
        {isLoading && <LoadingSpinner size={sizeStyle.spinnerSize} color="inherit" isCenter />}

        {icon && <Icon size={size} icon={icon} />}

        {isDividerVisible && <Divider variant={variant} color={color} size={size} />}
      </Button>
    );
  }

  return (
    <Button {...commonProps}>
      {isLoading === 'hideLabel' && <LoadingSpinner size={sizeStyle.spinnerSize} color="inherit" isCenter />}

      {isLoading === true ? (
        <LoadingSpinner size={sizeStyle.spinnerSize} color="inherit" />
      ) : (
        startIcon && <Icon size={size} icon={startIcon} />
      )}

      {isValidElement(label)
        ? label
        : label && (
            <MDSTypography
              variant="body"
              weight="medium"
              size={sizeStyle.size}
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
