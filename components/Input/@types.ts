import { CSSProperties, InputHTMLAttributes } from 'react';
import { Add, Enter } from './@modules/TextField';

export type Size = 'small' | 'medium' | 'large' | 'extra-large';

export type Props<T> = (TextFiledProps | SelectProps<T>) & CommonProps;

export type CommonProps = {
  /* default: medium */
  size?: Size;
  modules?: Modules;
  placeholder?: string;
  /* default: false */
  fullWidth?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isError?: boolean;
  style?: CSSProperties;
};

export type TextFiledProps = {
  type?: 'textFiled';
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;
  value: string;
  list?: never;
  format?: (value: string) => string;
  onChange?: (value: string) => void;
};

export type ElementType<T> = T extends (infer U)[] ? U : T;

export type SelectProps<T = unknown> = {
  type: 'select';
  inputProps?: never;
  value: T;
  list: { label: string; value: ElementType<T> }[];
  format?: (label: string, value: ElementType<T>) => string;
  onChange?: never;
};

type Modules = (Add | Enter)[];
