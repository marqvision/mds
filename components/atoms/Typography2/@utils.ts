import { ElementType } from 'react';
import { InnerTypographyStyleProps, MDSTypographyProps2, Size, Variant, Weight } from './@types';

export const resolveTagName = (
  variant: MDSTypographyProps2['variant'],
  size: MDSTypographyProps2['size'],
  as?: ElementType
): ElementType => {
  if (as) return as;

  if (variant === 'title') {
    return size === '2xl' || size === 'xl' ? 'h1' : 'h2';
  }
  return 'p';
};

export const resolveFontSize = (features: InnerTypographyStyleProps) => {
  if (features.variant === 'title') {
    switch (features.size) {
      case '2xl':
        return '24px';
      case 'xl':
        return '20px';
      case 'l':
        return '18px';
      case 'm':
        return '16px';
      case 's':
        return '14px';
    }
  } else if (features.variant === 'body') {
    switch (features.size) {
      case 'l':
        return '16px';
      case 'm':
        return '14px';
      case 's':
        return '13px';
      case 'xs':
        return '12px';
    }
  }
};
export const resolveFontWeight = (features: Pick<InnerTypographyStyleProps, 'variant' | 'size' | 'weight'>) => {
  let defaultWeight = 'regular';
  if (features.variant === 'title') {
    if (features.size === '2xl' || features.size === 'xl') {
      defaultWeight = 'medium';
    } else {
      defaultWeight = 'semibold';
    }
  }
  return `var(--font-${features.variant}-${features.weight || defaultWeight})`;
};
export const resolveLetterSpacing = (features: Pick<InnerTypographyStyleProps, 'variant' | 'size' | 'weight'>) => {
  let defaultWeight = 'regular';
  if (features.variant === 'title') {
    if (features.size === '2xl' || features.size === 'xl') {
      defaultWeight = 'medium';
    } else {
      defaultWeight = 'semibold';
    }
  }
  return `var(--font-${features.variant}-letter-spacing-${features.size}-${features.weight || defaultWeight})`;
};

// todo-@jamie: [PROD-12758] 예전 폰트 하위 호환성을 위해 유지 - 완료되면 반드시 삭제!!!
export const resolveFontFamily = (features: InnerTypographyStyleProps) => {
  if (features.weight === 'bold' || features.weight === 'semibold') return '"Visuelt-Bold", "Pretendard Variable"';
  else if (features.weight === 'medium') return '"Visuelt-Medium", "Pretendard Variable"';
  else if (features.weight === 'regular') return '"Visuelt-Regular", "Pretendard Variable"';
  else if (features.weight === 'light') return '"Visuelt-Light", "Pretendard Variable"';
  else return '"Visuelt-Regular", "Pretendard Variable"';
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

// todo-@jamie: [PROD-12758] 예전 폰트 하위 호환성을 위해 유지 - 완료되면 반드시 삭제!!!
export const getTypographyProps = (
  fontSize: number,
  weight?: string
): { variant: Variant; size: Size; weight?: Weight } => {
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
