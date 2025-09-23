import { CSSProperties, InputHTMLAttributes, ReactElement, MouseEvent, Ref } from 'react';
import { MDSDropdownItem } from '../Dropdown';

export type Size = 'small' | 'medium' | 'large';

export type Props<T> = (TextFieldProps | SelectProps<T>) & CommonProps;

export type InputStatus = 'error' | 'success' | 'idle';

export type CommonProps = {
  /* default: medium */
  size?: Size;
  placeholder?: string;
  /* default: false */
  fullWidth?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  status?: InputStatus;
  style?: CSSProperties;
  /**
   * @description 상단 텍스트, isDisabled 에 따라 스타일 바뀜
   * @description <code>{ main: string, sub: string, right: ReactElement }</code> 로 사용시 sub는 괄호
   * */
  label?: LabelType;
  /** @description 하단 가이드 텍스트, <code>isError</code> 값에 따라 스타일 바뀜 or <code>{ label: string, status?: guideStatus }[]</code> */
  guide?: string | string[] | { label: string; status?: InputStatus }[];
  width?: number | string;
};

export type LabelType = string | { main?: string; sub?: string; right?: ReactElement };

/**
 * @description textField 커스텀 props
 * @property {{ label?: string, onSubmit: (value: string) => void }} [add] 우측에 버튼이 추가되며 클릭시 value를 리턴함
 * @property {(value: string) => void} [onEnter] Enter 이벤트 추가
 * @property {number} [debounce] input 입력 후 onChange 실행까지 delay를 추가함 (milliseconds)
 * @property {string | ReactElement} [prefix] input Field 좌측에 아이콘 혹은 텍스트 추가
 * @property {string | ReactElement} [suffix] input Field 우측에 아이콘 혹은 텍스트 추가
 * @property {expandOnFocus} [expandOnFocus] focus 됐을 때 focusWidth(px, number) 값으로 width를 변경함.
 * @property {boolean} [flatLeft] 왼쪽 radius 제거
 * @property {boolean} [flatRight] 오론쪽 radius 제거
 * @property {'always' | 'never' | 'default'} [deleteIcon] always: 내용이 있을 때, 항상 clear 버튼 표시, never: 항상 표시 안함, default: 내용이 있을 때, textField에 포커스 하면 표시
 */
export type TextFieldCustom = {
  add?: {
    label?: string;
    onSubmit: (value: string, e: MouseEvent<HTMLButtonElement>) => void;
    isDisabled?: boolean | ((value: string) => boolean);
    ref?: Ref<HTMLButtonElement>;
  };
  onEnter?: (value: string) => void;
  debounce?: number;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
  expandOnFocus?: {
    defaultWidth?: string | number;
    focusWidth: string | number;
  };
  expandToFit?: {
    defaultWidth?: string | number;
    maxWidth?: string | number;
  };
  flatLeft?: boolean;
  flatRight?: boolean;
  multiline?: {
    expandToFit?: {
      defaultHeight?: string | number;
      maxHeight?: string | number;
    };
  };
  deleteIcon?: 'always' | 'never' | 'default';
};

/**
 * @description select 커스텀 props
 * @property { boolean | ((value: ElementType<T>) => ReactElement) } [withChip] Chip 형태로 label을 표시함
 * @property {boolean} [flatLeft] 왼쪽 radius 제거
 * @property {boolean} [flatRight] 오론쪽 radius 제거
 */
type SelectCustom<T> = {
  withChip?: boolean | ((value: ElementType<T>) => ReactElement);
  flatLeft?: boolean;
  flatRight?: boolean;
};

/**
 * @property [props.value] - TextField value
 * @property [props.onChange] - TextField realtime change event
 * @property [props.onBlur] - TextField blur 시 change event
 * @property {TextFieldCustom} props.custom - TextField 추가 모듈
 */
export type TextFieldProps = {
  ref?: Ref<HTMLInputElement>;
  /** @default textField */
  variant?: 'textField';
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;
  /**
   * @description The custom object, which can be a TextField or a Select
   * @param {TextFieldCustom | SelectCustom} custom
   */
  custom?: TextFieldCustom;
  value: string;
  list?: never;
  format?: (value: string) => string;
  isMultiline?: boolean;
  outlineStyle?: CSSProperties;
  onClick?: never;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

export type ElementType<T> = T extends (infer U)[] ? U : T;

/**
 * @property {'select'} props.type
 * @property [props.value] Selected value
 * @property [props.onChange] delete event on Select / Chips
 * @property {SelectCustom} props.custom - Select 추가 모듈
 */
export type SelectProps<T = unknown> = {
  ref?: Ref<HTMLButtonElement>;
  variant: 'select';
  inputProps?: never;
  custom?: SelectCustom<T>;
  value: T;
  list: MDSDropdownItem<ElementType<T>>[];
  format?: (label: string, value: ElementType<T>) => string;
  isMultiline?: never;
  outlineStyle?: CSSProperties;
  /**
   * @param {(value: T) => void} [onChange] 우측 및 chip에 X버튼 추가 및 해당 값 제거된 value 리턴
   * */
  onChange?: (value: T) => void;
  onClick?: (e: MouseEvent<HTMLLabelElement>) => void;
  onBlur?: never;
};
