import { ThemeProvider } from '@emotion/react';
import { MDSTheme } from '../types';
import { RAW_COLORS, COLOR_TOKENS } from './colors';
import { BUTTON_THEME } from './components/button';
import { CHART_THEME } from './components/chart';
import { PLAIN_BUTTON_THEME } from './components/plainButton';
import { TYPOGRAPHY_THEME } from './components/typography';
import { MDSFontCSS, MDSResetCSS } from './globalCSS';
import { DIVIDER_THEME } from './components/divider';
import { DIMMED_THEME } from './components/dimmed';
import { INPUT_THEME } from './components/input';

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
    plainButton: PLAIN_BUTTON_THEME,
    divider: DIVIDER_THEME,
    dimmed: DIMMED_THEME,
    input: INPUT_THEME,
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
