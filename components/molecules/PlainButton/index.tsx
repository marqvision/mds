import React, { forwardRef, isValidElement, JSX, Ref } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { Icon } from './@components/Icon';
import { PlainButtonProps, StyledPlainButtonProps, Type } from './@types';
import { resolveColor, resolveSize } from './@utils';

export type MDSPlainButtonProps<T extends Type = 'composite'> = PlainButtonProps<T>;

const PlainButton = styled.button<StyledPlainButtonProps>`
  ${({ theme, ...props }) => {
    const sizeStyle = resolveSize(theme, props);
    const colorStyle = resolveColor(theme, props);

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
      color: ${colorStyle.content.normal};
      
      /* clickable 상태 시 스타일 */
      cursor: ${props.isClickable ? 'pointer' : ''};
      
      &:after {
        position: absolute;
        content: '';
        display: block;
        top: 50%;
        left: 50%;
        width: calc(100% + (${sizeStyle.horizontalPadding} * 2));
        height: calc(100% + (${sizeStyle.verticalPadding} * 2));
        padding: ${sizeStyle.verticalPadding} ${sizeStyle.horizontalPadding};
        border-radius: ${sizeStyle.radius};
        background: ${props.isClickable ? theme.color.bg.fill.target.default : ''};
        opacity: 0;
        transition: 0.3s;
        transform: translate(-50%, -50%);
      }
      
      &:hover {
        color: ${colorStyle.content.hover};
        &:after {
          opacity: ${props.isClickable ? 1 : ''};
        }
      }
    `;
  }}
`;

export const MDSPlainButton = forwardRef((props, ref) => {
  const {
    children: label,
    size = 'medium',
    color = 'blue',
    weight = 'medium',
    startIcon,
    endIcon,
    isDisabled,
    isCompleted,
    onClick,
    icon,
    ...restProps
  } = props;

  const theme = useTheme();

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

  const isButton = !!(onClick || props.type);

  const commonProps: StyledPlainButtonProps & React.ComponentProps<'button'> & { as: React.ElementType } = {
    size,
    color,
    as: isButton ? 'button' : 'div',
    isClickable: isButton && !isDisabled,
    onClick: handleClick,
    disabled: isButton && (isDisabled || isCompleted),
    isDisabled,
    isCompleted,
    ...restProps,
  };

  if (icon) {
    return (
      <PlainButton isIconButton {...commonProps} ref={ref}>
        <Icon type="standalone" size={size} icon={icon} />
      </PlainButton>
    );
  }

  const sizeStyle = resolveSize(theme, commonProps);

  return (
    <PlainButton {...commonProps} ref={ref}>
      {startIcon && <Icon type="withLabel" size={size} icon={startIcon} />}

      {isValidElement(label)
        ? label
        : label && (
            <MDSTypography variant="body" weight={weight} size={sizeStyle.typography} color="inherit">
              {label}
            </MDSTypography>
          )}

      {endIcon && <Icon type="withLabel" size={size} icon={endIcon} />}
    </PlainButton>
  );
}) as (<T extends Type>(props: PlainButtonProps<T> & { ref?: Ref<HTMLButtonElement> }) => JSX.Element) & {
  displayName?: string;
};
MDSPlainButton.displayName = 'MDSPlainButton';
