import '@emotion/react';
import { MDSTheme } from './types';

declare module '@emotion/react' {
  export interface Theme extends MDSTheme {}
}
