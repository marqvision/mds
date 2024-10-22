import { CSSProperties, InputHTMLAttributes, ReactElement } from 'react';

export type Size = 'small' | 'medium' | 'large' | 'extra-large';

export type Props<T> = (TextFieldProps | SelectProps<T>) & CommonProps;

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
  /**
   * @description 상단 텍스트, isDisabled 에 따라 스타일 바뀜
   * @description <code>{ main: string, sub: string }</code> 로 사용시 sub는 괄호
   * */
  label?: LabelType;
  /** @description 하단 가이드 텍스트, <code>isError</code> 값에 따라 스타일 바뀜 */
  guide?: string;
};

export type LabelType = string | { main: string; sub: string };

/**
 * @description textFiled 커스텀 props
 * @property {{ label?: string, onSubmit: (value: string) => void }} [add] 우측에 버튼이 추가되며 클릭시 value를 리턴함
 * @property {(value: string) => void} [onEnter] Enter 이벤트 추가
 * @property {number} [debounce] input 입력 후 onChange 실행까지 delay를 추가함 (milliseconds)
 * @property {string | ReactElement} [prefix] input Field 좌측에 아이콘 혹은 텍스트 추가
 * @property {string | ReactElement} [suffix] input Field 우측에 아이콘 혹은 텍스트 추가
 */
type TextFieldCustom = {
  add?: {
    label?: string;
    onSubmit: (value: string) => void;
  };
  onEnter?: (value: string) => void;
  debounce?: number;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
};

/**
 * @description select 커스텀 props
 * @property { boolean | ((value: ElementType<T>) => ReactElement) } [withChip] Chip 형태로 label을 표시함
 */
type SelectCustom<T> = {
  withChip?: boolean | ((value: ElementType<T>) => ReactElement);
};

export type TextFieldProps = {
  /** @default textField */
  type?: 'textFiled';
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;
  /**
   * @description The custom object, which can be a TextField or a Select
   * @param {TextFieldCustom | SelectCustom} custom
   */
  custom?: TextFieldCustom;
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
  custom?: SelectCustom<T>;
  value: T;
  list: { label: string; value: ElementType<T> }[];
  format?: (label: string, value: ElementType<T>) => string;
  /**
   * @param {(value: T) => void} [onChange] 우측에 X버튼 추가 및 클릭시 value에 undefined or [] 리턴
   * */
  onChange?: (value: T) => void;
  onBlur?: never;
};
