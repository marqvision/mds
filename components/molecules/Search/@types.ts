import { MDSDropdownItem, ValueType } from '../Dropdown';
import { MDSInputProps } from '../Input';

type WithOption<T> = {
  /**
   * 검색 옵션 전달 시 좌측에 드롭다운이 표시됩니다.
   * @param option.list - 드롭다운에 표시될 목록
   * @param option.value - 드롭다운에서 선택된 값
   */
  option: {
    width?: string;
    list: MDSDropdownItem<ValueType<T>>[];
    value: T;
  };
  /**
   * 검색 이벤트 핸들러
   * 검색 옵션 전달 시 두번째 인자로 선택된 옵션이 전달됩니다.
   */
  onSearch?: (value: string, option: T) => void;
};

type WithoutOption = {
  option?: never;
  onSearch?: (value: string) => void;
};

/**
 * Search 컴포넌트의 props
 * @template T 검색 옵션 value 타입
 */
export type SearchProps<T> = (WithOption<T> | WithoutOption) & {
  /** @default `small` */
  size?: MDSInputProps<T>['size'];
  /** 검색어 */
  value: string;
  /**
   * 검색 트리거 방식 (`enter` 또는 `change`)
   * @default `enter`
   */
  trigger?: 'enter' | 'change';
  /**
   * placeholder 텍스트
   * @default `Search`
   */
  placeholder?: string;
  /**
   * 인풋의 너비 (`string` 또는 상태별 width 객체)
   * @default `{ default: '120px', focused: '200px' }`
   */
  width?: string | { default: string; focused: string };
  /**
   * 검색을 시작할 최소 입력 글자 수
   * @default `2`
   */
  minSearchLetters?: number;
};
