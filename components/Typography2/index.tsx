import { ElementType } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system/resolvers';
import {
  resolveFontFamily,
  resolveFontSize,
  resolveFontVariantNumeric,
  resolveFontWeight,
  resolveLineClamp,
  resolveTagName,
} from './@utils';
import { MDSTypographyProps2, InnerTypographyStyleProps } from './@types';

const TypographyStyles = styled.span<InnerTypographyStyleProps<any>>`
  ${(features) => {
    const { color, lineClamp, wordBreak, whiteSpace, textDecoration, lang, __useNewFont } = features;
    const fontSize = resolveFontSize(features);
    const fontWeight = resolveFontWeight(features);
    const fontFamily = resolveFontFamily(lang, fontWeight || 400, __useNewFont);
    const fontColor = resolveColor(color!);
    const lineClampStyles = lineClamp !== undefined ? resolveLineClamp(lineClamp) : '';
    const wordBreakStyles = wordBreak ? `word-break: ${wordBreak};` : '';
    const whiteSpaceStyles = whiteSpace ? `white-space: ${whiteSpace};` : '';
    const textDecorationStyles = textDecoration ? `text-decoration: ${textDecoration};` : '';
    const numberStyles = resolveFontVariantNumeric(features);

    return `
      margin: 0;
      font-family: ${fontFamily};
      font-size: ${fontSize};
      color: ${fontColor};
      font-weight: ${fontWeight};
      ${lineClampStyles};
      ${wordBreakStyles};
      ${whiteSpaceStyles};
      ${textDecorationStyles};
      ${numberStyles};
      line-height: 1.5;
    `;
  }}
`;

export const MDSTypography2 = <T extends ElementType = 'p'>({
  variant = 'body',
  weight = 'regular',
  color = 'color/content/neutral/default/normal',
  lineClamp,
  size = 'm',
  char = 'letter',
  lang = 'en',
  as,
  wordBreak,
  ...props
}: MDSTypographyProps2<T>) => {
  const tagName = resolveTagName(variant, size, as);

  return (
    <TypographyStyles
      weight={weight}
      size={size}
      variant={variant}
      char={char}
      lang={lang}
      lineClamp={lineClamp}
      as={tagName}
      color={color}
      wordBreak={wordBreak}
      {...props}
    />
  );
};

export * from './@types';
