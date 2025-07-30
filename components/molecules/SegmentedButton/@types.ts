import { ReactElement } from 'react';

export type TSegmentedButtonType = 'fit' | 'fixed' | 'hug';
export type TSegmentedButtonVariant = 'tint' | 'fill';

export type ButtonGroupItem<T> = {
  label: string;
  value: T;
  Icon?: ReactElement;
  SelectedIcon?: ReactElement;
};

interface CommonProps<T> {
  buttonGroupList: ButtonGroupItem<T>[];
  selectedValue: T;
  fixedWidth?: string;
  type: TSegmentedButtonType;
  variant: TSegmentedButtonVariant;
  onClick: (value: T) => void;
  size?: 'small' | 'medium' | 'large';
}

interface WithoutWidth<T> extends CommonProps<T> {
  type: 'fit' | 'hug';
  fixedWidth?: never;
}

interface WithWidth<T> extends CommonProps<T> {
  type: 'fixed';
  fixedWidth: string;
}

export type SegmentedButtonProps<T> = WithoutWidth<T> | WithWidth<T>;