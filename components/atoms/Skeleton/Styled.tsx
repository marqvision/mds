import styled from '@emotion/styled';
import { resolveFontSize, resolveLineHeight } from '../../../utils';
import { CircleProps, CommonProps, RectProps, TextProps } from './@types';
import { parsePixelSize } from './@utils';

const Common = styled.div<Required<CommonProps>>`
  display: ${({ display }) => display};
  background-color: ${({ theme }) => `${theme._raw_color.bluegray750}1F`};
  animation: skeleton-pulse 1.5s ease-in-out 0.5s infinite;
  @keyframes skeleton-pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;

export const Styled = {
  text: styled(Common.withComponent('span'))<Required<TextProps>>`
    box-sizing: content-box;
    border-radius: 4px;
    min-height: 1em;
    width: ${({ width }) => parsePixelSize(width)};
    margin: ${({ variant, theme }) => `calc((${resolveLineHeight(theme, { variant })}em - 1em) / 2)`} 0;
    font-size: ${({ variant, size, theme }) => resolveFontSize(theme, { variant, size })}px;
  `,

  circle: styled(Common)<Required<CircleProps>>`
    border-radius: 50%;
    width: ${({ size }) => parsePixelSize(size)};
    height: ${({ size }) => parsePixelSize(size)};
  `,

  rect: styled(Common)<Required<RectProps>>`
    border-radius: ${({ borderRadius }) => parsePixelSize(borderRadius)};
    width: ${({ width }) => parsePixelSize(width)};
    height: ${({ height }) => parsePixelSize(height)};
  `,
};
