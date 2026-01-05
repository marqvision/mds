import { _MDSThemeValue } from '../foundation';
import { MDSTheme, Path } from '../types';
import { BodySize, MDSDropdownItem, MDSTypographyProps, TitleSize } from '../components';

/**
 * @deprecated
 * todo-@jamie: [PROD-13664] ThemeProvider의 값을 사용하도록 수정해야함
 **/
export const resolveColor = (color: Path<MDSTheme>) => {
  const tokens = color.split('/') || [];

  let currentColorObject: Record<string, object> = _MDSThemeValue;

  let result = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const value = currentColorObject[token];
    if (typeof value === 'string') {
      result = value;
    } else {
      currentColorObject = value as Record<string, object>;
    }
  }

  if (typeof result !== 'string') {
    // color에 정확한 color값을 할당하지 않은 케이스.
    console.warn(
      '[WARN] MDSTypography: MDSTheme.color에 정확한 color값을 할당하지 않았습니다. 기본 색상으로 초기화합니다.'
    );
    result = _MDSThemeValue.color.content.neutral.default.normal;
  }

  return result;
};

/**
 * Typography props 로 실제 폰트 사이즈를 반환합니다.
 */
export const resolveFontSize = (
  theme: MDSTheme,
  features: Pick<MDSTypographyProps, 'variant' | 'size'>
) => {
  if (features.variant === 'title') {
    const size = features.size as TitleSize;
    return theme.comp.typography.title.size[size];
  } else if (features.variant === 'body') {
    const size = features.size as BodySize;
    return theme.comp.typography.body.size[size];
  }
};

/**
 * Typography props 로 line-height 를 반환합니다.
 */
export const resolveLineHeight = (
  theme: MDSTheme,
  features: Pick<MDSTypographyProps, 'variant'>
) => {
  if (!features.variant) return;
  return theme.comp.typography[features.variant].lineHeight;
};

/**
 * SelectWithChip 컴포넌트의 label을 반환합니다.
 */
export const resolveSelectWithChipLabel = <T>(selected: T | T[], options: MDSDropdownItem<T>[]) => {
  const selectedValues = selected instanceof Array ? selected : [selected];

  if (selectedValues.length === 0) {
    return undefined;
  }

  const getTotalOptionsCount = (opts?: MDSDropdownItem<T>[]): number => {
    return (
      opts?.reduce((total, option) => {
        if (Array.isArray(option.children)) {
          return total + getTotalOptionsCount(option.children);
        }
        return total + 1;
      }, 0) || 0
    );
  };

  const totalOptionsCount = getTotalOptionsCount(options);

  if (selectedValues.length === totalOptionsCount) {
    return [{ label: 'All', value: 'all' }];
  }

  return selectedValues;
};