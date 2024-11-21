import { CSSProperties, ReactElement } from 'react';

type SubLabel = {
  label: string;
  /**
   todo-@matthew add tooltip case after development to v2
   @default bottom
   */
  position?: 'bottom' | 'top' | 'tooltip';
  /**
   * search 에 포함 여부
   @default false
   */
  includeSearch?: boolean;
};

export type DropdownItem<T> = {
  label: string | ReactElement;
  subLabel?: string | SubLabel;
  isDisabled?: boolean;
  icon?: ReactElement;
  imgUrl?: string;
  rightSection?: ReactElement;
  style?: CSSProperties;
  onClick?: () => void;
} & ({ children: DropdownItem<T>[]; value?: any } | { children?: undefined; value?: T });

export type InferType<T> = T extends (infer U)[] ? U[] : T | undefined;
export type ValueType<T> = T extends (infer U)[] ? U : T | undefined;
export type ObjType<T> = T extends (infer U)[] ? DropdownItem<ValueType<U>>[] : DropdownItem<ValueType<T>> | undefined;

export type ModuleType = 'search' | 'sort' | 'infinite' | 'bottom-button' | 'custom-sub-label';

export type SearchModule = {
  type: 'search';
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
  onScrollBottom: () => void;
  isLoading?: boolean;
};

export type BottomButtonModule = {
  type: 'bottom-button';
  icon?: ReactElement;
  label: string;
  isDisabled?: boolean;
  // onClick 이후 해당 드롭다운이 닫힐지 닫히지 않을지 (default: false)
  preventClose?: boolean;
  onClick: () => void;
};

export type CustomModule<T> = {
  type: ModuleType;
} & (SearchModule | SortModule<T> | InfiniteModule | BottomButtonModule);

export type Module<T> = 'search' | 'sort' | '1-depth-single' | CustomModule<T>;

export type Props<T, SortT = unknown> = {
  value?: T;
  indeterminate?: T;
  list: DropdownItem<ValueType<T>>[];
  label?: string;
  onChange?: (value: InferType<T>, indeterminate?: InferType<T>) => void;
  renderAnchor?: (value: T | undefined, returnObj: ObjType<T>, list: DropdownItem<ValueType<T>>[]) => ReactElement;
  isLoading?: boolean;
  width?: string | number | 'fit-anchor';
  modules?: Module<SortT>[];
  isDisabled?: boolean;
};

export type SelectedType<T> = {
  value: T;
  label: string | ReactElement;
};

export type SortType = 'asc' | 'desc';
