import { MDSTheme, MDSThemeValue } from '../foundation';
import { Path } from './types';

export const resolveColor = (color?: Path<MDSTheme>) => {
  if (!color) return 'transparent';
  const tokens = color.split('/') || [];

  // @ts-ignore
  let currentColorObject: Record<string, string> = MDSThemeValue;

  let result = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const value = currentColorObject[token];
    if (typeof value === 'string') {
      result = value;
    } else {
      currentColorObject = value;
    }
  }
  
  if (typeof result !== 'string') {
    // color에 정확한 color값을 할당하지 않은 케이스.
    console.warn(
      '[WARN] MDSTypography: MDSTheme.color에 정확한 color값을 할당하지 않았습니다. 기본 색상으로 초기화합니다.'
    );
    result = MDSThemeValue.color.content.neutral.default.normal;
  }

  return result;
};
