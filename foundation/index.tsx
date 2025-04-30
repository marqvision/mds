import { ThemeProvider } from '@emotion/react';
import { MDSTheme } from '../types';
import { RAW_COLORS, COLOR_TOKENS } from './colors';
import { MDSFontCSS, MDSResetCSS } from './globalCSS';

//
/**
 * @inner 직접 import하지 마세요! 대신 MDSThemeProvider를 사용하세요. (MDS v1 호환성을 위해 export로 public facing 합니다)
 */
export const _MDSThemeValue = {
  color: COLOR_TOKENS,
  _raw_color: RAW_COLORS,
  comp: {
    typography: {
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
      },
    },
    chart: {
      heatmap: {
        color: {
          bg: {
            header: COLOR_TOKENS.bg.surface.neutral.secondary.normal,
            body: {
              level: {
                1: RAW_COLORS.orange400,
                2: RAW_COLORS.yellow300,
                3: RAW_COLORS.yellow200,
                4: RAW_COLORS.green300,
                5: RAW_COLORS.green400,
              },
              neutral: {
                default: COLOR_TOKENS.bg.surface.neutral.default.normal,
                hover: RAW_COLORS.blackAlpha10,
              },
            },
          },
          border: {
            vertical: {
              default: RAW_COLORS.bluegray150,
            },
            horizontal: {
              header: RAW_COLORS.bluegray150,
              body: RAW_COLORS.bluegray100,
            },
          },
          content: {
            header: COLOR_TOKENS.content.neutral.secondary.normal,
            body: COLOR_TOKENS.content.neutral.default.normal,
          },
        },
      },
    },
  },
};

type MDSThemeProviderProps = {
  children: React.ReactNode;
  disableResetCSS?: boolean;
  overrideTheme?: Partial<MDSTheme>;
};
export const MDSThemeProvider = ({
  children,
  disableResetCSS,
  overrideTheme,
}: MDSThemeProviderProps) => {
  const theme = overrideTheme ? { ..._MDSThemeValue, ...overrideTheme } : _MDSThemeValue;
  return (
    <ThemeProvider theme={theme}>
      {!disableResetCSS && <MDSResetCSS />}
      <MDSFontCSS />
      {children}
    </ThemeProvider>
  );
};
