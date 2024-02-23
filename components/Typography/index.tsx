import styled from '@emotion/styled';
import { resolveColor, resolveFontSize, resolveFontWeight as resolveFontWeightStyles, resolveLineClamp, resolveTagName } from './@utils';
import { Features, MDSTypographyProps } from './@types';

const TypographStyles = styled.span<Required<Features>>`
  ${({ variant, weight, color, lineClamp }) => {
    const fontSize = resolveFontSize(variant);
    const fontWeightStyles = resolveFontWeightStyles(weight);
    const fontColor = resolveColor(color);
    const lineClampStyles = resolveLineClamp(lineClamp)

    return `
      font-size: ${fontSize};
      color: ${fontColor};
      ${fontWeightStyles};
      ${lineClampStyles};
    `;
  }}
`;

export const MDSTypogrpahy = ({
  variant = 'T16',
  weight = 'medium',
  color = 'content.neutral.default',
  lineClamp = 0,
  as,
  ...props
}: MDSTypographyProps) => {
  const tagName = resolveTagName(variant, as);
  return (
    <TypographStyles variant={variant} weight={weight} lineClamp={lineClamp} as={tagName} color={color} {...props} />
  );
};
