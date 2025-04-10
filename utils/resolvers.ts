import { _MDSThemeValue } from '../foundation';
import { MDSTheme, Path } from '../types';

// todo-@jamie: [PROD-13664] ThemeProvider의 값을 사용하도록 수정해야함
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
