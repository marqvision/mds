import styled from '@emotion/styled';
import { DividerProps } from '../@types';
import { resolveColor } from '../@utils';
import { getSize } from '../@utils/styleSet';

export const Divider = styled.hr<DividerProps>`
  position: absolute;
  top: -1px;
  right: -1px;
  width: 1px;
  border-style: solid;
  border-width: 1px 0;
  background-clip: padding-box;

  ${({ theme, ...props }) => {
    const sizeStyle = getSize(theme)[props.size];
    const colorStyle = resolveColor(theme, { ...props, isClickable: false });

    const paddingTop = sizeStyle.padding?.split(' ')[0];

    return `
      min-height: ${sizeStyle.minHeight};
      background-color: ${colorStyle.background.normal};
      border-color: ${colorStyle.border.normal};
      &:after {
        content: '';
        position: absolute;
        top: ${paddingTop};
        right: 0;
        width: 1px;
        height: calc(100% - (${paddingTop} * 2));
        background-color: ${props.variant === 'fill' ? 'rgb(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)'};
      }
    `;
  }}
`;
