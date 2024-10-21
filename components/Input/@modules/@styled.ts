import styled from '@emotion/styled';
import { Size } from '../@types';
import { theme } from '../@constants';

export const StyledOutline = styled.div<{
  customSize: Size;
  hasAdd?: boolean;
  disabled?: boolean;
  isError?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  border-radius: ${({ hasAdd }) => (hasAdd ? '4px 0 0 4px' : '4px')};
  height: 100%;
  border: ${({ isError }) => `1px solid ${theme.color.border[isError ? 'error' : 'normal']}`};
  ${({ customSize }) => ({
    '& input': {
      'line-height': '1.5',
      'font-size': theme.size[customSize].fontSize,
    },
    padding: `0 ${theme.size[customSize].padding}`,
  })};
  transition: border-color ${theme.transitionTiming} ease, background-color ${theme.transitionTiming} ease;
  background-color: ${({ disabled }) => (disabled ? theme.color.bg.disabled : theme.color.bg.normal)};
  &:has(input:focus) {
    border-color: ${({ isError }) => theme.color.border[isError ? 'error' : 'active']};
  }
  &:has(input[type='button']:not(:disabled)) {
    cursor: pointer;
  }
  & input[type='button'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  & input::placeholder {
    color: ${({ theme }) => theme.color.content.placeholder.normal};
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
