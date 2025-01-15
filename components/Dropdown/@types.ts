import { CSSProperties, ReactElement } from 'react';

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

export type DropdownItem<T> = {
  label: string | ReactElement;
  subLabel?: string | number | SubLabel;
  isDisabled?: boolean;
  icon?: ReactElement;
  count?: number;
  imgUrl?: string;
  rightSection?: ReactElement;
  style?: CSSProperties;
  onClick?: () => void;
} & ({ children: DropdownItem<T>[]; value?: any } | { children?: undefined; value?: T });

export type InferType<T> = T extends (infer U)[] ? U[] : T;
export type ValueType<T> = T extends (infer U)[] ? U : T;
export type ObjType<T> = T extends (infer U)[] ? DropdownItem<ValueType<U>>[] : DropdownItem<ValueType<T>>;

export type ModuleType = 'search' | 'sort' | 'infinite' | 'bottom-button' | 'custom-sub-label' | 'on-select';

/**
 * @property [minLength] default `2`
 * */
export type SearchModule = {
  type: 'search';
  minLength?: number;
  debounce?: number;
  onChange: (value: string) => void;
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

export type BottomButtonModule<T> = {
  type: 'bottom-button';
  icon?: ReactElement;
  label: string;
  rightSection?: ReactElement;
  isDisabled?: boolean;
  // onClick 이후 해당 드롭다운이 닫힐지 닫히지 않을지 (default: false)
  preventClose?: boolean;
} & ({ onClick: () => void; value?: undefined } | { value: ValueType<T>; onClick?: undefined });

export type CustomModule<T> = {
  type: ModuleType;
} & (SearchModule | SortModule<T> | InfiniteModule | BottomButtonModule<T>);

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
  isFoldAll?: boolean;
  onChange?: (value: InferType<T>, indeterminate?: InferType<T>) => void;
  onSelect?: (value: ValueType<T>[], selectedValues: ValueType<T>[], isSelected: boolean) => ValueType<T>[];
  renderAnchor?: (value: T | undefined, returnObj: ObjType<T>, list: DropdownItem<ValueType<T>>[]) => ReactElement;
  style?: CSSProperties;
};

export type SelectedType<T> = {
  value: T;
  label: string | ReactElement;
};

export type SortType = 'asc' | 'desc';
