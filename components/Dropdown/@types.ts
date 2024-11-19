import { CSSProperties, ReactElement, SetStateAction } from 'react';

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
  onChange?: (value: InferType<T> | SetStateAction<InferType<T>>, indeterminate?: ValueType<T>[]) => void;
  renderAnchor?: (value: T | undefined, returnObj: ObjType<T>, list: DropdownItem<ValueType<T>>[]) => ReactElement;
  isLoading?: boolean;
  width?: string | number;
  modules?: Module<SortT>[];
};

export type SelectedType<T> = {
  value: T;
  label: string | ReactElement;
};

export type SortType = 'asc' | 'desc';
