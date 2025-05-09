import React, { isValidElement } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { Icon } from './@components/Icon';
import { PlainButtonProps, StyledPlainButtonProps } from './@types';
import { getColor, getSize } from './@utils';

export type MDSPlainButtonProps = PlainButtonProps;

const PlainButton = styled.button<StyledPlainButtonProps>`
  ${({ theme, ...props }) => {
    const sizeStyle = getSize(theme)[props.size];
    const colorStyle = getColor(theme)[props.color];

    const verticalPadding = props.isIconButton ? sizeStyle.iconPadding : sizeStyle.verticalPadding;
    const horizontalPadding = props.isIconButton ? sizeStyle.iconPadding : sizeStyle.horizontalPadding;

    const color = props.isDisabled
      ? colorStyle.disabled.color
      : props.isCompleted
        ? colorStyle.completed?.color
        : colorStyle.normal.color;

    return `
      position: relative;
      display: inline-flex;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
      user-select: none;
      background: none;
      padding: 0;
      border: none;

      & i,
      & svg {
        flex-shrink: 0;
      }
      
      gap: ${sizeStyle.gap};
      color: ${color || 'inherit'};
      
      /* clickable 상태 시 스타일 */
      cursor: ${props.isClickable ? 'pointer' : ''};
      
      &:after {
        position: absolute;
        content: '';
        display: block;
        width: calc(100% + (${horizontalPadding} * 2));
        height: calc(100% + (${verticalPadding} * 2));
        padding: ${verticalPadding} ${horizontalPadding};
        border-radius: ${sizeStyle.radius};
        background: ${props.isClickable ? theme.color.bg.fill.target.default : ''};
        opacity: 0;
        transition: 0.3s;
      }
      
      &:hover {
        color: ${props.isClickable ? colorStyle.hover.color : ''};
        &:after {
          opacity: ${props.isClickable ? 1 : ''};
        }
      }
    `;
  }}
`;

export const MDSPlainButton = (props: React.PropsWithChildren<PlainButtonProps>) => {
  const {
    children: label,
    size = 'medium',
    color = 'blue',
    startIcon,
    endIcon,
    isDisabled,
    isCompleted,
    onClick,
    icon,
    ...restProps
  } = props;

  const theme = useTheme();
  const sizeStyle = getSize(theme)[size];

  if (isCompleted && color !== 'bluegray') {
    console.warn('[WARN] MDSPlainButton: isCompleted 는 bluegray 색상에만 사용할 수 있습니다.');
    return <></>;
  }

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(event);
      }
    : undefined;

  const commonProps: StyledPlainButtonProps & React.ComponentProps<'button'> & { as: React.ElementType } = {
    size,
    color,
    as: onClick ? 'button' : 'div',
    isClickable: !!onClick,
    onClick: handleClick,
    disabled: isDisabled || isCompleted,
    isDisabled,
    isCompleted,
    ...restProps,
  };

  if (icon) {
    return (
      <PlainButton isIconButton {...commonProps}>
        <Icon size={size} icon={icon} />
      </PlainButton>
    );
  }

  return (
    <PlainButton {...commonProps}>
      {startIcon && <Icon size={size} icon={startIcon} />}

      {isValidElement(label)
        ? label
        : label && (
            <MDSTypography variant="body" weight="medium" size={sizeStyle.size} color="inherit">
              {label}
            </MDSTypography>
          )}

      {endIcon && <Icon size={size} icon={endIcon} />}
    </PlainButton>
  );
};
