import { useMemo } from 'react';
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
import { LNB_THEME } from './components/lnb';
import { TAG_THEME } from './components/tag';
import { DROPDOWN_THEME } from './components/dropdown';
import { POPOVER_THEME } from './components/popover';
import { SEGMENTED_BUTTON_THEME } from './components/segmentedButton';
import { SELECT_CONTAINER_THEME } from './components/selectContainer';
import { TABLE_BUTTON_THEME } from './components/tableButton';
import { TABS_THEME } from './components/tabs';
import { PAGE_HEADER_THEME } from './components/pageHeader';
import { HOVER_ACTION_TOOLBAR_THEME } from './components/hoverActionToolbar';
import { DOWNLOAD_PANEL_THEME } from './components/downloadPanel';
import { FILE_UPLOADER_THEME } from './components/fileUploader';
import { MESSAGE_BOX_THEME } from './components/messageBox';
import { MODAL_THEME } from './components/modal';
import { SNACKBAR_THEME } from './components/snackbar';

/**
 * 중첩 객체의 모든 속성을 선택적(optional)으로 만드는 유틸리티 타입.
 * 테마 오버라이드 시 일부 속성만 지정하여 기본값과 병합할 수 있게 해줍니다.
 *
 * @example
 * // 전체 테마 구조에서 button.radius만 오버라이드
 * const override: DeepPartial<MDSTheme> = {
 *   comp: { button: { radius: { sm: '4px' } } }
 * };
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 두 객체를 재귀적으로 병합합니다.
 * source의 값이 target의 중첩 객체 구조를 덮어쓰지 않고 깊은 병합을 수행합니다.
 *
 * @remarks
 * - 배열은 깊은 병합 대신 교체됩니다
 * - undefined 값은 무시됩니다
 * - MDSThemeProvider에서 overrideTheme 적용 시 사용됩니다
 */
const deepMerge = <T extends Record<string, unknown>>(target: T, source: DeepPartial<T>): T => {
  const result = { ...target };
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];
      if (
        sourceValue !== undefined &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Partial<Record<string, unknown>>
        ) as T[typeof key];
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[typeof key];
      }
    }
  }
  return result;
};

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
    lnb: LNB_THEME,
    tag: TAG_THEME,
    dropdown: DROPDOWN_THEME,
    popover: POPOVER_THEME,
    segmentedButton: SEGMENTED_BUTTON_THEME,
    selectContainer: SELECT_CONTAINER_THEME,
    tableButton: TABLE_BUTTON_THEME,
    tabs: TABS_THEME,
    pageHeader: PAGE_HEADER_THEME,
    hoverActionToolbar: HOVER_ACTION_TOOLBAR_THEME,
    downloadPanel: DOWNLOAD_PANEL_THEME,
    fileUploader: FILE_UPLOADER_THEME,
    messageBox: MESSAGE_BOX_THEME,
    modal: MODAL_THEME,
    snackbar: SNACKBAR_THEME,
  },
};

type MDSThemeProviderProps = {
  children: React.ReactNode;
  disableResetCSS?: boolean;
  overrideTheme?: DeepPartial<MDSTheme>;
};
export const MDSThemeProvider = ({
  children,
  disableResetCSS,
  overrideTheme,
}: MDSThemeProviderProps) => {
  const theme = useMemo(
    () =>
      overrideTheme
        ? deepMerge(_MDSThemeValue, overrideTheme as DeepPartial<typeof _MDSThemeValue>)
        : _MDSThemeValue,
    [overrideTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      {!disableResetCSS && <MDSResetCSS />}
      <MDSFontCSS />
      {children}
    </ThemeProvider>
  );
};
