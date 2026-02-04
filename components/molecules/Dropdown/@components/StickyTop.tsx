import { SetStateAction, MutableRefObject } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../../atoms/Typography';
import {
  DropdownItem,
  InferType,
  InfiniteModule,
  Module,
  SearchModule,
  SortModule,
  SortType,
  StickyTopModule,
  ValueType,
} from '../@types';
import { MDSCheckbox } from '../../../atoms/Checkbox';
import { MDSDropdown } from '../';
import { MDSIcon } from '../../../atoms/Icon';
import { DEFAULT_DEBOUNCE_TIMING, DEFAULT_MIN_SEARCH_LETTERS } from '../@constants';
import { UseDropdownReturn } from '../@hooks';
import { Search } from './Search';

const StyledSticky = styled.div<{ isScrollTop: boolean }>`
  transition: 0.3s ease box-shadow;
  box-shadow: ${({ isScrollTop }) => (isScrollTop ? '0 1px 8px 0 #0000001f, 0 1px 2px 0 #0000000a;' : 'none')};
  border-bottom: ${({ isScrollTop, theme }) => `${isScrollTop ? 0 : 1}px solid ${theme._raw_color.bluegray100}`};
  background-color: white;
  position: relative;
  z-index: 10;
`;

const StyledStickyContent = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 4px;
`;

const StyledSelectAll = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 4px;
  border-radius: ${({ theme }) => theme.comp.dropdown.radius};
  transition: background-color 225ms ease;
  ${({ as, theme }) =>
    as === 'label'
      ? {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.color.content.inverse.default.hover,
          },
        }
      : undefined}
`;

const StyledSort = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.comp.dropdown.radius};
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.color.content.inverse.default.hover};
  }
`;

type Props<T, SortT> = {
  isScrollTop: boolean;
  modules?: Module<SortT>[];
  selectedValues: DropdownItem<ValueType<T>>[];
  selectableValues: DropdownItem<ValueType<T>>[];
  isMultiple: boolean;
  isLoading?: boolean;
  debounceRef: MutableRefObject<number | undefined>;
  onClear: () => void;
  onChange: (value: DropdownItem<ValueType<T>>[], isSelected: boolean) => void;
  onClose: () => void;
  handlers: UseDropdownReturn<T>;
};

export const StickyTop = <T, SortT>(props: Props<T, SortT>) => {
  const {
    isScrollTop,
    modules,
    selectedValues,
    selectableValues,
    isMultiple,
    isLoading,
    debounceRef,
    onClear,
    onChange,
    onClose,
    handlers,
  } = props;

  const { search, sort, searchedValues, handler } = handlers;

  const hasSearch = modules?.some((v) => v === 'search' || (typeof v === 'object' && v.type === 'search'));
  const hasSort = modules?.some((v) => v === 'sort' || (typeof v === 'object' && v.type === 'sort'));
  const hideSelectAllAndCount = modules?.some((v) => v === 'hide-select-all');
  const is1DepthSingle = modules?.some((v) => v === '1-depth-single');

  const infinite = modules?.find((v) => typeof v === 'object' && v.type === 'infinite') as InfiniteModule | undefined;
  const customSort = modules?.find((v) => typeof v === 'object' && v.type === 'sort') as SortModule<SortT>;
  const customSearch = modules?.find((v) => typeof v === 'object' && v.type === 'search') as SearchModule | undefined;
  const stickyTopModule = modules?.find((v) => typeof v === 'object' && v.type === 'sticky-top') as
    | StickyTopModule
    | undefined;

  const stickyTopElement = stickyTopModule?.element
    ? typeof stickyTopModule.element === 'function'
      ? stickyTopModule.element(onClose)
      : stickyTopModule?.element
    : undefined;
  const hasAction = (isMultiple || hasSort) && !hideSelectAllAndCount;

  const hideSelectAll = is1DepthSingle || (!!infinite?.hideSelectAll && selectedValues.length === 0);
  const isShowStaticActionBar = hasSearch || hasAction;
  const isShowStickyHeader = isShowStaticActionBar || !!stickyTopElement;
  const isInfiniteAll = selectedValues.length === 1 && selectedValues[0].value === -1;
  const allCount = (infinite?.total || selectableValues.length).toLocaleString();
  const selectedCount = (isInfiniteAll ? allCount : selectedValues.length).toLocaleString();
  const hasSearchValue = !!search.trim().length;
  const isSearchTooShort =
    !!customSearch && hasSearchValue && search.trim().length < (customSearch.minLength || DEFAULT_MIN_SEARCH_LETTERS);
  const searchedCount = isSearchTooShort ? 0 : infinite?.total || searchedValues.length;

  const countLabel = (() => {
    if (isMultiple && selectedValues.length > 0) {
      return `Selected (${selectedCount})`;
    }
    if (isLoading) {
      return 'Searching';
    }
    if (search && !debounceRef.current) {
      return `Searched (${searchedCount})`;
    }
    return `All (${allCount})`;
  })();

  const isSelectedAll =
    isMultiple &&
    selectedValues.length > 0 &&
    (selectableValues.length === selectedValues.length || selectedValues[0]?.value === -1)
      ? true
      : selectedValues.length
      ? 'indeterminate'
      : false;

  const sortEle = hasSort ? (
    customSort ? (
      <MDSDropdown<SortT>
        value={customSort.value}
        list={customSort.list as DropdownItem<ValueType<SortT>>[]}
        onChange={customSort.onChange as (value: SetStateAction<InferType<SortT>>) => void}
        renderAnchor={() => (
          <StyledSort>
            <MDSIcon.Sort size={24} />
          </StyledSort>
        )}
      />
    ) : (
      <MDSDropdown<SortType>
        value={sort}
        list={[
          { label: 'A-Z', value: 'asc' },
          { label: 'Z-A', value: 'desc' },
        ]}
        onChange={handler.sort}
        renderAnchor={() => (
          <StyledSort>
            <MDSIcon.Sort size={24} />
          </StyledSort>
        )}
      />
    )
  ) : undefined;

  const handleChangeSearch = (s: string) => {
    if (customSearch) {
      const minLength = customSearch.minLength || DEFAULT_MIN_SEARCH_LETTERS;
      const trimmedLength = s.trim().length;
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = undefined;
      }
      if (trimmedLength >= minLength || trimmedLength === 0) {
        if (trimmedLength === 0) {
          customSearch.onChange?.(s);
        } else {
          debounceRef.current = window.setTimeout(() => {
            customSearch.onChange?.(s);
            debounceRef.current = undefined;
            handler.search(s);
          }, customSearch.debounce || DEFAULT_DEBOUNCE_TIMING);
          return;
        }
      }
    }
    handler.search(s);
  };

  const handleSelectAll = () => {
    if (infinite && searchedValues.length === 0) {
      onChange(
        [
          {
            label: 'All',
            value: -1 as ValueType<T>,
          },
        ],
        !isSelectedAll
      );
    } else if (selectedValues.length > 0) {
      onClear();
    } else if (searchedValues.length > 0) {
      onChange(searchedValues, !isSelectedAll);
    } else {
      onChange(selectableValues, !isSelectedAll);
    }
  };

  if (!isShowStickyHeader) {
    return undefined;
  }

  return (
    <StyledSticky isScrollTop={isScrollTop}>
      {isShowStaticActionBar && (
        <StyledStickyContent>
          {hasSearch && (
            <Search
              placeholder={customSearch?.placeholder}
              prefix={customSearch?.prefix}
              onChange={handleChangeSearch}
            />
          )}
          {hasAction && (
            <StyledAction>
              <StyledSelectAll as={!hideSelectAll && isMultiple ? 'label' : 'div'}>
                {!hideSelectAll && isMultiple && (
                  <MDSCheckbox
                    isDisabled={selectableValues.length === 0 || isSearchTooShort}
                    value={isSelectedAll}
                    onChange={handleSelectAll}
                  />
                )}
                <MDSTypography variant="body" size="m" weight="medium">
                  {countLabel}
                </MDSTypography>
              </StyledSelectAll>
              {sortEle}
            </StyledAction>
          )}
        </StyledStickyContent>
      )}
      {stickyTopElement}
    </StyledSticky>
  );
};
