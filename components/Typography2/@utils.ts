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
        if (features.lang === 'ko') return 720;
        else return 680;
      case 'medium':
        if (features.lang === 'ko') return 540;
        else return 560;
    }
  } else if (features.variant === 'body') {
    switch (features.weight) {
      case 'medium':
        if (features.lang === 'ko') return 540;
        else return 560;
      case 'regular':
        if (features.lang === 'ko') return 400;
        else return 450;
    }
  }
};

export const resolveFontFamily = (lang: 'ko' | 'en', fontWeight: number, __useNewFont?: boolean) => {
  if (lang === 'ko') {
    return '"Pretendard Variable"';
  } else if (__useNewFont) {
    return '"PPNeueMontreal-Variable"';
  } else {
    if (fontWeight >= 680) return '"Visuelt-Bold"';
    else if (fontWeight >= 560) return '"Visuelt-Medium"';
    else if (fontWeight >= 450) return '"Visuelt-Regular"';
    else if (fontWeight >= 400) return '"Visuelt-Light"';
    else return '"Visuelt-Regular"';
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

export const resolveFontVariantNumeric = (features: InnerTypographyStyleProps) => {
  if (features.char === 'number') {
    let letterSpacing = -1;
    if (features.lang === 'ko') {
      if (features.variant === 'title') {
        switch (features.size) {
          case 'xl':
            letterSpacing = -1;
            break;
          case 'l':
            letterSpacing = -0.9;
            break;
          case 'm':
            letterSpacing = -0.8;
            break;
          case 's':
            letterSpacing = -0.7;
            break;
        }
      } else {
        // body
        switch (features.size) {
          case 'l':
            letterSpacing = -0.8;
            break;
          case 'm':
            letterSpacing = -0.7;
            break;
          case 's':
            letterSpacing = -0.65;
            break;
          case 'xs':
            letterSpacing = -0.6;
            break;
        }
      }
    } else {
      // en

      if (features.variant === 'title') {
        switch (features.size) {
          case 'xl':
            letterSpacing = -1.6;
            break;
          case 'l':
            letterSpacing = -1.44;
            break;
          case 'm':
            letterSpacing = -1.28;
            break;
          case 's':
            letterSpacing = -1.12;
            break;
        }
      } else {
        // body
        switch (features.size) {
          case 'l':
            letterSpacing = -1.28;
            break;
          case 'm':
            letterSpacing = -1.12;
            break;
          case 's':
            letterSpacing = -1.04;
            break;
          case 'xs':
            letterSpacing = -0.96;
            break;
        }
      }
    }

    return `
      font-variant-numeric: tabular-nums;
      letter-spacing: ${letterSpacing}px;
    `;
  } else return '';
};
