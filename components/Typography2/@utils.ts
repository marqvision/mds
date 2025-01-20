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
  if (features.variant === 'title') {
    switch (features.weight) {
      case 'semibold':
        return `var(--font-title-semibold)`;
      case 'medium':
        return `var(--font-title-medium)`;
    }
  } else if (features.variant === 'body') {
    switch (features.weight) {
      case 'medium':
        return `var(--font-body-medium)`;
      case 'regular':
        return `var(--font-body-regular)`;
    }
  }
};

export const resolveFontFamily = (fontWeight: number) => {
  if (fontWeight >= 680) return '"Visuelt-Bold"';
  else if (fontWeight >= 560) return '"Visuelt-Medium"';
  else if (fontWeight >= 450) return '"Visuelt-Regular"';
  else if (fontWeight >= 400) return '"Visuelt-Light"';
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
    let letterSpacing = '';

    if (features.variant === 'title') {
      switch (features.size) {
        case 'xl':
          letterSpacing = `var(--font-title-letter-spacing-xl)`;
          break;
        case 'l':
          letterSpacing = `var(--font-title-letter-spacing-l)`;
          break;
        case 'm':
          letterSpacing = `var(--font-title-letter-spacing-m)`;
          break;
        case 's':
          letterSpacing = `var(--font-title-letter-spacing-s)`;
          break;
      }
    } else {
      // body
      switch (features.size) {
        case 'l':
          letterSpacing = `var(--font-body-letter-spacing-l)`;
          break;
        case 'm':
          letterSpacing = `var(--font-body-letter-spacing-m)`;
          break;
        case 's':
          letterSpacing = `var(--font-body-letter-spacing-s)`;
          break;
        case 'xs':
          letterSpacing = `var(--font-body-letter-spacing-xs)`;
          break;
      }
    }

    return `
      font-variant-numeric: tabular-nums;
      letter-spacing: ${letterSpacing}px;
    `;
  } else return '';
};
