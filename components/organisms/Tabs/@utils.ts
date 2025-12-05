import { MDSTheme } from '../../../types';

export const resolveColor = (theme: MDSTheme, path: string): string => {
  return path.split('/').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      // TypeScript doesn't know acc is an object, so we use type assertion
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, theme) as string;
};
