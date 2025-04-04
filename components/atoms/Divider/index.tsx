import styled from '@emotion/styled';
import { resolveColor } from '../../../@system';
import { Props, StyledProps } from './@types';
import { theme } from './@constants';

const Divider = styled.hr<StyledProps>`
  display: block;
  border-style: none;

  ${({ intensity, variant, color }) => `
    background-color: ${color ? resolveColor(color) : theme.color[variant][intensity]};
  `}

  ${({ variant, orientation, length, thickness }) => {
    if (variant === 'line')
      return `
      width: ${orientation === 'vertical' ? thickness : length};
      height: ${orientation === 'vertical' ? length : thickness};
    `;

    if (variant === 'dot')
      return `
      border-radius: 50%;
      width: ${thickness};
      height: ${thickness};
      
      ${
        orientation === 'horizontal'
          ? `
        margin-left: 50%;
        transform: translateX(-50%);
      `
          : `
        display: inline-block;
        vertical-align: middle;
      `
      }
    `;
  }}
`;

export const MDSDivider = (props: Props) => {
  const {
    intensity = 'default',
    orientation = 'horizontal',
    length = '100%',
    thickness = 1,
    color,
    variant = 'line',
    style,
  } = props;

  const stringLength = typeof length === 'string' ? length : `${length}px`;
  const stringThickness = `${thickness}px`;

  return (
    <Divider
      role="separator"
      variant={variant}
      intensity={intensity}
      color={color}
      orientation={orientation}
      thickness={stringThickness}
      length={stringLength}
      style={style}
    />
  );
};
