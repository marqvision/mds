import { MDSTheme, MDSThemeValue } from '../foundation'

export const resolveColor = (color: Path<MDSTheme['color']>) => {
  const tokens = color?.split('.') || [];

  //@ts-ignore
  let currentColorObject: Record<string, string> = MDSThemeValue.color;
  let result = '';
  for(let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const value = currentColorObject[token as keyof MDSTheme['color']];
    if (typeof value === 'string') {
      result = value;
    } else {
      currentColorObject = value;
    }
  }
  if(typeof result !== 'string') {
    // color에 정확한 color값을 할당하지 않은 케이스.
    console.warn("[WARN] MDSTypography: MDSTheme.color에 정확한 color값을 할당하지 않았습니다. 기본 색상으로 초기화합니다.");
    result = MDSThemeValue.color.content.neutral.default;
  }

  return result;
};