import React from 'react';

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export type CustomType = 'hover';
type SafeExtract<T, U extends T> = U;

export type Hover = {
  type: SafeExtract<CustomType, 'hover'>;
  element: React.ReactNode;
  style?: React.CSSProperties;
};

export type CustomProps = Hover;