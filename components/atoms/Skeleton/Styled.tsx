import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { resolveFontSize, resolveLineHeight } from '../../../utils';
import { CircleProps, CommonProps, RectProps, TextProps } from './@types';
import { parsePixelSize } from './@utils';

const Common = styled.div<Required<CommonProps>>`
  animation: skeleton-pulse 1.5s ease-in-out 0.5s infinite;
  @keyframes skeleton-pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
  ${({ theme, display }) => css`
    display: ${display};
    background-color: ${theme._raw_color.bluegray750}1F;
  `}
`;

export const Styled = {
  text: styled(Common.withComponent('span'))<Required<TextProps>>`
    box-sizing: content-box;
    border-radius: 4px;
    min-height: 1em;
    ${({ variant, size, theme, width }) => css`
      width: ${parsePixelSize(width)};
      margin: calc((${resolveLineHeight(theme, { variant })}em - 1em) / 2) 0;
      font-size: ${resolveFontSize(theme, { variant, size })};
    `}
  `,

  circle: styled(Common)<Required<CircleProps>>`
    border-radius: 50%;
    ${({ size }) => css`
      width: ${parsePixelSize(size)};
      height: ${parsePixelSize(size)};
    `}
  `,

  rect: styled(Common)<Required<RectProps>>`
    ${({ borderRadius, width, height }) => css`
      border-radius: ${parsePixelSize(borderRadius)};
      width: ${parsePixelSize(width)};
      height: ${parsePixelSize(height)};
    `}
  `,
};
