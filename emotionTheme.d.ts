import '@emotion/react';
import type { MDSTheme } from './foundation';

declare module '@emotion/react' {
  export interface Theme extends MDSTheme {}
}
