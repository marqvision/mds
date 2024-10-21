import { CSSProperties, InputHTMLAttributes } from 'react';

export type Size = 'small' | 'medium' | 'large' | 'extra-large';

export type Props<T> = (TextFiledProps | SelectProps<T>) & CommonProps;

export type CommonProps = {
  /* default: medium */
  size?: Size;
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
  custom?: {
    /* 우측에 버튼이 추가되며 클릭시 value를 리턴함 */
    add?: {
      label?: string;
      onSubmit: (value: string) => void;
    };
    onEnter?: (value: string) => void;
    /* onChange 이벤트에 딜레이 추가 (milliseconds) */
    debounce?: number;
    prefix?: string;
    suffix?: string;
  };
  value: string;
  list?: never;
  format?: (value: string) => string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

export type ElementType<T> = T extends (infer U)[] ? U : T;

export type SelectProps<T = unknown> = {
  type: 'select';
  inputProps?: never;
  custom?: never;
  value: T;
  list: { label: string; value: ElementType<T> }[];
  format?: (label: string, value: ElementType<T>) => string;
  onChange?: never;
  onBlur?: never;
};
