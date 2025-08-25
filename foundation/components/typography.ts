export const TYPOGRAPHY_THEME = {
  title: {
    weight: {
      semibold: {
        fontWeight: 'var(--font-title-semibold)',
        letterSpacing: {
          '2xl': 'var(--font-title-letter-spacing-2xl-semibold)',
          xl: 'var(--font-title-letter-spacing-xl-semibold)',
          l: 'var(--font-title-letter-spacing-l-semibold)',
          m: 'var(--font-title-letter-spacing-m-semibold)',
          s: 'var(--font-title-letter-spacing-s-semibold)',
        },
      },
      medium: {
        fontWeight: 'var(--font-title-medium)',
        letterSpacing: {
          '2xl': 'var(--font-title-letter-spacing-2xl-medium)',
          xl: 'var(--font-title-letter-spacing-xl-medium)',
          l: 'var(--font-title-letter-spacing-l-medium)',
          m: 'var(--font-title-letter-spacing-m-medium)',
          s: 'var(--font-title-letter-spacing-s-medium)',
        },
      },
    },
    size: {
      '2xl': 24,
      xl: 20,
      l: 18,
      m: 16,
      s: 14,
    },
    lineHeight: 1.2,
  },
  body: {
    weight: {
      medium: {
        fontWeight: 'var(--font-body-medium)',
        letterSpacing: {
          l: 'var(--font-body-letter-spacing-l-medium)',
          m: 'var(--font-body-letter-spacing-m-medium)',
          s: 'var(--font-body-letter-spacing-s-medium)',
          xs: 'var(--font-body-letter-spacing-xs-medium)',
        },
      },
      regular: {
        fontWeight: 'var(--font-body-regular)',
        letterSpacing: {
          l: 'var(--font-body-letter-spacing-l-regular)',
          m: 'var(--font-body-letter-spacing-m-regular)',
          s: 'var(--font-body-letter-spacing-s-regular)',
          xs: 'var(--font-body-letter-spacing-xs-regular)',
        },
      },
    },
    size: {
      l: 16,
      m: 14,
      s: 13,
      xs: 12,
    },
    lineHeight: 1.5,
  },
};