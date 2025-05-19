import { LinkPath } from '../../../../types';

const WILDCARD = '*';

export const checkIsMatched = (path: LinkPath | undefined, value: string) => {
  const targetPath = typeof path === 'object' ? path.pathname : path;

  if (!targetPath) return false;

  const pattern = `${targetPath}/${WILDCARD}`;
  return matchPath(pattern, value, { exact: false }).isMatch;
};

/*
* 현재 pathname 과 LNBItem 의 path 를 비교하여
* 해당 메뉴가 선택되었는지 확인합니다.
 */
const matchPath = (
  pattern: string,
  pathname: string,
  options: {
    exact?: boolean;
    caseSensitive?: boolean;
  } = {}
) => {
  const { exact = true, caseSensitive = false } = options;

  const cleanPathname = pathname.split(/[?#]/)[0];
  const patternSegments = splitSegments(pattern);
  const pathSegments = splitSegments(cleanPathname);

  const isMatch =
    patternSegments.every((patternPart, index) => {
      const pathPart = pathSegments[index];

      if (patternPart === WILDCARD) return true;
      if (!pathPart) return isOptionalParam(patternPart);
      if (isParam(patternPart)) return true;
      return segmentsEqual(patternPart, pathPart, caseSensitive);
    }) && (!exact || patternSegments.length === pathSegments.length);

  return { isMatch };
};

const splitSegments = (path: string) => path.split('/').filter(Boolean);

const isParam = (segment: string) => segment.startsWith(':');

const isOptionalParam = (segment: string) =>
  isParam(segment) && segment.endsWith('?');

const segmentsEqual = (a: string, b: string, caseSensitive: boolean) =>
  caseSensitive ? a === b : a.toLowerCase() === b.toLowerCase();