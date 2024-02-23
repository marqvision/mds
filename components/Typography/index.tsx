import styled from '@emotion/styled';
import { resolveColor } from '../../@system/resolvers';
import {
  resolveFontSize,
  resolveFontWeight as resolveFontWeightStyles,
  resolveLineClamp,
  resolveTagName,
} from './@utils';
import { Features, MDSTypographyProps } from './@types';

const TypographStyles = styled.span<Required<Features>>`
  ${({ variant, weight, color, lineClamp, wordBreak }) => {
    const fontSize = resolveFontSize(variant);
    const fontWeightStyles = resolveFontWeightStyles(weight);
    const fontColor = resolveColor(color);
    const lineClampStyles = resolveLineClamp(lineClamp);
    const wordBreakStyles = `word-break: ${wordBreak};`

    return `
      font-size: ${fontSize};
      color: ${fontColor};
      ${fontWeightStyles};
      ${lineClampStyles};
      ${wordBreakStyles};
    `;
  }}
`;

export const MDSTypography = ({
  variant = 'T16',
  weight = 'medium',
  color = 'content.neutral.default',
  lineClamp = 0,
  as,
  wordBreak = 'normal',
  ...props
}: MDSTypographyProps) => {
  const tagName = resolveTagName(variant, as);
  return (
    <TypographStyles
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
