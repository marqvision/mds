import { MDSThemeValue } from '../foundation';

function extractKeys(obj: Record<string, any>, path = '') {
  let keys: string[] = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullPath = path ? `${path}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = keys.concat(extractKeys(obj[key], fullPath));
      } else {
        keys.push(fullPath);
      }
    }
  }
  return keys;
}
function createColorTitleArray(obj: Record<string, any>, path = ''): { color: string, title: string }[] {
  let array: { color: string, title: string }[] = [];
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          const fullPath: string = path ? `${path}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
              array = array.concat(createColorTitleArray(obj[key], fullPath));
          } else {
              array.push({ color: obj[key], title: fullPath });
          }
      }
  }
  return array;
}

export const MDSTHEME_COLORS = extractKeys(MDSThemeValue.color);

console.log(">>>> MDSTHEME_COLORS", MDSTHEME_COLORS);