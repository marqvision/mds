import { CSSProperties, ReactElement } from 'react';
import { MDSButtonProps } from '../Button';
import { PopoverPosition } from '../Popover/@type';

type SubLabel = {
  label: number | string;
  /**
   @default bottom
   */
  position?: 'bottom' | 'top' | 'tooltip' | 'bracket';
  /**
   * search 에 포함 여부
   @default false
   */
  includeSearch?: boolean;
};

// todo-@blue-poolyum: 타입 추론 정상화
export type DropdownItem<T> = {
  label: string | ReactElement;
  subLabel?: string | number | SubLabel;
  isDisabled?: boolean;
  icon?: ReactElement;
  imgUrl?: string;
  rightSection?: ReactElement;
  style?: CSSProperties;
  onClick?: () => void;
} & ({ children: DropdownItem<T>[]; value?: any } | { children?: undefined; value?: T });

export type InferType<T> = T extends (infer U)[] ? U[] : T;
export type ValueType<T> = T extends (infer U)[] ? U : T;
export type ObjType<T> = T extends (infer U)[] ? DropdownItem<ValueType<U>>[] : DropdownItem<ValueType<T>>;

export type ModuleType =
  | 'search'
  | 'sort'
  | 'infinite'
  | 'sticky-bottom'
  | 'sticky-top'
  | 'custom-sub-label'
  | 'on-select'
  | 'filter-button';

/**
 * @property [minLength] default `2`
 * */
export type SearchModule = {
  type: 'search';
  minLength?: number;
  debounce?: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  prefix?: string | ReactElement;
};

export type SortModule<T> = {
  type: 'sort';
  value: T;
  list: { label: string; value: T }[];
  onChange: (value: T) => void;
};

export type InfiniteModule = {
  type: 'infinite';
  total: number;
  hideSelectAll?: boolean;
  onScrollBottom: () => void;
  isLoading?: boolean;
  hasNextPage?: boolean;
};

export type StickyBottomModule<T> = {
  type: 'sticky-bottom';
} & (StickyBottomElementType | StickyBottomItemType<T>);

export type StickyBottomElementType = {
  element: ReactElement | ((close: () => void) => ReactElement);
};

export type StickyBottomItemType<T> = {
  icon?: ReactElement;
  label: string;
  rightSection?: ReactElement;
  isDisabled?: boolean;
  // onClick 이후 해당 드롭다운이 닫힐지 닫히지 않을지 (default: false)
  preventClose?: boolean;
  element?: never;
} & ({ onClick: () => void; value?: undefined } | { value: ValueType<T>; onClick?: undefined });

export type StickyTopModule = {
  type: 'sticky-top';
  element: ReactElement | ((close: () => void) => ReactElement);
};

export type FilterButtonModule = {
  type: 'filter-button';
  size?: MDSButtonProps['size'];
  color?: MDSButtonProps['color'];
  flat?: MDSButtonProps['flat'];
};

export type CustomModule<T> = {
  type: ModuleType;
} & (SearchModule | SortModule<T> | InfiniteModule | StickyBottomModule<T> | StickyTopModule | FilterButtonModule);

export type Module<T> = 'search' | 'sort' | '1-depth-single' | 'hide-select-all' | CustomModule<T>;

export type Props<T, SortT = unknown> = {
  value?: T;
  indeterminate?: T;
  list: DropdownItem<ValueType<T>>[];
  label?: string;
  width?: string | number | 'fit-anchor';
  modules?: Module<SortT>[];
  isLoading?: boolean;
  isDisabled?: boolean;
  /* boolean or depth(number) */
  isFoldAll?: boolean | number;
  onChange?: (value: InferType<T>, indeterminate?: InferType<T>) => void;
  onSelect?: (value: ValueType<T>[], selectedValues: ValueType<T>[], isSelected: boolean) => ValueType<T>[];
  renderAnchor?: (value: T | undefined, selectedItems: ObjType<T>, list: DropdownItem<ValueType<T>>[]) => ReactElement;
  style?: CSSProperties;
  position?: PopoverPosition;
  onOpen?: () => void;
  onClose?: () => void;
};

export type SortType = 'asc' | 'desc';
