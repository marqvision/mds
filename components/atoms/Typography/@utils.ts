import { ElementType } from 'react';
import { MDSTheme } from '../../../types';
import {
  BodySize,
  BodyWeight,
  InnerTypographyStyleProps,
  MDSTypographyProps,
  TitleSize,
  TitleWeight,
  Variant,
} from './@types';

export const resolveTagName = (
  variant: MDSTypographyProps['variant'],
  size: MDSTypographyProps['size'],
  as?: ElementType
): ElementType => {
  if (as) return as;

  if (variant === 'title') {
    return size === '2xl' || size === 'xl' ? 'h1' : 'h2';
  }
  return 'p';
};

export const resolveFontWeightLetterSpacing = (
  theme: MDSTheme,
  features: Pick<InnerTypographyStyleProps, 'variant' | 'weight' | 'size'>
) => {
  if (features.variant === 'title') {
    const defaultWeight = features.size === '2xl' || features.size === 'xl' ? 'medium' : 'semibold';
    const weight = (features.weight || defaultWeight) as TitleWeight;
    const size = (features.size || 'm') as TitleSize;

    return {
      fontWeight: theme.comp.typography.title.weight[weight].fontWeight,
      letterSpacing: theme.comp.typography.title.weight[weight].letterSpacing[size],
    };
  } else {
    const weight = (features.weight || 'regular') as BodyWeight;
    const size = (features.size || 'm') as BodySize;

    return {
      fontWeight: theme.comp.typography.body.weight[weight].fontWeight,
      letterSpacing: theme.comp.typography.body.weight[weight].letterSpacing[size],
    };
  }
};
export const resolveLineClamp = (lineClamp: InnerTypographyStyleProps['lineClamp']) => {
  if (lineClamp && lineClamp > 0) {
    return `
      overflow: hidden;
      display: -webkit-box;
      overflow-wrap: anywhere;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${lineClamp};
    `;
  }
};

//#region
// todo-@jamie: [PROD-12758] 예전 폰트 하위 호환성을 위해 유지 - 완료되면 반드시 삭제!!!
// @deprecated
export const getTypographyProps = (
  fontSize: number,
  weight?: string
): { variant: Variant; size: TitleSize | BodySize; weight?: TitleWeight | BodyWeight } => {
  switch (fontSize) {
    case 24:
      return {
        variant: 'title',
        size: '2xl',
      };
    case 20:
      return {
        variant: 'title',
        size: 'xl',
      };
    case 18:
      return {
        variant: 'title',
        size: 'l',
      };
    case 16:
      return weight === 'bold'
        ? {
            variant: 'title',
            size: 'm',
            weight: 'semibold',
          }
        : {
            variant: 'body',
            size: 'l',
          };
    case 14:
      return weight === 'bold'
        ? {
            variant: 'title',
            size: 's',
            weight: 'semibold',
          }
        : {
            variant: 'body',
            size: 'm',
          };
    case 13:
      return {
        variant: 'body',
        size: 's',
      };
    default:
    case 12:
      return {
        variant: 'body',
        size: 'xs',
      };
  }
};
//#endregion
