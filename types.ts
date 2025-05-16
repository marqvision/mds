import React from 'react';
import { _MDSThemeValue } from "./foundation";

export type LinkPath = string | Partial<{ pathname: string; search: string; hash: string }>;
export type LinkComponentProps = {
  to: LinkPath;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, any>
    ? T[Key] extends ArrayLike<any>
      ? Key | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>>}`
      : `${Key}/${PathImpl<T[Key], keyof T[Key]>}`
    : Key
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

export type PathValue<T, P extends Path<T>> = P extends `${infer Key}/${infer Rest}`
  ? Key extends keyof T
    ? Rest extends Path<T[Key]>
      ? PathValue<T[Key], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type MDSTheme = typeof _MDSThemeValue;
export type MDSThemeColorPath = Path<Pick<MDSTheme, 'color'>>;
