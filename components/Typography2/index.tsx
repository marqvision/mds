import { ElementType } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system/resolvers';
import {
  resolveFontSize,
  resolveFontVariantNumeric,
  resolveFontWeight,
  resolveLineClamp,
  resolveTagName,
} from './@utils';
import { MDSTypographyProps2, InnerTypographyStyleProps } from './@types';

const TypographyStyles = styled.span<InnerTypographyStyleProps<any>>`
  ${(features) => {
    const { variant, color, lineClamp, wordBreak, whiteSpace, textDecoration } = features;
    const fontSize = resolveFontSize(features);
    const fontWeight = resolveFontWeight(features);
    const fontColor = resolveColor(color!);
    const lineClampStyles = lineClamp !== undefined ? resolveLineClamp(lineClamp) : '';
    const wordBreakStyles = wordBreak ? `word-break: ${wordBreak};` : '';
    const whiteSpaceStyles = whiteSpace ? `white-space: ${whiteSpace};` : '';
    const textDecorationStyles = textDecoration ? `text-decoration: ${textDecoration};` : '';
    const numberStyles = resolveFontVariantNumeric(features);

    return `
      margin: 0;
      
      font-size: ${fontSize};
      color: ${fontColor};
      font-weight: ${fontWeight};
      ${lineClampStyles};
      ${wordBreakStyles};
      ${whiteSpaceStyles};
      ${textDecorationStyles};
      ${numberStyles};
      line-height: ${variant === 'title' ? 1.2 : 1.5};

      // todo-@jamie: [PROD-12758] 완료되면 반드시 삭제!!!
      background-color: red;
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
      lineClamp={lineClamp}
      as={tagName}
      color={color}
      wordBreak={wordBreak}
      {...props}
    />
  );
};

export * from './@types';
