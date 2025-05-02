import { ThemeProvider } from '@emotion/react';
import { MDSTheme } from '../types';
import { RAW_COLORS, COLOR_TOKENS } from './colors';
import { BUTTON_THEME } from './components/button';
import { CHART_THEME } from './components/chart';
import { TYPOGRAPHY_THEME } from './components/typography';
import { MDSFontCSS, MDSResetCSS } from './globalCSS';

//
/**
 * @inner 직접 import하지 마세요! 대신 MDSThemeProvider를 사용하세요. (MDS v1 호환성을 위해 export로 public facing 합니다)
 */
export const _MDSThemeValue = {
  color: COLOR_TOKENS,
  _raw_color: RAW_COLORS,
  comp: {
    typography: TYPOGRAPHY_THEME,
    chart: CHART_THEME,
    button: BUTTON_THEME,
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
