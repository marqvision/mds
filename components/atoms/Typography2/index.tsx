import { ElementType } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../../utils/resolvers';
import { resolveFontFamily, resolveFontSize, resolveFontWeight, resolveLetterSpacing, resolveLineClamp, resolveTagName } from './@utils';
import { MDSTypographyProps2, InnerTypographyStyleProps } from './@types';

const TypographyStyles = styled.span<InnerTypographyStyleProps<any>>`
  ${(features) => {
    const { variant, color, lineClamp, wordBreak, whiteSpace, textDecoration, char, overflowWrap } = features;
    const fontSize = resolveFontSize(features);
    const fontWeight = resolveFontWeight(features);
    const letterSpacing = resolveLetterSpacing(features);
    const fontColor = color === 'inherit' ? 'inherit' : resolveColor(color!);
    const lineClampStyles = lineClamp !== undefined ? resolveLineClamp(lineClamp) : '';
    const wordBreakStyles = wordBreak ? `word-break: ${wordBreak};` : '';
    const overflowWrapStyles = overflowWrap ? `overflow-wrap: ${overflowWrap};` : '';
    const whiteSpaceStyles = whiteSpace ? `white-space: ${whiteSpace};` : '';
    const textDecorationStyles = textDecoration ? `text-decoration: ${textDecoration};` : '';
    const numberStyles = char === 'number' ? 'font-variant-numeric: tabular-nums;' : '';

    return `
      font-size: ${fontSize};
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


      // todo-@jamie: [PROD-12758] 완료되면 반드시 삭제!!!
      ${
        typeof window !== 'undefined' &&
        //@ts-ignore
        !window.___mdsv2_use_new_font
          ? `font-family: ${resolveFontFamily(features)};`
          : ''
      }

    `;
  }}
`;

export const MDSTypography2 = <T extends ElementType = 'p'>({
  variant = 'body',
  color = 'color/content/neutral/default/normal',
  lineClamp,
  size = 'm',
  char = 'letter',
  as,
  wordBreak,
  ...props
}: MDSTypographyProps2<T>) => {
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
    />
  );
};

export * from './@types';

export { getTypographyProps } from './@utils';
