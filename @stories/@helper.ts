import { _MDSThemeValue } from "../foundation";

function extractKeys(obj: Record<string, any>, path = '') {
  let keys: string[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullPath = path ? `${path}/${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(extractKeys(obj[key], fullPath));
      } else {
        keys.push(fullPath);
      }
    }
  }
  return keys;
}
export const MDSTHEME_COLORS = extractKeys({ color: _MDSThemeValue.color });
