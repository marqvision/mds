import styled from '@emotion/styled';
import { DividerProps } from '../@types';
import { getColor, getSize } from '../@utils/styles';

export const Divider = styled.hr<DividerProps>`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 1px;
  border-style: solid;
  border-width: 1px 0;

  ${({ size, variant, color, theme }) => {
    const sizeStyle = getSize(theme)[size];
    const colorStyle = getColor(theme)[color][variant];
    
    const paddingTop = sizeStyle.padding.split(' ')[0];

    return `
      min-height: ${sizeStyle.minHeight};
      color: ${colorStyle.normal.color};
      background-color: ${colorStyle.normal.backgroundColor || 'transparent'};
      border-color: ${colorStyle.normal.borderColor};
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