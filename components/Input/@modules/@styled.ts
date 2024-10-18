import styled from '@emotion/styled';
import { Size } from '../@types';
import { theme } from '../@constants';

export const StyledOutline = styled.input<{
  customSize: Size;
  hasAdd?: boolean;
  disabled?: boolean;
  isError?: boolean;
}>`
  width: 100%;
  line-height: 1.5;
  border-radius: ${({ hasAdd }) => (hasAdd ? '4px 0 0 4px' : '4px')};
  height: 100%;
  border: ${({ isError }) => `1px solid ${theme.color.border[isError ? 'error' : 'normal']}`};
  ${({ customSize }) => ({
    'font-size': theme.size[customSize].fontSize,
    padding: `0 ${theme.size[customSize].padding}`,
  })};
  transition: border-color ${theme.transitionTiming} ease, background-color ${theme.transitionTiming} ease;
  background-color: ${({ disabled }) => (disabled ? theme.color.bg.disabled : theme.color.bg.normal)};
  &:focus {
    border-color: ${({ isError }) => theme.color.border[isError ? 'error' : 'active']};
  }
  &[type='button'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding-right: ${({ customSize }) =>
      parseInt(theme.size[customSize].padding) + parseInt(theme.size[customSize].gap) + 16}px;
    &:not(:disabled) {
      cursor: pointer;
    }
  }
  &::placeholder {
    color: ${({ theme }) => theme.color.content.placeholder.normal};
  }
`;
