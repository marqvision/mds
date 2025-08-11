import { ReactElement } from 'react';

type SegmentedButtonType = 'fit' | 'fixed' | 'hug';
type SegmentedButtonVariant = 'border' | 'fill';

type ButtonGroupItem<T> = {
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

export type MDSSegmentedButtonProps<T> = WithoutWidth<T> | WithWidth<T>;
export type MDSSegmentedButtonVariant = SegmentedButtonVariant;
