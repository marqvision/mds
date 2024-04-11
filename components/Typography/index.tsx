import { ElementType } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system/resolvers';
import {
  resolveFontSize,
  resolveFontWeight as resolveFontWeightStyles,
  resolveLineClamp,
  resolveTagName,
} from './@utils';
import { Features, MDSTypographyProps } from './@types';

const TypographyStyles = styled.span<Features>`
  ${({ variant, weight, color, lineClamp, wordBreak, whiteSpace }) => {
    const fontSize = resolveFontSize(variant);
    const fontWeightStyles = resolveFontWeightStyles(weight);
    const fontColor = resolveColor(color!);
    const lineClampStyles = lineClamp !== undefined ? resolveLineClamp(lineClamp) : '';
    const wordBreakStyles = wordBreak ? `word-break: ${wordBreak};` : '';
    const whiteSpaceStyles = whiteSpace ? `white-space: ${whiteSpace};` : '';

    return `
      margin: 0;
      font-size: ${fontSize};
      color: ${fontColor};
      ${fontWeightStyles};
      ${lineClampStyles};
      ${wordBreakStyles};
      ${whiteSpaceStyles};
      line-height: 1.5;
    `;
  }}
`;

export const MDSTypography = <T extends ElementType = 'span'>({
  variant = 'T16',
  weight = 'regular',
  color = 'color/content/neutral/default/normal',
  lineClamp,
  as,
  wordBreak,
  ...props
}: MDSTypographyProps<T>) => {
  const tagName = resolveTagName(variant, as);
  return (
    <TypographyStyles
      variant={variant}
      weight={weight}
      lineClamp={lineClamp}
      as={tagName}
      color={color}
      wordBreak={wordBreak}
      {...props}
    />
  );
};
