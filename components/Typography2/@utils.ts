import { ElementType } from 'react';
import { InnerTypographyStyleProps, MDSTypographyProps2 } from './@types';

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

/*
  T18 > variant="title" size="l"
  T16 > variant="body" size="l"
  T14 > variant="body" size="m"
  T13 > variant="body" size="s"
  T12 > variant="body" size="xs"
 */

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
export const resolveFontWeight = (features: InnerTypographyStyleProps) => {
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

// todo-@jamie: [PROD-12758] 예전 폰트 하위 호환성을 위해 유지 - 완료되면 반드시 삭제!!!
export const resolveFontFamily = (features: InnerTypographyStyleProps) => {
  if (features.weight === 'bold' || features.weight === 'semibold') return '"Visuelt-Bold"';
  else if (features.weight === 'medium') return '"Visuelt-Medium"';
  else if (features.weight === 'regular') return '"Visuelt-Regular"';
  else if (features.weight === 'light') return '"Visuelt-Light"';
  else return '"Visuelt-Regular"';
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

export const resolveFontVariantNumeric = (features: InnerTypographyStyleProps) => {
  if (features.char === 'number') {
    return `
      font-variant-numeric: tabular-nums;
      letter-spacing: var(--font-${features.variant}-letter-spacing-${features.size})px;
    `;
  } else {
    return '';
  }
};
