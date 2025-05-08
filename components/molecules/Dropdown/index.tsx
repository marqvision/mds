import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Provider, useSetAtom } from 'jotai';
import styled from '@emotion/styled';
import { MDSPopover } from '../Popover';
import { MDSTypography } from '../../atoms/Typography';
import { MDSCheckbox } from '../../atoms/Checkbox';
import { MDSIcon } from '../../atoms/Icon';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { Item } from './@components/Item';
import { useDropdown, useInitDropdown } from './@hooks';
import {
  DropdownItem,
  InferType,
  InfiniteModule,
  Props,
  SearchModule,
  SelectedType,
  SortModule,
  SortType,
  StickyBottomModule,
  StickyTopModule,
  ValueType,
} from './@types';
import { FilterChip } from './@components/FilterChip';
import { Search } from './@components/Search';
import { DEFAULT_DEBOUNCE_TIMING, DEFAULT_MIN_SEARCH_LETTERS } from './@constants';
import { foldedItemIndexAtom } from './@atoms';
import { getAllListIndex } from './@utils';
import { StickyBottom } from './@components/StickyBottom';

export type MDSDropdownItem<T> = DropdownItem<T>;

const StyledDropdownWrap = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledScrollSection = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
`;

const StyledStickyTrigger = styled.div`
  height: 1px;
  flex: 0 0 1px;
  width: 100%;
  margin-top: -1px;
`;

const StyledSticky = styled.div<{ isScrollTop: boolean }>`
  transition: 0.3s ease box-shadow;
  box-shadow: ${({ isScrollTop }) => (isScrollTop ? '0 1px 8px 0 #0000001f, 1px 2px 0 #0000000a;' : 'none')};
  border-bottom: 1px solid ${({ theme }) => theme._raw_color.bluegray100};
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
  border-radius: 4px;
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
  border-radius: 4px;
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.color.content.inverse.default.hover};
  }
`;

const Dropdown = <T, SortT>(
  props: Omit<Props<T, SortT>, 'renderAnchor' | 'onChange' | 'indeterminate'> & {
    indeterminate: ValueType<T>[];
    selectedValues: SelectedType<ValueType<T>>[];
    selectableValues: SelectedType<ValueType<T>>[];
    onChange: (value: SelectedType<ValueType<T>>[], isSelected: boolean) => void;
    onClose: () => void;
    onMount: () => void;
    onUnmount: () => void;
    onClear: () => void;
    onSearching: (isSearching: boolean) => void;
  }
) => {
  const {
    value,
    list: _list,
    modules,
    selectedValues,
    selectableValues,
    indeterminate,
    isFoldAll,
    isLoading,
    onChange,
    onClear,
    onClose,
    onMount,
    onUnmount,
    onSearching,
  } = props;

  const stickyBottom = modules?.find(
    (v) => typeof v === 'object' && v.type === 'sticky-bottom'
  ) as StickyBottomModule<T>;
  const stickyTopElement = modules?.find((v) => typeof v === 'object' && v.type === 'sticky-top') as
    | StickyTopModule
    | undefined;
  const hasCustomSearch = modules?.some((v) => typeof v === 'object' && v.type === 'search');

  const {
    search,
    sort,
    filteredList: list,
    searchedValues,
    handler,
  } = useDropdown<T>({
    value,
    list: _list,
    hasSort: modules?.includes('sort'),
    hasCustomSearch,
    stickyItem: (() => {
      if (!stickyBottom || stickyBottom.element || stickyBottom.value === undefined) {
        return undefined;
      }
      return {
        label: stickyBottom.label,
        value: stickyBottom.value,
      };
    })(),
  });

  const [isScrollTop, setIsScrollTop] = useState(false);
  const setFoldedItemIndex = useSetAtom(foldedItemIndexAtom);

  const infiniteRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number>();
  const scrollOffsetRef = useRef<HTMLDivElement>(null);
  const stickyTrigger = useRef<HTMLDivElement>(null);

  const hasSearch = modules?.some((v) => v === 'search' || (typeof v === 'object' && v.type === 'search'));
  const hasSort = modules?.some((v) => v === 'sort' || (typeof v === 'object' && v.type === 'sort'));
  const is1DepthSingle = modules?.some((v) => v === '1-depth-single');
  const customSearch = modules?.find((v) => typeof v === 'object' && v.type === 'search') as SearchModule | undefined;
  const customSort = modules?.find((v) => typeof v === 'object' && v.type === 'sort') as SortModule<SortT>;
  const infinite = modules?.find((v) => typeof v === 'object' && v.type === 'infinite') as InfiniteModule | undefined;

  const hideSelectAllAndCount = modules?.some((v) => v === 'hide-select-all');
  const hideSelectAll = is1DepthSingle || (!!infinite?.hideSelectAll && selectedValues.length === 0);

  const isMultiple = Array.isArray(value);
  const isShowStickyHeader = hasSearch || ((hasSort || isMultiple) && !hideSelectAllAndCount);
  const isSelectedAll =
    isMultiple &&
    selectedValues.length > 0 &&
    (selectableValues.length === selectedValues.length || selectedValues[0]?.value === -1)
      ? true
      : selectedValues.length
      ? 'indeterminate'
      : false;
  const isEmpty = list.length === 0 && !infinite?.isLoading && !isLoading;
  const allCount = (infinite?.total || selectableValues.length).toLocaleString();
  const isInfiniteAll = selectedValues.length === 1 && selectedValues[0].value === -1;
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

  const sortEle = customSort ? (
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
  );

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
    if (infinite) {
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

  const itemProps = {
    indeterminate: indeterminate,
    isMultiple: isMultiple,
    selectedValue: selectedValues,
    is1DepthSingle: is1DepthSingle,
    isInfiniteAll: isInfiniteAll,
    onChange: onChange,
    onClose: onClose,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsScrollTop(!entries.some((v) => v.isIntersecting));
      },
      {
        root: scrollOffsetRef.current?.parentElement,
      }
    );

    const sticky = stickyTrigger.current;

    if (sticky) {
      observer.observe(sticky);
    }

    return () => {
      if (sticky) {
        observer.unobserve(sticky);
      }
      handler.search('');
    };
    // intentional missing dependencies
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((v) => v.isIntersecting)) {
        if (
          infinite &&
          !infinite.isLoading &&
          infinite.hasNextPage &&
          !debounceRef.current &&
          !isLoading &&
          !isSearchTooShort
        ) {
          infinite.onScrollBottom();
        }
      }
    });

    if (infiniteRef.current) {
      observer.observe(infiniteRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [infinite, isLoading, isSearchTooShort]);

  useEffect(() => {
    onMount();

    return () => {
      onUnmount();
    };
  }, [onMount, onUnmount]);

  useEffect(() => {
    if (isFoldAll) {
      setFoldedItemIndex(getAllListIndex(list));
    }
    // intentionally omitting list
  }, [getAllListIndex, isFoldAll]);

  useEffect(() => {
    if (hasCustomSearch) {
      onSearching(hasSearchValue);
    }
  }, [hasSearchValue, hasCustomSearch, onSearching]);

  return (
    <StyledDropdownWrap>
      {isShowStickyHeader && (
        <StyledSticky isScrollTop={isScrollTop}>
          <StyledStickyContent>
            {hasSearch && (
              <Search
                placeholder={customSearch?.placeholder}
                prefix={customSearch?.prefix}
                onChange={handleChangeSearch}
              />
            )}
            {(isMultiple || hasSort) && !hideSelectAllAndCount && (
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
                {hasSort && sortEle}
              </StyledAction>
            )}
          </StyledStickyContent>
          {stickyTopElement?.element}
        </StyledSticky>
      )}
      {isEmpty && (
        <MDSTypography
          variant="body"
          size="m"
          weight="regular"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          No results
        </MDSTypography>
      )}
      {isSearchTooShort && (
        <MDSTypography
          variant="body"
          size="m"
          weight="regular"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          Search more than {customSearch?.minLength || DEFAULT_MIN_SEARCH_LETTERS} letters
        </MDSTypography>
      )}
      <StyledScrollSection ref={scrollOffsetRef} className="mds-dropdown-scroll">
        <StyledStickyTrigger ref={stickyTrigger} />
        {!isSearchTooShort &&
          list.map((v, index) => (
            <Item<ValueType<T>>
              key={`dropItem_0_${v.value ?? `${v.label}_${index}`}`}
              parentIndex={`${index}`}
              item={v}
              search={search}
              {...itemProps}
            />
          ))}
        {(infinite?.isLoading || isLoading) && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
            <MDSLoadingIndicator size={24} strokeWidth={2} />
          </div>
        )}
        {infinite && <div ref={infiniteRef} style={{ height: '1px' }} />}
      </StyledScrollSection>
      {stickyBottom && <StickyBottom item={stickyBottom} {...itemProps} />}
    </StyledDropdownWrap>
  );
};

export const MDSDropdown = <T = unknown, SortT = unknown>(props: Props<T, SortT>) => {
  const { renderAnchor, width, position, ...restProps } = props;

  const { value, list, isLoading, isDisabled } = restProps;

  const closeRef = useRef<() => void>();
  const openFnRef = useRef<() => void | undefined>();

  const { selectedValues, selectableValue, indeterminate, labels, selectedItems, handler } = useInitDropdown<T, SortT>({
    ...restProps,
    closeRef,
  });

  const [fitWidth, setFitWidth] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<EventTarget & Element>(null);

  const anchor = renderAnchor ? (
    renderAnchor(value, selectedItems, list)
  ) : (
    <FilterChip
      label={props.label || ''}
      selectedLabel={labels}
      isLoading={!isOpen && isLoading}
      isDisabled={isDisabled || selectableValue.length === 0}
    />
  );

  const handleMount = useCallback(() => {
    setIsOpen(true);
    if (width === 'fit-anchor' && ref.current) {
      setFitWidth(ref.current.clientWidth);
    } else {
      setFitWidth(undefined);
    }
    openFnRef.current?.();
  }, [width]);

  const handleUnmount = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    openFnRef.current = props.onOpen;
  }, [props.onOpen]);

  return (
    <MDSPopover
      hasDim={false}
      padding={0}
      forwardRef={ref}
      anchor={anchor}
      width={fitWidth || width || 'auto'}
      onClose={handler.close}
      position={position}
      style={{
        ...props.style,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {({ close, isOpen }) => {
        closeRef.current = isOpen ? close : undefined;
        return (
          <Provider>
            <Dropdown<T, SortT>
              {...restProps}
              selectedValues={selectedValues}
              indeterminate={indeterminate}
              selectableValues={selectableValue}
              onChange={(v: SelectedType<ValueType<T>>[], isSelected, forceClose?: boolean) =>
                handler.change(v, isSelected, close, forceClose)
              }
              onClear={handler.clear}
              onClose={close}
              onMount={handleMount}
              onUnmount={handleUnmount}
              onSearching={handler.setIsCustomSearching}
            />
          </Provider>
        );
      }}
    </MDSPopover>
  );
};

export * from './@types';
