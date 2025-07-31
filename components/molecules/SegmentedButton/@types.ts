import { ReactElement } from 'react';

export type SegmentedButtonType = 'fit' | 'fixed' | 'hug';
export type SegmentedButtonVariant = 'border' | 'fill';

export type ButtonGroupItem<T> = {
  label: string;
  value: T;
  icon?: ReactElement;
};

type CommonProps<T> = {
  list: ButtonGroupItem<T>[];
  value: T;
  fixedWidth?: string;
  type: SegmentedButtonType;
  variant: SegmentedButtonVariant;
  onChange: (value: T) => void;
  size?: 'small' | 'medium' | 'large';
  selectedIcon?: ReactElement;
};

type WithoutWidth<T> = CommonProps<T> & {
  type: 'fit' | 'hug';
  fixedWidth?: never;
};

type WithWidth<T> = CommonProps<T> & {
  type: 'fixed';
  fixedWidth: string;
};

export type SegmentedButtonProps<T> = WithoutWidth<T> | WithWidth<T>;
