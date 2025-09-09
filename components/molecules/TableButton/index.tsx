import React from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { TableButtonProps } from './@types';
import { renderIcon } from './@utils';

const StyledButton = styled.button<{
  isClickable: boolean;
  disabled: boolean;
}>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background: none;
  border: none;
  height: 24px;
  padding: 0;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
  transition: color 0.3s ease;

  &:after {
    position: absolute;
    content: '';
    display: block;
    top: 50%;
    left: 50%;
    width: calc(100% + 12px);
    height: calc(100% + 8px);
    border-radius: 8px;
    background: ${({ theme, isClickable }) => (isClickable ? theme.color.bg.fill.target.default : 'transparent')};
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    &:after {
      opacity: ${({ isClickable }) => (isClickable ? 1 : 0)};
    }

    /* 하위 요소들의 색상도 hover 시 변경 */
    & * {
      transition: color 0.3s ease;
    }
  }
`;

export const MDSTableButton = React.forwardRef<HTMLButtonElement, TableButtonProps>((props, ref) => {
  const {
    children,
    icon = <MDSIcon.Sort size={16} />,
    isDisabled = false,
    onClick,
    isReadOnly = false,
    color = 'color/content/neutral/default/normal',
  } = props;

  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = onClick
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick(event);
      }
    : undefined;

  const isClickable = !!onClick && !isDisabled && !isReadOnly;

  // hover 시 색상 결정
  const getTextColor = () => {
    if (isDisabled) return 'color/content/neutral/default/disabled';
    if (isHovered && isClickable) return 'color/content/neutral/default/hover';
    return color;
  };

  return (
    <StyledButton
      ref={ref}
      isClickable={isClickable}
      disabled={isDisabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderIcon(icon, 16, isDisabled, getTextColor())}
      <MDSTypography
        variant="body"
        size="s"
        weight="medium"
        color={getTextColor()}
        style={{ marginLeft: icon ? '2px' : '0' }}
      >
        {children}
      </MDSTypography>
      {!isReadOnly && <MDSIcon.ArrowDown size={20} variant="outline" color={getTextColor()} />}
    </StyledButton>
  );
});

MDSTableButton.displayName = 'MDSTableButton';

export type { TableButtonProps as MDSTableButtonProps } from './@types';
