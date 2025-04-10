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
            letterSpacing: 'var(--font-title-letter-spacing-semibold)',
          },
          medium: {
            fontWeight: 'var(--font-title-medium)',
            letterSpacing: 'var(--font-title-letter-spacing-medium)',
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
            letterSpacing: 'var(--font-body-letter-spacing-medium)',
          },
          regular: {
            fontWeight: 'var(--font-body-regular)',
            letterSpacing: 'var(--font-body-letter-spacing-regular)',
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
  },
};

type MDSThemeProviderProps = {
  children: React.ReactNode;
  disableNewFont?: boolean;
  disableResetCSS?: boolean;
  overrideTheme?: Partial<MDSTheme>;
};
export const MDSThemeProvider = ({
  children,
  disableNewFont,
  disableResetCSS,
  overrideTheme,
}: MDSThemeProviderProps) => {
  const theme = overrideTheme ? { ..._MDSThemeValue, ...overrideTheme } : _MDSThemeValue;
  return (
    <ThemeProvider theme={theme}>
      {!disableResetCSS && <MDSResetCSS />}
      <MDSFontCSS useNewFont={!disableNewFont} />
      {children}
    </ThemeProvider>
  );
};
