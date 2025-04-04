import styled from '@emotion/styled';
import { resolveColor } from '../../../../@system';
import { theme as ChipTheme } from '../@constants';
import { DividerProps } from '../@types';

export const Divider = styled.hr<DividerProps>`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 1px;
  border-style: solid;
  border-width: 1px 0;

  ${({ size, variant, color }) => {
    const paddingTop = ChipTheme.size[size].padding.split(' ')[0];
    const backgroundColor = ChipTheme.color[color][variant].normal.backgroundColor;

    return `
      min-height: ${ChipTheme.size[size].minHeight};
      color: ${resolveColor(ChipTheme.color[color][variant].normal.color)};
      background-color: ${backgroundColor ? resolveColor(backgroundColor) : 'transparent'};
      border-color: ${resolveColor(ChipTheme.color[color][variant].normal.borderColor)};
      &:after {
        content: '';
        position: absolute;
        top: ${paddingTop};
        right: 0;
        width: 1px;
        height: calc(100% - (${paddingTop} * 2));
        background-color: ${variant === 'fill' ? 'rgb(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
      }
    `;
  }}
`;