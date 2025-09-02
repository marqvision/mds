import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { resolveColor } from '../../../utils';
import { theme } from './@constants';
import { Props, StyledProps } from './@types';

const Divider = styled.hr<StyledProps>`
  display: block;
  border-style: none;

  margin: ${({ margin }) => margin};

  ${({ intensity, variant, color }) => css`
    background-color: ${color ? resolveColor(color) : theme.color[variant][intensity]};
  `}

  ${({ variant, orientation, length, thickness }) => {
    if (variant === 'line')
      return css`
        width: ${orientation === 'vertical' ? thickness : length};
        height: ${orientation === 'vertical' ? length : thickness};
      `;

    if (variant === 'dot')
      return css`
        border-radius: 50%;
        width: ${thickness};
        height: ${thickness};

        ${orientation === 'horizontal'
          ? css`
              margin-left: 50%;
              transform: translateX(-50%);
            `
          : css`
              display: inline-block;
              vertical-align: middle;
            `}
      `;
  }}
`;

export const MDSDivider = forwardRef<HTMLHRElement, Props>((props, ref) => {
  const {
    intensity = 'default',
    orientation = 'horizontal',
    length = '100%',
    thickness = 1,
    color,
    variant = 'line',
    style,
    margin = '0',
  } = props;

  const stringLength = typeof length === 'string' ? length : `${length}px`;
  const stringThickness = `${thickness}px`;

  return (
    <Divider
      ref={ref}
      role="separator"
      variant={variant}
      intensity={intensity}
      color={color}
      orientation={orientation}
      thickness={stringThickness}
      length={stringLength}
      style={style}
      margin={margin}
    />
  );
});
MDSDivider.displayName = 'MDSDivider';
