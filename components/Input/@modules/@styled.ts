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
    `${flatLeft ? 0 : '4px'} ${flatRight ? 0 : '4px'} ${flatRight ? 0 : '4px'} ${flatLeft ? 0 : '4px'}`};
  height: 100%;
  border: ${({ isError }) => `1px solid ${theme.color.border[isError ? 'error' : 'normal']}`};
  ${({ customSize }) => ({
    '& input': {
      'line-height': '1.5',
      'font-size': theme.size[customSize].fontSize,
    },
    padding: `${theme.size[customSize].paddingY} ${theme.size[customSize].paddingX}`,
  })};
  transition: border-color ${theme.transitionTiming} ease, background-color ${theme.transitionTiming} ease,
    border-radius ${theme.transitionTiming} ease;
  background-color: ${({ disabled, readOnly }) =>
    disabled || readOnly ? theme.color.bg.disabled : theme.color.bg.normal};
  &:has(input:focus),
  &:has(button:focus) {
    border-color: ${({ isError }) => theme.color.border[isError ? 'error' : 'active']};
    border-radius: ${({ flatRight }) => (flatRight === 'add' ? '4px 0 0 4px' : `4px`)};
    position: relative;
    z-index: 1;
  }
  &:has(button:not(:disabled):not(.readOnly)) {
    cursor: pointer;
  }
  &:has(button:disabled) *,
  &:has(input:disabled) *,
  &:has(button.readOnly) *,
  &:has(input:read-only) * {
    cursor: default;
  }
  & input::placeholder {
    color: ${({ theme }) => theme.color.content.placeholder.normal};
  }
  & input:disabled {
    color: ${({ theme }) => theme.color.content.neutral.default.disabled};
  }
`;

export const StyledBaseLabel = styled.label<{ size: Size; isError?: boolean }>`
  min-height: ${({ size }) => theme.size[size].height};
  position: relative;
  transition: outline ${theme.transitionTiming} ease;
  border-radius: 4px;
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
