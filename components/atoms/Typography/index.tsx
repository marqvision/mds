import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { resolveColor, resolveFontSize } from '../../../utils';
import { InnerTypographyStyleProps, MDSTypographyProps } from './@types';
import { resolveFontWeightLetterSpacing, resolveLineClamp, resolveTagName } from './@utils';

const TypographyStyles = styled.span<InnerTypographyStyleProps<any>>`
  ${(features) => {
    const { variant, color, lineClamp, wordBreak, whiteSpace, textDecoration, char, overflowWrap, theme } = features;
    const fontSize = resolveFontSize(theme, features);
    const { fontWeight, letterSpacing } = resolveFontWeightLetterSpacing(theme, features);
    const fontColor = color === 'inherit' ? 'inherit' : resolveColor(color!);
    const lineClampStyles = lineClamp !== undefined ? resolveLineClamp(lineClamp) : '';
    const wordBreakStyles = wordBreak ? `word-break: ${wordBreak};` : '';
    const overflowWrapStyles = overflowWrap ? `overflow-wrap: ${overflowWrap};` : '';
    const whiteSpaceStyles = whiteSpace ? `white-space: ${whiteSpace};` : '';
    const textDecorationStyles = textDecoration ? `text-decoration: ${textDecoration};` : '';
    const numberStyles = char === 'number' ? 'font-variant-numeric: tabular-nums;' : '';

    return `
      font-size: ${fontSize}px;
      color: ${fontColor};
      font-weight: ${fontWeight};
      letter-spacing: ${letterSpacing};
      ${lineClampStyles};
      ${wordBreakStyles};
      ${overflowWrapStyles};
      ${whiteSpaceStyles};
      ${textDecorationStyles};
      ${numberStyles};
      line-height: ${variant === 'title' ? 1.2 : 1.5};
    `;
  }}
`;

export const MDSTypography = forwardRef<HTMLSpanElement, MDSTypographyProps<any>>(
  (
    {
      variant = 'body',
      color = 'color/content/neutral/default/normal',
      lineClamp,
      size = 'm',
      char = 'letter',
      as,
      wordBreak,
      ...props
    },
    ref
  ) => {
    const tagName = resolveTagName(variant, size, as);

    return (
      <TypographyStyles
        size={size}
        variant={variant}
        char={char}
        lineClamp={lineClamp}
        as={tagName}
        color={color}
        wordBreak={wordBreak}
        data-typography-new-font
        {...props}
        ref={ref}
      />
    );
  }
);
MDSTypography.displayName = 'MDSTypography';

export * from './@types';
export { getTypographyProps } from './@utils';

/**
 * @deprecated
 * 숫자 2가 제거된 MDSTypography 를 사용하세요.
 */
export const MDSTypography2 = MDSTypography;
