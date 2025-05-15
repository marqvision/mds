import React, { forwardRef, isValidElement } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { Icon } from './@components/Icon';
import { PlainButtonProps, StyledPlainButtonProps } from './@types';
import { resolveColor, resolveSize } from './@utils';

export type MDSPlainButtonProps = PlainButtonProps;

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
        width: calc(100% + (${sizeStyle.horizontalPadding} * 2));
        height: calc(100% + (${sizeStyle.verticalPadding} * 2));
        padding: ${sizeStyle.verticalPadding} ${sizeStyle.horizontalPadding};
        border-radius: ${sizeStyle.radius};
        background: ${props.isClickable ? theme.color.bg.fill.target.default : ''};
        opacity: 0;
        transition: 0.3s;
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

export const MDSPlainButton = forwardRef<HTMLButtonElement, React.PropsWithChildren<PlainButtonProps>>((props, ref) => {
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
    ref,
  };

  if (icon) {
    return (
      <PlainButton isIconButton {...commonProps}>
        <Icon type="standalone" size={size} icon={icon} />
      </PlainButton>
    );
  }

  const sizeStyle = resolveSize(theme, commonProps);

  return (
    <PlainButton {...commonProps}>
      {startIcon && <Icon type="withLabel" size={size} icon={startIcon} />}

      {isValidElement(label)
        ? label
        : label && (
            <MDSTypography variant="body" weight="medium" size={sizeStyle.typography} color="inherit">
              {label}
            </MDSTypography>
          )}

      {endIcon && <Icon type="withLabel" size={size} icon={endIcon} />}
    </PlainButton>
  );
});
MDSPlainButton.displayName = 'MDSPlainButton';
