import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Size } from '../@types';
import { theme } from '../@constants';
import { MDSIconProps } from '../../Icon';

export const StyledOutline = styled.div<{
  customSize: Size;
  flatLeft?: boolean;
  flatRight?: boolean | 'add';
  disabled?: boolean;
  readOnly?: boolean;
  isError?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  border-radius: ${({ flatLeft, flatRight }) =>
    `${flatLeft ? 0 : '8px'} ${flatRight ? 0 : '8px'} ${flatRight ? 0 : '8px'} ${flatLeft ? 0 : '8px'}`};
  border: ${({ isError }) => `1px solid ${theme.color.border[isError ? 'error' : 'normal']}`};
  ${({ customSize }) => ({
    padding: `${theme.size[customSize].paddingY} ${theme.size[customSize].paddingX}`,
  })};
  transition: border-color ${theme.transitionTiming} ease, background-color ${theme.transitionTiming} ease,
    border-radius ${theme.transitionTiming} ease;
  background-color: ${({ disabled, readOnly }) =>
    disabled || readOnly ? theme.color.bg.disabled : theme.color.bg.normal};
  &:has(input:focus, textarea:focus, button:focus) {
    border-color: ${({ isError }) => theme.color.border[isError ? 'error' : 'active']};
    border-radius: ${({ flatRight }) => (flatRight === 'add' ? '8px 0 0 8px' : `8px`)};
    position: relative;
    z-index: 1;
  }
  &:has(button:not(:disabled):not(.readOnly)) {
    cursor: pointer;
  }
  &:has(button:disabled, input:disabled, button.readOnly, input:read-only, textarea:disabled, textarea:read-only) * {
    cursor: default;
  }
  & input::placeholder,
  & textarea::placeholder {
    color: ${({ theme }) => theme.color.content.placeholder.normal};
  }
  & input:disabled {
    color: ${({ theme }) => theme.color.content.neutral.default.disabled};
  }
  & svg {
    flex-shrink: 0;
  }
  &:has(textarea) {
    height: ${({ customSize }) =>
      parseFloat(theme.size[customSize].paddingY) * 2 + 2 + parseInt(theme.size[customSize].fontSize) * 1.5 * 2}px;
  }
`;

export const StyledBaseLabel = styled.label<{ size: Size; isError?: boolean }>`
  min-height: ${({ size }) => theme.size[size].height};
  position: relative;
  transition: outline ${theme.transitionTiming} ease;
  border-radius: 8px;
  &:focus-within {
    outline: ${({ isError }) =>
      `3px solid ${isError ? theme.color.border['error-focus-effect'] : theme.color.border['focus-effect']}`};
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const StyledIcon = styled.svg<
  MDSIconProps & { variant: 'border' | 'outline' | 'fill' } & { disabled?: boolean }
>`
  animation: ${fadeOut} ${theme.transitionTiming} ease-out forwards;
  opacity: 0;
  transition: display ${theme.transitionTiming} allow-discrete;
  flex: 0 0 auto;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  display: none;
  &.show {
    display: block;
    animation: ${fadeIn} ${theme.transitionTiming} ease-out forwards;
  }
`;
