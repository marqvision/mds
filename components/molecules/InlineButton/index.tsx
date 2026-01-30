import { forwardRef, cloneElement, isValidElement, ReactElement, ElementType, Ref } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { TYPOGRAPHY_SIZE, ICON_SIZE, GAP_SIZE } from './@constants';
import { MDSInlineButtonProps, StyledInlineButtonProps } from './@types';
import { resolveColor } from './@utils';

export type { MDSInlineButtonProps } from './@types';

const getElementType = (isLink: boolean, isButton: boolean): ElementType => {
  if (isLink) return 'a';
  if (isButton) return 'button';
  return 'div';
};

const StyledInlineButton = styled.button<StyledInlineButtonProps>`
  ${({ theme, ...props }) => {
    const colorStyle = resolveColor(theme, props);

    return css`
      position: relative;
      display: inline-flex;
      vertical-align: middle;
      align-items: center;
      user-select: none;
      background: none;
      padding: 0;
      border: none;
      text-decoration: none;
      gap: ${GAP_SIZE[props.size]}px;
      color: ${colorStyle.content.normal};

      cursor: ${props.isClickable ? 'pointer' : 'default'};

      .icon-wrapper {
        display: ${props.isIconHoverable ? 'none' : 'inline-flex'};
      }

      &:hover,
      &:focus,
      &:focus-within {
        color: ${colorStyle.content.hover};
        text-decoration: ${props.isDisabled ? 'none' : 'underline'};

        .icon-wrapper {
          display: inline-flex;
        }
      }

      &:visited {
        color: ${colorStyle.content.visited};
      }
    `;
  }}
`;

const Icon = ({ icon, size }: { icon: ReactElement; size: number }) => {
  return (
    <span className="icon-wrapper">
      {cloneElement(icon, {
        size: icon.props.size || size,
        color: icon.props.color || 'currentColor',
      })}
    </span>
  );
};

export const MDSInlineButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, MDSInlineButtonProps>((props, ref) => {
  const {
    children,
    size = 'medium',
    color = 'blue',
    startIcon,
    endIcon,
    isIconHoverable,
    isDisabled,
    href,
    onClick,
    fontWeight = 'regular',
    lineClamp,
    ...restProps
  } = props;

  const isLink = !!href;
  const isButton = !!onClick && !isLink;

  const isClickable = (isButton || isLink) && !isDisabled;

  const commonProps: StyledInlineButtonProps & { as?: ElementType; href?: string; disabled?: boolean } = {
    size,
    color,
    as: getElementType(isLink, isButton),
    isClickable,
    isIconHoverable,
    isDisabled,
    href: isLink ? href : undefined,
    disabled: isButton ? isDisabled : undefined,
    ...restProps,
  };

  const disabledLinkProps = isLink && isDisabled ? { 'aria-disabled': true, tabIndex: -1 } : {};

  const handleClick = isClickable && onClick ? onClick : undefined;

  return (
    <StyledInlineButton
      {...commonProps}
      {...disabledLinkProps}
      onClick={handleClick}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {startIcon && <Icon icon={startIcon} size={ICON_SIZE[size]} />}

      {children && (
        <MDSTypography
          as={isValidElement(children) ? 'div' : undefined}
          variant="body"
          weight={fontWeight}
          size={TYPOGRAPHY_SIZE[size]}
          color="inherit"
          lineClamp={lineClamp}
          wordBreak={lineClamp ? 'break-all' : undefined}
        >
          {children}
        </MDSTypography>
      )}

      {endIcon && <Icon icon={endIcon} size={ICON_SIZE[size]} />}
    </StyledInlineButton>
  );
});

MDSInlineButton.displayName = 'MDSInlineButton';
